(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("pouchdb"), require("pouchdb-find"));
	else if(typeof define === 'function' && define.amd)
		define("client", ["pouchdb", "pouchdb-find"], factory);
	else if(typeof exports === 'object')
		exports["client"] = factory(require("pouchdb"), require("pouchdb-find"));
	else
		root["cozy"] = root["cozy"] || {}, root["cozy"]["client"] = factory(root["pouchdb"], root["pouchdb-find"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_15__, __WEBPACK_EXTERNAL_MODULE_16__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// the whatwg-fetch polyfill installs the fetch() function
	// on the global object (window or self)
	//
	// Return that as the export for use in Webpack, Browserify etc.
	__webpack_require__(2);
	module.exports = self.fetch.bind(self);


/***/ },
/* 2 */
/***/ function(module, exports) {

	(function(self) {
	  'use strict';
	
	  if (self.fetch) {
	    return
	  }
	
	  var support = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob()
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  }
	
	  if (support.arrayBuffer) {
	    var viewClasses = [
	      '[object Int8Array]',
	      '[object Uint8Array]',
	      '[object Uint8ClampedArray]',
	      '[object Int16Array]',
	      '[object Uint16Array]',
	      '[object Int32Array]',
	      '[object Uint32Array]',
	      '[object Float32Array]',
	      '[object Float64Array]'
	    ]
	
	    var isDataView = function(obj) {
	      return obj && DataView.prototype.isPrototypeOf(obj)
	    }
	
	    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
	      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
	    }
	  }
	
	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }
	
	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }
	
	  // Build a destructive iterator for the value list
	  function iteratorFor(items) {
	    var iterator = {
	      next: function() {
	        var value = items.shift()
	        return {done: value === undefined, value: value}
	      }
	    }
	
	    if (support.iterable) {
	      iterator[Symbol.iterator] = function() {
	        return iterator
	      }
	    }
	
	    return iterator
	  }
	
	  function Headers(headers) {
	    this.map = {}
	
	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)
	
	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }
	
	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var oldValue = this.map[name]
	    this.map[name] = oldValue ? oldValue+','+value : value
	  }
	
	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }
	
	  Headers.prototype.get = function(name) {
	    name = normalizeName(name)
	    return this.has(name) ? this.map[name] : null
	  }
	
	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }
	
	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = normalizeValue(value)
	  }
	
	  Headers.prototype.forEach = function(callback, thisArg) {
	    for (var name in this.map) {
	      if (this.map.hasOwnProperty(name)) {
	        callback.call(thisArg, this.map[name], name, this)
	      }
	    }
	  }
	
	  Headers.prototype.keys = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push(name) })
	    return iteratorFor(items)
	  }
	
	  Headers.prototype.values = function() {
	    var items = []
	    this.forEach(function(value) { items.push(value) })
	    return iteratorFor(items)
	  }
	
	  Headers.prototype.entries = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push([name, value]) })
	    return iteratorFor(items)
	  }
	
	  if (support.iterable) {
	    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
	  }
	
	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }
	
	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }
	
	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    var promise = fileReaderReady(reader)
	    reader.readAsArrayBuffer(blob)
	    return promise
	  }
	
	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    var promise = fileReaderReady(reader)
	    reader.readAsText(blob)
	    return promise
	  }
	
	  function readArrayBufferAsText(buf) {
	    var view = new Uint8Array(buf)
	    var chars = new Array(view.length)
	
	    for (var i = 0; i < view.length; i++) {
	      chars[i] = String.fromCharCode(view[i])
	    }
	    return chars.join('')
	  }
	
	  function bufferClone(buf) {
	    if (buf.slice) {
	      return buf.slice(0)
	    } else {
	      var view = new Uint8Array(buf.byteLength)
	      view.set(new Uint8Array(buf))
	      return view.buffer
	    }
	  }
	
	  function Body() {
	    this.bodyUsed = false
	
	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (!body) {
	        this._bodyText = ''
	      } else if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString()
	      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
	        this._bodyArrayBuffer = bufferClone(body.buffer)
	        // IE 10-11 can't handle a DataView body.
	        this._bodyInit = new Blob([this._bodyArrayBuffer])
	      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
	        this._bodyArrayBuffer = bufferClone(body)
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }
	
	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8')
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type)
	        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
	        }
	      }
	    }
	
	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }
	
	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyArrayBuffer) {
	          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }
	
	      this.arrayBuffer = function() {
	        if (this._bodyArrayBuffer) {
	          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
	        } else {
	          return this.blob().then(readBlobAsArrayBuffer)
	        }
	      }
	    }
	
	    this.text = function() {
	      var rejected = consumed(this)
	      if (rejected) {
	        return rejected
	      }
	
	      if (this._bodyBlob) {
	        return readBlobAsText(this._bodyBlob)
	      } else if (this._bodyArrayBuffer) {
	        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
	      } else if (this._bodyFormData) {
	        throw new Error('could not read FormData body as text')
	      } else {
	        return Promise.resolve(this._bodyText)
	      }
	    }
	
	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }
	
	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }
	
	    return this
	  }
	
	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']
	
	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }
	
	  function Request(input, options) {
	    options = options || {}
	    var body = options.body
	
	    if (typeof input === 'string') {
	      this.url = input
	    } else {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body && input._bodyInit != null) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    }
	
	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null
	
	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body)
	  }
	
	  Request.prototype.clone = function() {
	    return new Request(this, { body: this._bodyInit })
	  }
	
	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }
	
	  function parseHeaders(rawHeaders) {
	    var headers = new Headers()
	    rawHeaders.split('\r\n').forEach(function(line) {
	      var parts = line.split(':')
	      var key = parts.shift().trim()
	      if (key) {
	        var value = parts.join(':').trim()
	        headers.append(key, value)
	      }
	    })
	    return headers
	  }
	
	  Body.call(Request.prototype)
	
	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }
	
	    this.type = 'default'
	    this.status = 'status' in options ? options.status : 200
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = 'statusText' in options ? options.statusText : 'OK'
	    this.headers = new Headers(options.headers)
	    this.url = options.url || ''
	    this._initBody(bodyInit)
	  }
	
	  Body.call(Response.prototype)
	
	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  }
	
	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''})
	    response.type = 'error'
	    return response
	  }
	
	  var redirectStatuses = [301, 302, 303, 307, 308]
	
	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }
	
	    return new Response(null, {status: status, headers: {location: url}})
	  }
	
	  self.Headers = Headers
	  self.Request = Request
	  self.Response = Response
	
	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request = new Request(input, init)
	      var xhr = new XMLHttpRequest()
	
	      xhr.onload = function() {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
	        }
	        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
	        var body = 'response' in xhr ? xhr.response : xhr.responseText
	        resolve(new Response(body, options))
	      }
	
	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }
	
	      xhr.ontimeout = function() {
	        reject(new TypeError('Network request failed'))
	      }
	
	      xhr.open(request.method, request.url, true)
	
	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }
	
	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }
	
	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })
	
	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})(typeof self !== 'undefined' ? self : this);


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global fetch */
	
	var _utils = __webpack_require__(4);
	
	var _auth_storage = __webpack_require__(5);
	
	var _auth_v = __webpack_require__(6);
	
	var _auth_v2 = __webpack_require__(7);
	
	var auth = _interopRequireWildcard(_auth_v2);
	
	var _data = __webpack_require__(10);
	
	var data = _interopRequireWildcard(_data);
	
	var _mango = __webpack_require__(12);
	
	var mango = _interopRequireWildcard(_mango);
	
	var _files = __webpack_require__(13);
	
	var files = _interopRequireWildcard(_files);
	
	var _offline = __webpack_require__(14);
	
	var offline = _interopRequireWildcard(_offline);
	
	var _settings = __webpack_require__(17);
	
	var settings = _interopRequireWildcard(_settings);
	
	var _relations = __webpack_require__(18);
	
	var relations = _interopRequireWildcard(_relations);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var AppTokenV3 = auth.AppToken,
	    AccessTokenV3 = auth.AccessToken,
	    ClientV3 = auth.Client;
	
	
	var AuthNone = 0;
	var AuthRunning = 1;
	var AuthError = 2;
	var AuthOK = 3;
	
	var defaultClientParams = {
	  softwareID: 'github.com/cozy/cozy-client-js'
	};
	
	var dataProto = {
	  create: data.create,
	  find: data.find,
	  update: data.update,
	  delete: data._delete,
	  updateAttributes: data.updateAttributes,
	  changesFeed: data.changesFeed,
	  defineIndex: mango.defineIndex,
	  query: mango.query,
	  addReferencedFiles: relations.addReferencedFiles,
	  listReferencedFiles: relations.listReferencedFiles,
	  destroy: function destroy() {
	    (0, _utils.warn)('destroy is deprecated, use cozy.data.delete instead.');
	    return data._delete.apply(data, arguments);
	  }
	};
	
	var authProto = {
	  client: auth.client,
	  registerClient: auth.registerClient,
	  updateClient: auth.updateClient,
	  unregisterClient: auth.unregisterClient,
	  getClient: auth.getClient,
	  getAuthCodeURL: auth.getAuthCodeURL,
	  getAccessToken: auth.getAccessToken,
	  refreshToken: auth.refreshToken
	};
	
	var filesProto = {
	  create: files.create,
	  createDirectory: files.createDirectory,
	  updateById: files.updateById,
	  updateAttributesById: files.updateAttributesById,
	  updateAttributesByPath: files.updateAttributesByPath,
	  trashById: files.trashById,
	  statById: files.statById,
	  statByPath: files.statByPath,
	  downloadById: files.downloadById,
	  downloadByPath: files.downloadByPath,
	  getDowloadLink: files.getDowloadLink,
	  getArchiveLink: files.getArchiveLink,
	  listTrash: files.listTrash,
	  clearTrash: files.clearTrash,
	  restoreById: files.restoreById,
	  destroyById: files.destroyById
	};
	
	var offlineProto = {
	  init: offline.init,
	  getDoctypes: offline.getDoctypes,
	  // database
	  createDatabase: offline.createDatabase,
	  hasDatabase: offline.hasDatabase,
	  getDatabase: offline.getDatabase,
	  destroyDatabase: offline.destroyDatabase,
	  // replication
	  replicateFromCozy: offline.replicateFromCozy,
	  hasSync: offline.hasSync,
	  startAllSync: offline.startAllSync,
	  startSync: offline.startSync,
	  stopAllSync: offline.stopAllSync,
	  stopSync: offline.stopSync
	};
	
	var settingsProto = {
	  diskUsage: settings.diskUsage,
	  changePassphrase: settings.changePassphrase,
	  getInstance: settings.getInstance,
	  updateInstance: settings.updateInstance,
	  getClients: settings.getClients,
	  deleteClientById: settings.deleteClientById
	};
	
	var Client = function () {
	  function Client(options) {
	    _classCallCheck(this, Client);
	
	    this.data = {};
	    this.files = {};
	    this.offline = {};
	    this.settings = {};
	    this.auth = {
	      Client: ClientV3,
	      AccessToken: AccessTokenV3,
	      AppToken: AppTokenV3,
	      AppTokenV2: _auth_v.AppToken,
	      LocalStorage: _auth_storage.LocalStorage,
	      MemoryStorage: _auth_storage.MemoryStorage
	    };
	    this._inited = false;
	    if (options) {
	      this.init(options);
	    }
	  }
	
	  _createClass(Client, [{
	    key: 'init',
	    value: function init() {
	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	      this._inited = true;
	      this._oauth = false; // is oauth activated or not
	      this._token = null; // application token
	      this._authstate = AuthNone;
	      this._authcreds = null;
	      this._storage = null;
	      this._version = null;
	      this._offline = null;
	
	      var token = options.token;
	      var oauth = options.oauth;
	      if (token && oauth) {
	        throw new Error('Cannot specify an application token with a oauth activated');
	      }
	
	      if (token) {
	        this._token = new AppTokenV3({ token: token });
	      } else if (oauth) {
	        this._oauth = true;
	        this._storage = oauth.storage;
	        this._clientParams = Object.assign({}, defaultClientParams, oauth.clientParams);
	        this._onRegistered = oauth.onRegistered || nopOnRegistered;
	      }
	
	      var url = options.cozyURL || '';
	      while (url[url.length - 1] === '/') {
	        url = url.slice(0, -1);
	      }
	
	      this._url = url;
	
	      var disablePromises = !!options.disablePromises;
	      addToProto(this, this.data, dataProto, disablePromises);
	      addToProto(this, this.auth, authProto, disablePromises);
	      addToProto(this, this.files, filesProto, disablePromises);
	      addToProto(this, this.offline, offlineProto, disablePromises);
	      addToProto(this, this.settings, settingsProto, disablePromises);
	
	      if (options.offline) {
	        this.offline.init(options.offline);
	      }
	    }
	  }, {
	    key: 'authorize',
	    value: function authorize() {
	      var _this = this;
	
	      var state = this._authstate;
	      if (state === AuthOK || state === AuthRunning) {
	        return this._authcreds;
	      }
	
	      this._authstate = AuthRunning;
	      this._authcreds = this.isV2().then(function (isV2) {
	        if (isV2 && _this._oauth) {
	          throw new Error('OAuth is not supported on the V2 stack');
	        }
	        if (_this._oauth) {
	          return auth.oauthFlow(_this, _this._storage, _this._clientParams, _this._onRegistered);
	        }
	        // we expect to be on a client side application running in a browser
	        // with cookie-based authentication.
	        if (isV2) {
	          return (0, _auth_v.getAppToken)();
	        } else if (_this._token) {
	          return Promise.resolve({ client: null, token: _this._token });
	        } else {
	          throw new Error('Missing application token');
	        }
	      });
	
	      this._authcreds.then(function () {
	        _this._authstate = AuthOK;
	      }, function () {
	        _this._authstate = AuthError;
	      });
	
	      return this._authcreds;
	    }
	  }, {
	    key: 'saveCredentials',
	    value: function saveCredentials(client, token) {
	      var creds = { client: client, token: token };
	      if (!this._storage || this._authstate === AuthRunning) {
	        return Promise.resolve(creds);
	      }
	      this._storage.save(auth.CredsKey, creds);
	      this._authcreds = Promise.resolve(creds);
	      return this._authcreds;
	    }
	  }, {
	    key: 'fullpath',
	    value: function fullpath(path) {
	      var _this2 = this;
	
	      return this.isV2().then(function (isV2) {
	        var pathprefix = isV2 ? '/ds-api' : '';
	        return _this2._url + pathprefix + path;
	      });
	    }
	  }, {
	    key: 'isV2',
	    value: function isV2() {
	      var _this3 = this;
	
	      if (!this._version) {
	        this._version = (0, _utils.retry)(function () {
	          return fetch(_this3._url + '/status/');
	        }, 3)().then(function (res) {
	          if (!res.ok) {
	            throw new Error('Could not fetch cozy status');
	          } else {
	            return res.json();
	          }
	        }).then(function (status) {
	          return status.datasystem !== undefined;
	        });
	      }
	      return this._version;
	    }
	  }]);
	
	  return Client;
	}();
	
	function nopOnRegistered() {
	  throw new Error('Missing onRegistered callback');
	}
	
	function protoify(context, fn) {
	  return function prototyped() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return fn.apply(undefined, [context].concat(args));
	  };
	}
	
	function addToProto(ctx, obj, proto, disablePromises) {
	  for (var attr in proto) {
	    var fn = protoify(ctx, proto[attr]);
	    if (disablePromises) {
	      fn = (0, _utils.unpromiser)(fn);
	    }
	    obj[attr] = fn;
	  }
	}
	
	module.exports = new Client();
	Object.assign(module.exports, { Client: Client, LocalStorage: _auth_storage.LocalStorage, MemoryStorage: _auth_storage.MemoryStorage });

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.unpromiser = unpromiser;
	exports.isPromise = isPromise;
	exports.sleep = sleep;
	exports.retry = retry;
	exports.getFuzzedDelay = getFuzzedDelay;
	exports.getBackedoffDelay = getBackedoffDelay;
	exports.createPath = createPath;
	exports.encodeQuery = encodeQuery;
	exports.decodeQuery = decodeQuery;
	exports.warn = warn;
	var FuzzFactor = 0.3;
	
	function unpromiser(fn) {
	  return function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    var value = fn.apply(this, args);
	    if (!isPromise(value)) {
	      return value;
	    }
	    var l = args.length;
	    if (l === 0 || typeof args[l - 1] !== 'function') {
	      return;
	    }
	    var cb = args[l - 1];
	    value.then(function (res) {
	      return cb(null, res);
	    }, function (err) {
	      return cb(err, null);
	    });
	    return;
	  };
	}
	
	function isPromise(value) {
	  return !!value && typeof value.then === 'function';
	}
	
	function sleep(time, args) {
	  return new Promise(function (resolve) {
	    setTimeout(resolve, time, args);
	  });
	}
	
	function retry(fn, count) {
	  var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 300;
	
	  return function doTry() {
	    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }
	
	    return fn.apply(undefined, args).catch(function (err) {
	      if (--count < 0) {
	        throw err;
	      }
	      return sleep(getBackedoffDelay(delay, count)).then(function () {
	        return doTry.apply(undefined, args);
	      });
	    });
	  };
	}
	
	function getFuzzedDelay(retryDelay) {
	  var fuzzingFactor = (Math.random() * 2 - 1) * FuzzFactor;
	  return retryDelay * (1.0 + fuzzingFactor);
	}
	
	function getBackedoffDelay(retryDelay) {
	  var retryCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	
	  return getFuzzedDelay(retryDelay * Math.pow(2, retryCount - 1));
	}
	
	function createPath(cozy, isV2, doctype) {
	  var id = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
	  var query = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
	
	  var route = '/data/';
	  if (!isV2) {
	    route += encodeURIComponent(doctype) + '/';
	  }
	  if (id !== '') {
	    route += encodeURIComponent(id);
	  }
	  var q = encodeQuery(query);
	  if (q !== '') {
	    route += '?' + q;
	  }
	  return route;
	}
	
	function encodeQuery(query) {
	  if (!query) {
	    return '';
	  }
	  var q = '';
	  for (var qname in query) {
	    if (q !== '') {
	      q += '&';
	    }
	    q += encodeURIComponent(qname) + '=' + encodeURIComponent(query[qname]);
	  }
	  return q;
	}
	
	function decodeQuery(url) {
	  var queryIndex = url.indexOf('?');
	  if (queryIndex < 0) {
	    queryIndex = url.length;
	  }
	  var queries = {};
	  var fragIndex = url.indexOf('#');
	  if (fragIndex < 0) {
	    fragIndex = url.length;
	  }
	  if (fragIndex < queryIndex) {
	    return queries;
	  }
	  var queryStr = url.slice(queryIndex + 1, fragIndex);
	  if (queryStr === '') {
	    return queries;
	  }
	  var parts = queryStr.split('&');
	  for (var i = 0; i < parts.length; i++) {
	    var pair = parts[i].split('=');
	    if (pair.length === 0 || pair[0] === '') {
	      continue;
	    }
	    var qname = decodeURIComponent(pair[0]);
	    if (queries.hasOwnProperty(qname)) {
	      continue;
	    }
	    if (pair.length === 1) {
	      queries[qname] = true;
	    } else if (pair.length === 2) {
	      queries[qname] = decodeURIComponent(pair[1]);
	    } else {
	      throw new Error('Malformed URL');
	    }
	  }
	  return queries;
	}
	
	var warned = [];
	function warn(text) {
	  if (warned.indexOf(text) === -1) {
	    warned.push(text);
	    console.warn('cozy-client-js', text);
	  }
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LocalStorage = exports.LocalStorage = function () {
	  function LocalStorage(storage, prefix) {
	    _classCallCheck(this, LocalStorage);
	
	    if (!storage && typeof window !== 'undefined') {
	      storage = window.localStorage;
	    }
	    this.storage = storage;
	    this.prefix = prefix || 'cozy:oauth:';
	  }
	
	  _createClass(LocalStorage, [{
	    key: 'save',
	    value: function save(key, value) {
	      var _this = this;
	
	      return new Promise(function (resolve) {
	        _this.storage.setItem(_this.prefix + key, JSON.stringify(value));
	        resolve(value);
	      });
	    }
	  }, {
	    key: 'load',
	    value: function load(key) {
	      var _this2 = this;
	
	      return new Promise(function (resolve) {
	        var item = _this2.storage.getItem(_this2.prefix + key);
	        if (!item) {
	          resolve();
	        } else {
	          resolve(JSON.parse(item));
	        }
	      });
	    }
	  }, {
	    key: 'delete',
	    value: function _delete(key) {
	      var _this3 = this;
	
	      return new Promise(function (resolve) {
	        return resolve(_this3.storage.removeItem(_this3.prefix + key));
	      });
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      var _this4 = this;
	
	      return new Promise(function (resolve) {
	        var storage = _this4.storage;
	        for (var i = 0; i < storage.length; i++) {
	          var key = storage.key(i);
	          if (key.indexOf(_this4.prefix) === 0) {
	            storage.removeItem(key);
	          }
	        }
	        resolve();
	      });
	    }
	  }]);
	
	  return LocalStorage;
	}();
	
	var MemoryStorage = exports.MemoryStorage = function () {
	  function MemoryStorage() {
	    _classCallCheck(this, MemoryStorage);
	
	    this.hash = Object.create(null);
	  }
	
	  _createClass(MemoryStorage, [{
	    key: 'save',
	    value: function save(key, value) {
	      this.hash[key] = value;
	      return Promise.resolve(value);
	    }
	  }, {
	    key: 'load',
	    value: function load(key) {
	      return Promise.resolve(this.hash[key]);
	    }
	  }, {
	    key: 'delete',
	    value: function _delete(key) {
	      var deleted = delete this.hash[key];
	      return Promise.resolve(deleted);
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      this.hash = Object.create(null);
	      return Promise.resolve();
	    }
	  }]);

	  return MemoryStorage;
	}();

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.getAppToken = getAppToken;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/* global btoa */
	var V2TOKEN_ABORT_TIMEOUT = 3000;
	
	function getAppToken() {
	  return new Promise(function (resolve, reject) {
	    if (typeof window === 'undefined') {
	      return reject(new Error('getV2Token should be used in browser'));
	    } else if (!window.parent) {
	      return reject(new Error('getV2Token should be used in iframe'));
	    } else if (!window.parent.postMessage) {
	      return reject(new Error('getV2Token should be used in modern browser'));
	    }
	    var origin = window.location.origin;
	    var intent = { action: 'getToken' };
	    var timeout = null;
	    var receiver = function receiver(event) {
	      var token = void 0;
	      try {
	        token = new AppToken({
	          appName: event.data.appName,
	          token: event.data.token
	        });
	      } catch (e) {
	        reject(e);
	        return;
	      }
	      window.removeEventListener('message', receiver);
	      clearTimeout(timeout);
	      resolve({ client: null, token: token });
	    };
	    window.addEventListener('message', receiver, false);
	    window.parent.postMessage(intent, origin);
	    timeout = setTimeout(function () {
	      reject(new Error('No response from parent iframe after 3s'));
	    }, V2TOKEN_ABORT_TIMEOUT);
	  });
	}
	
	var AppToken = exports.AppToken = function () {
	  function AppToken(opts) {
	    _classCallCheck(this, AppToken);
	
	    this.appName = opts.appName || '';
	    this.token = opts.token || '';
	  }
	
	  _createClass(AppToken, [{
	    key: 'toAuthHeader',
	    value: function toAuthHeader() {
	      return 'Basic ' + btoa(this.appName + ':' + this.token);
	    }
	  }]);

	  return AppToken;
	}();

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.AppToken = exports.AccessToken = exports.Client = exports.StateKey = exports.CredsKey = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global btoa */
	
	
	exports.client = client;
	exports.registerClient = registerClient;
	exports.updateClient = updateClient;
	exports.unregisterClient = unregisterClient;
	exports.getClient = getClient;
	exports.getAuthCodeURL = getAuthCodeURL;
	exports.getAccessToken = getAccessToken;
	exports.refreshToken = refreshToken;
	exports.oauthFlow = oauthFlow;
	
	var _utils = __webpack_require__(4);
	
	var _fetch = __webpack_require__(8);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var StateSize = 16;
	
	var CredsKey = exports.CredsKey = 'creds';
	var StateKey = exports.StateKey = 'state';
	
	var Client = exports.Client = function () {
	  function Client(opts) {
	    _classCallCheck(this, Client);
	
	    this.clientID = opts.clientID || opts.client_id || '';
	    this.clientSecret = opts.clientSecret || opts.client_secret || '';
	    this.registrationAccessToken = opts.registrationAccessToken || opts.registration_access_token || '';
	
	    if (opts.redirect_uris) {
	      this.redirectURI = opts.redirect_uris[0] || '';
	    } else {
	      this.redirectURI = opts.redirectURI || '';
	    }
	
	    this.softwareID = opts.softwareID || opts.software_id || '';
	    this.softwareVersion = opts.softwareVersion || opts.software_version || '';
	    this.clientName = opts.clientName || opts.client_name || '';
	    this.clientKind = opts.clientKind || opts.client_kind || '';
	    this.clientURI = opts.clientURI || opts.client_uri || '';
	
	    this.logoURI = opts.logoURI || opts.logo_uri || '';
	    this.policyURI = opts.policyURI || opts.policy_uri || '';
	
	    if (!this.registrationAccessToken) {
	      if (this.redirectURI === '') {
	        throw new Error('Missing redirectURI field');
	      }
	      if (this.softwareID === '') {
	        throw new Error('Missing softwareID field');
	      }
	      if (this.clientName === '') {
	        throw new Error('Missing clientName field');
	      }
	    }
	  }
	
	  _createClass(Client, [{
	    key: 'isRegistered',
	    value: function isRegistered() {
	      return this.clientID !== '';
	    }
	  }, {
	    key: 'toRegisterJSON',
	    value: function toRegisterJSON() {
	      return {
	        redirect_uris: [this.redirectURI],
	        software_id: this.softwareID,
	        software_version: this.softwareVersion,
	        client_name: this.clientName,
	        client_kind: this.clientKind,
	        client_uri: this.clientURI,
	        logo_uri: this.logoURI,
	        policy_uri: this.policyURI
	      };
	    }
	  }, {
	    key: 'toAuthHeader',
	    value: function toAuthHeader() {
	      return 'Bearer ' + this.registrationAccessToken;
	    }
	  }]);
	
	  return Client;
	}();
	
	var AccessToken = exports.AccessToken = function () {
	  function AccessToken(opts) {
	    _classCallCheck(this, AccessToken);
	
	    this.tokenType = opts.tokenType || opts.token_type;
	    this.accessToken = opts.accessToken || opts.access_token;
	    this.refreshToken = opts.refreshToken || opts.refresh_token;
	    this.scope = opts.scope;
	  }
	
	  _createClass(AccessToken, [{
	    key: 'toAuthHeader',
	    value: function toAuthHeader() {
	      return 'Bearer ' + this.accessToken;
	    }
	  }, {
	    key: 'toBasicAuth',
	    value: function toBasicAuth() {
	      return 'user:' + this.accessToken + '@';
	    }
	  }]);
	
	  return AccessToken;
	}();
	
	var AppToken = exports.AppToken = function () {
	  function AppToken(opts) {
	    _classCallCheck(this, AppToken);
	
	    this.token = opts.token || '';
	  }
	
	  _createClass(AppToken, [{
	    key: 'toAuthHeader',
	    value: function toAuthHeader() {
	      return 'Bearer ' + this.token;
	    }
	  }, {
	    key: 'toBasicAuth',
	    value: function toBasicAuth() {
	      return 'user:' + this.token + '@';
	    }
	  }]);
	
	  return AppToken;
	}();
	
	function client(cozy, clientParams) {
	  if (!clientParams) {
	    clientParams = cozy._clientParams;
	  }
	  if (clientParams instanceof Client) {
	    return clientParams;
	  }
	  return new Client(clientParams);
	}
	
	function registerClient(cozy, clientParams) {
	  var cli = client(cozy, clientParams);
	  if (cli.isRegistered()) {
	    return Promise.reject(new Error('Client already registered'));
	  }
	  return (0, _fetch.cozyFetchJSON)(cozy, 'POST', '/auth/register', cli.toRegisterJSON(), {
	    disableAuth: true
	  }).then(function (data) {
	    return new Client(data);
	  });
	}
	
	function updateClient(cozy, clientParams) {
	  var resetSecret = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	
	  var cli = client(cozy, clientParams);
	  if (!cli.isRegistered()) {
	    return Promise.reject(new Error('Client not registered'));
	  }
	  var data = cli.toRegisterJSON();
	  data.client_id = cli.clientID;
	  if (resetSecret) data.client_secret = cli.clientSecret;
	
	  return (0, _fetch.cozyFetchJSON)(cozy, 'PUT', '/auth/register/' + cli.clientID, data, {
	    manualAuthCredentials: {
	      token: cli
	    }
	  }).then(function (data) {
	    return createClient(data, cli);
	  });
	}
	
	function unregisterClient(cozy, clientParams) {
	  var cli = client(cozy, clientParams);
	  if (!cli.isRegistered()) {
	    return Promise.reject(new Error('Client not registered'));
	  }
	  return (0, _fetch.cozyFetchJSON)(cozy, 'DELETE', '/auth/register/' + cli.clientID, null, {
	    manualAuthCredentials: {
	      token: cli
	    }
	  });
	}
	
	// getClient will retrive the registered client informations from the server.
	function getClient(cozy, clientParams) {
	  var cli = client(cozy, clientParams);
	  if (!cli.isRegistered()) {
	    return Promise.reject(new Error('Client not registered'));
	  }
	  return (0, _fetch.cozyFetchJSON)(cozy, 'GET', '/auth/register/' + cli.clientID, null, {
	    manualAuthCredentials: {
	      token: cli
	    }
	  }).then(function (data) {
	    return createClient(data, cli);
	  });
	}
	
	// createClient returns a new Client instance given on object containing the
	// data of the client, from the API, and an old instance of the client.
	function createClient(data, oldClient) {
	  var newClient = new Client(data);
	  // we need to keep track of the registrationAccessToken since it is send
	  // only on registration. The GET /auth/register/:client-id endpoint does
	  // not return this token.
	  var shouldPassRegistration = !!oldClient && oldClient.registrationAccessToken !== '' && newClient.registrationAccessToken === '';
	  if (shouldPassRegistration) {
	    newClient.registrationAccessToken = oldClient.registrationAccessToken;
	  }
	  return newClient;
	}
	
	// getAuthCodeURL returns a pair {authURL,state} given a registered client. The
	// state should be stored in order to be checked against on the user validation
	// phase.
	function getAuthCodeURL(cozy, client) {
	  var scopes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
	
	  if (!(client instanceof Client)) {
	    client = new Client(client);
	  }
	  if (!client.isRegistered()) {
	    throw new Error('Client not registered');
	  }
	  var state = generateRandomState();
	  var query = {
	    'client_id': client.clientID,
	    'redirect_uri': client.redirectURI,
	    'state': state,
	    'response_type': 'code',
	    'scope': scopes.join(' ')
	  };
	  return {
	    url: cozy._url + ('/auth/authorize?' + (0, _utils.encodeQuery)(query)),
	    state: state
	  };
	}
	
	// getAccessToken perform a request on the access_token entrypoint with the
	// authorization_code grant type in order to generate a new access token for a
	// newly registered client.
	//
	// This method extracts the access code and state from the given URL. By
	// default it uses window.location.href. Also, it checks the given state with
	// the one specified in the URL query parameter to prevent CSRF attacks.
	function getAccessToken(cozy, client, state) {
	  var pageURL = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
	
	  if (!state) {
	    return Promise.reject(new Error('Missing state value'));
	  }
	  var grantQueries = getGrantCodeFromPageURL(pageURL);
	  if (grantQueries === null) {
	    return Promise.reject(new Error('Missing states from current URL'));
	  }
	  if (state !== grantQueries.state) {
	    return Promise.reject(new Error('Given state does not match url query state'));
	  }
	  return retrieveToken(cozy, client, null, {
	    'grant_type': 'authorization_code',
	    'code': grantQueries.code
	  });
	}
	
	// refreshToken perform a request on the access_token entrypoint with the
	// refresh_token grant type in order to refresh the given token.
	function refreshToken(cozy, client, token) {
	  return retrieveToken(cozy, client, token, {
	    'grant_type': 'refresh_token',
	    'refresh_token': token.refreshToken
	  });
	}
	
	// oauthFlow performs the stateful registration and access granting of an OAuth
	// client.
	function oauthFlow(cozy, storage, clientParams, onRegistered) {
	  var tryCount = 0;
	
	  function clearAndRetry(err) {
	    if (tryCount++ > 0) {
	      throw err;
	    }
	    return storage.clear().then(function () {
	      return oauthFlow(cozy, storage, clientParams, onRegistered);
	    });
	  }
	
	  function registerNewClient() {
	    return storage.clear().then(function () {
	      return registerClient(cozy, clientParams);
	    }).then(function (client) {
	      var _getAuthCodeURL = getAuthCodeURL(cozy, client, clientParams.scopes),
	          url = _getAuthCodeURL.url,
	          state = _getAuthCodeURL.state;
	
	      return storage.save(StateKey, { client: client, url: url, state: state });
	    });
	  }
	
	  return Promise.all([storage.load(CredsKey), storage.load(StateKey)]).then(function (_ref) {
	    var _ref2 = _slicedToArray(_ref, 2),
	        credentials = _ref2[0],
	        storedState = _ref2[1];
	
	    // If credentials are cached we re-fetch the registered client with the
	    // said token. Fetching the client, if the token is outdated we should try
	    // the token is refreshed.
	    if (credentials) {
	      var _ret = function () {
	        var oldClient = void 0,
	            token = void 0;
	        try {
	          oldClient = new Client(credentials.client);
	          token = new AccessToken(credentials.token);
	        } catch (err) {
	          // bad cache, we should clear and retry the process
	          return {
	            v: clearAndRetry(err)
	          };
	        }
	        return {
	          v: getClient(cozy, oldClient).then(function (client) {
	            return { client: client, token: token };
	          }).catch(function (err) {
	            // If we fall into an error while fetching the client (because of a
	            // bad connectivity for instance), we do not bail the whole process
	            // since the client should be able to continue with the persisted
	            // client and token.
	            //
	            // If it is an explicit Unauthorized error though, we bail, clear th
	            // cache and retry.
	            if (_fetch.FetchError.isUnauthorized(err)) {
	              throw err;
	            }
	            return { client: oldClient, token: token };
	          })
	        };
	      }();
	
	      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	    }
	
	    // Otherwise register a new client if necessary (ie. no client is stored)
	    // and call the onRegistered callback to wait for the user to grant the
	    // access. Finally fetches to access token on success.
	    var statePromise = void 0;
	    if (!storedState) {
	      statePromise = registerNewClient();
	    } else {
	      statePromise = Promise.resolve(storedState);
	    }
	
	    var client = void 0,
	        state = void 0,
	        token = void 0;
	    return statePromise.then(function (data) {
	      client = data.client;
	      state = data.state;
	      return Promise.resolve(onRegistered(client, data.url));
	    }).then(function (pageURL) {
	      return getAccessToken(cozy, client, state, pageURL);
	    }).then(function (t) {
	      token = t;
	    }).then(function () {
	      return storage.delete(StateKey);
	    }).then(function () {
	      return { client: client, token: token };
	    });
	  }).then(function (creds) {
	    return storage.save(CredsKey, creds);
	  }, function (err) {
	    if (_fetch.FetchError.isUnauthorized(err)) {
	      return clearAndRetry(err);
	    } else {
	      throw err;
	    }
	  });
	}
	
	// retrieveToken perform a request on the access_token entrypoint in order to
	// fetch a token.
	function retrieveToken(cozy, client, token, query) {
	  if (!(client instanceof Client)) {
	    client = new Client(client);
	  }
	  if (!client.isRegistered()) {
	    return Promise.reject(new Error('Client not registered'));
	  }
	  var body = (0, _utils.encodeQuery)(Object.assign({}, query, {
	    'client_id': client.clientID,
	    'client_secret': client.clientSecret
	  }));
	  return (0, _fetch.cozyFetchJSON)(cozy, 'POST', '/auth/access_token', body, {
	    disableAuth: token === null,
	    manualAuthCredentials: { client: client, token: token },
	    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
	  }).then(function (data) {
	    data.refreshToken = data.refreshToken || query.refresh_token;
	    return new AccessToken(data);
	  });
	}
	
	// getGrantCodeFromPageURL extract the state and access_code query parameters
	// from the given url
	function getGrantCodeFromPageURL() {
	  var pageURL = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	  if (pageURL === '' && typeof window !== 'undefined') {
	    pageURL = window.location.href;
	  }
	  var queries = (0, _utils.decodeQuery)(pageURL);
	  if (!queries.hasOwnProperty('state')) {
	    return null;
	  }
	  return {
	    state: queries['state'],
	    code: queries['access_code']
	  };
	}
	
	// generateRandomState will try to generate a 128bits random value from a secure
	// pseudo random generator. It will fallback on Math.random if it cannot find
	// such generator.
	function generateRandomState() {
	  var buffer = void 0;
	  if (typeof window !== 'undefined' && typeof window.crypto !== 'undefined' && typeof window.crypto.getRandomValues === 'function') {
	    buffer = new Uint8Array(StateSize);
	    window.crypto.getRandomValues(buffer);
	  } else {
	    try {
	      buffer = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"crypto\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).randomBytes(StateSize);
	    } catch (e) {}
	  }
	  if (!buffer) {
	    buffer = new Array(StateSize);
	    for (var i = 0; i < buffer.length; i++) {
	      buffer[i] = Math.floor(Math.random() * 255);
	    }
	  }
	  return btoa(String.fromCharCode.apply(null, buffer)).replace(/=+$/, '').replace(/\//g, '_').replace(/\+/g, '-');
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.FetchError = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* global fetch */
	
	
	exports.cozyFetch = cozyFetch;
	exports.cozyFetchJSON = cozyFetchJSON;
	
	var _auth_v = __webpack_require__(7);
	
	var _utils = __webpack_require__(4);
	
	var _jsonapi = __webpack_require__(9);
	
	var _jsonapi2 = _interopRequireDefault(_jsonapi);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function cozyFetch(cozy, path) {
	  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
	  return cozy.fullpath(path).then(function (fullpath) {
	    var resp = void 0;
	    if (options.disableAuth) {
	      resp = fetch(fullpath, options);
	    } else if (options.manualAuthCredentials) {
	      resp = cozyFetchWithAuth(cozy, fullpath, options, options.manualAuthCredentials);
	    } else {
	      resp = cozy.authorize().then(function (credentials) {
	        return cozyFetchWithAuth(cozy, fullpath, options, credentials);
	      });
	    }
	    return resp.then(handleResponse);
	  });
	}
	
	function cozyFetchWithAuth(cozy, fullpath, options, credentials) {
	  if (credentials) {
	    options.headers = options.headers || {};
	    options.headers['Authorization'] = credentials.token.toAuthHeader();
	  }
	
	  // the option credentials:include tells fetch to include the cookies in the
	  // request even for cross-origin requests
	  options.credentials = 'include';
	
	  return Promise.all([cozy.isV2(), fetch(fullpath, options)]).then(function (_ref) {
	    var _ref2 = _slicedToArray(_ref, 2),
	        isV2 = _ref2[0],
	        res = _ref2[1];
	
	    if (res.status !== 401 || isV2 || !credentials) {
	      return res;
	    }
	    // we try to refresh the token only for OAuth, ie, the client defined
	    // and the token is an instance of AccessToken.
	    var client = credentials.client,
	        token = credentials.token;
	
	    if (!client || !(token instanceof _auth_v.AccessToken)) {
	      return res;
	    }
	    return (0, _utils.retry)(function () {
	      return (0, _auth_v.refreshToken)(cozy, client, token);
	    }, 3)().then(function (newToken) {
	      return cozy.saveCredentials(client, newToken);
	    }).then(function (credentials) {
	      return cozyFetchWithAuth(cozy, fullpath, options, credentials);
	    });
	  });
	}
	
	function cozyFetchJSON(cozy, method, path, body) {
	  var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
	
	  options.method = method;
	
	  var headers = options.headers = options.headers || {};
	
	  headers['Accept'] = 'application/json';
	
	  if (method !== 'GET' && method !== 'HEAD' && body !== undefined) {
	    if (headers['Content-Type']) {
	      options.body = body;
	    } else {
	      headers['Content-Type'] = 'application/json';
	      options.body = JSON.stringify(body);
	    }
	  }
	
	  return cozyFetch(cozy, path, options).then(handleJSONResponse);
	}
	
	function handleResponse(res) {
	  if (res.ok) {
	    return res;
	  }
	  var data = void 0;
	  var contentType = res.headers.get('content-type');
	  if (contentType && contentType.indexOf('json') >= 0) {
	    data = res.json();
	  } else {
	    data = res.text();
	  }
	  return data.then(function (err) {
	    throw new FetchError(res, err);
	  });
	}
	
	function handleJSONResponse(res) {
	  var contentType = res.headers.get('content-type');
	  if (!contentType || contentType.indexOf('json') < 0) {
	    return res.text(function (data) {
	      throw new FetchError(res, new Error('Response is not JSON: ' + data));
	    });
	  }
	
	  var json = res.json();
	  if (contentType.indexOf('application/vnd.api+json') === 0) {
	    return json.then(_jsonapi2.default);
	  } else {
	    return json;
	  }
	}
	
	var FetchError = exports.FetchError = function () {
	  function FetchError(res, reason) {
	    _classCallCheck(this, FetchError);
	
	    this.response = res;
	    this.url = res.url;
	    this.status = res.status;
	    this.reason = reason;
	  }
	
	  _createClass(FetchError, [{
	    key: 'isUnauthorized',
	    value: function isUnauthorized() {
	      return this.status === 401;
	    }
	  }]);
	
	  return FetchError;
	}();
	
	FetchError.isUnauthorized = function (err) {
	  return err instanceof FetchError && err.isUnauthorized();
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function indexKey(doc) {
	  return doc.type + '/' + doc.id;
	}
	
	function findByRef(resources, ref) {
	  return resources[indexKey(ref)];
	}
	
	function handleResource(rawResource, resources, links) {
	  var resource = {
	    _id: rawResource.id,
	    _type: rawResource.type,
	    _rev: rawResource.meta && rawResource.meta.rev,
	    links: Object.assign({}, rawResource.links, links),
	    attributes: rawResource.attributes,
	    relations: function relations(name) {
	      var rels = rawResource.relationships[name];
	      if (rels === undefined || rels.data === undefined) return undefined;
	      if (rels.data === null) return null;
	      if (!Array.isArray(rels.data)) return findByRef(resources, rels.data);
	      return rels.data.map(function (ref) {
	        return findByRef(resources, ref);
	      });
	    }
	  };
	
	  resources[indexKey(rawResource)] = resource;
	
	  return resource;
	}
	
	function handleTopLevel(doc) {
	  var resources = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	  // build an index of included resource by Type & ID
	  var included = doc.included;
	
	  if (Array.isArray(included)) {
	    included.forEach(function (r) {
	      return handleResource(r, resources, doc.links);
	    });
	  }
	
	  if (Array.isArray(doc.data)) {
	    return doc.data.map(function (r) {
	      return handleResource(r, resources, doc.links);
	    });
	  } else {
	    return handleResource(doc.data, resources, doc.links);
	  }
	}
	
	exports.default = handleTopLevel;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.create = create;
	exports.find = find;
	exports.changesFeed = changesFeed;
	exports.update = update;
	exports.updateAttributes = updateAttributes;
	exports._delete = _delete;
	
	var _utils = __webpack_require__(4);
	
	var _doctypes = __webpack_require__(11);
	
	var _fetch = __webpack_require__(8);
	
	var NOREV = 'stack-v2-no-rev';
	
	function create(cozy, doctype, attributes) {
	  return cozy.isV2().then(function (isV2) {
	    doctype = (0, _doctypes.normalizeDoctype)(cozy, isV2, doctype);
	    if (isV2) {
	      attributes.docType = doctype;
	    }
	    var path = (0, _utils.createPath)(cozy, isV2, doctype);
	    return (0, _fetch.cozyFetchJSON)(cozy, 'POST', path, attributes).then(function (resp) {
	      if (isV2) {
	        return find(cozy, doctype, resp._id);
	      } else {
	        return resp.data;
	      }
	    });
	  });
	}
	
	function find(cozy, doctype, id) {
	  return cozy.isV2().then(function (isV2) {
	    doctype = (0, _doctypes.normalizeDoctype)(cozy, isV2, doctype);
	
	    if (!id) {
	      return Promise.reject(new Error('Missing id parameter'));
	    }
	
	    var path = (0, _utils.createPath)(cozy, isV2, doctype, id);
	    return (0, _fetch.cozyFetchJSON)(cozy, 'GET', path).then(function (resp) {
	      if (isV2) {
	        return Object.assign(resp, { _rev: NOREV });
	      } else {
	        return resp;
	      }
	    });
	  });
	}
	
	function changesFeed(cozy, doctype, options) {
	  return cozy.isV2().then(function (isV2) {
	    doctype = (0, _doctypes.normalizeDoctype)(cozy, isV2, doctype);
	    var path = (0, _utils.createPath)(cozy, isV2, doctype, '_changes', options);
	    return (0, _fetch.cozyFetchJSON)(cozy, 'GET', path);
	  });
	}
	
	function update(cozy, doctype, doc, changes) {
	  return cozy.isV2().then(function (isV2) {
	    doctype = (0, _doctypes.normalizeDoctype)(cozy, isV2, doctype);
	    var _id = doc._id,
	        _rev = doc._rev;
	
	
	    if (!_id) {
	      return Promise.reject(new Error('Missing _id field in passed document'));
	    }
	
	    if (!isV2 && !_rev) {
	      return Promise.reject(new Error('Missing _rev field in passed document'));
	    }
	
	    if (isV2) {
	      changes = Object.assign({ _id: _id }, changes);
	    } else {
	      changes = Object.assign({ _id: _id, _rev: _rev }, changes);
	    }
	
	    var path = (0, _utils.createPath)(cozy, isV2, doctype, _id);
	    return (0, _fetch.cozyFetchJSON)(cozy, 'PUT', path, changes).then(function (resp) {
	      if (isV2) {
	        return find(cozy, doctype, _id);
	      } else {
	        return resp.data;
	      }
	    });
	  });
	}
	
	function updateAttributes(cozy, doctype, _id, changes) {
	  var tries = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 3;
	
	  return cozy.isV2().then(function (isV2) {
	    doctype = (0, _doctypes.normalizeDoctype)(cozy, isV2, doctype);
	    return find(cozy, doctype, _id).then(function (doc) {
	      return update(cozy, doctype, doc, Object.assign({ _id: _id }, doc, changes));
	    }).catch(function (err) {
	      if (tries > 0) {
	        return updateAttributes(cozy, doctype, _id, changes, tries - 1);
	      } else {
	        throw err;
	      }
	    });
	  });
	}
	
	function _delete(cozy, doctype, doc) {
	  return cozy.isV2().then(function (isV2) {
	    doctype = (0, _doctypes.normalizeDoctype)(cozy, isV2, doctype);
	    var _id = doc._id,
	        _rev = doc._rev;
	
	
	    if (!_id) {
	      return Promise.reject(new Error('Missing _id field in passed document'));
	    }
	
	    if (!isV2 && !_rev) {
	      return Promise.reject(new Error('Missing _rev field in passed document'));
	    }
	
	    var query = isV2 ? null : { rev: _rev };
	    var path = (0, _utils.createPath)(cozy, isV2, doctype, _id, query);
	    return (0, _fetch.cozyFetchJSON)(cozy, 'DELETE', path).then(function (resp) {
	      if (isV2) {
	        return { id: _id, rev: NOREV };
	      } else {
	        return resp;
	      }
	    });
	  });
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DOCTYPE_FILES = undefined;
	exports.normalizeDoctype = normalizeDoctype;
	
	var _utils = __webpack_require__(4);
	
	var DOCTYPE_FILES = exports.DOCTYPE_FILES = 'io.cozy.files';
	
	var KNOWN_DOCTYPES = {
	  'files': DOCTYPE_FILES,
	  'folder': DOCTYPE_FILES,
	  'contact': 'io.cozy.contacts',
	  'event': 'io.cozy.events',
	  'track': 'io.cozy.labs.music.track',
	  'playlist': 'io.cozy.labs.music.playlist'
	};
	
	var REVERSE_KNOWN = {};
	Object.keys(KNOWN_DOCTYPES).forEach(function (k) {
	  REVERSE_KNOWN[KNOWN_DOCTYPES[k]] = k;
	});
	
	function normalizeDoctype(cozy, isV2, doctype) {
	  var isQualified = doctype.indexOf('.') !== -1;
	  if (isV2 && isQualified) {
	    var known = REVERSE_KNOWN[doctype];
	    if (known) return known;
	    return doctype.replace(/\./g, '-');
	  }
	  if (!isV2 && !isQualified) {
	    var _known = KNOWN_DOCTYPES[doctype];
	    if (_known) {
	      (0, _utils.warn)('you are using a non-qualified doctype ' + doctype + ' assumed to be ' + _known);
	      return _known;
	    }
	    throw new Error('Doctype ' + doctype + ' should be qualified.');
	  }
	  return doctype;
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.defineIndex = defineIndex;
	exports.query = query;
	exports.parseSelector = parseSelector;
	exports.normalizeSelector = normalizeSelector;
	exports.makeMapReduceQuery = makeMapReduceQuery;
	
	var _utils = __webpack_require__(4);
	
	var _doctypes = __webpack_require__(11);
	
	var _fetch = __webpack_require__(8);
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function defineIndex(cozy, doctype, fields) {
	  return cozy.isV2().then(function (isV2) {
	    doctype = (0, _doctypes.normalizeDoctype)(cozy, isV2, doctype);
	    if (!Array.isArray(fields) || fields.length === 0) {
	      throw new Error('defineIndex fields should be a non-empty array');
	    }
	    if (isV2) {
	      return defineIndexV2(cozy, doctype, fields);
	    } else {
	      return defineIndexV3(cozy, doctype, fields);
	    }
	  });
	}
	
	function query(cozy, indexRef, options) {
	  return cozy.isV2().then(function (isV2) {
	    if (!indexRef) {
	      throw new Error('query should be passed the indexRef');
	    }
	    if (isV2) {
	      return queryV2(cozy, indexRef, options);
	    } else {
	      return queryV3(cozy, indexRef, options);
	    }
	  });
	}
	
	// Internals
	
	var VALUEOPERATORS = ['$eq', '$gt', '$gte', '$lt', '$lte'];
	var LOGICOPERATORS = ['$or', '$and', '$not'];
	
	/* eslint-disable */
	var MAP_TEMPLATE = function (doc) {
	  if (doc.docType.toLowerCase() === 'DOCTYPEPLACEHOLDER') {
	    emit(FIELDSPLACEHOLDER, doc);
	  }
	}.toString().replace(/ /g, '').replace(/\n/g, '');
	var COUCHDB_INFINITY = { '\uFFFF': '\uFFFF' };
	var COUCHDB_LOWEST = null;
	/* eslint-enable */
	
	// defineIndexV2 is equivalent to defineIndex but only works for V2.
	// It transforms the index fields into a map reduce view.
	function defineIndexV2(cozy, doctype, fields) {
	  var indexName = 'by' + fields.map(capitalize).join('');
	  var indexDefinition = { map: makeMapFunction(doctype, fields), reduce: '_count' };
	  var path = '/request/' + doctype + '/' + indexName + '/';
	  return (0, _fetch.cozyFetchJSON)(cozy, 'PUT', path, indexDefinition).then(function () {
	    return { doctype: doctype, type: 'mapreduce', name: indexName, fields: fields };
	  });
	}
	
	// defineIndexV2 is equivalent to defineIndex but only works for V2.
	// It transforms the index fields into a map reduce view.
	function defineIndexV3(cozy, doctype, fields) {
	  var path = (0, _utils.createPath)(cozy, false, doctype, '_index');
	  var indexDefinition = { 'index': { fields: fields } };
	  return (0, _fetch.cozyFetchJSON)(cozy, 'POST', path, indexDefinition).then(function (response) {
	    return { doctype: doctype, type: 'mango', name: response.id, fields: fields };
	  });
	}
	
	// queryV2 is equivalent to query but only works for V2.
	// It transforms the query into a _views call using makeMapReduceQuery
	function queryV2(cozy, indexRef, options) {
	  if (indexRef.type !== 'mapreduce') {
	    throw new Error('query indexRef should be the return value of defineIndexV2');
	  }
	  if (options.fields) {
	    (0, _utils.warn)('query fields will be ignored on v2');
	  }
	
	  var path = '/request/' + indexRef.doctype + '/' + indexRef.name + '/';
	  var opts = makeMapReduceQuery(indexRef, options);
	  return (0, _fetch.cozyFetchJSON)(cozy, 'POST', path, opts).then(function (response) {
	    return response.map(function (r) {
	      return r.value;
	    });
	  });
	}
	
	// queryV3 is equivalent to query but only works for V3
	function queryV3(cozy, indexRef, options) {
	  if (indexRef.type !== 'mango') {
	    throw new Error('indexRef should be the return value of defineIndexV3');
	  }
	
	  var opts = {
	    use_index: indexRef.name,
	    fields: options.fields,
	    selector: options.selector,
	    limit: options.limit,
	    since: options.since
	  };
	
	  if (options.descending) {
	    opts.sort = indexRef.fields.map(function (f) {
	      return _defineProperty({}, f, 'desc');
	    });
	  }
	
	  var path = (0, _utils.createPath)(cozy, false, indexRef.doctype, '_find');
	  return (0, _fetch.cozyFetchJSON)(cozy, 'POST', path, opts).then(function (response) {
	    return response.docs;
	  });
	}
	
	// misc
	function capitalize(name) {
	  return name.charAt(0).toUpperCase() + name.slice(1);
	}
	
	function makeMapFunction(doctype, fields) {
	  fields = '[' + fields.map(function (name) {
	    return 'doc.' + name;
	  }).join(',') + ']';
	
	  return MAP_TEMPLATE.replace('DOCTYPEPLACEHOLDER', doctype.toLowerCase()).replace('FIELDSPLACEHOLDER', fields);
	}
	
	// parseSelector takes a mango selector and returns it as an array of filter
	// a filter is [path, operator, value] array
	// a path is an array of field names
	// This function is only exported so it can be unit tested.
	// Example :
	// parseSelector({"test":{"deep": {"$gt": 3}}})
	// [[['test', 'deep'], '$gt', 3 ]]
	function parseSelector(selector) {
	  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	  var operator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '$eq';
	
	  if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) !== 'object') {
	    return [[path, operator, selector]];
	  }
	
	  var keys = Object.keys(selector);
	  if (keys.length === 0) {
	    throw new Error('empty selector');
	  } else {
	    return keys.reduce(function (acc, k) {
	      if (LOGICOPERATORS.indexOf(k) !== -1) {
	        throw new Error('cozy-client-js does not support mango logic ops');
	      } else if (VALUEOPERATORS.indexOf(k) !== -1) {
	        return acc.concat(parseSelector(selector[k], path, k));
	      } else {
	        return acc.concat(parseSelector(selector[k], path.concat(k), '$eq'));
	      }
	    }, []);
	  }
	}
	
	// normalizeSelector takes a mango selector and returns it as an object
	// normalized.
	// This function is only exported so it can be unit tested.
	// Example :
	// parseSelector({"test":{"deep": {"$gt": 3}}})
	// {"test.deep": {"$gt": 3}}
	function normalizeSelector(selector) {
	  var filters = parseSelector(selector);
	  return filters.reduce(function (acc, filter) {
	    var _filter = _slicedToArray(filter, 3),
	        path = _filter[0],
	        op = _filter[1],
	        value = _filter[2];
	
	    var field = path.join('.');
	    acc[field] = acc[field] || {};
	    acc[field][op] = value;
	    return acc;
	  }, {});
	}
	
	// applySelector takes the normalized selector for the current field
	// and append the proper values to opts.startkey, opts.endkey
	function applySelector(selector, opts) {
	  var value = selector['$eq'];
	  var lower = COUCHDB_LOWEST;
	  var upper = COUCHDB_INFINITY;
	  var inclusiveEnd = void 0;
	
	  if (value) {
	    opts.startkey.push(value);
	    opts.endkey.push(value);
	    return false;
	  }
	
	  value = selector['$gt'];
	  if (value) {
	    throw new Error('operator $gt (strict greater than) not supported');
	  }
	
	  value = selector['$gte'];
	  if (value) {
	    lower = value;
	  }
	
	  value = selector['$lte'];
	  if (value) {
	    upper = value;
	    inclusiveEnd = true;
	  }
	
	  value = selector['$lt'];
	  if (value) {
	    upper = value;
	    inclusiveEnd = false;
	  }
	
	  opts.startkey.push(lower);
	  opts.endkey.push(upper);
	  if (inclusiveEnd !== undefined) opts.inclusive_end = inclusiveEnd;
	  return true;
	}
	
	// makeMapReduceQuery takes a mango query and generate _views call parameters
	// to obtain same results depending on fields in the passed indexRef.
	function makeMapReduceQuery(indexRef, query) {
	  var mrquery = {
	    startkey: [],
	    endkey: [],
	    reduce: false
	  };
	  var firstFreeValueField = null;
	  var normalizedSelector = normalizeSelector(query.selector);
	
	  indexRef.fields.forEach(function (field) {
	    var selector = normalizedSelector[field];
	
	    if (selector && firstFreeValueField != null) {
	      throw new Error('Selector on field ' + field + ', but not on ' + firstFreeValueField + ' which is higher in index fields.');
	    } else if (selector) {
	      selector.used = true;
	      var isFreeValue = applySelector(selector, mrquery);
	      if (isFreeValue) firstFreeValueField = field;
	    } else if (firstFreeValueField == null) {
	      firstFreeValueField = field;
	      mrquery.endkey.push(COUCHDB_INFINITY);
	    }
	  });
	
	  Object.keys(normalizedSelector).forEach(function (field) {
	    if (!normalizedSelector[field].used) {
	      throw new Error('Cant apply selector on ' + field + ', it is not in index');
	    }
	  });
	
	  if (query.descending) {
	    mrquery = {
	      descending: true,
	      reduce: false,
	      startkey: mrquery.endkey,
	      endkey: mrquery.startkey,
	      inclusive_end: mrquery.inclusive_end
	    };
	  }
	
	  return mrquery;
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* global Blob, File */
	
	
	exports.create = create;
	exports.createDirectory = createDirectory;
	exports.updateById = updateById;
	exports.updateAttributesById = updateAttributesById;
	exports.updateAttributesByPath = updateAttributesByPath;
	exports.trashById = trashById;
	exports.statById = statById;
	exports.statByPath = statByPath;
	exports.downloadById = downloadById;
	exports.downloadByPath = downloadByPath;
	exports.getDowloadLink = getDowloadLink;
	exports.getArchiveLink = getArchiveLink;
	exports.listTrash = listTrash;
	exports.clearTrash = clearTrash;
	exports.restoreById = restoreById;
	exports.destroyById = destroyById;
	
	var _fetch = __webpack_require__(8);
	
	var _jsonapi = __webpack_require__(9);
	
	var _jsonapi2 = _interopRequireDefault(_jsonapi);
	
	var _doctypes = __webpack_require__(11);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var contentTypeOctetStream = 'application/octet-stream';
	
	function doUpload(cozy, data, method, path, options) {
	  if (!data) {
	    throw new Error('missing data argument');
	  }
	
	  // transform any ArrayBufferView to ArrayBuffer
	  if (data.buffer && data.buffer instanceof ArrayBuffer) {
	    data = data.buffer;
	  }
	
	  var isBuffer = typeof ArrayBuffer !== 'undefined' && data instanceof ArrayBuffer;
	  var isFile = typeof File !== 'undefined' && data instanceof File;
	  var isBlob = typeof Blob !== 'undefined' && data instanceof Blob;
	  var isStream = data.readable === true && typeof data.pipe === 'function';
	  var isString = typeof data === 'string';
	
	  if (!isBuffer && !isFile && !isBlob && !isStream && !isString) {
	    throw new Error('invalid data type');
	  }
	
	  var _ref = options || {},
	      contentType = _ref.contentType,
	      checksum = _ref.checksum,
	      lastModifiedDate = _ref.lastModifiedDate,
	      ifMatch = _ref.ifMatch;
	
	  if (!contentType) {
	    if (isBuffer) {
	      contentType = contentTypeOctetStream;
	    } else if (isFile) {
	      contentType = data.type || contentTypeOctetStream;
	      if (!lastModifiedDate) {
	        lastModifiedDate = data.lastModifiedDate;
	      }
	    } else if (isBlob) {
	      contentType = contentTypeOctetStream;
	    } else if (isStream) {
	      contentType = contentTypeOctetStream;
	    } else if (typeof data === 'string') {
	      contentType = 'text/plain';
	    }
	  }
	
	  if (lastModifiedDate && typeof lastModifiedDate === 'string') {
	    lastModifiedDate = new Date(lastModifiedDate);
	  }
	
	  return (0, _fetch.cozyFetch)(cozy, path, {
	    method: method,
	    headers: {
	      'Content-Type': contentType,
	      'Content-MD5': checksum || '',
	      'Date': lastModifiedDate ? lastModifiedDate.toGMTString() : '',
	      'If-Match': ifMatch || ''
	    },
	    body: data
	  }).then(function (res) {
	    var json = res.json();
	    if (!res.ok) {
	      return json.then(function (err) {
	        throw err;
	      });
	    } else {
	      return json.then(_jsonapi2.default);
	    }
	  });
	}
	
	function create(cozy, data, options) {
	  var _ref2 = options || {},
	      name = _ref2.name,
	      dirID = _ref2.dirID,
	      executable = _ref2.executable;
	
	  // handle case where data is a file and contains the name
	
	
	  if (!name && typeof data.name === 'string') {
	    name = data.name;
	  }
	
	  if (typeof name !== 'string' || name === '') {
	    throw new Error('missing name argument');
	  }
	
	  if (executable === undefined) {
	    executable = false;
	  }
	
	  var path = '/files/' + encodeURIComponent(dirID || '');
	  var query = '?Name=' + encodeURIComponent(name) + '&Type=file&Executable=' + executable;
	  return doUpload(cozy, data, 'POST', '' + path + query, options);
	}
	
	function createDirectory(cozy, options) {
	  var _ref3 = options || {},
	      name = _ref3.name,
	      dirID = _ref3.dirID,
	      lastModifiedDate = _ref3.lastModifiedDate;
	
	  if (typeof name !== 'string' || name === '') {
	    throw new Error('missing name argument');
	  }
	
	  if (lastModifiedDate && typeof lastModifiedDate === 'string') {
	    lastModifiedDate = new Date(lastModifiedDate);
	  }
	
	  var path = '/files/' + encodeURIComponent(dirID || '');
	  var query = '?Name=' + encodeURIComponent(name) + '&Type=directory';
	  return (0, _fetch.cozyFetchJSON)(cozy, 'POST', '' + path + query, undefined, {
	    headers: {
	      'Date': lastModifiedDate ? lastModifiedDate.toGMTString() : ''
	    }
	  });
	}
	
	function updateById(cozy, id, data, options) {
	  return doUpload(cozy, data, 'PUT', '/files/' + encodeURIComponent(id), options);
	}
	
	function doUpdateAttributes(cozy, attrs, path, options) {
	  if (!attrs || (typeof attrs === 'undefined' ? 'undefined' : _typeof(attrs)) !== 'object') {
	    throw new Error('missing attrs argument');
	  }
	
	  var _ref4 = options || {},
	      ifMatch = _ref4.ifMatch;
	
	  var body = { data: { attributes: attrs } };
	  return (0, _fetch.cozyFetchJSON)(cozy, 'PATCH', path, body, {
	    headers: {
	      'If-Match': ifMatch || ''
	    }
	  });
	}
	
	function updateAttributesById(cozy, id, attrs, options) {
	  return doUpdateAttributes(cozy, attrs, '/files/' + encodeURIComponent(id), options);
	}
	
	function updateAttributesByPath(cozy, path, attrs, options) {
	  return doUpdateAttributes(cozy, attrs, '/files/metadata?Path=' + encodeURIComponent(path), options);
	}
	
	function trashById(cozy, id) {
	  if (typeof id !== 'string' || id === '') {
	    throw new Error('missing id argument');
	  }
	  return (0, _fetch.cozyFetchJSON)(cozy, 'DELETE', '/files/' + encodeURIComponent(id));
	}
	
	function statById(cozy, id) {
	  var offline = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	
	  if (offline && cozy.offline.hasDatabase(_doctypes.DOCTYPE_FILES)) {
	    var db = cozy.offline.getDatabase(_doctypes.DOCTYPE_FILES);
	    return Promise.all([db.get(id), db.find({ selector: { 'dir_id': id } })]).then(function (_ref5) {
	      var _ref6 = _slicedToArray(_ref5, 2),
	          doc = _ref6[0],
	          children = _ref6[1];
	
	      children = children.docs.map(function (doc) {
	        return addIsDir(toJsonApi(cozy, doc));
	      });
	      return addIsDir(toJsonApi(cozy, doc, children));
	    });
	  }
	  return (0, _fetch.cozyFetchJSON)(cozy, 'GET', '/files/' + encodeURIComponent(id)).then(addIsDir);
	}
	
	function statByPath(cozy, path) {
	  return (0, _fetch.cozyFetchJSON)(cozy, 'GET', '/files/metadata?Path=' + encodeURIComponent(path)).then(addIsDir);
	}
	
	function downloadById(cozy, id) {
	  return (0, _fetch.cozyFetch)(cozy, '/files/download/' + encodeURIComponent(id));
	}
	
	function downloadByPath(cozy, path) {
	  return (0, _fetch.cozyFetch)(cozy, '/files/download?Path=' + encodeURIComponent(path));
	}
	
	function extractResponseLinkRelated(res) {
	  var href = res.links && res.links.related;
	  if (!href) throw new Error('No related link in server response');
	  return href;
	}
	
	function getDowloadLink(cozy, path) {
	  return (0, _fetch.cozyFetchJSON)(cozy, 'POST', '/files/downloads?Path=' + encodeURIComponent(path)).then(extractResponseLinkRelated);
	}
	
	function getArchiveLink(cozy, paths) {
	  var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'files';
	
	  var archive = {
	    type: 'io.cozy.archives',
	    attributes: {
	      name: name,
	      files: paths
	    }
	  };
	  return (0, _fetch.cozyFetchJSON)(cozy, 'POST', '/files/archive', { data: archive }).then(extractResponseLinkRelated);
	}
	
	function listTrash(cozy) {
	  return (0, _fetch.cozyFetchJSON)(cozy, 'GET', '/files/trash');
	}
	
	function clearTrash(cozy) {
	  return (0, _fetch.cozyFetchJSON)(cozy, 'DELETE', '/files/trash');
	}
	
	function restoreById(cozy, id) {
	  return (0, _fetch.cozyFetchJSON)(cozy, 'POST', '/files/trash/' + encodeURIComponent(id));
	}
	
	function destroyById(cozy, id) {
	  return (0, _fetch.cozyFetchJSON)(cozy, 'DELETE', '/files/trash/' + encodeURIComponent(id));
	}
	
	function addIsDir(obj) {
	  obj.isDir = obj.attributes.type === 'directory';
	  return obj;
	}
	
	function toJsonApi(cozy, doc) {
	  var contents = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
	
	  var clone = JSON.parse(JSON.stringify(doc));
	  delete clone._id;
	  delete clone._rev;
	  return {
	    _id: doc._id,
	    _rev: doc._rev,
	    _type: _doctypes.DOCTYPE_FILES,
	    attributes: clone,
	    relations: function relations(name) {
	      if (name === 'contents') {
	        return contents;
	      }
	    }
	  };
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.init = init;
	exports.createDatabase = createDatabase;
	exports.hasDatabase = hasDatabase;
	exports.getDatabase = getDatabase;
	exports.destroyDatabase = destroyDatabase;
	exports.getDoctypes = getDoctypes;
	exports.startAllSync = startAllSync;
	exports.stopAllSync = stopAllSync;
	exports.startSync = startSync;
	exports.hasSync = hasSync;
	exports.stopSync = stopSync;
	exports.replicateFromCozy = replicateFromCozy;
	exports.replicateFromCozyWithAuth = replicateFromCozyWithAuth;
	
	var _pouchdb = __webpack_require__(15);
	
	var _pouchdb2 = _interopRequireDefault(_pouchdb);
	
	var _pouchdbFind = __webpack_require__(16);
	
	var _pouchdbFind2 = _interopRequireDefault(_pouchdbFind);
	
	var _doctypes = __webpack_require__(11);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var pluginLoaded = false;
	
	function init(cozy, _ref) {
	  var _ref$options = _ref.options,
	      options = _ref$options === undefined ? {} : _ref$options,
	      _ref$doctypes = _ref.doctypes,
	      doctypes = _ref$doctypes === undefined ? [] : _ref$doctypes,
	      timer = _ref.timer;
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;
	
	  try {
	    for (var _iterator = doctypes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var doctype = _step.value;
	
	      createDatabase(cozy, doctype, options);
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	
	  if (timer !== undefined) {
	    startAllSync(cozy, timer);
	  }
	}
	
	function createDatabase(cozy, doctype) {
	  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	  var timer = arguments[3];
	
	  if (!pluginLoaded) {
	    _pouchdb2.default.plugin(_pouchdbFind2.default);
	    pluginLoaded = true;
	  }
	  cozy._offline = cozy._offline || [];
	  cozy._offline[doctype] = cozy._offline[doctype] || {};
	  var offline = cozy._offline[doctype];
	  if (offline && offline.database) {
	    return offline.database;
	  }
	  offline.database = new _pouchdb2.default(doctype, options);
	  offline.timer = timer;
	  offline.autoSync = null;
	  if (timer !== undefined) {
	    startSync(cozy, doctype, timer);
	  }
	  createIndexes(cozy, offline.database, doctype);
	  return offline.database;
	}
	
	function hasDatabase(cozy, doctype) {
	  return cozy._offline !== null && doctype in cozy._offline && cozy._offline[doctype].database !== undefined;
	}
	
	function getDatabase(cozy, doctype) {
	  if (hasDatabase(cozy, doctype)) {
	    return cozy._offline[doctype].database;
	  }
	  return;
	}
	
	function destroyDatabase(cozy, doctype) {
	  if (hasDatabase(cozy, doctype)) {
	    stopSync(cozy, doctype);
	    getDatabase(cozy, doctype).destroy();
	    delete getDatabase(cozy, doctype);
	  }
	}
	
	function getDoctypes(cozy) {
	  if (cozy._offline === null) {
	    return [];
	  }
	  return Object.keys(cozy._offline);
	}
	
	//
	// SYNC
	//
	
	function startAllSync(cozy, timer) {
	  if (timer) {
	    var doctypes = getDoctypes(cozy);
	    doctypes.forEach(function (doctype) {
	      startSync(cozy, doctype, timer);
	    });
	  }
	}
	
	function stopAllSync(cozy) {
	  var doctypes = getDoctypes(cozy);
	  doctypes.forEach(function (doctype) {
	    stopSync(cozy, doctype);
	  });
	}
	
	function startSync(cozy, doctype, timer) {
	  // TODO: add timer limitation for not flooding Gozy
	  if (hasDatabase(cozy, doctype)) {
	    var _ret = function () {
	      if (hasSync(cozy, doctype)) {
	        if (timer === cozy._offline[doctype].timer) {
	          return {
	            v: void 0
	          };
	        }
	        stopSync(cozy, doctype);
	      }
	      var offline = cozy._offline[doctype];
	      offline.timer = timer;
	      offline.autoSync = setInterval(function () {
	        if (offline.replicate === undefined) {
	          replicateFromCozy(cozy, doctype);
	          // TODO: add replicationToCozy
	        }
	      }, timer * 1000);
	    }();
	
	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	  }
	}
	
	function hasSync(cozy, doctype) {
	  return cozy._offline !== null && doctype in cozy._offline && cozy._offline[doctype].autoSync !== null;
	}
	
	function stopSync(cozy, doctype) {
	  if (hasSync(cozy, doctype)) {
	    var offline = cozy._offline[doctype];
	    clearInterval(offline.autoSync);
	    delete offline.autoSync;
	    if (offline.replication) {
	      offline.replication.cancel();
	    }
	  }
	}
	
	function replicateFromCozy(cozy, doctype) {
	  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
	  if (hasDatabase(cozy, doctype)) {
	    if (options.live === true) {
	      return Promise.reject(new Error('You can\'t use `live` option with Cozy couchdb.'));
	    }
	    if (options.manualAuthCredentials) {
	      return Promise.resolve(replicateFromCozyWithAuth(cozy, doctype, options, options.manualAuthCredentials));
	    } else {
	      return cozy.authorize().then(function (credentials) {
	        return replicateFromCozyWithAuth(cozy, doctype, options, credentials);
	      });
	    }
	  } else {
	    return Promise.reject(new Error('You should add this doctype: ' + doctype + ' to offline.'));
	  }
	}
	
	function replicateFromCozyWithAuth(cozy, doctype, options, credentials) {
	  var basic = credentials.token.toBasicAuth();
	  var url = (cozy._url + '/data/' + doctype).replace('//', '//' + basic);
	  var db = getDatabase(cozy, doctype);
	  var offline = cozy._offline[doctype];
	  offline.replication = db.replicate.from(url, options).on('complete', function () {
	    offline.replication = undefined;
	  });
	  return offline.replication;
	}
	
	function createIndexes(cozy, db, doctype) {
	  if (doctype === _doctypes.DOCTYPE_FILES) {
	    db.createIndex({ index: { fields: ['dir_id'] } });
	  }
	}

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_15__;

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_16__;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.diskUsage = diskUsage;
	exports.changePassphrase = changePassphrase;
	exports.getInstance = getInstance;
	exports.updateInstance = updateInstance;
	exports.getClients = getClients;
	exports.deleteClientById = deleteClientById;
	
	var _fetch = __webpack_require__(8);
	
	function diskUsage(cozy) {
	  return (0, _fetch.cozyFetchJSON)(cozy, 'GET', '/settings/disk-usage');
	}
	
	function changePassphrase(cozy, currentPassPhrase, newPassPhrase) {
	  return (0, _fetch.cozyFetchJSON)(cozy, 'PUT', '/settings/passphrase', {
	    current_passphrase: currentPassPhrase,
	    new_passphrase: newPassPhrase
	  });
	}
	
	function getInstance(cozy) {
	  return (0, _fetch.cozyFetchJSON)(cozy, 'GET', '/settings/instance');
	}
	
	function updateInstance(cozy, instance) {
	  return (0, _fetch.cozyFetchJSON)(cozy, 'PUT', '/settings/instance', instance);
	}
	
	function getClients(cozy) {
	  return (0, _fetch.cozyFetchJSON)(cozy, 'GET', '/settings/clients');
	}
	
	function deleteClientById(cozy, id) {
	  return (0, _fetch.cozyFetchJSON)(cozy, 'DELETE', '/settings/clients/' + id);
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.addReferencedFiles = addReferencedFiles;
	exports.listReferencedFiles = listReferencedFiles;
	
	var _fetch = __webpack_require__(8);
	
	var _doctypes = __webpack_require__(11);
	
	function addReferencedFiles(cozy, doc, ids) {
	  if (!doc) throw new Error('missing doc argument');
	  if (!Array.isArray(ids)) ids = [ids];
	
	  var refs = ids.map(function (id) {
	    return { type: _doctypes.DOCTYPE_FILES, id: id };
	  });
	
	  return (0, _fetch.cozyFetchJSON)(cozy, 'POST', makeReferencesPath(doc), { data: refs });
	}
	
	function listReferencedFiles(cozy, doc) {
	  if (!doc) throw new Error('missing doc argument');
	  return (0, _fetch.cozyFetchJSON)(cozy, 'GET', makeReferencesPath(doc)).then(function (files) {
	    return files.map(function (file) {
	      return file._id;
	    });
	  });
	}
	
	function makeReferencesPath(doc) {
	  var type = encodeURIComponent(doc._type);
	  var id = encodeURIComponent(doc._id);
	  return '/data/' + type + '/' + id + '/relationships/references';
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=cozy-client.js.map