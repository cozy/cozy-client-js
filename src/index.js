import {unpromiser, warn} from './utils'
import {cozyFetchJSON} from './fetch'
import {LocalStorage, MemoryStorage} from './auth_storage'
import {getAccessToken as getAccessTokenV2} from './auth_v2'
import * as auth from './auth_v3'
import * as crud from './crud'
import * as mango from './mango'
import * as files from './files'

const AuthNone = 0
const AuthRunning = 1
const AuthError = 2
const AuthOK = 3

const mainProto = {
  create: crud.create,
  find: crud.find,
  update: crud.update,
  delete: crud._delete,
  updateAttributes: crud.updateAttributes,
  defineIndex: mango.defineIndex,
  query: mango.query,
  destroy: function (...args) {
    warn('destroy is deprecated, use cozy.delete instead.')
    return crud._delete(...args)
  }
}

const authProto = {
  registerClient: auth.registerClient,
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
  downloadByPath: files.downloadByPath
}

class Cozy {
  constructor (options) {
    this.files = {}
    this.auth = {
      Client: auth.Client,
      AccessToken: auth.AccessToken
    }
    const disablePromises = !!(options && options.disablePromises)
    addToProto(this, this, mainProto, disablePromises)
    addToProto(this, this.auth, authProto, disablePromises)
    addToProto(this, this.files, filesProto, disablePromises)
    this.init(options)
  }

  init (options = {}) {
    this._authstate = AuthNone
    this._authcreds = null
    this.isV2 = false
    this.storage = null

    const creds = options.credentials
    if (creds) {
      if (!(creds.client instanceof auth.Client) ||
          !(creds.token instanceof auth.AccessToken)) {
        throw new Error('Bad credentials')
      }
      this._authstate = AuthOK
      this._authcreds = Promise.resolve(creds)
    }

    if (options.credentialsStorage) {
      this.storage = options.credentialsStorage
    } else {
      this.storage = new LocalStorage()
    }

    if (options.isV2) {
      this.isV2 = true
    }

    this._pageURL = options.pageURL || ''
    this._createClient = options.createClient || nopCreateClient
    this._onRegistered = options.onRegistered || nopOnRegistered

    let url = options.url || ''
    while (url[url.length - 1] === '/') {
      url = url.slice(0, -1)
    }

    this.url = url
  }

  authorize () {
    const state = this._authstate

    if (state === AuthOK || state === AuthRunning) {
      return this._authcreds
    }

    this._authstate = AuthRunning
    if (this.isV2) {
      this._authcreds = getAccessTokenV2()
    } else {
      this._authcreds = auth.oauthFlow(
        this,
        this.storage,
        this._pageURL,
        this._createClient,
        this._onRegistered
      )
    }

    this._authcreds.then(
      () => { this._authstate = AuthOK },
      () => { this._authstate = AuthError })

    return this._authcreds
  }

  saveCredentials (client, token) {
    if (this.storage === null || this._authstate === AuthRunning) {
      return this._authcreds
    }
    const data = {client, token}
    this.storage.save(auth.CredsKey, data)
    this._authcreds = Promise.resolve(data)
    return this._authcreds
  }

  fullpath (path) {
    const pathprefix = cozy.isV2 ? '/ds-api' : ''
    return this.url + pathprefix + path
  }

  checkIfV2 () {
    return cozyFetchJSON(cozy, 'GET', '/status/')
      .then((status) => status.datasystem !== undefined)
  }
}

function nopCreateClient () {
  throw new Error('No "createClient" function given')
}

function nopOnRegistered () {}

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

const cozy = new Cozy()

export default cozy
export { Cozy, LocalStorage, MemoryStorage }

if ((typeof window) !== 'undefined') {
  window.cozy = cozy
  window.Cozy = Cozy
}
