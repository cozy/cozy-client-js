/* eslint-env jest */

// eslint-disable-next-line no-unused-vars
import jsonapiUnpack from '../../src/jsonapi'

describe('unpacking', function () {
  it('simple data', function () {
    let result = jsonapiUnpack({
      'links': {
        'self': '/io.cozy.testobject/42'
      },
      'data': {
        'attributes': {
          'test': 'value'
        },
        'type': 'io.cozy.testobject',
        'id': '42',
        'meta': {
          'rev': '1-24'
        }
      }
    })

    expect(result).toHaveProperty('_id', '42')
    expect(result).toHaveProperty('_rev', '1-24')
    expect(result).toHaveProperty('attributes')
    expect(result.attributes).toHaveProperty('test', 'value')
  })

  it('array data', function () {
    let result = jsonapiUnpack({
      'data': [
        {
          'attributes': { 'test': 'value' },
          'type': 'io.cozy.testobject',
          'id': '42',
          'links': { 'self': '/io.cozy.testobject/42' },
          'meta': { 'rev': '1-24' }
        },
        {
          'attributes': { 'test': 'value2' },
          'type': 'io.cozy.testobject',
          'id': '43',
          'links': { 'self': '/io.cozy.testobject/42' },
          'meta': { 'rev': '1-34' }
        }
      ]
    })

    expect(result).toBeInstanceOf(Array)
    expect(result).toHaveLength(2)
    expect(result[0]).toHaveProperty('_rev', '1-24')
    expect(result[0]).toHaveProperty('_id', '42')
    expect(result[0]).toHaveProperty('attributes')
    expect(result[0].attributes).toHaveProperty('test', 'value')

    expect(result[1]).toHaveProperty('_id', '43')
    expect(result[1]).toHaveProperty('_rev', '1-34')
    expect(result[1]).toHaveProperty('attributes')
    expect(result[1].attributes).toHaveProperty('test', 'value2')
  })

  it('included', function () {
    let result = jsonapiUnpack(COMPLEX)

    expect(result).toHaveProperty('_id', 'top1')
    expect(result).toHaveProperty('_rev', '1-a59751f9c66867758a7f2b4ebdd9d05f')
    expect(result).toHaveProperty('attributes')
    expect(result.attributes).toHaveProperty('test', 'top1')

    let contents = result.relations('contents')

    expect(contents).toBeDefined()
    expect(contents).toBeInstanceOf(Array)
    expect(contents).toHaveLength(2)

    expect(contents[0]).toHaveProperty('_id', 'child1')
    expect(contents[0]).toHaveProperty('_rev', '1-1ae365a207bb5eb5c2d3cb8417b5885b')
    expect(contents[0]).toHaveProperty('attributes')
    expect(contents[0].attributes).toHaveProperty('test', 'child1')

    let parent = contents[0].relations('parent')
    expect(parent === result).toBe(true)
  })
})

const COMPLEX = {
  'data': {
    'id': 'top1',
    'type': 'io.cozy.files',
    'attributes': { 'test': 'top1' },
    'links': { 'self': '/files/top1' },
    'meta': { 'rev': '1-a59751f9c66867758a7f2b4ebdd9d05f' },
    'relationships': {
      'contents': {
        'data': [
          { 'id': 'child1', 'type': 'io.cozy.files' },
          { 'id': 'child2', 'type': 'io.cozy.files' }
        ]
      },
      'parent': { 'data': null }
    }
  },
  'included': [
    {
      'id': 'child1',
      'type': 'io.cozy.files',
      'attributes': { 'test': 'child1' },
      'links': { 'self': '/files/child1' },
      'meta': { 'rev': '1-1ae365a207bb5eb5c2d3cb8417b5885b' },
      'relationships': {
        'contents': { 'data': [] },
        'parent': {
          'data': { 'id': 'top1', 'type': 'io.cozy.files' },
          'links': { 'related': '/files/top1' }
        }
      }
    },
    {
      'id': 'child2',
      'type': 'io.cozy.files',
      'attributes': { 'test': 'child2' },
      'links': { 'self': '/files/child2' },
      'meta': { 'rev': '1-286f5cbda1f40cdede2364bb9c7c1564' },
      'relationships': {
        'contents': { 'data': [] },
        'parent': {
          'data': { 'id': 'top1', 'type': 'io.cozy.files' },
          'links': { 'related': '/files/top1' }
        }
      }
    }
  ]
}
