import {waitConfig, createPath, doFetch, normalizeDoctype} from './utils'

const NOREV = 'stack-v2-no-rev'

export async function create (doctype, attributes) {
  const config = await waitConfig()
  doctype = normalizeDoctype(config, doctype)

  if (config.isV2) attributes.docType = doctype

  let path = createPath(config, doctype)
  let response = await doFetch(config, 'POST', path, attributes)

  if (config.isV2) return await find(doctype, response._id)

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

  if (config.isV2) Object.assign(response, {_rev: NOREV})

  return response
}

export async function update (doctype, doc, changes) {
  const config = await waitConfig()
  doctype = normalizeDoctype(config, doctype)

  const {_id, _rev} = doc

  if (!_id) {
    throw new Error('Missing _id field in passed document')
  }

  if (!config.isV2 && !_rev) {
    throw new Error('Missing _rev field in passed document')
  }

  if (config.isV2) {
    changes = Object.assign({ _id }, changes)
  } else {
    changes = Object.assign({ _id, _rev }, changes)
  }

  let path = createPath(config, doctype, _id)
  let response = await doFetch(config, 'PUT', path, changes)

  if (config.isV2) return await find(doctype, _id)

  return response.data
}

export async function updateAttributes (doctype, _id, changes, tries = 3) {
  const config = await waitConfig()
  doctype = normalizeDoctype(config, doctype)
  let doc = await find(doctype, _id)
  let updated = Object.assign({ _id }, doc, changes)
  try {
    await update(doctype, doc, updated)
  } catch (err) {
    if (tries > 0) updateAttributes(doctype, _id, changes, tries - 1)
    else throw err
  }
}

export async function _delete (doctype, doc) {
  const config = await waitConfig()
  doctype = normalizeDoctype(config, doctype)

  const {_id, _rev} = doc

  if (!_id) {
    throw new Error('Missing _id field in passed document')
  }

  if (!config.isV2 && !_rev) {
    throw new Error('Missing _rev field in passed document')
  }

  let query = config.isV2 ? null : { rev: _rev }
  let path = createPath(config, doctype, _id, query)
  let response = await doFetch(config, 'DELETE', path)

  if (config.isV2) Object.assign(response, {id: _id, rev: NOREV})

  return response
}
