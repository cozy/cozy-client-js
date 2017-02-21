import {cozyFetchJSON} from './fetch'

export function diskUsage (cozy) {
  return cozyFetchJSON(cozy, 'GET', `/settings/disk-usage`)
}

export function passphrase (cozy, currentPassPhrase, newPassPhrase) {
  return cozyFetchJSON(cozy, 'PUT', `/settings/passphrase`, {
    current_passphrase: currentPassPhrase,
    new_passphrase: newPassPhrase
  })
}

export function getInstance (cozy) {
  return cozyFetchJSON(cozy, 'GET', `/settings/instance`)
}

export function updateInstance (cozy, instance) {
  return cozyFetchJSON(cozy, 'PUT', `/settings/instance`, instance)
}

export function getClients (cozy) {
  return cozyFetchJSON(cozy, 'GET', `/settings/clients`)
}

export function deleteClientById (cozy, id) {
  return cozyFetchJSON(cozy, 'DELETE', `/settings/clients/${id}`)
}
