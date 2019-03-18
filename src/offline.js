import { DOCTYPE_FILES } from './doctypes'
import { refreshToken } from './auth_v3'
import { isOffline } from './utils'
import PouchDB from 'pouchdb-browser'
import pouchdbFind from 'pouchdb-find'

export const replicationOfflineError =
  'Replication abort, your device is actually offline.'

let pluginLoaded = false

/*
  For each doctype we have some parameters:
  cozy._offline[doctype] = {
    database: pouchdb database
    replication: the pouchdb replication
    replicationPromise: promise of replication
    interval: repeated replication interval
  }
*/

export function init(cozy, { options = {}, doctypes = [] }) {
  for (let doctype of doctypes) {
    createDatabase(cozy, doctype, options)
  }
}

// helper

function getInfo(cozy, doctype) {
  cozy._offline = cozy._offline || []
  cozy._offline[doctype] = cozy._offline[doctype] || {}
  return cozy._offline[doctype]
}

export function getDoctypes(cozy) {
  cozy._offline = cozy._offline || []
  return Object.keys(cozy._offline)
}

//
// DATABASE
//

export function hasDatabase(cozy, doctype) {
  return getDatabase(cozy, doctype) !== undefined
}

export function getDatabase(cozy, doctype) {
  return getInfo(cozy, doctype).database
}

export function setDatabase(cozy, doctype, database) {
  cozy._offline[doctype].database = database
  return getDatabase(cozy, doctype)
}

export function migrateDatabase(cozy, doctype, options = {}) {
  const oldDb = getDatabase(cozy, doctype)
  const newOptions = {
    adapter: 'idb',
    ...options
  }
  const newDb = new PouchDB(doctype, newOptions)

  return oldDb.replicate.to(newDb).then(() => {
    setDatabase(cozy, doctype, newDb)
    oldDb.destroy()
    return newDb
  })
}

export function createDatabase(cozy, doctype, options = {}) {
  if (!pluginLoaded) {
    PouchDB.plugin(pouchdbFind)
    pluginLoaded = true
  }

  if (hasDatabase(cozy, doctype)) {
    return Promise.resolve(getDatabase(cozy, doctype))
  }

  setDatabase(cozy, doctype, new PouchDB(doctype, options))
  return createIndexes(cozy, doctype).then(() => getDatabase(cozy, doctype))
}

export function destroyDatabase(cozy, doctype) {
  if (!hasDatabase(cozy, doctype)) {
    return Promise.resolve(false)
  }

  return stopRepeatedReplication(cozy, doctype)
    .then(() => stopReplication(cozy, doctype))
    .then(() => getDatabase(cozy, doctype).destroy())
    .then(response => {
      setDatabase(cozy, doctype, undefined)
      return response
    })
}

export function destroyAllDatabase(cozy) {
  const doctypes = getDoctypes(cozy)
  const destroy = doctype => destroyDatabase(cozy, doctype)
  return Promise.all(doctypes.map(destroy))
}

function createIndexes(cozy, doctype) {
  if (doctype === DOCTYPE_FILES) {
    return getDatabase(cozy, doctype).createIndex({
      index: { fields: ['dir_id'] }
    })
  }
  return Promise.resolve()
}

//
// REPLICATION
//

export function hasReplication(cozy, doctype) {
  return getReplication(cozy, doctype) !== undefined
}

function getReplication(cozy, doctype) {
  return getInfo(cozy, doctype).replication
}

function setReplication(cozy, doctype, replication) {
  cozy._offline[doctype].replication = replication
  return getReplication(cozy, doctype)
}

function getReplicationUrl(cozy, doctype) {
  return cozy.authorize().then(credentials => {
    const basic = credentials.token.toBasicAuth()
    return (cozy._url + '/data/' + doctype).replace('//', `//${basic}`)
  })
}

function getReplicationPromise(cozy, doctype) {
  return getInfo(cozy, doctype).replicationPromise
}

function setReplicationPromise(cozy, doctype, promise) {
  cozy._offline[doctype].replicationPromise = promise
  return getReplicationPromise(cozy, doctype)
}

export function replicateFromCozy(cozy, doctype, options = {}) {
  return setReplicationPromise(
    cozy,
    doctype,
    new Promise((resolve, reject) => {
      if (!hasDatabase(cozy, doctype)) {
        createDatabase(cozy, doctype)
      }
      if (options.live === true) {
        return reject(
          new Error("You can't use `live` option with Cozy couchdb.")
        )
      }

      if (isOffline()) {
        reject(replicationOfflineError)
        options.onError && options.onError(replicationOfflineError)
        return
      }

      getReplicationUrl(cozy, doctype).then(url =>
        setReplication(
          cozy,
          doctype,
          getDatabase(cozy, doctype)
            .replicate.from(url, options)
            .on('complete', info => {
              setReplication(cozy, doctype, undefined)
              resolve(info)
              options.onComplete && options.onComplete(info)
            })
            .on('error', err => {
              if (err.error === 'code=400, message=Expired token') {
                cozy.authorize().then(({ client, token }) => {
                  refreshToken(cozy, client, token)
                    .then(newToken => cozy.saveCredentials(client, newToken))
                    .then(() => replicateFromCozy(cozy, doctype, options))
                })
              } else {
                console.warn(`ReplicateFromCozy '${doctype}' Error:`)
                console.warn(err)
                setReplication(cozy, doctype, undefined)
                reject(err)
                options.onError && options.onError(err)
              }
            })
        )
      )
    })
  )
}

export function stopReplication(cozy, doctype) {
  if (!getDatabase(cozy, doctype) || !hasReplication(cozy, doctype)) {
    return Promise.resolve()
  }

  return new Promise(resolve => {
    try {
      getReplicationPromise(cozy, doctype).then(() => {
        resolve()
      })
      getReplication(cozy, doctype).cancel()
      // replication is set to undefined by complete replication
    } catch (e) {
      resolve()
    }
  })
}

export function stopAllReplication(cozy) {
  const doctypes = getDoctypes(cozy)
  const stop = doctype => stopReplication(cozy, doctype)
  return Promise.all(doctypes.map(stop))
}

//
// REPEATED REPLICATION
//

function getRepeatedReplication(cozy, doctype) {
  return getInfo(cozy, doctype).interval
}

function setRepeatedReplication(cozy, doctype, interval) {
  cozy._offline[doctype].interval = interval
}

export function hasRepeatedReplication(cozy, doctype) {
  return getRepeatedReplication(cozy, doctype) !== undefined
}

export function startRepeatedReplication(cozy, doctype, timer, options = {}) {
  // TODO: add timer limitation for not flooding Gozy
  if (hasRepeatedReplication(cozy, doctype)) {
    return getRepeatedReplication(cozy, doctype)
  }

  return setRepeatedReplication(
    cozy,
    doctype,
    setInterval(() => {
      if (isOffline()) {
        // network is offline, replication cannot be launched
        console.info(replicationOfflineError)
        return
      }
      if (!hasReplication(cozy, doctype)) {
        replicateFromCozy(cozy, doctype, options)
        // TODO: add replicationToCozy
      }
    }, timer * 1000)
  )
}

export function stopRepeatedReplication(cozy, doctype) {
  if (hasRepeatedReplication(cozy, doctype)) {
    clearInterval(getRepeatedReplication(cozy, doctype))
    setRepeatedReplication(cozy, doctype, undefined)
  }
  if (hasReplication(cozy, doctype)) {
    return stopReplication(cozy, doctype)
  }

  return Promise.resolve()
}

export function stopAllRepeatedReplication(cozy) {
  const doctypes = getDoctypes(cozy)
  const stop = doctype => stopRepeatedReplication(cozy, doctype)
  return Promise.all(doctypes.map(stop))
}
