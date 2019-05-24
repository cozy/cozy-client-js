import { cozyFetchJSON, cozyFetchRawJSON } from './fetch'
import { DOCTYPE_FILES } from './doctypes'

function updateRelations(verb) {
  return function(cozy, doc, ids) {
    if (!doc) throw new Error('missing doc argument')
    if (!Array.isArray(ids)) ids = [ids]

    const refs = ids.map(id => ({ type: DOCTYPE_FILES, id }))

    return cozyFetchJSON(cozy, verb, makeReferencesPath(doc), { data: refs })
  }
}

export const addReferencedFiles = updateRelations('POST')
export const removeReferencedFiles = updateRelations('DELETE')

export function listReferencedFiles(cozy, doc) {
  if (!doc) throw new Error('missing doc argument')
  return cozyFetchJSON(cozy, 'GET', makeReferencesPath(doc)).then(files =>
    files.map(file => file._id)
  )
}

export function fetchReferencedFiles(cozy, doc, options, sort) {
  if (!doc) throw new Error('missing doc argument')
  const params = Object.keys(options)
    .map(key => {
      const value = encodeURIComponent(JSON.stringify(options[key]))
      return `&page[${key}]=${value}`
    })
    .join('')
  // Datetime is the default sort, but 'id' is also available
  if (!sort) {
    sort = 'datetime'
  }
  return cozyFetchRawJSON(
    cozy,
    'GET',
    `${makeReferencesPath(doc)}?include=files&sort=${sort}${params}`
  )
}

function makeReferencesPath(doc) {
  const type = encodeURIComponent(doc._type)
  const id = encodeURIComponent(doc._id)
  return `/data/${type}/${id}/relationships/references`
}
