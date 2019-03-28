# Introduction to cozy-client-js

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

You can `import`/`require` cozy-client-js using npm & webpack.

You can also copy-paste the `dist/cozy-client.js` bundle file into your application, and include it in your application `index.html` with `<script src="./cozy-client.js">`.

If you are developing a client-side app for Cozy V3, you can import the lib directly from the stack, by using [`{{.CozyClientJS}}`](https://cozy.github.io/cozy-stack/client-app-dev.html#good-practices-for-your-application).

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
  * `version`: the version of Cozy (2 or 3), it's optional, by default with a request to the server it can deduce automatically the version. (Must be specified for an offline mode)

```javascript
cozy.client.init({
  cozyURL: 'http://cozy.tools:8080',
  disablePromises: false,
  version: 3,
  oauth: {
    clientParams: {
      redirectURI: 'http://localhost:3333/oauth/callback',
      softwareID: 'cozy-client-js',
      clientName: 'example',
      scopes: ["io.cozy.files:GET"]
    },
    onRegistered: (client, url) => { /* */ },
    storage: new cozy.auth.LocalStorage(window.localStorage)
  }
})
```

Future APIs
-----------

This is the end of what we already have implemented, if you want to do something else (manipulating binary file, sharing, ...), you will have to wait a bit :smile:.

Feel free to open an issue if you see something missing, or if you disagree with the API design !
