import {cozyFetchJSON} from './fetch'
import { DOCTYPE_FILES } from './doctypes'

export function addReferencedFiles (cozy, doc, ids) {
  if (!doc) throw new Error('missing doc argument')
  if (!Array.isArray(ids)) ids = [ids]

  const refs = ids.map((id) => ({type: DOCTYPE_FILES, id: id}))

  return cozyFetchJSON(cozy, 'POST', makeReferencesPath(doc), {data: refs})
}

export function listReferencedFiles (cozy, doc) {
  if (!doc) throw new Error('missing doc argument')
  return cozyFetchJSON(cozy, 'GET', makeReferencesPath(doc))
    .then((files) => files.map((file) => file._id))
}

function makeReferencesPath (doc) {
  const type = encodeURIComponent(doc._type)
  const id = encodeURIComponent(doc._id)
  return `/data/${type}/${id}/relationships/references`
}
