import promiser from './promiser'

export function create(doctype, attributes) {
  throw new Error('not implemented')
}

export function find(doctype, id, optCallback) {
  let p = fetch('/data/' + doctype + '/' + id)
          .then( (response) => response.json() )

  return promiser(p, optCallback)
}

export function updateAttributes(doctype, doc) {
  throw new Error('not implemented')
}

export function destroy(doctype, doc) {
  throw new Error('not implemented')
}
