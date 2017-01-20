/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import should from 'should'
import {Cozy} from '../../src'
import PouchDB from 'pouchdb'
PouchDB.plugin(require('pouchdb-adapter-memory'))

describe('offline', function () {
  const fileDoctype = 'io.cozy.files'
  let cozy

  describe('Initialise offline', function () {
    it('is disable by default', function () {
      cozy = new Cozy({cozyURL: 'http://cozy.local:8080/'})
      cozy._offline_databases.should.be.false
    })

    it('create couchdb database for each doctype', function () {
      cozy = new Cozy({
        cozyURL: 'http://cozy.local:8080/',
        offline: {doctypes: [fileDoctype], options: {adapter: 'memory'}}
      })
      cozy._offline_databases.should.be.an.Array()
      cozy._offline_databases.should.have.property(fileDoctype)
    })

    it('is possible to enable after cozy init', function () {
      cozy = new Cozy({cozyURL: 'http://cozy.local:8080/'})
      cozy._offline_databases.should.be.false
      cozy.offline.addDoctype(fileDoctype, {adapter: 'memory'})
      cozy._offline_databases.should.be.an.Array()
      cozy._offline_databases.should.have.property(fileDoctype)
    })
  })
})
