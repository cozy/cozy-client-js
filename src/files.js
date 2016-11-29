/* global fetch Blob File */
import {waitConfig, doFetch} from './utils'

const contentTypeOctetStream = 'application/octet-stream'

function doUpload (config, data, contentType, method, path) {
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
        return json
      }
    })
}

export async function createFile (data, options) {
  const config = await waitConfig({ nocompat: true })

  let {name, folderId, contentType} = options || {}

  // handle case where data is a file and contains the name
  if (!name && typeof data.name === 'string') {
    name = data.name
  }

  if (typeof name !== 'string' || name === '') {
    throw new Error('missing name argument')
  }

  const path = `/files/${encodeURIComponent(folderId || '')}`
  const query = `?Name=${encodeURIComponent(name)}&Type=io.cozy.files`
  return doUpload(config, data, contentType, 'POST', `${path}${query}`)
}

export async function updateFile (data, options) {
  const config = await waitConfig({ nocompat: true })

  let {fileId, contentType} = options || {}

  if (typeof fileId !== 'string' || fileId === '') {
    throw new Error('missing fileId argument')
  }

  const path = `/files/${encodeURIComponent(fileId)}`
  return doUpload(config, data, contentType, 'PUT', path)
}

export async function updateAttributes (attrs, options) {
  const config = await waitConfig({ nocompat: true })
  const {id, path: filePath} = options || {}

  if (!attrs || typeof attrs !== 'object') {
    throw new Error('missing attrs argument')
  }

  let path, query
  if (id) {
    path = `/files/${encodeURIComponent(id)}`
    query = ''
  } else if (filePath) {
    path = '/files/metadata'
    query = `?Path=${encodeURIComponent(filePath)}`
  } else {
    throw new Error('missing id or path argument')
  }

  const body = { data: { attributes: attrs } }
  return doFetch(config, 'PATCH', `${path}${query}`, body)
}

export async function createDirectory (options) {
  const config = await waitConfig({ nocompat: true })

  let {name, folderId} = options || {}

  if (typeof name !== 'string' || name === '') {
    throw new Error('missing name argument')
  }

  const path = `/files/${encodeURIComponent(folderId || '')}`
  const query = `?Name=${encodeURIComponent(name)}&Type=io.cozy.folders`
  return doFetch(config, 'POST', `${path}${query}`)
}

export async function trash (id) {
  const config = await waitConfig({ nocompat: true })

  if (typeof id !== 'string' || id === '') {
    throw new Error('missing id argument')
  }

  return doFetch(config, 'DELETE', `/files/${encodeURIComponent(id)}`)
}
