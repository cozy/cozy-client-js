
export let config = {}

export function configure (opts) {
  config = opts
}

export function waitConfig (opts) {
  return Promise.resolve(config)
}

export function promiser (promise, optCallback) {
  if (!optCallback || typeof optCallback !== 'function') {
    return promise
  }
  promise.then(
    function (result) { optCallback(null, result) },
    function (err) { optCallback(err, null) }
  )
}
