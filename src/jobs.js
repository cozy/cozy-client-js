import {cozyFetchJSON} from './fetch'

export function count (cozy, workerType) {
  return cozyFetchJSON(cozy, 'GET', `/jobs/queue/${workerType}`)
    .then(data => data.attributes.count)
}
