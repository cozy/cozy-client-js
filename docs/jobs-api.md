# Jobs

### `cozy.clients.jobs.count(workerType)`

`cozy.clients.jobs.count` returns the number of jobs in the queue for `workerType`.

```javascript
const nb = cozy.client.jobs.count('sendmail')
console.log(`There are ${count} mails waiting to be sent`)
```

### `cozy.clients.jobs.create(workerType, arguments, options)`

`cozy.clients.jobs.create` enqueues a job in the queue for `workerType`.

See [the cozy-stack documentation](https://cozy.github.io/cozy-stack/jobs.html#post-jobsqueueworker-type) for more informations
