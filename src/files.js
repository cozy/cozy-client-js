/* global fetch Blob File */
import {waitConfig, doFetch, doFetchJSON} from './utils'
import jsonapi from './jsonapi'

const contentTypeOctetStream = 'application/octet-stream'

async function doUpload (config, data, contentType, method, path) {
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

  if (!contentType) {
    if (isBuffer) {
      contentType = contentTypeOctetStream
    } else if (isFile) {
      contentType = data.type || contentTypeOctetStream
    } else if (isBlob) {
      contentType = contentTypeOctetStream
    } else if (typeof data === 'string') {
      contentType = 'text/plain'
    }
  }

  const target = config.target || ''
  return fetch(`${target}${path}`, {
    method: method,
    headers: { 'Content-Type': contentType },
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

export async function create (data, options) {
  const config = await waitConfig({ nocompat: true })

  let {name, dirID, contentType} = options || {}

  // handle case where data is a file and contains the name
  if (!name && typeof data.name === 'string') {
    name = data.name
  }

  if (typeof name !== 'string' || name === '') {
    throw new Error('missing name argument')
  }

  const path = `/files/${encodeURIComponent(dirID || '')}`
  const query = `?Name=${encodeURIComponent(name)}&Type=file`
  return doUpload(config, data, contentType, 'POST', `${path}${query}`)
}

export async function createDirectory (options) {
  const config = await waitConfig({ nocompat: true })

  let {name, dirID} = options || {}

  if (typeof name !== 'string' || name === '') {
    throw new Error('missing name argument')
  }

  const path = `/files/${encodeURIComponent(dirID || '')}`
  const query = `?Name=${encodeURIComponent(name)}&Type=directory`
  return doFetchJSON(config, 'POST', `${path}${query}`)
}

export async function updateById (id, data, options) {
  const config = await waitConfig({ nocompat: true })
  const {contentType} = options || {}
  return doUpload(config, data, contentType, 'PUT', `/files/${encodeURIComponent(id)}`)
}

export async function updateAttributesById (id, attrs) {
  const config = await waitConfig({ nocompat: true })

  if (!attrs || typeof attrs !== 'object') {
    throw new Error('missing attrs argument')
  }

  const body = { data: { attributes: attrs } }
  return doFetchJSON(config, 'PATCH',
    `/files/${encodeURIComponent(id)}`, body)
}

export async function updateAttributesByPath (path, attrs) {
  const config = await waitConfig({ nocompat: true })

  if (!attrs || typeof attrs !== 'object') {
    throw new Error('missing attrs argument')
  }

  const body = { data: { attributes: attrs } }
  return doFetchJSON(config, 'PATCH',
    `/files/metadata?Path=${encodeURIComponent(path)}`, body)
}

export async function trashById (id) {
  const config = await waitConfig({ nocompat: true })

  if (typeof id !== 'string' || id === '') {
    throw new Error('missing id argument')
  }

  return doFetchJSON(config, 'DELETE', `/files/${encodeURIComponent(id)}`)
}

export async function statById (id) {
  const config = await waitConfig({ nocompat: true })
  const res = await doFetchJSON(config, 'GET',
    `/files/${encodeURIComponent(id)}`)
  res.isDir = isDir(res)
  return res
}

export async function statByPath (path) {
  const config = await waitConfig({ nocompat: true })
  const res = await doFetchJSON(config, 'GET',
    `/files/metadata?Path=${encodeURIComponent(path)}`)
  res.isDir = isDir(res)
  return res
}

export async function downloadById (id) {
  const config = await waitConfig({ nocompat: true })
  return doFetch(config, 'GET', `/files/download/${encodeURIComponent(id)}`)
}

export async function downloadByPath (path) {
  const config = await waitConfig({ nocompat: true })
  return doFetch(config, 'GET', `/files/download?Path=${encodeURIComponent(path)}`)
}

function isDir (obj) {
  return obj.attributes.type === 'directory'
}
