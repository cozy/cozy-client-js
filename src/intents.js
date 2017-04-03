/* global URL */
const intentClass = 'coz-intent'

function getUrl (intent, temporaryMockedIntentUrl) {
  return Promise.resolve(temporaryMockedIntentUrl)
}

function injectService (url, element, intent) {
  const document = element.ownerDocument
  if (!document) throw new Error('Cannot retrieve document object from given element')

  const window = document.defaultView
  if (!window) throw new Error('Cannot retrieve window object from document')

  const iframe = document.createElement('iframe')
  iframe.setAttribute('src', url)
  iframe.classList.add(intentClass)
  element.appendChild(iframe)

  // Keeps only http://domain:port/
  const serviceOrigin = new URL(url).origin

  return new Promise((resolve, reject) => {
    let handshaken = false
    const messageHandler = (event) => {
      if (event.origin !== serviceOrigin) return

      if (event.data === 'intent:ready') {
        handshaken = true
        return event.source.postMessage(intent.data, event.origin)
      }

      window.removeEventListener('message', messageHandler)

      if (event.data === 'intent:error') {
        return reject(new Error('Intent error'))
      }

      return handshaken
        ? iframe.parentNode.removeChild(iframe) && resolve(event.data)
        : reject(new Error('Unexpected handshake message from intent service'))
    }

    window.addEventListener('message', messageHandler)
  })
}

export function start (client, intent, element, temporaryMockedIntentUrl) {
  ['action', 'type'].forEach((property) => {
    if (!intent[property]) {
      throw new Error(`Misformed intent, "${property}" property must be provided`)
    }
  })

  // To replace with a call to client
  return getUrl(intent, temporaryMockedIntentUrl)
    .then(url => injectService(url, element, intent))
}

export function resolve () {
  // TODO
}
