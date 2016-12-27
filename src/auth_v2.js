/* global btoa */
const V2TOKEN_ABORT_TIMEOUT = 3000

export function getAccessToken () {
  return new Promise(function (resolve, reject) {
    if (typeof window === 'undefined') {
      return reject(new Error('getV2Token should be used in browser'))
    } else if (!window.parent) {
      return reject(new Error('getV2Token should be used in iframe'))
    } else if (!window.parent.postMessage) {
      return reject(new Error('getV2Token should be used in modern browser'))
    }
    const origin = window.location.origin
    const intent = {action: 'getToken'}
    let timeout = null
    const receiver = function (event) {
      let token
      try {
        token = new AccessToken({
          appName: event.data.appName,
          token: event.data.token
        })
      } catch (e) {
        reject(e)
        return
      }
      window.removeEventListener('message', receiver)
      clearTimeout(timeout)
      resolve({ client: null, token })
    }
    window.addEventListener('message', receiver, false)
    window.parent.postMessage(intent, origin)
    timeout = setTimeout(() => {
      reject(new Error('No response from parent iframe after 3s'))
    }, V2TOKEN_ABORT_TIMEOUT)
  })
}

export class AccessToken {
  constructor (opts) {
    this.appName = opts.appName || ''
    this.token = opts.token || ''
    if (this.appName === '') {
      throw new Error('Missing appName parameter')
    }
    if (this.token === '') {
      throw new Error('Missing token parameter')
    }
  }

  toAuthHeader () {
    return 'Basic ' + btoa(`${this.appName}:${this.token}`)
  }
}
