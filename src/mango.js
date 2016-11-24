import {warn, waitConfig, createPath, doFetch, normalizeDoctype} from './utils'

export async function defineIndex (doctype, fields) {
  const config = await waitConfig()
  doctype = normalizeDoctype(config, doctype)
  if (!Array.isArray(fields) || fields.length === 0) {
    throw new Error('defineIndex fields should be a non-empty array')
  }
  if (config.isV1) return await defineIndexV1(config, doctype, fields)
  else return await defineIndexV2(config, doctype, fields)
}

export async function query (indexRef, options) {
  const config = await waitConfig()

  if (!indexRef) {
    throw new Error('query should be passed the indexRef')
  }

  if (config.isV1) return await queryV1(config, indexRef, options)
  else return await queryV2(config, indexRef, options)
}

// Internals

const VALUEOPERATORS = ['$eq', '$gt', '$gte', '$lt', '$lte']
const LOGICOPERATORS = ['$or', '$and', '$not']

/* eslint-disable */
const MAP_TEMPLATE = (function (doc) {
  if (doc.docType.toLowerCase() === 'DOCTYPEPLACEHOLDER'){
    emit(FIELDSPLACEHOLDER, doc)
  }
}).toString().replace(/ /g, '').replace(/\n/g, '')
const COUCHDB_INFINITY = {"\uFFFF": "\uFFFF"}
const COUCHDB_LOWEST = null
/* eslint-enable */

// defineIndexV1 is equivalent to defineIndex but only works for V1.
// It transforms the index fields into a map reduce view.
async function defineIndexV1 (config, doctype, fields) {
  let indexName = 'by' + fields.map(capitalize).join('')
  let indexDefinition = { map: makeMapFunction(doctype, fields), reduce: '_count' }
  let path = `/request/${doctype}/${indexName}/`
  await doFetch(config, 'PUT', path, indexDefinition)
  return { doctype: doctype, type: 'mapreduce', name: indexName, fields: fields }
}

// defineIndexV1 is equivalent to defineIndex but only works for V1.
// It transforms the index fields into a map reduce view.
async function defineIndexV2 (config, doctype, fields) {
  let path = createPath(config, doctype, '_index')
  let indexDefinition = {'index': {fields}}
  let response = await doFetch(config, 'POST', path, indexDefinition)
  return { doctype: doctype, type: 'mango', name: response.id, fields: fields }
}

// queryV1 is equivalent to query but only works for V1.
// It transforms the query into a _views call using makeMapReduceQuery
async function queryV1 (config, indexRef, options) {
  if (indexRef.type !== 'mapreduce') {
    throw new Error('query indexRef should be the return value of defineIndexV1')
  }
  if (options.fields) {
    warn('query fields will be ignored on v1')
  }

  let path = `/request/${indexRef.doctype}/${indexRef.name}/`
  let opts = makeMapReduceQuery(indexRef, options)
  let response = await doFetch(config, 'POST', path, opts)
  return response.map(r => r.value)
}

// queryV2 is equivalent to query but only works for V2
async function queryV2 (config, indexRef, options) {
  if (indexRef.type !== 'mango') {
    throw new Error('indexRef should be the return value of defineIndexV2')
  }

  let opts = {
    use_index: indexRef.name,
    fields: options.fields,
    selector: options.selector,
    limit: options.limit,
    since: options.since,
    sort: indexRef.fields // sort is useless with mango
  }

  let path = createPath(config, indexRef.doctype, '_find')
  let response = await doFetch(config, 'POST', path, opts)
  return response.docs
}

// misc
function capitalize (name) {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

function makeMapFunction (doctype, fields) {
  fields = '[' + fields.map(name => 'doc.' + name).join(',') + ']'

  return MAP_TEMPLATE.replace('DOCTYPEPLACEHOLDER', doctype.toLowerCase())
                     .replace('FIELDSPLACEHOLDER', fields)
}

// parseSelector takes a mango selector and returns it as an array of filter
// a filter is [path, operator, value] array
// a path is an array of field names
// This function is only exported so it can be unit tested.
// Example :
// parseSelector({"test":{"deep": {"$gt": 3}}})
// [[['test', 'deep'], '$gt', 3 ]]
export function parseSelector (selector, path = [], operator = '$eq') {
  if ((typeof selector) !== 'object') {
    return [[path, operator, selector]]
  }

  let keys = Object.keys(selector)
  if (keys.length === 0) {
    throw new Error('empty selector')
  } else {
    return keys.reduce(function (acc, k) {
      if (LOGICOPERATORS.indexOf(k) !== -1) {
        throw new Error('cozy-client-js does not support mango logic ops')
      } else if (VALUEOPERATORS.indexOf(k) !== -1) {
        return acc.concat(parseSelector(selector[k], path, k))
      } else {
        return acc.concat(parseSelector(selector[k], path.concat(k), '$eq'))
      }
    }, [])
  }
}

// normalizeSelector takes a mango selector and returns it as an object
// normalized.
// This function is only exported so it can be unit tested.
// Example :
// parseSelector({"test":{"deep": {"$gt": 3}}})
// {"test.deep": {"$gt": 3}}
export function normalizeSelector (selector) {
  var filters = parseSelector(selector)
  return filters.reduce(function (acc, filter) {
    let [path, op, value] = filter
    let field = path.join('.')
    acc[field] = acc[field] || {}
    acc[field][op] = value
    return acc
  }, {})
}

// applySelector takes the normalized selector for the current field
// and append the proper values to opts.startkey, opts.endkey
function applySelector (selector, opts) {
  let value = selector['$eq']
  let lower = COUCHDB_LOWEST
  let upper = COUCHDB_INFINITY
  let inclusiveEnd

  if (value) {
    opts.startkey.push(value)
    opts.endkey.push(value)
    return false
  }

  value = selector['$gt']
  if (value) {
    throw new Error('operator $gt (strict greater than) not supported')
  }

  value = selector['$gte']
  if (value) {
    lower = value
  }

  value = selector['$lte']
  if (value) {
    upper = value
    inclusiveEnd = true
  }

  value = selector['$lt']
  if (value) {
    upper = value
    inclusiveEnd = false
  }

  opts.startkey.push(lower)
  opts.endkey.push(upper)
  if (inclusiveEnd !== undefined) opts.inclusive_end = inclusiveEnd
  return true
}

// makeMapReduceQuery takes a mango query and generate _views call parameters
// to obtain same results depending on fields in the passed indexRef.
export function makeMapReduceQuery (indexRef, query) {
  let mrquery = {
    startkey: [],
    endkey: [],
    reduce: false
  }
  let firstFreeValueField = null
  let normalizedSelector = normalizeSelector(query.selector)

  indexRef.fields.forEach(function (field) {
    let selector = normalizedSelector[field]

    if (selector && firstFreeValueField != null) {
      throw new Error('Selector on field ' + field + ', but not on ' + firstFreeValueField + ' which is higher in index fields.')
    } else if (selector) {
      selector.used = true
      let isFreeValue = applySelector(selector, mrquery)
      if (isFreeValue) firstFreeValueField = field
    } else if (firstFreeValueField == null) {
      firstFreeValueField = field
      mrquery.endkey.push(COUCHDB_INFINITY)
    }
  })

  Object.keys(normalizedSelector).forEach(function (field) {
    if (!normalizedSelector[field].used) {
      throw new Error('Cant apply selector on ' + field + ', it is not in index')
    }
  })

  return mrquery
}
