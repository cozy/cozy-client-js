/* eslint-env jest */

import { FetchError } from '../../src/fetch';

describe('FetchError', function () {
  const response = {url: 'whatever'}
  let error, reason

  beforeEach(() => { error = new FetchError(response, reason) })

  describe('when reason is a proper error with message', () => {
    beforeAll(() => { reason = new Error('some error') })

    it('has the same message', async function () {
      expect(error.toString()).toBe(`FetchError: ${reason.message}`)
    })
  })

  describe('when reason is a String (e.g. a text error response)', () => {
    beforeAll(() => { reason = 'some error string' })

    it('has the String as an error message', () => {
      expect(error.toString()).toBe(`FetchError: some error string`)
    })
  })

  describe('when reason is an object (e.g. a JSON error response)', () => {
    beforeAll(() => { reason = {error: 'not_found', status: 404} })

    it('has the string representation of the object as an error message', () => {
      expect(error.toString()).toBe('FetchError: {"error":"not_found","status":404}')
    })
  })
})
