/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import should from 'should'
import {Client} from '../../src'
import mock from '../mock-api'

describe('settings', function () {
  const cozy = {}

  beforeEach(() => {
    cozy.client = new Client({
      cozyURL: 'http://my.cozy.io///',
      token: 'apptoken'
    })
  })
  afterEach(() => mock.restore())

  describe('Disk usage', function () {
    before(mock.mockAPI('DiskUsage'))

    it('should work', async function () {
      const usage = await cozy.client.settings.diskUsage()
      usage._id.should.equal('io.cozy.settings.disk-usage')
      usage._type.should.equal('io.cozy.settings')
      usage.attributes.used.should.equal('123')
    })
  })
})
