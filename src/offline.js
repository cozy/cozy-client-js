const PouchDB = require('pouchdb')

export function init (cozy, { options = {}, docTypes = [] }) {
  for (let docType of docTypes) {
    addDocType(cozy, docType, options)
  }
}

export function addDocType (cozy, docType, options = {}) {
  cozy._offline_databases = cozy._offline_databases || []
  cozy._offline_databases[docType] = new PouchDB(docType, options)
}

export function replicateFromCozy (cozy, docType, options = {}, events = {}) {
  if (cozy._offline_databases && docType in cozy._offline_databases) {
    if (options.live === true) {
      throw new Error('You can\'t use `live` option with Cozy couchdb.')
    }
    const url = cozy._url + '/data/' + docType
    let db = cozy._offline_databases[docType]
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
    throw new Error(`You should add this docType: ${docType} to offline.`)
  }
}
