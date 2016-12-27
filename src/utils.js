export function unpromiser (fn) {
  return function (...args) {
    const promise = fn.apply(this, args)
    if (!promise || typeof promise.then !== 'function') {
      return promise
    }
    const l = args.length
    if (l === 0 || typeof args[l - 1] !== 'function') {
      return null
    }
    const cb = args[l - 1]
    promise.then(
      (res) => cb(null, res),
      (err) => cb(err, null)
    )
    return null
  }
}

export function sleep (time, args) {
  return new Promise((resolve) => {
    setTimeout(resolve, time, args)
  })
}

export function retry (fn, count, delay = 300) {
  return function doTry (...args) {
    return fn(...args).catch((err) => {
      if (--count < 0) {
        throw err
      }
      return sleep(getBackedoffDelay(delay, count))
        .then(doTry)
    })
  }
}

var FUZZ_FACTOR = 0.3

export function getFuzzedDelay (retryDelay) {
  var fuzzingFactor = ((Math.random() * 2) - 1) * FUZZ_FACTOR
  return retryDelay * (1.0 + fuzzingFactor)
}

export function getBackedoffDelay (retryDelay, retryCount = 1) {
  return getFuzzedDelay(retryDelay * Math.pow(2, retryCount - 1))
}

export function createPath (cozy, doctype, id = '', query = null) {
  let route = '/data/'
  if (!cozy.isV2) {
    route += `${encodeURIComponent(doctype)}/`
  }
  if (id !== '') {
    route += encodeURIComponent(id)
  }
  const q = encodeQuery(query)
  if (q !== '') {
    route += '?' + q
  }
  return route
}

export function encodeQuery (query) {
  if (!query) {
    return ''
  }
  let q = ''
  for (const qname in query) {
    if (q !== '') {
      q += '&'
    }
    q += `${encodeURIComponent(qname)}=${encodeURIComponent(query[qname])}`
  }
  return q
}

export function decodeQuery (url) {
  let queryIndex = url.indexOf('?')
  if (queryIndex < 0) {
    queryIndex = url.length
  }
  const queries = {}
  let fragIndex = url.indexOf('#')
  if (fragIndex < 0) {
    fragIndex = url.length
  }
  if (fragIndex < queryIndex) {
    return queries
  }
  const queryStr = url.slice(queryIndex + 1, fragIndex)
  if (queryStr === '') {
    return queries
  }
  const parts = queryStr.split('&')
  for (let i = 0; i < parts.length; i++) {
    let pair = parts[i].split('=')
    if (pair.length === 0 || pair[0] === '') {
      continue
    }
    const qname = decodeURIComponent(pair[0])
    if (queries.hasOwnProperty(qname)) {
      continue
    }
    if (pair.length === 1) {
      queries[qname] = true
    } else if (pair.length === 2) {
      queries[qname] = decodeURIComponent(pair[1])
    } else {
      throw new Error('Malformed URL')
    }
  }
  return queries
}

const KNOWN_DOCTYPES = {
  'files': 'io.cozy.files',
  'folder': 'io.cozy.files',
  'contact': 'io.cozy.contacts',
  'event': 'io.cozy.events',
  'track': 'io.cozy.labs.music.track',
  'playlist': 'io.cozy.labs.music.playlist'
}

const REVERSE_KNOWN = {}

Object.keys(KNOWN_DOCTYPES).forEach(k => {
  REVERSE_KNOWN[KNOWN_DOCTYPES[k]] = k
})

export function normalizeDoctype (cozy, doctype) {
  let isQualified = doctype.indexOf('.') !== -1
  if (cozy.isV2 && isQualified) {
    let known = REVERSE_KNOWN[doctype]
    if (known) return known
    return doctype.replace(/\./g, '-')
  }
  if (!cozy.isV2 && !isQualified) {
    let known = KNOWN_DOCTYPES[doctype]
    if (known) {
      warn('you are using a non-qualified doctype ' + doctype + ' assumed to be ' + known)
      return known
    }
    throw new Error('Doctype ' + doctype + ' should be qualified.')
  }
  return doctype
}

const warned = []
export function warn (text) {
  if (warned.indexOf(text) === -1) {
    warned.push(text)
    console.warn('cozy-client-js', text)
  }
}
