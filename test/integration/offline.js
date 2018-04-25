/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import should from 'should'
import 'isomorphic-fetch'
import { Client } from '../../src'
import PouchDB from 'pouchdb'
import pouchdbFind from 'pouchdb-find'
import { sleep } from '../../src/utils'
PouchDB.plugin(require('pouchdb-adapter-memory'))

// PouchDB should not be a mandatory dependency as it is only used in mobile
// environment, so we declare it in global scope here.
global.PouchDB = PouchDB
global.pouchdbFind = pouchdbFind

const COZY_STACK_URL = (process.env && process.env.COZY_STACK_URL) || ''
const COZY_STACK_VERSION = process.env && process.env.COZY_STACK_VERSION
const COZY_STACK_TOKEN = process.env && process.env.COZY_STACK_TOKEN
const DOCTYPE = 'io.cozy.testobject2'

let docs = [
  { group: 'A', path: '/a/b/c', year: 1984 },
  { group: 'A', path: '/a', year: 1749 },
  { group: 'A', path: '/a/z', year: 2104 },
  { group: 'A', path: '/a/e', year: 1345 },
  { group: 'B', path: '/a/b/d', year: 2104 }
]

describe('offline', function() {
  const cozy = {}

  before(async function() {
    if (COZY_STACK_VERSION === '2') {
      return this.skip()
    }
    cozy.client = new Client({
      cozyURL: COZY_STACK_URL,
      token: COZY_STACK_TOKEN
    })
    docs = await Promise.all(
      docs.map(doc => cozy.client.data.create(DOCTYPE, doc))
    )
  })

  after(async function() {
    if (COZY_STACK_VERSION === '3') {
      await docs.forEach(doc => cozy.client.data.delete(DOCTYPE, doc))
      await cozy.client.offline.destroyAllDatabase()
    }
  })

  it('can replicate database from cozy', async function() {
    await cozy.client.offline.createDatabase(DOCTYPE, { adapter: 'memory' })
    let complete = await cozy.client.offline.replicateFromCozy(DOCTYPE)
    complete.docs_written.should.not.equal(0)
    complete = await cozy.client.offline.replicateFromCozy(DOCTYPE)
    return complete.docs_written.should.equal(0)
  }).timeout(3 * 1000)

  it("can't replicate with live option.", async function() {
    await cozy.client.offline.createDatabase(DOCTYPE, { adapter: 'memory' })
    return cozy.client.offline
      .replicateFromCozy(DOCTYPE, { live: true })
      .should.be.rejectedWith({
        message: "You can't use `live` option with Cozy couchdb."
      })
  })

  it('can replicate created object in local database', async function() {
    // create a database
    const db = await cozy.client.offline.createDatabase(DOCTYPE, {
      adapter: 'memory'
    })
    // create a doc
    const sampleDoc = { data: 'some Data' }
    const remoteDoc = await cozy.client.data.create(DOCTYPE, sampleDoc)
    // check the db to look for the new doc
    await db.get(remoteDoc._id).should.be.rejectedWith({ message: 'missing' })
    // replicate the database
    await cozy.client.offline.replicateFromCozy(DOCTYPE)
    // doc should exist
    await db.get(remoteDoc._id).should.be.fulfilledWith({
      _id: remoteDoc._id,
      _rev: remoteDoc._rev,
      data: remoteDoc.data
    })
    // remove doc
    return cozy.client.data.delete(DOCTYPE, remoteDoc)
  })

  it('can repeated replication and stop repeated replication', async function() {
    // create a database
    const db = await cozy.client.offline.createDatabase(DOCTYPE, {
      adapter: 'memory'
    })
    // create a doc
    const sampleDoc = { data: 'some Data' }
    const remoteDoc = await cozy.client.data.create(DOCTYPE, sampleDoc)
    // check the db to look for the new doc
    db.get(remoteDoc._id).should.be.rejectedWith({ message: 'missing' })
    // activate synchronisation x ms
    cozy.client.offline.hasRepeatedReplication(DOCTYPE).should.be.false
    cozy.client.offline.startRepeatedReplication(DOCTYPE, 0.5)
    // after a certain amount of time, doc should exist
    await sleep(1000)
    cozy.client.offline.hasRepeatedReplication(DOCTYPE).should.be.true
    await cozy.client.offline.stopRepeatedReplication()
    cozy.client.offline.hasRepeatedReplication(DOCTYPE).should.be.false
    // create another doc after sync
    const anotherDoc = { data: 'some other Data' }
    const anotherRemoteDoc = await cozy.client.data.create(DOCTYPE, anotherDoc)
    const promises = []
    promises.push(
      db.get(remoteDoc._id).should.be.fulfilledWith({
        _id: remoteDoc._id,
        _rev: remoteDoc._rev,
        data: remoteDoc.data
      })
    )
    promises.push(
      db
        .get(anotherRemoteDoc._id)
        .should.be.rejectedWith({ message: 'missing', status: 404 })
    )
    // remove docs
    cozy.client.data.delete(DOCTYPE, remoteDoc)
    cozy.client.data.delete(DOCTYPE, anotherRemoteDoc)
    return Promise.all(promises)
  }).timeout(4000)
})
