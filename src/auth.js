/* global fetch, btoa */
import {encodeQuery, decodeQuery} from './utils'

const stateSize = 16

export class Client {
  constructor (url, opts) {
    this.url = url || ''

    this.clientID = opts.clientID || opts.client_id || ''
    this.clientSecret = opts.clientSecret || opts.client_secret || ''
    this.registrationAccessToken = opts.registrationAccessToken || opts.registration_access_token || ''

    if (opts.redirect_uris) {
      this.redirectURI = opts.redirect_uris[0] || ''
    } else {
      this.redirectURI = opts.redirectURI || ''
    }

    this.softwareID = opts.softwareID || opts.software_id || ''
    this.softwareVersion = opts.softwareVersion || opts.software_version || ''
    this.clientName = opts.clientName || opts.client_name || ''
    this.clientKind = opts.clientKind || opts.client_kind || ''
    this.clientURI = opts.clientURI || opts.client_uri || ''

    this.logoURI = opts.logoURI || opts.logo_uri || ''
    this.policyURI = opts.policyURI || opts.policy_uri || ''

    if (this.url === '') {
      throw new Error('Missing url attribute')
    }
    if (this.redirectURI === '') {
      throw new Error('Missing redirectURI field')
    }
    if (this.softwareID === '') {
      throw new Error('Missing softwareID field')
    }
    if (this.clientName === '') {
      throw new Error('Missing clientName field')
    }

    while (this.url[this.url.length - 1] === '/') {
      this.url = this.url.slice(0, -1)
    }
  }

  isRegistered () {
    return this.clientID !== ''
  }

  toRegisterJSON () {
    return {
      redirect_uris: [this.redirectURI],
      software_id: this.softwareID,
      software_version: this.softwareVersion,
      client_name: this.clientName,
      client_kind: this.clientKind,
      client_uri: this.clientURI,
      logo_uri: this.logoURI,
      policy_uri: this.policyURI
    }
  }

  toAuthHeader () {
    return 'Bearer ' + this.registrationAccessToken
  }
}

export class Token {
  constructor (opts) {
    this.tokenType = opts.tokenType || opts.token_type
    this.accessToken = opts.accessToken || opts.access_token
    this.refreshToken = opts.refreshToken || opts.refresh_token
    this.scope = opts.scope
  }

  toAuthHeader () {
    return 'Bearer ' + this.accessToken
  }
}

export function registerClient (client) {
  if (!(client instanceof Client)) {
    client = new Client(client.url, client)
  }
  if (client.isRegistered()) {
    return Promise.reject(new Error('Client already registered'))
  }
  return fetch(`${client.url}/auth/register`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(client.toRegisterJSON())
  })
    .then(handleResponse)
    .then((data) => new Client(client.url, data))
}

// getClient will retrive the registered client informations from the server.
export function getClient (client) {
  if (!(client instanceof Client)) {
    client = new Client(client.url, client)
  }
  if (!client.isRegistered()) {
    return Promise.reject(new Error('Client not registered'))
  }
  return fetch(`${client.url}/auth/register/${client.clientID}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': client.toAuthHeader()
    }
  })
    .then(handleResponse)
    .then((data) => new Client(client.url, data))
}

// getAuthCodeURL returns a pair {authURL,state} given a registered client. The
// state should be stored in order to be checked against on the user validation
// phase.
export function getAuthCodeURL (client, scopes = []) {
  if (!(client instanceof Client)) {
    client = new Client(client.url, client)
  }
  if (!client.isRegistered()) {
    throw new Error('Client not registered')
  }
  const state = generateRandomState()
  const query = {
    'client_id': client.clientID,
    'redirect_uri': client.redirectURI,
    'state': state,
    'response_type': 'code',
    'scope': scopes.join(' ')
  }
  return {
    url: `${client.url}/auth/authorize?${encodeQuery(query)}`,
    state: state
  }
}

// getAccessToken perform a request on the access_token entrypoint with the
// authorization_code grant type in order to generate a new token for a newly
// registered client.
//
// This method extracts the access code and state from the given URL. By
// default it uses document.location.href. Also, it checks the given state with
// the one specified in the URL query parameter to prevent CSRF attacks.
export function getAccessToken (client, state, pageURL = '') {
  if (pageURL === '' && typeof document !== 'undefined') {
    pageURL = document.location.href
  }
  const queries = decodeQuery(pageURL)
  if (state !== queries['state']) {
    return Promise.reject(new Error('Given state does not match url query state'))
  }
  return retrieveToken(client, {
    'grant_type': 'authorization_code',
    'code': queries['access_code']
  })
}

// refreshToken perform a request on the access_token entrypoint with the
// refresh_token grant type in order to refresh the given token.
export function refreshToken (client, token) {
  return retrieveToken(client, {
    'grant_type': 'refresh_token',
    'code': token.refreshToken
  })
}

// retrieveToken perform a request on the access_token entrypoint in order to
// fetch a token.
function retrieveToken (client, query) {
  if (!(client instanceof Client)) {
    client = new Client(client.url, client)
  }
  if (!client.isRegistered()) {
    return Promise.reject(new Error('Client not registered'))
  }
  return fetch(`${client.url}/auth/access_token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
    body: encodeQuery(Object.assign({}, query, {
      'client_id': client.clientID,
      'client_secret': client.clientSecret
    }))
  })
    .then(handleResponse)
    .then((data) => new Token(data))
}

// generateRandomState will try to generate a 128bits random value from a secure
// pseudo random generator. It will fallback on Math.random if it cannot find
// such generator.
function generateRandomState () {
  let buffer
  if (typeof window !== 'undefined' &&
      typeof window.crypto !== 'undefined' &&
      typeof window.crypto.getRandomValues === 'function') {
    buffer = new Uint8Array(stateSize)
    window.crypto.getRandomValues(buffer)
  } else if (typeof require === 'function') {
    buffer = require('crypto').randomBytes(stateSize)
  } else {
    buffer = new Array(stateSize)
    for (let i = 0; i < buffer.length; i++) {
      buffer[i] = Math.floor((Math.random() * 255))
    }
  }
  return btoa(String.fromCharCode.apply(null, buffer))
    .replace(/=+$/, '')
    .replace(/\//g, '_')
    .replace(/\+/g, '-')
}

function handleResponse (res) {
  if (!res.ok) {
    return res.text().then(txt => { throw txt })
  }
  return res.json()
}
