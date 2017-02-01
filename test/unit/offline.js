/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import should from 'should'
import {Cozy} from '../../src'
import PouchDB from 'pouchdb'
PouchDB.plugin(require('pouchdb-adapter-memory'))

describe('offline', () => {
  const fileDoctype = 'io.cozy.files'
  const otherDoctype = 'io.cozy.others'
  const cozyUrl = 'http://cozy.local:8080/'
  let offlineParameter = {doctypes: [fileDoctype, otherDoctype], options: {adapter: 'memory'}}
  let cozy

  describe('Initialise offline', () => {
    it('is disable by default', () => {
      cozy = new Cozy({
        cozyURL: cozyUrl,
        token: 'apptoken'
      })
      const isNotDefined = cozy._offline === null
      isNotDefined.should.be.true
    })

    it('create couchdb database for each doctype', () => {
      cozy = new Cozy({
        cozyURL: cozyUrl,
        offline: offlineParameter,
        token: 'apptoken'
      })
      cozy._offline.should.be.an.Array()
      cozy._offline.should.have.property(fileDoctype)
      cozy._offline.should.have.property(otherDoctype)
      cozy._offline[fileDoctype].database.should.be.an.instanceof(PouchDB)
      cozy._offline[otherDoctype].database.should.be.an.instanceof(PouchDB)
    })

    it('is possible to enable after cozy init', () => {
      cozy = new Cozy({
        cozyURL: cozyUrl,
        token: 'apptoken'
      })
      cozy.offline.createDatabase(fileDoctype, {adapter: 'memory'})
      cozy._offline.should.be.an.Array()
      cozy._offline.should.have.property(fileDoctype)
    })
  })

  describe('doctype database', () => {
    beforeEach(() => {
      cozy = new Cozy({
        cozyURL: cozyUrl,
        token: 'apptoken'
      })
    })

    it('should create database', () => {
      let db = cozy.offline.createDatabase(fileDoctype, {adapter: 'memory'})
      db.name.should.be.equal(fileDoctype)
      db.should.be.an.instanceof(PouchDB)
    })

    it('should verify database exist', () => {
      cozy.offline.hasDatabase(fileDoctype).should.be.false
      cozy.offline.createDatabase(fileDoctype, {adapter: 'memory'})
      cozy.offline.hasDatabase(fileDoctype).should.be.true
    })

    it('should get database', () => {
      should.not.exist(cozy.offline.getDatabase(fileDoctype))
      cozy.offline.createDatabase(fileDoctype, {adapter: 'memory'})
      let db = cozy.offline.getDatabase(fileDoctype)
      db.name.should.be.equal(fileDoctype)
      db.should.be.an.instanceof(PouchDB)
    })

    it('should destroy database', () => {
      cozy.offline.createDatabase(fileDoctype, {adapter: 'memory'})
      cozy.offline.hasDatabase(fileDoctype).should.be.true
      cozy.offline.destroyDatabase(fileDoctype)
      cozy.offline.hasDatabase(fileDoctype).should.be.false
    })

    it('should return doctypes', () => {
      // no offline
      cozy.offline.getDoctypes().should.be.eql([])
      // with one or more doctype offline
      cozy.offline.createDatabase(fileDoctype, {adapter: 'memory'})
      cozy.offline.getDoctypes().should.be.eql([fileDoctype])
      cozy.offline.createDatabase(otherDoctype, {adapter: 'memory'})
      cozy.offline.getDoctypes().should.be.eql([fileDoctype, otherDoctype])
    })
  })

  describe('sync database', () => {
    beforeEach(() => {
      cozy = new Cozy({
        cozyURL: cozyUrl,
        offline: offlineParameter,
        token: 'apptoken'
      })
    })

    it('is disable by default', () => {
      cozy.offline.hasSync(fileDoctype).should.be.false
    })

    it('should be enable all on init and stop all sync', () => {
      cozy.offline.hasSync(fileDoctype).should.be.false
      cozy.offline.hasSync(otherDoctype).should.be.false
      let copy = JSON.parse(JSON.stringify(offlineParameter))
      copy.timer = 10
      cozy = new Cozy({
        cozyURL: cozyUrl,
        offline: copy,
        token: 'apptoken'
      })
      cozy.offline.hasSync(fileDoctype).should.be.true
      cozy.offline.hasSync(otherDoctype).should.be.true
      cozy.offline.stopAllSync()
      cozy.offline.hasSync(fileDoctype).should.be.false
      cozy.offline.hasSync(otherDoctype).should.be.false
    })

    it('should be enable after init and stop it', () => {
      cozy.offline.hasSync(fileDoctype).should.be.false
      cozy.offline.startSync(fileDoctype)
      cozy.offline.hasSync(fileDoctype).should.be.true
      cozy.offline.stopSync(fileDoctype)
      cozy.offline.hasSync(fileDoctype).should.be.false
    })
  })
})
