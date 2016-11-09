/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import should from 'should'
import cozy from '../../src'
import fetch from 'isomorphic-fetch'
global.fetch = fetch

const TARGET = process.env && process.env.TARGET || ''

function mockTokenRetrieve () {
  if (typeof global.window === 'undefined') global.window = {}
  let listener = null
  global.window.addEventListener = (n, l) => { listener = l }
  global.window.removeEventListener = () => null
  global.window.parent = {}
  global.window.parent.postMessage = function (payload, origin) {
    if (payload.action === 'getToken') {
      listener({
        data: {
          appName: process.env.NAME,
          token: process.env.TOKEN
        }
      })
    }
  }
}

describe('crud API', function () {
  let docID = null
  let docRev = null

  describe('Config', function () {
    if (TARGET === 'http://localhost:9104') before(mockTokenRetrieve)
    it('When called against a real instance', async function () {
      await cozy.init({ target: TARGET })
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

  describe('Update document', function () {
    it('Works', async function () {
      const changes = {
        'test': 'value2'
      }
      const updated = await cozy.update('io.cozy.testobject', { _id: docID, _rev: docRev }, changes)
      updated.should.have.property('_id', docID)
      updated.should.have.property('_rev')
      updated.should.have.property('test', 'value2')
      docID = updated._id
      docRev = updated._rev
    })
  })

  describe('Delete document', function () {
    it('Works', async function () {
      const deleted = await cozy.delete('io.cozy.testobject', { _id: docID, _rev: docRev })
      deleted.should.have.property('id', docID)
      deleted.should.have.property('rev')
    })
  })
})
