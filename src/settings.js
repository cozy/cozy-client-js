import {cozyFetchJSON} from './fetch'

export function diskUsage (cozy) {
  return cozyFetchJSON(cozy, 'GET', `/settings/disk-usage`)
}
