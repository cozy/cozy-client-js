const PouchDB = require('pouchdb')

export function init (cozy, { options = {}, doctypes = [] }) {
  for (let doctype of doctypes) {
    addDoctype(cozy, doctype, options)
  }
}

export function addDoctype (cozy, doctype, options = {}) {
  cozy._offline_databases = cozy._offline_databases || []
  cozy._offline_databases[doctype] = new PouchDB(doctype, options)
}

export function replicateFromCozy (cozy, doctype, options = {}, events = {}) {
  if (cozy._offline_databases && doctype in cozy._offline_databases) {
    if (options.live === true) {
      throw new Error('You can\'t use `live` option with Cozy couchdb.')
    }
    const url = cozy._url + '/data/' + doctype
    let db = cozy._offline_databases[doctype]
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
