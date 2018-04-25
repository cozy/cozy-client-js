/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import should from 'should'
import { Client } from '../../src'
import mock from '../mock-api'

describe('settings', function() {
  const cozy = {}

  beforeEach(() => {
    cozy.client = new Client({
      cozyURL: 'http://my.cozy.io///',
      token: 'apptoken'
    })
  })
  afterEach(() => mock.restore())

  describe('Disk usage', function() {
    before(mock.mockAPI('DiskUsage'))

    it('should work', async function() {
      const usage = await cozy.client.settings.diskUsage()
      usage._id.should.equal('io.cozy.settings.disk-usage')
      usage._type.should.equal('io.cozy.settings')
      usage.attributes.used.should.equal('123')
    })
  })

  describe('Changing the passphrase', function() {
    before(mock.mockAPI('Passphrase'))

    it('should work', async function() {
      await cozy.client.settings.changePassphrase('current', 'new')
    })
  })

  describe('Get instance', function() {
    before(mock.mockAPI('GetInstance'))

    it('should work', async function() {
      const instance = await cozy.client.settings.getInstance()
      instance._id.should.equal('io.cozy.settings.instance')
      instance._type.should.equal('io.cozy.settings')
      instance.attributes.locale.should.equal('fr')
      instance.attributes.email.should.equal('alice@example.com')
      instance.attributes.public_name.should.equal('Alice Martin')
    })
  })

  describe('Update instance', function() {
    before(mock.mockAPI('GetInstance'))
    before(mock.mockAPI('UpdateInstance'))

    it('should work', async function() {
      const newLocale = 'en'
      let oldInstance = await cozy.client.settings.getInstance()
      oldInstance.attributes.locale = newLocale
      let instance = await cozy.client.settings.updateInstance(oldInstance)
      instance._id.should.equal('io.cozy.settings.instance')
      instance._type.should.equal('io.cozy.settings')
      instance.attributes.locale.should.equal(newLocale)
      instance._rev.should.equal('2')
      instance._rev.should.not.equal(oldInstance._rev)
    })
  })

  describe('Get clients', function() {
    before(mock.mockAPI('GetClients'))

    it('should work', async function() {
      const clients = await cozy.client.settings.getClients()
      clients.should.be.instanceOf(Array)
      clients.should.have.a.lengthOf(1)

      let client = clients[0]
      client._type.should.equal('io.cozy.oauth.clients')
      client.attributes.should.have.properties({
        redirect_uris: ['http://localhost:4000/oauth/callback'],
        client_name: 'Cozy-Desktop on my-new-laptop',
        client_kind: 'desktop',
        client_uri: 'https://docs.cozy.io/en/mobile/desktop.html',
        logo_uri: 'https://docs.cozy.io/assets/images/cozy-logo-docs.svg',
        policy_uri: 'https://cozy.io/policy',
        software_id: '/github.com/cozy-labs/cozy-desktop',
        software_version: '0.16.0'
      })
    })
  })

  describe('Delete a client by id', function() {
    before(mock.mockAPI('DeleteClient'))

    it('should work', async function() {
      await cozy.client.settings.deleteClientById('123')
    })
  })

  describe('call the synchronisation route', function() {
    before(mock.mockAPI('SyncedClient'))

    it('should work', async function() {
      await cozy.client.settings.updateLastSync()
    })
  })
})
