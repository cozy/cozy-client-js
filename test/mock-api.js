import fetchMock from 'fetch-mock'

const ROUTES = [
  {
    name: 'GetDoc',
    method: 'GET',
    matcher: '/data/io.cozy.testobject/42',
    response: {
      '_id': '42',
      '_rev': '1-5444878785445',
      'test': 'value'
    }
  },
  {
    name: 'CreateDoc',
    method: 'POST',
    matcher: '/data/io.cozy.testobject/',
    response: {
      '_id': '42',
      '_rev': '1-5444878785445',
      'data': {
        '_id': '42',
        '_rev': '1-5444878785445',
        'test': 'value'
      }
    }
  }
]

fetchMock.mockAPI = (name) => function () {
  ROUTES.filter(route => route.name === name)
        .forEach(route => fetchMock.mock(route))
}

export default fetchMock
