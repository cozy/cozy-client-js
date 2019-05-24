# Files API

### `cozy.client.files.create(data, options)`

`cozy.client.files.create(data, options)` is used to upload a new file onto your cozy

It returns a promise for the document of the file created.

- `data` can be of the following type: `Blob`, `File`, `ArrayBuffer`, `ArrayBufferView`, `stream.Readable` (node) or `string`.
- `options` is an object with the following fields:
  * `name`: specify the name of the file. optional for a data of type `File`, type, mandatory otherwise.
  * `dirID`: specify identifier of the file's directory. if empty, it is the root directory.
  * `contentType`: specify the content type of the uploaded data. For a `File` type, it is handled automatically in browsers (default: `application/octet-stream`). For nodejs, you can rely on an external module like [mime](https://github.com/broofa/node-mime)
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
const trashed = await cozy.client.files.trashById("1234567")
```

### `cozy.client.files.destroyById(id, options)`

`cozy.client.files.destroyById(id, options)` is used to shred (destroy definitively) a file or directory identified by the given id.

The file must be in the trash folder first.

It returns a promise for completion

- `id` is a string specifying the identifier of the file or directory
- `options` is an object with the following fields:
  * `ifMatch`: the previous revision of the file (optional). The update will be rejected if the remote revision doesn't match the given one.


```javascript
const trashed = await cozy.client.files.trashById("1234567")
await cozy.client.files.destroyById("1234567")
```

### `cozy.client.files.restoreById(id)`

`cozy.client.files.restoreById(id)` is used to restore a file or directory identified by the given id. The file must be in the trash folder.

It returns a promise for the restored doc. (with updated parent)

- `id` is a string specifying the identifier of the file or directory

```javascript
const trashed = await cozy.client.files.trashById("1234567")
const restored = await cozy.client.files.restoreById("1234567")
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


### `cozy.client.files.getArchiveLinkByPaths(paths, name)`

`cozy.client.files.getArchiveLinkByPaths(paths, name)` is used to get a download link for a zip file containing all the files identified by the given paths.

It returns a promise for the download link.
Download link are only valid for a short while (default 1 hour)
You can use this link to start a browser download (see code in getDownloadLinkById)

```javascript
const href = await cozy.client.files.getArchiveLinkByPaths([
  "/foo/hello.txt",
  "/bar/test.txt"
])
// href === "/files/archive/b1c127c25d99f0b37ac2c2a907f36069/files.zip"

const href = await cozy.client.files.getArchiveLinkByPaths(["/foo/hello.txt"], "secretproject")
// href === "/files/archive/bc2a901c127c25d99f0b37a36069c27f/secretproject.zip"
```

- `paths` is an array of paths
- `name` is the optional name for the generated archive file (default "files").


### `cozy.client.files.getArchiveLinkByIds(ids, name)`

`cozy.client.files.getArchiveLinkByIds(ids, name)` is used to get a download link for a zip file containing all the files identified by the given ids.

It returns a promise for the download link.
Download link are only valid for a short while (default 1 hour)
You can use this link to start a browser download (see code in getDownloadLinkById)

```javascript
const href = await cozy.client.files.getArchiveLinkByIds([
  "1234567",
  "9876543"
])
// href === "/files/archive/b1c127c25d99f0b37ac2c2a907f36069/files.zip"

const href = await cozy.client.files.getArchiveLinkByIds(["1592673"], "secretproject")
// href === "/files/archive/bc2a901c127c25d99f0b37a36069c27f/secretproject.zip"
```

- `ids` is an array of ids
- `name` is the optional name for the generated archive file (default "files").


### `cozy.client.files.getFilePath(file, folder)`

`cozy.client.files.getFilePath(file, folder)` is a helper that generates the file path from root directory. It may be used to specify the path parameter for functions like
`cozy.client.files.downloadByPath`, `cozy.client.files.getDownloadLinkByPath` or `cozy.client.files.getArchiveLinkByPaths`.


### `cozy.client.data.addReferencedFiles(doc, fileIds)`

`cozy.client.data.addReferencedFiles(doc, fileIds)` binds the files to the document.
(see cozy-stack [documentation](https://docs.cozy.io/en/cozy-stack/references-docs-in-vfs/) for more details)


### `cozy.client.data.removeReferencedFiles(doc, fileIds)`

`cozy.client.data.removeReferencedFiles(doc, fileIds)` unbinds the files to the document.
(see cozy-stack [documentation](https://docs.cozy.io/en/cozy-stack/references-docs-in-vfs/) for more details)


### `cozy.client.data.listReferencedFiles(doc)`

`cozy.client.data.listReferencedFiles(doc)` list the files bound to the document.
(see cozy-stack [documentation](https://docs.cozy.io/en/cozy-stack/references-docs-in-vfs/) for more details).

It returns a promise for a list of filesIds. Files must then be fetched separately.

### `cozy.client.data.fetchReferencedFiles(doc, options, sort)`

`cozy.client.data.fetchReferencedFiles(doc, options, sort)` fetches the files bound to the document.
(see cozy-stack [documentation](https://docs.cozy.io/en/cozy-stack/references-docs-in-vfs/) for more details).

It returns a promise for a list of files.

There are 2 alternatives for pagination, that can be used through the `option` parameter: `cursor` and `skip`. For more details, see how the stack handles [pagination](https://docs.cozy.io/en/cozy-stack/jsonapi/#pagination). Note that cursor-based pagination performs way better than skip-based on large volumes.

* `option` is an object with the following fields:
  * `cursor` (recommended): specify the view's key and the starting docid. The starting docid can be empty for the first query and take the last returned docid for the next ones.
  * `skip` (not recommended): ignore the first x results for pagination.
  * `limit`: maximum number of results.
* `sort` is a string which can be `datetime` (default) or `id`. *Warning:*  `datetime` is not compatible with cursor-based pagination. 

```javascript
const key = [DOCTYPE_ALBUMS, album._id]
const cursor = [key, startDocid]
const result = await cozyClient.data.fetchReferencedFiles(
  album,
  { cursor },
  'id'
)
```

### `cozy.client.files.query(indexReference, query)`

`cozy.client.files.query(indexReference, query)` find files using an index.

It returns a promise with a list of files matching the query. Results will be returned in the order defined for the index.

- `query` is an object with the following fields:
  * `selector`: a mango selector
  * `limit`: maximum number of results
  * `skip`: ignore the first x results (pagination)
  * `wholeResponse`: when set to true, the whole query response will be returned instead of just the docs. This is useful when paginating, because you'll get the `next` property in the response object.

```javascript
const results = await cozy.client.files.query(photosByDate, {
  "selector": {"class": "image"},
  "limit": 3,
  "skip": 1
})
```
