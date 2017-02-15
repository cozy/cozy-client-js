/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import should from 'should'
import 'isomorphic-fetch'
import {Cozy} from '../../src'
import {randomGenerator} from '../helpers'

const COZY_STACK_URL = process.env && process.env.COZY_STACK_URL || ''
const COZY_STACK_VERSION = process.env && process.env.COZY_STACK_VERSION
const COZY_STACK_TOKEN = process.env && process.env.COZY_STACK_TOKEN

describe('references', async function () {
  let random
  let cozy

  beforeEach(function () {
    if (COZY_STACK_VERSION === '2') {
      this.skip()
    }
    cozy = new Cozy({
      cozyURL: COZY_STACK_URL,
      token: COZY_STACK_TOKEN
    })
    random = randomGenerator()
  })

  it('bind files to a doc', async function () {
    const ids = []
    for (let i = 0; i < 3; i++) {
      let file = await cozy.files.create('datastring1', {
        name: 'foo_' + random(),
        contentType: 'application/json'
      })
      ids.push(file._id)
    }

    const doc = await cozy.data.create('io.cozy.testreferencer', {
      name: 'foo_' + random()
    })

    await cozy.data.addReferencedFiles(doc, ids)

    const ids2 = await cozy.data.listReferencedFiles(doc)
    ids2.should.eql(ids)
  })
})
