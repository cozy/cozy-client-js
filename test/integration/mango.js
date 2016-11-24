/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import should from 'should'
import cozy from '../../src'
import fetch from 'isomorphic-fetch'
import mockTokenRetrieve from '../mock-iframe-token'
global.fetch = fetch

const TARGET = process.env && process.env.TARGET || ''
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

  if (TARGET === 'http://localhost:9104') before(mockTokenRetrieve)

  before(async function () {
    await cozy.init({ target: TARGET })
    for (var i = 0, l = docs.length; i < l; i++) {
      docs[i] = await cozy.create(DOCTYPE, docs[i])
    }
  })

  after(async function () {
    for (var i = 0, l = docs.length; i < l; i++) {
      await cozy.delete(DOCTYPE, docs[i])
    }
  })

  it('Define indexOnGroup', async function () {
    indexOnGroup = await cozy.defineIndex(DOCTYPE, ['group'])
  })

  it('Redefine the same index', async function () {
    await cozy.defineIndex(DOCTYPE, ['group'])
    // should.not.throw
  })

  it('Define indexOnGroupAndYear', async function () {
    indexOnGroupAndYear = await cozy.defineIndex(DOCTYPE, ['group', 'year'])
  })

  it('Query indexOnGroup', async function () {
    let results = await cozy.query(indexOnGroup, {
      selector: {group: 'A'}
    })

    results.should.be.an.Array()
    results.should.have.length(4)
  })

  it('Query indexOnGroupAndYear', async function () {
    let results = await cozy.query(indexOnGroupAndYear, {
      selector: {group: 'A'}
    })

    results.should.be.an.Array()
    results.should.have.length(4)
  })

  it('Query indexOnGroupAndYear with 2 fields', async function () {
    let results = await cozy.query(indexOnGroupAndYear, {
      selector: {group: 'A', year: {$gte: 1900, $lt: 2200}}
    })

    results.should.be.an.Array()
    results.should.have.length(2)
  })
})
