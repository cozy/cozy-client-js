import fetchMock from 'fetch-mock'

const statusRoute = {
  name: 'Status',
  method: 'GET',
  matcher: /\/status\/$/,
  response: {
    headers: {
      'content-type': 'application/json'
    },
    body: {
      'couchdb': 'ok'
    }
  }
}

const ROUTES = [
  {
    name: 'GetDoc',
    method: 'GET',
    matcher: /\/data\/io.cozy.testobject\/42$/,
    response: {
      headers: {
        'content-type': 'application/json'
      },
      body: {
        '_id': '42',
        '_rev': '1-5444878785445',
        'test': 'value'
      }
    }
  },
  {
    name: 'CreateDoc',
    method: 'POST',
    matcher: /\/data\/io.cozy.testobject\/$/,
    response: {
      headers: {
        'content-type': 'application/json'
      },
      body: {
        '_id': '42',
        '_rev': '1-5444878785445',
        'data': {
          '_id': '42',
          '_rev': '1-5444878785445',
          'test': 'value'
        }
      }
    }
  },
  {
    name: 'UpdateDoc',
    method: 'PUT',
    matcher: /\/data\/io.cozy.testobject\/42$/,
    response: {
      headers: {
        'content-type': 'application/json'
      },
      body: {
        '_id': '42',
        '_rev': '2-5444878785445',
        'data': {
          '_id': '42',
          '_rev': '2-5444878785445',
          'test': 'value2'
        }
      }
    }
  },
  {
    name: 'DeleteDoc',
    method: 'DELETE',
    matcher: /\/data\/io.cozy.testobject\/42\?rev=1-5444878785445$/,
    response: {
      headers: {
        'content-type': 'application/json'
      },
      body: {
        'id': '42',
        'rev': '1-5444878785445'
      }
    }
  },
  {
    name: 'CreateIndex',
    method: 'POST',
    matcher: /\/data\/io.cozy.testobject\/_index$/,
    response: {
      headers: {
        'content-type': 'application/json'
      },
      body: {
        'id': '_design/generatedindexname',
        'name': 'generatedindexname',
        'result': 'created'
      }
    }
  },
  {
    name: 'FindDocuments',
    method: 'POST',
    matcher: /\/data\/io.cozy.testobject\/_find$/,
    response: {
      headers: {
        'content-type': 'application/json'
      },
      body: {
        'docs': [
          {'_id': '42', 'test': 'value'},
          {'_id': '43', 'test': 'value'}
        ]
      }
    }
  },
  {
    name: 'UploadFile',
    method: 'POST',
    matcher: /\/files\/.*Type=file.*$/,
    response: {
      headers: {
        'content-type': 'application/vnd.api+json'
      },
      body: { data: {
        type: 'io.cozy.files',
        id: 'cb1c159a8db1ee7aeb9441c3ff001753',
        attributes: {
          type: 'file',
          name: 'hospi.pdf',
          dir_id: 'io.cozy.files.root-dir',
          created_at: '2016-11-25T16:07:45.398867198+01:00',
          updated_at: '2016-11-25T16:07:45.398867198+01:00',
          size: '0',
          md5sum: '1B2M2Y8AsgTpgAmY7PhCfg==',
          mime: 'application/pdf',
          class: 'application',
          executable: false,
          tags: []
        },
        meta: {},
        links: {},
        relationships: {}
      } }
    }
  },
  {
    name: 'CreateDirectory',
    method: 'POST',
    matcher: /\/files\/.*Type=directory.*$/,
    response: {
      headers: {
        'content-type': 'application/vnd.api+json'
      },
      body: { data: {
        type: 'io.cozy.files',
        id: 'cb1c159a8db1ee7aeb9441c3ff001753',
        attributes: {
          type: 'directory',
          name: 'hospi.pdf',
          dir_id: 'io.cozy.files.root-dir',
          created_at: '2016-11-25T16:07:45.398867198+01:00',
          updated_at: '2016-11-25T16:07:45.398867198+01:00',
          tags: []
        },
        meta: {},
        links: {},
        relationships: {}
      } }
    }
  },
  {
    name: 'Trash',
    method: 'DELETE',
    matcher: /\/files\/[^/]*$/,
    response: {
      headers: {
        'content-type': 'application/vnd.api+json'
      },
      body: { data: {
        type: 'io.cozy.files',
        id: 'cb1c159a8db1ee7aeb9441c3ff001753',
        attributes: {
          type: 'directory',
          name: 'hospi.pdf',
          dir_id: 'io.cozy.files.root-dir',
          created_at: '2016-11-25T16:07:45.398867198+01:00',
          updated_at: '2016-11-25T16:07:45.398867198+01:00',
          tags: []
        },
        meta: {},
        links: {},
        relationships: {}
      } }
    }
  },
  {
    name: 'UpdateAttributes',
    method: 'PATCH',
    matcher: /\/files\/[^/]*$/,
    response: {
      headers: {
        'content-type': 'application/vnd.api+json'
      },
      body: { data: {
        type: 'io.cozy.files',
        id: 'cb1c159a8db1ee7aeb9441c3ff001753',
        attributes: {
          type: 'directory',
          name: 'hospi.pdf',
          dir_id: 'io.cozy.files.root-dir',
          created_at: '2016-11-25T16:07:45.398867198+01:00',
          updated_at: '2016-11-25T16:07:45.398867198+01:00',
          tags: []
        },
        meta: {},
        links: {},
        relationships: {}
      } }
    }
  },
  {
    name: 'StatByPath',
    method: 'GET',
    matcher: /\/files\/metadata[^/]*$/,
    response: {
      headers: {
        'content-type': 'application/vnd.api+json'
      },
      body: { data: {
        type: 'io.cozy.files',
        id: 'cb1c159a8db1ee7aeb9441c3ff001753',
        attributes: {
          type: 'file',
          name: 'hospi.pdf',
          dir_id: 'io.cozy.files.root-dir',
          created_at: '2016-11-25T16:07:45.398867198+01:00',
          updated_at: '2016-11-25T16:07:45.398867198+01:00',
          tags: []
        },
        meta: {},
        links: {},
        relationships: {}
      } }
    }
  },
  {
    name: 'StatByID',
    method: 'GET',
    matcher: /\/files\/id42$/,
    response: {
      headers: {
        'content-type': 'application/vnd.api+json'
      },
      body: { data: {
        type: 'io.cozy.files',
        id: 'id42',
        attributes: {
          type: 'directory',
          name: 'bills',
          dir_id: 'io.cozy.files.root-dir',
          created_at: '2016-11-25T16:07:45.398867198+01:00',
          updated_at: '2016-11-25T16:07:45.398867198+01:00',
          tags: []
        },
        meta: {},
        links: {},
        relationships: {}
      } }
    }
  },
  {
    name: 'DownloadByID',
    method: 'GET',
    matcher: /\/files\/download\/id42$/,
    response: 'foo'
  },
  {
    name: 'DownloadByPath',
    method: 'GET',
    matcher: /\/files\/download\?Path=.*$/,
    response: 'foo'
  },
  {
    name: 'AuthRegisterClient',
    method: 'POST',
    matcher: /\/auth\/register$/,
    response: (url, opts) => {
      const body = Object.assign(JSON.parse(opts.body), {
        client_id: '123',
        client_secret: '456',
        registration_access_token: '789'
      })
      return {
        headers: {
          'content-type': 'application/json'
        },
        body: body
      }
    }
  },
  {
    name: 'AuthGetClient',
    method: 'GET',
    matcher: /\/auth\/register\/123$/,
    response: (url, opts) => {
      const body = {
        client_id: '123',
        client_secret: '456',
        redirect_uris: ['http://coucou/'],
        software_id: 'id',
        client_name: 'client'
      }
      return {
        headers: {
          'content-type': 'application/json'
        },
        body: body
      }
    }
  },
  {
    name: 'AccessToken',
    method: 'POST',
    matcher: /\/auth\/access_token$/,
    response: {
      headers: {
        'content-type': 'application/json'
      },
      body: {
        token_type: 'Bearer',
        access_token: '123',
        refresh_token: '456',
        scope: 'a b'
      }
    }
  },
  {
    name: 'UpdateClient',
    method: 'PUT',
    matcher: /auth\/register\/123$/,
    response: {
      headers: {
        'content-type': 'application/json'
      },
      body: {
        client_id: '123',
        client_secret: '456',
        redirect_uris: ['http://coucou/'],
        software_id: 'id',
        client_name: 'client',
        logo_uri: '321'
      }
    }
  },
  {
    name: 'ResetClientToken',
    method: 'PUT',
    matcher: /auth\/register\/123$/,
    response: {
      headers: {
        'content-type': 'application/json'
      },
      body: {
        client_id: '123',
        client_secret: '654',
        redirect_uris: ['http://coucou/'],
        software_id: 'id',
        client_name: 'client',
        logo_uri: '321'
      }
    }
  },
  {
    name: 'UnregisterClient',
    method: 'DELETE',
    matcher: /auth\/register\/123$/,
    response: { body: '' }
  },
  {
    name: 'DiskUsage',
    method: 'GET',
    matcher: /settings\/disk-usage$/,
    response: {
      headers: {
        'content-type': 'application/vnd.api+json'
      },
      body: { data: {
        type: 'io.cozy.settings',
        id: 'io.cozy.settings.disk-usage',
        attributes: {
          used: '123'
        },
        meta: {},
        links: {
          self: '/settings/disk-usage'
        }
      } }
    }
  }
]

fetchMock.mockAPI = (name) => function () {
  fetchMock.mock(statusRoute)
  ROUTES.filter(route => route.name === name)
        .forEach(route => fetchMock.mock(route))
}

export default fetchMock
