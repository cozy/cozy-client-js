/* eslint-env jest */

// eslint-disable-next-line no-unused-vars
import { Client } from '../../src';
import mock from '../mock-api'

describe('settings', function () {
  const cozy = {}

  beforeEach(() => {
    cozy.client = new Client({
      cozyURL: 'http://my.cozy.io///',
      token: 'apptoken'
    })
  })
  afterEach(() => mock.restore())

  describe('Disk usage', function () {
    beforeAll(mock.mockAPI('DiskUsage'))

    it('should work', async function () {
      const usage = await cozy.client.settings.diskUsage()
      expect(usage._id).toBe('io.cozy.settings.disk-usage')
      expect(usage._type).toBe('io.cozy.settings')
      expect(usage.attributes.used).toBe('123')
    })
  })

  describe('Changing the passphrase', function () {
    beforeAll(mock.mockAPI('Passphrase'))

    it('should work', async function () {
      await cozy.client.settings.changePassphrase('current', 'new')
    })
  })

  describe('Get instance', function () {
    beforeAll(mock.mockAPI('GetInstance'))

    it('should work', async function () {
      const instance = await cozy.client.settings.getInstance()
      expect(instance._id).toBe('io.cozy.settings.instance')
      expect(instance._type).toBe('io.cozy.settings')
      expect(instance.attributes.locale).toBe('fr')
      expect(instance.attributes.email).toBe('alice@example.com')
      expect(instance.attributes.public_name).toBe('Alice Martin')
    })
  })

  describe('Update instance', function () {
    beforeAll(mock.mockAPI('GetInstance'))
    beforeAll(mock.mockAPI('UpdateInstance'))

    it('should work', async function () {
      const newLocale = 'en'
      let oldInstance = await cozy.client.settings.getInstance()
      oldInstance.attributes.locale = newLocale
      let instance = await cozy.client.settings.updateInstance(oldInstance)
      expect(instance._id).toBe('io.cozy.settings.instance')
      expect(instance._type).toBe('io.cozy.settings')
      expect(instance.attributes.locale).toBe(newLocale)
      expect(instance._rev).toBe('2')
      expect(instance._rev).not.toBe(oldInstance._rev)
    })
  })

  describe('Get clients', function () {
    beforeAll(mock.mockAPI('GetClients'))

    it('should work', async function () {
      const clients = await cozy.client.settings.getClients()
      expect(clients).toBeInstanceOf(Array)
      expect(clients).toHaveLength(1)

      let client = clients[0]
      expect(client._type).toBe('io.cozy.oauth.clients')
      expect(client.attributes).toMatchObject({
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

  describe('Delete a client by id', function () {
    beforeAll(mock.mockAPI('DeleteClient'))

    it('should work', async function () {
      await cozy.client.settings.deleteClientById('123')
    })
  })
})
