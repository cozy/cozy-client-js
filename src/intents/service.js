import { cozyFetchJSON } from '../fetch'
import { errorSerializer } from './helpers'

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

export function start(cozy, intentId, serviceWindow) {
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
