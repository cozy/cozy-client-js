/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import should from 'should'
import 'isomorphic-fetch'
import {Client} from '../../src'
import mockTokenRetrieve from '../mock-iframe-token'

const COZY_STACK_URL = process.env && process.env.COZY_STACK_URL || ''
const COZY_STACK_VERSION = process.env && process.env.COZY_STACK_VERSION
const COZY_STACK_TOKEN = process.env && process.env.COZY_STACK_TOKEN

describe('data API', function () {
  let docID = null
  let docRev = null
  const cozy = {}

  if (COZY_STACK_VERSION === '2') {
    before(mockTokenRetrieve)
  }

  beforeEach(() => {
    cozy.client = new Client({
      cozyURL: COZY_STACK_URL,
      token: COZY_STACK_TOKEN
    })
  })

  describe('Create document', function () {
    it('Works', async function () {
      const testDoc = {
        'test': 'value'
      }
      const created = await cozy.client.data.create('io.cozy.testobject', testDoc)
      created.should.have.property('_id')
      created.should.have.property('_rev')
      created.should.have.property('test', 'value')
      docID = created._id
      docRev = created._rev
    })
  })

  describe('Fetch document', function () {
    it('Works', async function () {
      let fetched = await cozy.client.data.find('io.cozy.testobject', docID)
      fetched.should.have.property('_id', docID)
      fetched.should.have.property('_rev', docRev)
      fetched.should.have.property('test', 'value')
    })
  })

  describe('Fetch multiple documents', function () {
    const missingID = 'missing'

    beforeEach(function () {
      if (COZY_STACK_VERSION === '2') {
        this.skip()
      }
    })

    it('Works when some of the documents exist', async function () {
      const resultsById = await cozy.client.data.findMany('io.cozy.testobject', [docID, missingID])
      resultsById.should.have.properties([docID, missingID])
      resultsById[docID].should.deepEqual({
        doc: {
          _id: docID,
          _rev: docRev,
          test: 'value'
        }
      })
      resultsById[missingID].should.deepEqual({
        error: 'not_found'
      })
    })

    it('Works when the database does not exist yet', async function () {
      const resultsById = await cozy.client.data.findMany('io.cozy.idonotexist', [missingID])
      resultsById[missingID].error.status.should.equal(404)
    })
  })

  describe('Fetch all documents', function () {
    beforeEach(function () {
      if (COZY_STACK_VERSION === '2') {
        this.skip()
      }
    })

    it('Works correctly', async function () {
      const docs = await cozy.client.data.findAll('io.cozy.testobject')
      should(docs.length).equal(1)
      docs[0].should.deepEqual({
        _id: docID,
        _rev: docRev,
        test: 'value'
      })
    })

    it('Returns an empty array when the database does not exist yet', async function () {
      const docs = await cozy.client.data.findAll('io.cozy.idonotexist')
      should(docs.length).equal(0)
    })
  })

  describe('Update document', function () {
    it('Works', async function () {
      const changes = {
        'test': 'value2'
      }
      const updated = await cozy.client.data.update('io.cozy.testobject', { _id: docID, _rev: docRev }, changes)
      updated.should.have.property('_id', docID)
      updated.should.have.property('_rev')
      updated.should.have.property('test', 'value2')
      docID = updated._id
      docRev = updated._rev
    })
  })

  describe('Delete document', function () {
    it('Works', async function () {
      const deleted = await cozy.client.data.delete('io.cozy.testobject', { _id: docID, _rev: docRev })
      deleted.should.have.property('id', docID)
      deleted.should.have.property('rev')
    })
  })
})
