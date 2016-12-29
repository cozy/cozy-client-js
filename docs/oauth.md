This document describes in more details how to use this library along with OAuth.

The library proposes to ways to perform OAuth: one manual and requires you to handle state the way you see fit using the cozy.auth.* methods, the other is automated and stateful and implements many details of the OAuth registration and authorization flow for you.

Here we describe the automated and stateful method.

### Storage

To handle the workflow automatically, the user of the library shoud pass a storage object that will be used to store the OAuth client and tokens informations.

This storage should implement the following "interface":

```js
interface Storage {
  load(key: string) : Promise<any>
  save(key: string, value: any) : Promise<any>
  delete(key: string) : Promise<boolean>
  clear() : Promise<>
}
```

The library provides two implementation of such storage:
  - `cozy.auth.MemoryStorage` storing data in-memory
  - `cozy.auth.LocalStorage` storage data in a html5 [`localStorage`](https://developer.mozilla.org/en/docs/Web/API/Window/localStorage)

The library constructor (on `init` method) should be passed the storage in the `credentialsStorage` field:

```js
new Cozy({ credentialsStorage: new cozy.auth.LocalStorage() })
// or if using the global instance
cozy.init({ credentialsStorage: new cozy.auth.LocalStorage() })
```


### Registration callbacks

In order to handle the registration of the client, two callbacks should be provided the cozy-client-js instance.

  - `createClient()` which should return an object `{client, scopes}` where client is a valid instance or object of `cozy.auth.Client` and scopes is an array containing the wanted scopes of the application.
  - `onRegistered(client, url)` which should provide the wanted "side effect" after the client registration.

The `onRegistered` callback is called with the registered client and the URL on which the user should go to give access to the application.

### Complete example

Here is a complete example

```js
const cozy = new Cozy({
  credentialsStorage: new cozy.auth.LocalStorage(),
  createClient: createClient,
  onRegistered: onRegistered,
})
// or if using the global instance
cozy.init({
  credentialsStorage: new cozy.auth.LocalStorage(),
  createClient: createClient,
  onRegistered: onRegistered,
})

function createClient() {
  const client = {
    redirectURI: 'http://babelu/',
    softwareID: 'id',
    clientName: 'client'
  }
  const scopes = ['files/images:read']
  return {
    client: client,
    scopes: scopes,
  }
}

function onRegistered(client, url) {
  alert("Please visit the following url to authorize the application: ": url)
}
```
