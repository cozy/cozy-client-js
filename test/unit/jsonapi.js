/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import should from 'should'
import jsonapiUnpack from '../../src/jsonapi'

describe('unpacking', function () {
  it('simple data', function () {
    let result = jsonapiUnpack({
      'data': {
        'attributes': {
          'test': 'value'
        },
        'type': 'io.cozy.testobject',
        'id': '42',
        'links': {
          'self': '/io.cozy.testobject/42'
        },
        'meta': {
          'rev': '1-24'
        }
      }
    })

    result.should.have.property('_id', '42')
    result.should.have.property('_rev', '1-24')
    result.should.have.property('attributes')
    result.attributes.should.have.property('test', 'value')
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

    result.should.be.an.Array()
    result.should.have.length(2)
    result[0].should.have.property('_rev', '1-24')
    result[0].should.have.property('_id', '42')
    result[0].should.have.property('attributes')
    result[0].attributes.should.have.property('test', 'value')

    result[1].should.have.property('_id', '43')
    result[1].should.have.property('_rev', '1-34')
    result[1].should.have.property('attributes')
    result[1].attributes.should.have.property('test', 'value2')
  })

  it('included', function () {
    let result = jsonapiUnpack(COMPLEX)

    result.should.have.property('_id', 'top1')
    result.should.have.property('_rev', '1-a59751f9c66867758a7f2b4ebdd9d05f')
    result.should.have.property('attributes')
    result.attributes.should.have.property('test', 'top1')

    let contents = result.relations('contents')

    should(contents).not.be.Undefined()
    contents.should.be.an.Array()
    contents.should.have.length(2)

    contents[0].should.have.property('_id', 'child1')
    contents[0].should.have.property('_rev', '1-1ae365a207bb5eb5c2d3cb8417b5885b')
    contents[0].should.have.property('attributes')
    contents[0].attributes.should.have.property('test', 'child1')

    let parent = contents[0].relations('parent')
    should(parent === result).be.true
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
