/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import should from 'should'
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
    style: [],
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

    it('should return created intent', async function () {
      return cozy.client.intents.create('PICK', 'io.cozy.whatever.i.am.a.mock')
        .then(intent => {
          // added by cozy-client-js
          expectedIntent.relations = intent.relations
          should.deepEqual(intent, expectedIntent)
        })
    })

    it('should throw error for malformed intents', function () {
      should.throws(
        () => cozy.client.intents.create(),
        /Misformed intent, "action" property must be provided/
      )

      should.throws(
        () => cozy.client.intents.create(null, 'io.cozy.contacts'),
        /Misformed intent, "action" property must be provided/
      )

      should.throws(
        () => cozy.client.intents.create('PICK'),
        /Misformed intent, "type" property must be provided/
      )
    })
  })

  describe('Intent.start', function () {
    beforeEach(mock.mockAPI('CreateIntent'))

    describe('No Service', function () {
      before(mock.mockAPI('CreateIntentWithNoService'))

      it('should reject with error', async function () {
        const element = mockElement()

        return cozy.client.intents
          .create('EDIT', 'io.cozy.files')
          .start(element)
          .should.be.rejectedWith(/Unable to find a service/)
      })
    })

    it('should inject iframe (not async)', function (done) {
      const element = mockElement()
      const {documentMock, iframeMock} = element

      const onReadyCallbackMock = () => {}

      cozy.client.intents
        .create('PICK', 'io.cozy.files')
        .start(element, onReadyCallbackMock)

      setTimeout(() => {
        should(documentMock.createElement.withArgs('iframe').calledOnce).be.true()
        should(iframeMock.onload).equal(onReadyCallbackMock)
        should(iframeMock.setAttribute.withArgs('src', expectedIntent.attributes.services[0].href).calledOnce).be.true()
        should(iframeMock.classList.add.withArgs('coz-intent').calledOnce).be.true()
        should(element.appendChild.withArgs(iframeMock).calledOnce).be.true()
        done()
      }, 10)
    })

    it('should inject iframe (not async) also without onReadyCallback', function (done) {
      const element = mockElement()
      const {documentMock, iframeMock} = element

      cozy.client.intents
        .create('PICK', 'io.cozy.files')
        .start(element)

      setTimeout(() => {
        should(documentMock.createElement.withArgs('iframe').calledOnce).be.true()
        should(iframeMock.onload).be.undefined()
        should(iframeMock.setAttribute.withArgs('src', expectedIntent.attributes.services[0].href).calledOnce).be.true()
        should(iframeMock.classList.add.withArgs('coz-intent').calledOnce).be.true()
        should(element.appendChild.withArgs(iframeMock).calledOnce).be.true()
        done()
      }, 10)
    })

    it('shoud manage handshake', function (done) {
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

      setTimeout(() => {
        should(windowMock.addEventListener.withArgs('message').calledOnce).be.true()
        should(windowMock.removeEventListener.neverCalledWith('message')).be.true()

        const messageEventListener = windowMock.addEventListener.firstCall.args[1]

        messageEventListener(handshakeEventMessageMock)
        should(iframeWindowMock.postMessage.calledWithMatch({key: 'value'}, serviceUrl)).be.true()
        done()
      }, 10)
    })

    it('should manage handshake fail', async function () {
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
        should(windowMock.addEventListener.withArgs('message').calledOnce).be.true()
        should(windowMock.removeEventListener.neverCalledWith('message')).be.true()

        const messageEventListener = windowMock.addEventListener.firstCall.args[1]
        messageEventListener(handshakeEventMessageMock)

        should(windowMock.removeEventListener.withArgs('message', messageEventListener).calledOnce).be.true()
      }, 10)

      return call.should.be.rejectedWith(/Unexpected handshake message from intent service/)
    })

    it('should handle intent error', async function () {
      const element = mockElement()
      const {windowMock, iframeWindowMock} = element

      const error = new Error('test error')
      error.type = 'serviceError'
      error.status = '409'

      const handshakeEventMessageMock = {
        origin: serviceUrl,
        data: {
          type: 'intent-77bcc42c-0fd8-11e7-ac95-8f605f6e8338:error',
          error: {
            message: 'test error',
            type: 'serviceError',
            status: '409'
          }
        },
        source: iframeWindowMock
      }

      const call = cozy.client.intents
        .create('PICK', 'io.cozy.files', {key: 'value'})
        .start(element)
        .catch(error => {
          error.should.have.property('message').eql('test error')
          error.should.have.property('type').eql('serviceError')
          error.should.have.property('status').eql('409')

          throw error
        })

      setTimeout(() => {
        should(windowMock.addEventListener.withArgs('message').calledOnce).be.true()
        should(windowMock.removeEventListener.neverCalledWith('message')).be.true()

        const messageEventListener = windowMock.addEventListener.firstCall.args[1]
        messageEventListener(handshakeEventMessageMock)

        should(windowMock.removeEventListener.withArgs('message', messageEventListener).calledOnce).be.true()
      }, 10)

      return call.should.be.rejectedWith(error)
    })

    it('should handle intent success', async function () {
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
        should(windowMock.addEventListener.withArgs('message').calledOnce).be.true()
        should(windowMock.removeEventListener.neverCalledWith('message')).be.true()

        const messageEventListener = windowMock.addEventListener.firstCall.args[1]

        messageEventListener(handshakeEventMessageMock)
        should(iframeWindowMock.postMessage.calledWithMatch({key: 'value'}, serviceUrl)).be.true()

        messageEventListener(resolveEventMessageMock)
        should(windowMock.removeEventListener.withArgs('message', messageEventListener).calledOnce).be.true()
      }, 10)

      return call.should.be.fulfilledWith(result)
    })

    it('should handle intent resize', async function () {
      const element = mockElement()
      const {windowMock, iframeWindowMock} = element

      const handshakeEventMessageMock = {
        origin: serviceUrl,
        data: {
          type: 'intent-77bcc42c-0fd8-11e7-ac95-8f605f6e8338:ready'
        },
        source: iframeWindowMock
      }

      const dimensions = {
        width: 400,
        height: 280
      }

      const resizeEventMessageMock = {
        origin: serviceUrl,
        data: {
          type: 'intent-77bcc42c-0fd8-11e7-ac95-8f605f6e8338:resize',
          dimensions
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
        should(windowMock.addEventListener.withArgs('message').calledOnce).be.true()
        should(windowMock.removeEventListener.neverCalledWith('message')).be.true()

        const messageEventListener = windowMock.addEventListener.firstCall.args[1]

        messageEventListener(handshakeEventMessageMock)
        should(iframeWindowMock.postMessage.calledWithMatch({key: 'value'}, serviceUrl)).be.true()

        messageEventListener(resizeEventMessageMock)
        element.style['width'].should.exist
        element.style['width'].should.equal('400px')
        element.style['height'].should.exist
        element.style['height'].should.equal('280px')

        messageEventListener(resolveEventMessageMock)
        should(windowMock.removeEventListener.withArgs('message', messageEventListener).calledOnce).be.true()
      }, 10)

      return call.should.be.fulfilledWith(result)
    })

    it('should handle intent exposeFrameRemoval', async function () {
      const element = mockElement()
      const {windowMock, iframeMock, iframeWindowMock} = element

      const handshakeEventMessageMock = {
        origin: serviceUrl,
        data: {
          type: 'intent-77bcc42c-0fd8-11e7-ac95-8f605f6e8338:ready'
        },
        source: iframeWindowMock
      }

      const docMock = {
        id: 'abcde1234'
      }

      const resolveexposeFrameRemovalEventMessageMock = {
        origin: serviceUrl,
        data: {
          type: 'intent-77bcc42c-0fd8-11e7-ac95-8f605f6e8338:exposeFrameRemoval',
          document: docMock
        },
        source: iframeWindowMock
      }

      const call = cozy.client.intents
        .create('PICK', 'io.cozy.files', {key: 'value'})
        .start(element)

      setTimeout(() => {
        should(windowMock.addEventListener.withArgs('message').calledOnce).be.true()
        should(windowMock.removeEventListener.neverCalledWith('message')).be.true()

        const messageEventListener = windowMock.addEventListener.firstCall.args[1]

        messageEventListener(handshakeEventMessageMock)
        should(iframeWindowMock.postMessage.calledWithMatch({key: 'value'}, serviceUrl)).be.true()

        messageEventListener(resolveexposeFrameRemovalEventMessageMock)
        should(windowMock.removeEventListener.withArgs('message', messageEventListener).calledOnce).be.true()
      }, 10)

      return call.then(result => {
        should(result.doc).equal(docMock)
        should(result.removeIntentFrame).be.Function()

        // test iframe removing by calling the returned closing method
        should(iframeMock.parentNode.removeChild.withArgs(iframeMock).calledOnce).be.false()
        result.removeIntentFrame()
        should(iframeMock.parentNode.removeChild.withArgs(iframeMock).calledOnce).be.true()
      })
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

    it('should manage handshake', async function () {
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
          should(typeof service.getData === 'function').be.true()
          should(typeof service.getIntent === 'function').be.true()
          should(typeof service.terminate === 'function').be.true()
          service.getData().should.deepEqual({foo: 'bar'})
          return true
        }).should.be.fulfilledWith(true)
    })

    it('should throw error when not in a browser context', () => {
      should.throws(
        () => cozy.client.intents.createService(),
        /Intent service should be used in browser/
      )
    })

    it('should throw error when no intent is passed in URL', () => {
      global.window = mockWindow({
        location: {search: ''}
      })

      should.throws(
        () => cozy.client.intents.createService(),
        /Cannot retrieve intent from URL/
      )

      delete global.window
    })

    describe('Service', function () {
      describe('ResizeClient', function () {
        it('should send provided sizes to the client', async function () {
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

          service.resizeClient({
            width: 100,
            height: 200
          })

          const messageMatch = sinon.match({
            type: 'intent-77bcc42c-0fd8-11e7-ac95-8f605f6e8338:resize',
            dimensions: {
              width: 100,
              height: 200
            }
          })

          windowMock.parent.postMessage
            .withArgs(messageMatch, expectedIntent.attributes.client).calledOnce.should.be.true()
        })

        it('should calculate width and height from a provided dom element', async function () {
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

          service.resizeClient({
            element: {
              clientHeight: 10,
              clientWidth: 13
            }
          })

          const messageMatch = sinon.match({
            type: 'intent-77bcc42c-0fd8-11e7-ac95-8f605f6e8338:resize',
            dimensions: {
              maxWidth: 13,
              maxHeight: 10
            }
          })

          windowMock.parent.postMessage
            .withArgs(messageMatch, expectedIntent.attributes.client).calledOnce.should.be.true()
        })

        it('should not be called once the service has been terminated', async function () {
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

          should.throws(() => {
            service.resizeClient({
              element: {
                clientHeight: 10,
                clientWidth: 13
              }
            })
          }, /Intent service has been terminated/)
        })
      })

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

          windowMock.parent.postMessage
            .withArgs(messageMatch, expectedIntent.attributes.client).calledOnce.should.be.true()
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

          window.parent.postMessage
            .withArgs(messageMatch, expectedIntent.attributes.client).calledOnce.should.be.true()

          delete global.window
        })

        it('should send removeIntentFrame method also if exposeIntentFrameRemoval flag found in data', async function () {
          global.window = mockWindow()

          const clientHandshakeEventMessageMock = {
            origin: expectedIntent.attributes.client,
            data: { foo: 'bar', exposeIntentFrameRemoval: true }
          }

          const docMock = {
            type: 'io.cozy.things'
          }

          window.parent.postMessage.callsFake(() => {
            const messageEventListener = window.addEventListener.secondCall.args[1]
            messageEventListener(clientHandshakeEventMessageMock)
          })

          const service = await cozy.client.intents.createService()

          service.terminate(docMock)

          const messageMatch = sinon.match({
            type: 'intent-77bcc42c-0fd8-11e7-ac95-8f605f6e8338:exposeFrameRemoval',
            document: docMock
          })

          window.parent.postMessage
            .withArgs(messageMatch, expectedIntent.attributes.client).calledOnce.should.be.true()

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

          should.throws(() => {
            service.terminate(result)
          }, /Intent service has already been terminated/)
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

          windowMock.parent.postMessage
            .withArgs(messageMatch, expectedIntent.attributes.client).calledOnce.should.be.true()
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

          window.parent.postMessage
            .withArgs(messageMatch, expectedIntent.attributes.client).calledOnce.should.be.true()

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

          should.throws(() => {
            service.cancel()
          }, /Intent service has already been terminated/)
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

          should.throws(() => {
            service.terminate(result)
          }, /Intent service has already been terminated/)
        })
      })

      describe('Throw', function () {
        it('should send error to Client', async function () {
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

          const error = new Error('test error')
          error.type = 'testError'
          error.status = 500

          service.throw(error)

          const messageMatch = sinon.match({
            type: 'intent-77bcc42c-0fd8-11e7-ac95-8f605f6e8338:error',
            error: {
              message: 'test error',
              type: 'testError',
              status: 500
            }
          })

          windowMock.parent.postMessage
            .withArgs(messageMatch, expectedIntent.attributes.client).calledOnce.should.be.true()
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

          service.throw(new Error('unique error'))

          should.throws(() => {
            service.cancel()
          }, /Intent service has already been terminated/)
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

          service.throw(new Error('test error'))

          should.throws(() => {
            service.terminate(result)
          }, /Intent service has already been terminated/)
        })
      })
    })
  })
})
