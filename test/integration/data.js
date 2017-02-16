/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import should from 'should'
import 'isomorphic-fetch'
import {Cozy} from '../../src'
import mockTokenRetrieve from '../mock-iframe-token'

const COZY_STACK_URL = process.env && process.env.COZY_STACK_URL || ''
const COZY_STACK_VERSION = process.env && process.env.COZY_STACK_VERSION
const COZY_STACK_TOKEN = process.env && process.env.COZY_STACK_TOKEN

describe('data API', function () {
  let docID = null
  let docRev = null
  let cozy

  if (COZY_STACK_VERSION === '2') {
    before(mockTokenRetrieve)
  }

  beforeEach(() => {
    cozy = new Cozy({
      cozyURL: COZY_STACK_URL,
      token: COZY_STACK_TOKEN
    })
  })

  describe('Create document', function () {
    it('Works', async function () {
      const testDoc = {
        'test': 'value'
      }
      const created = await cozy.data.create('io.cozy.testobject', testDoc)
      created.should.have.property('_id')
      created.should.have.property('_rev')
      created.should.have.property('test', 'value')
      docID = created._id
      docRev = created._rev
    })
  })

  describe('Fetch document', function () {
    it('Works', async function () {
      let fetched = await cozy.data.find('io.cozy.testobject', docID)
      fetched.should.have.property('_id', docID)
      fetched.should.have.property('_rev', docRev)
      fetched.should.have.property('test', 'value')
    })
  })

  describe('Update document', function () {
    it('Works', async function () {
      const changes = {
        'test': 'value2'
      }
      const updated = await cozy.data.update('io.cozy.testobject', { _id: docID, _rev: docRev }, changes)
      updated.should.have.property('_id', docID)
      updated.should.have.property('_rev')
      updated.should.have.property('test', 'value2')
      docID = updated._id
      docRev = updated._rev
    })
  })

  describe('Delete document', function () {
    it('Works', async function () {
      const deleted = await cozy.data.delete('io.cozy.testobject', { _id: docID, _rev: docRev })
      deleted.should.have.property('id', docID)
      deleted.should.have.property('rev')
    })
  })
})
