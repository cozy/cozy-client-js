/* eslint-env jest */

// eslint-disable-next-line no-unused-vars
import { Client } from '../../src'
import mock from '../mock-api'

describe('mango API', function () {
  let indexRef
  const cozy = {}

  beforeEach(() => {
    cozy.client = new Client({
      cozyURL: 'http://my.cozy.io///',
      token: 'apptoken'
    })
  })

  afterEach(() => mock.restore())

  describe('Create index', function () {
    beforeAll(mock.mockAPI('CreateIndex'))

    it('Call the proper route', async function () {
      const testIndex = ['field1', 'field2']
      indexRef = await cozy.client.data.defineIndex('io.cozy.testobject', testIndex)

      expect(mock.calls('CreateIndex')).toHaveLength(1)
      expect(mock.lastUrl('CreateIndex')).toBe('http://my.cozy.io/data/io.cozy.testobject/_index')
      expect(mock.lastOptions('CreateIndex')).toHaveProperty('body', '{"index":{"fields":["field1","field2"]}}')

      expect(indexRef).toHaveProperty('type', 'mango')
      expect(indexRef).toHaveProperty('doctype', 'io.cozy.testobject')
      expect(indexRef).toHaveProperty('name', '_design/generatedindexname')
      expect(indexRef).toHaveProperty('fields')
      expect(indexRef.fields).toEqual(['field1', 'field2'])
    })
  })

  describe('Find documents', function () {
    beforeAll(mock.mockAPI('FindDocuments'))

    it('Call the proper route', async function () {
      let fetched = await cozy.client.data.query(indexRef, {
        selector: {field1: 'value'}
      })

      expect(mock.calls('FindDocuments')).toHaveLength(1)
      expect(mock.lastUrl('FindDocuments')).toBe('http://my.cozy.io/data/io.cozy.testobject/_find')
      expect(mock.lastOptions('FindDocuments')).toHaveProperty(
        'body',
        '{"use_index":"_design/generatedindexname","selector":{"field1":"value"}}'
      )

      expect(Array.isArray(fetched)).toBeTruthy()
      expect(fetched).toHaveLength(2)
      expect(fetched[0]).toHaveProperty('_id', '42')
      expect(fetched[0]).toHaveProperty('test', 'value')
      expect(fetched[1]).toHaveProperty('_id', '43')
      expect(fetched[1]).toHaveProperty('test', 'value')
    })
  })
})
