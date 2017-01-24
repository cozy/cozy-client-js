const PouchDB = require('pouchdb')

export function init (cozy, { options = {}, doctypes = [] }) {
  for (let doctype of doctypes) {
    createDatabase(cozy, doctype, options)
  }
}

export function createDatabase (cozy, doctype, options = {}) {
  cozy._offline_databases = cozy._offline_databases || []
  cozy._offline_databases[doctype] = new PouchDB(doctype, options)
  return cozy._offline_databases[doctype]
}

export function hasDatabase (cozy, doctype) {
  return cozy._offline_databases && doctype in cozy._offline_databases
}

export function getDatabase (cozy, doctype) {
  if (hasDatabase(cozy, doctype)) {
    return cozy._offline_databases[doctype]
  }
  return
}

export function destroyDatabase (cozy, doctype) {
  if (hasDatabase(cozy, doctype)) {
    getDatabase(cozy, doctype).destroy()
    delete getDatabase(cozy, doctype)
  }
}

export function replicateFromCozy (cozy, doctype, options = {}, events = {}) {
  if (hasDatabase(cozy, doctype)) {
    if (options.live === true) {
      throw new Error('You can\'t use `live` option with Cozy couchdb.')
    }
    const url = cozy._url + '/data/' + doctype
    let db = getDatabase(cozy, doctype)
    let replication = db.replicate.from(url, options)
    const eventNames = [
      'change', 'paused', 'active', 'denied', 'complete', 'error'
    ]
    for (let eventName of eventNames) {
      if (typeof events[eventName] === 'function') {
        replication.on(eventName, events[eventName])
      }
    }
    return replication
  } else {
    throw new Error(`You should add this doctype: ${doctype} to offline.`)
  }
}
