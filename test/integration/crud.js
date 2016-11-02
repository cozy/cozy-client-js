/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import should from 'should'
import cozy from '../../src'
import fetch from 'isomorphic-fetch'
global.fetch = fetch

describe('crud API', function () {
  let docID = null
  let docRev = null

  describe('Config', function () {
    it('When called against a real instance', async function () {
      await cozy.init({target: 'http://localhost:8080'})
    })
  })

  describe('Create document', function () {
    it('Works', async function () {
      const testDoc = {
        'test': 'value'
      }
      const created = await cozy.create('io.cozy.testobject', testDoc)
      created.should.have.property('_id')
      created.should.have.property('_rev')
      created.should.have.property('test', 'value')
      docID = created._id
      docRev = created._rev
    })
  })

  describe('Fetch document', function () {
    it('Works', async function () {
      let fetched = await cozy.find('io.cozy.testobject', docID)
      fetched.should.have.property('_id', docID)
      fetched.should.have.property('_rev', docRev)
      fetched.should.have.property('test', 'value')
    })
  })
})
