import { cozyFetchJSON } from './fetch'
import { encodeQuery } from './utils'
import { DOCTYPE_FILES } from './doctypes'

function updateRelations (verb) {
  return function (cozy, doc, ids) {
    if (!doc) throw new Error('missing doc argument')
    if (!Array.isArray(ids)) ids = [ids]

    const refs = ids.map((id) => ({type: DOCTYPE_FILES, id}))

    return cozyFetchJSON(cozy, verb, makeReferencesPath(doc), {data: refs})
  }
}

export const addReferencedFiles = updateRelations('POST')
export const removeReferencedFiles = updateRelations('DELETE')

export function listReferencedFiles (cozy, doc, options) {
  if (!doc) throw new Error('missing doc argument')
  return cozyFetchJSON(cozy, 'GET', makeReferencesPath(doc, options))
    .then((files) => files.map((file) => file._id))
}

function makeReferencesPath (doc, options) {
  const type = encodeURIComponent(doc._type)
  const id = encodeURIComponent(doc._id)
  let q = encodeQuery(options)
  if (q !== '') {
    q = '?' + q
  }
  return `/data/${type}/${id}/relationships/references${q}`
}
