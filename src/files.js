/* global Blob, File */
import {cozyFetch, cozyFetchJSON} from './fetch'
import jsonapi from './jsonapi'

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
      'Date': lastModifiedDate ? lastModifiedDate.toISOString() : ''
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

export function statById (cozy, id) {
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
