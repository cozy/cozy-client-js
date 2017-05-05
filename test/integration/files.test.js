/* eslint-env jest */
/* global fetch */

// eslint-disable-next-line no-unused-vars
import 'isomorphic-fetch'
import {Readable} from 'stream'
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

    expect(created).toHaveProperty('attributes')
    expect(created.attributes.md5sum).toBe('7Zfd8PaeeXsm5WJesf/KJw==')
    expect(new Date(created.attributes.created_at)).toEqual(date)
    expect(new Date(created.attributes.updated_at)).toEqual(date)
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

    expect(created).toHaveProperty('attributes')
    expect(created.attributes.md5sum).toBe('7Zfd8PaeeXsm5WJesf/KJw==')
  })

  it('updates a file', async function () {
    const filename = 'foo_' + random()

    const created = await cozy.client.files.create('datastring1', { name: filename })
    expect(created).toHaveProperty('attributes')

    const createdId = created._id

    const updated = await cozy.client.files.updateById(createdId, 'datastring2')
    expect(updated).toHaveProperty('attributes')
    expect(updated.attributes.md5sum).toBe('iWpp8tcTP/DWTJSLf0hoyQ==')
  })

  it('updates attributes', async function () {
    const filename = 'foo_' + random()

    const created = await cozy.client.files.create('datastring1', { name: filename })
    expect(created).toHaveProperty('attributes')

    const createdId = created._id

    const newname1 = 'newname1_' + random()
    const attrs1 = { tags: ['foo', 'bar'], name: newname1 }
    const updated1 = await cozy.client.files.updateAttributesById(createdId, attrs1)
    expect(updated1).toHaveProperty('attributes')
    expect(updated1.attributes.name).toMatch(/^newname1_/)
    expect(updated1.attributes.tags).toEqual(['foo', 'bar'])

    const newname2 = 'newname2_' + random()
    const attrs2 = { tags: ['foo'], name: newname2 }
    const updated2 = await cozy.client.files.updateAttributesByPath('/' + newname1, attrs2)
    expect(updated2).toHaveProperty('attributes')
    expect(updated2.attributes.name).toMatch(/^newname2_/)
    expect(updated2.attributes.tags).toEqual(['foo'])
  })

  it('creates directory', async function () {
    const dirname = 'foo_' + random()
    const date = new Date('Wed, 01 Feb 2017 10:24:42 GMT')

    const created = await cozy.client.files.createDirectory({ name: dirname, lastModifiedDate: date })
    expect(created).toHaveProperty('attributes')
    expect(new Date(created.attributes.created_at)).toEqual(date)
    expect(new Date(created.attributes.updated_at)).toEqual(date)
  })

  it('gets directory info by ID', async function () {
    const dirname = 'foo_' + random()

    const created = await cozy.client.files.createDirectory({ name: dirname })
    let directoryID = created._id

    const stats = await cozy.client.files.statById(directoryID)
    expect(stats).toHaveProperty('attributes')
  })

  it('gets directory info by Path', async function () {
    const dirname = 'foo_' + random()

    const created = await cozy.client.files.createDirectory({ name: dirname })

    const stats = await cozy.client.files.statByPath('/' + dirname)
    expect(stats).toHaveProperty('attributes')
    expect(stats).toHaveProperty('_id', created._id)
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

    expect(txt1).toBe('foo')

    const downloaded2 = await cozy.client.files.downloadByPath('/' + filename)
    const txt2 = await downloaded2.text()

    expect(txt2).toBe('foo')
  })

  it('destroy all trashed files and directories', async function () {
    await createTrashedDirectory(cozy.client, 'foo_' + random())
    await createTrashedDirectory(cozy.client, 'foo_' + random())
    await cozy.client.files.clearTrash()

    let trashed = await cozy.client.files.listTrash()
    expect(Array.isArray(trashed)).toBe(true)
    expect(trashed).toHaveLength(0)
  })

  it('list trashed files and directories', async function () {
    await cozy.client.files.clearTrash()
    const created1 = await createTrashedDirectory(cozy.client, 'foo_' + random())
    const created2 = await createTrashedDirectory(cozy.client, 'foo_' + random())
    let trashed = await cozy.client.files.listTrash()
    expect(Array.isArray(trashed)).toBe(true)
    expect(trashed).toHaveLength(2)
    let found1 = false
    let found2 = false
    trashed.forEach((file) => {
      if (file._id === created1._id) found1 = true
      else if (file._id === created2._id) found2 = true
      else throw new Error('found unexpected file' + file._id)
    })
    expect(found1).toBe(true)
    expect(found2).toBe(true)
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
    expect(Array.isArray(trashed)).toBe(true)
    expect(trashed).toHaveLength(0)
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
    expect(txt1).toBe('foo')

    let link2 = await cozy.client.files.getDownloadLinkById(created._id)
    let downloaded2 = await fetch(COZY_STACK_URL + link2)
    const txt2 = await downloaded2.text()
    expect(txt2).toBe('foo')
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
    let link = await cozy.client.files.getArchiveLink(toDownload, 'foobar')
    let downloaded = await fetch(COZY_STACK_URL + link)
    expect(downloaded).toBeDefined()
    expect(downloaded.headers.get('Content-Type')).toBe('application/zip')
    const disp = downloaded.headers.get('Content-Disposition')
    expect(disp.indexOf('foobar')).not.toBe(-1)
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

    // Don't know how to add pouchdb in test environment
    it.skip('and online should have same properties except for *links*', async () => {
      const folder = await createRandomDirectory(cozy.client)
      await cozy.client.offline.replicateFromCozy('io.cozy.files')
      const offline = await cozy.client.files.statById(folder._id)
      const online = await cozy.client.files.statById(folder._id, false)
      delete online.links
      expect(online).to.have.properties(Object.keys(offline))
      expect(offline).to.have.properties(Object.keys(online))
      expect(offline.attributes).to.have.properties(Object.keys(online.attributes))
      expect(online.attributes).to.have.properties(Object.keys(offline.attributes))
    })
  })

  describe('share', () => {
    it('should get `sharecode` and `id` to create a share link', async () => {
      const document = await cozy.client.files.create('foo', {
        name: `to be shared ${random()}`,
        contentType: 'application/json'
      })
      const collection = await cozy.client.data.create('io.cozy.testreferencer', {
        name: 'foo_' + random()
      })

      await cozy.client.data.addReferencedFiles(collection, document._id)
      const data = await cozy.client.files.getCollectionShareLink(collection._id, 'io.cozy.testreferencer')

      expect(data).toHaveProperty('sharecode')
      expect(data).toHaveProperty('id', `id=${collection._id}`)
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
