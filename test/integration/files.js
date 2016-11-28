/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import should from 'should'
import cozy from '../../src'
import fetch from 'isomorphic-fetch'
global.fetch = fetch

const TARGET = process.env && process.env.TARGET || ''

describe('files API', function () {
  let config

  describe('Config', function () {
    it('When called against a real instance', async function () {
      config = await cozy.init({ target: TARGET })
    })
  })

  describe('Create file', function () {
    it('Works', async function () {
      if (config.isV2) {
        return
      }

      const filename = 'foo_' + Math.random()

      const created = await cozy.createFile('datastring1', { name: filename })
      created.data.should.have.property('attributes')
    })
  })

  describe('Update file', function () {
    it('Works', async function () {
      if (config.isV2) {
        return
      }

      const filename = 'foo_' + Math.random()

      const created = await cozy.createFile('datastring1', { name: filename })
      created.data.should.have.property('attributes')

      const createdId = created.data.id

      const updated = await cozy.updateFile('datastring2', { fileId: createdId })
      updated.data.should.have.property('attributes')
    })
  })

  describe('Create directory', function () {
    it('Works', async function () {
      if (config.isV2) {
        return
      }

      const dirname = 'foo_' + Math.random()

      const created = await cozy.createDirectory({ name: dirname })
      created.data.should.have.property('attributes')
    })
  })

  describe('Trash file or directory', function () {
    it('Works', async function () {
      if (config.isV2) {
        return
      }

      const dirname = 'foo_' + Math.random()

      const created = await cozy.createDirectory({ name: dirname })
      const createdId = created.data.id

      await cozy.trash(createdId)
    })
  })
})
