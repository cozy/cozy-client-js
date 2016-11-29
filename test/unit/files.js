/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import should from 'should'
import cozy from '../../src'
import mock from '../mock-api'

describe('Files', function () {
  afterEach(() => mock.restore())

  describe('Init', function () {
    before(mock.mockAPI('Status'))

    it('Does nothing', async function () {
      await cozy.init()
    })
  })

  describe('Upload', function () {
    before(mock.mockAPI('UploadFile'))

    it('should work for supported data types', async function () {
      const res1 = await cozy.files.create('somestringdata', { name: 'foo', folderId: '12345' })
      const res2 = await cozy.files.create(new Uint8Array(10), { name: 'foo', folderId: '12345' })
      const res3 = await cozy.files.create(new ArrayBuffer(10), { name: 'foo', folderId: '12345' })

      mock.calls('UploadFile').should.have.length(3)
      mock.lastUrl('UploadFile').should.equal('/files/12345?Name=foo&Type=io.cozy.files')

      res1.data.should.have.property('attributes')
      res2.data.should.have.property('attributes')
      res3.data.should.have.property('attributes')
    })

    it('should fail for unsupported data types', async function () {
      let err = null

      try {
        await cozy.files.create(1, { name: 'name' })
      } catch (e) {
        err = e
      } finally {
        err.should.eql(new Error('invalid data type'))
      }

      err = null

      try {
        await cozy.files.create({}, { name: 'name' })
      } catch (e) {
        err = e
      } finally {
        err.should.eql(new Error('invalid data type'))
      }

      err = null

      try {
        await cozy.files.create('', { name: 'name' })
      } catch (e) {
        err = e
      } finally {
        err.should.eql(new Error('missing data argument'))
      }

      err = null

      try {
        await cozy.files.create('somestringdata')
      } catch (e) {
        err = e
      } finally {
        err.should.eql(new Error('missing name argument'))
      }

      err = null

      try {
        await cozy.files.update(1, { fileId: '12345' })
      } catch (e) {
        err = e
      } finally {
        err.should.eql(new Error('invalid data type'))
      }

      err = null

      try {
        await cozy.files.update({}, { fileId: '12345' })
      } catch (e) {
        err = e
      } finally {
        err.should.eql(new Error('invalid data type'))
      }

      err = null

      try {
        await cozy.files.update('', { fileId: '12345' })
      } catch (e) {
        err = e
      } finally {
        err.should.eql(new Error('missing data argument'))
      }

      err = null

      try {
        await cozy.files.update('somestringdata')
      } catch (e) {
        err = e
      } finally {
        err.should.eql(new Error('missing fileId argument'))
      }

      err = null
    })
  })

  describe('Create directory', function () {
    before(mock.mockAPI('CreateDirectory'))

    it('should work', async function () {
      const res1 = await cozy.files.createDirectory({ name: 'foo' })
      const res2 = await cozy.files.createDirectory({ name: 'foo', folderId: '12345' })

      mock.calls('CreateDirectory').should.have.length(2)
      mock.lastUrl('CreateDirectory').should.equal('/files/12345?Name=foo&Type=io.cozy.folders')

      res1.data.should.have.property('attributes')
      res2.data.should.have.property('attributes')
    })

    it('should fail with wrong arguments', async function () {
      let err = null

      try {
        await cozy.files.createDirectory(null)
      } catch (e) {
        err = e
      } finally {
        err.should.eql(new Error('missing name argument'))
      }

      err = null

      try {
        await cozy.files.createDirectory({})
      } catch (e) {
        err = e
      } finally {
        err.should.eql(new Error('missing name argument'))
      }

      err = null

      try {
        await cozy.files.createDirectory({ name: '' })
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
      const res1 = await cozy.files.trash('1234')

      mock.calls('Trash').should.have.length(1)
      mock.lastUrl('Trash').should.equal('/files/1234')

      res1.data.should.have.property('attributes')
    })

    it('should fail with wrong arguments', async function () {
      let err = null

      try {
        await cozy.files.trash(null)
      } catch (e) {
        err = e
      } finally {
        err.should.eql(new Error('missing id argument'))
      }

      err = null

      try {
        await cozy.files.trash({})
      } catch (e) {
        err = e
      } finally {
        err.should.eql(new Error('missing id argument'))
      }

      err = null

      try {
        await cozy.files.trash('')
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

      const res1 = await cozy.files.updateAttributes(attrs, { id: '12345' })
      mock.lastUrl('UpdateAttributes').should.equal('/files/12345')
      JSON.parse(mock.lastOptions('UpdateAttributes').body).should.eql({data: { attributes: attrs }})

      const res2 = await cozy.files.updateAttributes(attrs, { path: '/foo/bar' })
      mock.lastUrl('UpdateAttributes').should.equal('/files/metadata?Path=%2Ffoo%2Fbar')
      JSON.parse(mock.lastOptions('UpdateAttributes').body).should.eql({data: { attributes: attrs }})

      mock.calls('UpdateAttributes').should.have.length(2)

      res1.data.should.have.property('attributes')
      res2.data.should.have.property('attributes')
    })

    it('should fail with bad arguments', async function () {
      let err = null

      try {
        await cozy.files.updateAttributes(null, {})
      } catch (e) {
        err = e
      } finally {
        err.should.eql(new Error('missing attrs argument'))
      }

      try {
        await cozy.files.updateAttributes({}, {})
      } catch (e) {
        err = e
      } finally {
        err.should.eql(new Error('missing id or path argument'))
      }

      err = null
    })
  })
})
