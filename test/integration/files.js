/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import should from 'should'
import cozy from '../../src'
import fetch from 'isomorphic-fetch'
global.fetch = fetch

const TARGET = process.env && process.env.TARGET || ''

describe('files API', function () {
  describe('Config', function () {
    it('When called against a real instance', async function () {
      await cozy.init({ target: TARGET })
    })
  })

  describe('Upload file', function () {
    it('Works', async function () {
      const uploaded = await cozy.upload('datastring', { name: 'foo' })
      uploaded.data.should.have.property('attributes')
    })
  })
})
