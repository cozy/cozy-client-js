/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import should from 'should'
import {Client} from '../../src'
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
    before(mock.mockAPI('CreateDoc'))

    it('Call the proper route', async function () {
      const testDoc = { 'test': 'value' }
      const created = await cozy.client.data.create('io.cozy.testobject', testDoc)

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
      let fetched = await cozy.client.data.find('io.cozy.testobject', '42')

      mock.calls('GetDoc').should.have.length(1)
      mock.lastUrl('GetDoc').should.equal('http://my.cozy.io/data/io.cozy.testobject/42')
      mock.lastOptions('GetDoc').should.not.have.property('body')

      fetched.should.have.property('_id', '42')
      fetched.should.have.property('_rev', '1-5444878785445')
      fetched.should.have.property('test', 'value')
    })
  })

  describe('Fetch multiple documents at once', function () {
    before(mock.mockAPI('GetManyDocs'))

    it('Call the proper route', async function () {
      const resultsById = await cozy.client.data.findMany('io.cozy.testobject', ['42', '43'])

      mock.calls('GetManyDocs').should.have.length(1)
      mock.lastUrl('GetManyDocs').should.equal('http://my.cozy.io/data/io.cozy.testobject/_all_docs?include_docs=true')
      mock.lastOptions('GetManyDocs').should.have.property('body',
        '{"keys":["42","43"]}'
      )

      resultsById.should.have.properties(['42', '43'])
      resultsById['42'].should.deepEqual({
        doc: {
          _id: '42',
          _rev: '1-5444878785445',
          test: 'value'
        }
      })
      resultsById['43'].should.deepEqual({
        error: 'not_found'
      })
    })

    it('Resolves with an empty object when ids array is empty', async function () {
      const resultsById = await cozy.client.data.findMany('io.cozy.testobject', [])
      should(resultsById).deepEqual({})
    })

    it('Fails when ids is not an array', async function () {
      for (const ids of [undefined, null, 'foo', {foo: 'bar'}]) {
        await should(cozy.client.data.findMany('io.cozy.testobject', ids))
          .be.rejectedWith(/ids/)
      }
    })
  })

  describe('Fetch all documents', function () {
    before(mock.mockAPI('GetAllDocs'))

    it('Call the proper route with options', async function () {
      const docs = await cozy.client.data.findAll('io.cozy.testobject')

      mock.calls('GetAllDocs').should.have.length(1)
      mock.lastUrl('GetAllDocs').should.equal('http://my.cozy.io/data/io.cozy.testobject/_all_docs?include_docs=true')
      mock.lastOptions('GetAllDocs').should.have.property('body',
        '{}'
      )

      should(docs.length).equal(2)
      docs[1].should.deepEqual({
        _id: '43',
        _rev: '1-5444878785446',
        test: 'value2'
      })
    })
  })

  describe('Fetch the changes feed', function () {
    before(mock.mockAPI('ChangesFeed'))

    it('Call the proper route', async function () {
      let fetched = await cozy.client.data.changesFeed('io.cozy.testobject', { since: 0 })

      mock.calls('ChangesFeed').should.have.length(1)
      mock.lastUrl('ChangesFeed').should.equal('http://my.cozy.io/data/io.cozy.testobject/_changes?since=0')
      mock.lastOptions('ChangesFeed').should.not.have.property('body')

      fetched.should.have.property('last_seq', '42-abcdef')
      fetched.should.have.property('pending', 0)
      fetched.should.have.property('results')
    })
  })

  describe('Update document', function () {
    beforeEach(mock.mockAPI('UpdateDoc'))

    it('Call the proper route', async function () {
      const changes = { 'test': 'value2' }
      const updated = await cozy.client.data.update('io.cozy.testobject', { _id: '42', _rev: '1-5444878785445' }, changes)

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
        await cozy.client.data.update('io.cozy.testobject', { _rev: '1-5444878785445' }, changes)
      } catch (e) {
        err = e
      } finally {
        err.should.eql(new Error('Missing _id field in passed document'))
      }

      err = null

      try {
        await cozy.client.data.update('io.cozy.testobject', { _id: '42' }, changes)
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
      const deleted = await cozy.client.data.delete('io.cozy.testobject', { _id: '42', _rev: '1-5444878785445' })

      mock.calls('DeleteDoc').should.have.length(1)
      mock.lastUrl('DeleteDoc').should.equal('http://my.cozy.io/data/io.cozy.testobject/42?rev=1-5444878785445')
      mock.lastOptions('DeleteDoc').should.not.have.property('body')

      deleted.should.have.property('id', '42')
      deleted.should.have.property('rev', '1-5444878785445')
    })
  })
})
