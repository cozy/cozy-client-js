/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import should from 'should'
import 'isomorphic-fetch'
import { Client } from '../../src'
import { randomGenerator } from '../helpers'

const COZY_STACK_URL = (process.env && process.env.COZY_STACK_URL) || ''
const COZY_STACK_VERSION = process.env && process.env.COZY_STACK_VERSION
const COZY_STACK_TOKEN = process.env && process.env.COZY_STACK_TOKEN

async function createRandomFile(cozy, random) {
  return cozy.client.files.create('datastring1', {
    name: 'foo_' + random(),
    contentType: 'application/json'
  })
}

describe('references', async function() {
  let random
  const cozy = {}
  let specialDoc
  let ids = []

  before(async function() {
    if (COZY_STACK_VERSION === '2') {
      this.skip()
    }
    cozy.client = new Client({
      cozyURL: COZY_STACK_URL,
      token: COZY_STACK_TOKEN
    })
    random = randomGenerator()
    for (let i = 0; i < 3; i++) {
      let file = await createRandomFile(cozy, random)
      ids.push(file._id)
    }

    specialDoc = await cozy.client.data.create('io.cozy.testreferencer', {
      name: 'foo_' + random()
    })

    await cozy.client.data.addReferencedFiles(specialDoc, ids)
  })

  it('bind files to a doc', async function() {
    const anotherDoc = await createRandomFile(cozy, random)
    await cozy.client.data.addReferencedFiles(specialDoc, anotherDoc._id)
    const ids2 = await cozy.client.data.listReferencedFiles(specialDoc)
    ids2.should.eql(ids.concat(anotherDoc._id))
  })

  it('remove references', async function() {
    await cozy.client.data.removeReferencedFiles(specialDoc, ids[0])
    const ids2 = await cozy.client.data.listReferencedFiles(specialDoc)
    ids2.should.not.containEql(ids[0])
  })
})
