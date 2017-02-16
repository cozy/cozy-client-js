/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import should from 'should'
import 'isomorphic-fetch'
import {Client} from '../../src'
import {randomGenerator} from '../helpers'

const COZY_STACK_URL = process.env && process.env.COZY_STACK_URL || ''
const COZY_STACK_VERSION = process.env && process.env.COZY_STACK_VERSION
const COZY_STACK_TOKEN = process.env && process.env.COZY_STACK_TOKEN

describe('references', async function () {
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

  it('bind files to a doc', async function () {
    const ids = []
    for (let i = 0; i < 3; i++) {
      let file = await cozy.client.files.create('datastring1', {
        name: 'foo_' + random(),
        contentType: 'application/json'
      })
      ids.push(file._id)
    }

    const doc = await cozy.client.create('io.cozy.testreferencer', {
      name: 'foo_' + random()
    })

    await cozy.client.addReferencedFiles(doc, ids)

    const ids2 = await cozy.client.listReferencedFiles(doc)
    ids2.should.eql(ids)
  })
})
