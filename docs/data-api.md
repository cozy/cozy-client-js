# Data API

### `cozy.client.data.create(doctype, attributes)`

`cozy.client.data.create(doctype, attributes)` adds a document to the database.

It returns a promise for the created object. The created object has the same attributes than thoses passed, with an added `_id`. It's the unique identifier for the created document.

If you use an existing doctype, you should follow its expected format. **v2** does not enforce this, but we plan to on **v3**. Anyway, do you want to be the app that creates empty contacts in the native app ?

- `doctype` is a string specifying the [doctype](intro.md#doctypes--permissions)
- `attributes` is an object that can be stringified using `JSON.stringify`: if it is a complex or cyclic object, add a `toJSON` method to it (native behaviour of `JSON.stringify`).

**Warning**: on **v3**, an extra field `_rev` is added, it is the unique identifier for the document revision, after creation, it will be of the shape `1-xxxxxxxxx` for first revision.

```javascript
// simple object
const book = { title: "Moby Dick", author:"Herman Melville", isbn: "42" }
const created = await cozy.client.data.create(myBooksDoctype, book)
// same fields
console.log(created.title, created.author, created.isbn)
// _id, _rev are added
console.log(created._id, created._rev)
// let's keep it for later
createdBookId = created._id
```


### `cozy.client.data.find(doctype, id)`

`cozy.client.data.find(doctype, id)` returns the document associated to the given ID.

It returns a promise for the document. It will have the same fields than the returned value of `create`, including `_id` and `_rev`.

If the document does not exist, the promise will be rejected or the callback will be passed an error.

- `doctype` is a string specifying the [doctype](intro.md#doctypes--permissions)
- `id` is a string specifying the identifier of the document you look for

```javascript
const doc = await cozy.client.data.find(myBooksDoctype, createdBookId)
console.log(doc._id, doc._rev, doc.title, doc.author, doc.isbn)
```


### `cozy.client.data.findMany(doctype, [ids])`

`cozy.client.data.findMany(doctype, [ids])` returns the documents associated to the given IDs.

It returns a promise for a map, with the given IDs as keys.

When a document is found, the corresponding value will be an object with a
single `doc` key containing the document.
Documents will have the same fields than the returned values of `create`,
including `_id` and `_rev`.

When a document is missing, the corresponding value will be an object with a
single `error` key containing the error message.
Even when some document is missing, the promise will still be fulfilled or the
callback will be passed the resulting map, so you can still access the other
documents found and identify the missing ones.

- `doctype` is a string specifying the
  [doctype](intro.md#doctypes--permissions)
- `ids` is an array of strings specifying the identifiers of the documents you
  look for

**Warning**: Not available on **v2**. A fallback implementation could be
provided at some point.

```javascript
const ids = [createdBookId, ...]
const resultsById = await cozy.client.data.findMany(myBooksDoctype, ids)
for (const id of ids) {
  const {doc, error} = resultsById[id]
  if (error) {
    console.error(`Error while fetching book ${id}: ${error}`)
  } else {
    console.log(doc._id, doc._rev, doc.title, doc.author, doc.isbn)
  }
}
```


### `cozy.client.data.changesFeed(doctype, options)`

`cozy.client.data.changesFeed(doctype, options)` returns the last changes from CouchDB for the given doctype

It returns a promise for the changes.

- `doctype` is a string specifying the [doctype](intro.md#doctypes--permissions)
- `options` is an object, only its `since` parameter is supported currently

```javascript
const changes = await.cozy.client.data.changesFeed(myBooksDoctype, { since: 0 })
console.log(changes.last_seq, changes.results)
```


### `cozy.client.data.update(doctype, doc, newdoc)`

`cozy.client.data.update(doctype, doc, newdoc)` replaces the document by a new version.

It returns a promise for the updated document. The updated document will have the same fields and values than provided in newdoc, the same `_id` than doc, and a `_rev` incremented from doc's number.

If the document does not exist, the promise will reject with an error.

If the document current `_rev` does not match the passed one, it means there is a conflict and the promise is rejected with an error.

- `doctype` is a string specifying the [doctype](intro.md#doctypes--permissions)
- `doc` is an object with *at least* the fields `_id` and `_rev` containing the identifier and revision of the file you want to update.
- `newdoc` is an object, specifying the new content of the document

```javascript
const updates = { title: "Moby Dick !", author:"THE Herman Melville"}
const updated = await cozy.client.data.update(myBooksDoctype, doc, updates)
console.log(updated._id === doc._id) // _id does not change
console.log(updated._rev) // 2-xxxxxx
console.log(updated.title, updated.year) // fields are changed
console.log(updated.isbn === undefined) // update erase fields
```


### `cozy.client.data.updateAttributes(doctype, id, changes)`

`cozy.client.data.updateAttributes(doctype, id, changes)` applies change to the document.

It returns a promise for the updated document. The updated document will be the result of merging changes into the document with given `_id` and a incremented `_rev`.

If the document does not exist, the promise will be rejected or the callback will be passed an error.

This function gives 3 attempts not to conflict.

- `doctype` is a string specifying the [doctype](intro.md#doctypes--permissions)
- `id` is a string specifying the identifier of the document to update
- `changes` is an object

```javascript
const updates = { year: 1852}
const updated = await cozy.client.data.updateAttributes(myBooksDoctype, id, updates)
console.log(updated._id === doc._id) // _id does not change
console.log(updated._rev) // 3-xxxxxx
console.log(updated.year) // fields are changed
console.log(updated.isbn) // updateAttributes preserve other fields
```


### `cozy.client.data.delete(doctype, doc)`

`cozy.client.data.delete(doctype, doc )` will erase the document from the database.

It returns a promise which will be resolved when the document has been deleted.

If the document does not exist, the promise will be rejected with an error. If the document current `_rev` does not match the passed one, it means there is a conflict and the promise is rejected with an error.

- `doctype` is a string specifying the [doctype](intro.md#doctypes--permissions)
- `doc` is an object with *at least* the fields `_id` and `_rev` containing the identifier and revision of the file you want to destroy.

```javascript
await cozy.client.data.delete(myBooksDoctype, updated)
```


### `cozy.client.data.defineIndex(doctype, fields)`

`cozy.client.data.defineIndex(doctype, fields)` creates an index for a document type. It is idempotent, it can be called several time with no bad effect.

It returns a promise for an **indexReference**, which can be passed to `cozy.data.query`.

- `doctype` is a string specifying the [doctype](intro.md#doctypes--permissions)
- `fields` is an array of the fields name to index

**Warning**: when used on **v2**, a map-reduce view is created internally, when used on **v3**, we use couchdb built-in mango queries.

```javascript
const booksByYearRef = await cozy.client.data.defineIndex(myType, ['year', 'rating'])
```


### `cozy.client.data.query(indexReference, query)`

`cozy.client.data.query(indexReference, query)` find documents using an index.

It returns a promise with a list of documents matching the query. Results will be returned in the order defined for the index.

- `query` is an object with the following fields:
  * `selector`: a mango selector
  * `limit`: maximum number of results
  * `skip`: ignore the first x results (pagination)
  * `wholeResponse`: when set to true, the whole query response will be returned instead of just the docs. This is useful when paginating, because you'll get the `next` property in the response object.

**Warning**: complex mango queries are not compatible with **v2**

```javascript
const results = await cozy.client.data.query(booksByYearRef, {
  "selector": {year: 1851},
  "limit": 3,
  "skip": 1
})

results.length == 3 // we limited to 3 results
resuts[0]._id === doc._id
resuts[0].title === "Moby Dick"
resuts[0].rating < 2 // lowest rating first
```
