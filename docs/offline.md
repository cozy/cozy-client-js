# Offline support

This document describes in more details how to use this library in offline mode.

All applications do not require offline mode, and offline mode needs two dependencies : `pouchdb` and `pouchdb-find`.
As both are very large, we decide not to provide them by default, since v0.2.0.

So if your app needs to use offline mode, you have to add those dependencies by yourself. It means you just need to do:

```bash
$/your-app> yarn add pouchdb
$/your-app> yarn add pouchdb-find
```

Then they will have to import `pouchdb` and `pouchdbfind` globally, as they are not imported in codebase anymore. This means adding the following configuration in all concerned webpack target files (for example `webpack.target.mobile.js`) :

```js
module.exports = {
  ...
  plugins: [
    new webpack.ProvidePlugin({
      'PouchDB': 'pouchdb',
      'pouchdbFind': 'pouchdb-find'
    })
  ]
}
```

This same configuration has to be added in file `wepback.config.prod.js`, to make the build possible.

In prod, since `cozy-client-js` is injected by the stack, it has not been processed by `wepback` and the `ProvidePlugin`. Thus you need to bind `PouchDB` to `window`.

```
/* global PouchDB, pouchdbFind */
// Bind PouchDB to window for cozy-client-js to find it
// PouchDB is provided by webpack through ProvidedPlugin
window.PouchDB = PouchDB
window.pouchdbFind = pouchdbFind
```
