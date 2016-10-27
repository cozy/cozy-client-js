/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import should from 'should'

import cozy from '../../src'
import fetchMock from 'fetch-mock'

describe('Fetch document', function () {
  before(() => fetchMock.get('/data/io.cozy.testobject/42', {'answer': 42}))
  after(() => fetchMock.restore())

  it('Call the proper route', async function () {
    let fetched = await cozy.find('io.cozy.testobject', '42')
    fetched.should.have.property('answer', 42)
  })
})
