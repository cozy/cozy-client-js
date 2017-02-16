import {createPath} from './utils'
import {normalizeDoctype} from './doctypes'
import {cozyFetchJSON} from './fetch'

const NOREV = 'stack-v2-no-rev'

export function create (cozy, doctype, attributes) {
  return cozy.isV2().then((isV2) => {
    doctype = normalizeDoctype(cozy, isV2, doctype)
    if (isV2) {
      attributes.docType = doctype
    }
    const path = createPath(cozy, isV2, doctype)
    return cozyFetchJSON(cozy, 'POST', path, attributes).then((resp) => {
      if (isV2) {
        return find(cozy, doctype, resp._id)
      } else {
        return resp.data
      }
    })
  })
}

export function find (cozy, doctype, id) {
  return cozy.isV2().then((isV2) => {
    doctype = normalizeDoctype(cozy, isV2, doctype)

    if (!id) {
      return Promise.reject(new Error('Missing id parameter'))
    }

    const path = createPath(cozy, isV2, doctype, id)
    return cozyFetchJSON(cozy, 'GET', path).then((resp) => {
      if (isV2) {
        return Object.assign(resp, {_rev: NOREV})
      } else {
        return resp
      }
    })
  })
}

export function changesFeed (cozy, doctype, options) {
  return cozy.isV2().then((isV2) => {
    doctype = normalizeDoctype(cozy, isV2, doctype)
    const path = createPath(cozy, isV2, doctype, '_changes', options)
    return cozyFetchJSON(cozy, 'GET', path)
  })
}

export function update (cozy, doctype, doc, changes) {
  return cozy.isV2().then((isV2) => {
    doctype = normalizeDoctype(cozy, isV2, doctype)
    const {_id, _rev} = doc

    if (!_id) {
      return Promise.reject(new Error('Missing _id field in passed document'))
    }

    if (!isV2 && !_rev) {
      return Promise.reject(new Error('Missing _rev field in passed document'))
    }

    if (isV2) {
      changes = Object.assign({ _id }, changes)
    } else {
      changes = Object.assign({ _id, _rev }, changes)
    }

    const path = createPath(cozy, isV2, doctype, _id)
    return cozyFetchJSON(cozy, 'PUT', path, changes).then((resp) => {
      if (isV2) {
        return find(cozy, doctype, _id)
      } else {
        return resp.data
      }
    })
  })
}

export function updateAttributes (cozy, doctype, _id, changes, tries = 3) {
  return cozy.isV2().then((isV2) => {
    doctype = normalizeDoctype(cozy, isV2, doctype)
    return find(cozy, doctype, _id)
      .then((doc) => {
        return update(cozy, doctype, doc, Object.assign({ _id }, doc, changes))
      })
      .catch((err) => {
        if (tries > 0) {
          return updateAttributes(cozy, doctype, _id, changes, tries - 1)
        } else {
          throw err
        }
      })
  })
}

export function _delete (cozy, doctype, doc) {
  return cozy.isV2().then((isV2) => {
    doctype = normalizeDoctype(cozy, isV2, doctype)
    const {_id, _rev} = doc

    if (!_id) {
      return Promise.reject(new Error('Missing _id field in passed document'))
    }

    if (!isV2 && !_rev) {
      return Promise.reject(new Error('Missing _rev field in passed document'))
    }

    const query = isV2 ? null : { rev: _rev }
    const path = createPath(cozy, isV2, doctype, _id, query)
    return cozyFetchJSON(cozy, 'DELETE', path).then((resp) => {
      if (isV2) {
        return {id: _id, rev: NOREV}
      } else {
        return resp
      }
    })
  })
}
