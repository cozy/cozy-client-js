/* global fetch, btoa */

import {waitConfig} from './utils'

const NOREV = 'stack-v1-no-rev'

function doFetch (config, method, path, body) {
  const options = {method: method, headers: {}}
  if (body !== undefined) {
    options.headers['Content-Type'] = 'application/json'
    options.body = JSON.stringify(body)
  }
  if (config.auth) {
    let auth = config.auth.appName + ':' + config.auth.token
    options.headers['Authorization'] = 'Basic ' + btoa(auth)
  }

  let target = config.target || ''
  let pathprefix = config.isV1 ? '/ds-api' : ''
  let fullpath = target + pathprefix + path
  return fetch(fullpath, options).then(res => res.json())
}

export async function create (doctype, attributes) {
  const config = await waitConfig()

  let path = '/data/' + (config.isV1 ? '' : `${doctype}/`)
  let response = await doFetch(config, 'POST', path, attributes)

  if (config.isV1) return await find(doctype, response._id)

  return response.data
}

export async function find (doctype, id) {
  const config = await waitConfig()

  let path = '/data/' + (config.isV1 ? '' : `${doctype}/`) + id
  let response = await doFetch(config, 'GET', path)

  if (config.isV1) Object.assign(response, {_rev: NOREV})

  return response
}

export function updateAttributes (doctype, doc) {
  throw new Error('not implemented')
}

export function destroy (doctype, doc) {
  throw new Error('not implemented')
}
