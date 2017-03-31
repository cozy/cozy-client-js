/* eslint-env mocha */

import should from 'should'
import { FetchError } from '../../src/fetch'

describe('FetchError', function () {
  const response = {url: 'whatever'}
  let error, reason

  beforeEach(() => { error = new FetchError(response, reason) })

  context('when reason is a proper error with message', () => {
    before(() => { reason = new Error('some error') })

    it('has the same message', async function () {
      should(error.message).equal(reason.message)
    })
  })

  context('when reason is a String (e.g. a text error response)', () => {
    before(() => { reason = 'some error string' })

    it('has the String as an error message', () => {
      should(error.message).equal(`FetchError: some error string`)
    })
  })

  context('when reason is an object (e.g. a JSON error response)', () => {
    before(() => { reason = {error: 'not_found', status: 404} })

    it('has the string representation of the object as an error message', () => {
      should(error.message).equal('FetchError: {"error":"not_found","status":404}')
    })
  })
})
