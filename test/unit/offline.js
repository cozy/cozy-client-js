/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import should from 'should'
import {Client} from '../../src'
import PouchDB from 'pouchdb'
PouchDB.plugin(require('pouchdb-adapter-memory'))

describe('offline', () => {
  const fileDoctype = 'io.cozy.files'
  const otherDoctype = 'io.cozy.others'
  const cozyUrl = 'http://cozy.local:8080/'
  let offlineParameter = {doctypes: [fileDoctype, otherDoctype], options: {adapter: 'memory'}}
  const cozy = {}

  describe('Initialise offline', () => {
    it('is disable by default', () => {
      cozy.client = new Client({
        cozyURL: cozyUrl,
        token: 'apptoken'
      })
      const isNotDefined = cozy.client._offline === null
      isNotDefined.should.be.true
    })

    it('create couchdb database for each doctype', () => {
      cozy.client = new Client({
        cozyURL: cozyUrl,
        offline: offlineParameter,
        token: 'apptoken'
      })
      cozy.client._offline.should.be.an.Array()
      cozy.client._offline.should.have.property(fileDoctype)
      cozy.client._offline.should.have.property(otherDoctype)
      cozy.client._offline[fileDoctype].database.should.be.an.instanceof(PouchDB)
      cozy.client._offline[otherDoctype].database.should.be.an.instanceof(PouchDB)
    })

    it('is possible to enable after cozy init', () => {
      cozy.client = new Client({
        cozyURL: cozyUrl,
        token: 'apptoken'
      })
      cozy.client.offline.createDatabase(fileDoctype, {adapter: 'memory'})
      cozy.client._offline.should.be.an.Array()
      cozy.client._offline.should.have.property(fileDoctype)
    })
  })

  describe('doctype database', () => {
    beforeEach(() => {
      cozy.client = new Client({
        cozyURL: cozyUrl,
        token: 'apptoken'
      })
    })

    it('should create database', async () => {
      let db = await cozy.client.offline.createDatabase(fileDoctype, {adapter: 'memory'})
      db.name.should.be.equal(fileDoctype)
      db.should.be.an.instanceof(PouchDB)
    })

    it('should verify database exist', () => {
      cozy.client.offline.hasDatabase(fileDoctype).should.be.false
      cozy.client.offline.createDatabase(fileDoctype, {adapter: 'memory'})
      cozy.client.offline.hasDatabase(fileDoctype).should.be.true
    })

    it('should get database', async () => {
      should.not.exist(cozy.client.offline.getDatabase(fileDoctype))
      await cozy.client.offline.createDatabase(fileDoctype, {adapter: 'memory'})
      let db = cozy.client.offline.getDatabase(fileDoctype)
      db.name.should.be.equal(fileDoctype)
      db.should.be.an.instanceof(PouchDB)
    })

    it('should destroy database', async () => {
      await cozy.client.offline.createDatabase(fileDoctype, {adapter: 'memory'})
      cozy.client.offline.hasDatabase(fileDoctype).should.be.true
      await cozy.client.offline.destroyDatabase(fileDoctype)
      cozy.client.offline.hasDatabase(fileDoctype).should.be.false
    })

    it('should return doctypes', () => {
      // no offline
      cozy.client.offline.getDoctypes().should.be.eql([])
      // with one or more doctype offline
      cozy.client.offline.createDatabase(fileDoctype, {adapter: 'memory'})
      cozy.client.offline.getDoctypes().should.be.eql([fileDoctype])
      cozy.client.offline.createDatabase(otherDoctype, {adapter: 'memory'})
      cozy.client.offline.getDoctypes().should.be.eql([fileDoctype, otherDoctype])
    })

    it('should create mongo index when create database', async () => {
      let db = await cozy.client.offline.createDatabase(fileDoctype, {adapter: 'memory'})
      await db.getIndexes().then(result => {
        result.indexes.length.should.be.greaterThan(0)
      })
    })
  })
})
