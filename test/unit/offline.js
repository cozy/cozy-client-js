/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import should from 'should'
import {Cozy} from '../../src'
import PouchDB from 'pouchdb'
PouchDB.plugin(require('pouchdb-adapter-memory'))

describe('offline', function () {
  const fileDocType = 'io.cozy.files'
  let cozy

  describe('Initialise offline', function () {
    it('is disable by default', function () {
      cozy = new Cozy({cozyURL: 'http://cozy.local:8080/'})
      cozy._offline_databases.should.be.false
    })

    it('create couchdb database for each docType', function () {
      cozy = new Cozy({
        cozyURL: 'http://cozy.local:8080/',
        offline: {docTypes: [fileDocType], options: {adapter: 'memory'}}
      })
      cozy._offline_databases.should.be.an.Array()
      cozy._offline_databases.should.have.property(fileDocType)
    })

    it('is possible to enable after cozy init', function () {
      cozy = new Cozy({cozyURL: 'http://cozy.local:8080/'})
      cozy._offline_databases.should.be.false
      cozy.offline.addDocType(fileDocType, {adapter: 'memory'})
      cozy._offline_databases.should.be.an.Array()
      cozy._offline_databases.should.have.property(fileDocType)
    })
  })
})
