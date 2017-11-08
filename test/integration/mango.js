/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import should from 'should'
import 'isomorphic-fetch'
import {Client} from '../../src'
import mockTokenRetrieve from '../mock-iframe-token'

const COZY_STACK_URL = process.env && process.env.COZY_STACK_URL || ''
const COZY_STACK_VERSION = process.env && process.env.COZY_STACK_VERSION
const COZY_STACK_TOKEN = process.env && process.env.COZY_STACK_TOKEN
const DOCTYPE = 'io.cozy.testobject2'

let docs = [
  {group: 'A', path: '/a/b/c', year: 1984},
  {group: 'A', path: '/a', year: 1749},
  {group: 'A', path: '/a/z', year: 2104},
  {group: 'A', path: '/a/e', year: 1345},
  {group: 'B', path: '/a/b/d', year: 2104}
]

describe('mango API', function () {
  let indexOnGroup = null
  let indexOnGroupAndYear = null
  const cozy = {}

  if (COZY_STACK_VERSION === '2') {
    before(mockTokenRetrieve)
  }

  before(function () {
    cozy.client = new Client({
      cozyURL: COZY_STACK_URL,
      token: COZY_STACK_TOKEN
    })
  })

  before(async function () {
    for (var i = 0, l = docs.length; i < l; i++) {
      docs[i] = await cozy.client.data.create(DOCTYPE, docs[i])
    }
  })

  after(async function () {
    for (var i = 0, l = docs.length; i < l; i++) {
      await cozy.client.data.delete(DOCTYPE, docs[i])
    }
  })

  it('Define indexOnGroup', async function () {
    indexOnGroup = await cozy.client.data.defineIndex(DOCTYPE, ['group'])
  })

  it('Redefine the same index', async function () {
    await cozy.client.data.defineIndex(DOCTYPE, ['group'])
    // should.not.throw
  })

  it('Define indexOnGroupAndYear', async function () {
    indexOnGroupAndYear = await cozy.client.data.defineIndex(DOCTYPE, ['group', 'year'])
  })

  it('Query indexOnGroup', async function () {
    let results = await cozy.client.data.query(indexOnGroup, {
      selector: {group: 'A'}
    })

    results.should.be.an.Array()
    results.should.have.length(4)
  })

  it('Query indexOnGroupAndYear', async function () {
    let results = await cozy.client.data.query(indexOnGroupAndYear, {
      selector: {
        group: 'A',
        year: {$exists: true}
      }
    })

    results.should.be.an.Array()
    results.should.have.length(4)
  })

  it('Query indexOnGroupAndYear with 2 fields', async function () {
    let results = await cozy.client.data.query(indexOnGroupAndYear, {
      selector: {group: 'A', year: {$gte: 1900, $lt: 2200}}
    })

    results.should.be.an.Array()
    results.should.have.length(2)
  })

  it('Query indexOnGroupAndYear with 2 fields and sorted', async function () {
    let sortedResults = await cozy.client.data.query(indexOnGroupAndYear, {
      selector: {group: 'A', year: {$gte: 1900, $lt: 2200}},
      descending: true
    })
    let nonSortedresults = await cozy.client.data.query(indexOnGroupAndYear, {
      selector: {group: 'A', year: {$gte: 1900, $lt: 2200}}
    })

    sortedResults.should.be.an.Array()
    sortedResults.should.have.length(2)
    sortedResults[0].should.deepEqual(nonSortedresults[1])
  })
})
