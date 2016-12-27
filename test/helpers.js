import {AccessToken, Client} from '../src/auth_v3'

export function randomGenerator (seed = Math.random()) {
  let fn = function rand () {
    var x = Math.sin(seed++) * 10000; return x - Math.floor(x)
  }
  fn.seed = seed
  return fn
}

export function fakeCredentials () {
  return {
    client: new Client({
      redirectURI: 'http://coucou/',
      softwareID: 'id',
      clientName: 'client'
    }),
    token: new AccessToken({
      tokenType: 'Bearer',
      accessToken: '123',
      refreshToken: '456',
      scope: 'a b'
    })
  }
}
