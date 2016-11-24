# Cozy-client-js API

**The cozy-client-js API is still a work in progress**


## Initialization

```javascript
// cozy.init() retrieves the token either from the URL, a cookie, or
// parent.postMessage depending on auth mechanism, context and stack version.
await cozy.init({
  "target": "http://url.of.the.cozy.to.speak.to"
});
```

The target parameter is optional for application run from inside a cozy, and ignored on stack v1.

## Crud API

```javascript

// This is one of the docType for your application.
// You can create as many as you need.
// You can reuse cozy's provided ones.
var myType = "my.domain.book"

// This is a simple object, which we will use to create a book.
var book = { title: "Moby Dick", author:"Herman Melville" }

// create(doctype, attributes) add a document to the database
// Attributes should be JSON.stringify-able. If the object you use has
// complex attributes, add a .toJSON method.
created = await cozy.create(myType, book)
console.log(created._id, created._rev, created.title, created.author));

// find(doctype, id) retrieve a document by its doctype & ID.
// COMPATIBLE SDK V1
doc = await cozy.find(myType, doc._id)
console.log(doc._id, doc._rev, doc.title, doc.author));

// updateAttributes(doctype, {_id, _rev}, changes) performs a patch of the document.
// COMPATIBLE SDK V1
// if called with only an ID, this functions performs a GET & PUT
// Passing a {_id, _rev, ...} object is more efficient and recommended.
doc2 = await cozy.updateAttributes(myType, doc._id, {year: 1851})
doc2 = await cozy.updateAttributes(myType, doc, {year: 1851})
console.log(doc2._id === doc._id, doc2.title, doc2.year)

// destroy(doctype, document: {_id, _rev}) removes a document from the database
// COMPATIBLE SDK V1
// if called with only an ID on stack v2, this functions performs a GET & DELETE
// Passing a {_id, _rev, ...} object is more efficient and recommended.
await cozy.destroy(myType, doc._id)
await cozy.destroy(myType, doc2)

```

## Query API

```javascript
// defineIndex(doctype, fields) creates an index for a doctype
// here documents will be sorted by year first and then rating
// if used on cozy v2, a mango index is created.
// if used on cozy v1, a map-reduce view is created
// defineIndex is idempotent, it can be called several time.
// defineIndex returns an indexRef object, which should be passed to query.
booksByYear = await cozy.defineIndex(myType, 'year', 'rating')

// query(indexRef, options) find documents, see couchdb/_find docs.
// We can perform this query because we have an index on year & rating.
// Not all mango capability are supported by stack v1
results = await cozy.query(booksByYear, {
  "selector": {year: 1851},
  "limit": 3,
  "skip": 1
})

results.length == 3 // we limited to 3 results
resuts[0]._id === doc._id
resuts[0].title === "Moby Dick"

```

## Promises

All cozy-client-js functions support callback or promise.

```javascript

// If no callback is provided, a promise is returned.
cozy.destroy(myType, doc2)
    .then(function(){
        console.log('done');
    });

// if your build pipeline supports it, use async/await for sweet sweet async
await cozy.destroy(myType, doc2)

// if a callback is provided, no promise is returned.
// DO NOT mix promises and callback in a codebase.
nopromise = cozy.destroy(myType, doc2, function(err){
    console.log('done');
});
nopromise === undefined
```
