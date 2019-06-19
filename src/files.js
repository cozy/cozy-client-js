/* global Blob, File */
import { cozyFetch, cozyFetchJSON } from './fetch'
import jsonapi from './jsonapi'
import { DOCTYPE_FILES } from './doctypes'

// global variables
export const ROOT_DIR_ID = 'io.cozy.files.root-dir'
export const TRASH_DIR_ID = 'io.cozy.files.trash-dir'

const contentTypeOctetStream = 'application/octet-stream'

function sanitizeFileName(name) {
  return name && name.trim()
}

function getFileTypeFromName(name) {
  if (/\.heic$/i.test(name)) return 'image/heic'
  else if (/\.heif$/i.test(name)) return 'image/heif'
  else return null
}

async function doUpload(cozy, data, method, path, options) {
  if (!data) {
    throw new Error('missing data argument')
  }

  // transform any ArrayBufferView to ArrayBuffer
  if (data.buffer && data.buffer instanceof ArrayBuffer) {
    data = data.buffer
  }

  const isBuffer =
    typeof ArrayBuffer !== 'undefined' && data instanceof ArrayBuffer
  const isFile = typeof File !== 'undefined' && data instanceof File
  const isBlob = typeof Blob !== 'undefined' && data instanceof Blob
  const isStream = data.readable === true && typeof data.pipe === 'function'
  const isString = typeof data === 'string'

  if (!isBuffer && !isFile && !isBlob && !isStream && !isString) {
    throw new Error('invalid data type')
  }

  let {
    contentType,
    contentLength,
    checksum,
    lastModifiedDate,
    ifMatch,
    metadata,
    sourceAccount,
    sourceAccountIdentifier
  } = options || {}
  if (!contentType) {
    if (isBuffer) {
      contentType = contentTypeOctetStream
    } else if (isFile) {
      contentType =
        data.type ||
        getFileTypeFromName(data.name.toLowerCase()) ||
        contentTypeOctetStream
      if (!lastModifiedDate) {
        lastModifiedDate = data.lastModifiedDate
      }
    } else if (isBlob) {
      contentType = data.type || contentTypeOctetStream
    } else if (isStream) {
      contentType = contentTypeOctetStream
    } else if (typeof data === 'string') {
      contentType = 'text/plain'
    }
  }

  if (lastModifiedDate && typeof lastModifiedDate === 'string') {
    lastModifiedDate = new Date(lastModifiedDate)
  }

  const headers = {
    'Content-Type': contentType
  }
  if (contentLength) headers['Content-Length'] = String(contentLength)
  if (checksum) headers['Content-MD5'] = checksum
  if (lastModifiedDate) headers['Date'] = lastModifiedDate.toGMTString()
  if (ifMatch) headers['If-Match'] = ifMatch

  let finalpath = path
  if (metadata) {
    const metadataId = await sendMetadata(cozy, metadata)
    if (metadataId) {
      finalpath = addQuerystringParam(finalpath, 'MetadataID', metadataId)
    }
  }

  if (sourceAccount) {
    finalpath = addQuerystringParam(finalpath, 'SourceAccount', sourceAccount)
  }

  if (sourceAccountIdentifier) {
    finalpath = addQuerystringParam(
      finalpath,
      'SourceAccountIdentifier',
      sourceAccountIdentifier
    )
  }

  return cozyFetch(cozy, finalpath, {
    method: method,
    headers: headers,
    body: data
  }).then(res => {
    const json = res.json()
    if (!res.ok) {
      return json.then(err => {
        throw err
      })
    } else {
      return json.then(jsonapi)
    }
  })
}

async function sendMetadata(cozy, metadata) {
  const result = await cozyFetchJSON(cozy, 'POST', '/files/upload/metadata', {
    data: { type: 'io.cozy.files.metadata', attributes: metadata }
  })
  return result && result._id ? result._id : false
}

export function create(cozy, data, options) {
  let { name, dirID, executable, noSanitize } = options || {}

  // handle case where data is a file and contains the name
  if (!name && typeof data.name === 'string') {
    name = data.name
  }

  if (!noSanitize) {
    name = sanitizeFileName(name)
  }

  if (typeof name !== 'string' || name === '') {
    throw new Error('missing name argument')
  }

  if (executable === undefined) {
    executable = false
  }

  const path = `/files/${encodeURIComponent(dirID || '')}`
  const query = `?Name=${encodeURIComponent(
    name
  )}&Type=file&Executable=${executable}`
  return doUpload(cozy, data, 'POST', `${path}${query}`, options)
}

export function createDirectory(cozy, options) {
  let { name, dirID, lastModifiedDate } = options || {}

  name = sanitizeFileName(name)

  if (typeof name !== 'string' || name === '') {
    throw new Error('missing name argument')
  }

  if (lastModifiedDate && typeof lastModifiedDate === 'string') {
    lastModifiedDate = new Date(lastModifiedDate)
  }

  const path = `/files/${encodeURIComponent(dirID || '')}`
  const query = `?Name=${encodeURIComponent(name)}&Type=directory`
  return cozyFetchJSON(cozy, 'POST', `${path}${query}`, undefined, {
    headers: {
      Date: lastModifiedDate ? lastModifiedDate.toGMTString() : ''
    }
  })
}

function getDirectoryOrCreate(cozy, name, parentDirectory) {
  if (parentDirectory && !parentDirectory.attributes)
    throw new Error('Malformed parent directory')

  name = sanitizeFileName(name)

  const path = `${
    parentDirectory._id === ROOT_DIR_ID ? '' : parentDirectory.attributes.path
  }/${name}`

  return cozy.files.statByPath(path || '/').catch(error => {
    const parsedError = JSON.parse(error.message)
    const errors = parsedError.errors
    if (errors && errors.length && errors[0].status === '404') {
      return cozy.files.createDirectory({
        name: name,
        dirID: parentDirectory && parentDirectory._id
      })
    }

    throw errors
  })
}

export function createDirectoryByPath(cozy, path, offline) {
  const parts = path.split('/').filter(part => part !== '')

  const rootDirectoryPromise = cozy.files.statById(ROOT_DIR_ID, offline)

  return parts.length
    ? parts.reduce((parentDirectoryPromise, part) => {
        return parentDirectoryPromise.then(parentDirectory =>
          getDirectoryOrCreate(cozy, part, parentDirectory)
        )
      }, rootDirectoryPromise)
    : rootDirectoryPromise
}

export function updateById(cozy, id, data, options) {
  return doUpload(
    cozy,
    data,
    'PUT',
    `/files/${encodeURIComponent(id)}`,
    options
  )
}

function doUpdateAttributes(cozy, attrs, path, options) {
  if (!attrs || typeof attrs !== 'object') {
    throw new Error('missing attrs argument')
  }

  const { ifMatch } = options || {}
  const body = {
    data: {
      attributes: Object.assign({}, attrs, {
        name: sanitizeFileName(attrs.name)
      })
    }
  }
  return cozyFetchJSON(cozy, 'PATCH', path, body, {
    headers: {
      'If-Match': ifMatch || ''
    }
  })
}

export function updateAttributesById(cozy, id, attrs, options) {
  return doUpdateAttributes(
    cozy,
    attrs,
    `/files/${encodeURIComponent(id)}`,
    options
  )
}

export function updateAttributesByPath(cozy, path, attrs, options) {
  return doUpdateAttributes(
    cozy,
    attrs,
    `/files/metadata?Path=${encodeURIComponent(path)}`,
    options
  )
}

export function trashById(cozy, id, options) {
  if (typeof id !== 'string' || id === '') {
    throw new Error('missing id argument')
  }
  const { ifMatch } = options || {}
  return cozyFetchJSON(
    cozy,
    'DELETE',
    `/files/${encodeURIComponent(id)}`,
    undefined,
    {
      headers: {
        'If-Match': ifMatch || ''
      }
    }
  )
}

export function statById(cozy, id, offline = true, options = {}) {
  if (offline && cozy.offline.hasDatabase(DOCTYPE_FILES)) {
    let db = cozy.offline.getDatabase(DOCTYPE_FILES)
    return Promise.all([
      db.get(id),
      db.find(Object.assign({ selector: { dir_id: id } }, options))
    ]).then(([doc, children]) => {
      if (id === ROOT_DIR_ID) {
        children.docs = children.docs.filter(doc => doc._id !== TRASH_DIR_ID)
      }
      children = sortFiles(
        children.docs.map(doc => addIsDir(toJsonApi(cozy, doc)))
      )
      return addIsDir(toJsonApi(cozy, doc, children))
    })
  }
  const query =
    Object.keys(options).length === 0 ? '' : `?${encodePageOptions(options)}`
  return cozyFetchJSON(
    cozy,
    'GET',
    `/files/${encodeURIComponent(id)}${query}`
  ).then(addIsDir)
}

export function statByPath(cozy, path) {
  return cozyFetchJSON(
    cozy,
    'GET',
    `/files/metadata?Path=${encodeURIComponent(path)}`
  ).then(addIsDir)
}

export function downloadById(cozy, id) {
  return cozyFetch(cozy, `/files/download/${encodeURIComponent(id)}`)
}

export function downloadByPath(cozy, path) {
  return cozyFetch(cozy, `/files/download?Path=${encodeURIComponent(path)}`)
}

function extractResponseLinkRelated(res) {
  let href = res.links && res.links.related
  if (!href) throw new Error('No related link in server response')
  return href
}

export function getDownloadLinkByPath(cozy, path) {
  return cozyFetchJSON(
    cozy,
    'POST',
    `/files/downloads?Path=${encodeURIComponent(path)}`
  ).then(extractResponseLinkRelated)
}

export function getDownloadLinkById(cozy, id) {
  return cozyFetchJSON(
    cozy,
    'POST',
    `/files/downloads?Id=${encodeURIComponent(id)}`
  ).then(extractResponseLinkRelated)
}

export function getFilePath(cozy, file = {}, folder) {
  if (!folder || !folder.attributes) {
    throw Error('Folder should be valid with an attributes.path property')
  }

  const folderPath = folder.attributes.path.endsWith('/')
    ? folder.attributes.path
    : `${folder.attributes.path}/`

  return `${folderPath}${file.name}`
}

export function getCollectionShareLink(cozy, id, collectionType) {
  if (!id) {
    return Promise.reject(
      Error('An id should be provided to create a share link')
    )
  }
  return cozyFetchJSON(cozy, 'POST', `/permissions?codes=email`, {
    data: {
      type: 'io.cozy.permissions',
      attributes: {
        permissions: {
          files: {
            type: 'io.cozy.files',
            verbs: ['GET'],
            values: [id],
            selector: 'referenced_by'
          },
          collection: {
            type: collectionType,
            verbs: ['GET'],
            values: [id]
          }
        }
      }
    }
  }).then(data => ({
    sharecode: `sharecode=${data.attributes.codes.email}`,
    id: `id=${id}`
  }))
}

export function getArchiveLinkByPaths(cozy, paths, name = 'files') {
  const archive = {
    type: 'io.cozy.archives',
    attributes: {
      name: name,
      files: paths
    }
  }
  return cozyFetchJSON(cozy, 'POST', `/files/archive`, { data: archive }).then(
    extractResponseLinkRelated
  )
}

export function getArchiveLinkByIds(cozy, ids, name = 'files') {
  const archive = {
    type: 'io.cozy.archives',
    attributes: {
      name: name,
      ids: ids
    }
  }
  return cozyFetchJSON(cozy, 'POST', `/files/archive`, { data: archive }).then(
    extractResponseLinkRelated
  )
}

export function listTrash(cozy) {
  return cozyFetchJSON(cozy, 'GET', `/files/trash`)
}

export function clearTrash(cozy) {
  return cozyFetchJSON(cozy, 'DELETE', `/files/trash`)
}

export function restoreById(cozy, id) {
  return cozyFetchJSON(cozy, 'POST', `/files/trash/${encodeURIComponent(id)}`)
}

export function destroyById(cozy, id, options) {
  const { ifMatch } = options || {}
  return cozyFetchJSON(
    cozy,
    'DELETE',
    `/files/trash/${encodeURIComponent(id)}`,
    undefined,
    {
      headers: {
        'If-Match': ifMatch || ''
      }
    }
  )
}

function addIsDir(obj) {
  obj.isDir = obj.attributes.type === 'directory'
  return obj
}

function encodePageOptions(options) {
  let opts = []
  for (const name in options) {
    opts.push(
      `page[${encodeURIComponent(name)}]=${encodeURIComponent(options[name])}`
    )
  }
  return opts.join('&')
}

function toJsonApi(cozy, doc, contents = []) {
  let clone = JSON.parse(JSON.stringify(doc))
  delete clone._id
  delete clone._rev
  return {
    _id: doc._id,
    _rev: doc._rev,
    _type: DOCTYPE_FILES,
    attributes: clone,
    relationships: {
      contents: {
        data: contents,
        meta: {
          count: contents.length
        }
      }
    },
    relations: name => {
      if (name === 'contents') {
        return contents
      }
    }
  }
}

function sortFiles(allFiles) {
  const folders = allFiles.filter(f => f.attributes.type === 'directory')
  const files = allFiles.filter(f => f.attributes.type !== 'directory')
  const sort = files =>
    files.sort((a, b) => a.attributes.name.localeCompare(b.attributes.name))
  return sort(folders).concat(sort(files))
}

function addQuerystringParam(path, key, value) {
  return path + `${path}${finalpath.includes('?') ? '&' : '?'}${key}=${value}`
}
