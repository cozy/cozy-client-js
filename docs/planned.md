# Cozy-client-js API - Planned features

This document define the APIs we will be implementing in the future, feel free
to comment on them through issues or PR !

## VFS API

**TO BE DETERMINED** should this be made compatible with v1?

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
