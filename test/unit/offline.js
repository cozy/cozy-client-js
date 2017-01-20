/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import should from 'should'
import {Cozy} from '../../src'
import PouchDB from 'pouchdb'
PouchDB.plugin(require('pouchdb-adapter-memory'))

describe('offline', function () {
  const fileDoctype = 'io.cozy.files'
  const otherDoctype = 'io.cozy.others'
  let cozy

  describe('Initialise offline', function () {
    it('is disable by default', function () {
      cozy = new Cozy({cozyURL: 'http://cozy.local:8080/'})
      cozy._offline_databases.should.be.false
    })

    it('create couchdb database for each doctype', function () {
      cozy = new Cozy({
        cozyURL: 'http://cozy.local:8080/',
        offline: {doctypes: [fileDoctype, otherDoctype], options: {adapter: 'memory'}}
      })
      cozy._offline_databases.should.be.an.Array()
      cozy._offline_databases.should.have.property(fileDoctype)
      cozy._offline_databases.should.have.property(otherDoctype)
    })

    it('is possible to enable after cozy init', function () {
      cozy = new Cozy({cozyURL: 'http://cozy.local:8080/'})
      cozy._offline_databases.should.be.false
      cozy.offline.createDatabase(fileDoctype, {adapter: 'memory'})
      cozy._offline_databases.should.be.an.Array()
      cozy._offline_databases.should.have.property(fileDoctype)
    })
  })

  describe('doctype database', function () {
    beforeEach(() => {
      cozy = new Cozy({cozyURL: 'http://cozy.local:8080/'})
    })

    it('should create database', function () {
      let db = cozy.offline.createDatabase(fileDoctype, {adapter: 'memory'})
      db.name.should.be.equal(fileDoctype)
    })

    it('should verify database exist', function () {
      cozy.offline.hasDatabase(fileDoctype).should.be.false
      cozy.offline.createDatabase(fileDoctype, {adapter: 'memory'})
      cozy.offline.hasDatabase(fileDoctype).should.be.true
    })

    it('should get database', function () {
      should.not.exist(cozy.offline.getDatabase(fileDoctype))
      cozy.offline.createDatabase(fileDoctype, {adapter: 'memory'})
      cozy.offline.getDatabase(fileDoctype).name.should.be.equal(fileDoctype)
    })

    it('should destroy database', function () {
      cozy.offline.createDatabase(fileDoctype, {adapter: 'memory'})
      cozy.offline.hasDatabase(fileDoctype).should.be.true
      cozy.offline.destroyDatabase(fileDoctype)
      cozy.offline.hasDatabase(fileDoctype).should.be.false
    })
  })
})
