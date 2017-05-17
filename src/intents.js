import {cozyFetchJSON} from './fetch'

const intentClass = 'coz-intent'

// inject iframe for service in given element
function injectService (url, element, intent, data) {
  const document = element.ownerDocument
  if (!document) throw new Error('Cannot retrieve document object from given element')

  const window = document.defaultView
  if (!window) throw new Error('Cannot retrieve window object from document')

  const iframe = document.createElement('iframe')
  iframe.setAttribute('src', url)
  iframe.classList.add(intentClass)
  element.appendChild(iframe)

  // Keeps only http://domain:port/
  const serviceOrigin = url.split('/', 3).join('/')

  return new Promise((resolve, reject) => {
    let handshaken = false
    const messageHandler = (event) => {
      if (event.origin !== serviceOrigin) return

      if (event.data.type === `intent-${intent._id}:ready`) {
        handshaken = true
        return event.source.postMessage(data, event.origin)
      }

      window.removeEventListener('message', messageHandler)
      iframe.parentNode.removeChild(iframe)

      if (event.data.type === `intent-${intent._id}:error`) {
        return reject(new Error('Intent error'))
      }

      return handshaken
        ? resolve(event.data)
        : reject(new Error('Unexpected handshake message from intent service'))
    }

    window.addEventListener('message', messageHandler)
  })
}

export function create (cozy, action, type, data = {}, permissions = []) {
  if (!action) throw new Error(`Misformed intent, "action" property must be provided`)
  if (!type) throw new Error(`Misformed intent, "type" property must be provided`)

  const createPromise = cozyFetchJSON(cozy, 'POST', '/intents', {
    data: {
      type: 'io.cozy.intents',
      attributes: {
        action: action,
        type: type,
        data: data,
        permissions: permissions
      }
    }
  })

  createPromise.start = (element) => {
    return createPromise.then(intent => {
      let service = intent.attributes.services && intent.attributes.services[0]

      if (!service) {
        return Promise.reject(new Error('Unable to find a service'))
      }

      return injectService(service.href, element, intent, data)
    })
  }

  return createPromise
}

function listenClientData (intent, window) {
  return new Promise((resolve, reject) => {
    const messageEventListener = (event) => {
      if (event.origin !== intent.attributes.client) return

      window.removeEventListener('message', messageEventListener)
      resolve(event.data)
    }

    window.addEventListener('message', messageEventListener)
    window.parent.postMessage(`intent-${intent._id}:ready`, intent.attributes.client)
  })
}

// returns a service to communicate with intent client
export function createService (cozy, intentId, serviceWindow) {
  serviceWindow = serviceWindow || typeof window !== 'undefined' && window
  if (!serviceWindow) throw new Error('Intent service should be used in browser')

  intentId = intentId || serviceWindow.location.search.split('=')[1]
  if (!intentId) throw new Error('Cannot retrieve intent from URL')

  return cozyFetchJSON(cozy, 'GET', `/intents/${intentId}`)
    .then(intent => {
      let terminated = false

      const terminate = (doc) => {
        if (terminated) throw new Error('Intent service has already been terminated')
        terminated = true
        serviceWindow.parent.postMessage(doc, intent.attributes.client)
      }

      const cancel = () => {
        terminate(null)
      }

      // Prevent unfulfilled client promises when this window unloads for a
      // reason or another.
      serviceWindow.addEventListener('unload', cancel)

      return listenClientData(intent, serviceWindow)
        .then(data => {
          return {
            getData: () => data,
            getIntent: () => intent,
            terminate: terminate,
            cancel: cancel
          }
        })
    })
}
