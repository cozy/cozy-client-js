/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import should from 'should'
import {Cozy} from '../../src'
import mock from '../mock-api'

describe('data API', function () {
  let cozy

  beforeEach(() => {
    cozy = new Cozy({
      cozyURL: 'http://my.cozy.io///',
      token: 'apptoken'
    })
  })
  afterEach(() => mock.restore())

  describe('Create document', function () {
    before(mock.mockAPI('CreateDoc'))

    it('Call the proper route', async function () {
      const testDoc = { 'test': 'value' }
      const created = await cozy.data.create('io.cozy.testobject', testDoc)

      mock.calls('CreateDoc').should.have.length(1)
      mock.lastUrl('CreateDoc').should.equal('http://my.cozy.io/data/io.cozy.testobject/')
      mock.lastOptions('CreateDoc').should.have.property('body',
        '{"test":"value"}'
      )

      created.should.have.property('_id')
      created.should.have.property('_rev')
      created.should.have.property('test', 'value')
    })
  })

  describe('Fetch document', function () {
    before(mock.mockAPI('GetDoc'))

    it('Call the proper route', async function () {
      let fetched = await cozy.data.find('io.cozy.testobject', '42')

      mock.calls('GetDoc').should.have.length(1)
      mock.lastUrl('GetDoc').should.equal('http://my.cozy.io/data/io.cozy.testobject/42')
      mock.lastOptions('GetDoc').should.not.have.property('body')

      fetched.should.have.property('_id', '42')
      fetched.should.have.property('_rev', '1-5444878785445')
      fetched.should.have.property('test', 'value')
    })
  })

  describe('Update document', function () {
    beforeEach(mock.mockAPI('UpdateDoc'))

    it('Call the proper route', async function () {
      const changes = { 'test': 'value2' }
      const updated = await cozy.data.update('io.cozy.testobject', { _id: '42', _rev: '1-5444878785445' }, changes)

      mock.calls('UpdateDoc').should.have.length(1)
      mock.lastUrl('UpdateDoc').should.equal('http://my.cozy.io/data/io.cozy.testobject/42')
      mock.lastOptions('UpdateDoc').should.have.property('body',
        '{"_id":"42","_rev":"1-5444878785445","test":"value2"}'
      )

      updated.should.have.property('_id', '42')
      updated.should.have.property('_rev', '2-5444878785445')
      updated.should.have.property('test', 'value2')
    })

    it('Fails when doc is missing _id or _rev field', async function () {
      let err = null

      const changes = { 'test': 'value2' }

      try {
        await cozy.data.update('io.cozy.testobject', { _rev: '1-5444878785445' }, changes)
      } catch (e) {
        err = e
      } finally {
        err.should.eql(new Error('Missing _id field in passed document'))
      }

      err = null

      try {
        await cozy.data.update('io.cozy.testobject', { _id: '42' }, changes)
      } catch (e) {
        err = e
      } finally {
        err.should.eql(new Error('Missing _rev field in passed document'))
      }
    })
  })

  describe('Delete document', function () {
    before(mock.mockAPI('DeleteDoc'))

    it('Call the proper route', async function () {
      const deleted = await cozy.data.delete('io.cozy.testobject', { _id: '42', _rev: '1-5444878785445' })

      mock.calls('DeleteDoc').should.have.length(1)
      mock.lastUrl('DeleteDoc').should.equal('http://my.cozy.io/data/io.cozy.testobject/42?rev=1-5444878785445')
      mock.lastOptions('DeleteDoc').should.not.have.property('body')

      deleted.should.have.property('id', '42')
      deleted.should.have.property('rev', '1-5444878785445')
    })
  })
})
