/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import should from 'should'
import cozy from '../../src'
import fetch from 'isomorphic-fetch'
import {randomGenerator} from '../helpers'
global.fetch = fetch

const TARGET = process.env && process.env.TARGET || ''

describe('files API', async function () {
  let config
  let random

  before(async function () {
    config = await cozy.init({ target: TARGET })
    random = randomGenerator()
    console.log('random seed = ', random.seed)
  })

  beforeEach(function () {
    if (config.isV2) this.skip()
  })

  it('creates a file', async function () {
    const filename = 'foo_' + random()

    const created = await cozy.files.create('datastring1', {
      name: filename,
      contentType: 'application/json'
    })

    created.should.have.property('attributes')
    created.attributes.md5sum.should.equal('7Zfd8PaeeXsm5WJesf/KJw==')
  })

  it('updates a file', async function () {
    const filename = 'foo_' + random()

    const created = await cozy.files.create('datastring1', { name: filename })
    created.should.have.property('attributes')

    const createdId = created._id

    const updated = await cozy.files.update('datastring2', { fileId: createdId })
    updated.should.have.property('attributes')
    updated.attributes.md5sum.should.equal('iWpp8tcTP/DWTJSLf0hoyQ==')
  })

  it('updates attributes', async function () {
    const filename = 'foo_' + random()

    const created = await cozy.files.create('datastring1', { name: filename })
    created.should.have.property('attributes')

    const createdId = created._id

    const newname1 = 'newname1_' + random()
    const attrs1 = { tags: ['foo', 'bar'], name: newname1 }
    const updated1 = await cozy.files.updateAttributes(attrs1, { id: createdId })
    updated1.should.have.property('attributes')
    updated1.attributes.name.should.startWith('newname1_')
    updated1.attributes.tags.should.eql(['foo', 'bar'])

    const newname2 = 'newname2_' + random()
    const attrs2 = { tags: ['foo'], name: newname2 }
    const updated2 = await cozy.files.updateAttributes(attrs2, { path: '/' + newname1 })
    updated2.should.have.property('attributes')
    updated2.attributes.name.should.startWith('newname2_')
    updated2.attributes.tags.should.eql(['foo'])
  })

  it('creates directory', async function () {
    const dirname = 'foo_' + random()

    const created = await cozy.files.createDirectory({ name: dirname })
    created.should.have.property('attributes')
  })

  it('gets directory info by ID', async function () {
    const dirname = 'foo_' + random()

    const created = await cozy.files.createDirectory({ name: dirname })
    let directoryID = created._id

    const stats = await cozy.files.stat(directoryID)
    stats.should.have.property('attributes')
  })

  it('gets directory info by Path', async function () {
    const dirname = 'foo_' + random()

    const created = await cozy.files.createDirectory({ name: dirname })

    const stats = await cozy.files.stat('/' + dirname)
    stats.should.have.property('attributes')
    stats.should.have.property('_id', created._id)
  })

  it('trashes file or directory', async function () {
    const dirname = 'foo_' + random()

    const created = await cozy.files.createDirectory({ name: dirname })
    const createdId = created._id

    await cozy.files.trash(createdId)
  })
})
