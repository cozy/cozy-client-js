# How to transition your app from cozy-browser-sdk to cozy-client-js

## Full doctype qualification

Cozy **v3** expects doctypes to be qualified to ensure uniqueness.

All doctypes designed by the cozy's team will be prefixed with `io.cozy.`

Any doctype you introduce is expected to be prefixed with the reverse notation of a domain you own (JLS#7.7).

You are free to reuse another applications documents by using their doctypes but you SHOULD discuss with the domain owner if you want to add fields or format things differently.

To ensure retrocompatibility, when used on stack v2, all known doctypes will be auto-prefixed by `io.cozy.` or `io.cozy.labs.`, but a warning will be written to the console. Unknown doctype will cause a fatal error. DO NOT rely on this behaviour in new applications, use qualified doctypes.


```javascript
// old version, using cozy-browser-sdk
cozy.create("Contact", {})
cozy.create("Book", {})
// new version, with cozy-client-js
cozy.create("io.cozy.contacts", {})
cozy.create("com.mydomain.book", {})
```

## MapReduce Views vs Mango queries

Cozy **v3** recommends using Couchdb 2 indexes & mango queries instead of Couchdb 1.X map-reduce views. We feel they are [simpler to understand and explain](http://cozy.github.io/cozy-browser-sdk/tutorial-mapreduce.html) and avoid useless overindexing.

When used on a **v2** cozy, the `defineIndex` and `query` calls will be translated to equivalent MapReduce views.

If you need the full power of MapReduce, please open a issue on cozy-stack with your usecase.

```javascript
// cozy-browser-sdk
cozysdk.defineMapReduceView('Event', 'all', function(doc) { emit(doc.year); })
cozysdk.queryView('Event', 'all', {key: 2016, limit: 10})
// cozy-client-js
index = cozysdk.defineIndex('Event', ['year'])
cozysdk.query(index, {selector: {year: 2016}, limit: 10})

```

## Binaries

We do not yet have a plan for binaries attachments to documents.
They will be probably placed in the VFS under a special path.

## Crud is fully compatible

The following functions have the same signature than the cozy-browser-sdk
```javascript
created = await cozy.create(myType, book)
doc = await cozy.find(myType, id)
doc2 = await cozy.updateAttributes(myType, id, {year: 1851})
await cozy.destroy("my.domain.book", id)
```
