import PouchDB from 'pouchdb'
import pouchdbFind from 'pouchdb-find'
import { DOCTYPE_FILES } from './doctypes'

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

export function init (cozy, { options = {}, doctypes = [] }) {
  for (let doctype of doctypes) {
    createDatabase(cozy, doctype, options)
  }
}

// helper

export function getInfo (cozy, doctype) {
  cozy._offline = cozy._offline || []
  cozy._offline[doctype] = cozy._offline[doctype] || {}
  return cozy._offline[doctype]
}

export function getDoctypes (cozy) {
  cozy._offline = cozy._offline || []
  return Object.keys(cozy._offline)
}

//
// DATABASE
//

export function hasDatabase (cozy, doctype) {
  return getDatabase(cozy, doctype) !== undefined
}

export function getDatabase (cozy, doctype) {
  return getInfo(cozy, doctype).database
}

export function setDatabase (cozy, doctype, database) {
  cozy._offline[doctype].database = database
  return getDatabase(cozy, doctype)
}

export function errorDatabase (doctype) {
  return new Error(`You should add this doctype: ${doctype} to offline.`)
}

export function createDatabase (cozy, doctype, options = {}) {
  if (!pluginLoaded) {
    PouchDB.plugin(pouchdbFind)
    pluginLoaded = true
  }
  return new Promise((resolve, reject) => {
    if (!hasDatabase(cozy, doctype)) {
      setDatabase(cozy, doctype, new PouchDB(doctype, options))
      return createIndexes(cozy, doctype).then(() => {
        resolve(getDatabase(cozy, doctype))
      }).catch(reject)
    }

    return resolve(getDatabase(cozy, doctype))
  })
}

export function destroyDatabase (cozy, doctype) {
  return new Promise((resolve, reject) => {
    if (hasDatabase(cozy, doctype)) {
      stopRepeatedReplication(cozy, doctype).then(response => {
        getDatabase(cozy, doctype).destroy().then(response => {
          setDatabase(cozy, doctype, undefined)
          return resolve(response)
        }).catch(err => {
          console.warn(`Destroy Database '${doctype}' Error:`)
          console.warn(err)
          reject(err)
        })
      }).catch(err => {
        console.log('ici')
        reject(err)
      })
    } else {
      resolve(false)
    }
  })
}

export function destroyAllDatabase (cozy) {
  const doctypes = getDoctypes(cozy)
  const destroy = (doctype) => {
    return destroyDatabase(cozy, doctype)
  }
  return Promise.all(doctypes.map(destroy))
}

function createIndexes (cozy, doctype) {
  return new Promise((resolve, reject) => {
    if (doctype === DOCTYPE_FILES) {
      return getDatabase(cozy, doctype).createIndex({index: {fields: ['dir_id']}}).then(() => {
        resolve()
      }).catch(() => {
        reject()
      })
    }
    return resolve()
  })
}

//
// REPLICATION
//

export function hasReplication (cozy, doctype) {
  return getReplication(cozy, doctype) !== undefined
}

export function getReplication (cozy, doctype) {
  return getInfo(cozy, doctype).replication
}

export function setReplication (cozy, doctype, replication) {
  cozy._offline[doctype].replication = replication
  return getReplication(cozy, doctype)
}

export function getReplicationUrl (cozy, doctype) {
  return cozy._url + '/data/' + doctype
}

export function getReplicationPromise (cozy, doctype) {
  return getInfo(cozy, doctype).replicationPromise
}

export function setReplicationPromise (cozy, doctype, promise) {
  cozy._offline[doctype].replicationPromise = promise
  return getReplicationPromise(cozy, doctype)
}

export function stopReplication (cozy, doctype) {
  return new Promise((resolve, reject) => {
    if (getDatabase(cozy, doctype) && hasReplication(cozy, doctype)) {
      try {
        getReplicationPromise(cozy, doctype).then(() => {
          resolve()
        })
        getReplication(cozy, doctype).cancel()
        // replication is set to undefined by complete replication
      } catch (e) {
      }
    }
    return resolve()
  })
}

export function replicateFromCozy (cozy, doctype, credentials, options = {}) {
  return setReplicationPromise(cozy, doctype, new Promise((resolve, reject) => {
    if (hasDatabase(cozy, doctype)) {
      if (options.live === true) {
        return reject(new Error('You can\'t use `live` option with Cozy couchdb.'))
      }

      const basic = credentials.token.toBasicAuth()
      const url = getReplicationUrl(cozy, doctype).replace('//', `//${basic}`)
      let db = getDatabase(cozy, doctype)
      setReplication(cozy, doctype,
        db.replicate.from(url, options).on('complete', (info) => {
          setReplication(cozy, doctype, undefined)
          resolve(info)
        }).on('error', (err) => {
          console.warn(`ReplicateFromCozy '${doctype}' Error:`)
          console.warn(err)
          reject(err)
        })
      )

      return getReplication(doctype)
    } else {
      return reject(errorDatabase(doctype))
    }
  }).then(() => {
    setReplicationPromise(cozy, doctype, undefined)
  }).catch(() => {
    setReplicationPromise(cozy, doctype, undefined)
  }))
}

//
// REPEATED REPLICATION
//

export function getRepeatedReplication (cozy, doctype) {
  return getInfo(cozy, doctype).interval
}

export function setRepeatedReplication (cozy, doctype, interval) {
  cozy._offline[doctype].interval = interval
}

export function hasRepeatedReplication (cozy, doctype) {
  return getRepeatedReplication(cozy, doctype) !== undefined
}

export function startRepeatedReplication (cozy, doctype, credentials, timer, options = {}) {
  // TODO: add timer limitation for not flooding Gozy
  if (hasDatabase(cozy, doctype)) {
    if (!hasRepeatedReplication(cozy, doctype)) {
      setRepeatedReplication(cozy, doctype, setInterval(() => {
        if (!hasReplication(cozy, doctype)) {
          replicateFromCozy(cozy, doctype)
          // TODO: add replicationToCozy
        }
      }, timer * 1000))
    }

    return getRepeatedReplication(cozy, doctype)
  } else {
    return Promise.reject(errorDatabase(doctype))
  }
}

export function stopRepeatedReplication (cozy, doctype) {
  if (hasRepeatedReplication(cozy, doctype)) {
    // clearInterval return undefined
    setRepeatedReplication(cozy, doctype, clearInterval(getRepeatedReplication(cozy, doctype)))
    if (hasReplication(cozy, doctype)) {
      getReplication(cozy, doctype).cancel()
    }
    return Promise.resolve(true)
  } else {
    return Promise.resolve(false)
  }
}
