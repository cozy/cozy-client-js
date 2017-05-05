/* eslint-env jest */

// eslint-disable-next-line no-unused-vars
import { Client, MemoryStorage } from '../../src';
import {oauthFlow, AccessToken} from '../../src/auth_v3'
import mock from '../mock-api'
import {decodeQuery} from '../../src/utils'

describe('Authentication', function () {
  const cozy = {}

  beforeEach(() => {
    cozy.client = new Client({
      cozyURL: 'http://foobar/',
      token: 'apptoken'
    })
  })
  afterEach(() => mock.restore())

  describe('Client', function () {
    it('should be defined', function () {
      expect(typeof cozy.client.auth.Client).toBe('function')
    })

    it('should create a client', function () {
      const client = new cozy.client.auth.Client({
        redirectURI: 'http://coucou/',
        softwareID: 'id',
        clientName: 'client'
      })

      expect(client).toBeInstanceOf(cozy.client.auth.Client)
      expect(typeof client.redirectURI).toBe('string')
      expect(typeof client.softwareID).toBe('string')
      expect(typeof client.clientName).toBe('string')
    })

    it('should create a client from API data', function () {
      const client = new cozy.client.auth.Client({
        client_id: '123',
        client_secret: '456',
        registration_access_token: '789',
        redirect_uris: ['http://coucou/'],
        software_id: 'id',
        software_version: '1',
        client_name: 'client',
        client_kind: 'desktop',
        client_uri: 'http://foobar',
        logo_uri: '123',
        policy_uri: '123'
      })

      expect(typeof client.clientID).toBe('string')
      expect(typeof client.clientSecret).toBe('string')
      expect(typeof client.registrationAccessToken).toBe('string')
      expect(typeof client.redirectURI).toBe('string')
      expect(typeof client.softwareID).toBe('string')
      expect(typeof client.softwareVersion).toBe('string')
      expect(typeof client.clientName).toBe('string')
      expect(typeof client.clientKind).toBe('string')
      expect(typeof client.clientURI).toBe('string')
      expect(typeof client.logoURI).toBe('string')
      expect(typeof client.policyURI).toBe('string')

      expect(client.clientID).toBe('123')
      expect(client.clientSecret).toBe('456')
      expect(client.registrationAccessToken).toBe('789')
      expect(client.redirectURI).toBe('http://coucou/')
      expect(client.softwareID).toBe('id')
      expect(client.softwareVersion).toBe('1')
      expect(client.clientName).toBe('client')
      expect(client.clientKind).toBe('desktop')
      expect(client.clientURI).toBe('http://foobar')
      expect(client.logoURI).toBe('123')
      expect(client.policyURI).toBe('123')
    })
  })

  describe('registerClient', function () {
    beforeAll(mock.mockAPI('AuthRegisterClient'))

    it('works', async function () {
      const client = await cozy.client.auth.registerClient({
        redirectURI: 'http://coucou/',
        softwareID: 'id',
        clientName: 'client'
      })

      expect(client.clientID).toBe('123')
      expect(client.clientSecret).toBe('456')
      expect(client.registrationAccessToken).toBe('789')
    })
  })

  describe('getClient', function () {
    beforeAll(mock.mockAPI('AuthGetClient'))

    it('works', async function () {
      cozy.client = new Client({
        cozyURL: 'http://foobar/',
        token: 'apptoken'
      })

      const clientID = '123'
      const registrationAccessToken = '789'
      const client = await cozy.client.auth.getClient({ clientID, registrationAccessToken })

      expect(client.clientID).toBe('123')
      expect(client.clientSecret).toBe('456')
      expect(client.registrationAccessToken).toBe('789')
      expect(client.redirectURI).toBe('http://coucou/')
      expect(client.softwareID).toBe('id')
      expect(client.clientName).toBe('client')
    })
  })

  describe('getAuthCodeURL', function () {
    it('works', function () {
      const client = new cozy.client.auth.Client({
        client_id: '123',
        client_secret: '456',
        registration_access_token: '789',
        redirect_uris: ['http://coucou/'],
        software_id: 'id',
        software_version: '1',
        client_name: 'client',
        client_kind: 'desktop',
        client_uri: 'http://foobar',
        logo_uri: '123',
        policy_uri: '123'
      })

      const {url, state} = cozy.client.auth.getAuthCodeURL(client, ['a', 'b'])
      expect(typeof state).toBe('string')
      expect(state.length).not.toBe(0)
      expect(url.indexOf('http://foobar/auth/authorize?')).toBe(0)
      expect(decodeQuery(url)).toEqual({
        client_id: '123',
        redirect_uri: 'http://coucou/',
        state: state,
        response_type: 'code',
        scope: 'a b'
      })
    })
  })

  describe('getAccessToken', function () {
    beforeAll(mock.mockAPI('AccessToken'))

    it('works', async function () {
      const client = new cozy.client.auth.Client({
        client_id: '123',
        client_secret: '456',
        registration_access_token: '789',
        redirect_uris: ['http://coucou/'],
        software_id: 'id',
        software_version: '1',
        client_name: 'client',
        client_kind: 'desktop',
        client_uri: 'http://foobar',
        logo_uri: '123',
        policy_uri: '123'
      })

      const {url, state} = cozy.client.auth.getAuthCodeURL(client, ['a', 'b'])

      const token = await cozy.client.auth.getAccessToken(client, state, url)
      expect(token).toEqual(new cozy.client.auth.AccessToken({
        tokenType: 'Bearer',
        accessToken: '123',
        refreshToken: '456',
        scope: 'a b'
      }))
    })
  })

  describe('refreshToken', function () {
    beforeAll(mock.mockAPI('RefreshToken'))

    it('works', async function () {
      const client = new cozy.client.auth.Client({
        client_id: '123',
        client_secret: '456',
        registration_access_token: '789',
        redirect_uris: ['http://coucou/'],
        software_id: 'id',
        software_version: '1',
        client_name: 'client',
        client_kind: 'desktop',
        client_uri: 'http://foobar',
        logo_uri: '123',
        policy_uri: '123'
      })

      const token1 = new cozy.client.auth.AccessToken({
        tokenType: 'Bearer',
        accessToken: '123',
        refreshToken: '456',
        scope: 'a b'
      })

      const token2 = await cozy.client.auth.refreshToken(client, token1)
      expect(token2).toEqual(new cozy.client.auth.AccessToken({
        tokenType: 'Bearer',
        accessToken: '124',
        refreshToken: '456',
        scope: 'a b'
      }))
    })
  })

  describe('update of client', function () {
    beforeAll(mock.mockAPI('UpdateClient'))

    it('can update client data', async function () {
      const client = new cozy.client.auth.Client({
        client_id: '123',
        client_secret: '456',
        registration_access_token: '789',
        redirect_uris: ['http://coucou/'],
        software_id: 'id',
        software_version: '1',
        client_name: 'client',
        client_kind: 'desktop',
        client_uri: 'http://foobar',
        logo_uri: '123',
        policy_uri: '123'
      })

      client.logoURI = '321'

      let client2 = await cozy.client.auth.updateClient(client)
      expect(client2.clientID).toEqual('123')
      expect(client2.logoURI).toEqual('321')
      expect(client2.registrationAccessToken).toEqual('789')

      let opts = JSON.parse(mock.lastCall('UpdateClient')[1].body)
      expect(opts.client_secret).toBeUndefined()
    })
  })

  describe('update of client (reset token)', function () {
    beforeAll(mock.mockAPI('ResetClientToken'))

    it('can reset client token', async function () {
      const client = new cozy.client.auth.Client({
        client_id: '123',
        client_secret: '456',
        registration_access_token: '789',
        redirect_uris: ['http://coucou/'],
        software_id: 'id',
        software_version: '1',
        client_name: 'client',
        client_kind: 'desktop',
        client_uri: 'http://foobar',
        logo_uri: '123',
        policy_uri: '123'
      })

      let client2 = await cozy.client.auth.updateClient(client, true)
      expect(client2.clientID).toEqual('123')
      expect(client2.registrationAccessToken).toEqual('789')

      let opts = JSON.parse(mock.lastCall('ResetClientToken')[1].body)
      expect(opts.client_secret).toEqual('456')

      expect(client2.clientSecret).toEqual('654')
    })
  })

  describe('unregister client', function () {
    beforeAll(mock.mockAPI('UnregisterClient'))

    it('works', async function () {
      const client = new cozy.client.auth.Client({
        client_id: '123',
        client_secret: '456',
        registration_access_token: '789',
        redirect_uris: ['http://coucou/'],
        software_id: 'id',
        software_version: '1',
        client_name: 'client',
        client_kind: 'desktop',
        client_uri: 'http://foobar',
        logo_uri: '123',
        policy_uri: '123'
      })

      await cozy.client.auth.unregisterClient(client)
    })
  })

  describe('oauth flow', function () {
    beforeEach(() => mock.restore())
    beforeEach(mock.mockAPI('Status'))
    beforeEach(mock.mockAPI('AuthRegisterClient'))
    beforeEach(mock.mockAPI('AuthGetClient'))
    beforeEach(mock.mockAPI('AccessToken'))

    it('registers a new client with an empty storage', function (done) {
      const storage = new MemoryStorage()
      const err = new Error()
      oauthFlow(
        cozy.client, storage,
        {
          redirectURI: 'http://babelu/',
          softwareID: 'id',
          clientName: 'client',
          scopes: ['a', 'b']
        },
        async function (client, url) {
          expect(client.clientID).toBe('123')
          expect(client.clientSecret).toBe('456')
          expect(client.registrationAccessToken).toBe('789')
          expect(client.redirectURI).toBe('http://babelu/')
          expect(url.indexOf('http://foobar/auth/authorize')).toBe(0)
          const queries = decodeQuery(url)
          expect(queries.client_id).toEqual('123')
          expect(queries.redirect_uri).toEqual('http://babelu/')
          expect(queries.response_type).toEqual('code')
          expect(queries.scope).toEqual('a b')
          const creds = await storage.load('state')
          expect(queries.state).toEqual(creds.state)
          expect(typeof creds.url).toBe('string')
          throw err
        })
        .catch((e) => err === e ? done() : done(e))
    })

    it('fails if the stored state is wrong', async function () {
      const storage = new MemoryStorage()
      await storage.save('state', {
        state: '123',
        client: {}
      })
      await storage.save('foo', 'bar')
      let error
      try {
        await oauthFlow(
          cozy.client, storage,
          () => {},
          () => 'http://coucou/?state=123'
        )
      } catch (e) {
        error = e
      }
      if (!error) {
        throw new Error('should have thrown')
      }
    })

    it('should grant access after registration', function (done) {
      const storage = new MemoryStorage()

      function doRegistration () {
        return oauthFlow(
          cozy.client, storage,
          {
            redirectURI: 'http://coucou/',
            softwareID: 'id',
            clientName: 'client',
            scopes: ['a', 'b']
          },
          async function () {
            const data = await storage.load('state')
            return 'http://blabla/?state=' + data.state
          })
          .then(doThen)
      }

      async function doThen () {
        const credentials = await oauthFlow(
          cozy.client, storage,
          () => {},
          () => ''
        )

        expect(credentials.client.clientID).toBe('123')
        expect(credentials.client.clientSecret).toBe('456')
        expect(credentials.client.registrationAccessToken).toBe('789')
        expect(credentials.client.redirectURI).toBe('http://coucou/')
        expect(credentials.client.softwareID).toBe('id')
        expect(credentials.client.clientName).toBe('client')
        expect(credentials.token).toBeInstanceOf(AccessToken)

        const state = await storage.load('state')
        const creds = await storage.load('creds')

        if (state !== undefined) {
          throw new Error('should not have state anymore')
        }

        expect(creds.client).toBeInstanceOf(cozy.client.auth.Client)
        expect(creds.token).toBeInstanceOf(cozy.client.auth.AccessToken)
        done()
      }

      doRegistration()
    })

    it('should reuse stored credentials', function (done) {
      const storage = new MemoryStorage()

      function doRegistration () {
        return oauthFlow(
          cozy.client, storage,
          {
            redirectURI: 'http://coucou/',
            softwareID: 'id',
            clientName: 'client',
            scopes: ['a', 'b']
          },
          async function () {
            const data = await storage.load('state')
            return 'http://blabla/?state=' + data.state
          })
          .then(doThen)
      }

      async function doThen () {
        const creds1 = await oauthFlow(
          cozy.client, storage)

        const creds2 = await oauthFlow(
          cozy.client, storage)

        expect(creds2).toEqual(creds1)
        done()
        return 'http://coucou/?state=123'
      }

      doRegistration()
    })
  })
})
