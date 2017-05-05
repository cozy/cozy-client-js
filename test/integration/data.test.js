/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import 'isomorphic-fetch';
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
    beforeAll(mockTokenRetrieve)
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
      expect(created).toHaveProperty('_id')
      expect(created).toHaveProperty('_rev')
      expect(created).toHaveProperty('test', 'value')
      docID = created._id
      docRev = created._rev
    })
  })

  describe('Fetch document', function () {
    it('Works', async function () {
      let fetched = await cozy.client.data.find('io.cozy.testobject', docID)
      expect(fetched).toHaveProperty('_id', docID)
      expect(fetched).toHaveProperty('_rev', docRev)
      expect(fetched).toHaveProperty('test', 'value')
    })
  })

  describe('Update document', function () {
    it('Works', async function () {
      const changes = {
        'test': 'value2'
      }
      const updated = await cozy.client.data.update('io.cozy.testobject', { _id: docID, _rev: docRev }, changes)
      expect(updated).toHaveProperty('_id', docID)
      expect(updated).toHaveProperty('_rev')
      expect(updated).toHaveProperty('test', 'value2')
      docID = updated._id
      docRev = updated._rev
    })
  })

  describe('Delete document', function () {
    it('Works', async function () {
      const deleted = await cozy.client.data.delete('io.cozy.testobject', { _id: docID, _rev: docRev })
      expect(deleted).toHaveProperty('id', docID)
      expect(deleted).toHaveProperty('rev')
    })
  })
})
