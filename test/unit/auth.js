/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import should from 'should'
import {Cozy, MemoryStorage} from '../../src'
import {oauthFlow, AccessToken} from '../../src/auth_v3'
import mock from '../mock-api'
import {decodeQuery} from '../../src/utils'
import {fakeCredentials} from '../helpers'

describe('Authentication', function () {
  let cozy

  beforeEach(() => {
    cozy = new Cozy({ cozyURL: 'http://foobar/' })
  })

  describe('Client', function () {
    it('should be defined', function () {
      cozy.auth.Client.should.be.type('function')
    })

    it('should create a client', function () {
      const client = new cozy.auth.Client({
        redirectURI: 'http://coucou/',
        softwareID: 'id',
        clientName: 'client'
      })

      client.should.be.instanceOf(cozy.auth.Client)
      client.redirectURI.should.be.type('string')
      client.softwareID.should.be.type('string')
      client.clientName.should.be.type('string')
    })

    it('should create a client from API data', function () {
      const client = new cozy.auth.Client({
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

      client.clientID.should.be.type('string')
      client.clientSecret.should.be.type('string')
      client.registrationAccessToken.should.be.type('string')
      client.redirectURI.should.be.type('string')
      client.softwareID.should.be.type('string')
      client.softwareVersion.should.be.type('string')
      client.clientName.should.be.type('string')
      client.clientKind.should.be.type('string')
      client.clientURI.should.be.type('string')
      client.logoURI.should.be.type('string')
      client.policyURI.should.be.type('string')

      client.clientID.should.equal('123')
      client.clientSecret.should.equal('456')
      client.registrationAccessToken.should.equal('789')
      client.redirectURI.should.equal('http://coucou/')
      client.softwareID.should.equal('id')
      client.softwareVersion.should.equal('1')
      client.clientName.should.equal('client')
      client.clientKind.should.equal('desktop')
      client.clientURI.should.equal('http://foobar')
      client.logoURI.should.equal('123')
      client.policyURI.should.equal('123')
    })
  })

  describe('registerClient', function () {
    before(mock.mockAPI('AuthRegisterClient'))

    it('works', async function () {
      const client = await cozy.auth.registerClient({
        redirectURI: 'http://coucou/',
        softwareID: 'id',
        clientName: 'client'
      })

      client.clientID.should.equal('123')
      client.clientSecret.should.equal('456')
      client.registrationAccessToken.should.equal('789')
    })
  })

  describe('getClient', function () {
    before(mock.mockAPI('AuthGetClient'))

    it('works', async function () {
      cozy = new Cozy({
        cozyURL: 'http://foobar/',
        credentials: fakeCredentials()
      })

      const client = await cozy.auth.getClient({
        clientID: '123',
        clientSecret: 'blabla',
        redirectURI: 'http://coucou/',
        softwareID: 'id',
        clientName: 'client'
      })

      client.clientID.should.equal('123')
      client.clientSecret.should.equal('456')
      client.registrationAccessToken.should.equal('789')
      client.redirectURI.should.equal('http://coucou/')
      client.softwareID.should.equal('id')
      client.clientName.should.equal('client')
    })
  })

  describe('getAuthCodeURL', function () {
    it('works', function () {
      const client = new cozy.auth.Client({
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

      const {url, state} = cozy.auth.getAuthCodeURL(client, ['a', 'b'])
      state.should.be.type('string')
      state.length.should.not.equal(0)
      url.indexOf('http://foobar/auth/authorize?').should.equal(0)
      decodeQuery(url).should.eql({
        client_id: '123',
        redirect_uri: 'http://coucou/',
        state: state,
        response_type: 'code',
        scope: 'a b'
      })
    })
  })

  describe('getAccessToken', function () {
    before(mock.mockAPI('AccessToken'))

    it('works', async function () {
      const client = new cozy.auth.Client({
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

      const {url, state} = cozy.auth.getAuthCodeURL(client, ['a', 'b'])

      const token = await cozy.auth.getAccessToken(client, state, url)
      token.should.eql(new cozy.auth.AccessToken({
        tokenType: 'Bearer',
        accessToken: '123',
        refreshToken: '456',
        scope: 'a b'
      }))
    })
  })

  describe('refreshToken', function () {
    before(mock.mockAPI('AccessToken'))

    it('works', async function () {
      const client = new cozy.auth.Client({
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

      const token1 = new cozy.auth.AccessToken({
        tokenType: 'Bearer',
        accessToken: '123',
        refreshToken: '456',
        scope: 'a b'
      })

      const token2 = await cozy.auth.refreshToken(client, token1)
      token2.should.eql(new cozy.auth.AccessToken({
        tokenType: 'Bearer',
        accessToken: '123',
        refreshToken: '456',
        scope: 'a b'
      }))
    })
  })

  describe('oauth flow', function () {
    it('registers a new client with an empty storage', function (done) {
      const storage = new MemoryStorage()
      const err = new Error()
      oauthFlow(
        cozy, storage,
        () => ({
          client: {
            redirectURI: 'http://babelu/',
            softwareID: 'id',
            clientName: 'client'
          },
          scopes: ['a', 'b']
        }),
        async function (client, url) {
          client.clientID.should.equal('123')
          client.clientSecret.should.equal('456')
          client.registrationAccessToken.should.equal('789')
          client.redirectURI.should.equal('http://babelu/')
          url.indexOf('http://foobar/auth/authorize').should.equal(0)
          const queries = decodeQuery(url)
          queries.client_id.should.eql('123')
          queries.redirect_uri.should.eql('http://babelu/')
          queries.response_type.should.eql('code')
          queries.scope.should.eql('a b')
          const creds = await storage.load('state')
          queries.state.should.eql(creds.state)
          creds.url.should.be.type('string')
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
          cozy, storage,
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
          cozy, storage,
          () => ({
            client: {
              redirectURI: 'http://coucou/',
              softwareID: 'id',
              clientName: 'client'
            },
            scopes: ['a', 'b']
          }),
          async function () {
            const data = await storage.load('state')
            return 'http://blabla/?state=' + data.state
          })
          .then(doThen)
      }

      async function doThen () {
        const credentials = await oauthFlow(
          cozy, storage,
          () => {},
          () => ''
        )

        credentials.client.clientID.should.equal('123')
        credentials.client.clientSecret.should.equal('456')
        credentials.client.registrationAccessToken.should.equal('789')
        credentials.client.redirectURI.should.equal('http://coucou/')
        credentials.client.softwareID.should.equal('id')
        credentials.client.clientName.should.equal('client')
        credentials.token.should.be.instanceOf(AccessToken)

        const state = await storage.load('state')
        const creds = await storage.load('creds')

        if (state !== undefined) {
          throw new Error('should not have state anymore')
        }

        creds.client.should.be.instanceOf(cozy.auth.Client)
        creds.token.should.be.instanceOf(cozy.auth.AccessToken)
        done()
      }

      doRegistration()
    })

    it('should reuse stored credentials', function (done) {
      const storage = new MemoryStorage()

      function doRegistration () {
        return oauthFlow(
          cozy, storage,
          () => ({
            client: {
              redirectURI: 'http://coucou/',
              softwareID: 'id',
              clientName: 'client'
            },
            scopes: ['a', 'b']
          }),
          async function () {
            const data = await storage.load('state')
            return 'http://blabla/?state=' + data.state
          })
          .then(doThen)
      }

      async function doThen () {
        const creds1 = await oauthFlow(
          cozy, storage)

        const creds2 = await oauthFlow(
          cozy, storage)

        creds2.should.eql(creds1)
        done()
        return 'http://coucou/?state=123'
      }

      doRegistration()
    })
  })
})
