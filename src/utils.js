/* global fetch, btoa */
import jsonapi from './jsonapi'

export let config = {}

export function configure (opts) {
  config = opts
  return config
}

export async function waitConfig (opts) {
  if (opts && opts.nocompat === true && config.isV2) {
    throw new Error('not implemented on v2')
  }
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
  if (!config.isV2) {
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
  let pathprefix = config.isV2 ? '/ds-api' : ''
  let fullpath = target + pathprefix + path
  return fetch(fullpath, options).then((res) => {
    if (!res.ok) {
      const contentType = res.headers.get('content-type')
      let data
      if (contentType && contentType.indexOf('json') >= 0) {
        data = res.json().then(err => { throw err })
      } else {
        data = res.text()
      }
      return data.then(err => { throw err })
    }
    return res
  })
}

export function doFetchJSON (config, method, path, body) {
  return doFetch(config, method, path, body).then((res) => {
    const contentType = res.headers.get('content-type')
    const json = res.json()
    if (contentType && contentType.indexOf('application/vnd.api+json') === 0) {
      return json.then(jsonapi)
    } else {
      return json
    }
  })
}

const KNOWN_DOCTYPES = {
  'files': 'io.cozy.files',
  'folder': 'io.cozy.folders',
  'contact': 'io.cozy.contacts',
  'event': 'io.cozy.events',
  'track': 'io.cozy.labs.music.track',
  'playlist': 'io.cozy.labs.music.playlist'
}
const REVERSE_KNOWN = {}
Object.keys(KNOWN_DOCTYPES).forEach(k => { REVERSE_KNOWN[KNOWN_DOCTYPES[k]] = k })
export function normalizeDoctype (config, doctype) {
  let isQualified = doctype.indexOf('.') !== -1
  if (config.isV2 && isQualified) {
    let known = REVERSE_KNOWN[doctype]
    if (known) return known
    return doctype.replace(/\./g, '-')
  }
  if (config.isV3 && !isQualified) {
    let known = KNOWN_DOCTYPES[doctype]
    if (known) {
      warn('you are using a non-qualified doctype ' + doctype + ' assumed to be ' + known)
      return known
    }
    throw new Error('Doctype ' + doctype + ' should be qualified.')
  }
  return doctype
}

let warned = []
export function warn (text) {
  if (warned.indexOf(text) === -1) {
    warned.push(text)
    console.log('Warning', text)
  }
}
