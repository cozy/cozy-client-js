/* eslint-env jest */

// eslint-disable-next-line no-unused-vars
import 'isomorphic-fetch'
import {Client, MemoryStorage} from '../../src'

const COZY_STACK_URL = process.env && process.env.COZY_STACK_URL || ''
const COZY_STACK_VERSION = process.env && process.env.COZY_STACK_VERSION

describe('oauth API', async function () {
  let client, oauthClient

  describe('only v3', () => {
    if (COZY_STACK_VERSION === '2') {
      this.skip()
    }

    it('Register a client', async function () {
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
      expect(oauthClient.clientID).not.toHaveLength(0)
      expect(oauthClient.clientSecret).not.toHaveLength(0)
    })

    it('Update the client', async function () {
      oauthClient.clientKind = 'test'
      oauthClient = await client.auth.updateClient(oauthClient)
      expect(oauthClient.clientID).not.toHaveLength(0)
      expect(oauthClient.clientSecret).not.toHaveLength(0)
      expect(oauthClient.clientKind).toBe('test')
    })

    it('Get the client', async function () {
      const infos = await client.auth.getClient(oauthClient)
      expect(infos.clientID).not.toHaveLength(0)
      expect(infos.clientSecret).not.toHaveLength(0)
      expect(infos.clientKind).toBe('test')
    })

    it('Unregister the client', async function () {
      await client.auth.unregisterClient(oauthClient)
      let err
      try {
        await client.auth.getClient(oauthClient)
      } catch (e) {
        err = e
      }
      expect(err).not.toBeNull()
    })
  })
})
