/* eslint-env mocha */
/* global fetch */

// eslint-disable-next-line no-unused-vars
import should from 'should'
import 'isomorphic-fetch'
import { Readable } from 'stream'
import {Client} from '../../src'
import {randomGenerator} from '../helpers'

const COZY_STACK_URL = process.env && process.env.COZY_STACK_URL || ''
const COZY_STACK_VERSION = process.env && process.env.COZY_STACK_VERSION
const COZY_STACK_TOKEN = process.env && process.env.COZY_STACK_TOKEN

describe('files API', async function () {
  let random
  const cozy = {}

  beforeEach(function () {
    if (COZY_STACK_VERSION === '2') {
      this.skip()
    }
    cozy.client = new Client({
      cozyURL: COZY_STACK_URL,
      token: COZY_STACK_TOKEN
    })
    random = randomGenerator()
  })

  it('creates a file', async function () {
    const filename = 'foo_' + random()
    const date = new Date('Wed, 01 Feb 2017 10:24:42 GMT')

    const created = await cozy.client.files.create('datastring1', {
      name: filename,
      contentType: 'application/json',
      lastModifiedDate: date
    })

    created.should.have.property('attributes')
    created.attributes.md5sum.should.equal('7Zfd8PaeeXsm5WJesf/KJw==')
    new Date(created.attributes.created_at).should.eql(date)
    new Date(created.attributes.updated_at).should.eql(date)
  })

  it('creates a file from a stream', async function () {
    const filename = 'foo_' + random()
    const stream = new Readable()

    stream.push('datastring1')
    stream.push(null)

    const created = await cozy.client.files.create(stream, {
      name: filename,
      contentType: 'application/json'
    })

    created.should.have.property('attributes')
    created.attributes.md5sum.should.equal('7Zfd8PaeeXsm5WJesf/KJw==')
  })

  it('updates a file', async function () {
    const filename = 'foo_' + random()

    const created = await cozy.client.files.create('datastring1', { name: filename })
    created.should.have.property('attributes')

    const createdId = created._id

    const updated = await cozy.client.files.updateById(createdId, 'datastring2')
    updated.should.have.property('attributes')
    updated.attributes.md5sum.should.equal('iWpp8tcTP/DWTJSLf0hoyQ==')
  })

  it('updates attributes', async function () {
    const filename = 'foo_' + random()

    const created = await cozy.client.files.create('datastring1', { name: filename })
    created.should.have.property('attributes')

    const createdId = created._id

    const newname1 = 'newname1_' + random()
    const attrs1 = { tags: ['foo', 'bar'], name: newname1 }
    const updated1 = await cozy.client.files.updateAttributesById(createdId, attrs1)
    updated1.should.have.property('attributes')
    updated1.attributes.name.should.startWith('newname1_')
    updated1.attributes.tags.should.eql(['foo', 'bar'])

    const newname2 = 'newname2_' + random()
    const attrs2 = { tags: ['foo'], name: newname2 }
    const updated2 = await cozy.client.files.updateAttributesByPath('/' + newname1, attrs2)
    updated2.should.have.property('attributes')
    updated2.attributes.name.should.startWith('newname2_')
    updated2.attributes.tags.should.eql(['foo'])
  })

  it('creates directory', async function () {
    const dirname = 'foo_' + random()
    const date = new Date('Wed, 01 Feb 2017 10:24:42 GMT')

    const created = await cozy.client.files.createDirectory({ name: dirname, lastModifiedDate: date })
    created.should.have.property('attributes')
    new Date(created.attributes.created_at).should.eql(date)
    new Date(created.attributes.updated_at).should.eql(date)
  })

  it('gets directory info by ID', async function () {
    const dirname = 'foo_' + random()

    const created = await cozy.client.files.createDirectory({ name: dirname })
    let directoryID = created._id

    const stats = await cozy.client.files.statById(directoryID)
    stats.should.have.property('attributes')
  })

  it('gets directory info by Path', async function () {
    const dirname = 'foo_' + random()

    const created = await cozy.client.files.createDirectory({ name: dirname })

    const stats = await cozy.client.files.statByPath('/' + dirname)
    stats.should.have.property('attributes')
    stats.should.have.property('_id', created._id)
  })

  it('trashes file or directory', async function () {
    const dirname = 'foo_' + random()

    const created = await cozy.client.files.createDirectory({ name: dirname })
    const createdId = created._id

    await cozy.client.files.trashById(createdId)
  })

  it('downloads a file by path and id', async function () {
    const filename = 'foo_' + random()

    const created = await cozy.client.files.create('foo', {
      name: filename,
      contentType: 'application/json'
    })

    const downloaded1 = await cozy.client.files.downloadById(created._id)
    const txt1 = await downloaded1.text()

    txt1.should.equal('foo')

    const downloaded2 = await cozy.client.files.downloadByPath('/' + filename)
    const txt2 = await downloaded2.text()

    txt2.should.equal('foo')
  })

  it('destroy all trashed files and directories', async function () {
    await createTrashedDirectory(cozy.client, 'foo_' + random())
    await createTrashedDirectory(cozy.client, 'foo_' + random())
    await cozy.client.files.clearTrash()

    let trashed = await cozy.client.files.listTrash()
    trashed.should.be.an.Array()
    trashed.should.have.length(0)
  })

  it('list trashed files and directories', async function () {
    await cozy.client.files.clearTrash()
    const created1 = await createTrashedDirectory(cozy.client, 'foo_' + random())
    const created2 = await createTrashedDirectory(cozy.client, 'foo_' + random())
    let trashed = await cozy.client.files.listTrash()
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
    await cozy.client.files.clearTrash()
    const created = await createTrashedDirectory(cozy.client, 'foo_' + random())
    await cozy.client.files.restoreById(created._id)
  })

  it('destroy a trashed file or directory', async function () {
    await cozy.client.files.clearTrash()
    const created = await createTrashedDirectory(cozy.client, 'foo_' + random())
    await cozy.client.files.destroyById(created._id)
    let trashed = await cozy.client.files.listTrash()
    trashed.should.be.an.Array()
    trashed.should.have.length(0)
  })

  it('does not destroy a trashed file or directory with wrong sum', async function () {
    await cozy.client.files.clearTrash()
    const created = await cozy.client.files.create('datastring2', {
      name: 'foo_' + random(),
      contentType: 'application/json',
      lastModifiedDate: new Date('Wed, 01 Feb 2017 10:24:42 GMT')
    })
    await cozy.client.files.trashById(created._id)
    await cozy.client.files.destroyById(created._id, {ifMatch: 'badbeef'})
      .then(
        () => { throw new Error('should reject') },
        (err) => { err.should.be.an.Error })
    let trashed = await cozy.client.files.listTrash()
    trashed.should.be.an.Array()
    trashed.should.have.length(1)
    await cozy.client.files.clearTrash()
  })

  it('creates download link for 1 file by id and by path', async function () {
    const filename = 'foo_' + random()
    const created = await cozy.client.files.create('foo', {
      name: filename,
      contentType: 'application/json'
    })

    const path = '/' + created.attributes.name
    let link1 = await cozy.client.files.getDownloadLinkByPath(path)
    let downloaded1 = await fetch(COZY_STACK_URL + link1)
    const txt1 = await downloaded1.text()
    txt1.should.equal('foo')

    let link2 = await cozy.client.files.getDownloadLinkById(created._id)
    let downloaded2 = await fetch(COZY_STACK_URL + link2)
    const txt2 = await downloaded2.text()
    txt2.should.equal('foo')
  })

  it('creates download link for archive', async function () {
    const filename = 'foo_' + random()
    const created = await cozy.client.files.create('foo', {
      name: filename,
      contentType: 'application/json'
    })

    const filename2 = 'bar_' + random()
    const created2 = await cozy.client.files.create('bar', {
      name: filename2,
      contentType: 'application/json'
    })
    const toDownload = [
      '/' + created.attributes.name,
      '/' + created2.attributes.name
    ]
    let link = await cozy.client.files.getArchiveLinkByPaths(toDownload, 'foobar')
    let downloaded = await fetch(COZY_STACK_URL + link)
    downloaded.ok.should.be.true
    downloaded.headers.get('Content-Type').should.equal('application/zip')
    const disp = downloaded.headers.get('Content-Disposition')
    disp.indexOf('foobar').should.not.equal(-1)
  })

  describe('offline', async () => {
    beforeEach(() => {
      cozy.client = new Client({
        cozyURL: COZY_STACK_URL,
        token: COZY_STACK_TOKEN,
        offline: {doctypes: ['io.cozy.files'], options: {adapter: 'memory'}}
      })
    })
    afterEach(() => {
      cozy.client.offline.destroyDatabase('io.cozy.files')
    })

    it('and online should have same properties except for *links*', async () => {
      const folder = await createRandomDirectory(cozy.client)
      await cozy.client.offline.replicateFromCozy('io.cozy.files')
      const offline = await cozy.client.files.statById(folder._id)
      const online = await cozy.client.files.statById(folder._id, false)
      delete online.links
      online.should.have.properties(Object.keys(offline))
      offline.should.have.properties(Object.keys(online))
      offline.attributes.should.have.properties(Object.keys(online.attributes))
      online.attributes.should.have.properties(Object.keys(offline.attributes))
    }).timeout(4 * 1000)
  })

  describe('share', () => {
    it('should get `sharecode` and `id` to create a share link', async () => {
      const document = await cozy.client.files.create('foo', {
        name: 'to be shared',
        contentType: 'application/json'
      })
      const collection = await cozy.client.data.create('io.cozy.testreferencer', {
        name: 'foo_' + random()
      })

      await cozy.client.data.addReferencedFiles(collection, document._id)
      const data = await cozy.client.files.getCollectionShareLink(document._id, 'io.cozy.testreferencer')

      data.should.have.properties(['sharecode', 'id'])
    })
  })
})

async function createTrashedDirectory (client, dirname) {
  const created = await client.files.createDirectory({ name: dirname })
  await client.files.trashById(created._id)
  return created
}

async function createRandomDirectory (client) {
  const dirname = 'foo_' + randomGenerator()()
  const created = await client.files.createDirectory({ name: dirname })
  return created
}
