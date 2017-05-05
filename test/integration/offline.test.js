/* eslint-env jest */
/* global jasmine */

// eslint-disable-next-line no-unused-vars
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

describe('offline', function () {
  const cozy = {}

  beforeAll(async function () {
    if (COZY_STACK_VERSION === '2') {
      return this.skip()
    }
    cozy.client = new Client({
      cozyURL: COZY_STACK_URL,
      token: COZY_STACK_TOKEN
    })
    docs = await Promise.all(docs.map(doc => cozy.client.data.create(DOCTYPE, doc)))
  })

  afterAll(async function () {
    if (COZY_STACK_VERSION === '3') {
      await docs.forEach(doc => cozy.client.data.delete(DOCTYPE, doc))
      await cozy.client.offline.destroyAllDatabase()
    }
  })

  let originalTimeout

  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
  })

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout
  })

  it('can replicate database from cozy', async function () {
    await cozy.client.offline.createDatabase(DOCTYPE, {adapter: 'memory'})
    let complete = await cozy.client.offline.replicateFromCozy(DOCTYPE)
    expect(complete.docs_written).not.toBe(0)
    complete = await cozy.client.offline.replicateFromCozy(DOCTYPE)
    return expect(complete.docs_written).toBe(0)
  })

  it('can\'t replicate with live option.', async function () {
    await cozy.client.offline.createDatabase(DOCTYPE, {adapter: 'memory'})
    return expect(cozy.client.offline.replicateFromCozy(DOCTYPE, {live: true})).rejects.toThrowErrorMatchingSnapshot()
  })

  it('can replicate created object in local database', async function () {
    // create a database
    const db = await cozy.client.offline.createDatabase(DOCTYPE, { adapter: 'memory' })
    // create a doc
    const sampleDoc = { data: 'some Data' }
    const remoteDoc = await cozy.client.data.create(DOCTYPE, sampleDoc)
    // check the db to look for the new doc
    await expect(db.get(remoteDoc._id)).rejects.toThrowErrorMatchingSnapshot()
    // replicate the database
    await cozy.client.offline.replicateFromCozy(DOCTYPE)
    // doc should exist
    await expect(db.get(remoteDoc._id)).resolves.toEqual({ _id: remoteDoc._id, _rev: remoteDoc._rev, data: remoteDoc.data })
    // remove doc
    return cozy.client.data.delete(DOCTYPE, remoteDoc)
  })

  it.skip('can repeated replication and stop repeated replication', async function () {
    // create a database
    const db = await cozy.client.offline.createDatabase(DOCTYPE, { adapter: 'memory' })
    // create a doc
    const sampleDoc = { data: 'some Data' }
    const remoteDoc = await cozy.client.data.create(DOCTYPE, sampleDoc)
    // check the db to look for the new doc
    expect(db.get(remoteDoc._id)).rejects.toThrowErrorMatchingSnapshot()
    // activate synchronisation x ms
    expect(cozy.client.offline.hasRepeatedReplication(DOCTYPE)).toBe(false)
    cozy.client.offline.startRepeatedReplication(DOCTYPE, 0.5)
    // after a certain amount of time, doc should exist
    await sleep(1000)
    expect(cozy.client.offline.hasRepeatedReplication(DOCTYPE)).toBe(true)
    const resp = await cozy.client.offline.stopRepeatedReplication()
    expect(resp).toEqual({ ok: true })
    expect(cozy.client.offline.hasRepeatedReplication(DOCTYPE)).toBe(false)
    // create another doc after sync
    const anotherDoc = { data: 'some other Data' }
    const anotherRemoteDoc = await cozy.client.data.create(DOCTYPE, anotherDoc)
    const promises = []
    promises.push(expect(db.get(remoteDoc._id)).resolves.toEqual({ _id: remoteDoc._id, _rev: remoteDoc._rev, data: remoteDoc.data }))
    promises.push(expect(db.get(anotherRemoteDoc._id)).rejects.toThrowErrorMatchingSnapshot())
    // remove docs
    cozy.client.data.delete(DOCTYPE, remoteDoc)
    cozy.client.data.delete(DOCTYPE, anotherRemoteDoc)
    return Promise.all(promises)
  })
})
