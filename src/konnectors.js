import {cozyFetchJSON} from './fetch'

const STATE_READY = 'ready'

export function addAccount (cozy, konnector, account) {
  return Promise.resolve(konnector)
}

export function fetchManifest (cozy, source) {
  return cozyFetchJSON(cozy, 'GET', `/konnectors/manifests?Source=${encodeURIComponent(source)}`)
}

let cachedSlugIndex
function getSlugIndex (cozy) {
  console.debug('cozy.client cachedSlugIndex is', cachedSlugIndex)
  return cachedSlugIndex
    ? Promise.resolve(cachedSlugIndex)
      : cozy.data.defineIndex('io.cozy.konnectors', ['slug'])
          .then(index => {
            cachedSlugIndex = index
            return index
          })
}

export function get (cozy, id) {
  if (!id) throw new Error('Missing `id` parameter')
  return cozyFetchJSON(cozy, 'GET', `/data/io.cozy.konnectors/${encodeURIComponent(id)}`)
}

export function getBySlug (cozy, slug) {
  if (!slug) throw new Error('Missing `slug` paramater')

  return getSlugIndex(cozy)
    .then(index => cozy.data.query(index, {selector: {slug: slug}}))
    .then(list => list.length ? list[0] : null)
}

export function install (cozy, slug, source, timeout = 120000) {
  if (!slug) throw new Error('Missing `slug` paramater for konnector')
  if (!source) throw new Error('Missing `source` parameter for konnector')

  return cozyFetchJSON(cozy, 'POST', `/konnectors/${slug}?Source=${encodeURIComponent(source)}`)
      .then(konnector => new Promise((resolve, reject) => {
        const idTimeout = setTimeout(() => {
          reject(new Error('Konnector installation timed out'))
        }, timeout)

        // monitor the status of the connector
        // TODO: replace by a polling abstraction utility.
        const idInterval = setInterval(() => {
          get(cozy, konnector._id)
            .then(konnector => {
              if (konnector.state === STATE_READY) {
                clearTimeout(idTimeout)
                clearInterval(idInterval)
                resolve(konnector)
              }
            })
            .catch(error => {
              clearTimeout(idTimeout)
              clearInterval(idInterval)
              reject(error)
            })
        }, 5000)
      }))
}

export function setFolder (cozy, konnector, file) {
  return Promise.resolve(konnector)
}
