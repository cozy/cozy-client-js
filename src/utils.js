/* global navigator */
const FuzzFactor = 0.3

export function unpromiser(fn) {
  return function(...args) {
    const value = fn.apply(this, args)
    if (!isPromise(value)) {
      return value
    }
    const l = args.length
    if (l === 0 || typeof args[l - 1] !== 'function') {
      return
    }
    const cb = args[l - 1]
    value.then(res => cb(null, res), err => cb(err, null))
  }
}

export function isPromise(value) {
  return !!value && typeof value.then === 'function'
}

export function isOnline() {
  return typeof navigator !== 'undefined' ? navigator.onLine : true
}

export function isOffline() {
  return !isOnline()
}

export function sleep(time, args) {
  return new Promise(resolve => {
    setTimeout(resolve, time, args)
  })
}

export function retry(fn, count, delay = 300) {
  return function doTry(...args) {
    return fn(...args).catch(err => {
      if (--count < 0) {
        throw err
      }
      return sleep(getBackedoffDelay(delay, count)).then(() => doTry(...args))
    })
  }
}

export function getFuzzedDelay(retryDelay) {
  const fuzzingFactor = (Math.random() * 2 - 1) * FuzzFactor
  return retryDelay * (1.0 + fuzzingFactor)
}

export function getBackedoffDelay(retryDelay, retryCount = 1) {
  return getFuzzedDelay(retryDelay * Math.pow(2, retryCount - 1))
}

export function createPath(cozy, isV2, doctype, id = '', query = null) {
  let route = '/data/'
  if (!isV2) {
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

export function encodeQuery(query) {
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

export function decodeQuery(url) {
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

const warned = []
export function warn(text) {
  if (warned.indexOf(text) === -1) {
    warned.push(text)
    console.warn('cozy-client-js', text)
  }
}
