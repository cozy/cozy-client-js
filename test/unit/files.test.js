/* eslint-env jest */

// eslint-disable-next-line no-unused-vars
import { Readable } from 'stream'
import {Client} from '../../src'
import mock from '../mock-api'
import sinon from 'sinon'
import * as files from '../../src/files'

describe('Files', function () {
  const cozy = {}

  beforeEach(() => {
    cozy.client = new Client({
      cozyURL: 'http://my.cozy.io///',
      token: 'apptoken'
    })
  })
  afterEach(() => mock.restore())

  describe('Upload', function () {
    beforeEach(mock.mockAPI('UploadFile'))
    beforeEach(mock.mockAPI('UpdateFile'))
    beforeEach(mock.mockAPI('Status'))

    it('should work for supported data types', async function () {
      const stream = new Readable()

      stream.push('somestreamdata')
      stream.push(null)

      const res1 = await cozy.client.files.create('somestringdata', { name: 'foo', dirID: '12345', contentType: 'text/html' })
      const res2 = await cozy.client.files.create(new Uint8Array(10), { name: 'foo', dirID: '12345' })
      const res3 = await cozy.client.files.create(stream, { name: 'foo', dirID: '12345', contentType: 'text/plain' })
      const res4 = await cozy.client.files.create(new ArrayBuffer(10), { name: 'foo', dirID: '12345' })

      const calls = mock.calls('UploadFile')
      expect(calls).toHaveLength(4)
      expect(calls[0][1].headers['Content-Type']).toBe('text/html')
      expect(mock.lastUrl('UploadFile')).toBe('http://my.cozy.io/files/12345?Name=foo&Type=file&Executable=false')

      expect(res1).toHaveProperty('attributes')
      expect(res2).toHaveProperty('attributes')
      expect(res3).toHaveProperty('attributes')
      expect(res4).toHaveProperty('attributes')
    })

    it('should pass the options as headers or as query parameters', async function () {
      const creationDate = new Date('Wed, 01 Feb 2017 10:24:42 GMT')
      const modificationDate = 'Wed, 01 Feb 2017 10:24:42 GMT'
      const fooChecksum = 'rL0Y20zC+Fzt72VPzMSk2A=='
      const barChecksum = 'N7UdGUp1E+RbVvZSTy1R8g=='
      const previousRev = '1-0e6d5b72'

      const file = await cozy.client.files.create('foo', {
        name: 'foo',
        executable: true,
        checksum: fooChecksum,
        lastModifiedDate: creationDate
      })
      await cozy.client.files.updateById(file._id, 'bar', {
        executable: false,
        checksum: barChecksum,
        lastModifiedDate: modificationDate,
        ifMatch: previousRev
      })

      const createCalls = mock.calls('UploadFile')
      expect(createCalls).toHaveLength(1)
      expect(createCalls[0][0]).toMatch(/[?&]Executable=true[&]?$/)
      expect(createCalls[0][1].headers['Content-MD5']).toBe(fooChecksum)
      expect(createCalls[0][1].headers['Date']).toBe(creationDate.toGMTString())
      const updateCalls = mock.calls('UpdateFile')
      expect(updateCalls).toHaveLength(1)
      expect(updateCalls[0][1].headers['Content-MD5']).toBe(barChecksum)
      expect(updateCalls[0][1].headers['Date']).toBe(modificationDate)
      expect(updateCalls[0][1].headers['If-Match']).toBe(previousRev)
    })

    it('should fail for unsupported data types', async function () {
      let err = null

      try {
        await cozy.client.files.create(1, { name: 'name' })
      } catch (e) {
        err = e
      } finally {
        expect(err).toEqual(new Error('invalid data type'))
      }

      err = null

      try {
        await cozy.client.files.create({}, { name: 'name' })
      } catch (e) {
        err = e
      } finally {
        expect(err).toEqual(new Error('invalid data type'))
      }

      err = null

      try {
        await cozy.client.files.create('', { name: 'name' })
      } catch (e) {
        err = e
      } finally {
        expect(err).toEqual(new Error('missing data argument'))
      }

      err = null

      try {
        await cozy.client.files.create('somestringdata')
      } catch (e) {
        err = e
      } finally {
        expect(err).toEqual(new Error('missing name argument'))
      }

      err = null

      try {
        await cozy.client.files.updateById('12345', 1)
      } catch (e) {
        err = e
      } finally {
        expect(err).toEqual(new Error('invalid data type'))
      }

      err = null

      try {
        await cozy.client.files.updateById('12345', {})
      } catch (e) {
        err = e
      } finally {
        expect(err).toEqual(new Error('invalid data type'))
      }

      err = null

      try {
        await cozy.client.files.updateById('12345', '')
      } catch (e) {
        err = e
      } finally {
        expect(err).toEqual(new Error('missing data argument'))
      }

      err = null
    })
  })

  describe('Create directory', function () {
    beforeAll(mock.mockAPI('CreateDirectory'))

    it('should work', async function () {
      const dateString = 'Wed, 01 Feb 2017 10:24:42 GMT'
      const date = new Date(dateString)
      const res1 = await cozy.client.files.createDirectory({ name: 'foo' })
      const res2 = await cozy.client.files.createDirectory({ name: 'foo', lastModifiedDate: date })
      const res3 = await cozy.client.files.createDirectory({ name: 'foo', lastModifiedDate: dateString })
      const res4 = await cozy.client.files.createDirectory({ name: 'foo', dirID: '12345' })

      const calls = mock.calls('CreateDirectory')
      expect(calls).toHaveLength(4)
      expect(calls[1][1].headers['Date']).toBe(dateString)
      expect(calls[2][1].headers['Date']).toBe(dateString)
      expect(mock.lastUrl('CreateDirectory')).toBe('http://my.cozy.io/files/12345?Name=foo&Type=directory')

      expect(res1).toHaveProperty('attributes')
      expect(res2).toHaveProperty('attributes')
      expect(res3).toHaveProperty('attributes')
      expect(res4).toHaveProperty('attributes')
    })

    it('should fail with wrong arguments', async function () {
      let err = null

      try {
        await cozy.client.files.createDirectory(null)
      } catch (e) {
        err = e
      } finally {
        expect(err).toEqual(new Error('missing name argument'))
      }

      err = null

      try {
        await cozy.client.files.createDirectory({})
      } catch (e) {
        err = e
      } finally {
        expect(err).toEqual(new Error('missing name argument'))
      }

      err = null

      try {
        await cozy.client.files.createDirectory({ name: '' })
      } catch (e) {
        err = e
      } finally {
        expect(err).toEqual(new Error('missing name argument'))
      }

      err = null
    })
  })

  describe('CreateDirectoryByPath', function () {
    let cozyMock

    beforeEach(() => {
      cozyMock = {
        files: {
          statByPath: sinon.stub(),
          statById: sinon.stub(),
          createDirectory: sinon.stub()
        }
      }

      cozyMock.files.statById
        .withArgs('io.cozy.files.root-dir')
        .resolves({
          _id: 'io.cozy.files.root-dir',
          _rev: '1-972356a16f6ebc1d218ae3ebfcec95c5',
          attributes: {
            type: 'directory',
            name: '',
            dir_id: '',
            created_at: '0001-01-01T00:00:00Z',
            updated_at: '0001-01-01T00:00:00Z',
            tags: [],
            path: '/'
          }
        })

      cozyMock.files.statByPath
        .withArgs('/foo')
        .resolves({
          _id: '8c217f9bf5e7118a34627f1ab800243b',
          _rev: '1-db38424a16e76319ea667f64e12f6f39',
          attributes: {
            type: 'directory',
            name: 'foo',
            dir_id: 'io.cozy.files.root-dir',
            created_at: '0001-01-01T00:00:00Z',
            updated_at: '0001-01-01T00:00:00Z',
            tags: [],
            path: '/foo'
          }
        })

      cozyMock.files.statByPath
        .rejects(new Error(JSON.stringify({
          errors: [{
            status: '404'
          }]
        })))

      cozyMock.files.createDirectory
        .withArgs(sinon.match({
          name: 'bar',
          dirID: '8c217f9bf5e7118a34627f1ab800243b'
        }))
        .resolves({
          _id: '9c217f9bf5e7118a34627f1ab800243b',
          _rev: '1-db38424a16e76319ea667f64e12f6f39',
          attributes: {
            type: 'directory',
            name: 'bar',
            dir_id: '8c217f9bf5e7118a34627f1ab800243b',
            created_at: '0001-01-01T00:00:00Z',
            updated_at: '0001-01-01T00:00:00Z',
            tags: [],
            path: '/foo/bar'
          }
        })

      cozyMock.files.createDirectory
        .withArgs(sinon.match({
          name: 'baz',
          dirID: '9c217f9bf5e7118a34627f1ab800243b'
        }))
        .resolves({
          _id: '7c217f9bf5e7118a34627f1ab800243b',
          _rev: '1-db38424a16e76319ea667f64e12f6f39',
          attributes: {
            type: 'directory',
            name: 'baz',
            dir_id: '8c217f9bf5e7118a34627f1ab800243b',
            created_at: '0001-01-01T00:00:00Z',
            updated_at: '0001-01-01T00:00:00Z',
            tags: [],
            path: '/foo/bar/baz'
          }
        })
    })

    it('should work with empty path', async function () {
      return files.createDirectoryByPath(cozyMock, '/')
        .then(folder => {
          expect(folder._id).toBe('io.cozy.files.root-dir')
          expect(cozyMock.files.createDirectory.notCalled).toBe(true)
        });
    })

    it('should work with not existing path', async function () {
      return files.createDirectoryByPath(cozyMock, '/foo/bar')
        .then(folder => {
          expect(folder._id).toBe('9c217f9bf5e7118a34627f1ab800243b')
          expect(cozyMock.files.statByPath.callCount).toBe(2)
          expect(cozyMock.files.createDirectory.calledOnce).toBe(true)
          expect(cozyMock.files.createDirectory.calledWith(sinon.match({
            name: 'bar',
            dirID: '8c217f9bf5e7118a34627f1ab800243b'
          }))).toBe(true)
        });
    })

    it('should work with not existing long path', async function () {
      return files.createDirectoryByPath(cozyMock, '/foo/bar/baz')
        .then(folder => {
          expect(folder._id).toBe('7c217f9bf5e7118a34627f1ab800243b')

          expect(cozyMock.files.statByPath.callCount).toBe(3)
          expect(cozyMock.files.createDirectory.calledTwice).toBe(true)

          expect(cozyMock.files.createDirectory.calledWith(sinon.match({
            name: 'bar',
            dirID: '8c217f9bf5e7118a34627f1ab800243b'
          }))).toBe(true)

          expect(cozyMock.files.createDirectory.calledWith(sinon.match({
            name: 'baz',
            dirID: '9c217f9bf5e7118a34627f1ab800243b'
          }))).toBe(true)
        });
    })

    afterEach(() => {
      cozyMock = {}
    })
  })

  describe('Trash', function () {
    beforeAll(mock.mockAPI('Trash'))

    it('should work', async function () {
      const res1 = await cozy.client.files.trashById('1234')

      expect(mock.calls('Trash')).toHaveLength(1)
      expect(mock.lastUrl('Trash')).toBe('http://my.cozy.io/files/1234')

      expect(res1).toHaveProperty('attributes')
    })

    it('should fail with wrong arguments', async function () {
      let err = null

      try {
        await cozy.client.files.trashById(null)
      } catch (e) {
        err = e
      } finally {
        expect(err).toEqual(new Error('missing id argument'))
      }

      err = null

      try {
        await cozy.client.files.trashById({})
      } catch (e) {
        err = e
      } finally {
        expect(err).toEqual(new Error('missing id argument'))
      }

      err = null

      try {
        await cozy.client.files.trashById('')
      } catch (e) {
        err = e
      } finally {
        expect(err).toEqual(new Error('missing id argument'))
      }

      err = null
    })
  })

  describe('Update attributes', function () {
    beforeAll(mock.mockAPI('UpdateAttributes'))

    it('should work with good arguments', async function () {
      const attrs = { tags: ['foo', 'bar'] }
      const previousRev = '1-0e6d5b72'

      const res1 = await cozy.client.files.updateAttributesById('12345', attrs, {ifMatch: previousRev})
      expect(mock.lastUrl('UpdateAttributes')).toBe('http://my.cozy.io/files/12345')
      expect(JSON.parse(mock.lastOptions('UpdateAttributes').body)).toEqual({data: { attributes: attrs }})

      const res2 = await cozy.client.files.updateAttributesByPath('/foo/bar', attrs, {ifMatch: previousRev})
      expect(mock.lastUrl('UpdateAttributes')).toBe('http://my.cozy.io/files/metadata?Path=%2Ffoo%2Fbar')
      expect(JSON.parse(mock.lastOptions('UpdateAttributes').body)).toEqual({data: { attributes: attrs }})

      const calls = mock.calls('UpdateAttributes')
      expect(calls).toHaveLength(2)
      expect(calls[0][1].headers['If-Match']).toBe(previousRev)
      expect(calls[1][1].headers['If-Match']).toBe(previousRev)

      expect(res1).toHaveProperty('attributes')
      expect(res2).toHaveProperty('attributes')
    })

    it('should fail with bad arguments', async function () {
      let err = null

      try {
        await cozy.client.files.updateAttributesById('12345', null)
      } catch (e) {
        err = e
      } finally {
        expect(err).toEqual(new Error('missing attrs argument'))
      }

      err = null

      try {
        await cozy.client.files.updateAttributesByPath('/12345', null)
      } catch (e) {
        err = e
      } finally {
        expect(err).toEqual(new Error('missing attrs argument'))
      }

      err = null
    })
  })

  describe('Files stat by ID', function () {
    beforeAll(mock.mockAPI('StatByID'))

    it('should work', async function () {
      const res1 = await cozy.client.files.statById('id42')

      expect(mock.calls('StatByID')).toHaveLength(1)
      expect(mock.lastUrl('StatByID')).toBe('http://my.cozy.io/files/id42')

      expect(res1).toHaveProperty('_id', 'id42')
      expect(res1).toHaveProperty('isDir', true)
      expect(res1).toHaveProperty('attributes')
      expect(res1).toHaveProperty('relationships')
      expect(res1.attributes).toHaveProperty('name', 'bills')
    })
  })

  describe('Files stat by Path', function () {
    beforeAll(mock.mockAPI('StatByPath'))

    it('should work', async function () {
      const res1 = await cozy.client.files.statByPath('/bills/hôpital.pdf')

      expect(mock.calls('StatByPath')).toHaveLength(1)
      expect(mock.lastUrl('StatByPath')).toBe('http://my.cozy.io/files/metadata?Path=%2Fbills%2Fh%C3%B4pital.pdf')

      expect(res1).toHaveProperty('_id', 'cb1c159a8db1ee7aeb9441c3ff001753')
      expect(res1).toHaveProperty('isDir', false)
      expect(res1).toHaveProperty('attributes')
      expect(res1.attributes).toHaveProperty('name', 'hospi.pdf')
    })
  })

  describe('Download file', function () {
    describe('by ID', function () {
      beforeAll(mock.mockAPI('DownloadByID'))

      it('should work', async function () {
        const res = await cozy.client.files.downloadById('id42')

        expect(mock.calls('DownloadByID')).toHaveLength(1)
        expect(mock.lastUrl('DownloadByID')).toBe('http://my.cozy.io/files/download/id42')
        expect(res.body).toBeInstanceOf(Readable)

        const txt = await res.text()
        expect(txt).toBe('foo')
      })
    })

    describe('by Path', function () {
      beforeAll(mock.mockAPI('DownloadByPath'))

      it('should work', async function () {
        const res = await cozy.client.files.downloadByPath('/bills/hôpital.pdf')

        expect(mock.calls('DownloadByPath')).toHaveLength(1)
        expect(mock.lastUrl('DownloadByPath')).toBe('http://my.cozy.io/files/download?Path=%2Fbills%2Fh%C3%B4pital.pdf')
        expect(res.body).toBeInstanceOf(Readable)

        const txt = await res.text()
        expect(txt).toBe('foo')
      })
    })
  })

  describe('Get file download link', function () {
    describe('by ID', function () {
      beforeAll(mock.mockAPI('GetDownloadLinkById'))

      it('should work', async function () {
        const res = await cozy.client.files.getDownloadLinkById('id42')

        expect(mock.calls('GetDownloadLinkById')).toHaveLength(1)
        expect(mock.lastUrl('GetDownloadLinkById')).toBe('http://my.cozy.io/files/downloads?Id=id42')

        expect(res).toBe('http://my.cozy.io/files/downloads/secret42/foo')
      })
    })

    describe('by Path', function () {
      beforeAll(mock.mockAPI('GetDownloadLinkByPath'))

      it('should work', async function () {
        const res = await cozy.client.files.getDownloadLinkByPath('/bills/foo.pdf')

        expect(mock.calls('GetDownloadLinkByPath')).toHaveLength(1)
        expect(mock.lastUrl('GetDownloadLinkByPath')).toBe('http://my.cozy.io/files/downloads?Path=%2Fbills%2Ffoo.pdf')

        expect(res).toBe('http://my.cozy.io/files/downloads/secret42/foo')
      })
    })
  })

  describe('Get file path', function () {
    it('should throw error on missing folder', function () {
      const file = {}
      const call = () => {
        cozy.client.files.getFilePath(file)
      }
      expect(call).toThrowError('Folder should be valid with an attributes.path property')
    })

    it('should throw error on invalid folder', function () {
      const file = {}
      const folder = {}
      const call = () => {
        cozy.client.files.getFilePath(file, folder)
      }
      expect(call).toThrowError('Folder should be valid with an attributes.path property')
    })

    it('should return file path in root', function () {
      const file = {name: 'random.ext'}
      const folder = {
        attributes: {
          path: '/'
        }
      }
      const res = cozy.client.files.getFilePath(file, folder)
      expect(res).toBe('/random.ext')
    })

    it('should return file path in root with empty path', function () {
      const file = {name: 'random.ext'}
      const folder = {
        attributes: {
          path: ''
        }
      }
      const res = cozy.client.files.getFilePath(file, folder)
      expect(res).toBe('/random.ext')
    })

    it('should return file path in folder ending with `/`', function () {
      const file = {name: 'random.ext'}
      const folder = {
        attributes: {
          path: '/test/'
        }
      }
      const res = cozy.client.files.getFilePath(file, folder)
      expect(res).toBe('/test/random.ext')
    })

    it('should return file path in folder ending with no `/``', function () {
      const file = {name: 'random.ext'}
      const folder = {
        attributes: {
          path: '/test'
        }
      }
      const res = cozy.client.files.getFilePath(file, folder)
      expect(res).toBe('/test/random.ext')
    })
  })
})
