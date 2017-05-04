[Cozy](https://cozy.io) Javascript Client
=========================================

`cozy-client-js` is a javascript library made by Cozy. It enables client-side  applications to make requests to the cozy stack.

cozy-client-js is compatible with both cozy architectures.

**Cozy-client-js is still a work-in-progress. There may be some bugs, if you find any, please open an issue.**


## Reminder about cozy architectures

There is two actives cozy architectures:

- The first, thereafter named **v2** is the existing cozy structure. It's based on 1 container / user with many node.js processes in each container (cozy-data-system, cozy-proxy, cozy-home, 1 process per app).
- The second, thereafter named **v3** is the new cozy-stack ([repository](https://github.com/cozy/cozy-stack)). It's based on go and aim to support multiple user on a single process.

**v2** supported both **server-side** applications with their own node.js process and **client-side** applications which run in the user browser.

**v3** will not support **server-side** applications. We will support server side modules managed by server administrator, but the applications themselves will all be **client-side** application.

This repository provides a library which allows you to build a **client-side** application compatible with both version.

The former javascript library for making client-side application was `cozy-browser-sdk`. We aim to deprecate it once `cozy-client-js` reaches feature-parity.

If you already have an application using `cozy-browser-sdk`, you can see what will change in the [transition document](./browser-sdk-transition.md). If you have any doubt, please open an issue!


## Include the library in your application

You can `import`/`require` cozy-client-js using npm & webpack
**TODO** test if `cozy-client-js` compatible with browserify, rollup, ect.

You can also copy-paste the `dist/cozy-client.js` bundle file into your application, and include it in your application `index.html` with  `<script src="./cozy-client.js">`.


## Doctypes & Permissions

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


## Promises & Callbacks

All cozy-client-js functions support callback or promise.

If no callback is provided, a promise is returned.
```javascript
cozy.client.data.create(myBooksDoctype, doc)
    .then(function(result){ console.log('done', result); });
    .catch(function(err){ console.log('fail', err); });
```

If your build pipeline supports it, use async/await for sweet sweet async
```javascript
try {
  result = await cozy.client.data.create(myBooksDoctype, doc)
  console.log('done', result)
} catch(err) {
  console.log('fail', err)
}
```

If for some reason you do not want to use promises, you can pass the `disablePromises` flag to the init function. This way, you will be able to use the functions with a classic callback.

```javascript
cozy.client.init({ disablePromises: true })
cozy.client.data.create(myBooksDoctype, doc, function(err, result) {
    if (err) {
      console.log('fail', err);
    } else {
      console.log('done', result);
    }
});
> undefined
```


## Constructor


### `new cozy.Client(options)`

`new cozy.Client(options)` returns a new cozy client.

It does return a Cozy instance.

It takes the same options object as the `cozy.client.init(options)` function.


### `cozy.client.init(options)`

`cozy.client.init(options)` setups initialize the global cozy instance.

It does not return a value.

- `options` is an object with the following fields:
  * `cozyURL`: absolute url of the cozy stack
  * `disablePromises`: boolean to make function that returns promise used with a classical "callback as last argument" (default value is *false*)
  * `oauth`: an object with the OAuth parameters, see [OAuth](./oauth.md) for details
  * `version`: the version of Cozy (2 or 3), it's optional, by default with a request to the server it can deduce automatically the version. (To be specified for an offline mode)

```javascript
cozy.client.init({
  cozyURL: 'http://cozy.tools:8080',
  disablePromises: false,
  version: 3,
  oauth: {
    clientParams: {/*...*/},
    scopes: ["io.cozy.files:GET"],
    onRegistered: (client, url) => { /* */ },
    storage: new cozy.auth.LocalStorage(window.localStorage)
  }
})
```


## Data API

### `cozy.client.data.create(doctype, attributes)`

`cozy.client.data.create(doctype, attributes)` adds a document to the database.

It returns a promise for the created object. The created object has the same attributes than thoses passed, with an added `_id`. It's the unique identifier for the created document.

If you use an existing doctype, you should follow its expected format. **v2** does not enforce this, but we plan to on **v3**. Anyway, do you want to be the app that creates empty contacts in the native app ?

- `doctype` is a string specifying the [doctype](#doctypes--permissions)
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

- `doctype` is a string specifying the [doctype](#doctypes--permissions)
- `id` is a string specifying the identifier of the document you look for

```javascript
const doc = await cozy.client.data.find(myBooksDoctype, createdBookId)
console.log(doc._id, doc._rev, doc.title, doc.author, doc.isbn)
```


### `cozy.client.data.changesFeed(doctype, options)`

`cozy.client.data.changesFeed(doctype, options)` returns the last changes from CouchDB for the given doctype

It returns a promise for the changes.

- `doctype` is a string specifying the [doctype](#doctypes--permissions)
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

- `doctype` is a string specifying the [doctype](#doctypes--permissions)
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

- `doctype` is a string specifying the [doctype](#doctypes--permissions)
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

- `doctype` is a string specifying the [doctype](#doctypes--permissions)
- `doc` is an object with *at least* the fields `_id` and `_rev` containing the identifier and revision of the file you want to destroy.

```javascript
await cozy.client.data.delete(myBooksDoctype, updated)
```


### `cozy.client.data.defineIndex(doctype, fields)`

`cozy.client.data.defineIndex(doctype, fields)` creates an index for a document type. It is idempotent, it can be called several time with no bad effect.

It returns a promise for an **indexReference**, which can be passed to `cozy.data.query`.

- `doctype` is a string specifying the [doctype](#doctypes--permissions)
- `fields` is an array of the fields name to index

**Warning**: when used on **v2**, a map-reduce view is created internally, when used on **v3**, we use couchdb built-in mango queries. Because of this, more complex queries are not (yet) supported with **v2**.

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

**Warning**: complex mango queries are not, and may never be compatible with **v2**

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


## Files API

### `cozy.client.files.create(data, options)`

`cozy.client.files.create(data, options)` is used to upload a new file onto your cozy

It returns a promise for the document of the file created.

- `data` can be of the following type: `Blob`, `File`, `ArrayBuffer`, `ArrayBufferView`, `stream.Readable` (node) or `string`.
- `options` is an object with the following fields:
  * `name`: specify the name of the file. optional for a data of type `File`, type, mandatory otherwise.
  * `dirID`: specify identifier of the file's directory. if empty, it is the root directory.
  * `contentType`: specify the content type of the uploaded data. For a `File` type, it is be handled automatically. default: `application/octet-stream`.
  * `checksum`: the base64-encoded (with padding) MD5 digest of the file (optional).
  * `lastModifiedDate`: a date to specify the last modification time to use for the uploaded file. If the given `data` is a `File` instance, the `lastModifiedDate` is automatically used (not overridden).

**Warning**: this API is not v2 compatible.

```javascript
const created = await cozy.client.files.create(blob, {
    name: "filename",
    dirID: "123456",
})
const fileCreated = await cozy.client.files.create(fileInput.files[0], {
  dirID: "",
  checksum: "rL0Y20zC+Fzt72VPzMSk2A==",
  lastModifiedDate: new Date()
})
```


### `cozy.client.files.createDirectory(options)`

`cozy.client.files.createDirectory(options)` is used to create a new directory.

It returns a promise for the document of the directory created.

- `options` is an object with the following fields:
  * `name`: specify the name of the directory
  * `dirID`: specify identifier of the file's directory. if empty, it is the root directory.
  * `lastModifiedDate`: a date to specify the last modification time to use for the directory.

```javascript
const created = await cozy.client.files.createDirectory({
  name: "mydir",
  dirID: "123456",
  lastModifiedDate: new Date()
})
```


### `cozy.client.files.createDirectoryByPath(path)`

`cozy.client.files.createDirectoryByPath(path)` is used to create one or more directories for a given path.

It returns a promise for the document of the last directory created.

- `path` is a string

```javascript
const barDirectory = await cozy.client.files.createDirectoryByPath('/Foo/Bar')
```


### `cozy.client.files.updateById(id, data, options)`

`cozy.client.files.updateById(id, data, options)` is used to update the content of an already existing file.

It returns a promise for the document of the file updated.

- `id` is a string specifying the identifier of the file to modify.
- `data` can be of the following type: `Blob`, `File`, `ArrayBuffer`, `ArrayBufferView` or `string`.
- `options` is an object with the following fields:
  * `contentType`: specify the content type of the uploaded data. For a `File` type, it is be handled automatically. default: `application/octet-stream`.
  * `checksum`: the base64-encoded (with padding) MD5 digest of the file (optional).
  * `lastModifiedDate`: a date to specify the last modification time to use for the uploaded file. If the given `data` is a `File` instance, the `lastModifiedDate` is automatically used (not overridden).
  * `ifMatch`: the previous revision of the file (optional). The update will be rejected if the remote revision doesn't match the given one.

```javascript
const updated = await cozy.client.files.updateById("654321", blob, {
  contentType: "text/plain",
  checksum: "rL0Y20zC+Fzt72VPzMSk2A==",
  lastModifiedDate: new Date(),
  ifMatch: "1-0e6d5b72"
})
```


### `cozy.client.files.updateAttributesById(id, attrs, options)`

`cozy.client.files.updateAttributesById(id, attrs, options)` is used to update the attributes associated to a file or directory specified by its id.

It returns a promise for the document of the updated directory or file.

- `id` is a string specifying the identifier of the file or directory to update
- `attrs` is an object containing the changes
- `options` is an object with the following fields:
  * `ifMatch`: the previous revision of the file (optional). The update will be rejected if the remote revision doesn't match the given one.

```javascript
const updated = await cozy.client.files.updateAttributesById("12345", { tags: ["foo"] }, { ifMatch: "1-0e6d5b72" })
```


### `cozy.client.files.updateAttributesByPath(path, attrs, options)`

`cozy.client.files.updateAttributesByPath(path, attrs, options)` is used to update the attributes associated to a file or directory specified by the given path.

It returns a promise for the document of the updated directory or file.

- `path`: string specifying the path of the file or directory to update
- `attrs` is an object containing the changes
- `options` is an object with the following fields:
  * `ifMatch`: the previous revision of the file (optional). The update will be rejected if the remote revision doesn't match the given one.

```javascript
const updated = await cozy.client.files.updateAttributes("/foo/bar", { executable: true }, { ifMatch: "1-0e6d5b72" })
```


### `cozy.client.files.statById(id, offline, options)`

`cozy.client.files.statById(id, offline, options)` is used to get the metadata of a file specified by its id.

It returns a promise for the information of the file or directory. In the case of a directory, it contains the list of files and sub-directories inside it. This list is limited to 30 items by default, but the `options` argument allows you
to fetch more items.

- `id` is a string specifying the file’s or directory’s identifier
- `offline` is a boolean (default to `true`)
- `options` is an object with the following fields:
  * `skip`: number of items to skip (optional)
  * `limit`: maximum number of items to return (optional).

By default, `statById` will fetch the metadata from the local database, if it is available. Set the second parameter to `false` to query the server.

Returned directory have a `relations()` method that allow to access to their content:
```javascript
const dir = await cozy.client.files.statById("io.cozy.files.root-dir");
dir.relations('contents').forEach( (file) => … )
```


### `cozy.client.files.statByPath(path)`

`cozy.client.files.statByPath(path)` is used to get the metadata of a file specified by its path.

- `path`: string specifying the path of the file or directory;


### `cozy.client.files.trashById(id, options)`

`cozy.client.files.trashById(id, options)` is used to move the file or directory identified by the given id to trash.

It returns a promise for the document of the file or directory moved to trash.

- `id` is a string specifying the identifier of the file or directory
- `options` is an object with the following fields:
  * `ifMatch`: the previous revision of the file (optional). The update will be rejected if the remote revision doesn't match the given one.

```javascript
const trashed = await cozy.client.files.trash("1234567")
```

### `cozy.client.files.destroyById(id)`

`cozy.client.files.destroyById(id)` is used to shred (destroy definitively) a file or directory identified by the given id.

The file must be in the trash folder first.

It returns a promise for completion

- `id` is a string specifying the identifier of the file or directory

```javascript
const trashed = await cozy.client.files.trash("1234567")
await cozy.client.files.destroyById("1234567")
```

### `cozy.client.files.restoreById(id)`

`cozy.client.files.restoreById(id)` is used to restore a file or directory identified by the given id. The file must be in the trash folder.

It returns a promise for the restored doc. (with updated parent)

- `id` is a string specifying the identifier of the file or directory

```javascript
const trashed = await cozy.client.files.trash("1234567")
const restored = await cozy.client.files.restore("1234567")
```

### `cozy.client.files.listTrash()`

`cozy.client.files.listTrash()` returns a promise for the list of all files in the trash.

```javascript
const trashedFilesAndFolders = await cozy.client.files.listTrash()
```


### `cozy.client.files.clearTrash()`

`cozy.client.files.clearTrash()` destroys definitively all trash content.

```javascript
await cozy.client.files.clearTrash()
```


### `cozy.client.files.downloadById(id)`

`cozy.client.files.downloadById(id)` is used to download a file identified by the given id. The file is downloaded through the browser fetch method, use this if you plan to use the file in javascript after.

It returns a promise of a fetch `Response` object. This response object can be used to extract the information in the wanted form.

- `id` is a string specifying the identifier of the file

```javascript
const response = await cozy.client.files.downloadById("1234567")
const blob = await response.blob()
const text = await response.text()
const buff = await response.arrayBuffer()
response.pipe(fs.createWriteStream('/some/file'))
```


### `cozy.client.files.downloadByPath(path)`

`cozy.client.files.downloadByPath(path)` is used to download a file identified by the given path. The file is downloaded through the browser fetch method, use this if you plan to use the file in javascript after.

It returns a promise of a fetch `Response` object. This response object can be used to extract the information in the wanted form.

- `path` is a string specifying the path of the file

```javascript
const response = await cozy.client.files.downloadByPath("/foo/hello.txt")
const blob = await response.blob()
const text = await response.text()
const buff = await response.arrayBuffer()
response.pipe(fs.createWriteStream('/some/file'))
```

### `cozy.client.files.getDownloadLinkById(id)`

`cozy.client.files.getDownloadLinkById(id)` is used to get a download link for the file identified by the given id.

It returns a promise for the download link.
Download link are only valid for a short while (default 1 hour)
You can use this link to start a browser download like this:

```javascript
const href = await cozy.client.files.getDownloadLinkById("id424242")
const link = document.createElement('a')
link.href = href
link.download = fileName
document.body.appendChild(link) && link.click()
```

- `id` is a string specifying the id of the file


### `cozy.client.files.getDownloadLinkByPath(path)`

`cozy.client.files.getDownloadLinkByPath(path)` is used to get a download link for the file identified by the given path.

It returns a promise for the download link.
Download link are only valid for a short while (default 1 hour)
You can use this link to start a browser download like this:

```javascript
const href = await cozy.client.files.getDownloadLinkByPath("/foo/hello.txt")
const link = document.createElement('a')
link.href = href
link.download = fileName
document.body.appendChild(link) && link.click()
```

- `path` is a string specifying the path of the file


### `cozy.client.files.getArchiveLink(paths, name)`

`cozy.client.files.getArchiveLink(paths, name)` is used to get a download link for a zip file containing all the files identified by the given paths.

It returns a promise for the download link.
Download link are only valid for a short while (default 1 hour)
You can use this link to start a browser download (see code in getDownloadLink)

```javascript
const href = await cozy.client.files.getArchiveLink([
  "/foo/hello.txt",
  "/bar/test.txt"
])
// href === "/files/archive/b1c127c25d99f0b37ac2c2a907f36069/files.zip"

const href = await cozy.client.files.getArchiveLink(["/foo/hello.txt"], "secretproject")
// href === "/files/archive/bc2a901c127c25d99f0b37a36069c27f/secretproject.zip"
```

- `paths` is an array of paths
- `name` is the optional name for the generated archive file (default "files").


### `cozy.client.files.getFilePath(file, folder)`

`cozy.client.files.getFilePath(file, folder)` is a helper that generates the file path from root directory. It may be used to specify the path parameter for functions like
`cozy.client.files.downloadByPath`, `cozy.client.files.getDownloadLink` or `cozy.client.files.getArchiveLink`.


### `cozy.client.data.addReferencedFiles(doc, fileIds)`

`cozy.client.data.addReferencedFiles(doc, fileIds)` binds the files to the document.
(see cozy-stack [documentation](https://github.com/cozy/cozy-stack/blob/master/docs/references-docs-in-vfs.md) for more details)


### `cozy.client.data.listReferencedFiles(doc)`

`cozy.client.data.listReferencedFiles(doc)` list the files bound to the document.
(see cozy-stack [documentation](https://github.com/cozy/cozy-stack/blob/master/docs/references-docs-in-vfs.md) for more details).

It returns a promise for a list of filesIds. Files must then be fetched separately.



## Intents

### `cozy.client.intents.create()`

`cozy.client.intents.create(action, doctype [, data, permissions])` create an intent. It returns a modified Promise for the intent document, having a custom `start(element)` method. This method interacts with the DOM to append an iframe to the given HTML element. This iframe will provide an access to an app, which will serve a service page able to manage the intent action for the intent doctype. The `start(element)` method returns a promise for the result document provided by intent service.

An intent has to be created everytime an app need to perform an action over a doctype for wich it does not have permission. For example, the Cozy Drive app should create an intent to `pick` a `io.cozy.contacts` document. The cozy-stack will determines which app can offer a service to resolve the intent. It's this service's URL that will be passed to the iframe `src` property.

Once the intent process is terminated by service, the iframe is removed from DOM.

#### Example
```js
cozy.client.intents.create('EDIT', 'io.cozy.photos', {action: 'crop', width: 100, height: 100})
  .start(document.getElementById('intent-service-wrapper'))
```

See cozy-stack [documentation](https://github.com/cozy/cozy-stack/blob/master/docs/intents.md) for more details.

### `cozy.client.intents.createService()`

`cozy.client.intents.createService([intentId, window])` has to be used in the intent service page. It initializes communication with the parent window (remember: the service is supposed to be in an iframe).

If `intentId` and `window` parameters are not provided the method will try to retrieve them automatically.

It returns a *service* object, which provides the following methods :
 * `getData()`: returns the data passed to the service by the client.
 * `getIntent()`: returns the intent
 * `terminate(doc)`: ends the intent process by passing to the client the resulting document `doc`. An intent service may only be terminated once.
 * `cancel()`: ends the intent process by passing a `null` value to the client. This method terminate the intent service the same way that `terminate()`.

#### Example
```js
cozy.client.intents.createService('77bcc42c-0fd8-11e7-ac95-8f605f6e8338', window)
  .then(service => {
    const data = intentService.getData()

    // [...]
    // Do stuff with data
    // [...]

    const resultingDoc = {
      type: 'io.cozy.photos',
      width: 100,
      height: 100
    }

    intentService.terminate(resultingDoc)
  })
```



## Settings

### `cozy.client.settings.diskUsage()`

`cozy.client.settings.diskUsage` is used to known informations about the total used space on the cozy disk.

It returns a promise of the document of the disk-usage of id `io.cozy.settings.disk-usage`, with attributes containing a `used` field a string of how many *bytes* are used on the disk.

The `used` field is a string since the underlying data is an `int64` which may not be properly represented in javascript.

```javascript
const usage = await cozy.client.settings.diskUsage()
console.log(usage.attributes.used)
```

### `cozy.client.settings.changePassphrase(oldPassphrase, newPassphrase)`

`cozy.client.settings.changePassphrase`is used to change the passphrase of the current user. You must supply the currently used passphrase, as well as the new one. It simply returns a promise that will resolve if the change was successful.

### `cozy.client.settings.getInstance()`

`cozy.client.settings.getInstance` returns a promise with informations about the current Cozy instance, such as the locale or the public name. See cozy-stack [documentation](https://github.com/cozy/cozy-stack/blob/master/docs/settings.md#response-3) for more details.

### `cozy.client.settings.updateInstance(instance)`

`cozy.client.settings.updateInstance` is used to update informations about the current instance. `instance` is an object that should be based on to the one you receive from `cozy.settings.getInstance()`. It returns a promise with the updated instance information.

### `cozy.client.settings.getClients()`

`cozy.client.settings.getClients` returns a promise for an array of registered clients. See the [cozy-stack documentation](https://github.com/cozy/cozy-stack/blob/master/docs/settings.md#response-5) for more details.

### `cozy.client.settings.deleteClientById('123')`

`cozy.client.settings.deleteClientById` revokes the specified client from the instance. This method returns a promise that simply resolves if the revokation was successful.

## Authentication and OAuth (internal)

### `cozy.client.auth.registerClient(clientParams)`

**This method is for internal or advanced usages. Please see [OAuth document](./oauth.md) to see how to use OAuth with this library**

`cozy.client.auth.registerClient` is used to register a new client with the specified informations.

It returns a promise of the newly registered Client, along with a client secret and identifier.

- `clientParams` are client parameters: a non registered instance of `cozy.client.auth.Client`

```js
const clientParams = new cozy.client.auth.Client({
  redirectURI: 'http://localhost:3000/',
  softwareID: 'mysoftware',
  clientName: 'Great mobile App'
})
const client = await cozy.client.auth.registerClient(clientParams)
const clientID = client.clientID
const clientSecret = client.clientSecret
```

### `cozy.client.auth.updateClient(client, resetSecret = false)`

**This method is for internal or advanced usages. Please see [OAuth document](./oauth.md) to see how to use OAuth with this library**

`cozy.client.auth.updateClient` is used to update informations about the oauth client.

It returns a promise for the updated Client.

- `client` a registered instance of `cozy.client.auth.Client`
- `resetSecret` by setting `resetSecret` to `true`, a new Secret is generated.

```js
const client = await cozy.client.auth.registerClient(clientParams)

// change the client's version
client.softwareVersion = "v1.2.3"
const client = await cozy.client.auth.updateClient(client)


// change the client secret
const client = await cozy.client.auth.updateClient(client, true)
```

### `cozy.client.auth.unregisterClient(client)`

**This method is for internal or advanced usages. Please see [OAuth document](./oauth.md) to see how to use OAuth with this library**

`cozy.client.auth.unregisterClient` is used to unregister a client.

It returns a promise for completion

- `client` a registered instance of `cozy.client.auth.Client`

```js
const client = await cozy.client.auth.registerClient(clientParams)
await cozy.auth.client.unregisterClient(client)
```

### `cozy.auth.client.getClient(client)`

**This method is for internal or advanced usages. Please see [OAuth document](./oauth.md) to see how to use OAuth with this library**

`cozy.client.auth.getClient` is used to fetch a registered client with the specified clientID and token.

It returns a promise of the client returned by the server.

- `client` is a registered `cozy.client.auth.Client`

```js
const client = await cozy.client.auth.getClient(new cozy.client.auth.Client({
  clientID: '1235'
}))
```


### `cozy.client.auth.getAuthCodeURL(client, scopes)`

**This method is for internal or advanced usages. Please see [OAuth document](./oauth.md) to see how to use OAuth with this library**

`cozy.client.auth.getAuthCodeURL` is used to generate the URL on which the user should go to give access to the application with the specified scopes.

It returns an object with the url and a generated random state that should be stored to be matched again for the token exchange phase.

- `client` is a registered `cozy.client.auth.Client`
- `scopes` is an array of permission strings formatted as `key:access` (like `files/images:read`)

```js
const {url, state} = cozy.client.auth.getAuthCodeURL(client, ['files/images:read'])

// save state and redirect to url
localStorage.setItem("oauthstate", state)
window.location.replace(url)
```


### `cozy.client.auth.getAccessToken(client, state, pageURL)`

**This method is for internal or advanced usages. Please see [OAuth document](./oauth.md) to see how to use OAuth with this library**

`cozy.client.auth.getAccessToken` is used from the page on which the user should have redirected after authorizing the application.

It returns a promise of an `cozy.client.auth.AccessToken`. The method verifies that the specified state and the extracted one match. It then ask the server for a new access token and returns it.

- `client` is a registered `cozy.client.auth.Client`
- `state` is the previously stored state that is matched against to prevent CSRF attacks
- `pageURL` is the url of the current page from the which a code and state will be extracted. If empty, `window.location.href` is used

```js
const client = cozy.client.auth.getClient(/* ... */)
const state = localStorage.getItem("oauthstate")
const pageURL = window.location.href
const token = cozy.client.auth.getAccessToken(client, state, pageURL)
```


### `cozy.client.auth.refreshToken`

**This method is for internal or advanced usages. Please see [OAuth document](./oauth.md) to see how to use OAuth with this library**

`cozy.client.auth.refreshToken` is used to refresh a token that is expired or no more valid.

- `client` is a registered `cozy.client.auth.Client`
- `token` is a valid `cozy.client.auth.AccessToken`

```js
const newtoken = cozy.client.auth.refreshToken(client, oldtoken)
```


### `cozy.client.auth.Client`

**This class is for internal or advanced usages. Please see [OAuth document](./oauth.md) to see how to use OAuth with this library**

`cozy.client.auth.Client` is a class representing an OAuth client. It can be registered, in which case it is known by the server and has a `clientID` and `clientSecret`.

```
type Client {
  clientID: string;                // informed by server
  clientSecret: string;            // informed by server
  registrationAccessToken: string; // informed by server
  redirectURI: string; // mandatory
  softwareID: string;  // mandatory
  softwareVersion: string;
  clientName: string;  // mandatory
  clientKind: string;
  clientURI: string;
  logoURI: string;
  policyURI: string;
}
```

The constructor type is as follow:

- `url` is a string of the url of the cozy
- `options` is an object with the same fields as a client object, or is an instance of client

```
new Client(url, options)
```


### `cozy.client.auth.AccessToken`

**This class is for internal or advanced usages. Please see [OAuth document](./oauth.md) to see how to use OAuth with this library**

`cozy.client.auth.AccessToken` is a class representing an OAuth access token.

```
type Token {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  scope: string
}
```

The constructor takes an object with the same fields as a Token object.

Future APIs
-----------

This is the end of what we already have implemented, if you want to do something else (manipulating binary file, sharing, ...), you will have to wait a bit :smile:.

As a teaser, you can go to our [planned API document](./planned.md) to see APIs we plan to add to this library. Feel free to open an issue if you see something missing, or if you disagree with the API design !
