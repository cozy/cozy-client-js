import * as crud from './crud'

export default {
  // create(doctype, attributes) add a document to the database
  create: crud.create,
  // find(doctype, id) retrieve a document by its doctype & ID.
  find: crud.find,
  // updateAttributes(doctype, {_id, _rev}, changes) performs a patch.
  updateAttribute: crud.updateAttributes,
  // destroy(doctype, {_id, _rev}) removes a document from the database
  destroy: crud.destroy
}
