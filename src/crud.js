/* global fetch */

import {promiser, waitConfig} from './utils'

function doFetch (config, method, path, body) {
  const options = {method: method}
  if (body !== undefined) {
    options.headers = {'Content-Type': 'application/json'}
    options.body = JSON.stringify(body)
  }

  let target = config.target || ''
  let fullpath = target + path

  return fetch(fullpath, options).then(res => res.json())
}

function request (method, path, body) {
  return waitConfig().then(conf => doFetch(conf, method, path, body))
}

export function create (doctype, attributes, optCallback) {
  let p = request('POST', `/data/${doctype}/`, attributes)
  .then((response) => response.data)
  return promiser(p, optCallback)
}

export function find (doctype, id, optCallback) {
  let p = request('GET', `/data/${doctype}/${id}`)
  return promiser(p, optCallback)
}

export function updateAttributes (doctype, doc) {
  throw new Error('not implemented')
}

export function destroy (doctype, doc) {
  throw new Error('not implemented')
}
