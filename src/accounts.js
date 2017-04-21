import {cozyFetchJSON} from './fetch'

export function create (cozy, type, login = '', password = '') {
  return cozyFetchJSON(cozy, 'POST', '/data/io.cozy.accounts', {
    account_type: type,
    status: 'PENDING',
    auth: {
      login: login,
      password: password
    }
  })
}
