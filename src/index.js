import * as crud from './crud'
import * as mango from './mango'
import init from './init'
import {promiser} from './utils'

export default {
  init: init,
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
  // updateAttributes(doctype, {_id, _rev}, changes) performs a patch.
  updateAttribute: crud.updateAttributes,
  // destroy(doctype, {_id, _rev}) removes a document from the database
  destroy: crud.destroy
}
