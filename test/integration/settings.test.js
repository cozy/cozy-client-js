/* eslint-env jest */

// eslint-disable-next-line no-unused-vars
import 'isomorphic-fetch'
import {Client} from '../../src'

const COZY_STACK_URL = process.env && process.env.COZY_STACK_URL || ''
const COZY_STACK_VERSION = process.env && process.env.COZY_STACK_VERSION
const COZY_STACK_TOKEN = process.env && process.env.COZY_STACK_TOKEN

describe('settings api', async function () {
  const cozy = {}

  describe('only v3', () => {
    if (COZY_STACK_VERSION === '2') {
      this.skip()
    }

    beforeEach(function () {
      cozy.client = new Client({
        cozyURL: COZY_STACK_URL,
        token: COZY_STACK_TOKEN
      })
    })

    it('gets the disk usage', async function () {
      const usage = await cozy.client.settings.diskUsage()
      expect(usage).toHaveProperty('attributes')
      expect(typeof usage.attributes.used).toBe('string')
    })
  })
})
