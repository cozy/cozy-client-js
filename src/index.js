import * as crud from './crud'
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
  // updateAttributes(doctype, {_id, _rev}, changes) performs a patch.
  updateAttribute: crud.updateAttributes,
  // destroy(doctype, {_id, _rev}) removes a document from the database
  destroy: crud.destroy
}
