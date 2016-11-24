import * as crud from './crud'
import * as mango from './mango'
import init from './init'
import {promiser, warn} from './utils'

let cozy = {
  init: function (opts, optCallback) {
    return promiser(init(opts), optCallback)
  },
  // create(doctype, attributes) add a document to the database
  create: function (doctype, attributes, optCallback) {
    return promiser(crud.create(doctype, attributes), optCallback)
  },
  // find(doctype, id) retrieve a document by its doctype & ID.
  find: function (doctype, id, optCallback) {
    return promiser(crud.find(doctype, id), optCallback)
  },
  update: function (doctype, doc, changes, optCallback) {
    return promiser(crud.update(doctype, doc, changes), optCallback)
  },
  delete: function (doctype, doc, optCallback) {
    return promiser(crud._delete(doctype, doc), optCallback)
  },
  defineIndex: function (doctype, indexDef, optCallback) {
    return promiser(mango.defineIndex(doctype, indexDef), optCallback)
  },
  query: function (indexRef, query, optCallback) {
    return promiser(mango.query(indexRef, query), optCallback)
  },
  // updateAttributes(doctype, id, changes) performs a patch.
  updateAttribute: function (doctype, id, changes, optCallback) {
    return promiser(crud.updateAttributes(doctype, id, changes), optCallback)
  },
  // aliased delete to destroy fo browser-sdk compatibility
  destroy: function (doctype, doc, optCallback) {
    warn('destroy is deprecated, use cozy.delete instead.')
    return promiser(crud._delete(doctype, doc), optCallback)
  }
}

if ((typeof window) !== 'undefined') window.cozy = cozy

export default cozy
