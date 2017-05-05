/* eslint-env jest */

// eslint-disable-next-line no-unused-vars
import sinon from 'sinon'
import {Client} from '../../src'
import mock from '../mock-api'

function mockElement () {
  const windowMock = {
    postMessage: sinon.spy(),
    addEventListener: sinon.stub(),
    removeEventListener: sinon.spy()
  }
  const iframeMock = {
    setAttribute: sinon.spy(),
    parentNode: {
      removeChild: sinon.stub().returns(iframeMock)
    },
    classList: {
      add: sinon.spy()
    }
  }
  const documentMock = {
    defaultView: windowMock,
    createElement: sinon.stub().returns(iframeMock)
  }
  const iframeWindowMock = {
    postMessage: sinon.spy()
  }
  return {
    ownerDocument: documentMock,
    appendChild: sinon.spy(),
    iframeMock: iframeMock,
    documentMock: documentMock,
    windowMock: windowMock,
    iframeWindowMock: iframeWindowMock
  }
}

describe('Intents', function () {
  const cozy = {}

  const expectedIntent = {
    _id: '77bcc42c-0fd8-11e7-ac95-8f605f6e8338',
    _rev: undefined,
    _type: 'io.cozy.intents',
    attributes: {
      action: 'PICK',
      type: 'io.cozy.files',
      permissions: ['GET'],
      client: 'contacts.cozy.example.net',
      services: [
        {
          slug: 'files',
          href: 'https://files.cozy.example.net/pick?intent=77bcc42c-0fd8-11e7-ac95-8f605f6e8338'
        }
      ]
    },
    links: {
      self: '/intents/77bcc42c-0fd8-11e7-ac95-8f605f6e8338',
      permissions: '/permissions/a340d5e0-d647-11e6-b66c-5fc9ce1e17c6'
    }
  }

  const serviceUrl = 'https://files.cozy.example.net'

  beforeEach(() => {
    cozy.client = new Client({
      cozyURL: 'http://my.cozy.io///',
      token: 'apptoken'
    })
  })
  afterEach(() => mock.restore())

  describe('Create', function () {
    beforeEach(mock.mockAPI('CreateIntent'))

    it('should return created intent', function () {
      return cozy.client.intents.create('PICK', 'io.cozy.whatever.i.am.a.mock')
        .then(intent => {
          // added by cozy-client-js
          expectedIntent.relations = intent.relations
          expect(intent).toEqual(expectedIntent)
        })
    })

    it('should throw error for malformed intents', function () {
      expect(() => cozy.client.intents.create()).toThrowError(/Misformed intent, "action" property must be provided/)

      expect(() => cozy.client.intents.create(null, 'io.cozy.contacts')).toThrowError(/Misformed intent, "action" property must be provided/)

      expect(() => cozy.client.intents.create('PICK')).toThrowError(/Misformed intent, "type" property must be provided/)
    })
  })

  describe('Intent.start', function () {
    beforeEach(mock.mockAPI('CreateIntent'))

    describe('No Service', function () {
      beforeAll(mock.mockAPI('CreateIntentWithNoService'))

      it('should reject with error', function () {
        const element = mockElement()
        return cozy.client.intents
          .create('EDIT', 'io.cozy.files')
          .start(element).catch(err => expect(err.message).toBe('Unable to find a service'))
      })
    })

    it('should inject iframe (not async)', async function () {
      const element = mockElement()
      const {documentMock, iframeMock} = element

      cozy.client.intents
        .create('PICK', 'io.cozy.files')
        .start(element)

      await setTimeout(() => {
        expect(documentMock.createElement.withArgs('iframe').calledOnce).toBe(true)
        expect(iframeMock.setAttribute.withArgs('src', expectedIntent.attributes.services[0].href).calledOnce).toBe(true)
        expect(iframeMock.classList.add.withArgs('coz-intent').calledOnce).toBe(true)
        expect(element.appendChild.withArgs(iframeMock).calledOnce).toBe(true)
      }, 10)
    })

    it('shoud manage handshake', async function () {
      const element = mockElement()
      const {windowMock, iframeWindowMock} = element

      const handshakeEventMessageMock = {
        origin: serviceUrl,
        data: {
          type: 'intent-77bcc42c-0fd8-11e7-ac95-8f605f6e8338:ready'
        },
        source: iframeWindowMock
      }

      cozy.client.intents
        .create('PICK', 'io.cozy.files', {key: 'value'})
        .start(element)

      await setTimeout(() => {
        expect(windowMock.addEventListener.withArgs('message').calledOnce).toBe(true)
        expect(windowMock.removeEventListener.neverCalledWith('message')).toBe(true)

        const messageEventListener = windowMock.addEventListener.firstCall.args[1]

        messageEventListener(handshakeEventMessageMock)
        expect(iframeWindowMock.postMessage.calledWithMatch({key: 'value'}, serviceUrl)).toBe(true)
      }, 10)
    })

    it('should manage handshake fail', function () {
      const element = mockElement()
      const {windowMock, iframeWindowMock} = element

      const handshakeEventMessageMock = {
        origin: serviceUrl,
        data: 'unexpected handshake data',
        source: iframeWindowMock
      }

      const call = cozy.client.intents
        .create('PICK', 'io.cozy.files', {key: 'value'})
        .start(element)

      setTimeout(() => {
        expect(windowMock.addEventListener.withArgs('message').calledOnce).toBe(true)
        expect(windowMock.removeEventListener.neverCalledWith('message')).toBe(true)

        const messageEventListener = windowMock.addEventListener.firstCall.args[1]
        messageEventListener(handshakeEventMessageMock)

        expect(windowMock.removeEventListener.withArgs('message', messageEventListener).calledOnce).toBe(true)
      }, 10)

      return call.catch(err => expect(err.message).toBe('Unexpected handshake message from intent service'))
    })

    it('should handle intent error', function () {
      const element = mockElement()
      const {windowMock, iframeWindowMock} = element

      const handshakeEventMessageMock = {
        origin: serviceUrl,
        data: {
          type: 'intent-77bcc42c-0fd8-11e7-ac95-8f605f6e8338:error'
        },
        source: iframeWindowMock
      }

      const call = cozy.client.intents
        .create('PICK', 'io.cozy.files', {key: 'value'})
        .start(element)

      setTimeout(() => {
        expect(windowMock.addEventListener.withArgs('message').calledOnce).toBe(true)
        expect(windowMock.removeEventListener.neverCalledWith('message')).toBe(true)

        const messageEventListener = windowMock.addEventListener.firstCall.args[1]
        messageEventListener(handshakeEventMessageMock)

        expect(windowMock.removeEventListener.withArgs('message', messageEventListener).calledOnce).toBe(true)
      }, 10)

      return call.catch(err => expect(err.message).toBe('Intent error'))
    })

    it('should handle intent success', function () {
      const element = mockElement()
      const {windowMock, iframeWindowMock} = element

      const handshakeEventMessageMock = {
        origin: serviceUrl,
        data: {
          type: 'intent-77bcc42c-0fd8-11e7-ac95-8f605f6e8338:ready'
        },
        source: iframeWindowMock
      }

      const result = {
        id: 'abcde1234'
      }

      const resolveEventMessageMock = {
        origin: serviceUrl,
        data: {
          type: 'intent-77bcc42c-0fd8-11e7-ac95-8f605f6e8338:done',
          document: result
        },
        source: iframeWindowMock
      }

      const call = cozy.client.intents
        .create('PICK', 'io.cozy.files', {key: 'value'})
        .start(element)

      setTimeout(() => {
        expect(windowMock.addEventListener.withArgs('message').calledOnce).toBe(true)
        expect(windowMock.removeEventListener.neverCalledWith('message')).toBe(true)

        const messageEventListener = windowMock.addEventListener.firstCall.args[1]

        messageEventListener(handshakeEventMessageMock)
        expect(iframeWindowMock.postMessage.calledWithMatch({key: 'value'}, serviceUrl)).toBe(true)

        messageEventListener(resolveEventMessageMock)
        expect(windowMock.removeEventListener.withArgs('message', messageEventListener).calledOnce).toBe(true)
      }, 10)

      return call.then(res => expect(res).toBe(result))
    })
  })

  describe('CreateService', function () {
    function mockWindow (props) {
      return Object.assign({
        addEventListener: sinon.spy(),
        removeEventListener: sinon.spy(),
        parent: {
          postMessage: sinon.stub()
        },
        location: {
          search: 'intent=77bcc42c-0fd8-11e7-ac95-8f605f6e8338'
        }
      }, props)
    }

    beforeEach(mock.mockAPI('GetIntent'))

    it('should manage handshake', function () {
    it('starts handshake', async function () {
      const windowMock = mockWindow()

      const clientHandshakeEventMessageMock = {
        origin: expectedIntent.attributes.client,
        data: { foo: 'bar' }
      }

      windowMock.parent.postMessage.callsFake(() => {
        const messageEventListener = windowMock.addEventListener.secondCall.args[1]
        windowMock.addEventListener.withArgs('message', messageEventListener).calledOnce.should.be.true()

        messageEventListener(clientHandshakeEventMessageMock)
        windowMock.removeEventListener.withArgs('message', messageEventListener).calledOnce.should.be.true()
      })

      return cozy.client.intents.createService(expectedIntent._id, windowMock)
        .then(service => {
          const messageMatch = sinon.match({
            type: 'intent-77bcc42c-0fd8-11e7-ac95-8f605f6e8338:ready'
          })

          windowMock.parent.postMessage
            .withArgs(messageMatch, expectedIntent.attributes.client).calledOnce.should.be.true()
        })
    })

      const windowMock = mockWindow()

      const clientHandshakeEventMessageMock = {
        origin: expectedIntent.attributes.client,
        data: { foo: 'bar' }
      }

      windowMock.parent.postMessage.callsFake(() => {
        const messageEventListener = windowMock.addEventListener.secondCall.args[1]
        expect(
          windowMock.addEventListener.withArgs('message', messageEventListener).calledOnce
        ).toBe(true)

        messageEventListener(clientHandshakeEventMessageMock)
        expect(
          windowMock.removeEventListener.withArgs('message', messageEventListener).calledOnce
        ).toBe(true)
      })

      return cozy.client.intents.createService(expectedIntent._id, windowMock)
        .then(service => {
          expect(typeof service.getData === 'function').toBe(true)
          expect(typeof service.getIntent === 'function').toBe(true)
          expect(typeof service.terminate === 'function').toBe(true)
          expect(service.getData()).toEqual({foo: 'bar'})
        })
    })

    it('should throw error when not in a browser context', () => {
      delete global.window
      expect(cozy.client.intents.createService).toThrowError(/Intent service should be used in browser/)
    })

    it('should throw error when no intent is passed in URL', () => {
      global.window = mockWindow({
        location: {search: ''}
      })

      expect(() => cozy.client.intents.createService()).toThrowError(/Cannot retrieve intent from URL/)

      delete global.window
    })

    describe('Service', function () {
      describe('Terminate', function () {
        it('should send result document to Client', async function () {
          const windowMock = mockWindow()

          const clientHandshakeEventMessageMock = {
            origin: expectedIntent.attributes.client,
            data: { foo: 'bar' }
          }

          const result = {
            type: 'io.cozy.things'
          }

          windowMock.parent.postMessage.callsFake(() => {
            const messageEventListener = windowMock.addEventListener.secondCall.args[1]
            messageEventListener(clientHandshakeEventMessageMock)
          })

          const service = await cozy.client.intents.createService(expectedIntent._id, windowMock)

          service.terminate(result)

          const messageMatch = sinon.match({
            type: 'intent-77bcc42c-0fd8-11e7-ac95-8f605f6e8338:done',
            document: result
          })

          expect(windowMock.parent.postMessage
            .withArgs(messageMatch, expectedIntent.attributes.client).calledOnce).toBe(true)
        })

        it('should send result document to Client also with no params', async function () {
          global.window = mockWindow()

          const clientHandshakeEventMessageMock = {
            origin: expectedIntent.attributes.client,
            data: { foo: 'bar' }
          }

          const result = {
            type: 'io.cozy.things'
          }

          window.parent.postMessage.callsFake(() => {
            const messageEventListener = window.addEventListener.secondCall.args[1]
            messageEventListener(clientHandshakeEventMessageMock)
          })

          const service = await cozy.client.intents.createService()

          service.terminate(result)

          const messageMatch = sinon.match({
            type: 'intent-77bcc42c-0fd8-11e7-ac95-8f605f6e8338:done',
            document: result
          })

          expect(window.parent.postMessage
            .withArgs(messageMatch, expectedIntent.attributes.client).calledOnce).toBe(true)

          delete global.window
        })

        it('should not be called twice', async function () {
          const windowMock = mockWindow()

          const clientHandshakeEventMessageMock = {
            origin: expectedIntent.attributes.client,
            data: { foo: 'bar' }
          }

          const result = {
            type: 'io.cozy.things'
          }

          windowMock.parent.postMessage.callsFake(() => {
            const messageEventListener = windowMock.addEventListener.secondCall.args[1]
            messageEventListener(clientHandshakeEventMessageMock)
          })

          const service = await cozy.client.intents.createService(expectedIntent._id, windowMock)

          service.terminate(result)

          expect(() => {
            service.terminate(result)
          }).toThrowError(/Intent service has already been terminated/)
        })
      })

      describe('Cancel', function () {
        it('should send null to Client', async function () {
          const windowMock = mockWindow()

          const clientHandshakeEventMessageMock = {
            origin: expectedIntent.attributes.client,
            data: { foo: 'bar' }
          }

          windowMock.parent.postMessage.callsFake(() => {
            const messageEventListener = windowMock.addEventListener.secondCall.args[1]
            messageEventListener(clientHandshakeEventMessageMock)
          })

          const service = await cozy.client.intents.createService(expectedIntent._id, windowMock)

          service.cancel()

          const messageMatch = sinon.match({type: 'intent-77bcc42c-0fd8-11e7-ac95-8f605f6e8338:cancel'})

          expect(windowMock.parent.postMessage
            .withArgs(messageMatch, expectedIntent.attributes.client).calledOnce).toBe(true)
        })

        it('should send null to Client also with no parameters', async function () {
          global.window = mockWindow()

          const clientHandshakeEventMessageMock = {
            origin: expectedIntent.attributes.client,
            data: { foo: 'bar' }
          }

          window.parent.postMessage.callsFake(() => {
            const messageEventListener = window.addEventListener.secondCall.args[1]
            messageEventListener(clientHandshakeEventMessageMock)
          })

          const service = await cozy.client.intents.createService(expectedIntent._id, window)

          service.cancel()

          const messageMatch = sinon.match({type: 'intent-77bcc42c-0fd8-11e7-ac95-8f605f6e8338:cancel'})

          expect(window.parent.postMessage
            .withArgs(messageMatch, expectedIntent.attributes.client).calledOnce).toBe(true)

          delete global.window
        })

        it('should not be called twice', async function () {
          const windowMock = mockWindow()

          const clientHandshakeEventMessageMock = {
            origin: expectedIntent.attributes.client,
            data: { foo: 'bar' }
          }

          windowMock.parent.postMessage.callsFake(() => {
            const messageEventListener = windowMock.addEventListener.secondCall.args[1]
            messageEventListener(clientHandshakeEventMessageMock)
          })

          const service = await cozy.client.intents.createService(expectedIntent._id, windowMock)

          service.cancel()

          expect(() => {
            service.cancel()
          }).toThrowError(/Intent service has already been terminated/)
        })

        it('should forbbid further calls to terminate()', async function () {
          const windowMock = mockWindow()

          const clientHandshakeEventMessageMock = {
            origin: expectedIntent.attributes.client,
            data: { foo: 'bar' }
          }

          const result = {
            type: 'io.cozy.things'
          }

          windowMock.parent.postMessage.callsFake(() => {
            const messageEventListener = windowMock.addEventListener.secondCall.args[1]
            messageEventListener(clientHandshakeEventMessageMock)
          })

          const service = await cozy.client.intents.createService(expectedIntent._id, windowMock)

          service.cancel()

          expect(() => {
            service.terminate(result)
          }).toThrowError(/Intent service has already been terminated/)
        })
      })
    })
  })
})
