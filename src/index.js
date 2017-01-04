/* global fetch */
import {unpromiser, retry, warn} from './utils'
import {LocalStorage, MemoryStorage} from './auth_storage'
import {AccessToken as AccessTokenV2, getAccessToken as getAccessTokenV2} from './auth_v2'
import * as auth from './auth_v3'
import * as crud from './crud'
import * as mango from './mango'
import * as files from './files'

const {AccessToken: AccessTokenV3, Client: ClientV3} = auth

const AuthNone = 0
const AuthRunning = 1
const AuthError = 2
const AuthOK = 3

const defaultClientParams = {
  softwareID: 'github.com/cozy/cozy-client-js'
}

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
      Client: ClientV3,
      AccessToken: AccessTokenV3,
      AccessTokenV2: AccessTokenV2,
      LocalStorage: LocalStorage,
      MemoryStorage: MemoryStorage
    }
    this._inited = false
    this.init(options)
  }

  init (options = {}) {
    if (this._inited) {
      throw new Error('Already inited instance')
    }

    this._inited = true
    this._authstate = AuthNone
    this._authcreds = null
    this._version = null

    const creds = options.credentials
    if (creds) {
      const {client, token} = creds
      const isV3Credentials = (
        (client instanceof ClientV3) &&
        (token instanceof AccessTokenV3))

      const isV2Credentials = (
        (token instanceof AccessTokenV2))

      if (!isV2Credentials && !isV3Credentials) {
        throw new Error('Bad credentials')
      }

      this._authstate = AuthOK
      this._authcreds = Promise.resolve(creds)
    }

    const oauth = options.oauth || {}
    this._storage = oauth.storage || null
    this._clientParams = Object.assign({}, defaultClientParams, oauth.clientParams)
    this._onRegistered = oauth.onRegistered || nopOnRegistered

    let url = options.cozyURL || ''
    while (url[url.length - 1] === '/') {
      url = url.slice(0, -1)
    }

    this._url = url

    const disablePromises = !!options.disablePromises
    addToProto(this, this, mainProto, disablePromises)
    addToProto(this, this.auth, authProto, disablePromises)
    addToProto(this, this.files, filesProto, disablePromises)
  }

  authorize () {
    const state = this._authstate
    if (state === AuthOK || state === AuthRunning) {
      return this._authcreds
    }

    this._authstate = AuthRunning
    return this.isV2().then((isV2) => {
      if (isV2) {
        this._authcreds = getAccessTokenV2()
      } else if (this._storage) {
        this._authcreds = auth.oauthFlow(
          this,
          this._storage,
          this._clientParams,
          this._onRegistered
        )
      } else {
        return Promise.reject(new Error('No credentials'))
      }

      this._authcreds.then(
        () => { this._authstate = AuthOK },
        () => { this._authstate = AuthError })

      return this._authcreds
    })
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

const cozy = new Cozy()

export default cozy
export { Cozy, LocalStorage, MemoryStorage }

if ((typeof window) !== 'undefined') {
  window.cozy = cozy
  window.Cozy = Cozy
}
