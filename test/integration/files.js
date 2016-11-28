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

  describe('Upload file', function () {
    it('Works', async function () {
      if (config.isV2) {
        return
      }

      const filename = 'foo_' + Math.random()

      const created = await cozy.upload('datastring1', { name: filename })
      created.data.should.have.property('attributes')

      const createdId = created.data.id

      const updated = await cozy.upload('datastring2', { fileId: createdId, mode: 'update' })
      updated.data.should.have.property('attributes')
    })
  })
})
