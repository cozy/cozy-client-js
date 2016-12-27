/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import should from 'should'
import {Cozy} from '../../src'
import mock from '../mock-api'
import {decodeQuery} from '../../src/utils'
import {fakeCredentials} from '../helpers'

describe('Authentication', function () {
  let cozy

  beforeEach(() => {
    cozy = new Cozy({ url: 'http://foobar/' })
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
        url: 'http://foobar/',
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
})
