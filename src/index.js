/* global fetch */
import 'babel-polyfill'

import {unpromiser, retry, warn} from './utils'
import {LocalStorage, MemoryStorage} from './auth_storage'
import {AppToken as AppTokenV2, getAppToken as getAppTokenV2} from './auth_v2'
import * as auth from './auth_v3'
import * as data from './data'
import * as mango from './mango'
import * as files from './files'
import * as offline from './offline'
import * as settings from './settings'
import * as relations from './relations'

const {
  AppToken: AppTokenV3,
  AccessToken: AccessTokenV3,
  Client: ClientV3
} = auth

const AuthNone = 0
const AuthRunning = 1
const AuthError = 2
const AuthOK = 3

const defaultClientParams = {
  softwareID: 'github.com/cozy/cozy-client-js'
}

const dataProto = {
  create: data.create,
  find: data.find,
  update: data.update,
  delete: data._delete,
  updateAttributes: data.updateAttributes,
  changesFeed: data.changesFeed,
  defineIndex: mango.defineIndex,
  query: mango.query,
  addReferencedFiles: relations.addReferencedFiles,
  listReferencedFiles: relations.listReferencedFiles,
  destroy: function (...args) {
    warn('destroy is deprecated, use cozy.data.delete instead.')
    return data._delete(...args)
  }
}

const authProto = {
  client: auth.client,
  registerClient: auth.registerClient,
  updateClient: auth.updateClient,
  unregisterClient: auth.unregisterClient,
  getClient: auth.getClient,
  getAuthCodeURL: auth.getAuthCodeURL,
  getAccessToken: auth.getAccessToken,
  refreshToken: auth.refreshToken
}

const filesProto = {
  create: files.create,
  createDirectory: files.createDirectory,
  updateById: files.updateById,
  updateAttributesById: files.updateAttributesById,
  updateAttributesByPath: files.updateAttributesByPath,
  trashById: files.trashById,
  statById: files.statById,
  statByPath: files.statByPath,
  downloadById: files.downloadById,
  downloadByPath: files.downloadByPath,
  getDownloadLink: files.getDownloadLink,
  getArchiveLink: files.getArchiveLink,
  getFilePath: files.getFilePath,
  listTrash: files.listTrash,
  clearTrash: files.clearTrash,
  restoreById: files.restoreById,
  destroyById: files.destroyById
}

const offlineProto = {
  init: offline.init,
  getDoctypes: offline.getDoctypes,
  // database
  hasDatabase: offline.hasDatabase,
  getDatabase: offline.getDatabase,
  createDatabase: offline.createDatabase,
  destroyDatabase: offline.destroyDatabase,
  destroyAllDatabase: offline.destroyAllDatabase,
  // replication
  hasReplication: offline.hasReplication,
  replicateFromCozy: offline.replicateFromCozy,
  stopReplication: offline.stopReplication,
  stopAllReplication: offline.stopAllReplication,
  // repeated replication
  hasRepeatedReplication: offline.hasRepeatedReplication,
  startRepeatedReplication: offline.startRepeatedReplication,
  stopRepeatedReplication: offline.stopRepeatedReplication,
  stopAllRepeatedReplication: offline.stopAllRepeatedReplication
}

const settingsProto = {
  diskUsage: settings.diskUsage,
  changePassphrase: settings.changePassphrase,
  getInstance: settings.getInstance,
  updateInstance: settings.updateInstance,
  getClients: settings.getClients,
  deleteClientById: settings.deleteClientById
}

class Client {
  constructor (options) {
    this.data = {}
    this.files = {}
    this.offline = {}
    this.settings = {}
    this.auth = {
      Client: ClientV3,
      AccessToken: AccessTokenV3,
      AppToken: AppTokenV3,
      AppTokenV2: AppTokenV2,
      LocalStorage: LocalStorage,
      MemoryStorage: MemoryStorage
    }
    this._inited = false
    if (options) {
      this.init(options)
    }
  }

  init (options = {}) {
    this._inited = true
    this._oauth = false // is oauth activated or not
    this._token = null  // application token
    this._authstate = AuthNone
    this._authcreds = null
    this._storage = null
    this._version = null
    this._offline = null

    const token = options.token
    const oauth = options.oauth
    if (token && oauth) {
      throw new Error('Cannot specify an application token with a oauth activated')
    }

    if (token) {
      this._token = new AppTokenV3({ token })
    } else if (oauth) {
      this._oauth = true
      this._storage = oauth.storage
      this._clientParams = Object.assign({}, defaultClientParams, oauth.clientParams)
      this._onRegistered = oauth.onRegistered || nopOnRegistered
    }

    let url = options.cozyURL || ''
    while (url[url.length - 1] === '/') {
      url = url.slice(0, -1)
    }

    this._url = url

    const disablePromises = !!options.disablePromises
    addToProto(this, this.data, dataProto, disablePromises)
    addToProto(this, this.auth, authProto, disablePromises)
    addToProto(this, this.files, filesProto, disablePromises)
    addToProto(this, this.offline, offlineProto, disablePromises)
    addToProto(this, this.settings, settingsProto, disablePromises)

    if (options.offline) {
      this.offline.init(options.offline)
    }
  }

  authorize () {
    const state = this._authstate
    if (state === AuthOK || state === AuthRunning) {
      return this._authcreds
    }

    this._authstate = AuthRunning
    this._authcreds = this.isV2().then((isV2) => {
      if (isV2 && this._oauth) {
        throw new Error('OAuth is not supported on the V2 stack')
      }
      if (this._oauth) {
        return auth.oauthFlow(
          this,
          this._storage,
          this._clientParams,
          this._onRegistered
        )
      }
      // we expect to be on a client side application running in a browser
      // with cookie-based authentication.
      if (isV2) {
        return getAppTokenV2()
      } else if (this._token) {
        return Promise.resolve({client: null, token: this._token})
      } else {
        throw new Error('Missing application token')
      }
    })

    this._authcreds.then(
      () => { this._authstate = AuthOK },
      () => { this._authstate = AuthError })

    return this._authcreds
  }

  saveCredentials (client, token) {
    const creds = {client, token}
    if (!this._storage || this._authstate === AuthRunning) {
      return Promise.resolve(creds)
    }
    this._storage.save(auth.CredsKey, creds)
    this._authcreds = Promise.resolve(creds)
    return this._authcreds
  }

  fullpath (path) {
    return this.isV2().then((isV2) => {
      const pathprefix = isV2 ? '/ds-api' : ''
      return this._url + pathprefix + path
    })
  }

  isV2 () {
    if (!this._version) {
      this._version = retry(() => fetch(`${this._url}/status/`), 3)()
        .then((res) => {
          if (!res.ok) {
            throw new Error('Could not fetch cozy status')
          } else {
            return res.json()
          }
        })
        .then((status) => status.datasystem !== undefined)
    }
    return this._version
  }
}

function nopOnRegistered () {
  throw new Error('Missing onRegistered callback')
}

function protoify (context, fn) {
  return function prototyped (...args) {
    return fn(context, ...args)
  }
}

function addToProto (ctx, obj, proto, disablePromises) {
  for (const attr in proto) {
    let fn = protoify(ctx, proto[attr])
    if (disablePromises) {
      fn = unpromiser(fn)
    }
    obj[attr] = fn
  }
}

module.exports = new Client()
Object.assign(module.exports, {Client, LocalStorage, MemoryStorage})
