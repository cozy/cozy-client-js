/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import should from 'should'
import {Cozy} from '../../src'
import mock from '../mock-api'
import {fakeCredentials} from '../helpers'

describe('mango API', function () {
  let indexRef
  let cozy

  beforeEach(() => {
    cozy = new Cozy({
      cozyURL: 'http://my.cozy.io///',
      credentials: fakeCredentials()
    })
  })

  afterEach(() => mock.restore())

  describe('Create index', function () {
    before(mock.mockAPI('CreateIndex'))

    it('Call the proper route', async function () {
      const testIndex = ['field1', 'field2']
      indexRef = await cozy.defineIndex('io.cozy.testobject', testIndex)

      mock.calls('CreateIndex').should.have.length(1)
      mock.lastUrl('CreateIndex').should.equal('http://my.cozy.io/data/io.cozy.testobject/_index')
      mock.lastOptions('CreateIndex').should.have.property('body',
        '{"index":{"fields":["field1","field2"]}}'
      )

      indexRef.should.have.property('type', 'mango')
      indexRef.should.have.property('doctype', 'io.cozy.testobject')
      indexRef.should.have.property('name', '_design/generatedindexname')
      indexRef.should.have.property('fields')
      indexRef.fields.should.deepEqual(['field1', 'field2'])
    })
  })

  describe('Find documents', function () {
    before(mock.mockAPI('FindDocuments'))

    it('Call the proper route', async function () {
      let fetched = await cozy.query(indexRef, {
        selector: {field1: 'value'}
      })

      mock.calls('FindDocuments').should.have.length(1)
      mock.lastUrl('FindDocuments').should.equal('http://my.cozy.io/data/io.cozy.testobject/_find')
      mock.lastOptions('FindDocuments').should.have.property('body',
        '{"use_index":"_design/generatedindexname","selector":{"field1":"value"},"sort":["field1","field2"]}'
      )

      fetched.should.be.an.Array()
      fetched.should.have.length(2)
      fetched[0].should.have.property('_id', '42')
      fetched[0].should.have.property('test', 'value')
      fetched[1].should.have.property('_id', '43')
      fetched[1].should.have.property('test', 'value')
    })
  })
})
