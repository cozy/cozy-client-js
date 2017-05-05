/* eslint-env jest */

// eslint-disable-next-line no-unused-vars
import { parseSelector, makeMapReduceQuery } from '../../src/mango'

describe('selector parsing', function () {
  it('simple selector', function () {
    let parsed = parseSelector({'test': 'value'})
    expect(parsed).toEqual([[['test'], '$eq', 'value']])
  })

  it('two fields selector', function () {
    let parsed = parseSelector({'test': 'value', 'test2': 'value2'})
    expect(parsed).toEqual([
      [['test'], '$eq', 'value'],
      [['test2'], '$eq', 'value2']
    ])
  })

  it('two fields selector', function () {
    let parsed = parseSelector({'test': {'testdeep': 'value'}, 'test2': 'value2'})
    expect(parsed).toEqual([
      [['test', 'testdeep'], '$eq', 'value'],
      [['test2'], '$eq', 'value2']
    ])
  })

  it('operator selector', function () {
    let parsed = parseSelector({'test': {'$gt': 3}})
    expect(parsed).toEqual([
      [['test'], '$gt', 3]
    ])
  })

  it('double operator selector', function () {
    let parsed = parseSelector({'test': {'$gt': 2, '$lt': 3}})
    expect(parsed).toEqual([
      [['test'], '$gt', 2],
      [['test'], '$lt', 3]
    ])
  })
})

describe('selector to MR query', function () {
  it('simple selector', function () {
    let indexDef = {type: 'mapreduce', fields: ['dirID', 'date'], name: 'testindex'}
    let mrq = makeMapReduceQuery(indexDef, {selector: {'dirID': '42'}})

    expect(mrq).toEqual({
      startkey: ['42'],
      reduce: false,
      endkey: ['42', {'\uFFFF': '\uFFFF'}]})
  })

  it('double selector', function () {
    let indexDef = {type: 'mapreduce', fields: ['dirID', 'date'], name: 'testindex'}
    let mrq = makeMapReduceQuery(indexDef, {
      selector: {
        'dirID': '42',
        'date': '2101'
      }
    })

    expect(mrq).toEqual({
      startkey: ['42', '2101'],
      reduce: false,
      endkey: ['42', '2101']})
  })

  it('operator selector', function () {
    let indexDef = {type: 'mapreduce', fields: ['dirID', 'date'], name: 'testindex'}
    let mrq = makeMapReduceQuery(indexDef, {
      selector: {
        'dirID': '42',
        'date': {'$gte': '2101'}
      }
    })

    expect(mrq).toEqual({
      startkey: ['42', '2101'],
      reduce: false,
      endkey: ['42', {'\uFFFF': '\uFFFF'}]})
  })

  it('double operator selector', function () {
    let indexDef = {type: 'mapreduce', fields: ['dirID', 'date'], name: 'testindex'}
    let mrq = makeMapReduceQuery(indexDef, {
      selector: {
        'dirID': '42',
        'date': {'$gte': '2101', '$lt': '2201'}
      }
    })

    expect(mrq).toEqual({
      startkey: ['42', '2101'],
      reduce: false,
      endkey: ['42', '2201'],
      inclusive_end: false})
  })
})
