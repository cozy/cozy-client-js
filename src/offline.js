const PouchDB = require('pouchdb')

export function init (cozy, { options = {}, docTypes = [] }) {
  for (let docType of docTypes) {
    addDocType(cozy, docType, options)
  }
}

export function addDocType (cozy, docType, options) {
  cozy._offline_databases = cozy._offline_databases || []
  cozy._offline_databases[docType] = new PouchDB(docType, options)
}
