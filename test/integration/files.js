/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import should from 'should'
import cozy from '../../src'
import fetch from 'isomorphic-fetch'
global.fetch = fetch

const TARGET = process.env && process.env.TARGET || ''

describe('files API', async function () {
  let config

  beforeEach(async function () {
    config = await cozy.init({ target: TARGET })
    if (!config.isV2) {
      this.skip()
    }
  })

  it('creates a file', async function () {
    const filename = 'foo_' + Math.random()

    const created = await cozy.createFile('datastring1', { name: filename })
    created.data.should.have.property('attributes')
  })

  it('updates a file', async function () {
    const filename = 'foo_' + Math.random()

    const created = await cozy.createFile('datastring1', { name: filename })
    created.data.should.have.property('attributes')

    const createdId = created.data.id

    const updated = await cozy.updateFile('datastring2', { fileId: createdId })
    updated.data.should.have.property('attributes')
  })

  it('creates directory', async function () {
    const dirname = 'foo_' + Math.random()

    const created = await cozy.createDirectory({ name: dirname })
    created.data.should.have.property('attributes')
  })

  it('trashes file or directory', async function () {
    const dirname = 'foo_' + Math.random()

    const created = await cozy.createDirectory({ name: dirname })
    const createdId = created.data.id

    await cozy.trash(createdId)
  })
})
