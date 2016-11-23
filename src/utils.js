/* global fetch, btoa */

export let config = {}

export function configure (opts) {
  config = opts
}

export async function waitConfig (opts) {
  return config
}

export function promiser (promise, optCallback) {
  if (!optCallback || typeof optCallback !== 'function') {
    return promise
  }
  promise.then(
    function (result) { optCallback(null, result) },
    function (err) { optCallback(err, null) }
  )
  return null
}

export function createPath (config, doctype, id = '', query = null) {
  let route = '/data/'
  if (!config.isV1) {
    route += `${encodeURIComponent(doctype)}/`
  }
  if (id !== '') {
    route += encodeURIComponent(id)
  }
  if (query) {
    const q = []
    for (const qname in query) {
      q.push(`${encodeURIComponent(qname)}=${encodeURIComponent(query[qname])}`)
    }
    route += `?${q.join('&')}`
  }
  return route
}

export function doFetch (config, method, path, body) {
  const options = {method: method, headers: {}}
  if (body !== undefined) {
    options.headers['Content-Type'] = 'application/json'
    options.body = JSON.stringify(body)
  }
  if (config.auth) {
    let auth = config.auth.appName + ':' + config.auth.token
    options.headers['Authorization'] = 'Basic ' + btoa(auth)
  }

  let target = config.target || ''
  let pathprefix = config.isV1 ? '/ds-api' : ''
  let fullpath = target + pathprefix + path
  return fetch(fullpath, options).then((res) => {
    const json = res.json()
    if (!res.ok) {
      return json.then(err => { throw err })
    } else {
      return json
    }
  })
}
