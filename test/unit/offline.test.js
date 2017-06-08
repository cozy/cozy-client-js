/* eslint-env jest */

// eslint-disable-next-line no-unused-vars
import { Client } from '../../src'
import PouchDB from 'pouchdb'
import pouchdbFind from 'pouchdb-find'
PouchDB.plugin(require('pouchdb-adapter-memory'))

// PouchDB should not be a mandatory dependency as it is only used in mobile
// environment, so we declare it in global scope here.
global.PouchDB = PouchDB
global.pouchdbFind = pouchdbFind

describe('offline', () => {
  const fileDoctype = 'io.cozy.files'
  const otherDoctype = 'io.cozy.others'
  const cozyUrl = 'http://cozy.tools:8080/'
  let offlineParameter = {doctypes: [fileDoctype, otherDoctype], options: {adapter: 'memory'}}
  const cozy = {}

  describe('Initialise offline', () => {
    it('is disable by default', () => {
      cozy.client = new Client({
        cozyURL: cozyUrl,
        token: 'apptoken'
      })
      const isNotDefined = cozy.client._offline === null
      expect(isNotDefined).toBe(true)
    })

    it('create couchdb database for each doctype', () => {
      cozy.client = new Client({
        cozyURL: cozyUrl,
        offline: offlineParameter,
        token: 'apptoken'
      })
      expect(cozy.client._offline).toBeInstanceOf(Array)
      expect(cozy.client._offline[fileDoctype]).toBeDefined()
      expect(cozy.client._offline[otherDoctype]).toBeDefined()
      expect(cozy.client._offline[fileDoctype].database).toBeInstanceOf(PouchDB)
      expect(cozy.client._offline[otherDoctype].database).toBeInstanceOf(PouchDB)
    })

    it('is possible to enable after cozy init', () => {
      cozy.client = new Client({
        cozyURL: cozyUrl,
        token: 'apptoken'
      })
      cozy.client.offline.createDatabase(fileDoctype, {adapter: 'memory'})
      expect(cozy.client._offline).toBeInstanceOf(Array)
      expect(cozy.client._offline[fileDoctype]).toBeDefined()
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
      expect(db.name).toBe(fileDoctype)
      expect(db).toBeInstanceOf(PouchDB)
    })

    it('should verify database exist', () => {
      expect(cozy.client.offline.hasDatabase(fileDoctype)).toBe(false)
      cozy.client.offline.createDatabase(fileDoctype, {adapter: 'memory'})
      expect(cozy.client.offline.hasDatabase(fileDoctype)).toBe(true)
    })

    it('should get database', async () => {
      expect(cozy.client.offline.getDatabase(fileDoctype)).toBeFalsy()
      await cozy.client.offline.createDatabase(fileDoctype, {adapter: 'memory'})
      let db = cozy.client.offline.getDatabase(fileDoctype)
      expect(db.name).toBe(fileDoctype)
      expect(db).toBeInstanceOf(PouchDB)
    })

    it('should destroy database', async () => {
      await cozy.client.offline.createDatabase(fileDoctype, {adapter: 'memory'})
      expect(cozy.client.offline.hasDatabase(fileDoctype)).toBe(true)
      await cozy.client.offline.destroyDatabase(fileDoctype)
      expect(cozy.client.offline.hasDatabase(fileDoctype)).toBe(false)
    })

    it('should return doctypes', () => {
      // no offline
      expect(cozy.client.offline.getDoctypes()).toEqual([])
      // with one or more doctype offline
      cozy.client.offline.createDatabase(fileDoctype, {adapter: 'memory'})
      expect(cozy.client.offline.getDoctypes()).toEqual([fileDoctype])
      cozy.client.offline.createDatabase(otherDoctype, {adapter: 'memory'})
      expect(cozy.client.offline.getDoctypes()).toEqual([fileDoctype, otherDoctype])
    })

    it('should create mongo index when create database', async () => {
      let db = await cozy.client.offline.createDatabase(fileDoctype, {adapter: 'memory'})
      await db.getIndexes().then(result => {
        expect(result.indexes.length).toBeGreaterThan(0)
      })
    })
  })
})
