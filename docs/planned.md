# Cozy-client-js API - Planned features

This document define the APIs we will be implementing in the future, feel free
to comment on them through issues or PR !

## VFS API

**TO BE DETERMINED** should this be made compatible with v2?

```javascript

// All these functions do not exist in cozy-browser-sdk and can be
// inefficiently made compatible with stack v2 by manipulating files
// and directories docTypes.

// vfs.ls(path) returns the children of a given directory
children = await cozy.files.ls("/path/to/dir")

// vfs.getURL(path) returns an url for this path
// the url can be used in an <image> or <audio> tag
url = await cozy.files.getURL("/path/to/file.ext")

// vfs.move(current, next) move the directory or file at the given path then
// another path
await cozy.files.move("/path/to/dir_or_file", "/new/path/to/dir_or_file")

// vfs.copy(current, next) copy the directory or file at the given path to
// another path
await cozy.files.copy("/path/to/dir_or_file", "/new/path/to/dir_or_file")

// vfs.rm(path) move the directory or file at the given path to the trash
await cozy.files.trash("/path/to/dir_or_file")
```

## Binary

These functions are for retro-compatibility with browser-sdk and will warn in the console about it. If you are making a new app, do not use them and rely instead on the new attachment API (which is still not determined)

**TODO** Rapidly figures out what the attachment of binaries to documents should look like and specify new functions accordingly.

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
