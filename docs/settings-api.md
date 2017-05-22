# Settings

### `cozy.client.settings.diskUsage()`

`cozy.client.settings.diskUsage` is used to known informations about the total used space on the cozy disk.

It returns a promise of the document of the disk-usage of id `io.cozy.settings.disk-usage`, with attributes containing a `used` field a string of how many *bytes* are used on the disk.

The `used` field is a string since the underlying data is an `int64` which may not be properly represented in javascript.

```javascript
const usage = await cozy.client.settings.diskUsage()
console.log(usage.attributes.used)
```

### `cozy.client.settings.changePassphrase(oldPassphrase, newPassphrase)`

`cozy.client.settings.changePassphrase` is used to change the passphrase of the current user. You must supply the currently used passphrase, as well as the new one. It simply returns a promise that will resolve if the change was successful.

### `cozy.client.settings.getInstance()`

`cozy.client.settings.getInstance` returns a promise with informations about the current Cozy instance, such as the locale or the public name. See cozy-stack [documentation](https://cozy.github.io/cozy-stack/settings.html#response-3) for more details.

### `cozy.client.settings.updateInstance(instance)`

`cozy.client.settings.updateInstance` is used to update informations about the current instance. `instance` is an object that should be based on to the one you receive from `cozy.settings.getInstance()`. It returns a promise with the updated instance information.

### `cozy.client.settings.getClients()`

`cozy.client.settings.getClients` returns a promise for an array of registered clients. See the [cozy-stack documentation](https://cozy.github.io/cozy-stack/settings.html#response-5) for more details.

### `cozy.client.settings.deleteClientById('123')`

`cozy.client.settings.deleteClientById` revokes the specified client from the instance. This method returns a promise that simply resolves if the revokation was successful.
