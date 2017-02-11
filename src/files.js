/* global Blob, File */
import {cozyFetch, cozyFetchJSON} from './fetch'
import jsonapi from './jsonapi'
import { DOCTYPE_FILES } from './doctypes'

const contentTypeOctetStream = 'application/octet-stream'

function doUpload (cozy, data, method, path, options) {
  if (!data) {
    throw new Error('missing data argument')
  }

  // transform any ArrayBufferView to ArrayBuffer
  if (data.buffer && data.buffer instanceof ArrayBuffer) {
    data = data.buffer
  }

  const isBuffer = (typeof ArrayBuffer !== 'undefined' && data instanceof ArrayBuffer)
  const isFile = (typeof File !== 'undefined' && data instanceof File)
  const isBlob = (typeof Blob !== 'undefined' && data instanceof Blob)
  const isString = (typeof data === 'string')

  if (!isBuffer && !isFile && !isBlob && !isString) {
    throw new Error('invalid data type')
  }

  let {contentType, lastModifiedDate} = options || {}
  if (!contentType) {
    if (isBuffer) {
      contentType = contentTypeOctetStream
    } else if (isFile) {
      contentType = data.type || contentTypeOctetStream
      if (!lastModifiedDate) {
        lastModifiedDate = data.lastModifiedDate
      }
    } else if (isBlob) {
      contentType = contentTypeOctetStream
    } else if (typeof data === 'string') {
      contentType = 'text/plain'
    }
  }

  if (lastModifiedDate && typeof lastModifiedDate === 'string') {
    lastModifiedDate = new Date(lastModifiedDate)
  }

  return cozyFetch(cozy, path, {
    method: method,
    headers: {
      'Content-Type': contentType,
      'Date': lastModifiedDate ? lastModifiedDate.toGMTString() : ''
    },
    body: data
  })
    .then((res) => {
      const json = res.json()
      if (!res.ok) {
        return json.then(err => { throw err })
      } else {
        return json.then(jsonapi)
      }
    })
}

export function create (cozy, data, options) {
  let {name, dirID} = options || {}

  // handle case where data is a file and contains the name
  if (!name && typeof data.name === 'string') {
    name = data.name
  }

  if (typeof name !== 'string' || name === '') {
    throw new Error('missing name argument')
  }

  const path = `/files/${encodeURIComponent(dirID || '')}`
  const query = `?Name=${encodeURIComponent(name)}&Type=file`
  return doUpload(cozy, data, 'POST', `${path}${query}`, options)
}

export function createDirectory (cozy, options) {
  const {name, dirID} = options || {}

  if (typeof name !== 'string' || name === '') {
    throw new Error('missing name argument')
  }

  const path = `/files/${encodeURIComponent(dirID || '')}`
  const query = `?Name=${encodeURIComponent(name)}&Type=directory`
  return cozyFetchJSON(cozy, 'POST', `${path}${query}`)
}

export function updateById (cozy, id, data, options) {
  return doUpload(cozy, data, 'PUT', `/files/${encodeURIComponent(id)}`, options)
}

export function updateAttributesById (cozy, id, attrs) {
  if (!attrs || typeof attrs !== 'object') {
    throw new Error('missing attrs argument')
  }

  const body = { data: { attributes: attrs } }
  return cozyFetchJSON(cozy, 'PATCH',
    `/files/${encodeURIComponent(id)}`, body)
}

export function updateAttributesByPath (cozy, path, attrs) {
  if (!attrs || typeof attrs !== 'object') {
    throw new Error('missing attrs argument')
  }

  const body = { data: { attributes: attrs } }
  return cozyFetchJSON(cozy, 'PATCH',
    `/files/metadata?Path=${encodeURIComponent(path)}`, body)
}

export function trashById (cozy, id) {
  if (typeof id !== 'string' || id === '') {
    throw new Error('missing id argument')
  }
  return cozyFetchJSON(cozy, 'DELETE', `/files/${encodeURIComponent(id)}`)
}

export function statById (cozy, id, offline = true) {
  if (offline && cozy.offline.hasDatabase(DOCTYPE_FILES)) {
    let db = cozy.offline.getDatabase(DOCTYPE_FILES)
    return Promise.all([
      db.get(id),
      db.find({selector: {'dir_id': id}})
    ]).then(([doc, children]) => {
      children = children.docs.map(doc => {
        return addIsDir(toJsonApi(cozy, doc))
      })
      return addIsDir(toJsonApi(cozy, doc, children))
    })
  }
  return cozyFetchJSON(cozy, 'GET', `/files/${encodeURIComponent(id)}`)
    .then(addIsDir)
}

export function statByPath (cozy, path) {
  return cozyFetchJSON(cozy, 'GET', `/files/metadata?Path=${encodeURIComponent(path)}`)
    .then(addIsDir)
}

export function downloadById (cozy, id) {
  return cozyFetch(cozy, `/files/download/${encodeURIComponent(id)}`)
}

export function downloadByPath (cozy, path) {
  return cozyFetch(cozy, `/files/download?Path=${encodeURIComponent(path)}`)
}

function extractResponseLinkRelated (res) {
  let href = res.links && res.links.related
  if (!href) throw new Error('No related link in server response')
  return href
}

export function getDowloadLink (cozy, path) {
  return cozyFetchJSON(cozy, 'POST', `/files/downloads?Path=${encodeURIComponent(path)}`)
    .then(extractResponseLinkRelated)
}

export function getArchiveLink (cozy, paths, name = 'files') {
  const archive = {
    type: 'io.cozy.archives',
    attributes: {
      name: name,
      files: paths
    }
  }
  return cozyFetchJSON(cozy, 'POST', `/files/archive`, {data: archive})
  .then(extractResponseLinkRelated)
}

export function listTrash (cozy) {
  return cozyFetchJSON(cozy, 'GET', `/files/trash`)
}

export function clearTrash (cozy) {
  return cozyFetchJSON(cozy, 'DELETE', `/files/trash`)
}

export function restoreById (cozy, id) {
  return cozyFetchJSON(cozy, 'POST', `/files/trash/${encodeURIComponent(id)}`)
}

export function destroyById (cozy, id) {
  return cozyFetchJSON(cozy, 'DELETE', `/files/trash/${encodeURIComponent(id)}`)
}

function addIsDir (obj) {
  obj.isDir = obj.attributes.type === 'directory'
  return obj
}

function toJsonApi (cozy, doc, contents = []) {
  let clone = JSON.parse(JSON.stringify(doc))
  delete clone._id
  delete clone._rev
  return {
    _id: doc._id,
    _rev: doc._rev,
    _type: DOCTYPE_FILES,
    attributes: clone,
    relations: (name) => {
      if (name === 'contents') {
        return contents
      }
    }
  }
}
