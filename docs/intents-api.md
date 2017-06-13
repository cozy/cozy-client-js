# Intents

### `cozy.client.intents.create()`

`cozy.client.intents.create(action, doctype [, data, permissions])` create an intent. It returns a modified Promise for the intent document, having a custom `start(element)` method. This method interacts with the DOM to append an iframe to the given HTML element. This iframe will provide an access to an app, which will serve a service page able to manage the intent action for the intent doctype. The `start(element)` method returns a promise for the result document provided by intent service.

An intent has to be created everytime an app need to perform an action over a doctype for wich it does not have permission. For example, the Cozy Drive app should create an intent to `pick` a `io.cozy.contacts` document. The cozy-stack will determines which app can offer a service to resolve the intent. It's this service's URL that will be passed to the iframe `src` property.

Once the intent process is terminated by service, the iframe is removed from DOM.

#### Example
```js
cozy.client.intents.create('EDIT', 'io.cozy.photos', {action: 'crop', width: 100, height: 100})
  .start(document.getElementById('intent-service-wrapper'))
```

See cozy-stack [documentation](https://cozy.github.io/cozy-stack/intents.html) for more details.

### `cozy.client.intents.createService()`

`cozy.client.intents.createService([intentId, window])` has to be used in the intent service page. It initializes communication with the parent window (remember: the service is supposed to be in an iframe).

If `intentId` and `window` parameters are not provided the method will try to retrieve them automatically.

It returns a *service* object, which provides the following methods :
 * `getData()`: returns the data passed to the service by the client.
 * `getIntent()`: returns the intent
 * `setSize(doc)`: forces the size of the intent modale to a given minWidth, width, maxWidth, minHeight, height, maxHeight, or dimensions of a given dom element.
 ```javascript
 service.setSize({
    maxHeight: '300px'
 })
 // or
 service.setSize({
    dom: document.querySelector('.class')
 })
 ```
 * `terminate(doc)`: ends the intent process by passing to the client the resulting document `doc`. An intent service may only be terminated once.
 * `cancel()`: ends the intent process by passing a `null` value to the client. This method terminate the intent service the same way that `terminate()`.
 * `throw(error)`: throw an error to client and causes the intent promise rejection.

#### Example
```js
cozy.client.intents.createService('77bcc42c-0fd8-11e7-ac95-8f605f6e8338', window)
  .then(service => {
    const data = intentService.getData()

    // [...]
    // Do stuff with data
    // [...]

    const resultingDoc = {
      type: 'io.cozy.photos',
      width: 100,
      height: 100
    }

    intentService.terminate(resultingDoc)
  })
```
