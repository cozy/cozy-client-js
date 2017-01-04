import {warn} from './utils'

const KNOWN_DOCTYPES = {
  'files': 'io.cozy.files',
  'folder': 'io.cozy.files',
  'contact': 'io.cozy.contacts',
  'event': 'io.cozy.events',
  'track': 'io.cozy.labs.music.track',
  'playlist': 'io.cozy.labs.music.playlist'
}

const REVERSE_KNOWN = {}
Object.keys(KNOWN_DOCTYPES).forEach(k => {
  REVERSE_KNOWN[KNOWN_DOCTYPES[k]] = k
})

export function normalizeDoctype (cozy, isV2, doctype) {
  let isQualified = doctype.indexOf('.') !== -1
  if (isV2 && isQualified) {
    let known = REVERSE_KNOWN[doctype]
    if (known) return known
    return doctype.replace(/\./g, '-')
  }
  if (!isV2 && !isQualified) {
    let known = KNOWN_DOCTYPES[doctype]
    if (known) {
      warn('you are using a non-qualified doctype ' + doctype + ' assumed to be ' + known)
      return known
    }
    throw new Error('Doctype ' + doctype + ' should be qualified.')
  }
  return doctype
}
