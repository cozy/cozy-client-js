/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import should from 'should'
import 'isomorphic-fetch'
import {Cozy} from '../../src'
import PouchDB from 'pouchdb'
PouchDB.plugin(require('pouchdb-adapter-memory'))

const COZY_STACK_URL = process.env && process.env.COZY_STACK_URL || ''
const COZY_STACK_VERSION = process.env && process.env.COZY_STACK_VERSION
const DOCTYPE = 'io.cozy.testobject2'

let docs = [
  {group: 'A', path: '/a/b/c', year: 1984},
  {group: 'A', path: '/a', year: 1749},
  {group: 'A', path: '/a/z', year: 2104},
  {group: 'A', path: '/a/e', year: 1345},
  {group: 'B', path: '/a/b/d', year: 2104}
]

describe('offline', function () {
  let cozy

  before(async function () {
    if (COZY_STACK_VERSION === '2') {
      return this.skip()
    }
    cozy = new Cozy({
      cozyURL: COZY_STACK_URL
    })
    for (var i = 0, l = docs.length; i < l; i++) {
      docs[i] = await cozy.create(DOCTYPE, docs[i])
    }
  })

  after(async function () {
    if (COZY_STACK_VERSION === '3') {
      for (var i = 0, l = docs.length; i < l; i++) {
        await cozy.delete(DOCTYPE, docs[i])
      }
      cozy.offline.stopAllSync()
    }
  })

  it('can replicate database from cozy', async function () {
    cozy.offline.createDatabase(DOCTYPE, {adapter: 'memory'})
    let complete = await cozy.offline.replicateFromCozy(DOCTYPE)
    complete.docs_written.should.not.equal(0)
    complete = await cozy.offline.replicateFromCozy(DOCTYPE)
    complete.docs_written.should.equal(0)
  })

  it('can\'t replication with live option.', async function () {
    let err = null

    try {
      cozy.offline.createDatabase(DOCTYPE, {adapter: 'memory'})
      await cozy.offline.replicateFromCozy(DOCTYPE, {live: true})
    } catch (e) {
      err = e
    } finally {
      err.should.eql(new Error('You can\'t use `live` option with Cozy couchdb.'))
    }
  })

  it('can auto replicate database', async function () {
    let db = cozy.offline.createDatabase(DOCTYPE, {adapter: 'memory'})
    const lastSeq = await new Promise((resolve) => {
      cozy.offline.replicateFromCozy(DOCTYPE, {}, {complete: (info) => {
        db.changes().on('complete', (info) => {
          resolve(info.last_seq)
        })
      }})
    })

    let count = 0
    db.changes({live: true, include_docs: true, since: lastSeq})
      .on('change', (change) => { count++ })

    const smallDoc = {test: 187}
    cozy.offline.startSync(DOCTYPE, 3)
    await new Promise(resolve => setTimeout(resolve, 1 * 1000))
    let doc = await cozy.create(DOCTYPE, smallDoc)
    const docId = doc._id

    let err = null
    doc = null

    try {
      doc = await db.get(docId)
    } catch (e) {
      err = e
      err.status.should.be.exactly(404)
    } finally {
      (doc === null).should.be.true
    }

    await new Promise(resolve => setTimeout(resolve, 5 * 1000))

    doc = null
    err = null

    try {
      doc = await db.get(docId)
    } catch (e) {
      err = e
    } finally {
      (err === null).should.be.true
      doc.should.be.type('object')
      doc._id.should.equal(docId)
      doc.test.should.equal(smallDoc.test)
    }
    count.should.be.exactly(1)
  }).timeout(7 * 1000)
})
