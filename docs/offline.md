This document describes in more details how to use this library in offline mode.

All applications do not require offline mode, and offline mode needs two large dependencies : `pouchdb` and `pouchdb-find`.
As those two dependencies are expensive in size, we decided to not provide them by default, since v0.2.0.

So if an app needs to use offline mode, it will need to add those dependencies by itself. It means that developers just need to do:

```bash
yarn add pouchdb
yarn add pouchdb-find
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
