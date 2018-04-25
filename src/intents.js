import { cozyFetchJSON } from './fetch'

const intentClass = 'coz-intent'

// helper to serialize/deserialize an error for/from postMessage
const errorSerializer = (() => {
  function mapErrorProperties(from, to) {
    const result = Object.assign(to, from)
    const nativeProperties = ['name', 'message']
    return nativeProperties.reduce((result, property) => {
      if (from[property]) {
        to[property] = from[property]
      }
      return result
    }, result)
  }
  return {
    serialize: error => mapErrorProperties(error, {}),
    deserialize: data => mapErrorProperties(data, new Error(data.message))
  }
})()

// inject iframe for service in given element
function injectService(url, element, intent, data, onReadyCallback) {
  const document = element.ownerDocument
  if (!document)
    return Promise.reject(
      new Error('Cannot retrieve document object from given element')
    )

  const window = document.defaultView
  if (!window)
    return Promise.reject(
      new Error('Cannot retrieve window object from document')
    )

  const iframe = document.createElement('iframe')
  // if callback provided for when iframe is loaded
  if (typeof onReadyCallback === 'function') iframe.onload = onReadyCallback
  // TODO: implement 'title' attribute
  iframe.setAttribute('src', url)
  iframe.classList.add(intentClass)
  element.appendChild(iframe)
  iframe.focus()

  // Keeps only http://domain:port/
  const serviceOrigin = url.split('/', 3).join('/')

  return new Promise((resolve, reject) => {
    let handshaken = false
    const messageHandler = event => {
      if (event.origin !== serviceOrigin) return

      const eventType = event.data.type
      if (eventType === 'load') {
        // Safari 9.1 (At least) send a MessageEvent when the iframe loads,
        // making the handshake fails.
        console.warn &&
          console.warn(
            'Cozy Client ignored MessageEvent having data.type `load`.'
          )
        return
      }

      if (eventType === `intent-${intent._id}:ready`) {
        handshaken = true
        return event.source.postMessage(data, event.origin)
      }

      if (handshaken && eventType === `intent-${intent._id}:resize`) {
        ;['width', 'height', 'maxWidth', 'maxHeight'].forEach(prop => {
          if (event.data.transition)
            element.style.transition = event.data.transition
          if (event.data.dimensions[prop])
            element.style[prop] = `${event.data.dimensions[prop]}px`
        })

        return true
      }

      window.removeEventListener('message', messageHandler)
      const removeIntentFrame = () => {
        // check if the parent node has not been already removed from the DOM
        iframe.parentNode && iframe.parentNode.removeChild(iframe)
      }

      if (
        handshaken &&
        eventType === `intent-${intent._id}:exposeFrameRemoval`
      ) {
        return resolve({ removeIntentFrame, doc: event.data.document })
      }

      removeIntentFrame()

      if (eventType === `intent-${intent._id}:error`) {
        return reject(errorSerializer.deserialize(event.data.error))
      }

      if (handshaken && eventType === `intent-${intent._id}:cancel`) {
        return resolve(null)
      }

      if (handshaken && eventType === `intent-${intent._id}:done`) {
        return resolve(event.data.document)
      }

      if (!handshaken) {
        return reject(
          new Error('Unexpected handshake message from intent service')
        )
      }

      // We may be in a state where the messageHandler is still attached to then
      // window, but will not be needed anymore. For example, the service failed
      // before adding the `unload` listener, so no `intent:cancel` message has
      // never been sent.
      // So we simply ignore other messages, and this listener will stay here,
      // waiting for a message which will never come, forever (almost).
    }

    window.addEventListener('message', messageHandler)
  })
}

const first = arr => arr && arr[0]
// In a far future, the user will have to pick the desired service from a list.
// For now it's our job, an easy job as we arbitrary pick the first service of
// the list.
function pickService(intent, filterServices) {
  const services = intent.attributes.services
  const filteredServices = filterServices
    ? (services || []).filter(filterServices)
    : services
  return first(filteredServices)
}

export function create(cozy, action, type, data = {}, permissions = []) {
  if (!action)
    throw new Error(`Misformed intent, "action" property must be provided`)
  if (!type)
    throw new Error(`Misformed intent, "type" property must be provided`)

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

  createPromise.start = (element, onReadyCallback) => {
    return createPromise.then(intent => {
      const service = pickService(intent, data.filterServices)
      const restData = Object.assign({}, data)
      delete restData.filterServices

      if (!service) {
        return Promise.reject(new Error('Unable to find a service'))
      }

      return injectService(
        service.href,
        element,
        intent,
        restData,
        onReadyCallback
      )
    })
  }

  return createPromise
}

function listenClientData(intent, window) {
  return new Promise(resolve => {
    const messageEventListener = event => {
      if (event.origin !== intent.attributes.client) return

      window.removeEventListener('message', messageEventListener)
      resolve(event.data)
    }

    window.addEventListener('message', messageEventListener)
    window.parent.postMessage(
      {
        type: `intent-${intent._id}:ready`
      },
      intent.attributes.client
    )
  })
}

// maximize the height of an element
function maximize(element) {
  if (element && element.style) {
    element.style.height = '100%'
  }
}

// returns a service to communicate with intent client
export function createService(cozy, intentId, serviceWindow) {
  serviceWindow = serviceWindow || (typeof window !== 'undefined' && window)
  if (!serviceWindow || !serviceWindow.document) {
    return Promise.reject(new Error('Intent service should be used in browser'))
  }

  // Maximize document, the whole iframe is handled by intents, clients and
  // services
  serviceWindow.addEventListener('load', () => {
    const { document } = serviceWindow
    ;[document.documentElement, document.body].forEach(maximize)
  })

  intentId = intentId || serviceWindow.location.search.split('=')[1]
  if (!intentId)
    return Promise.reject(new Error('Cannot retrieve intent from URL'))

  return cozyFetchJSON(cozy, 'GET', `/intents/${intentId}`).then(intent => {
    let terminated = false

    const terminate = message => {
      if (terminated)
        throw new Error('Intent service has already been terminated')
      terminated = true
      serviceWindow.parent.postMessage(message, intent.attributes.client)
    }

    const resizeClient = (dimensions, transitionProperty) => {
      if (terminated) throw new Error('Intent service has been terminated')

      const message = {
        type: `intent-${intent._id}:resize`,
        // if a dom element is passed, calculate its size
        dimensions: dimensions.element
          ? Object.assign({}, dimensions, {
              maxHeight: dimensions.element.clientHeight,
              maxWidth: dimensions.element.clientWidth
            })
          : dimensions,
        transition: transitionProperty
      }

      serviceWindow.parent.postMessage(message, intent.attributes.client)
    }

    const cancel = () => {
      terminate({ type: `intent-${intent._id}:cancel` })
    }

    // Prevent unfulfilled client promises when this window unloads for a
    // reason or another.
    serviceWindow.addEventListener('unload', () => {
      if (!terminated) cancel()
    })

    return listenClientData(intent, serviceWindow).then(data => {
      return {
        getData: () => data,
        getIntent: () => intent,
        terminate: doc => {
          const eventName =
            data && data.exposeIntentFrameRemoval
              ? 'exposeFrameRemoval'
              : 'done'
          return terminate({
            type: `intent-${intent._id}:${eventName}`,
            document: doc
          })
        },
        throw: error =>
          terminate({
            type: `intent-${intent._id}:error`,
            error: errorSerializer.serialize(error)
          }),
        resizeClient: resizeClient,
        cancel: cancel
      }
    })
  })
}

// Redirect to an app able to handle the doctype
// Redirections are more or less a hack of the intent API to retrieve an URL for
// accessing a given doctype or a given document.
// It needs to use a special action `REDIRECT`
export async function getRedirectionURL(cozy, type, data) {
  if (!type && !data)
    throw new Error(
      `Cannot retrieve redirection, at least type or doc must be provided`
    )

  const intent = await create(cozy, 'REDIRECT', type, data)

  const service = pickService(intent)
  if (!service) throw new Error('Unable to find a service')

  // Intents cannot be deleted now
  // await deleteIntent(cozy, intent)

  // ignore query string and intent id
  const baseURL = service.href.split('?')[0]
  // FIXME: Handle the fact that the stack encode the '#' character in the URL
  const sanitizedURL = baseURL.replace('%23', '#')
  return data ? buildRedirectionURL(sanitizedURL, data) : sanitizedURL
}

function isSerializable(value) {
  return !['object', 'function'].includes(typeof value)
}

function buildRedirectionURL(url, data) {
  const parameterStrings = Object.keys(data)
    .filter(key => isSerializable(data[key]))
    .map(key => `${key}=${data[key]}`)

  return parameterStrings.length ? `${url}?${parameterStrings.join('&')}` : url
}

export async function redirect(cozy, type, doc) {
  if (!window)
    throw new Error('redirect() method can only be called in a browser')
  const redirectionURL = await getRedirectionURL(cozy, type, doc)
  window.location.href = redirectionURL
}
