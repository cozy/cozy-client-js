/* global fetch */
import {configure} from './utils'

const V1TOKEN_ABORT_TIMEOUT = 3000

function getV1Token () {
  return new Promise(function (resolve, reject) {
    if (typeof window === 'undefined') {
      reject(new Error('getV1Token should be used in browser'))
    } else if (!window.parent) {
      reject(new Error('getV1Token should be used in iframe'))
    } else if (!window.parent.postMessage) {
      reject(new Error('getV1Token should be used in modern browser'))
    } else {
      const origin = window.location.origin
      const intent = {action: 'getToken'}
      let timeout = null
      const receiver = function (event) {
        window.removeEventListener('message', receiver)
        clearTimeout(timeout)
        resolve({
          appName: event.data.appName,
          token: event.data.token
        })
      }
      window.addEventListener('message', receiver, false)
      window.parent.postMessage(intent, origin)
      timeout = setTimeout(function () {
        reject(new Error('No response from parent iframe after 3s'))
      }, V1TOKEN_ABORT_TIMEOUT)
    }
  })
}

async function getV2Token () {
  return {appName: 'noauth', token: 'irrelevant'}
}

async function isV1 (opts) {
  let response = await fetch((opts.target || '') + '/status/')
  let status = await response.json()
  return status.datasystem !== undefined
}

async function getAuth (opts) {
  opts.isV1 = opts.isV1 || await isV1(opts)
  if (opts.isV1) return await getV1Token(opts)
  return await getV2Token(opts)
}

export default async function (opts) {
  opts = opts || {}
  opts.auth = opts.auth || await getAuth(opts)
  return configure(opts)
}
