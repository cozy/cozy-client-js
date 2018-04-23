// helper to serialize/deserialize an error for/from postMessage
export const errorSerializer = (() => {
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
