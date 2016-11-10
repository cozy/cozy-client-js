/* global fetch, btoa */

import {waitConfig} from './utils'

const NOREV = 'stack-v1-no-rev'

function doFetch (config, method, path, body) {
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

function createPath (config, doctype, id = '', query = null) {
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

export async function create (doctype, attributes) {
  const config = await waitConfig()

  let path = createPath(config, doctype)
  let response = await doFetch(config, 'POST', path, attributes)

  if (config.isV1) return await find(doctype, response._id)

  return response.data
}

export async function find (doctype, id) {
  const config = await waitConfig()

  if (!id) {
    throw new Error('Missing id parameter')
  }

  let path = createPath(config, doctype, id)
  let response = await doFetch(config, 'GET', path)

  if (config.isV1) Object.assign(response, {_rev: NOREV})

  return response
}

export async function update (doctype, doc, changes) {
  const config = await waitConfig()

  const {_id, _rev} = doc

  if (!_id) {
    throw new Error('Missing _id field in passed document')
  }

  if (!config.isV1 && !_rev) {
    throw new Error('Missing _rev field in passed document')
  }

  if (config.isV1) {
    changes = Object.assign({ _id }, changes)
  } else {
    changes = Object.assign({ _id, _rev }, changes)
  }

  let path = createPath(config, doctype, _id)
  let response = await doFetch(config, 'PUT', path, changes)

  if (config.isV1) return await find(doctype, _id)

  return response.data
}

export async function _delete (doctype, doc) {
  const config = await waitConfig()

  const {_id, _rev} = doc

  if (!_id) {
    throw new Error('Missing _id field in passed document')
  }

  if (!config.isV1 && !_rev) {
    throw new Error('Missing _rev field in passed document')
  }

  let query = config.isV1 ? null : { rev: _rev }
  let path = createPath(config, doctype, _id, query)
  let response = await doFetch(config, 'DELETE', path)

  if (config.isV1) Object.assign(response, {id: _id, rev: NOREV})

  return response
}

export function updateAttributes (doctype, doc) {
  throw new Error('not implemented')
}

export function destroy (doctype, doc) {
  throw new Error('not implemented')
}
