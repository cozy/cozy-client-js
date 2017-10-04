/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import should from 'should'
import 'isomorphic-fetch'
import {Client} from '../../src'

const COZY_STACK_URL = process.env && process.env.COZY_STACK_URL || ''
const COZY_STACK_VERSION = process.env && process.env.COZY_STACK_VERSION
const COZY_STACK_TOKEN = process.env && process.env.COZY_STACK_TOKEN

describe('jobs api', async function () {
  const cozy = {}

  beforeEach(function () {
    if (COZY_STACK_VERSION === '2') {
      this.skip()
    }
    cozy.client = new Client({
      cozyURL: COZY_STACK_URL,
      token: COZY_STACK_TOKEN
    })
  })

  it('gets the number of jobs in a queue', async function () {
    const count = await cozy.client.jobs.count('log')
    count.should.equal(0)
  })

  it('gets the jobs in a queue', async function () {
    const jobs = await cozy.client.jobs.queued('log')
    jobs.length.should.equal(0)
  })

  it('enqueues a job', async function () {
    const created = await cozy.client.jobs.create('log', { foo: 'bar' }, { timeout: 2 })
    created.should.have.property('_id')
    created.should.have.property('attributes')
    const attrs = created.attributes
    attrs.worker.should.equal('log')
    attrs.state.should.equal('queued')
  })
})
