import * as auth from './auth'
import * as crud from './crud'
import * as mango from './mango'
import * as files from './files'
import init from './init'
import {promiser, warn} from './utils'

let filesProto = {
  create: function (data, options, optCallback) {
    return promiser(files.create(data, options), optCallback)
  },
  createDirectory: function (options, optCallback) {
    return promiser(files.createDirectory(options), optCallback)
  },
  updateById: function (id, data, options, optCallback) {
    return promiser(files.updateById(id, data, options), optCallback)
  },
  updateAttributesById: function (id, attrs, optCallback) {
    return promiser(files.updateAttributesById(id, attrs), optCallback)
  },
  updateAttributesByPath: function (path, attrs, optCallback) {
    return promiser(files.updateAttributesByPath(path, attrs), optCallback)
  },
  trashById: function (id, optCallback) {
    return promiser(files.trashById(id), optCallback)
  },
  statById: function (id, optCallback) {
    return promiser(files.statById(id), optCallback)
  },
  statByPath: function (path, optCallback) {
    return promiser(files.statByPath(path), optCallback)
  },
  downloadById: function (id, optCallback) {
    return promiser(files.downloadById(id), optCallback)
  },
  downloadByPath: function (path, optCallback) {
    return promiser(files.downloadByPath(path), optCallback)
  }
}

let authProto = {
  Client: auth.Client,
  AccessToken: auth.AccessToken,
  registerClient: function (client, optCallback) {
    return promiser(auth.registerClient(client), optCallback)
  },
  getClient: function (client, token, optCallback) {
    return promiser(auth.getClient(client, token), optCallback)
  },
  getAuthCodeURL: function (client, scopes = [], optCallback) {
    return promiser(auth.getAuthCodeURL(client, scopes), optCallback)
  },
  getAccessToken: function (client, state, pageURL = '', optCallback) {
    return promiser(auth.getAccessToken(client, state, pageURL), optCallback)
  },
  refreshToken: function (client, token, optCallback) {
    return promiser(auth.refreshToken(client, token), optCallback)
  }
}

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
  },

  auth: authProto,
  files: filesProto
}

if ((typeof window) !== 'undefined') window.cozy = cozy

export default cozy
