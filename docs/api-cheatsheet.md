# Cozy-client-js API

**The cozy-client-js API is still a work in progress**


## Initialization

```javascript
// cozy.init() retrieves the token either from the URL, a cookie, or
// parent.postMessage depending on auth mechanism, context and stack version.
await cozy.init({
  appName: "your_app_name"
  onlyV2: false      // crash with helpful message if the application is used on
                     // v1
  onlyV1: false      // crash with helpful message if the application is used on
                     // v2, useful if you are doing dark map reduce magic.
});
```

**TODO:** more options will probably be necessary for auth.

## Crud API

```javascript

book = { title: "Moby Dick", author:"Herman Melville" }

// create(doctype, attributes) add a document to the database
// COMPATIBLE SDK V1
created = await cozy.create("my.domain.book", book)
console.log(created._id, created._rev, created.title, created.author));

// find(doctype, id) retrieve a document by its doctype & ID.
// COMPATIBLE SDK V1
doc = await cozy.find("my.domain.book", doc._id)
console.log(doc._id, doc._rev, doc.title, doc.author));

// updateAttributes(doctype, {_id, _rev}, changes) performs a patch of the document.
// COMPATIBLE SDK V1
// if called with only an ID, this functions performs a GET & PUT
// Passing a {_id, _rev, ...} object is more efficient and recommended.
doc2 = await cozy.updateAttributes("my.domain.book", doc._id, {year: 1851})
doc2 = await cozy.updateAttributes("my.domain.book", doc, {year: 1851})
console.log(doc2._id === doc._id, doc2.title, doc2.year)

// destroy(doctype, document: {_id, _rev}) removes a document from the database
// COMPATIBLE SDK V1
// if called with only an ID on stack v2, this functions performs a GET & DELETE
// Passing a {_id, _rev, ...} object is more efficient and recommended.
await cozy.destroy("my.domain.book", doc._id)
await cozy.destroy("my.domain.book", doc2)

// defineIndex(doctype, fields...) creates an index for a doctype
// here documents will be sorted by year first and then rating
// if used on cozy v2, a mango index is created.
// if used on cozy v1, a map-reduce view is created
// defineIndex is idempotent, it can be called several time.
index = await cozy.defineIndex("my.domain.book", 'year', 'rating')
// Still not clear if index will be a string or an object

// query(doctype, options) find documents, see couchdb/_find docs.
// We can perform this query because we have an index on year & rating.
// use_index is optional with stack v2, but necessary for compatibility with
// stack v1. Stack v1 query will be very very limited
results = await cozy.query("my.domain.book", {
  use_index: index
  fields: ["title"] // ignored by stack v1
  selector: {year: 1851},
  limit: 3,
  skip: 1,
  sort: ['rating']
})
results.total_rows == 10 // there are 10 books from 1851
results.length == 3 // but we only asked for 3
resuts[0]._id === doc._id
resuts[0].title === "Moby Dick"
resuts[0].author === undefined // we only asked for field title

```

## VFS API

```javascript

// All these functions do not exist in cozy-browser-sdk and can be
// inefficiently made compatible with stack v1 by manipulating files
// and folders docTypes.

// vfs.mkdir(path) creates a directory at the given path
await cozy.vfs.mkdir("path/to/dir")

// vfs.ls(path) returns the children of a given directory
children = await cozy.vfs.ls("path/to/dir")

// vfs.stat(path) returns the metadata of a given directory of file
metada = await cozy.vfs.stat("path/to/dir_or_file")

// vfs.create(path, blob) creates a file at the given path
// it throws if the path's dirname doesnt exists
// it throws if the path exists
await cozy.vfs.create("path/to/file.ext", Blob)

// vfs.update(path, blob) update the content of a file at the given path
// it throws if the path doesnt exists
await cozy.vfs.update("path/to/file.ext", Blob)

// vfs.getURL(path) returns an url for this path
// the url can be used in an <image> or <audio> tag
url = await cozy.vfs.getURL("path/to/file.ext")

// vfs.read(path, blob) read a file at the given path
// it returns a dom.Blob.
blob = await cozy.vfs.read("path/to/file.ext")

// vfs.move(current, next) move the directory or file at the given path then
// another path
await cozy.vfs.move("path/to/dir_or_file", "new/path/to/dir_or_file")

// vfs.copy(current, next) copy the directory or file at the given path to
// another path
await cozy.vfs.move("path/to/dir_or_file", "new/path/to/dir_or_file")

// vfs.rm(path) move the directory or file at the given path to the trash
await cozy.vfs.trash("path/to/dir_or_file")
```

## Binary

These functions exist only for retro-compatibility with browser-sdk and will warn in the console about it. If you are making a new app, do not use them and rely instead on the new attachment API

**TODO** Quickly figures out what the attachment of binaries to documents should look like and specify new functions accordingly.

While the behaviour is similar, these functions DO NOT manipulate couchdb attachments, instead they work with cozy vfs.

```javascript
// addBinary(doctype, docid, filedef, attachment_name) attach a file to a
// document
filedef = { fromURL: "http://some.url/face.png" } // or
filedef = { fromBlob: input.files[0] }
await cozysdk.addBinary('Contact', "45545454554", filedef, 'avatar')

// getBinaryURL(doctype, docid, attachment_name) get the url for a file
url = await cozysdk.getBinaryURL('Contact', "45545454554", 'avatar')
url === "https://app.example.cozycloud.cc/xxxxxxxxx"

// removeBinary(doctype, docid, attachment_name) remove the attachment from a
// document.
await cozysdk.removeBinary('Contact', "45545454554", 'avatar')
```

## Promises

As in the browser-sdk, all the functions support callback or promise.


```javascript

// If no callback is provided, a promise is returned.
cozy.destroy("my.domain.book", doc2)
    .then(function(){
        console.log('done');
    });

// if your build pipeline supports it, use async/await for sweet sweet async
await cozy.destroy("my.domain.book", doc2)

// if a callback is provided, no promise is returned.
// DO NOT mix promises and callback in a codebase.
cozy.destroy("my.domain.book", doc2, function(err){
    console.log('done');
});
```
