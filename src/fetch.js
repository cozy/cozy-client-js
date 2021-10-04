/* global fetch */
import { refreshToken, AccessToken } from './auth_v3'
import { retry, encodeQuery } from './utils'
import jsonapi from './jsonapi'

export function cozyFetch(cozy, path, options = {}) {
  return cozy.fullpath(path).then(fullpath => {
    let resp
    if (options.disableAuth) {
      resp = fetch(fullpath, options)
    } else if (options.manualAuthCredentials) {
      resp = cozyFetchWithAuth(
        cozy,
        fullpath,
        options,
        options.manualAuthCredentials
      )
    } else {
      resp = cozy
        .authorize()
        .then(credentials =>
          cozyFetchWithAuth(cozy, fullpath, options, credentials)
        )
    }
    return resp.then(res => handleResponse(res, cozy._invalidTokenErrorHandler))
  })
}

function cozyFetchWithAuth(cozy, fullpath, options, credentials) {
  if (credentials) {
    options.headers = options.headers || {}
    options.headers['Authorization'] = credentials.token.toAuthHeader()
  }

  // the option credentials:include tells fetch to include the cookies in the
  // request even for cross-origin requests
  options.credentials = 'include'

  return Promise.all([cozy.isV2(), fetch(fullpath, options)]).then(
    ([isV2, res]) => {
      if (
        (res.status !== 400 && res.status !== 401) ||
        isV2 ||
        !credentials ||
        options.dontRetry
      ) {
        return res
      }
      // we try to refresh the token only for OAuth, ie, the client defined
      // and the token is an instance of AccessToken.
      const { client, token } = credentials
      if (!client || !(token instanceof AccessToken)) {
        return res
      }
      options.dontRetry = true
      return retry(() => refreshToken(cozy, client, token), 3)()
        .then(newToken => cozy.saveCredentials(client, newToken))
        .then(credentials =>
          cozyFetchWithAuth(cozy, fullpath, options, credentials)
        )
    }
  )
}

export function cozyFetchJSON(cozy, method, path, body, options = {}) {
  const processJSONAPI =
    typeof options.processJSONAPI === 'undefined' || options.processJSONAPI
  return fetchJSON(cozy, method, path, body, options).then(response =>
    handleJSONResponse(response, processJSONAPI)
  )
}

export function cozyFetchRawJSON(cozy, method, path, body, options = {}) {
  return fetchJSON(cozy, method, path, body, options).then(response =>
    handleJSONResponse(response, false)
  )
}

function fetchJSON(cozy, method, path, body, options = {}) {
  options.method = method

  const headers = (options.headers = options.headers || {})

  headers['Accept'] = 'application/json'

  if (method !== 'GET' && method !== 'HEAD' && body !== undefined) {
    if (headers['Content-Type']) {
      options.body = body
    } else {
      headers['Content-Type'] = 'application/json'
      options.body = JSON.stringify(body)
    }
  }

  return cozyFetch(cozy, path, options)
}

function handleResponse(res, invalidTokenErrorHandler) {
  if (res.ok) {
    return res
  }
  let data
  const contentType = res.headers.get('content-type')
  if (contentType && contentType.indexOf('json') >= 0) {
    data = res.json()
  } else {
    data = res.text()
  }
  return data.then(err => {
    const error = new FetchError(res, err)
    if (FetchError.isInvalidToken(error) && invalidTokenErrorHandler) {
      invalidTokenErrorHandler(error)
    }
    throw error
  })
}

function handleJSONResponse(res, processJSONAPI = true) {
  const contentType = res.headers.get('content-type')
  if (!contentType || contentType.indexOf('json') < 0) {
    return res.text(data => {
      throw new FetchError(res, new Error('Response is not JSON: ' + data))
    })
  }

  const json = res.json()
  if (contentType.indexOf('application/vnd.api+json') === 0 && processJSONAPI) {
    return json.then(jsonapi)
  } else {
    return json
  }
}

export function handleInvalidTokenError(error) {
  try {
    const currentOrigin = window.location.origin
    const requestUrl = error.url

    if (
      requestUrl.indexOf(
        currentOrigin.replace(/^(https?:\/\/\w+)-\w+\./, '$1.')
      ) === 0
    ) {
      const redirectURL = `${currentOrigin}?${encodeQuery({ disconnect: 1 })}`
      window.location = redirectURL
    }
  } catch (e) {
    console.warn('Unable to handle invalid token error', e, error)
  }
}

export class FetchError extends Error {
  constructor(res, reason) {
    super()
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
    // XXX We have to hardcode this because babel doesn't play nice when extending Error
    this.name = 'FetchError'
    this.response = res
    this.url = res.url
    this.status = res.status
    this.reason = reason

    Object.defineProperty(this, 'message', {
      value:
        reason.message ||
        (typeof reason === 'string' ? reason : JSON.stringify(reason))
    })
  }
}

FetchError.isUnauthorized = function(err) {
  // XXX We can't use err instanceof FetchError because of the caveats of babel
  return err.name === 'FetchError' && err.status === 401
}

FetchError.isNotFound = function(err) {
  // XXX We can't use err instanceof FetchError because of the caveats of babel
  return err.name === 'FetchError' && err.status === 404
}

FetchError.isInvalidToken = function(err) {
  // XXX We can't use err instanceof FetchError because of the caveats of babel
  return (
    err.name === 'FetchError' &&
    (err.status === 400 || err.status === 401) &&
    err.reason &&
    (err.reason.error === 'Invalid JWT token' ||
      err.reason.error === 'Expired token')
  )
}
