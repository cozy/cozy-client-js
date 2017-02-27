import PouchDB from 'pouchdb'
import pouchdbFind from 'pouchdb-find'
import { DOCTYPE_FILES } from './doctypes'

let pluginLoaded = false

export function init (cozy, { options = {}, doctypes = [], timer }) {
  for (let doctype of doctypes) {
    createDatabase(cozy, doctype, options)
  }
  if (timer !== undefined) { startAllSync(cozy, timer) }
}

export function createDatabase (cozy, doctype, options = {}, timer) {
  if (!pluginLoaded) {
    PouchDB.plugin(pouchdbFind)
    pluginLoaded = true
  }
  cozy._offline = cozy._offline || []
  cozy._offline[doctype] = {}
  const offline = cozy._offline[doctype]
  offline.database = new PouchDB(doctype, options)
  offline.timer = timer
  offline.autoSync = null
  if (doctype === DOCTYPE_FILES) {
    offline.database.createIndex({index: {fields: ['dir_id']}})
  }
  return offline.database
}

export function hasDatabase (cozy, doctype) {
  return cozy._offline !== null &&
    doctype in cozy._offline &&
    cozy._offline[doctype].database !== undefined
}

export function getDatabase (cozy, doctype) {
  if (hasDatabase(cozy, doctype)) {
    return cozy._offline[doctype].database
  }
}

export function destroyDatabase (cozy, doctype) {
  if (hasDatabase(cozy, doctype)) {
    getDatabase(cozy, doctype).destroy()
  }
}

export function getDoctypes (cozy) {
  return cozy._offline !== null ? Object.keys(cozy._offline) : []
}

//
// SYNC
//

export function startAllSync (cozy, timer) {
  if (timer) {
    const doctypes = getDoctypes(cozy)
    doctypes.forEach((doctype) => {
      startSync(cozy, doctype, timer)
    })
  }
}

export function startSync (cozy, doctype, timer) {
  // TODO: add timer limitation for not flooding Gozy
  if (hasDatabase(cozy, doctype)) {
    const offline = cozy._offline[doctype]
    offline.timer = timer
    offline.autoSync = setInterval(async () => {
      if (offline.replication === undefined) {
        offline.replicattion = await replicateFromCozy(cozy, doctype)
      }
      // TODO: add replicationToCozy
    }, timer * 1000)
  }
}

export function stopAllSync (cozy) {
  const doctypes = getDoctypes(cozy)
  doctypes.forEach((doctype) => {
    stopSync(cozy, doctype)
  })
}

export function stopSync (cozy, doctype) {
  if (hasSync(cozy, doctype)) {
    const offline = cozy._offline[doctype]
    if (offline.replication) {
      offline.replication.cancel()
    }
    clearInterval(offline.autoSync)
    offline.autoSync = null
  }
}

export function hasSync (cozy, doctype) {
  return cozy._offline !== null &&
    doctype in cozy._offline &&
    cozy._offline[doctype].autoSync !== undefined
}

export function replicateFromCozy (cozy, doctype, options = {}, events = {}) {
  if (hasDatabase(cozy, doctype)) {
    if (options.live === true) {
      return Promise.reject(new Error('You can\'t use `live` option with Cozy couchdb.'))
    }
    if (options.manualAuthCredentials) {
      return replicateFromCozyWithAuth(cozy, doctype, options, events, options.manualAuthCredentials)
    } else {
      return cozy.authorize().then((credentials) => {
        return replicateFromCozyWithAuth(cozy, doctype, options, events, credentials)
      })
    }
  } else {
    return Promise.reject(new Error(`You should add this doctype: ${doctype} to offline.`))
  }
}

export function replicateFromCozyWithAuth (cozy, doctype, options, events, credentials) {
  let basic = credentials.token.toBasicAuth()
  let url = (cozy._url + '/data/' + doctype).replace('//', `//${basic}`)
  const db = getDatabase(cozy, doctype)
  cozy._offline[doctype].replication = db.replicate
    .from(url, options)
    .on('complete', result => {
      cozy._offline[doctype].replicateResult = result
    })
  return cozy._offline[doctype].replication
}
