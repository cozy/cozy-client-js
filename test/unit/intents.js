/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
import should from 'should'
import sinon from 'sinon'
import {Client} from '../../src'

function mockElement () {
  const windowMock = {
    postMessage: sinon.spy(),
    addEventListener: sinon.stub(),
    removeEventListener: sinon.spy()
  }
  const iframeMock = {
    setAttribute: sinon.spy(),
    parentNode: {
      removeChild: sinon.spy()
    },
    classList: {
      add: sinon.spy()
    }
  }
  const documentMock = {
    defaultView: windowMock,
    createElement: sinon.stub().returns(iframeMock)
  }
  return {
    ownerDocument: documentMock,
    appendChild: sinon.spy(),
    iframeMock: iframeMock,
    documentMock: documentMock,
    windowMock: windowMock
  }
}

describe('Intents', function () {
  const cozy = {}
  const intent = {
    action: 'PICK',
    type: 'io.cozy.contact',
    data: {
      firstname: 'claude',
      lastname: 'causi'
    }
  }
  const serviceUrl = 'test.cozy.local'

  beforeEach(() => {
    cozy.client = new Client({
      cozyURL: 'http://my.cozy.io///',
      token: 'apptoken'
    })
  })

  describe('Start', function () {
    it('should throw error for malformed intents', function () {
      const worstIntentEver = {}
      const intentWithoutAction = {type: 'io.cozy.files'}
      const intentWithoutType = {action: 'PICK'}

      should.throws(
        () => cozy.client.intents.start(worstIntentEver, mockElement()),
        /Misformed intent, "action" property must be provided/
      )

      should.throws(
        () => cozy.client.intents.start(intentWithoutAction, mockElement()),
        /Misformed intent, "action" property must be provided/
      )

      should.throws(
        () => cozy.client.intents.start(intentWithoutType, mockElement()),
        /Misformed intent, "type" property must be provided/
      )
    })

    it('should inject iframe', function () {
      const element = mockElement()
      const {documentMock, iframeMock} = element
      cozy.client.intents.start(intent, element, serviceUrl)

      should(documentMock.createElement.withArgs('iframe').calledOnce).be.true
      should(iframeMock.setAttribute.withArgs('src', serviceUrl).calledOnce).be.true
      should(iframeMock.classList.add.withArgs('coz-intent').calledOnce).be.true
      should(element.appendChild.withArgs(iframeMock).calledOnce).be.true
    })

    it('shoud manage handshake', async function () {
      const element = mockElement()
      const {windowMock} = element

      windowMock.addEventListener
        .withArgs('message')
        .onFirstCall()
        .callsArgWith(1, 'intent:ready', serviceUrl)

      cozy.client.intents.start(intent, element, serviceUrl)

      should(windowMock.addEventListener.withArgs('message').calledOnce).be.true
      should(windowMock.removeEventListener.neverCalledWith('message')).be.true
      should(windowMock.postMessage.calledWithMatch(intent.data, serviceUrl)).be.true
    })

    it('should manage handshake fail', async function () {
      const element = mockElement()
      const {windowMock} = element

      windowMock.addEventListener
        .withArgs('message')
        .onFirstCall()
        .callsArgWith(1, 'totally unexpected message', serviceUrl)

      cozy.client.intents.start(intent, element, serviceUrl)
        .should.be.rejectedWith(/Unexpected handshake message from intent service/)

      should(windowMock.removeEventListener.withArgs('message').calledOnce).be.true
    })

    it('should handle intent error', async function () {
      const element = mockElement()
      const {windowMock} = element

      windowMock.addEventListener
        .withArgs('message')
        .onFirstCall()
        .callsArgWith(1, 'intent:error', serviceUrl)

      cozy.client.intents.start(intent, element, serviceUrl)
        .should.be.rejectedWith(/Intent error/)

      should(windowMock.removeEventListener.withArgs('message').calledOnce).be.true
    })

    it('should handle intent success', async function () {
      const element = mockElement()
      const {windowMock, iframeMock} = element
      const intentResult = {
        lastname: 'Causi',
        firstname: 'Claude'
      }

      windowMock.addEventListener
        .withArgs('message')
        .onFirstCall()
        .callsArgWith(1, 'intent:ready', serviceUrl)
        .callsArgWith(1, intentResult, serviceUrl)

      cozy.client.intents.start(intent, element, serviceUrl)
        .should.be.fulfilledWith(intentResult)

      should(iframeMock.parentNode.removeChild.withArgs(iframeMock).calledOnce).be.true
      should(windowMock.removeEventListener.withArgs('message').calledOnce).be.true
    })
  })
})
