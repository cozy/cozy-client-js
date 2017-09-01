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
    const path = createPath(cozy, isV2, doctype, attributes._id)
    const httpVerb = attributes._id ? 'PUT' : 'POST'
    delete attributes._id
    return cozyFetchJSON(cozy, httpVerb, path, attributes).then((resp) => {
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

export function findMany (cozy, doctype, ids) {
  if (!(ids instanceof Array)) {
    return Promise.reject(new Error('Parameter ids must be a non-empty array'))
  }
  if (ids.length === 0) {
    // So users don't need to be defensive regarding the array content.
    // This should not hide issues in user code since the result will be an
    // empty object anyway.
    return Promise.resolve({})
  }

  return cozy.isV2().then((isV2) => {
    if (isV2) {
      return Promise.reject(new Error('findMany is not available on v2'))
    }

    const path = createPath(cozy, isV2, doctype, '_all_docs', {include_docs: true})

    return cozyFetchJSON(cozy, 'POST', path, {keys: ids})
      .then((resp) => {
        const docs = {}

        for (const row of resp.rows) {
          const {key, doc, error} = row
          docs[key] = error ? {error} : {doc}
        }

        return docs
      })
      .catch((error) => {
        if (error.status !== 404) return Promise.reject(error)

        // When no doc was ever created and the database does not exist yet,
        // the response will be a 404 error.
        const docs = {}

        for (const id of ids) {
          docs[id] = {error}
        }

        return docs
      })
  })
}

export function findAll (cozy, doctype) {
  return cozy.isV2().then((isV2) => {
    if (isV2) {
      return Promise.reject(new Error('findAll is not available on v2'))
    }

    const path = createPath(cozy, isV2, doctype, '_all_docs', {include_docs: true})

    return cozyFetchJSON(cozy, 'POST', path, {})
    .then((resp) => {
      const docs = []

      for (const row of resp.rows) {
        const { doc } = row
        // if not couchDB indexes
        if (!doc._id.match(/_design\//)) docs.push(doc)
      }
      return docs
    })
    .catch(error => {
      // the _all_docs endpoint returns a 404 error if no document with the given
      // doctype exists.
      if (error.status === 404) return []
      throw error
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
