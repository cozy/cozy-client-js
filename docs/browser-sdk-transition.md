# How to transition your app from cozy-browser-sdk to cozy-api

## Full doctype qualification

Cozy stack-v2 expects doctypes to be qualified to ensure uniqueness.

All doctypes designed by the cozy's team will be prefixed with `io.cozy.`

Any doctype you introduce is expected to be prefixed with the reverse notation of a domain you own (JLS#7.7).

You are free to reuse another applications documents by using their doctypes but you SHOULD discuss with the domain owner if you want to add fields or format things differently.

To ensure retrocompatibility, when used on stack v2, all known doctypes will be auto-prefixed by `io.cozy.` or `io.cozy.labs.`, but a warning will be written to the console. Unknown doctype will cause a fatal error. DO NOT rely on this behaviour in new applications, use qualified doctypes.


```javascript
// cozy sdk
cozy.create("Contact", {})
cozy.create("Book", {})
// cozy api
cozy.create("io.cozy.contact", {})
cozy.create("com.mydomain.book", {})
// cozy api (retrocompatibility - DO NOT DO THIS)
cozy.create("Contact", {})
```

## MapReduce Views vs Mango queries

Cozy stack-v2 recommends using Couchdb 2 indexes & mango queries instead of Couchdb 1.X map-reduce views. We feel they are [simpler to understand and explain](http://cozy.github.io/cozy-browser-sdk/tutorial-mapreduce.html) and avoid useless overindexing.

When used on a stack-v1 cozy, the `defineIndex` and `findDocuments` calls will be translated to equivalent MapReduce views.

If you need the full power of MapReduce, please open a issue on cozy-stack with your usecase.

```javascript
// cozy sdk
cozysdk.defineMapReduceView('Event', 'all', function(doc) { emit(doc.year); })
cozysdk.queryView('Event', 'all', {key: 2016, limit: 10})
// cozy api
index = cozysdk.defineIndex('Event', ['year'])
cozysdk.findSelectors('Event', {use_index: index, selector: {year: 2016}, limit: 10})
```

## Binaries

We do not yet have a plan for binaries attachments to documents.
They will be probably placed in the VFS under a special path.
