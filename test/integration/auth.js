/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import should from 'should'
import 'isomorphic-fetch'
import { Client, MemoryStorage } from '../../src'

const COZY_STACK_URL = (process.env && process.env.COZY_STACK_URL) || ''
const COZY_STACK_VERSION = process.env && process.env.COZY_STACK_VERSION

describe('oauth API', async function() {
  let client, oauthClient

  beforeEach(function() {
    if (COZY_STACK_VERSION === '2') {
      this.skip()
    }
  })

  it('Register a client', async function() {
    client = new Client({
      cozyURL: COZY_STACK_URL,
      oauth: {
        storage: new MemoryStorage(),
        clientParams: {
          redirectURI: 'http://localhost:3333/oauth/callback',
          softwareID: 'cozy-client-js',
          clientName: 'integration-test',
          scopes: ['io.cozy.files']
        }
      }
    })
    oauthClient = await client.auth.registerClient()
    oauthClient.clientID.should.not.be.empty()
    oauthClient.clientSecret.should.not.be.empty()
  })

  it('Update the client', async function() {
    oauthClient.clientKind = 'test'
    oauthClient = await client.auth.updateClient(oauthClient)
    oauthClient.clientID.should.not.be.empty()
    oauthClient.clientSecret.should.not.be.empty()
    oauthClient.clientKind.should.equal('test')
  })

  it('Get the client', async function() {
    const infos = await client.auth.getClient(oauthClient)
    infos.clientID.should.not.be.empty()
    infos.clientSecret.should.not.be.empty()
    infos.clientKind.should.equal('test')
  })

  it('Unregister the client', async function() {
    await client.auth.unregisterClient(oauthClient)
    let err
    try {
      await client.auth.getClient(oauthClient)
    } catch (e) {
      err = e
    }
    err.should.not.be.null()
  })
})
