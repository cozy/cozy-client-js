/* global fetch Blob File */
import {waitConfig} from './utils'

const contentTypeOctetStream = 'application/octet-stream'

// @data can be Blob | File | ArrayBuffer | ArrayBufferView | string
export async function upload (data, args) {
  const config = await waitConfig()
  if (config.isV2) {
    throw new Error('not implemented on v2')
  }

  let { name, fileId, folderId, mode, contentType } = args || {}

  if (!data) {
    throw new Error('missing data argument')
  }

  if (!folderId) folderId = ''
  if (!mode) mode = 'create'

  const headers = {}
  const options = { headers }

  if (mode === 'create') {
    options.method = 'POST'
  } else if (mode === 'update') {
    options.method = 'PUT'
  } else {
    throw new Error('unknown upload mode: "' + mode + '"')
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

  if (isFile && !name) {
    name = data.name
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

  let path
  let query
  if (mode === 'create') {
    if (typeof name !== 'string' || name === '') {
      throw new Error('missing name argument')
    }

    path = `/files/${encodeURIComponent(folderId)}`
    query = `?Name=${encodeURIComponent(name)}&Type=io.cozy.files`
  } else {
    if (typeof fileId !== 'string' || fileId === '') {
      throw new Error('missing fileId argument')
    }

    path = `/files/${encodeURIComponent(fileId)}`
    query = ''
  }

  const target = config.target || ''
  return fetch(`${target}${path}${query}`, options)
    .then((res) => {
      const json = res.json()
      if (!res.ok) {
        return json.then(err => { throw err })
      } else {
        return json
      }
    })
}
