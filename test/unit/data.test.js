/* eslint-env jest */

// eslint-disable-next-line no-unused-vars
import { Client } from '../../src';
import mock from '../mock-api'

describe('data API', function () {
  const cozy = {}

  beforeEach(() => {
    cozy.client = new Client({
      cozyURL: 'http://my.cozy.io///',
      token: 'apptoken'
    })
  })
  afterEach(() => mock.restore())

  describe('Create document', function () {
    beforeAll(mock.mockAPI('CreateDoc'))

    it('Call the proper route', async function () {
      const testDoc = { 'test': 'value' }
      const created = await cozy.client.data.create('io.cozy.testobject', testDoc)

      expect(mock.calls('CreateDoc')).toHaveLength(1)
      expect(mock.lastUrl('CreateDoc')).toBe('http://my.cozy.io/data/io.cozy.testobject/')
      expect(mock.lastOptions('CreateDoc')).toHaveProperty('body', '{"test":"value"}')

      expect(created).toHaveProperty('_id')
      expect(created).toHaveProperty('_rev')
      expect(created).toHaveProperty('test', 'value')
    })
  })

  describe('Fetch document', function () {
    beforeAll(mock.mockAPI('GetDoc'))

    it('Call the proper route', async function () {
      let fetched = await cozy.client.data.find('io.cozy.testobject', '42')

      expect(mock.calls('GetDoc')).toHaveLength(1)
      expect(mock.lastUrl('GetDoc')).toBe('http://my.cozy.io/data/io.cozy.testobject/42')
      expect(mock.lastOptions('GetDoc')).not.toHaveProperty('body')

      expect(fetched).toHaveProperty('_id', '42')
      expect(fetched).toHaveProperty('_rev', '1-5444878785445')
      expect(fetched).toHaveProperty('test', 'value')
    })
  })

  describe('Fetch the changes feed', function () {
    beforeAll(mock.mockAPI('ChangesFeed'))

    it('Call the proper route', async function () {
      let fetched = await cozy.client.data.changesFeed('io.cozy.testobject', { since: 0 })

      expect(mock.calls('ChangesFeed')).toHaveLength(1)
      expect(mock.lastUrl('ChangesFeed')).toBe('http://my.cozy.io/data/io.cozy.testobject/_changes?since=0')
      expect(mock.lastOptions('ChangesFeed')).not.toHaveProperty('body')

      expect(fetched).toHaveProperty('last_seq', '42-abcdef')
      expect(fetched).toHaveProperty('pending', 0)
      expect(fetched).toHaveProperty('results')
    })
  })

  describe('Update document', function () {
    beforeEach(mock.mockAPI('UpdateDoc'))

    it('Call the proper route', async function () {
      const changes = { 'test': 'value2' }
      const updated = await cozy.client.data.update('io.cozy.testobject', { _id: '42', _rev: '1-5444878785445' }, changes)

      expect(mock.calls('UpdateDoc')).toHaveLength(1)
      expect(mock.lastUrl('UpdateDoc')).toBe('http://my.cozy.io/data/io.cozy.testobject/42')
      expect(mock.lastOptions('UpdateDoc')).toHaveProperty('body', '{"_id":"42","_rev":"1-5444878785445","test":"value2"}')

      expect(updated).toHaveProperty('_id', '42')
      expect(updated).toHaveProperty('_rev', '2-5444878785445')
      expect(updated).toHaveProperty('test', 'value2')
    })

    it('Fails when doc is missing _id or _rev field', async function () {
      let err = null

      const changes = { 'test': 'value2' }

      try {
        await cozy.client.data.update('io.cozy.testobject', { _rev: '1-5444878785445' }, changes)
      } catch (e) {
        err = e
      } finally {
        expect(err).toEqual(new Error('Missing _id field in passed document'))
      }

      err = null

      try {
        await cozy.client.data.update('io.cozy.testobject', { _id: '42' }, changes)
      } catch (e) {
        err = e
      } finally {
        expect(err).toEqual(new Error('Missing _rev field in passed document'))
      }
    })
  })

  describe('Delete document', function () {
    beforeAll(mock.mockAPI('DeleteDoc'))

    it('Call the proper route', async function () {
      const deleted = await cozy.client.data.delete('io.cozy.testobject', { _id: '42', _rev: '1-5444878785445' })

      expect(mock.calls('DeleteDoc')).toHaveLength(1)
      expect(mock.lastUrl('DeleteDoc')).toBe('http://my.cozy.io/data/io.cozy.testobject/42?rev=1-5444878785445')
      expect(mock.lastOptions('DeleteDoc')).not.toHaveProperty('body')

      expect(deleted).toHaveProperty('id', '42')
      expect(deleted).toHaveProperty('rev', '1-5444878785445')
    })
  })
})
