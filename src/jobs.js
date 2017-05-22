import {cozyFetchJSON} from './fetch'

export function count (cozy, workerType) {
  return cozyFetchJSON(cozy, 'GET', `/jobs/queue/${workerType}`)
    .then(data => data.attributes.count)
}

export function create (cozy, workerType, args, options) {
  return cozyFetchJSON(cozy, 'POST', `/jobs/queue/${workerType}`, {
    data: {
      type: 'io.cozy.jobs',
      attributes: {
        arguments: args || {},
        options: options || {}
      }
    }
  })
}
