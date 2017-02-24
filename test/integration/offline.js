/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import should from 'should'
import 'isomorphic-fetch'
import {Client} from '../../src'
import PouchDB from 'pouchdb'
PouchDB.plugin(require('pouchdb-adapter-memory'))

const COZY_STACK_URL = process.env && process.env.COZY_STACK_URL || ''
const COZY_STACK_VERSION = process.env && process.env.COZY_STACK_VERSION
const COZY_STACK_TOKEN = process.env && process.env.COZY_STACK_TOKEN
const DOCTYPE = 'io.cozy.testobject2'

let docs = [
  {group: 'A', path: '/a/b/c', year: 1984},
  {group: 'A', path: '/a', year: 1749},
  {group: 'A', path: '/a/z', year: 2104},
  {group: 'A', path: '/a/e', year: 1345},
  {group: 'B', path: '/a/b/d', year: 2104}
]

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

describe('offline', function () {
  const cozy = {}

  before(async function () {
    if (COZY_STACK_VERSION === '2') {
      return this.skip()
    }
    cozy.client = new Client({
      cozyURL: COZY_STACK_URL,
      token: COZY_STACK_TOKEN
    })
    docs = await Promise.all(docs.map(doc => cozy.client.data.create(DOCTYPE, doc)))
  })

  after(async function () {
    if (COZY_STACK_VERSION === '3') {
      await docs.forEach(doc => cozy.client.data.delete(DOCTYPE, doc))
      cozy.client.offline.stopAllSync()
    }
  })

  it('can replicate database from cozy', async function () {
    cozy.client.offline.createDatabase(DOCTYPE, {adapter: 'memory'})
    let complete = await cozy.client.offline.replicateFromCozy(DOCTYPE)
    complete.docs_written.should.not.equal(0)
    complete = await cozy.client.offline.replicateFromCozy(DOCTYPE)
    complete.docs_written.should.equal(0)
  }).timeout(3 * 1000)

  it('can\'t replicate with live option.', async function () {
    cozy.client.offline.createDatabase(DOCTYPE, {adapter: 'memory'})
    return cozy.client.offline.replicateFromCozy(DOCTYPE, {live: true}).should.be.rejectedWith({ message: 'You can\'t use `live` option with Cozy couchdb.' })
  })

  it('can\'t replicate without adding the correct doctype.', async function () {
    cozy.client.offline.createDatabase(DOCTYPE, {adapter: 'memory'})
    const wrongDoctype = 'another.doctype'
    return cozy.client.offline.replicateFromCozy(wrongDoctype).should.be.rejectedWith({ message: `You should add this doctype: ${wrongDoctype} to offline.` })
  })

  it('can\'t replicate without creating the database in offline.', async function () {
    const someDoctype = 'some.doctype'
    return cozy.client.offline.replicateFromCozy(someDoctype).should.be.rejectedWith({ message: `You should add this doctype: ${someDoctype} to offline.` })
  })

  it('can replicate created object in local database', async function () {
    // create a database
    const db = cozy.client.offline.createDatabase(DOCTYPE, { adapter: 'memory' })
    // create a doc
    const sampleDoc = { data: 'some Data' }
    const remoteDoc = await cozy.client.data.create(DOCTYPE, sampleDoc)
    // check the db to look for the new doc
    db.get(remoteDoc._id).should.be.rejectedWith({ message: 'missing' })
    // replicate the database
    await cozy.client.offline.replicateFromCozy(DOCTYPE)
    // doc should exist
    return db.get(remoteDoc._id).should.be.fulfilledWith({ _id: remoteDoc._id, _rev: remoteDoc._rev, data: remoteDoc.data })
  })

  it('can sync and stop sync a database', async function () {
    // create a database
    const db = cozy.client.offline.createDatabase(DOCTYPE, { adapter: 'memory' })
    // create a doc
    const sampleDoc = { data: 'some Data' }
    const remoteDoc = await cozy.client.data.create(DOCTYPE, sampleDoc)
    // check the db to look for the new doc
    db.get(remoteDoc._id).should.be.rejectedWith({ message: 'missing' })
    // activate synchronisation x ms
    cozy.client.offline.startSync(DOCTYPE, 0.1)
    // after a certain amount of time, doc should exist
    await sleep(300)
    cozy.client.offline.stopAllSync()
    // create another doc after sync
    const anotherDoc = { data: 'some other Data' }
    const anotherRemoteDoc = await cozy.client.data.create(DOCTYPE, anotherDoc)
    const promises = []
    promises.push(db.get(remoteDoc._id).should.be.fulfilledWith({ _id: remoteDoc._id, _rev: remoteDoc._rev, data: remoteDoc.data }))
    promises.push(db.get(anotherRemoteDoc._id).should.be.rejectedWith({ message: 'missing', status: 404 }))
    return Promise.all(promises)
  })
})
