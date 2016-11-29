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
    if (config.isV2) {
      this.skip()
    }
  })

  it('creates a file', async function () {
    const filename = 'foo_' + Math.random()

    const created = await cozy.files.create('datastring1', {
      name: filename,
      contentType: 'application/json'
    })

    created.data.should.have.property('attributes')
    created.data.attributes.md5sum.should.equal('7Zfd8PaeeXsm5WJesf/KJw==')
  })

  it('updates a file', async function () {
    const filename = 'foo_' + Math.random()

    const created = await cozy.files.create('datastring1', { name: filename })
    created.data.should.have.property('attributes')

    const createdId = created.data.id

    const updated = await cozy.files.update('datastring2', { fileId: createdId })
    updated.data.should.have.property('attributes')
    updated.data.attributes.md5sum.should.equal('iWpp8tcTP/DWTJSLf0hoyQ==')
  })

  it('updates attributes', async function () {
    const filename = 'foo_' + Math.random()

    const created = await cozy.files.create('datastring1', { name: filename })
    created.data.should.have.property('attributes')

    const createdId = created.data.id

    const newname1 = 'newname1_' + Math.random()
    const attrs1 = { tags: ['foo', 'bar'], name: newname1 }
    const updated1 = await cozy.files.updateAttributes(attrs1, { id: createdId })
    updated1.data.should.have.property('attributes')
    updated1.data.attributes.name.should.startWith('newname1_')
    updated1.data.attributes.tags.should.eql(['foo', 'bar'])

    const newname2 = 'newname2_' + Math.random()
    const attrs2 = { tags: ['foo'], name: newname2 }
    const updated2 = await cozy.files.updateAttributes(attrs2, { path: '/' + newname1 })
    updated2.data.should.have.property('attributes')
    updated2.data.attributes.name.should.startWith('newname2_')
    updated2.data.attributes.tags.should.eql(['foo'])
  })

  it('creates directory', async function () {
    const dirname = 'foo_' + Math.random()

    const created = await cozy.files.createDirectory({ name: dirname })
    created.data.should.have.property('attributes')
  })

  it('trashes file or directory', async function () {
    const dirname = 'foo_' + Math.random()

    const created = await cozy.files.createDirectory({ name: dirname })
    const createdId = created.data.id

    await cozy.files.trash(createdId)
  })
})
