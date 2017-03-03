/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import should from 'should'
import { Readable } from 'stream'
import {Client} from '../../src'
import mock from '../mock-api'

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
      calls.should.have.length(4)
      calls[0][1].headers['Content-Type'].should.equal('text/html')
      mock.lastUrl('UploadFile').should.equal('http://my.cozy.io/files/12345?Name=foo&Type=file&Executable=false')

      res1.should.have.property('attributes')
      res2.should.have.property('attributes')
      res3.should.have.property('attributes')
      res4.should.have.property('attributes')
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
      should(createCalls).have.length(1)
      should(createCalls[0][0]).match(/[?&]Executable=true[&]?$/)
      should(createCalls[0][1].headers['Content-MD5']).equal(fooChecksum)
      should(createCalls[0][1].headers['Date']).equal(creationDate.toGMTString())
      const updateCalls = mock.calls('UpdateFile')
      should(updateCalls).have.length(1)
      should(updateCalls[0][1].headers['Content-MD5']).equal(barChecksum)
      should(updateCalls[0][1].headers['Date']).equal(modificationDate)
      should(updateCalls[0][1].headers['If-Match']).equal(previousRev)
    })

    it('should fail for unsupported data types', async function () {
      let err = null

      try {
        await cozy.client.files.create(1, { name: 'name' })
      } catch (e) {
        err = e
      } finally {
        err.should.eql(new Error('invalid data type'))
      }

      err = null

      try {
        await cozy.client.files.create({}, { name: 'name' })
      } catch (e) {
        err = e
      } finally {
        err.should.eql(new Error('invalid data type'))
      }

      err = null

      try {
        await cozy.client.files.create('', { name: 'name' })
      } catch (e) {
        err = e
      } finally {
        err.should.eql(new Error('missing data argument'))
      }

      err = null

      try {
        await cozy.client.files.create('somestringdata')
      } catch (e) {
        err = e
      } finally {
        err.should.eql(new Error('missing name argument'))
      }

      err = null

      try {
        await cozy.client.files.updateById('12345', 1)
      } catch (e) {
        err = e
      } finally {
        err.should.eql(new Error('invalid data type'))
      }

      err = null

      try {
        await cozy.client.files.updateById('12345', {})
      } catch (e) {
        err = e
      } finally {
        err.should.eql(new Error('invalid data type'))
      }

      err = null

      try {
        await cozy.client.files.updateById('12345', '')
      } catch (e) {
        err = e
      } finally {
        err.should.eql(new Error('missing data argument'))
      }

      err = null
    })
  })

  describe('Create directory', function () {
    before(mock.mockAPI('CreateDirectory'))

    it('should work', async function () {
      const dateString = 'Wed, 01 Feb 2017 10:24:42 GMT'
      const date = new Date(dateString)
      const res1 = await cozy.client.files.createDirectory({ name: 'foo' })
      const res2 = await cozy.client.files.createDirectory({ name: 'foo', lastModifiedDate: date })
      const res3 = await cozy.client.files.createDirectory({ name: 'foo', lastModifiedDate: dateString })
      const res4 = await cozy.client.files.createDirectory({ name: 'foo', dirID: '12345' })

      const calls = mock.calls('CreateDirectory')
      calls.should.have.length(4)
      calls[1][1].headers['Date'].should.equal(dateString)
      calls[2][1].headers['Date'].should.equal(dateString)
      mock.lastUrl('CreateDirectory').should.equal('http://my.cozy.io/files/12345?Name=foo&Type=directory')

      res1.should.have.property('attributes')
      res2.should.have.property('attributes')
      res3.should.have.property('attributes')
      res4.should.have.property('attributes')
    })

    it('should fail with wrong arguments', async function () {
      let err = null

      try {
        await cozy.client.files.createDirectory(null)
      } catch (e) {
        err = e
      } finally {
        err.should.eql(new Error('missing name argument'))
      }

      err = null

      try {
        await cozy.client.files.createDirectory({})
      } catch (e) {
        err = e
      } finally {
        err.should.eql(new Error('missing name argument'))
      }

      err = null

      try {
        await cozy.client.files.createDirectory({ name: '' })
      } catch (e) {
        err = e
      } finally {
        err.should.eql(new Error('missing name argument'))
      }

      err = null
    })
  })

  describe('Trash', function () {
    before(mock.mockAPI('Trash'))

    it('should work', async function () {
      const res1 = await cozy.client.files.trashById('1234')

      mock.calls('Trash').should.have.length(1)
      mock.lastUrl('Trash').should.equal('http://my.cozy.io/files/1234')

      res1.should.have.property('attributes')
    })

    it('should fail with wrong arguments', async function () {
      let err = null

      try {
        await cozy.client.files.trashById(null)
      } catch (e) {
        err = e
      } finally {
        err.should.eql(new Error('missing id argument'))
      }

      err = null

      try {
        await cozy.client.files.trashById({})
      } catch (e) {
        err = e
      } finally {
        err.should.eql(new Error('missing id argument'))
      }

      err = null

      try {
        await cozy.client.files.trashById('')
      } catch (e) {
        err = e
      } finally {
        err.should.eql(new Error('missing id argument'))
      }

      err = null
    })
  })

  describe('Update attributes', function () {
    before(mock.mockAPI('UpdateAttributes'))

    it('should work with good arguments', async function () {
      const attrs = { tags: ['foo', 'bar'] }
      const previousRev = '1-0e6d5b72'

      const res1 = await cozy.client.files.updateAttributesById('12345', attrs, {ifMatch: previousRev})
      mock.lastUrl('UpdateAttributes').should.equal('http://my.cozy.io/files/12345')
      JSON.parse(mock.lastOptions('UpdateAttributes').body).should.eql({data: { attributes: attrs }})

      const res2 = await cozy.client.files.updateAttributesByPath('/foo/bar', attrs, {ifMatch: previousRev})
      mock.lastUrl('UpdateAttributes').should.equal('http://my.cozy.io/files/metadata?Path=%2Ffoo%2Fbar')
      JSON.parse(mock.lastOptions('UpdateAttributes').body).should.eql({data: { attributes: attrs }})

      const calls = mock.calls('UpdateAttributes')
      should(calls).have.length(2)
      should(calls[0][1].headers['If-Match']).equal(previousRev)
      should(calls[1][1].headers['If-Match']).equal(previousRev)

      res1.should.have.property('attributes')
      res2.should.have.property('attributes')
    })

    it('should fail with bad arguments', async function () {
      let err = null

      try {
        await cozy.client.files.updateAttributesById('12345', null)
      } catch (e) {
        err = e
      } finally {
        err.should.eql(new Error('missing attrs argument'))
      }

      err = null

      try {
        await cozy.client.files.updateAttributesByPath('/12345', null)
      } catch (e) {
        err = e
      } finally {
        err.should.eql(new Error('missing attrs argument'))
      }

      err = null
    })
  })

  describe('Files stat by ID', function () {
    before(mock.mockAPI('StatByID'))

    it('should work', async function () {
      const res1 = await cozy.client.files.statById('id42')

      mock.calls('StatByID').should.have.length(1)
      mock.lastUrl('StatByID').should.equal('http://my.cozy.io/files/id42')

      res1.should.have.property('_id', 'id42')
      res1.should.have.property('isDir', true)
      res1.should.have.property('attributes')
      res1.attributes.should.have.property('name', 'bills')
    })
  })

  describe('Files stat by Path', function () {
    before(mock.mockAPI('StatByPath'))

    it('should work', async function () {
      const res1 = await cozy.client.files.statByPath('/bills/hôpital.pdf')

      mock.calls('StatByPath').should.have.length(1)
      mock.lastUrl('StatByPath').should.equal('http://my.cozy.io/files/metadata?Path=%2Fbills%2Fh%C3%B4pital.pdf')

      res1.should.have.property('_id', 'cb1c159a8db1ee7aeb9441c3ff001753')
      res1.should.have.property('isDir', false)
      res1.should.have.property('attributes')
      res1.attributes.should.have.property('name', 'hospi.pdf')
    })
  })

  describe('Download file', function () {
    describe('by ID', function () {
      before(mock.mockAPI('DownloadByID'))

      it('should work', async function () {
        const res = await cozy.client.files.downloadById('id42')

        mock.calls('DownloadByID').should.have.length(1)
        mock.lastUrl('DownloadByID').should.equal('http://my.cozy.io/files/download/id42')
        res.body.should.be.instanceOf(Readable)

        const txt = await res.text()
        txt.should.equal('foo')
      })
    })

    describe('by Path', function () {
      before(mock.mockAPI('DownloadByPath'))

      it('should work', async function () {
        const res = await cozy.client.files.downloadByPath('/bills/hôpital.pdf')

        mock.calls('DownloadByPath').should.have.length(1)
        mock.lastUrl('DownloadByPath').should.equal('http://my.cozy.io/files/download?Path=%2Fbills%2Fh%C3%B4pital.pdf')
        res.body.should.be.instanceOf(Readable)

        const txt = await res.text()
        txt.should.equal('foo')
      })
    })
  })

  describe('Get file path', function () {
    it('should throw error on missing folder', function () {
      const file = {}
      const call = () => {
        cozy.client.files.getFilePath(file)
      }
      should.throws(call, 'Folder should be valid with an attributes.path property')
    })

    it('should throw error on invalid folder', function () {
      const file = {}
      const folder = {}
      const call = () => {
        cozy.client.files.getFilePath(file, folder)
      }
      should.throws(call, 'Folder should be valid with an attributes.path property')
    })

    it('should return file path in root', function () {
      const file = {name: 'random.ext'}
      const folder = {
        attributes: {
          path: '/'
        }
      }
      const res = cozy.client.files.getFilePath(file, folder)
      res.should.be.equal('/random.ext')
    })

    it('should return file path in root with empty path', function () {
      const file = {name: 'random.ext'}
      const folder = {
        attributes: {
          path: ''
        }
      }
      const res = cozy.client.files.getFilePath(file, folder)
      res.should.be.equal('/random.ext')
    })

    it('should return file path in folder ending with `/`', function () {
      const file = {name: 'random.ext'}
      const folder = {
        attributes: {
          path: '/test/'
        }
      }
      const res = cozy.client.files.getFilePath(file, folder)
      res.should.be.equal('/test/random.ext')
    })

    it('should return file path in folder ending with no `/``', function () {
      const file = {name: 'random.ext'}
      const folder = {
        attributes: {
          path: '/test'
        }
      }
      const res = cozy.client.files.getFilePath(file, folder)
      res.should.be.equal('/test/random.ext')
    })
  })
})
