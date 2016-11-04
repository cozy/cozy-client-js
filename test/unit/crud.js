/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import should from 'should'
import cozy from '../../src'
import mock from '../mock-api'

describe('crud API', function () {
  afterEach(() => mock.restore())

  describe('Create document', function () {
    before(mock.mockAPI('CreateDoc'))

    it('Call the proper route', async function () {
      const testDoc = { 'test': 'value' }
      const created = await cozy.create('io.cozy.testobject', testDoc)

      mock.calls('CreateDoc').should.have.length(1)
      mock.lastUrl('CreateDoc').should.equal('/data/io.cozy.testobject/')
      mock.lastOptions('CreateDoc').should.have.property('body',
        '{"test":"value"}'
      )

      created.should.have.property('_id')
      created.should.have.property('_rev')
      created.should.have.property('test', 'value')
    })
  })

  describe('Fetch document', function () {
    before(mock.mockAPI('GetDoc'))

    it('Call the proper route', async function () {
      let fetched = await cozy.find('io.cozy.testobject', '42')

      mock.calls('GetDoc').should.have.length(1)
      mock.lastUrl('GetDoc').should.equal('/data/io.cozy.testobject/42')
      mock.lastOptions('GetDoc').should.not.have.property('body')

      fetched.should.have.property('_id', '42')
      fetched.should.have.property('_rev', '1-5444878785445')
      fetched.should.have.property('test', 'value')
    })
  })
})
