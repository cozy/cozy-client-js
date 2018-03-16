# Authentication and OAuth (internal)

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
  notificationPlatform: string;
  notificationDeviceToken: string;
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

