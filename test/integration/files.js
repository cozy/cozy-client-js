/* eslint-env mocha */
/* global fetch */

// eslint-disable-next-line no-unused-vars
import should from 'should'
import 'isomorphic-fetch'
import {Cozy} from '../../src'
import {randomGenerator} from '../helpers'

const COZY_STACK_URL = process.env && process.env.COZY_STACK_URL || ''
const COZY_STACK_VERSION = process.env && process.env.COZY_STACK_VERSION
const COZY_STACK_TOKEN = process.env && process.env.COZY_STACK_TOKEN

describe('files API', async function () {
  let random
  let cozy

  beforeEach(function () {
    if (COZY_STACK_VERSION === '2') {
      this.skip()
    }
    cozy = new Cozy({
      cozyURL: COZY_STACK_URL,
      token: COZY_STACK_TOKEN
    })
    random = randomGenerator()
  })

  it('creates a file', async function () {
    const filename = 'foo_' + random()
    const date = new Date('Wed, 01 Feb 2017 10:24:42 GMT')

    const created = await cozy.files.create('datastring1', {
      name: filename,
      contentType: 'application/json',
      lastModifiedDate: date
    })

    created.should.have.property('attributes')
    created.attributes.md5sum.should.equal('7Zfd8PaeeXsm5WJesf/KJw==')
    new Date(created.attributes.created_at).should.eql(date)
    new Date(created.attributes.updated_at).should.eql(date)
  })

  it('updates a file', async function () {
    const filename = 'foo_' + random()

    const created = await cozy.files.create('datastring1', { name: filename })
    created.should.have.property('attributes')

    const createdId = created._id

    const updated = await cozy.files.updateById(createdId, 'datastring2')
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
    const updated1 = await cozy.files.updateAttributesById(createdId, attrs1)
    updated1.should.have.property('attributes')
    updated1.attributes.name.should.startWith('newname1_')
    updated1.attributes.tags.should.eql(['foo', 'bar'])

    const newname2 = 'newname2_' + random()
    const attrs2 = { tags: ['foo'], name: newname2 }
    const updated2 = await cozy.files.updateAttributesByPath('/' + newname1, attrs2)
    updated2.should.have.property('attributes')
    updated2.attributes.name.should.startWith('newname2_')
    updated2.attributes.tags.should.eql(['foo'])
  })

  it('creates directory', async function () {
    const dirname = 'foo_' + random()
    const date = new Date('Wed, 01 Feb 2017 10:24:42 GMT')

    const created = await cozy.files.createDirectory({ name: dirname, lastModifiedDate: date })
    created.should.have.property('attributes')
    new Date(created.attributes.created_at).should.eql(date)
    new Date(created.attributes.updated_at).should.eql(date)
  })

  it('gets directory info by ID', async function () {
    const dirname = 'foo_' + random()

    const created = await cozy.files.createDirectory({ name: dirname })
    let directoryID = created._id

    const stats = await cozy.files.statById(directoryID)
    stats.should.have.property('attributes')
  })

  it('gets directory info by Path', async function () {
    const dirname = 'foo_' + random()

    const created = await cozy.files.createDirectory({ name: dirname })

    const stats = await cozy.files.statByPath('/' + dirname)
    stats.should.have.property('attributes')
    stats.should.have.property('_id', created._id)
  })

  it('trashes file or directory', async function () {
    const dirname = 'foo_' + random()

    const created = await cozy.files.createDirectory({ name: dirname })
    const createdId = created._id

    await cozy.files.trashById(createdId)
  })

  it('downloads a file by path and id', async function () {
    const filename = 'foo_' + random()

    const created = await cozy.files.create('foo', {
      name: filename,
      contentType: 'application/json'
    })

    const downloaded1 = await cozy.files.downloadById(created._id)
    const txt1 = await downloaded1.text()

    txt1.should.equal('foo')

    const downloaded2 = await cozy.files.downloadByPath('/' + filename)
    const txt2 = await downloaded2.text()

    txt2.should.equal('foo')
  })

  it('destroy all trashed files and directories', async function () {
    await createTrashedDirectory(cozy, 'foo_' + random())
    await createTrashedDirectory(cozy, 'foo_' + random())
    await cozy.files.clearTrash()

    let trashed = await cozy.files.listTrash()
    trashed.should.be.an.Array()
    trashed.should.have.length(0)
  })

  it('list trashed files and directories', async function () {
    await cozy.files.clearTrash()
    const created1 = await createTrashedDirectory(cozy, 'foo_' + random())
    const created2 = await createTrashedDirectory(cozy, 'foo_' + random())
    let trashed = await cozy.files.listTrash()
    trashed.should.be.an.Array()
    trashed.should.have.length(2)
    let found1 = false
    let found2 = false
    trashed.forEach((file) => {
      if (file._id === created1._id) found1 = true
      else if (file._id === created2._id) found2 = true
      else throw new Error('found unexpected file' + file._id)
    })
    found1.should.be.true
    found2.should.be.true
  })

  it('restore a trashed file or directory', async function () {
    await cozy.files.clearTrash()
    const created = await createTrashedDirectory(cozy, 'foo_' + random())
    await cozy.files.restoreById(created._id)
  })

  it('destroy a trashed file or directory', async function () {
    await cozy.files.clearTrash()
    const created = await createTrashedDirectory(cozy, 'foo_' + random())
    await cozy.files.destroyById(created._id)
    let trashed = await cozy.files.listTrash()
    trashed.should.be.an.Array()
    trashed.should.have.length(0)
  })

  it('creates download link for 1 file', async function () {
    const filename = 'foo_' + random()
    const created = await cozy.files.create('foo', {
      name: filename,
      contentType: 'application/json'
    })
    const path = '/' + created.attributes.name
    let link = await cozy.files.getDowloadLink(path)
    let downloaded = await fetch(COZY_STACK_URL + link)
    const txt1 = await downloaded.text()
    txt1.should.equal('foo')
  })

  it('creates download link for archive', async function () {
    const filename = 'foo_' + random()
    const created = await cozy.files.create('foo', {
      name: filename,
      contentType: 'application/json'
    })

    const filename2 = 'bar_' + random()
    const created2 = await cozy.files.create('bar', {
      name: filename2,
      contentType: 'application/json'
    })
    const toDownload = [
      '/' + created.attributes.name,
      '/' + created2.attributes.name
    ]
    let link = await cozy.files.getArchiveLink(toDownload, 'foobar')
    let downloaded = await fetch(COZY_STACK_URL + link)
    downloaded.ok.should.be.true
    downloaded.headers.get('Content-Type').should.equal('application/zip')
    const disp = downloaded.headers.get('Content-Disposition')
    disp.indexOf('foobar').should.not.equal(-1)
  })

  describe('offline', async () => {
    beforeEach(() => {
      cozy = new Cozy({
        cozyURL: COZY_STACK_URL,
        token: COZY_STACK_TOKEN,
        offline: {doctypes: ['io.cozy.files'], options: {adapter: 'memory'}}
      })
    })
    afterEach(() => {
      cozy.offline.destroyDatabase('io.cozy.files')
    })

    it('should be same document offline/online', async () => {
      const folder = await createRandomDirectory(cozy)
      await cozy.offline.replicateFromCozy('io.cozy.files')
      const offline = await cozy.files.statById(folder._id)
      const online = await cozy.files.statById(folder._id, false)
      Object.keys(online).forEach(key => { key === 'links' || offline.should.have.keys(key) })
      Object.keys(offline).forEach(key => { online.should.have.keys(key) })
      Object.keys(online.attributes).forEach(key => { offline.attributes.should.have.keys(key) })
      Object.keys(offline.attributes).forEach(key => { online.attributes.should.have.keys(key) })
    }).timeout(4 * 1000)
  })
})

async function createTrashedDirectory (cozy, dirname) {
  const created = await cozy.files.createDirectory({ name: dirname })
  await cozy.files.trashById(created._id)
  return created
}

async function createRandomDirectory (cozy) {
  const dirname = 'foo_' + randomGenerator()()
  const created = await cozy.files.createDirectory({ name: dirname })
  return created
}
