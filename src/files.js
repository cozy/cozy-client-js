/* global fetch Blob File */
import {waitConfig, doFetch} from './utils'

const contentTypeOctetStream = 'application/octet-stream'

function doUpload (config, data, contentType, method, path) {
  if (!data) {
    throw new Error('missing data argument')
  }

  const headers = {}
  const options = { method, headers }

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

  headers['content-type'] = contentType

  const target = config.target || ''
  return fetch(`${target}${path}`, options)
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
