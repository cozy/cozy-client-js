import {waitConfig, createPath, doFetch, normalizeDoctype} from './utils'

const NOREV = 'stack-v1-no-rev'

export async function create (doctype, attributes) {
  const config = await waitConfig()
  doctype = normalizeDoctype(config, doctype)

  if (config.isV1) attributes.docType = doctype

  let path = createPath(config, doctype)
  let response = await doFetch(config, 'POST', path, attributes)

  if (config.isV1) return await find(doctype, response._id)

  return response.data
}

export async function find (doctype, id) {
  const config = await waitConfig()
  doctype = normalizeDoctype(config, doctype)

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
  doctype = normalizeDoctype(config, doctype)

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
  doctype = normalizeDoctype(config, doctype)

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
