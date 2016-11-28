[Cozy](https://cozy.io) Javascript Client
=========================================

`cozy-client-js` is a javascript library made by Cozy. It enables client-side  applications to make requests to the cozy stack.

cozy-client-js is compatible with both cozy architectures.

**Cozy-client-js is still a work-in-progress. There may be some bugs, if you find any, please open an issue.**


Reminder about cozy architectures
---------------------------------

There is two actives cozy architectures :

- The first, thereafter named **v2** is the existing cozy structure. It's based on 1 container / user with many node.js processes in each container (cozy-data-system, cozy-proxy, cozy-home, 1 process per app).
- The second, thereafter named **v3** is the new cozy-stack ([repository](https://github.com/cozy/cozy-stack)). It's based on go and aim to support multiple user on a single process.

**v2** supported both **server-side** applications with their own node.js process and **client-side** applications which run in the user browser.

**v3** will not support **server-side** applications. We will support server side modules managed by server administrator, but the applications themselves will all be **client-side** application.

This repository provides a library which allows you build a **client-side** application compatible with both version.

The former javascript library for making client-side application was `cozy-browser-sdk`. We aim to deprecate it once `cozy-client-js` reaches feature-parity.

If you already have an application using `cozy-browser-sdk`, you can see what will change in the [transition document](./browser-sdk-transition.md). If you have any doubt, please open an issue!

Include the library in your application
----------------------

You can `import`/`require` cozy-client-js using npm & webpack
**TODO** test if `cozy-client-js` compatible with browserify, rollup, ect.

You can also copy-paste the `dist/cozy-client.js` bundle file into your application, and include it in your application `index.html` with  `<script src="./cozy-client.js">`.


Doctypes & Permissions
----------------------

A doctype is a simple javascript string identifying a type of document.
Some basic doctypes are provided by cozy, but you can pick your own.

Cozy **v3** expects doctypes to be qualified to ensure uniqueness.

All doctypes designed by the cozy's team will be prefixed with `io.cozy.`, or `io.cozy.labs.`

Any doctype you introduce is expected to be prefixed with the reverse notation of a domain you own (JLS#7.7). If you do not own a domain, you can also use a reverse notation of your email address.

You are free to reuse another applications documents by using their doctypes but you **SHOULD** discuss with the domain owner if you want to add fields or format them differently.

To ensure retrocompatibility, when used on stack v2, all known doctypes will be auto-prefixed, but a warning will be written to the console. Unknown doctype will cause a fatal error. DO NOT rely on this behaviour in new applications, use qualified doctypes.

```javascript
// contacts is a doctype defined by cozy
cozyContactsDoctype = "io.cozy.contacts"
// your application handle books, let's create a doctype
myBooksDoctype = "com.mydomain.book"
```

When you use a doctype, even one created by your application, you need to ask for its permission in your manifest. How to do it depends on which stack you are developping for.

**TODO** Have some docs about **v2** package.json vs **v3** manifest.webapp


Promises & Callbacks
--------------------

All cozy-client-js functions support callback or promise.

If no callback is provided, a promise is returned.
```javascript
cozy.create(myBooksDoctype, doc)
    .then(function(result){ console.log('done', result); });
    .catch(function(err){ console.log('fail', err); });
```

If your build pipeline supports it, use async/await for sweet sweet async
```javascript
try {
  result = await cozy.create(myBooksDoctype, doc)
  console.log('done', result)
} catch(err) {
  console.log('fail', err)
}
```

If a callback is provided, NO promise is returned.
**DO NOT** mix promises and callback in a codebase.
```javascript
cozy.create(myBooksDoctype, doc, function(err, result){
    if (err) {
      console.log('fail', err);
    } else {
      console.log('done', result);
    }
});
> undefined
```


Implemented API
---------------

### `cozy.init(options)`

`cozy.init(options)` setup cozy-client-js and perform the necessary steps to retrieve the application token. Our goal is for you developer to not worry about how the token is retrieved, as it will depend on cozy version and context.

Supported options are:

 - `target` : if the cozy you want to speak to is not on the same origin than the app. Useful for test, should not used for app installed inside Cozy.

```javascript
await cozy.init()
// let's do something
```

### `cozy.create(doctype, attributes)`

`create(doctype, attributes)` adds a document to the database.

If you use an existing doctype, you should follow its expected format. **v2** does not enforce this, but we plan to on **v3**. Anyway, do you want to be the app that creates empty contacts in the native app?

The attributes will be passed to `JSON.stringify`, if it is a complex or cyclic object, add a `toJSON` method to it (native behaviour of JSON.stringify).

This function returns a promise for the created object. The created object has the same attributes than passed with an added `_id`. It's the unique identifier for the created document.

On **v3**, an extra field `_rev` is added, it is the unique identifier for the document revision, after creation, it will be of the shape `1-xxxxxxxxx` for first revision.

```javascript
// simple object
var book = { title: "Moby Dick", author:"Herman Melville", isbn: "42" }

created = await cozy.create(myBooksDoctype, book)
// same fields
console.log(created.title, created.author, created.isbn)
// _id, _rev are added
console.log(created._id, created._rev)
// let's keep it for later
createdBookId = created._id
```

### `cozy.find(doctype, id)`

`cozy.find(doctype, id)` returns the document with the given ID.

This functions returns a promise for the document. It will have the same fields as the return value from `create`, including `_id` and `_rev`.

If the document does not exist, the promise will reject or the callback will be passed an error.

```javascript
doc = await cozy.find(myBooksDoctype, createdBookId)
console.log(doc._id, doc._rev, doc.title, doc.author, doc.isbn)
```

### `cozy.update(doctype, doc, newdoc)`

`cozy.update(doctype, doc, newdoc)` replaces the document by a new version.

This function returns a promise for the updated document. The updated document will have the same fields and values than provided newdoc, the same `_id` than doc, and a `_rev` incremented from doc's number.

The only field read from doc are `_id` and `_rev`.

If the document does not exist, the promise will reject with an error.
If the document current `_rev` does not match the passed one, it means there is a conflict and the promise reject with an error.

```javascript
var updates = { title: "Moby Dick !", author:"THE Herman Melville"}
updated = await cozy.update(myBooksDoctype, doc, updates)
console.log(updated._id === doc._id) // _id does not change
console.log(updated._rev) // 2-xxxxxx
console.log(updated.title, updated.year) // fields are changed
console.log(updated.isbn === undefined) // update erase fields
```

### `cozy.updateAttributes(doctype, id, changes)`

`cozy.updateAttributes(doctype, id, changes)` applies change to the document.

This function returns a promise for the updated document. The updated document will be the result of merging changes into the document with given `_id` and a incremented `_rev`.

If the document does not exist, the promise will reject or the callback will be passed an error.
This functions give 3 attempts not to conflicts.

```javascript
var updates = { year: 1852}
updated = await cozy.updateAttributes(myBooksDoctype, id, updates)
console.log(updated._id === doc._id) // _id does not change
console.log(updated._rev) // 3-xxxxxx
console.log(updated.year) // fields are changed
console.log(updated.isbn) // updateAttributes preserve other fields
```

### `cozy.destroy(doctype, doc)`

`cozy.destroy(doctype, doc )` will erase the document from the database.

The only field read from doc are `_id` and `_rev`.

This function returns a promise which will resolve when the document has been deleted.

If the document does not exist, the promise will reject with an error.
If the document current `_rev` does not match the passed one, it means there is a conflict and the promise reject with an error.

```javascript
await cozy.destroy(myBooksDoctype, updated)
```


### `cozy.defineIndex(doctype, fields)`

`cozy.defineIndex(doctype, fields)` creates an index for a document type.

Fields is an array of fields to index on.

This function returns a promise for an **indexReference**, which can be passed to `cozy.query`

When used on **v2**, a map-reduce view is created internally, when used on **v3**, we use couchdb built-in mango queries. **Warning** because of this, more complex queries are not (yet) supported with **v2**

defineIndex is idempotent, it can be called several time with no bad effect

```javascript
booksByYearRef = await cozy.defineIndex(myType, 'year', 'rating')
```

### `cozy.query(indexReference, query)`

`cozy.query(indexReference, query)` find documents using an index.

query supports the following fields:

- **selector** : a mango selector
- **limit** : maximum number of results
- **skip** : ignore the first x results (pagination)

Results will be returned in order according to the index.

**Warning** Complex mango queries are not, and may never be compatible with **v2**

```javascript
results = await cozy.query(booksByYearRef, {
  "selector": {year: 1851},
  "limit": 3,
  "skip": 1
})

results.length == 3 // we limited to 3 results
resuts[0]._id === doc._id
resuts[0].title === "Moby Dick"
resuts[0].rating < 2 // lowest rating first
```

### `cozy.upload(data, options)`

`upload(data, options)` is used to upload a new file onto your cozy, or update an already existing one.

`data` can be of the following type: `Blob`, `File`, `ArrayBuffer`, `ArrayBufferView` or `string`.

`options` is an object with the following fields:

  - **mode**: specify the upload mode `create` or `update`. default: `create`
  - **name**: in `create` mode, specify the name of the file. optional for a data of type `File`, type, mandatory otherwise.
  - **folderId**: in `create` mode, specify identifier of the file's folder. if empty, it is the root folder.
  - **fileId**: in `update` mode, specify the identifier of the file to modify.
  - **contentType**: specify the content type of the uploaded data. For a `File` type, it is be handled automatically. default: `application/octet-stream`.

**Warning** This API is not V2 compatible.

```javascript
const created = await cozy.upload(blob, {
    mode: "create",
    name: "filename",
    folderId: "123456",
})

const updated = await cozy.upload(blob, {
    mode: "update",
    fileId: "654321",
    contentType: "text/plain",
})

const fileUpdated = await cozy.upload(fileInput.files[0], { folderId: "" })
```

Future APIs
-----------

This is the end of what we already have implemented, if you want to do something else (manipulating binary file, sharing, ...), you will have to wait a bit :smile: .

As a teaser, you can go to our [planned API document](./planned.md) to see APIs we plan to add to this library. Feel free to open an issue if you see something missing, or if you disagree with the API design !
