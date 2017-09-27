(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("client", [], factory);
	else if(typeof exports === 'object')
		exports["client"] = factory();
	else
		root["cozy"] = root["cozy"] || {}, root["cozy"]["client"] = factory();
})(this, function() {
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
	    } else if (Array.isArray(headers)) {
	      headers.forEach(function(header) {
	        this.append(header[0], header[1])
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
	
	    if (input instanceof Request) {
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
	    } else {
	      this.url = String(input)
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
	    rawHeaders.split(/\r?\n/).forEach(function(line) {
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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global fetch URL */
	
	
	__webpack_require__(4);
	
	__webpack_require__(45);
	
	__webpack_require__(72);
	
	__webpack_require__(73);
	
	__webpack_require__(74);
	
	__webpack_require__(75);
	
	__webpack_require__(76);
	
	__webpack_require__(77);
	
	__webpack_require__(78);
	
	__webpack_require__(79);
	
	__webpack_require__(80);
	
	__webpack_require__(88);
	
	__webpack_require__(89);
	
	__webpack_require__(93);
	
	__webpack_require__(94);
	
	__webpack_require__(95);
	
	__webpack_require__(98);
	
	__webpack_require__(99);
	
	__webpack_require__(100);
	
	__webpack_require__(101);
	
	__webpack_require__(102);
	
	__webpack_require__(103);
	
	__webpack_require__(104);
	
	__webpack_require__(105);
	
	__webpack_require__(107);
	
	__webpack_require__(108);
	
	__webpack_require__(109);
	
	__webpack_require__(110);
	
	__webpack_require__(113);
	
	__webpack_require__(119);
	
	__webpack_require__(120);
	
	__webpack_require__(121);
	
	__webpack_require__(122);
	
	__webpack_require__(123);
	
	__webpack_require__(124);
	
	__webpack_require__(125);
	
	__webpack_require__(127);
	
	__webpack_require__(129);
	
	__webpack_require__(133);
	
	__webpack_require__(134);
	
	__webpack_require__(135);
	
	__webpack_require__(137);
	
	__webpack_require__(139);
	
	__webpack_require__(140);
	
	__webpack_require__(141);
	
	__webpack_require__(142);
	
	__webpack_require__(144);
	
	__webpack_require__(145);
	
	__webpack_require__(146);
	
	__webpack_require__(147);
	
	__webpack_require__(148);
	
	__webpack_require__(62);
	
	__webpack_require__(149);
	
	__webpack_require__(150);
	
	__webpack_require__(152);
	
	__webpack_require__(153);
	
	__webpack_require__(154);
	
	__webpack_require__(155);
	
	__webpack_require__(156);
	
	__webpack_require__(157);
	
	__webpack_require__(159);
	
	__webpack_require__(160);
	
	__webpack_require__(161);
	
	__webpack_require__(163);
	
	__webpack_require__(164);
	
	__webpack_require__(165);
	
	__webpack_require__(167);
	
	__webpack_require__(168);
	
	__webpack_require__(169);
	
	__webpack_require__(170);
	
	__webpack_require__(171);
	
	__webpack_require__(172);
	
	__webpack_require__(173);
	
	__webpack_require__(174);
	
	__webpack_require__(175);
	
	__webpack_require__(176);
	
	__webpack_require__(177);
	
	__webpack_require__(178);
	
	__webpack_require__(180);
	
	__webpack_require__(181);
	
	__webpack_require__(182);
	
	__webpack_require__(184);
	
	__webpack_require__(185);
	
	__webpack_require__(188);
	
	__webpack_require__(189);
	
	__webpack_require__(190);
	
	var _utils = __webpack_require__(192);
	
	var _auth_storage = __webpack_require__(193);
	
	var _auth_v = __webpack_require__(194);
	
	var _auth_v2 = __webpack_require__(195);
	
	var auth = _interopRequireWildcard(_auth_v2);
	
	var _data = __webpack_require__(198);
	
	var data = _interopRequireWildcard(_data);
	
	var _fetch = __webpack_require__(196);
	
	var cozyFetch = _interopRequireWildcard(_fetch);
	
	var _mango = __webpack_require__(200);
	
	var mango = _interopRequireWildcard(_mango);
	
	var _files = __webpack_require__(201);
	
	var files = _interopRequireWildcard(_files);
	
	var _intents = __webpack_require__(202);
	
	var intents = _interopRequireWildcard(_intents);
	
	var _jobs = __webpack_require__(203);
	
	var jobs = _interopRequireWildcard(_jobs);
	
	var _offline = __webpack_require__(204);
	
	var offline = _interopRequireWildcard(_offline);
	
	var _settings = __webpack_require__(205);
	
	var settings = _interopRequireWildcard(_settings);
	
	var _relations = __webpack_require__(206);
	
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
	  findMany: data.findMany,
	  findAll: data.findAll,
	  update: data.update,
	  delete: data._delete,
	  updateAttributes: data.updateAttributes,
	  changesFeed: data.changesFeed,
	  defineIndex: mango.defineIndex,
	  query: mango.query,
	  addReferencedFiles: relations.addReferencedFiles,
	  removeReferencedFiles: relations.removeReferencedFiles,
	  listReferencedFiles: relations.listReferencedFiles,
	  fetchReferencedFiles: relations.fetchReferencedFiles,
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
	  createDirectoryByPath: files.createDirectoryByPath,
	  updateById: files.updateById,
	  updateAttributesById: files.updateAttributesById,
	  updateAttributesByPath: files.updateAttributesByPath,
	  trashById: files.trashById,
	  statById: files.statById,
	  statByPath: files.statByPath,
	  downloadById: files.downloadById,
	  downloadByPath: files.downloadByPath,
	  getDownloadLinkById: files.getDownloadLinkById,
	  getDownloadLink: files.getDownloadLinkByPath, // DEPRECATED, should be removed very soon
	  getDownloadLinkByPath: files.getDownloadLinkByPath,
	  getArchiveLink: function getArchiveLink() {
	    (0, _utils.warn)('getArchiveLink is deprecated, use cozy.files.getArchiveLinkByPaths instead.');
	    return files.getArchiveLinkByPaths.apply(files, arguments);
	  },
	  getArchiveLinkByPaths: files.getArchiveLinkByPaths,
	  getArchiveLinkByIds: files.getArchiveLinkByIds,
	  getFilePath: files.getFilePath,
	  getCollectionShareLink: files.getCollectionShareLink,
	  query: mango.queryFiles,
	  listTrash: files.listTrash,
	  clearTrash: files.clearTrash,
	  restoreById: files.restoreById,
	  destroyById: files.destroyById
	};
	
	var intentsProto = {
	  create: intents.create,
	  createService: intents.createService
	};
	
	var jobsProto = {
	  create: jobs.create,
	  count: jobs.count
	};
	
	var offlineProto = {
	  init: offline.init,
	  getDoctypes: offline.getDoctypes,
	  // database
	  hasDatabase: offline.hasDatabase,
	  getDatabase: offline.getDatabase,
	  createDatabase: offline.createDatabase,
	  destroyDatabase: offline.destroyDatabase,
	  destroyAllDatabase: offline.destroyAllDatabase,
	  // replication
	  hasReplication: offline.hasReplication,
	  replicateFromCozy: offline.replicateFromCozy,
	  stopReplication: offline.stopReplication,
	  stopAllReplication: offline.stopAllReplication,
	  // repeated replication
	  hasRepeatedReplication: offline.hasRepeatedReplication,
	  startRepeatedReplication: offline.startRepeatedReplication,
	  stopRepeatedReplication: offline.stopRepeatedReplication,
	  stopAllRepeatedReplication: offline.stopAllRepeatedReplication
	};
	
	var settingsProto = {
	  diskUsage: settings.diskUsage,
	  changePassphrase: settings.changePassphrase,
	  getInstance: settings.getInstance,
	  updateInstance: settings.updateInstance,
	  getClients: settings.getClients,
	  deleteClientById: settings.deleteClientById,
	  updateLastSync: settings.updateLastSync
	};
	
	var Client = function () {
	  function Client(options) {
	    _classCallCheck(this, Client);
	
	    this.data = {};
	    this.files = {};
	    this.intents = {};
	    this.jobs = {};
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
	      this._version = options.version || null;
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
	      addToProto(this, this.intents, intentsProto, disablePromises);
	      addToProto(this, this.jobs, jobsProto, disablePromises);
	      addToProto(this, this.offline, offlineProto, disablePromises);
	      addToProto(this, this.settings, settingsProto, disablePromises);
	
	      if (options.offline) {
	        this.offline.init(options.offline);
	      }
	
	      // Exposing cozyFetchJSON to make some development easier. Should be temporary.
	      this.fetchJSON = function _fetchJSON() {
	        var args = [this].concat(Array.prototype.slice.call(arguments));
	        return cozyFetch.cozyFetchJSON.apply(this, args);
	      };
	    }
	  }, {
	    key: 'authorize',
	    value: function authorize() {
	      var _this = this;
	
	      var forceTokenRefresh = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	
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
	          if (forceTokenRefresh && _this._clientParams.redirectURI) {
	            var url = new URL(_this._clientParams.redirectURI);
	            if (!url.searchParams.has('reconnect')) url.searchParams.append('reconnect', 1);
	            _this._clientParams.redirectURI = url.toString();
	          }
	          return auth.oauthFlow(_this, _this._storage, _this._clientParams, _this._onRegistered, forceTokenRefresh);
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
	        return (0, _utils.retry)(function () {
	          return fetch(_this3._url + '/status/');
	        }, 3)().then(function (res) {
	          if (!res.ok) {
	            throw new Error('Could not fetch cozy status');
	          } else {
	            return res.json();
	          }
	        }).then(function (status) {
	          _this3._version = status.datasystem !== undefined ? 2 : 3;
	          return _this3.isV2();
	        });
	      }
	      return Promise.resolve(this._version === 2);
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
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(5);
	$export($export.G + $export.W + $export.F * !__webpack_require__(23).ABV, {
	  DataView: __webpack_require__(24).DataView
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(6)
	  , core      = __webpack_require__(7)
	  , hide      = __webpack_require__(8)
	  , redefine  = __webpack_require__(18)
	  , ctx       = __webpack_require__(21)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
	    , key, own, out, exp;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if(target)redefine(target, key, out, type & $export.U);
	    // export
	    if(exports[key] != out)hide(exports, key, exp);
	    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
	  }
	};
	global.core = core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 6 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 7 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(9)
	  , createDesc = __webpack_require__(17);
	module.exports = __webpack_require__(13) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(10)
	  , IE8_DOM_DEFINE = __webpack_require__(12)
	  , toPrimitive    = __webpack_require__(16)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(13) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(11);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(13) && !__webpack_require__(14)(function(){
	  return Object.defineProperty(__webpack_require__(15)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(14)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(11)
	  , document = __webpack_require__(6).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(11);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(6)
	  , hide      = __webpack_require__(8)
	  , has       = __webpack_require__(19)
	  , SRC       = __webpack_require__(20)('src')
	  , TO_STRING = 'toString'
	  , $toString = Function[TO_STRING]
	  , TPL       = ('' + $toString).split(TO_STRING);
	
	__webpack_require__(7).inspectSource = function(it){
	  return $toString.call(it);
	};
	
	(module.exports = function(O, key, val, safe){
	  var isFunction = typeof val == 'function';
	  if(isFunction)has(val, 'name') || hide(val, 'name', key);
	  if(O[key] === val)return;
	  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if(O === global){
	    O[key] = val;
	  } else {
	    if(!safe){
	      delete O[key];
	      hide(O, key, val);
	    } else {
	      if(O[key])O[key] = val;
	      else hide(O, key, val);
	    }
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString(){
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});

/***/ },
/* 19 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(22);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(6)
	  , hide   = __webpack_require__(8)
	  , uid    = __webpack_require__(20)
	  , TYPED  = uid('typed_array')
	  , VIEW   = uid('view')
	  , ABV    = !!(global.ArrayBuffer && global.DataView)
	  , CONSTR = ABV
	  , i = 0, l = 9, Typed;
	
	var TypedArrayConstructors = (
	  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
	).split(',');
	
	while(i < l){
	  if(Typed = global[TypedArrayConstructors[i++]]){
	    hide(Typed.prototype, TYPED, true);
	    hide(Typed.prototype, VIEW, true);
	  } else CONSTR = false;
	}
	
	module.exports = {
	  ABV:    ABV,
	  CONSTR: CONSTR,
	  TYPED:  TYPED,
	  VIEW:   VIEW
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global         = __webpack_require__(6)
	  , DESCRIPTORS    = __webpack_require__(13)
	  , LIBRARY        = __webpack_require__(25)
	  , $typed         = __webpack_require__(23)
	  , hide           = __webpack_require__(8)
	  , redefineAll    = __webpack_require__(26)
	  , fails          = __webpack_require__(14)
	  , anInstance     = __webpack_require__(27)
	  , toInteger      = __webpack_require__(28)
	  , toLength       = __webpack_require__(29)
	  , gOPN           = __webpack_require__(30).f
	  , dP             = __webpack_require__(9).f
	  , arrayFill      = __webpack_require__(41)
	  , setToStringTag = __webpack_require__(43)
	  , ARRAY_BUFFER   = 'ArrayBuffer'
	  , DATA_VIEW      = 'DataView'
	  , PROTOTYPE      = 'prototype'
	  , WRONG_LENGTH   = 'Wrong length!'
	  , WRONG_INDEX    = 'Wrong index!'
	  , $ArrayBuffer   = global[ARRAY_BUFFER]
	  , $DataView      = global[DATA_VIEW]
	  , Math           = global.Math
	  , RangeError     = global.RangeError
	  , Infinity       = global.Infinity
	  , BaseBuffer     = $ArrayBuffer
	  , abs            = Math.abs
	  , pow            = Math.pow
	  , floor          = Math.floor
	  , log            = Math.log
	  , LN2            = Math.LN2
	  , BUFFER         = 'buffer'
	  , BYTE_LENGTH    = 'byteLength'
	  , BYTE_OFFSET    = 'byteOffset'
	  , $BUFFER        = DESCRIPTORS ? '_b' : BUFFER
	  , $LENGTH        = DESCRIPTORS ? '_l' : BYTE_LENGTH
	  , $OFFSET        = DESCRIPTORS ? '_o' : BYTE_OFFSET;
	
	// IEEE754 conversions based on https://github.com/feross/ieee754
	var packIEEE754 = function(value, mLen, nBytes){
	  var buffer = Array(nBytes)
	    , eLen   = nBytes * 8 - mLen - 1
	    , eMax   = (1 << eLen) - 1
	    , eBias  = eMax >> 1
	    , rt     = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0
	    , i      = 0
	    , s      = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0
	    , e, m, c;
	  value = abs(value)
	  if(value != value || value === Infinity){
	    m = value != value ? 1 : 0;
	    e = eMax;
	  } else {
	    e = floor(log(value) / LN2);
	    if(value * (c = pow(2, -e)) < 1){
	      e--;
	      c *= 2;
	    }
	    if(e + eBias >= 1){
	      value += rt / c;
	    } else {
	      value += rt * pow(2, 1 - eBias);
	    }
	    if(value * c >= 2){
	      e++;
	      c /= 2;
	    }
	    if(e + eBias >= eMax){
	      m = 0;
	      e = eMax;
	    } else if(e + eBias >= 1){
	      m = (value * c - 1) * pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * pow(2, eBias - 1) * pow(2, mLen);
	      e = 0;
	    }
	  }
	  for(; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
	  e = e << mLen | m;
	  eLen += mLen;
	  for(; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
	  buffer[--i] |= s * 128;
	  return buffer;
	};
	var unpackIEEE754 = function(buffer, mLen, nBytes){
	  var eLen  = nBytes * 8 - mLen - 1
	    , eMax  = (1 << eLen) - 1
	    , eBias = eMax >> 1
	    , nBits = eLen - 7
	    , i     = nBytes - 1
	    , s     = buffer[i--]
	    , e     = s & 127
	    , m;
	  s >>= 7;
	  for(; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
	  m = e & (1 << -nBits) - 1;
	  e >>= -nBits;
	  nBits += mLen;
	  for(; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
	  if(e === 0){
	    e = 1 - eBias;
	  } else if(e === eMax){
	    return m ? NaN : s ? -Infinity : Infinity;
	  } else {
	    m = m + pow(2, mLen);
	    e = e - eBias;
	  } return (s ? -1 : 1) * m * pow(2, e - mLen);
	};
	
	var unpackI32 = function(bytes){
	  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
	};
	var packI8 = function(it){
	  return [it & 0xff];
	};
	var packI16 = function(it){
	  return [it & 0xff, it >> 8 & 0xff];
	};
	var packI32 = function(it){
	  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
	};
	var packF64 = function(it){
	  return packIEEE754(it, 52, 8);
	};
	var packF32 = function(it){
	  return packIEEE754(it, 23, 4);
	};
	
	var addGetter = function(C, key, internal){
	  dP(C[PROTOTYPE], key, {get: function(){ return this[internal]; }});
	};
	
	var get = function(view, bytes, index, isLittleEndian){
	  var numIndex = +index
	    , intIndex = toInteger(numIndex);
	  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b
	    , start = intIndex + view[$OFFSET]
	    , pack  = store.slice(start, start + bytes);
	  return isLittleEndian ? pack : pack.reverse();
	};
	var set = function(view, bytes, index, conversion, value, isLittleEndian){
	  var numIndex = +index
	    , intIndex = toInteger(numIndex);
	  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b
	    , start = intIndex + view[$OFFSET]
	    , pack  = conversion(+value);
	  for(var i = 0; i < bytes; i++)store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
	};
	
	var validateArrayBufferArguments = function(that, length){
	  anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
	  var numberLength = +length
	    , byteLength   = toLength(numberLength);
	  if(numberLength != byteLength)throw RangeError(WRONG_LENGTH);
	  return byteLength;
	};
	
	if(!$typed.ABV){
	  $ArrayBuffer = function ArrayBuffer(length){
	    var byteLength = validateArrayBufferArguments(this, length);
	    this._b       = arrayFill.call(Array(byteLength), 0);
	    this[$LENGTH] = byteLength;
	  };
	
	  $DataView = function DataView(buffer, byteOffset, byteLength){
	    anInstance(this, $DataView, DATA_VIEW);
	    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
	    var bufferLength = buffer[$LENGTH]
	      , offset       = toInteger(byteOffset);
	    if(offset < 0 || offset > bufferLength)throw RangeError('Wrong offset!');
	    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
	    if(offset + byteLength > bufferLength)throw RangeError(WRONG_LENGTH);
	    this[$BUFFER] = buffer;
	    this[$OFFSET] = offset;
	    this[$LENGTH] = byteLength;
	  };
	
	  if(DESCRIPTORS){
	    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
	    addGetter($DataView, BUFFER, '_b');
	    addGetter($DataView, BYTE_LENGTH, '_l');
	    addGetter($DataView, BYTE_OFFSET, '_o');
	  }
	
	  redefineAll($DataView[PROTOTYPE], {
	    getInt8: function getInt8(byteOffset){
	      return get(this, 1, byteOffset)[0] << 24 >> 24;
	    },
	    getUint8: function getUint8(byteOffset){
	      return get(this, 1, byteOffset)[0];
	    },
	    getInt16: function getInt16(byteOffset /*, littleEndian */){
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
	    },
	    getUint16: function getUint16(byteOffset /*, littleEndian */){
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return bytes[1] << 8 | bytes[0];
	    },
	    getInt32: function getInt32(byteOffset /*, littleEndian */){
	      return unpackI32(get(this, 4, byteOffset, arguments[1]));
	    },
	    getUint32: function getUint32(byteOffset /*, littleEndian */){
	      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
	    },
	    getFloat32: function getFloat32(byteOffset /*, littleEndian */){
	      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
	    },
	    getFloat64: function getFloat64(byteOffset /*, littleEndian */){
	      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
	    },
	    setInt8: function setInt8(byteOffset, value){
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setUint8: function setUint8(byteOffset, value){
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setInt16: function setInt16(byteOffset, value /*, littleEndian */){
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setUint16: function setUint16(byteOffset, value /*, littleEndian */){
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setInt32: function setInt32(byteOffset, value /*, littleEndian */){
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setUint32: function setUint32(byteOffset, value /*, littleEndian */){
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setFloat32: function setFloat32(byteOffset, value /*, littleEndian */){
	      set(this, 4, byteOffset, packF32, value, arguments[2]);
	    },
	    setFloat64: function setFloat64(byteOffset, value /*, littleEndian */){
	      set(this, 8, byteOffset, packF64, value, arguments[2]);
	    }
	  });
	} else {
	  if(!fails(function(){
	    new $ArrayBuffer;     // eslint-disable-line no-new
	  }) || !fails(function(){
	    new $ArrayBuffer(.5); // eslint-disable-line no-new
	  })){
	    $ArrayBuffer = function ArrayBuffer(length){
	      return new BaseBuffer(validateArrayBufferArguments(this, length));
	    };
	    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
	    for(var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j; ){
	      if(!((key = keys[j++]) in $ArrayBuffer))hide($ArrayBuffer, key, BaseBuffer[key]);
	    };
	    if(!LIBRARY)ArrayBufferProto.constructor = $ArrayBuffer;
	  }
	  // iOS Safari 7.x bug
	  var view = new $DataView(new $ArrayBuffer(2))
	    , $setInt8 = $DataView[PROTOTYPE].setInt8;
	  view.setInt8(0, 2147483648);
	  view.setInt8(1, 2147483649);
	  if(view.getInt8(0) || !view.getInt8(1))redefineAll($DataView[PROTOTYPE], {
	    setInt8: function setInt8(byteOffset, value){
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    },
	    setUint8: function setUint8(byteOffset, value){
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    }
	  }, true);
	}
	setToStringTag($ArrayBuffer, ARRAY_BUFFER);
	setToStringTag($DataView, DATA_VIEW);
	hide($DataView[PROTOTYPE], $typed.VIEW, true);
	exports[ARRAY_BUFFER] = $ArrayBuffer;
	exports[DATA_VIEW] = $DataView;

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = false;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var redefine = __webpack_require__(18);
	module.exports = function(target, src, safe){
	  for(var key in src)redefine(target, key, src[key], safe);
	  return target;
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(28)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(31)
	  , hiddenKeys = __webpack_require__(40).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(19)
	  , toIObject    = __webpack_require__(32)
	  , arrayIndexOf = __webpack_require__(36)(false)
	  , IE_PROTO     = __webpack_require__(38)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(33)
	  , defined = __webpack_require__(35);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(34);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(32)
	  , toLength  = __webpack_require__(29)
	  , toIndex   = __webpack_require__(37);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(28)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(39)('keys')
	  , uid    = __webpack_require__(20);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(6)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 40 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	'use strict';
	var toObject = __webpack_require__(42)
	  , toIndex  = __webpack_require__(37)
	  , toLength = __webpack_require__(29);
	module.exports = function fill(value /*, start = 0, end = @length */){
	  var O      = toObject(this)
	    , length = toLength(O.length)
	    , aLen   = arguments.length
	    , index  = toIndex(aLen > 1 ? arguments[1] : undefined, length)
	    , end    = aLen > 2 ? arguments[2] : undefined
	    , endPos = end === undefined ? length : toIndex(end, length);
	  while(endPos > index)O[index++] = value;
	  return O;
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(35);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(9).f
	  , has = __webpack_require__(19)
	  , TAG = __webpack_require__(44)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(39)('wks')
	  , uid        = __webpack_require__(20)
	  , Symbol     = __webpack_require__(6).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(46)('Int8', 1, function(init){
	  return function Int8Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	if(__webpack_require__(13)){
	  var LIBRARY             = __webpack_require__(25)
	    , global              = __webpack_require__(6)
	    , fails               = __webpack_require__(14)
	    , $export             = __webpack_require__(5)
	    , $typed              = __webpack_require__(23)
	    , $buffer             = __webpack_require__(24)
	    , ctx                 = __webpack_require__(21)
	    , anInstance          = __webpack_require__(27)
	    , propertyDesc        = __webpack_require__(17)
	    , hide                = __webpack_require__(8)
	    , redefineAll         = __webpack_require__(26)
	    , toInteger           = __webpack_require__(28)
	    , toLength            = __webpack_require__(29)
	    , toIndex             = __webpack_require__(37)
	    , toPrimitive         = __webpack_require__(16)
	    , has                 = __webpack_require__(19)
	    , same                = __webpack_require__(47)
	    , classof             = __webpack_require__(48)
	    , isObject            = __webpack_require__(11)
	    , toObject            = __webpack_require__(42)
	    , isArrayIter         = __webpack_require__(49)
	    , create              = __webpack_require__(51)
	    , getPrototypeOf      = __webpack_require__(55)
	    , gOPN                = __webpack_require__(30).f
	    , getIterFn           = __webpack_require__(56)
	    , uid                 = __webpack_require__(20)
	    , wks                 = __webpack_require__(44)
	    , createArrayMethod   = __webpack_require__(57)
	    , createArrayIncludes = __webpack_require__(36)
	    , speciesConstructor  = __webpack_require__(61)
	    , ArrayIterators      = __webpack_require__(62)
	    , Iterators           = __webpack_require__(50)
	    , $iterDetect         = __webpack_require__(67)
	    , setSpecies          = __webpack_require__(68)
	    , arrayFill           = __webpack_require__(41)
	    , arrayCopyWithin     = __webpack_require__(69)
	    , $DP                 = __webpack_require__(9)
	    , $GOPD               = __webpack_require__(70)
	    , dP                  = $DP.f
	    , gOPD                = $GOPD.f
	    , RangeError          = global.RangeError
	    , TypeError           = global.TypeError
	    , Uint8Array          = global.Uint8Array
	    , ARRAY_BUFFER        = 'ArrayBuffer'
	    , SHARED_BUFFER       = 'Shared' + ARRAY_BUFFER
	    , BYTES_PER_ELEMENT   = 'BYTES_PER_ELEMENT'
	    , PROTOTYPE           = 'prototype'
	    , ArrayProto          = Array[PROTOTYPE]
	    , $ArrayBuffer        = $buffer.ArrayBuffer
	    , $DataView           = $buffer.DataView
	    , arrayForEach        = createArrayMethod(0)
	    , arrayFilter         = createArrayMethod(2)
	    , arraySome           = createArrayMethod(3)
	    , arrayEvery          = createArrayMethod(4)
	    , arrayFind           = createArrayMethod(5)
	    , arrayFindIndex      = createArrayMethod(6)
	    , arrayIncludes       = createArrayIncludes(true)
	    , arrayIndexOf        = createArrayIncludes(false)
	    , arrayValues         = ArrayIterators.values
	    , arrayKeys           = ArrayIterators.keys
	    , arrayEntries        = ArrayIterators.entries
	    , arrayLastIndexOf    = ArrayProto.lastIndexOf
	    , arrayReduce         = ArrayProto.reduce
	    , arrayReduceRight    = ArrayProto.reduceRight
	    , arrayJoin           = ArrayProto.join
	    , arraySort           = ArrayProto.sort
	    , arraySlice          = ArrayProto.slice
	    , arrayToString       = ArrayProto.toString
	    , arrayToLocaleString = ArrayProto.toLocaleString
	    , ITERATOR            = wks('iterator')
	    , TAG                 = wks('toStringTag')
	    , TYPED_CONSTRUCTOR   = uid('typed_constructor')
	    , DEF_CONSTRUCTOR     = uid('def_constructor')
	    , ALL_CONSTRUCTORS    = $typed.CONSTR
	    , TYPED_ARRAY         = $typed.TYPED
	    , VIEW                = $typed.VIEW
	    , WRONG_LENGTH        = 'Wrong length!';
	
	  var $map = createArrayMethod(1, function(O, length){
	    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
	  });
	
	  var LITTLE_ENDIAN = fails(function(){
	    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
	  });
	
	  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function(){
	    new Uint8Array(1).set({});
	  });
	
	  var strictToLength = function(it, SAME){
	    if(it === undefined)throw TypeError(WRONG_LENGTH);
	    var number = +it
	      , length = toLength(it);
	    if(SAME && !same(number, length))throw RangeError(WRONG_LENGTH);
	    return length;
	  };
	
	  var toOffset = function(it, BYTES){
	    var offset = toInteger(it);
	    if(offset < 0 || offset % BYTES)throw RangeError('Wrong offset!');
	    return offset;
	  };
	
	  var validate = function(it){
	    if(isObject(it) && TYPED_ARRAY in it)return it;
	    throw TypeError(it + ' is not a typed array!');
	  };
	
	  var allocate = function(C, length){
	    if(!(isObject(C) && TYPED_CONSTRUCTOR in C)){
	      throw TypeError('It is not a typed array constructor!');
	    } return new C(length);
	  };
	
	  var speciesFromList = function(O, list){
	    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
	  };
	
	  var fromList = function(C, list){
	    var index  = 0
	      , length = list.length
	      , result = allocate(C, length);
	    while(length > index)result[index] = list[index++];
	    return result;
	  };
	
	  var addGetter = function(it, key, internal){
	    dP(it, key, {get: function(){ return this._d[internal]; }});
	  };
	
	  var $from = function from(source /*, mapfn, thisArg */){
	    var O       = toObject(source)
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , iterFn  = getIterFn(O)
	      , i, length, values, result, step, iterator;
	    if(iterFn != undefined && !isArrayIter(iterFn)){
	      for(iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++){
	        values.push(step.value);
	      } O = values;
	    }
	    if(mapping && aLen > 2)mapfn = ctx(mapfn, arguments[2], 2);
	    for(i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++){
	      result[i] = mapping ? mapfn(O[i], i) : O[i];
	    }
	    return result;
	  };
	
	  var $of = function of(/*...items*/){
	    var index  = 0
	      , length = arguments.length
	      , result = allocate(this, length);
	    while(length > index)result[index] = arguments[index++];
	    return result;
	  };
	
	  // iOS Safari 6.x fails here
	  var TO_LOCALE_BUG = !!Uint8Array && fails(function(){ arrayToLocaleString.call(new Uint8Array(1)); });
	
	  var $toLocaleString = function toLocaleString(){
	    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
	  };
	
	  var proto = {
	    copyWithin: function copyWithin(target, start /*, end */){
	      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    every: function every(callbackfn /*, thisArg */){
	      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    fill: function fill(value /*, start, end */){ // eslint-disable-line no-unused-vars
	      return arrayFill.apply(validate(this), arguments);
	    },
	    filter: function filter(callbackfn /*, thisArg */){
	      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
	        arguments.length > 1 ? arguments[1] : undefined));
	    },
	    find: function find(predicate /*, thisArg */){
	      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    findIndex: function findIndex(predicate /*, thisArg */){
	      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    forEach: function forEach(callbackfn /*, thisArg */){
	      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    indexOf: function indexOf(searchElement /*, fromIndex */){
	      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    includes: function includes(searchElement /*, fromIndex */){
	      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    join: function join(separator){ // eslint-disable-line no-unused-vars
	      return arrayJoin.apply(validate(this), arguments);
	    },
	    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */){ // eslint-disable-line no-unused-vars
	      return arrayLastIndexOf.apply(validate(this), arguments);
	    },
	    map: function map(mapfn /*, thisArg */){
	      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    reduce: function reduce(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
	      return arrayReduce.apply(validate(this), arguments);
	    },
	    reduceRight: function reduceRight(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
	      return arrayReduceRight.apply(validate(this), arguments);
	    },
	    reverse: function reverse(){
	      var that   = this
	        , length = validate(that).length
	        , middle = Math.floor(length / 2)
	        , index  = 0
	        , value;
	      while(index < middle){
	        value         = that[index];
	        that[index++] = that[--length];
	        that[length]  = value;
	      } return that;
	    },
	    some: function some(callbackfn /*, thisArg */){
	      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    sort: function sort(comparefn){
	      return arraySort.call(validate(this), comparefn);
	    },
	    subarray: function subarray(begin, end){
	      var O      = validate(this)
	        , length = O.length
	        , $begin = toIndex(begin, length);
	      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
	        O.buffer,
	        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
	        toLength((end === undefined ? length : toIndex(end, length)) - $begin)
	      );
	    }
	  };
	
	  var $slice = function slice(start, end){
	    return speciesFromList(this, arraySlice.call(validate(this), start, end));
	  };
	
	  var $set = function set(arrayLike /*, offset */){
	    validate(this);
	    var offset = toOffset(arguments[1], 1)
	      , length = this.length
	      , src    = toObject(arrayLike)
	      , len    = toLength(src.length)
	      , index  = 0;
	    if(len + offset > length)throw RangeError(WRONG_LENGTH);
	    while(index < len)this[offset + index] = src[index++];
	  };
	
	  var $iterators = {
	    entries: function entries(){
	      return arrayEntries.call(validate(this));
	    },
	    keys: function keys(){
	      return arrayKeys.call(validate(this));
	    },
	    values: function values(){
	      return arrayValues.call(validate(this));
	    }
	  };
	
	  var isTAIndex = function(target, key){
	    return isObject(target)
	      && target[TYPED_ARRAY]
	      && typeof key != 'symbol'
	      && key in target
	      && String(+key) == String(key);
	  };
	  var $getDesc = function getOwnPropertyDescriptor(target, key){
	    return isTAIndex(target, key = toPrimitive(key, true))
	      ? propertyDesc(2, target[key])
	      : gOPD(target, key);
	  };
	  var $setDesc = function defineProperty(target, key, desc){
	    if(isTAIndex(target, key = toPrimitive(key, true))
	      && isObject(desc)
	      && has(desc, 'value')
	      && !has(desc, 'get')
	      && !has(desc, 'set')
	      // TODO: add validation descriptor w/o calling accessors
	      && !desc.configurable
	      && (!has(desc, 'writable') || desc.writable)
	      && (!has(desc, 'enumerable') || desc.enumerable)
	    ){
	      target[key] = desc.value;
	      return target;
	    } else return dP(target, key, desc);
	  };
	
	  if(!ALL_CONSTRUCTORS){
	    $GOPD.f = $getDesc;
	    $DP.f   = $setDesc;
	  }
	
	  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
	    getOwnPropertyDescriptor: $getDesc,
	    defineProperty:           $setDesc
	  });
	
	  if(fails(function(){ arrayToString.call({}); })){
	    arrayToString = arrayToLocaleString = function toString(){
	      return arrayJoin.call(this);
	    }
	  }
	
	  var $TypedArrayPrototype$ = redefineAll({}, proto);
	  redefineAll($TypedArrayPrototype$, $iterators);
	  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
	  redefineAll($TypedArrayPrototype$, {
	    slice:          $slice,
	    set:            $set,
	    constructor:    function(){ /* noop */ },
	    toString:       arrayToString,
	    toLocaleString: $toLocaleString
	  });
	  addGetter($TypedArrayPrototype$, 'buffer', 'b');
	  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
	  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
	  addGetter($TypedArrayPrototype$, 'length', 'e');
	  dP($TypedArrayPrototype$, TAG, {
	    get: function(){ return this[TYPED_ARRAY]; }
	  });
	
	  module.exports = function(KEY, BYTES, wrapper, CLAMPED){
	    CLAMPED = !!CLAMPED;
	    var NAME       = KEY + (CLAMPED ? 'Clamped' : '') + 'Array'
	      , ISNT_UINT8 = NAME != 'Uint8Array'
	      , GETTER     = 'get' + KEY
	      , SETTER     = 'set' + KEY
	      , TypedArray = global[NAME]
	      , Base       = TypedArray || {}
	      , TAC        = TypedArray && getPrototypeOf(TypedArray)
	      , FORCED     = !TypedArray || !$typed.ABV
	      , O          = {}
	      , TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
	    var getter = function(that, index){
	      var data = that._d;
	      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
	    };
	    var setter = function(that, index, value){
	      var data = that._d;
	      if(CLAMPED)value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
	      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
	    };
	    var addElement = function(that, index){
	      dP(that, index, {
	        get: function(){
	          return getter(this, index);
	        },
	        set: function(value){
	          return setter(this, index, value);
	        },
	        enumerable: true
	      });
	    };
	    if(FORCED){
	      TypedArray = wrapper(function(that, data, $offset, $length){
	        anInstance(that, TypedArray, NAME, '_d');
	        var index  = 0
	          , offset = 0
	          , buffer, byteLength, length, klass;
	        if(!isObject(data)){
	          length     = strictToLength(data, true)
	          byteLength = length * BYTES;
	          buffer     = new $ArrayBuffer(byteLength);
	        } else if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
	          buffer = data;
	          offset = toOffset($offset, BYTES);
	          var $len = data.byteLength;
	          if($length === undefined){
	            if($len % BYTES)throw RangeError(WRONG_LENGTH);
	            byteLength = $len - offset;
	            if(byteLength < 0)throw RangeError(WRONG_LENGTH);
	          } else {
	            byteLength = toLength($length) * BYTES;
	            if(byteLength + offset > $len)throw RangeError(WRONG_LENGTH);
	          }
	          length = byteLength / BYTES;
	        } else if(TYPED_ARRAY in data){
	          return fromList(TypedArray, data);
	        } else {
	          return $from.call(TypedArray, data);
	        }
	        hide(that, '_d', {
	          b: buffer,
	          o: offset,
	          l: byteLength,
	          e: length,
	          v: new $DataView(buffer)
	        });
	        while(index < length)addElement(that, index++);
	      });
	      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
	      hide(TypedArrayPrototype, 'constructor', TypedArray);
	    } else if(!$iterDetect(function(iter){
	      // V8 works with iterators, but fails in many other cases
	      // https://code.google.com/p/v8/issues/detail?id=4552
	      new TypedArray(null); // eslint-disable-line no-new
	      new TypedArray(iter); // eslint-disable-line no-new
	    }, true)){
	      TypedArray = wrapper(function(that, data, $offset, $length){
	        anInstance(that, TypedArray, NAME);
	        var klass;
	        // `ws` module bug, temporarily remove validation length for Uint8Array
	        // https://github.com/websockets/ws/pull/645
	        if(!isObject(data))return new Base(strictToLength(data, ISNT_UINT8));
	        if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
	          return $length !== undefined
	            ? new Base(data, toOffset($offset, BYTES), $length)
	            : $offset !== undefined
	              ? new Base(data, toOffset($offset, BYTES))
	              : new Base(data);
	        }
	        if(TYPED_ARRAY in data)return fromList(TypedArray, data);
	        return $from.call(TypedArray, data);
	      });
	      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function(key){
	        if(!(key in TypedArray))hide(TypedArray, key, Base[key]);
	      });
	      TypedArray[PROTOTYPE] = TypedArrayPrototype;
	      if(!LIBRARY)TypedArrayPrototype.constructor = TypedArray;
	    }
	    var $nativeIterator   = TypedArrayPrototype[ITERATOR]
	      , CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined)
	      , $iterator         = $iterators.values;
	    hide(TypedArray, TYPED_CONSTRUCTOR, true);
	    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
	    hide(TypedArrayPrototype, VIEW, true);
	    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);
	
	    if(CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)){
	      dP(TypedArrayPrototype, TAG, {
	        get: function(){ return NAME; }
	      });
	    }
	
	    O[NAME] = TypedArray;
	
	    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);
	
	    $export($export.S, NAME, {
	      BYTES_PER_ELEMENT: BYTES,
	      from: $from,
	      of: $of
	    });
	
	    if(!(BYTES_PER_ELEMENT in TypedArrayPrototype))hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);
	
	    $export($export.P, NAME, proto);
	
	    setSpecies(NAME);
	
	    $export($export.P + $export.F * FORCED_SET, NAME, {set: $set});
	
	    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);
	
	    $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, {toString: arrayToString});
	
	    $export($export.P + $export.F * fails(function(){
	      new TypedArray(1).slice();
	    }), NAME, {slice: $slice});
	
	    $export($export.P + $export.F * (fails(function(){
	      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString()
	    }) || !fails(function(){
	      TypedArrayPrototype.toLocaleString.call([1, 2]);
	    })), NAME, {toLocaleString: $toLocaleString});
	
	    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
	    if(!LIBRARY && !CORRECT_ITER_NAME)hide(TypedArrayPrototype, ITERATOR, $iterator);
	  };
	} else module.exports = function(){ /* empty */ };

/***/ },
/* 47 */
/***/ function(module, exports) {

	// 7.2.9 SameValue(x, y)
	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(34)
	  , TAG = __webpack_require__(44)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(50)
	  , ITERATOR   = __webpack_require__(44)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 50 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(10)
	  , dPs         = __webpack_require__(52)
	  , enumBugKeys = __webpack_require__(40)
	  , IE_PROTO    = __webpack_require__(38)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(15)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(54).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(9)
	  , anObject = __webpack_require__(10)
	  , getKeys  = __webpack_require__(53);
	
	module.exports = __webpack_require__(13) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(31)
	  , enumBugKeys = __webpack_require__(40);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6).document && document.documentElement;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(19)
	  , toObject    = __webpack_require__(42)
	  , IE_PROTO    = __webpack_require__(38)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(48)
	  , ITERATOR  = __webpack_require__(44)('iterator')
	  , Iterators = __webpack_require__(50);
	module.exports = __webpack_require__(7).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx      = __webpack_require__(21)
	  , IObject  = __webpack_require__(33)
	  , toObject = __webpack_require__(42)
	  , toLength = __webpack_require__(29)
	  , asc      = __webpack_require__(58);
	module.exports = function(TYPE, $create){
	  var IS_MAP        = TYPE == 1
	    , IS_FILTER     = TYPE == 2
	    , IS_SOME       = TYPE == 3
	    , IS_EVERY      = TYPE == 4
	    , IS_FIND_INDEX = TYPE == 6
	    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
	    , create        = $create || asc;
	  return function($this, callbackfn, that){
	    var O      = toObject($this)
	      , self   = IObject(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = toLength(self.length)
	      , index  = 0
	      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
	      , val, res;
	    for(;length > index; index++)if(NO_HOLES || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(TYPE){
	        if(IS_MAP)result[index] = res;            // map
	        else if(res)switch(TYPE){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(IS_EVERY)return false;          // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor = __webpack_require__(59);
	
	module.exports = function(original, length){
	  return new (speciesConstructor(original))(length);
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(11)
	  , isArray  = __webpack_require__(60)
	  , SPECIES  = __webpack_require__(44)('species');
	
	module.exports = function(original){
	  var C;
	  if(isArray(original)){
	    C = original.constructor;
	    // cross-realm fallback
	    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
	    if(isObject(C)){
	      C = C[SPECIES];
	      if(C === null)C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(34);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(10)
	  , aFunction = __webpack_require__(22)
	  , SPECIES   = __webpack_require__(44)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(63)
	  , step             = __webpack_require__(64)
	  , Iterators        = __webpack_require__(50)
	  , toIObject        = __webpack_require__(32);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(65)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = __webpack_require__(44)('unscopables')
	  , ArrayProto  = Array.prototype;
	if(ArrayProto[UNSCOPABLES] == undefined)__webpack_require__(8)(ArrayProto, UNSCOPABLES, {});
	module.exports = function(key){
	  ArrayProto[UNSCOPABLES][key] = true;
	};

/***/ },
/* 64 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(25)
	  , $export        = __webpack_require__(5)
	  , redefine       = __webpack_require__(18)
	  , hide           = __webpack_require__(8)
	  , has            = __webpack_require__(19)
	  , Iterators      = __webpack_require__(50)
	  , $iterCreate    = __webpack_require__(66)
	  , setToStringTag = __webpack_require__(43)
	  , getPrototypeOf = __webpack_require__(55)
	  , ITERATOR       = __webpack_require__(44)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(51)
	  , descriptor     = __webpack_require__(17)
	  , setToStringTag = __webpack_require__(43)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(8)(IteratorPrototype, __webpack_require__(44)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(44)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(6)
	  , dP          = __webpack_require__(9)
	  , DESCRIPTORS = __webpack_require__(13)
	  , SPECIES     = __webpack_require__(44)('species');
	
	module.exports = function(KEY){
	  var C = global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	'use strict';
	var toObject = __webpack_require__(42)
	  , toIndex  = __webpack_require__(37)
	  , toLength = __webpack_require__(29);
	
	module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
	  var O     = toObject(this)
	    , len   = toLength(O.length)
	    , to    = toIndex(target, len)
	    , from  = toIndex(start, len)
	    , end   = arguments.length > 2 ? arguments[2] : undefined
	    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
	    , inc   = 1;
	  if(from < to && to < from + count){
	    inc  = -1;
	    from += count - 1;
	    to   += count - 1;
	  }
	  while(count-- > 0){
	    if(from in O)O[to] = O[from];
	    else delete O[to];
	    to   += inc;
	    from += inc;
	  } return O;
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(71)
	  , createDesc     = __webpack_require__(17)
	  , toIObject      = __webpack_require__(32)
	  , toPrimitive    = __webpack_require__(16)
	  , has            = __webpack_require__(19)
	  , IE8_DOM_DEFINE = __webpack_require__(12)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(13) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 71 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(46)('Uint8', 1, function(init){
	  return function Uint8Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(46)('Uint8', 1, function(init){
	  return function Uint8ClampedArray(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	}, true);

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(46)('Int16', 2, function(init){
	  return function Int16Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(46)('Uint16', 2, function(init){
	  return function Uint16Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(46)('Int32', 4, function(init){
	  return function Int32Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(46)('Uint32', 4, function(init){
	  return function Uint32Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(46)('Float32', 4, function(init){
	  return function Float32Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(46)('Float64', 8, function(init){
	  return function Float64Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(81);
	
	// 23.1 Map Objects
	module.exports = __webpack_require__(85)('Map', function(get){
	  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key){
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value){
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var dP          = __webpack_require__(9).f
	  , create      = __webpack_require__(51)
	  , redefineAll = __webpack_require__(26)
	  , ctx         = __webpack_require__(21)
	  , anInstance  = __webpack_require__(27)
	  , defined     = __webpack_require__(35)
	  , forOf       = __webpack_require__(82)
	  , $iterDefine = __webpack_require__(65)
	  , step        = __webpack_require__(64)
	  , setSpecies  = __webpack_require__(68)
	  , DESCRIPTORS = __webpack_require__(13)
	  , fastKey     = __webpack_require__(84).fastKey
	  , SIZE        = DESCRIPTORS ? '_s' : 'size';
	
	var getEntry = function(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that._i[index];
	  // frozen object case
	  for(entry = that._f; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	};
	
	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      anInstance(that, C, NAME, '_i');
	      that._i = create(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that._f == entry)that._f = next;
	          if(that._l == entry)that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        anInstance(this, C, 'forEach');
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
	          , entry;
	        while(entry = entry ? entry.n : this._f){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if(DESCRIPTORS)dP(C.prototype, 'size', {
	      get: function(){
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that._f)that._f = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function(C, NAME, IS_MAP){
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function(iterated, kind){
	      this._t = iterated;  // target
	      this._k = kind;      // kind
	      this._l = undefined; // previous
	    }, function(){
	      var that  = this
	        , kind  = that._k
	        , entry = that._l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);
	
	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(21)
	  , call        = __webpack_require__(83)
	  , isArrayIter = __webpack_require__(49)
	  , anObject    = __webpack_require__(10)
	  , toLength    = __webpack_require__(29)
	  , getIterFn   = __webpack_require__(56)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(10);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(20)('meta')
	  , isObject = __webpack_require__(11)
	  , has      = __webpack_require__(19)
	  , setDesc  = __webpack_require__(9).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(14)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global            = __webpack_require__(6)
	  , $export           = __webpack_require__(5)
	  , redefine          = __webpack_require__(18)
	  , redefineAll       = __webpack_require__(26)
	  , meta              = __webpack_require__(84)
	  , forOf             = __webpack_require__(82)
	  , anInstance        = __webpack_require__(27)
	  , isObject          = __webpack_require__(11)
	  , fails             = __webpack_require__(14)
	  , $iterDetect       = __webpack_require__(67)
	  , setToStringTag    = __webpack_require__(43)
	  , inheritIfRequired = __webpack_require__(86);
	
	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = global[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  var fixMethod = function(KEY){
	    var fn = proto[KEY];
	    redefine(proto, KEY,
	      KEY == 'delete' ? function(a){
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'has' ? function has(a){
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'get' ? function get(a){
	        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
	        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
	    );
	  };
	  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
	    new C().entries().next();
	  }))){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	    meta.NEED = true;
	  } else {
	    var instance             = new C
	      // early implementations not supports chaining
	      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
	      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
	      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
	      // most early implementations doesn't supports iterables, most modern - not close it correctly
	      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
	      // for early implementations -0 and +0 not the same
	      , BUGGY_ZERO = !IS_WEAK && fails(function(){
	        // V8 ~ Chromium 42- fails only with 5+ elements
	        var $instance = new C()
	          , index     = 5;
	        while(index--)$instance[ADDER](index, index);
	        return !$instance.has(-0);
	      });
	    if(!ACCEPT_ITERABLES){ 
	      C = wrapper(function(target, iterable){
	        anInstance(target, C, NAME);
	        var that = inheritIfRequired(new Base, target, C);
	        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      });
	      C.prototype = proto;
	      proto.constructor = C;
	    }
	    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
	    // weak collections should not contains .clear method
	    if(IS_WEAK && proto.clear)delete proto.clear;
	  }
	
	  setToStringTag(C, NAME);
	
	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F * (C != Base), O);
	
	  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);
	
	  return C;
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var isObject       = __webpack_require__(11)
	  , setPrototypeOf = __webpack_require__(87).set;
	module.exports = function(that, target, C){
	  var P, S = target.constructor;
	  if(S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf){
	    setPrototypeOf(that, P);
	  } return that;
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(11)
	  , anObject = __webpack_require__(10);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(21)(Function.call, __webpack_require__(70).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(81);
	
	// 23.2 Set Objects
	module.exports = __webpack_require__(85)('Set', function(get){
	  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value){
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var each         = __webpack_require__(57)(0)
	  , redefine     = __webpack_require__(18)
	  , meta         = __webpack_require__(84)
	  , assign       = __webpack_require__(90)
	  , weak         = __webpack_require__(92)
	  , isObject     = __webpack_require__(11)
	  , getWeak      = meta.getWeak
	  , isExtensible = Object.isExtensible
	  , uncaughtFrozenStore = weak.ufstore
	  , tmp          = {}
	  , InternalMap;
	
	var wrapper = function(get){
	  return function WeakMap(){
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	};
	
	var methods = {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key){
	    if(isObject(key)){
	      var data = getWeak(key);
	      if(data === true)return uncaughtFrozenStore(this).get(key);
	      return data ? data[this._i] : undefined;
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value){
	    return weak.def(this, key, value);
	  }
	};
	
	// 23.3 WeakMap Objects
	var $WeakMap = module.exports = __webpack_require__(85)('WeakMap', wrapper, methods, weak, true, true);
	
	// IE11 WeakMap frozen keys fix
	if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
	  InternalMap = weak.getConstructor(wrapper);
	  assign(InternalMap.prototype, methods);
	  meta.NEED = true;
	  each(['delete', 'has', 'get', 'set'], function(key){
	    var proto  = $WeakMap.prototype
	      , method = proto[key];
	    redefine(proto, key, function(a, b){
	      // store frozen objects on internal weakmap shim
	      if(isObject(a) && !isExtensible(a)){
	        if(!this._f)this._f = new InternalMap;
	        var result = this._f[key](a, b);
	        return key == 'set' ? this : result;
	      // store all the rest on native weakmap
	      } return method.call(this, a, b);
	    });
	  });
	}

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(53)
	  , gOPS     = __webpack_require__(91)
	  , pIE      = __webpack_require__(71)
	  , toObject = __webpack_require__(42)
	  , IObject  = __webpack_require__(33)
	  , $assign  = Object.assign;
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(14)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 91 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var redefineAll       = __webpack_require__(26)
	  , getWeak           = __webpack_require__(84).getWeak
	  , anObject          = __webpack_require__(10)
	  , isObject          = __webpack_require__(11)
	  , anInstance        = __webpack_require__(27)
	  , forOf             = __webpack_require__(82)
	  , createArrayMethod = __webpack_require__(57)
	  , $has              = __webpack_require__(19)
	  , arrayFind         = createArrayMethod(5)
	  , arrayFindIndex    = createArrayMethod(6)
	  , id                = 0;
	
	// fallback for uncaught frozen keys
	var uncaughtFrozenStore = function(that){
	  return that._l || (that._l = new UncaughtFrozenStore);
	};
	var UncaughtFrozenStore = function(){
	  this.a = [];
	};
	var findUncaughtFrozen = function(store, key){
	  return arrayFind(store.a, function(it){
	    return it[0] === key;
	  });
	};
	UncaughtFrozenStore.prototype = {
	  get: function(key){
	    var entry = findUncaughtFrozen(this, key);
	    if(entry)return entry[1];
	  },
	  has: function(key){
	    return !!findUncaughtFrozen(this, key);
	  },
	  set: function(key, value){
	    var entry = findUncaughtFrozen(this, key);
	    if(entry)entry[1] = value;
	    else this.a.push([key, value]);
	  },
	  'delete': function(key){
	    var index = arrayFindIndex(this.a, function(it){
	      return it[0] === key;
	    });
	    if(~index)this.a.splice(index, 1);
	    return !!~index;
	  }
	};
	
	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      anInstance(that, C, NAME, '_i');
	      that._i = id++;      // collection id
	      that._l = undefined; // leak store for uncaught frozen objects
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function(key){
	        if(!isObject(key))return false;
	        var data = getWeak(key);
	        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
	        return data && $has(data, this._i) && delete data[this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key){
	        if(!isObject(key))return false;
	        var data = getWeak(key);
	        if(data === true)return uncaughtFrozenStore(this).has(key);
	        return data && $has(data, this._i);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var data = getWeak(anObject(key), true);
	    if(data === true)uncaughtFrozenStore(that).set(key, value);
	    else data[that._i] = value;
	    return that;
	  },
	  ufstore: uncaughtFrozenStore
	};

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var weak = __webpack_require__(92);
	
	// 23.4 WeakSet Objects
	__webpack_require__(85)('WeakSet', function(get){
	  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.4.3.1 WeakSet.prototype.add(value)
	  add: function add(value){
	    return weak.def(this, value, true);
	  }
	}, weak, false, true);

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
	var $export   = __webpack_require__(5)
	  , aFunction = __webpack_require__(22)
	  , anObject  = __webpack_require__(10)
	  , rApply    = (__webpack_require__(6).Reflect || {}).apply
	  , fApply    = Function.apply;
	// MS Edge argumentsList argument is optional
	$export($export.S + $export.F * !__webpack_require__(14)(function(){
	  rApply(function(){});
	}), 'Reflect', {
	  apply: function apply(target, thisArgument, argumentsList){
	    var T = aFunction(target)
	      , L = anObject(argumentsList);
	    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
	  }
	});

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
	var $export    = __webpack_require__(5)
	  , create     = __webpack_require__(51)
	  , aFunction  = __webpack_require__(22)
	  , anObject   = __webpack_require__(10)
	  , isObject   = __webpack_require__(11)
	  , fails      = __webpack_require__(14)
	  , bind       = __webpack_require__(96)
	  , rConstruct = (__webpack_require__(6).Reflect || {}).construct;
	
	// MS Edge supports only 2 arguments and argumentsList argument is optional
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	var NEW_TARGET_BUG = fails(function(){
	  function F(){}
	  return !(rConstruct(function(){}, [], F) instanceof F);
	});
	var ARGS_BUG = !fails(function(){
	  rConstruct(function(){});
	});
	
	$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
	  construct: function construct(Target, args /*, newTarget*/){
	    aFunction(Target);
	    anObject(args);
	    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
	    if(ARGS_BUG && !NEW_TARGET_BUG)return rConstruct(Target, args, newTarget);
	    if(Target == newTarget){
	      // w/o altered newTarget, optimization for 0-4 arguments
	      switch(args.length){
	        case 0: return new Target;
	        case 1: return new Target(args[0]);
	        case 2: return new Target(args[0], args[1]);
	        case 3: return new Target(args[0], args[1], args[2]);
	        case 4: return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (bind.apply(Target, $args));
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto    = newTarget.prototype
	      , instance = create(isObject(proto) ? proto : Object.prototype)
	      , result   = Function.apply.call(Target, instance, args);
	    return isObject(result) ? result : instance;
	  }
	});

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var aFunction  = __webpack_require__(22)
	  , isObject   = __webpack_require__(11)
	  , invoke     = __webpack_require__(97)
	  , arraySlice = [].slice
	  , factories  = {};
	
	var construct = function(F, len, args){
	  if(!(len in factories)){
	    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
	    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
	  } return factories[len](F, args);
	};
	
	module.exports = Function.bind || function bind(that /*, args... */){
	  var fn       = aFunction(this)
	    , partArgs = arraySlice.call(arguments, 1);
	  var bound = function(/* args... */){
	    var args = partArgs.concat(arraySlice.call(arguments));
	    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
	  };
	  if(isObject(fn.prototype))bound.prototype = fn.prototype;
	  return bound;
	};

/***/ },
/* 97 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
	var dP          = __webpack_require__(9)
	  , $export     = __webpack_require__(5)
	  , anObject    = __webpack_require__(10)
	  , toPrimitive = __webpack_require__(16);
	
	// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
	$export($export.S + $export.F * __webpack_require__(14)(function(){
	  Reflect.defineProperty(dP.f({}, 1, {value: 1}), 1, {value: 2});
	}), 'Reflect', {
	  defineProperty: function defineProperty(target, propertyKey, attributes){
	    anObject(target);
	    propertyKey = toPrimitive(propertyKey, true);
	    anObject(attributes);
	    try {
	      dP.f(target, propertyKey, attributes);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.4 Reflect.deleteProperty(target, propertyKey)
	var $export  = __webpack_require__(5)
	  , gOPD     = __webpack_require__(70).f
	  , anObject = __webpack_require__(10);
	
	$export($export.S, 'Reflect', {
	  deleteProperty: function deleteProperty(target, propertyKey){
	    var desc = gOPD(anObject(target), propertyKey);
	    return desc && !desc.configurable ? false : delete target[propertyKey];
	  }
	});

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.6 Reflect.get(target, propertyKey [, receiver])
	var gOPD           = __webpack_require__(70)
	  , getPrototypeOf = __webpack_require__(55)
	  , has            = __webpack_require__(19)
	  , $export        = __webpack_require__(5)
	  , isObject       = __webpack_require__(11)
	  , anObject       = __webpack_require__(10);
	
	function get(target, propertyKey/*, receiver*/){
	  var receiver = arguments.length < 3 ? target : arguments[2]
	    , desc, proto;
	  if(anObject(target) === receiver)return target[propertyKey];
	  if(desc = gOPD.f(target, propertyKey))return has(desc, 'value')
	    ? desc.value
	    : desc.get !== undefined
	      ? desc.get.call(receiver)
	      : undefined;
	  if(isObject(proto = getPrototypeOf(target)))return get(proto, propertyKey, receiver);
	}
	
	$export($export.S, 'Reflect', {get: get});

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
	var gOPD     = __webpack_require__(70)
	  , $export  = __webpack_require__(5)
	  , anObject = __webpack_require__(10);
	
	$export($export.S, 'Reflect', {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
	    return gOPD.f(anObject(target), propertyKey);
	  }
	});

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.8 Reflect.getPrototypeOf(target)
	var $export  = __webpack_require__(5)
	  , getProto = __webpack_require__(55)
	  , anObject = __webpack_require__(10);
	
	$export($export.S, 'Reflect', {
	  getPrototypeOf: function getPrototypeOf(target){
	    return getProto(anObject(target));
	  }
	});

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.9 Reflect.has(target, propertyKey)
	var $export = __webpack_require__(5);
	
	$export($export.S, 'Reflect', {
	  has: function has(target, propertyKey){
	    return propertyKey in target;
	  }
	});

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.10 Reflect.isExtensible(target)
	var $export       = __webpack_require__(5)
	  , anObject      = __webpack_require__(10)
	  , $isExtensible = Object.isExtensible;
	
	$export($export.S, 'Reflect', {
	  isExtensible: function isExtensible(target){
	    anObject(target);
	    return $isExtensible ? $isExtensible(target) : true;
	  }
	});

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.11 Reflect.ownKeys(target)
	var $export = __webpack_require__(5);
	
	$export($export.S, 'Reflect', {ownKeys: __webpack_require__(106)});

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	// all object keys, includes non-enumerable and symbols
	var gOPN     = __webpack_require__(30)
	  , gOPS     = __webpack_require__(91)
	  , anObject = __webpack_require__(10)
	  , Reflect  = __webpack_require__(6).Reflect;
	module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
	  var keys       = gOPN.f(anObject(it))
	    , getSymbols = gOPS.f;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.12 Reflect.preventExtensions(target)
	var $export            = __webpack_require__(5)
	  , anObject           = __webpack_require__(10)
	  , $preventExtensions = Object.preventExtensions;
	
	$export($export.S, 'Reflect', {
	  preventExtensions: function preventExtensions(target){
	    anObject(target);
	    try {
	      if($preventExtensions)$preventExtensions(target);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
	var dP             = __webpack_require__(9)
	  , gOPD           = __webpack_require__(70)
	  , getPrototypeOf = __webpack_require__(55)
	  , has            = __webpack_require__(19)
	  , $export        = __webpack_require__(5)
	  , createDesc     = __webpack_require__(17)
	  , anObject       = __webpack_require__(10)
	  , isObject       = __webpack_require__(11);
	
	function set(target, propertyKey, V/*, receiver*/){
	  var receiver = arguments.length < 4 ? target : arguments[3]
	    , ownDesc  = gOPD.f(anObject(target), propertyKey)
	    , existingDescriptor, proto;
	  if(!ownDesc){
	    if(isObject(proto = getPrototypeOf(target))){
	      return set(proto, propertyKey, V, receiver);
	    }
	    ownDesc = createDesc(0);
	  }
	  if(has(ownDesc, 'value')){
	    if(ownDesc.writable === false || !isObject(receiver))return false;
	    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
	    existingDescriptor.value = V;
	    dP.f(receiver, propertyKey, existingDescriptor);
	    return true;
	  }
	  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
	}
	
	$export($export.S, 'Reflect', {set: set});

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.14 Reflect.setPrototypeOf(target, proto)
	var $export  = __webpack_require__(5)
	  , setProto = __webpack_require__(87);
	
	if(setProto)$export($export.S, 'Reflect', {
	  setPrototypeOf: function setPrototypeOf(target, proto){
	    setProto.check(target, proto);
	    try {
	      setProto.set(target, proto);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(25)
	  , global             = __webpack_require__(6)
	  , ctx                = __webpack_require__(21)
	  , classof            = __webpack_require__(48)
	  , $export            = __webpack_require__(5)
	  , isObject           = __webpack_require__(11)
	  , aFunction          = __webpack_require__(22)
	  , anInstance         = __webpack_require__(27)
	  , forOf              = __webpack_require__(82)
	  , speciesConstructor = __webpack_require__(61)
	  , task               = __webpack_require__(111).set
	  , microtask          = __webpack_require__(112)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;
	
	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(44)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();
	
	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};
	
	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(26)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(43)($Promise, PROMISE);
	__webpack_require__(68)(PROMISE);
	Wrapper = __webpack_require__(7)[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(67)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(21)
	  , invoke             = __webpack_require__(97)
	  , html               = __webpack_require__(54)
	  , cel                = __webpack_require__(15)
	  , global             = __webpack_require__(6)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(34)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(6)
	  , macrotask = __webpack_require__(111).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(34)(process) == 'process';
	
	module.exports = function(){
	  var head, last, notify;
	
	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };
	
	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }
	
	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(6)
	  , has            = __webpack_require__(19)
	  , DESCRIPTORS    = __webpack_require__(13)
	  , $export        = __webpack_require__(5)
	  , redefine       = __webpack_require__(18)
	  , META           = __webpack_require__(84).KEY
	  , $fails         = __webpack_require__(14)
	  , shared         = __webpack_require__(39)
	  , setToStringTag = __webpack_require__(43)
	  , uid            = __webpack_require__(20)
	  , wks            = __webpack_require__(44)
	  , wksExt         = __webpack_require__(114)
	  , wksDefine      = __webpack_require__(115)
	  , keyOf          = __webpack_require__(116)
	  , enumKeys       = __webpack_require__(117)
	  , isArray        = __webpack_require__(60)
	  , anObject       = __webpack_require__(10)
	  , toIObject      = __webpack_require__(32)
	  , toPrimitive    = __webpack_require__(16)
	  , createDesc     = __webpack_require__(17)
	  , _create        = __webpack_require__(51)
	  , gOPNExt        = __webpack_require__(118)
	  , $GOPD          = __webpack_require__(70)
	  , $DP            = __webpack_require__(9)
	  , $keys          = __webpack_require__(53)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(30).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(71).f  = $propertyIsEnumerable;
	  __webpack_require__(91).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(25)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});
	
	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);
	
	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(8)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(44);

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(6)
	  , core           = __webpack_require__(7)
	  , LIBRARY        = __webpack_require__(25)
	  , wksExt         = __webpack_require__(114)
	  , defineProperty = __webpack_require__(9).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(53)
	  , toIObject = __webpack_require__(32);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(53)
	  , gOPS    = __webpack_require__(91)
	  , pIE     = __webpack_require__(71);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(32)
	  , gOPN      = __webpack_require__(30).f
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(5);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(90)});

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.10 Object.is(value1, value2)
	var $export = __webpack_require__(5);
	$export($export.S, 'Object', {is: __webpack_require__(47)});

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(5);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(87).set});

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(9).f
	  , createDesc = __webpack_require__(17)
	  , has        = __webpack_require__(19)
	  , FProto     = Function.prototype
	  , nameRE     = /^\s*function ([^ (]*)/
	  , NAME       = 'name';
	
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	
	// 19.2.4.2 name
	NAME in FProto || __webpack_require__(13) && dP(FProto, NAME, {
	  configurable: true,
	  get: function(){
	    try {
	      var that = this
	        , name = ('' + that).match(nameRE)[1];
	      has(that, NAME) || !isExtensible(that) || dP(that, NAME, createDesc(5, name));
	      return name;
	    } catch(e){
	      return '';
	    }
	  }
	});

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var $export   = __webpack_require__(5)
	  , toIObject = __webpack_require__(32)
	  , toLength  = __webpack_require__(29);
	
	$export($export.S, 'String', {
	  // 21.1.2.4 String.raw(callSite, ...substitutions)
	  raw: function raw(callSite){
	    var tpl  = toIObject(callSite.raw)
	      , len  = toLength(tpl.length)
	      , aLen = arguments.length
	      , res  = []
	      , i    = 0;
	    while(len > i){
	      res.push(String(tpl[i++]));
	      if(i < aLen)res.push(String(arguments[i]));
	    } return res.join('');
	  }
	});

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var $export        = __webpack_require__(5)
	  , toIndex        = __webpack_require__(37)
	  , fromCharCode   = String.fromCharCode
	  , $fromCodePoint = String.fromCodePoint;
	
	// length should be 1, old FF problem
	$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
	  // 21.1.2.2 String.fromCodePoint(...codePoints)
	  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
	    var res  = []
	      , aLen = arguments.length
	      , i    = 0
	      , code;
	    while(aLen > i){
	      code = +arguments[i++];
	      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
	      res.push(code < 0x10000
	        ? fromCharCode(code)
	        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
	      );
	    } return res.join('');
	  }
	});

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(5)
	  , $at     = __webpack_require__(126)(false);
	$export($export.P, 'String', {
	  // 21.1.3.3 String.prototype.codePointAt(pos)
	  codePointAt: function codePointAt(pos){
	    return $at(this, pos);
	  }
	});

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(28)
	  , defined   = __webpack_require__(35);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(5);
	
	$export($export.P, 'String', {
	  // 21.1.3.13 String.prototype.repeat(count)
	  repeat: __webpack_require__(128)
	});

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var toInteger = __webpack_require__(28)
	  , defined   = __webpack_require__(35);
	
	module.exports = function repeat(count){
	  var str = String(defined(this))
	    , res = ''
	    , n   = toInteger(count);
	  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
	  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
	  return res;
	};

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
	'use strict';
	var $export     = __webpack_require__(5)
	  , toLength    = __webpack_require__(29)
	  , context     = __webpack_require__(130)
	  , STARTS_WITH = 'startsWith'
	  , $startsWith = ''[STARTS_WITH];
	
	$export($export.P + $export.F * __webpack_require__(132)(STARTS_WITH), 'String', {
	  startsWith: function startsWith(searchString /*, position = 0 */){
	    var that   = context(this, searchString, STARTS_WITH)
	      , index  = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length))
	      , search = String(searchString);
	    return $startsWith
	      ? $startsWith.call(that, search, index)
	      : that.slice(index, index + search.length) === search;
	  }
	});

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	// helper for String#{startsWith, endsWith, includes}
	var isRegExp = __webpack_require__(131)
	  , defined  = __webpack_require__(35);
	
	module.exports = function(that, searchString, NAME){
	  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
	  return String(defined(that));
	};

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.8 IsRegExp(argument)
	var isObject = __webpack_require__(11)
	  , cof      = __webpack_require__(34)
	  , MATCH    = __webpack_require__(44)('match');
	module.exports = function(it){
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
	};

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	var MATCH = __webpack_require__(44)('match');
	module.exports = function(KEY){
	  var re = /./;
	  try {
	    '/./'[KEY](re);
	  } catch(e){
	    try {
	      re[MATCH] = false;
	      return !'/./'[KEY](re);
	    } catch(f){ /* empty */ }
	  } return true;
	};

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
	'use strict';
	var $export   = __webpack_require__(5)
	  , toLength  = __webpack_require__(29)
	  , context   = __webpack_require__(130)
	  , ENDS_WITH = 'endsWith'
	  , $endsWith = ''[ENDS_WITH];
	
	$export($export.P + $export.F * __webpack_require__(132)(ENDS_WITH), 'String', {
	  endsWith: function endsWith(searchString /*, endPosition = @length */){
	    var that = context(this, searchString, ENDS_WITH)
	      , endPosition = arguments.length > 1 ? arguments[1] : undefined
	      , len    = toLength(that.length)
	      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
	      , search = String(searchString);
	    return $endsWith
	      ? $endsWith.call(that, search, end)
	      : that.slice(end - search.length, end) === search;
	  }
	});

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.7 String.prototype.includes(searchString, position = 0)
	'use strict';
	var $export  = __webpack_require__(5)
	  , context  = __webpack_require__(130)
	  , INCLUDES = 'includes';
	
	$export($export.P + $export.F * __webpack_require__(132)(INCLUDES), 'String', {
	  includes: function includes(searchString /*, position = 0 */){
	    return !!~context(this, searchString, INCLUDES)
	      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	// 21.2.5.3 get RegExp.prototype.flags()
	if(__webpack_require__(13) && /./g.flags != 'g')__webpack_require__(9).f(RegExp.prototype, 'flags', {
	  configurable: true,
	  get: __webpack_require__(136)
	});

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 21.2.5.3 get RegExp.prototype.flags
	var anObject = __webpack_require__(10);
	module.exports = function(){
	  var that   = anObject(this)
	    , result = '';
	  if(that.global)     result += 'g';
	  if(that.ignoreCase) result += 'i';
	  if(that.multiline)  result += 'm';
	  if(that.unicode)    result += 'u';
	  if(that.sticky)     result += 'y';
	  return result;
	};

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	// @@match logic
	__webpack_require__(138)('match', 1, function(defined, MATCH, $match){
	  // 21.1.3.11 String.prototype.match(regexp)
	  return [function match(regexp){
	    'use strict';
	    var O  = defined(this)
	      , fn = regexp == undefined ? undefined : regexp[MATCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	  }, $match];
	});

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var hide     = __webpack_require__(8)
	  , redefine = __webpack_require__(18)
	  , fails    = __webpack_require__(14)
	  , defined  = __webpack_require__(35)
	  , wks      = __webpack_require__(44);
	
	module.exports = function(KEY, length, exec){
	  var SYMBOL   = wks(KEY)
	    , fns      = exec(defined, SYMBOL, ''[KEY])
	    , strfn    = fns[0]
	    , rxfn     = fns[1];
	  if(fails(function(){
	    var O = {};
	    O[SYMBOL] = function(){ return 7; };
	    return ''[KEY](O) != 7;
	  })){
	    redefine(String.prototype, KEY, strfn);
	    hide(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function(string, arg){ return rxfn.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function(string){ return rxfn.call(string, this); }
	    );
	  }
	};

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	// @@replace logic
	__webpack_require__(138)('replace', 2, function(defined, REPLACE, $replace){
	  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
	  return [function replace(searchValue, replaceValue){
	    'use strict';
	    var O  = defined(this)
	      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	    return fn !== undefined
	      ? fn.call(searchValue, O, replaceValue)
	      : $replace.call(String(O), searchValue, replaceValue);
	  }, $replace];
	});

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	// @@split logic
	__webpack_require__(138)('split', 2, function(defined, SPLIT, $split){
	  'use strict';
	  var isRegExp   = __webpack_require__(131)
	    , _split     = $split
	    , $push      = [].push
	    , $SPLIT     = 'split'
	    , LENGTH     = 'length'
	    , LAST_INDEX = 'lastIndex';
	  if(
	    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
	    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
	    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
	    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
	    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
	    ''[$SPLIT](/.?/)[LENGTH]
	  ){
	    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
	    // based on es5-shim implementation, need to rework it
	    $split = function(separator, limit){
	      var string = String(this);
	      if(separator === undefined && limit === 0)return [];
	      // If `separator` is not a regex, use native split
	      if(!isRegExp(separator))return _split.call(string, separator, limit);
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') +
	                  (separator.multiline ? 'm' : '') +
	                  (separator.unicode ? 'u' : '') +
	                  (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var separator2, match, lastIndex, lastLength, i;
	      // Doesn't need flags gy, but they don't hurt
	      if(!NPCG)separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
	      while(match = separatorCopy.exec(string)){
	        // `separatorCopy.lastIndex` is not reliable cross-browser
	        lastIndex = match.index + match[0][LENGTH];
	        if(lastIndex > lastLastIndex){
	          output.push(string.slice(lastLastIndex, match.index));
	          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
	          if(!NPCG && match[LENGTH] > 1)match[0].replace(separator2, function(){
	            for(i = 1; i < arguments[LENGTH] - 2; i++)if(arguments[i] === undefined)match[i] = undefined;
	          });
	          if(match[LENGTH] > 1 && match.index < string[LENGTH])$push.apply(output, match.slice(1));
	          lastLength = match[0][LENGTH];
	          lastLastIndex = lastIndex;
	          if(output[LENGTH] >= splitLimit)break;
	        }
	        if(separatorCopy[LAST_INDEX] === match.index)separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
	      }
	      if(lastLastIndex === string[LENGTH]){
	        if(lastLength || !separatorCopy.test(''))output.push('');
	      } else output.push(string.slice(lastLastIndex));
	      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
	    };
	  // Chakra, V8
	  } else if('0'[$SPLIT](undefined, 0)[LENGTH]){
	    $split = function(separator, limit){
	      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
	    };
	  }
	  // 21.1.3.17 String.prototype.split(separator, limit)
	  return [function split(separator, limit){
	    var O  = defined(this)
	      , fn = separator == undefined ? undefined : separator[SPLIT];
	    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
	  }, $split];
	});

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	// @@search logic
	__webpack_require__(138)('search', 1, function(defined, SEARCH, $search){
	  // 21.1.3.15 String.prototype.search(regexp)
	  return [function search(regexp){
	    'use strict';
	    var O  = defined(this)
	      , fn = regexp == undefined ? undefined : regexp[SEARCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
	  }, $search];
	});

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(21)
	  , $export        = __webpack_require__(5)
	  , toObject       = __webpack_require__(42)
	  , call           = __webpack_require__(83)
	  , isArrayIter    = __webpack_require__(49)
	  , toLength       = __webpack_require__(29)
	  , createProperty = __webpack_require__(143)
	  , getIterFn      = __webpack_require__(56);
	
	$export($export.S + $export.F * !__webpack_require__(67)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(9)
	  , createDesc      = __webpack_require__(17);
	
	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export        = __webpack_require__(5)
	  , createProperty = __webpack_require__(143);
	
	// WebKit Array.of isn't generic
	$export($export.S + $export.F * __webpack_require__(14)(function(){
	  function F(){}
	  return !(Array.of.call(F) instanceof F);
	}), 'Array', {
	  // 22.1.2.3 Array.of( ...items)
	  of: function of(/* ...args */){
	    var index  = 0
	      , aLen   = arguments.length
	      , result = new (typeof this == 'function' ? this : Array)(aLen);
	    while(aLen > index)createProperty(result, index, arguments[index++]);
	    result.length = aLen;
	    return result;
	  }
	});

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	var $export = __webpack_require__(5);
	
	$export($export.P, 'Array', {copyWithin: __webpack_require__(69)});
	
	__webpack_require__(63)('copyWithin');

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
	var $export = __webpack_require__(5)
	  , $find   = __webpack_require__(57)(5)
	  , KEY     = 'find'
	  , forced  = true;
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
	  find: function find(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(63)(KEY);

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
	var $export = __webpack_require__(5)
	  , $find   = __webpack_require__(57)(6)
	  , KEY     = 'findIndex'
	  , forced  = true;
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
	  findIndex: function findIndex(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(63)(KEY);

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	var $export = __webpack_require__(5);
	
	$export($export.P, 'Array', {fill: __webpack_require__(41)});
	
	__webpack_require__(63)('fill');

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.2 Number.isFinite(number)
	var $export   = __webpack_require__(5)
	  , _isFinite = __webpack_require__(6).isFinite;
	
	$export($export.S, 'Number', {
	  isFinite: function isFinite(it){
	    return typeof it == 'number' && _isFinite(it);
	  }
	});

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var $export = __webpack_require__(5);
	
	$export($export.S, 'Number', {isInteger: __webpack_require__(151)});

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var isObject = __webpack_require__(11)
	  , floor    = Math.floor;
	module.exports = function isInteger(it){
	  return !isObject(it) && isFinite(it) && floor(it) === it;
	};

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.5 Number.isSafeInteger(number)
	var $export   = __webpack_require__(5)
	  , isInteger = __webpack_require__(151)
	  , abs       = Math.abs;
	
	$export($export.S, 'Number', {
	  isSafeInteger: function isSafeInteger(number){
	    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
	  }
	});

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.4 Number.isNaN(number)
	var $export = __webpack_require__(5);
	
	$export($export.S, 'Number', {
	  isNaN: function isNaN(number){
	    return number != number;
	  }
	});

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.1 Number.EPSILON
	var $export = __webpack_require__(5);
	
	$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.10 Number.MIN_SAFE_INTEGER
	var $export = __webpack_require__(5);
	
	$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.6 Number.MAX_SAFE_INTEGER
	var $export = __webpack_require__(5);
	
	$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.3 Math.acosh(x)
	var $export = __webpack_require__(5)
	  , log1p   = __webpack_require__(158)
	  , sqrt    = Math.sqrt
	  , $acosh  = Math.acosh;
	
	$export($export.S + $export.F * !($acosh
	  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
	  && Math.floor($acosh(Number.MAX_VALUE)) == 710
	  // Tor Browser bug: Math.acosh(Infinity) -> NaN 
	  && $acosh(Infinity) == Infinity
	), 'Math', {
	  acosh: function acosh(x){
	    return (x = +x) < 1 ? NaN : x > 94906265.62425156
	      ? Math.log(x) + Math.LN2
	      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
	  }
	});

/***/ },
/* 158 */
/***/ function(module, exports) {

	// 20.2.2.20 Math.log1p(x)
	module.exports = Math.log1p || function log1p(x){
	  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
	};

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.5 Math.asinh(x)
	var $export = __webpack_require__(5)
	  , $asinh  = Math.asinh;
	
	function asinh(x){
	  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
	}
	
	// Tor Browser bug: Math.asinh(0) -> -0 
	$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', {asinh: asinh});

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.7 Math.atanh(x)
	var $export = __webpack_require__(5)
	  , $atanh  = Math.atanh;
	
	// Tor Browser bug: Math.atanh(-0) -> 0 
	$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
	  atanh: function atanh(x){
	    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
	  }
	});

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.9 Math.cbrt(x)
	var $export = __webpack_require__(5)
	  , sign    = __webpack_require__(162);
	
	$export($export.S, 'Math', {
	  cbrt: function cbrt(x){
	    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
	  }
	});

/***/ },
/* 162 */
/***/ function(module, exports) {

	// 20.2.2.28 Math.sign(x)
	module.exports = Math.sign || function sign(x){
	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	};

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.11 Math.clz32(x)
	var $export = __webpack_require__(5);
	
	$export($export.S, 'Math', {
	  clz32: function clz32(x){
	    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
	  }
	});

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.12 Math.cosh(x)
	var $export = __webpack_require__(5)
	  , exp     = Math.exp;
	
	$export($export.S, 'Math', {
	  cosh: function cosh(x){
	    return (exp(x = +x) + exp(-x)) / 2;
	  }
	});

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.14 Math.expm1(x)
	var $export = __webpack_require__(5)
	  , $expm1  = __webpack_require__(166);
	
	$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', {expm1: $expm1});

/***/ },
/* 166 */
/***/ function(module, exports) {

	// 20.2.2.14 Math.expm1(x)
	var $expm1 = Math.expm1;
	module.exports = (!$expm1
	  // Old FF bug
	  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
	  // Tor Browser bug
	  || $expm1(-2e-17) != -2e-17
	) ? function expm1(x){
	  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
	} : $expm1;

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.16 Math.fround(x)
	var $export   = __webpack_require__(5)
	  , sign      = __webpack_require__(162)
	  , pow       = Math.pow
	  , EPSILON   = pow(2, -52)
	  , EPSILON32 = pow(2, -23)
	  , MAX32     = pow(2, 127) * (2 - EPSILON32)
	  , MIN32     = pow(2, -126);
	
	var roundTiesToEven = function(n){
	  return n + 1 / EPSILON - 1 / EPSILON;
	};
	
	
	$export($export.S, 'Math', {
	  fround: function fround(x){
	    var $abs  = Math.abs(x)
	      , $sign = sign(x)
	      , a, result;
	    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
	    a = (1 + EPSILON32 / EPSILON) * $abs;
	    result = a - (a - $abs);
	    if(result > MAX32 || result != result)return $sign * Infinity;
	    return $sign * result;
	  }
	});

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
	var $export = __webpack_require__(5)
	  , abs     = Math.abs;
	
	$export($export.S, 'Math', {
	  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
	    var sum  = 0
	      , i    = 0
	      , aLen = arguments.length
	      , larg = 0
	      , arg, div;
	    while(i < aLen){
	      arg = abs(arguments[i++]);
	      if(larg < arg){
	        div  = larg / arg;
	        sum  = sum * div * div + 1;
	        larg = arg;
	      } else if(arg > 0){
	        div  = arg / larg;
	        sum += div * div;
	      } else sum += arg;
	    }
	    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
	  }
	});

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.18 Math.imul(x, y)
	var $export = __webpack_require__(5)
	  , $imul   = Math.imul;
	
	// some WebKit versions fails with big numbers, some has wrong arity
	$export($export.S + $export.F * __webpack_require__(14)(function(){
	  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
	}), 'Math', {
	  imul: function imul(x, y){
	    var UINT16 = 0xffff
	      , xn = +x
	      , yn = +y
	      , xl = UINT16 & xn
	      , yl = UINT16 & yn;
	    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
	  }
	});

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.20 Math.log1p(x)
	var $export = __webpack_require__(5);
	
	$export($export.S, 'Math', {log1p: __webpack_require__(158)});

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.21 Math.log10(x)
	var $export = __webpack_require__(5);
	
	$export($export.S, 'Math', {
	  log10: function log10(x){
	    return Math.log(x) / Math.LN10;
	  }
	});

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.22 Math.log2(x)
	var $export = __webpack_require__(5);
	
	$export($export.S, 'Math', {
	  log2: function log2(x){
	    return Math.log(x) / Math.LN2;
	  }
	});

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.28 Math.sign(x)
	var $export = __webpack_require__(5);
	
	$export($export.S, 'Math', {sign: __webpack_require__(162)});

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.30 Math.sinh(x)
	var $export = __webpack_require__(5)
	  , expm1   = __webpack_require__(166)
	  , exp     = Math.exp;
	
	// V8 near Chromium 38 has a problem with very small numbers
	$export($export.S + $export.F * __webpack_require__(14)(function(){
	  return !Math.sinh(-2e-17) != -2e-17;
	}), 'Math', {
	  sinh: function sinh(x){
	    return Math.abs(x = +x) < 1
	      ? (expm1(x) - expm1(-x)) / 2
	      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
	  }
	});

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.33 Math.tanh(x)
	var $export = __webpack_require__(5)
	  , expm1   = __webpack_require__(166)
	  , exp     = Math.exp;
	
	$export($export.S, 'Math', {
	  tanh: function tanh(x){
	    var a = expm1(x = +x)
	      , b = expm1(-x);
	    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
	  }
	});

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.34 Math.trunc(x)
	var $export = __webpack_require__(5);
	
	$export($export.S, 'Math', {
	  trunc: function trunc(it){
	    return (it > 0 ? Math.floor : Math.ceil)(it);
	  }
	});

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/tc39/Array.prototype.includes
	var $export   = __webpack_require__(5)
	  , $includes = __webpack_require__(36)(true);
	
	$export($export.P, 'Array', {
	  includes: function includes(el /*, fromIndex = 0 */){
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	
	__webpack_require__(63)('includes');

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-values-entries
	var $export = __webpack_require__(5)
	  , $values = __webpack_require__(179)(false);
	
	$export($export.S, 'Object', {
	  values: function values(it){
	    return $values(it);
	  }
	});

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(53)
	  , toIObject = __webpack_require__(32)
	  , isEnum    = __webpack_require__(71).f;
	module.exports = function(isEntries){
	  return function(it){
	    var O      = toIObject(it)
	      , keys   = getKeys(O)
	      , length = keys.length
	      , i      = 0
	      , result = []
	      , key;
	    while(length > i)if(isEnum.call(O, key = keys[i++])){
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-values-entries
	var $export  = __webpack_require__(5)
	  , $entries = __webpack_require__(179)(true);
	
	$export($export.S, 'Object', {
	  entries: function entries(it){
	    return $entries(it);
	  }
	});

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-getownpropertydescriptors
	var $export        = __webpack_require__(5)
	  , ownKeys        = __webpack_require__(106)
	  , toIObject      = __webpack_require__(32)
	  , gOPD           = __webpack_require__(70)
	  , createProperty = __webpack_require__(143);
	
	$export($export.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
	    var O       = toIObject(object)
	      , getDesc = gOPD.f
	      , keys    = ownKeys(O)
	      , result  = {}
	      , i       = 0
	      , key;
	    while(keys.length > i)createProperty(result, key = keys[i++], getDesc(O, key));
	    return result;
	  }
	});

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/tc39/proposal-string-pad-start-end
	var $export = __webpack_require__(5)
	  , $pad    = __webpack_require__(183);
	
	$export($export.P, 'String', {
	  padStart: function padStart(maxLength /*, fillString = ' ' */){
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
	  }
	});

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-string-pad-start-end
	var toLength = __webpack_require__(29)
	  , repeat   = __webpack_require__(128)
	  , defined  = __webpack_require__(35);
	
	module.exports = function(that, maxLength, fillString, left){
	  var S            = String(defined(that))
	    , stringLength = S.length
	    , fillStr      = fillString === undefined ? ' ' : String(fillString)
	    , intMaxLength = toLength(maxLength);
	  if(intMaxLength <= stringLength || fillStr == '')return S;
	  var fillLen = intMaxLength - stringLength
	    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
	  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
	  return left ? stringFiller + S : S + stringFiller;
	};


/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/tc39/proposal-string-pad-start-end
	var $export = __webpack_require__(5)
	  , $pad    = __webpack_require__(183);
	
	$export($export.P, 'String', {
	  padEnd: function padEnd(maxLength /*, fillString = ' ' */){
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
	  }
	});

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	// ie9- setTimeout & setInterval additional parameters fix
	var global     = __webpack_require__(6)
	  , $export    = __webpack_require__(5)
	  , invoke     = __webpack_require__(97)
	  , partial    = __webpack_require__(186)
	  , navigator  = global.navigator
	  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
	var wrap = function(set){
	  return MSIE ? function(fn, time /*, ...args */){
	    return set(invoke(
	      partial,
	      [].slice.call(arguments, 2),
	      typeof fn == 'function' ? fn : Function(fn)
	    ), time);
	  } : set;
	};
	$export($export.G + $export.B + $export.F * MSIE, {
	  setTimeout:  wrap(global.setTimeout),
	  setInterval: wrap(global.setInterval)
	});

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var path      = __webpack_require__(187)
	  , invoke    = __webpack_require__(97)
	  , aFunction = __webpack_require__(22);
	module.exports = function(/* ...pargs */){
	  var fn     = aFunction(this)
	    , length = arguments.length
	    , pargs  = Array(length)
	    , i      = 0
	    , _      = path._
	    , holder = false;
	  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
	  return function(/* ...args */){
	    var that = this
	      , aLen = arguments.length
	      , j = 0, k = 0, args;
	    if(!holder && !aLen)return invoke(fn, pargs, that);
	    args = pargs.slice();
	    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
	    while(aLen > k)args.push(arguments[k++]);
	    return invoke(fn, args, that);
	  };
	};

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6);

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(5)
	  , $task   = __webpack_require__(111);
	$export($export.G + $export.B, {
	  setImmediate:   $task.set,
	  clearImmediate: $task.clear
	});

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	var $iterators    = __webpack_require__(62)
	  , redefine      = __webpack_require__(18)
	  , global        = __webpack_require__(6)
	  , hide          = __webpack_require__(8)
	  , Iterators     = __webpack_require__(50)
	  , wks           = __webpack_require__(44)
	  , ITERATOR      = wks('iterator')
	  , TO_STRING_TAG = wks('toStringTag')
	  , ArrayValues   = Iterators.Array;
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype
	    , key;
	  if(proto){
	    if(!proto[ITERATOR])hide(proto, ITERATOR, ArrayValues);
	    if(!proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	    Iterators[NAME] = ArrayValues;
	    for(key in $iterators)if(!proto[key])redefine(proto, key, $iterators[key], true);
	  }
	}

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */
	
	!(function(global) {
	  "use strict";
	
	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
	
	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }
	
	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};
	
	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);
	
	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);
	
	    return generator;
	  }
	  runtime.wrap = wrap;
	
	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }
	
	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";
	
	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};
	
	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	
	  // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.
	  var IteratorPrototype = {};
	  IteratorPrototype[iteratorSymbol] = function () {
	    return this;
	  };
	
	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  if (NativeIteratorPrototype &&
	      NativeIteratorPrototype !== Op &&
	      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }
	
	  var Gp = GeneratorFunctionPrototype.prototype =
	    Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] =
	    GeneratorFunction.displayName = "GeneratorFunction";
	
	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }
	
	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };
	
	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };
	
	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.
	  runtime.awrap = function(arg) {
	    return { __await: arg };
	  };
	
	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value &&
	            typeof value === "object" &&
	            hasOwn.call(value, "__await")) {
	          return Promise.resolve(value.__await).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }
	
	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration. If the Promise is rejected, however, the
	          // result for this iteration will be rejected with the same
	          // reason. Note that rejections of yielded Promises are not
	          // thrown back into the generator function, as is the case
	          // when an awaited Promise is rejected. This difference in
	          // behavior between yield and await is important, because it
	          // allows the consumer to decide what to do with the yielded
	          // rejection (swallow it and continue, manually .throw it back
	          // into the generator, abandon iteration, whatever). With
	          // await, by contrast, there is no opportunity to examine the
	          // rejection reason outside the generator function, so the
	          // only option is to throw it from the await expression, and
	          // let the generator function handle the exception.
	          result.value = unwrapped;
	          resolve(result);
	        }, reject);
	      }
	    }
	
	    if (typeof process === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }
	
	    var previousPromise;
	
	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }
	
	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }
	
	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }
	
	  defineIteratorMethods(AsyncIterator.prototype);
	  runtime.AsyncIterator = AsyncIterator;
	
	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );
	
	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };
	
	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;
	
	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }
	
	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }
	
	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }
	
	      context.method = method;
	      context.arg = arg;
	
	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);
	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }
	
	        if (context.method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = context.arg;
	
	        } else if (context.method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw context.arg;
	          }
	
	          context.dispatchException(context.arg);
	
	        } else if (context.method === "return") {
	          context.abrupt("return", context.arg);
	        }
	
	        state = GenStateExecuting;
	
	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;
	
	          if (record.arg === ContinueSentinel) {
	            continue;
	          }
	
	          return {
	            value: record.arg,
	            done: context.done
	          };
	
	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(context.arg) call above.
	          context.method = "throw";
	          context.arg = record.arg;
	        }
	      }
	    };
	  }
	
	  // Call delegate.iterator[context.method](context.arg) and handle the
	  // result, either by returning a { value, done } result from the
	  // delegate iterator, or by modifying context.method and context.arg,
	  // setting context.delegate to null, and returning the ContinueSentinel.
	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];
	    if (method === undefined) {
	      // A .throw or .return when the delegate iterator has no .throw
	      // method always terminates the yield* loop.
	      context.delegate = null;
	
	      if (context.method === "throw") {
	        if (delegate.iterator.return) {
	          // If the delegate iterator has a return method, give it a
	          // chance to clean up.
	          context.method = "return";
	          context.arg = undefined;
	          maybeInvokeDelegate(delegate, context);
	
	          if (context.method === "throw") {
	            // If maybeInvokeDelegate(context) changed context.method from
	            // "return" to "throw", let that override the TypeError below.
	            return ContinueSentinel;
	          }
	        }
	
	        context.method = "throw";
	        context.arg = new TypeError(
	          "The iterator does not provide a 'throw' method");
	      }
	
	      return ContinueSentinel;
	    }
	
	    var record = tryCatch(method, delegate.iterator, context.arg);
	
	    if (record.type === "throw") {
	      context.method = "throw";
	      context.arg = record.arg;
	      context.delegate = null;
	      return ContinueSentinel;
	    }
	
	    var info = record.arg;
	
	    if (! info) {
	      context.method = "throw";
	      context.arg = new TypeError("iterator result is not an object");
	      context.delegate = null;
	      return ContinueSentinel;
	    }
	
	    if (info.done) {
	      // Assign the result of the finished delegate to the temporary
	      // variable specified by delegate.resultName (see delegateYield).
	      context[delegate.resultName] = info.value;
	
	      // Resume execution at the desired location (see delegateYield).
	      context.next = delegate.nextLoc;
	
	      // If context.method was "throw" but the delegate handled the
	      // exception, let the outer generator proceed normally. If
	      // context.method was "next", forget context.arg since it has been
	      // "consumed" by the delegate iterator. If context.method was
	      // "return", allow the original .return call to continue in the
	      // outer generator.
	      if (context.method !== "return") {
	        context.method = "next";
	        context.arg = undefined;
	      }
	
	    } else {
	      // Re-yield the result returned by the delegate method.
	      return info;
	    }
	
	    // The delegate iterator is finished, so forget it and continue with
	    // the outer generator.
	    context.delegate = null;
	    return ContinueSentinel;
	  }
	
	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);
	
	  Gp[toStringTagSymbol] = "Generator";
	
	  Gp.toString = function() {
	    return "[object Generator]";
	  };
	
	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };
	
	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }
	
	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }
	
	    this.tryEntries.push(entry);
	  }
	
	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }
	
	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }
	
	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();
	
	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }
	
	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };
	
	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }
	
	      if (typeof iterable.next === "function") {
	        return iterable;
	      }
	
	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }
	
	          next.value = undefined;
	          next.done = true;
	
	          return next;
	        };
	
	        return next.next = next;
	      }
	    }
	
	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;
	
	  function doneResult() {
	    return { value: undefined, done: true };
	  }
	
	  Context.prototype = {
	    constructor: Context,
	
	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined;
	      this.done = false;
	      this.delegate = null;
	
	      this.method = "next";
	      this.arg = undefined;
	
	      this.tryEntries.forEach(resetTryEntry);
	
	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },
	
	    stop: function() {
	      this.done = true;
	
	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }
	
	      return this.rval;
	    },
	
	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }
	
	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	
	        if (caught) {
	          // If the dispatched exception was caught by a catch block,
	          // then let that catch block handle the exception normally.
	          context.method = "next";
	          context.arg = undefined;
	        }
	
	        return !! caught;
	      }
	
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;
	
	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }
	
	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");
	
	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }
	
	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },
	
	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }
	
	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }
	
	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;
	
	      if (finallyEntry) {
	        this.method = "next";
	        this.next = finallyEntry.finallyLoc;
	        return ContinueSentinel;
	      }
	
	      return this.complete(record);
	    },
	
	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }
	
	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = this.arg = record.arg;
	        this.method = "return";
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	
	      return ContinueSentinel;
	    },
	
	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },
	
	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }
	
	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },
	
	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };
	
	      if (this.method === "next") {
	        // Deliberately forget the last sent value so that we don't
	        // accidentally pass it on to the delegate.
	        this.arg = undefined;
	      }
	
	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this
	);
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(191)))

/***/ },
/* 191 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 192 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.unpromiser = unpromiser;
	exports.isPromise = isPromise;
	exports.isOnline = isOnline;
	exports.isOffline = isOffline;
	exports.sleep = sleep;
	exports.retry = retry;
	exports.getFuzzedDelay = getFuzzedDelay;
	exports.getBackedoffDelay = getBackedoffDelay;
	exports.createPath = createPath;
	exports.encodeQuery = encodeQuery;
	exports.decodeQuery = decodeQuery;
	exports.warn = warn;
	/* global navigator */
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
	  };
	}
	
	function isPromise(value) {
	  return !!value && typeof value.then === 'function';
	}
	
	function isOnline() {
	  return typeof navigator !== 'undefined' ? navigator.onLine : true;
	}
	
	function isOffline() {
	  return !isOnline();
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
/* 193 */
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
/* 194 */
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
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.AppToken = exports.AccessToken = exports.Client = exports.StateKey = exports.CredsKey = undefined;
	
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
	
	var _utils = __webpack_require__(192);
	
	var _fetch = __webpack_require__(196);
	
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
	  if ((0, _utils.isOffline)()) {
	    return Promise.resolve(cli);
	  }
	  return (0, _fetch.cozyFetchJSON)(cozy, 'GET', '/auth/register/' + cli.clientID, null, {
	    manualAuthCredentials: {
	      token: cli
	    }
	  }).then(function (data) {
	    return createClient(data, cli);
	  }).catch(function (err) {
	    // If we fall into an error while fetching the client (because of a
	    // bad connectivity for instance), we do not bail the whole process
	    // since the client should be able to continue with the persisted
	    // client and token.
	    //
	    // If it is an explicit Unauthorized error though, we bail, clear th
	    // cache and retry.
	    if (_fetch.FetchError.isUnauthorized(err) || _fetch.FetchError.isNotFound(err)) {
	      throw new Error('Client has been revoked');
	    }
	    throw err;
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
	  var ignoreCachedCredentials = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
	
	  if (ignoreCachedCredentials) {
	    return storage.clear().then(function () {
	      return oauthFlow(cozy, storage, clientParams, onRegistered, false);
	    });
	  }
	
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
	      var oldClient = void 0,
	          _token = void 0;
	      try {
	        oldClient = new Client(credentials.client);
	        _token = new AccessToken(credentials.token);
	      } catch (err) {
	        // bad cache, we should clear and retry the process
	        return clearAndRetry(err);
	      }
	      return getClient(cozy, oldClient).then(function (client) {
	        return { client: client, token: _token };
	      }).catch(function (err) {
	        // If we fall into an error while fetching the client (because of a
	        // bad connectivity for instance), we do not bail the whole process
	        // since the client should be able to continue with the persisted
	        // client and token.
	        //
	        // If it is an explicit Unauthorized error though, we bail, clear th
	        // cache and retry.
	        if (_fetch.FetchError.isUnauthorized(err) || _fetch.FetchError.isNotFound(err)) {
	          throw new Error('Client has been revoked');
	        }
	        return { client: oldClient, token: _token };
	      });
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
	    dontRetry: true,
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
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.FetchError = undefined;
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* global fetch */
	
	
	exports.cozyFetch = cozyFetch;
	exports.cozyFetchJSON = cozyFetchJSON;
	exports.cozyFetchRawJSON = cozyFetchRawJSON;
	
	var _auth_v = __webpack_require__(195);
	
	var _utils = __webpack_require__(192);
	
	var _jsonapi = __webpack_require__(197);
	
	var _jsonapi2 = _interopRequireDefault(_jsonapi);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
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
	
	    if (res.status !== 400 && res.status !== 401 || isV2 || !credentials || options.dontRetry) {
	      return res;
	    }
	    // we try to refresh the token only for OAuth, ie, the client defined
	    // and the token is an instance of AccessToken.
	    var client = credentials.client,
	        token = credentials.token;
	
	    if (!client || !(token instanceof _auth_v.AccessToken)) {
	      return res;
	    }
	    options.dontRetry = true;
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
	
	  return fetchJSON(cozy, method, path, body, options).then(handleJSONResponse);
	}
	
	function cozyFetchRawJSON(cozy, method, path, body) {
	  var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
	
	  return fetchJSON(cozy, method, path, body, options).then(function (response) {
	    return handleJSONResponse(response, false);
	  });
	}
	
	function fetchJSON(cozy, method, path, body) {
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
	
	  return cozyFetch(cozy, path, options);
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
	  var processJSONAPI = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	
	  var contentType = res.headers.get('content-type');
	  if (!contentType || contentType.indexOf('json') < 0) {
	    return res.text(function (data) {
	      throw new FetchError(res, new Error('Response is not JSON: ' + data));
	    });
	  }
	
	  var json = res.json();
	  if (contentType.indexOf('application/vnd.api+json') === 0 && processJSONAPI) {
	    return json.then(_jsonapi2.default);
	  } else {
	    return json;
	  }
	}
	
	var FetchError = exports.FetchError = function (_Error) {
	  _inherits(FetchError, _Error);
	
	  function FetchError(res, reason) {
	    _classCallCheck(this, FetchError);
	
	    var _this = _possibleConstructorReturn(this, (FetchError.__proto__ || Object.getPrototypeOf(FetchError)).call(this));
	
	    if (Error.captureStackTrace) {
	      Error.captureStackTrace(_this, _this.constructor);
	    }
	    // XXX We have to hardcode this because babel doesn't play nice when extending Error
	    _this.name = 'FetchError';
	    _this.response = res;
	    _this.url = res.url;
	    _this.status = res.status;
	    _this.reason = reason;
	
	    Object.defineProperty(_this, 'message', {
	      value: reason.message || (typeof reason === 'string' ? reason : JSON.stringify(reason))
	    });
	    return _this;
	  }
	
	  return FetchError;
	}(Error);
	
	FetchError.isUnauthorized = function (err) {
	  // XXX We can't use err instanceof FetchError because of the caveats of babel
	  return err.name === 'FetchError' && err.status === 401;
	};
	
	FetchError.isNotFound = function (err) {
	  // XXX We can't use err instanceof FetchError because of the caveats of babel
	  return err.name === 'FetchError' && err.status === 404;
	};

/***/ },
/* 197 */
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
	  if (rawResource.relationships) {
	    resource.relationships = rawResource.relationships;
	  }
	
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
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.create = create;
	exports.find = find;
	exports.findMany = findMany;
	exports.findAll = findAll;
	exports.changesFeed = changesFeed;
	exports.update = update;
	exports.updateAttributes = updateAttributes;
	exports._delete = _delete;
	
	var _utils = __webpack_require__(192);
	
	var _doctypes = __webpack_require__(199);
	
	var _fetch = __webpack_require__(196);
	
	var NOREV = 'stack-v2-no-rev';
	
	function create(cozy, doctype, attributes) {
	  return cozy.isV2().then(function (isV2) {
	    doctype = (0, _doctypes.normalizeDoctype)(cozy, isV2, doctype);
	    if (isV2) {
	      attributes.docType = doctype;
	    }
	    var path = (0, _utils.createPath)(cozy, isV2, doctype, attributes._id);
	    var httpVerb = attributes._id ? 'PUT' : 'POST';
	    delete attributes._id;
	    return (0, _fetch.cozyFetchJSON)(cozy, httpVerb, path, attributes).then(function (resp) {
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
	
	function findMany(cozy, doctype, ids) {
	  if (!(ids instanceof Array)) {
	    return Promise.reject(new Error('Parameter ids must be a non-empty array'));
	  }
	  if (ids.length === 0) {
	    // So users don't need to be defensive regarding the array content.
	    // This should not hide issues in user code since the result will be an
	    // empty object anyway.
	    return Promise.resolve({});
	  }
	
	  return cozy.isV2().then(function (isV2) {
	    if (isV2) {
	      return Promise.reject(new Error('findMany is not available on v2'));
	    }
	
	    var path = (0, _utils.createPath)(cozy, isV2, doctype, '_all_docs', { include_docs: true });
	
	    return (0, _fetch.cozyFetchJSON)(cozy, 'POST', path, { keys: ids }).then(function (resp) {
	      var docs = {};
	
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;
	
	      try {
	        for (var _iterator = resp.rows[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var row = _step.value;
	          var key = row.key,
	              doc = row.doc,
	              error = row.error;
	
	          docs[key] = error ? { error: error } : { doc: doc };
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
	
	      return docs;
	    }).catch(function (error) {
	      if (error.status !== 404) return Promise.reject(error);
	
	      // When no doc was ever created and the database does not exist yet,
	      // the response will be a 404 error.
	      var docs = {};
	
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;
	
	      try {
	        for (var _iterator2 = ids[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var id = _step2.value;
	
	          docs[id] = { error: error };
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }
	
	      return docs;
	    });
	  });
	}
	
	function findAll(cozy, doctype) {
	  return cozy.isV2().then(function (isV2) {
	    if (isV2) {
	      return Promise.reject(new Error('findAll is not available on v2'));
	    }
	
	    var path = (0, _utils.createPath)(cozy, isV2, doctype, '_all_docs', { include_docs: true });
	
	    return (0, _fetch.cozyFetchJSON)(cozy, 'POST', path, {}).then(function (resp) {
	      var docs = [];
	
	      var _iteratorNormalCompletion3 = true;
	      var _didIteratorError3 = false;
	      var _iteratorError3 = undefined;
	
	      try {
	        for (var _iterator3 = resp.rows[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	          var row = _step3.value;
	          var doc = row.doc;
	          // if not couchDB indexes
	
	          if (!doc._id.match(/_design\//)) docs.push(doc);
	        }
	      } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion3 && _iterator3.return) {
	            _iterator3.return();
	          }
	        } finally {
	          if (_didIteratorError3) {
	            throw _iteratorError3;
	          }
	        }
	      }
	
	      return docs;
	    }).catch(function (error) {
	      // the _all_docs endpoint returns a 404 error if no document with the given
	      // doctype exists.
	      if (error.status === 404) return [];
	      throw error;
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
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DOCTYPE_FILES = undefined;
	exports.normalizeDoctype = normalizeDoctype;
	
	var _utils = __webpack_require__(192);
	
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
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.defineIndex = defineIndex;
	exports.query = query;
	exports.queryFiles = queryFiles;
	exports.parseSelector = parseSelector;
	exports.normalizeSelector = normalizeSelector;
	exports.makeMapReduceQuery = makeMapReduceQuery;
	
	var _utils = __webpack_require__(192);
	
	var _doctypes = __webpack_require__(199);
	
	var _fetch = __webpack_require__(196);
	
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
	
	function queryFiles(cozy, indexRef, options) {
	  var opts = getV3Options(indexRef, options);
	  return (0, _fetch.cozyFetchRawJSON)(cozy, 'POST', '/files/_find', opts).then(function (response) {
	    return options.wholeResponse ? response : response.docs;
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
	
	function defineIndexV3(cozy, doctype, fields) {
	  var path = (0, _utils.createPath)(cozy, false, doctype, '_index');
	  var indexDefinition = { 'index': { fields: fields } };
	  return (0, _fetch.cozyFetchJSON)(cozy, 'POST', path, indexDefinition).then(function (response) {
	    var indexResult = { doctype: doctype, type: 'mango', name: response.id, fields: fields };
	
	    if (response.result === 'exists') return indexResult;
	
	    // indexes might not be usable right after being created; so we delay the resolving until they are
	    var selector = {};
	    selector[fields[0]] = { '$gt': null };
	
	    var opts = getV3Options(indexResult, { 'selector': selector });
	    var path = (0, _utils.createPath)(cozy, false, indexResult.doctype, '_find');
	    return (0, _fetch.cozyFetchJSON)(cozy, 'POST', path, opts).then(function () {
	      return indexResult;
	    }).catch(function () {
	      // one retry
	      return (0, _utils.sleep)(1000).then(function () {
	        return (0, _fetch.cozyFetchJSON)(cozy, 'POST', path, opts);
	      }).then(function () {
	        return indexResult;
	      }).catch(function () {
	        return (0, _utils.sleep)(500).then(function () {
	          return indexResult;
	        });
	      });
	    });
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
	  var opts = getV3Options(indexRef, options);
	
	  var path = (0, _utils.createPath)(cozy, false, indexRef.doctype, '_find');
	  return (0, _fetch.cozyFetchJSON)(cozy, 'POST', path, opts).then(function (response) {
	    return options.wholeResponse ? response : response.docs;
	  });
	}
	
	function getV3Options(indexRef, options) {
	  if (indexRef.type !== 'mango') {
	    throw new Error('indexRef should be the return value of defineIndexV3');
	  }
	
	  var opts = {
	    use_index: indexRef.name,
	    fields: options.fields,
	    selector: options.selector,
	    limit: options.limit,
	    skip: options.skip,
	    since: options.since,
	    sort: options.sort
	  };
	
	  if (options.descending) {
	    opts.sort = indexRef.fields.map(function (f) {
	      return _defineProperty({}, f, 'desc');
	    });
	  }
	
	  return opts;
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
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.TRASH_DIR_ID = exports.ROOT_DIR_ID = undefined;
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* global Blob, File */
	
	
	exports.create = create;
	exports.createDirectory = createDirectory;
	exports.createDirectoryByPath = createDirectoryByPath;
	exports.updateById = updateById;
	exports.updateAttributesById = updateAttributesById;
	exports.updateAttributesByPath = updateAttributesByPath;
	exports.trashById = trashById;
	exports.statById = statById;
	exports.statByPath = statByPath;
	exports.downloadById = downloadById;
	exports.downloadByPath = downloadByPath;
	exports.getDownloadLinkByPath = getDownloadLinkByPath;
	exports.getDownloadLinkById = getDownloadLinkById;
	exports.getFilePath = getFilePath;
	exports.getCollectionShareLink = getCollectionShareLink;
	exports.getArchiveLinkByPaths = getArchiveLinkByPaths;
	exports.getArchiveLinkByIds = getArchiveLinkByIds;
	exports.listTrash = listTrash;
	exports.clearTrash = clearTrash;
	exports.restoreById = restoreById;
	exports.destroyById = destroyById;
	
	var _fetch = __webpack_require__(196);
	
	var _jsonapi = __webpack_require__(197);
	
	var _jsonapi2 = _interopRequireDefault(_jsonapi);
	
	var _doctypes = __webpack_require__(199);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// global variables
	var ROOT_DIR_ID = exports.ROOT_DIR_ID = 'io.cozy.files.root-dir';
	var TRASH_DIR_ID = exports.TRASH_DIR_ID = 'io.cozy.files.trash-dir';
	
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
	      contentType = data.type || contentTypeOctetStream;
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
	
	function getDirectoryOrCreate(cozy, name, parentDirectory) {
	  if (parentDirectory && !parentDirectory.attributes) throw new Error('Malformed parent directory');
	
	  var path = (parentDirectory._id === ROOT_DIR_ID ? '' : parentDirectory.attributes.path) + '/' + name;
	
	  return cozy.files.statByPath(path || '/').catch(function (error) {
	    var parsedError = JSON.parse(error.message);
	    var errors = parsedError.errors;
	    if (errors && errors.length && errors[0].status === '404') {
	      return cozy.files.createDirectory({
	        name: name,
	        dirID: parentDirectory && parentDirectory._id
	      });
	    }
	
	    throw errors;
	  });
	}
	
	function createDirectoryByPath(cozy, path) {
	  var parts = path.split('/').filter(function (part) {
	    return part !== '';
	  });
	
	  var rootDirectoryPromise = cozy.files.statById(ROOT_DIR_ID);
	
	  return parts.length ? parts.reduce(function (parentDirectoryPromise, part) {
	    return parentDirectoryPromise.then(function (parentDirectory) {
	      return getDirectoryOrCreate(cozy, part, parentDirectory);
	    });
	  }, rootDirectoryPromise) : rootDirectoryPromise;
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
	
	function trashById(cozy, id, options) {
	  if (typeof id !== 'string' || id === '') {
	    throw new Error('missing id argument');
	  }
	
	  var _ref5 = options || {},
	      ifMatch = _ref5.ifMatch;
	
	  return (0, _fetch.cozyFetchJSON)(cozy, 'DELETE', '/files/' + encodeURIComponent(id), undefined, {
	    headers: {
	      'If-Match': ifMatch || ''
	    }
	  });
	}
	
	function statById(cozy, id) {
	  var offline = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	
	  if (offline && cozy.offline.hasDatabase(_doctypes.DOCTYPE_FILES)) {
	    var db = cozy.offline.getDatabase(_doctypes.DOCTYPE_FILES);
	    return Promise.all([db.get(id), db.find(Object.assign({ selector: { 'dir_id': id } }, options))]).then(function (_ref6) {
	      var _ref7 = _slicedToArray(_ref6, 2),
	          doc = _ref7[0],
	          children = _ref7[1];
	
	      if (id === ROOT_DIR_ID) {
	        children.docs = children.docs.filter(function (doc) {
	          return doc._id !== TRASH_DIR_ID;
	        });
	      }
	      children = sortFiles(children.docs.map(function (doc) {
	        return addIsDir(toJsonApi(cozy, doc));
	      }));
	      return addIsDir(toJsonApi(cozy, doc, children));
	    });
	  }
	  var query = Object.keys(options).length === 0 ? '' : '?' + encodePageOptions(options);
	  return (0, _fetch.cozyFetchJSON)(cozy, 'GET', '/files/' + encodeURIComponent(id) + query).then(addIsDir);
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
	
	function getDownloadLinkByPath(cozy, path) {
	  return (0, _fetch.cozyFetchJSON)(cozy, 'POST', '/files/downloads?Path=' + encodeURIComponent(path)).then(extractResponseLinkRelated);
	}
	
	function getDownloadLinkById(cozy, id) {
	  return (0, _fetch.cozyFetchJSON)(cozy, 'POST', '/files/downloads?Id=' + encodeURIComponent(id)).then(extractResponseLinkRelated);
	}
	
	function getFilePath(cozy) {
	  var file = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var folder = arguments[2];
	
	  if (!folder || !folder.attributes) {
	    throw Error('Folder should be valid with an attributes.path property');
	  }
	
	  var folderPath = folder.attributes.path.endsWith('/') ? folder.attributes.path : folder.attributes.path + '/';
	
	  return '' + folderPath + file.name;
	}
	
	function getCollectionShareLink(cozy, id, collectionType) {
	  if (!id) {
	    return Promise.reject(Error('An id should be provided to create a share link'));
	  }
	  return (0, _fetch.cozyFetchJSON)(cozy, 'POST', '/permissions?codes=email', {
	    data: {
	      type: 'io.cozy.permissions',
	      attributes: {
	        permissions: {
	          files: {
	            type: 'io.cozy.files',
	            verbs: ['GET'],
	            values: [id],
	            selector: 'referenced_by'
	          },
	          collection: {
	            type: collectionType,
	            verbs: ['GET'],
	            values: [id]
	          }
	        }
	      }
	    }
	  }).then(function (data) {
	    return { sharecode: 'sharecode=' + data.attributes.codes.email, id: 'id=' + id };
	  });
	}
	
	function getArchiveLinkByPaths(cozy, paths) {
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
	
	function getArchiveLinkByIds(cozy, ids) {
	  var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'files';
	
	  var archive = {
	    type: 'io.cozy.archives',
	    attributes: {
	      name: name,
	      ids: ids
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
	
	function destroyById(cozy, id, options) {
	  var _ref8 = options || {},
	      ifMatch = _ref8.ifMatch;
	
	  return (0, _fetch.cozyFetchJSON)(cozy, 'DELETE', '/files/trash/' + encodeURIComponent(id), undefined, {
	    headers: {
	      'If-Match': ifMatch || ''
	    }
	  });
	}
	
	function addIsDir(obj) {
	  obj.isDir = obj.attributes.type === 'directory';
	  return obj;
	}
	
	function encodePageOptions(options) {
	  var opts = [];
	  for (var name in options) {
	    opts.push('page[' + encodeURIComponent(name) + ']=' + encodeURIComponent(options[name]));
	  }
	  return opts.join('&');
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
	    relationships: {
	      contents: {
	        data: contents,
	        meta: {
	          count: contents.length
	        }
	      }
	    },
	    relations: function relations(name) {
	      if (name === 'contents') {
	        return contents;
	      }
	    }
	  };
	}
	
	function sortFiles(allFiles) {
	  var folders = allFiles.filter(function (f) {
	    return f.attributes.type === 'directory';
	  });
	  var files = allFiles.filter(function (f) {
	    return f.attributes.type !== 'directory';
	  });
	  var sort = function sort(files) {
	    return files.sort(function (a, b) {
	      return a.attributes.name.localeCompare(b.attributes.name);
	    });
	  };
	  return sort(folders).concat(sort(files));
	}

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.create = create;
	exports.createService = createService;
	
	var _fetch = __webpack_require__(196);
	
	var intentClass = 'coz-intent';
	
	// helper to serialize/deserialize an error for/from postMessage
	var errorSerializer = function () {
	  function mapErrorProperties(from, to) {
	    var result = Object.assign(to, from);
	    var nativeProperties = ['name', 'message'];
	    return nativeProperties.reduce(function (result, property) {
	      if (from[property]) {
	        to[property] = from[property];
	      }
	      return result;
	    }, result);
	  }
	  return {
	    serialize: function serialize(error) {
	      return mapErrorProperties(error, {});
	    },
	    deserialize: function deserialize(data) {
	      return mapErrorProperties(data, new Error(data.message));
	    }
	  };
	}();
	
	// inject iframe for service in given element
	function injectService(url, element, intent, data, onReadyCallback) {
	  var document = element.ownerDocument;
	  if (!document) throw new Error('Cannot retrieve document object from given element');
	
	  var window = document.defaultView;
	  if (!window) throw new Error('Cannot retrieve window object from document');
	
	  var iframe = document.createElement('iframe');
	  // if callback provided for when iframe is loaded
	  if (typeof onReadyCallback === 'function') iframe.onload = onReadyCallback;
	  iframe.setAttribute('src', url);
	  iframe.classList.add(intentClass);
	  element.appendChild(iframe);
	
	  // Keeps only http://domain:port/
	  var serviceOrigin = url.split('/', 3).join('/');
	
	  return new Promise(function (resolve, reject) {
	    var handshaken = false;
	    var messageHandler = function messageHandler(event) {
	      if (event.origin !== serviceOrigin) return;
	
	      if (event.data.type === 'load') {
	        // Safari 9.1 (At least) send a MessageEvent when the iframe loads,
	        // making the handshake fails.
	        console.warn && console.warn('Cozy Client ignored MessageEvent having data.type `load`.');
	        return;
	      }
	
	      if (event.data.type === 'intent-' + intent._id + ':ready') {
	        handshaken = true;
	        return event.source.postMessage(data, event.origin);
	      }
	
	      if (handshaken && event.data.type === 'intent-' + intent._id + ':resize') {
	        ['width', 'height', 'maxWidth', 'maxHeight'].forEach(function (prop) {
	          if (event.data.transition) element.style.transition = event.data.transition;
	          if (event.data.dimensions[prop]) element.style[prop] = event.data.dimensions[prop] + 'px';
	        });
	
	        return true;
	      }
	
	      window.removeEventListener('message', messageHandler);
	      var removeIntentFrame = function removeIntentFrame() {
	        iframe.parentNode.removeChild(iframe);
	      };
	
	      if (handshaken && event.data.type === 'intent-' + intent._id + ':exposeFrameRemoval') {
	        return resolve({ removeIntentFrame: removeIntentFrame, doc: event.data.document });
	      }
	
	      removeIntentFrame();
	
	      if (event.data.type === 'intent-' + intent._id + ':error') {
	        return reject(errorSerializer.deserialize(event.data.error));
	      }
	
	      if (handshaken && event.data.type === 'intent-' + intent._id + ':cancel') {
	        return resolve(null);
	      }
	
	      if (handshaken && event.data.type === 'intent-' + intent._id + ':done') {
	        return resolve(event.data.document);
	      }
	
	      if (!handshaken) {
	        return reject(new Error('Unexpected handshake message from intent service'));
	      }
	
	      // We may be in a state where the messageHandler is still attached to then
	      // window, but will not be needed anymore. For example, the service failed
	      // before adding the `unload` listener, so no `intent:cancel` message has
	      // never been sent.
	      // So we simply ignore other messages, and this listener will stay here,
	      // waiting for a message which will never come, forever (almost).
	    };
	
	    window.addEventListener('message', messageHandler);
	  });
	}
	
	function create(cozy, action, type) {
	  var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	  var permissions = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
	
	  if (!action) throw new Error('Misformed intent, "action" property must be provided');
	  if (!type) throw new Error('Misformed intent, "type" property must be provided');
	
	  var createPromise = (0, _fetch.cozyFetchJSON)(cozy, 'POST', '/intents', {
	    data: {
	      type: 'io.cozy.intents',
	      attributes: {
	        action: action,
	        type: type,
	        data: data,
	        permissions: permissions
	      }
	    }
	  });
	
	  createPromise.start = function (element, onReadyCallback) {
	    return createPromise.then(function (intent) {
	      var service = intent.attributes.services && intent.attributes.services[0];
	
	      if (!service) {
	        return Promise.reject(new Error('Unable to find a service'));
	      }
	
	      return injectService(service.href, element, intent, data, onReadyCallback);
	    });
	  };
	
	  return createPromise;
	}
	
	function listenClientData(intent, window) {
	  return new Promise(function (resolve, reject) {
	    var messageEventListener = function messageEventListener(event) {
	      if (event.origin !== intent.attributes.client) return;
	
	      window.removeEventListener('message', messageEventListener);
	      resolve(event.data);
	    };
	
	    window.addEventListener('message', messageEventListener);
	    window.parent.postMessage({
	      type: 'intent-' + intent._id + ':ready'
	    }, intent.attributes.client);
	  });
	}
	
	// returns a service to communicate with intent client
	function createService(cozy, intentId, serviceWindow) {
	  serviceWindow = serviceWindow || typeof window !== 'undefined' && window;
	  if (!serviceWindow) throw new Error('Intent service should be used in browser');
	
	  intentId = intentId || serviceWindow.location.search.split('=')[1];
	  if (!intentId) throw new Error('Cannot retrieve intent from URL');
	
	  return (0, _fetch.cozyFetchJSON)(cozy, 'GET', '/intents/' + intentId).then(function (intent) {
	    var terminated = false;
	
	    var _terminate = function _terminate(message) {
	      if (terminated) throw new Error('Intent service has already been terminated');
	      terminated = true;
	      serviceWindow.parent.postMessage(message, intent.attributes.client);
	    };
	
	    var resizeClient = function resizeClient(dimensions, transitionProperty) {
	      if (terminated) throw new Error('Intent service has been terminated');
	
	      var message = {
	        type: 'intent-' + intent._id + ':resize',
	        // if a dom element is passed, calculate its size
	        dimensions: dimensions.element ? Object.assign({}, dimensions, {
	          maxHeight: dimensions.element.clientHeight,
	          maxWidth: dimensions.element.clientWidth
	        }) : dimensions,
	        transition: transitionProperty
	      };
	
	      serviceWindow.parent.postMessage(message, intent.attributes.client);
	    };
	
	    var cancel = function cancel() {
	      _terminate({ type: 'intent-' + intent._id + ':cancel' });
	    };
	
	    // Prevent unfulfilled client promises when this window unloads for a
	    // reason or another.
	    serviceWindow.addEventListener('unload', function () {
	      if (!terminated) cancel();
	    });
	
	    return listenClientData(intent, serviceWindow).then(function (data) {
	      return {
	        getData: function getData() {
	          return data;
	        },
	        getIntent: function getIntent() {
	          return intent;
	        },
	        terminate: function terminate(doc) {
	          if (data && data.exposeIntentFrameRemoval) {
	            return _terminate({
	              type: 'intent-' + intent._id + ':exposeFrameRemoval',
	              document: doc
	            });
	          } else {
	            return _terminate({
	              type: 'intent-' + intent._id + ':done',
	              document: doc
	            });
	          }
	        },
	        throw: function _throw(error) {
	          return _terminate({
	            type: 'intent-' + intent._id + ':error',
	            error: errorSerializer.serialize(error)
	          });
	        },
	        resizeClient: resizeClient,
	        cancel: cancel
	      };
	    });
	  });
	}

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.count = count;
	exports.create = create;
	
	var _fetch = __webpack_require__(196);
	
	function count(cozy, workerType) {
	  return (0, _fetch.cozyFetchJSON)(cozy, 'GET', '/jobs/queue/' + workerType).then(function (data) {
	    return data.attributes.count;
	  });
	}
	
	function create(cozy, workerType, args, options) {
	  return (0, _fetch.cozyFetchJSON)(cozy, 'POST', '/jobs/queue/' + workerType, {
	    data: {
	      type: 'io.cozy.jobs',
	      attributes: {
	        arguments: args || {},
	        options: options || {}
	      }
	    }
	  });
	}

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.replicationOfflineError = undefined;
	exports.init = init;
	exports.getDoctypes = getDoctypes;
	exports.hasDatabase = hasDatabase;
	exports.getDatabase = getDatabase;
	exports.setDatabase = setDatabase;
	exports.createDatabase = createDatabase;
	exports.destroyDatabase = destroyDatabase;
	exports.destroyAllDatabase = destroyAllDatabase;
	exports.hasReplication = hasReplication;
	exports.replicateFromCozy = replicateFromCozy;
	exports.stopReplication = stopReplication;
	exports.stopAllReplication = stopAllReplication;
	exports.hasRepeatedReplication = hasRepeatedReplication;
	exports.startRepeatedReplication = startRepeatedReplication;
	exports.stopRepeatedReplication = stopRepeatedReplication;
	exports.stopAllRepeatedReplication = stopAllRepeatedReplication;
	
	var _doctypes = __webpack_require__(199);
	
	var _auth_v = __webpack_require__(195);
	
	var _utils = __webpack_require__(192);
	
	var replicationOfflineError = exports.replicationOfflineError = 'Replication abort, your device is actually offline.'; /* global PouchDB, pouchdbFind */
	
	
	var pluginLoaded = false;
	
	/*
	  For each doctype we have some parameters:
	  cozy._offline[doctype] = {
	    database: pouchdb database
	    replication: the pouchdb replication
	    replicationPromise: promise of replication
	    interval: repeated replication interval
	  }
	*/
	
	function init(cozy, _ref) {
	  var _ref$options = _ref.options,
	      options = _ref$options === undefined ? {} : _ref$options,
	      _ref$doctypes = _ref.doctypes,
	      doctypes = _ref$doctypes === undefined ? [] : _ref$doctypes;
	
	  if (typeof PouchDB === 'undefined') throw new Error('Missing pouchdb dependency for offline mode. Please run "yarn add pouchdb" and provide PouchDB as a webpack plugin.');
	  if (typeof pouchdbFind === 'undefined') throw new Error('Missing pouchdb-find dependency for offline mode. Please run "yarn add pouchdb-find" and provide pouchdbFind as webpack plugin.');
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
	}
	
	// helper
	
	function getInfo(cozy, doctype) {
	  cozy._offline = cozy._offline || [];
	  cozy._offline[doctype] = cozy._offline[doctype] || {};
	  return cozy._offline[doctype];
	}
	
	function getDoctypes(cozy) {
	  cozy._offline = cozy._offline || [];
	  return Object.keys(cozy._offline);
	}
	
	//
	// DATABASE
	//
	
	function hasDatabase(cozy, doctype) {
	  return getDatabase(cozy, doctype) !== undefined;
	}
	
	function getDatabase(cozy, doctype) {
	  return getInfo(cozy, doctype).database;
	}
	
	function setDatabase(cozy, doctype, database) {
	  cozy._offline[doctype].database = database;
	  return getDatabase(cozy, doctype);
	}
	
	function createDatabase(cozy, doctype) {
	  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
	  if (!pluginLoaded) {
	    PouchDB.plugin(pouchdbFind);
	    pluginLoaded = true;
	  }
	
	  if (hasDatabase(cozy, doctype)) {
	    return Promise.resolve(getDatabase(cozy, doctype));
	  }
	
	  setDatabase(cozy, doctype, new PouchDB(doctype, options));
	  return createIndexes(cozy, doctype).then(function () {
	    return getDatabase(cozy, doctype);
	  });
	}
	
	function destroyDatabase(cozy, doctype) {
	  if (!hasDatabase(cozy, doctype)) {
	    return Promise.resolve(false);
	  }
	
	  return stopRepeatedReplication(cozy, doctype).then(function () {
	    return stopReplication(cozy, doctype);
	  }).then(function () {
	    return getDatabase(cozy, doctype).destroy();
	  }).then(function (response) {
	    setDatabase(cozy, doctype, undefined);
	    return response;
	  });
	}
	
	function destroyAllDatabase(cozy) {
	  var doctypes = getDoctypes(cozy);
	  var destroy = function destroy(doctype) {
	    return destroyDatabase(cozy, doctype);
	  };
	  return Promise.all(doctypes.map(destroy));
	}
	
	function createIndexes(cozy, doctype) {
	  if (doctype === _doctypes.DOCTYPE_FILES) {
	    return getDatabase(cozy, doctype).createIndex({ index: { fields: ['dir_id'] } });
	  }
	  return Promise.resolve();
	}
	
	//
	// REPLICATION
	//
	
	function hasReplication(cozy, doctype) {
	  return getReplication(cozy, doctype) !== undefined;
	}
	
	function getReplication(cozy, doctype) {
	  return getInfo(cozy, doctype).replication;
	}
	
	function setReplication(cozy, doctype, replication) {
	  cozy._offline[doctype].replication = replication;
	  return getReplication(cozy, doctype);
	}
	
	function getReplicationUrl(cozy, doctype) {
	  return cozy.authorize().then(function (credentials) {
	    var basic = credentials.token.toBasicAuth();
	    return (cozy._url + '/data/' + doctype).replace('//', '//' + basic);
	  });
	}
	
	function getReplicationPromise(cozy, doctype) {
	  return getInfo(cozy, doctype).replicationPromise;
	}
	
	function setReplicationPromise(cozy, doctype, promise) {
	  cozy._offline[doctype].replicationPromise = promise;
	  return getReplicationPromise(cozy, doctype);
	}
	
	function replicateFromCozy(cozy, doctype) {
	  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
	  return setReplicationPromise(cozy, doctype, new Promise(function (resolve, reject) {
	    if (!hasDatabase(cozy, doctype)) {
	      createDatabase(cozy, doctype);
	    }
	    if (options.live === true) {
	      return reject(new Error('You can\'t use `live` option with Cozy couchdb.'));
	    }
	
	    if ((0, _utils.isOffline)()) {
	      reject(replicationOfflineError);
	      options.onError && options.onError(replicationOfflineError);
	      return;
	    }
	
	    getReplicationUrl(cozy, doctype).then(function (url) {
	      return setReplication(cozy, doctype, getDatabase(cozy, doctype).replicate.from(url, options).on('complete', function (info) {
	        setReplication(cozy, doctype, undefined);
	        resolve(info);
	        options.onComplete && options.onComplete(info);
	      }).on('error', function (err) {
	        if (err.error === 'code=400, message=Expired token') {
	          cozy.authorize().then(function (_ref2) {
	            var client = _ref2.client,
	                token = _ref2.token;
	
	            (0, _auth_v.refreshToken)(cozy, client, token).then(function (newToken) {
	              return cozy.saveCredentials(client, newToken);
	            }).then(function (credentials) {
	              return replicateFromCozy(cozy, doctype, options);
	            });
	          });
	        } else {
	          console.warn('ReplicateFromCozy \'' + doctype + '\' Error:');
	          console.warn(err);
	          setReplication(cozy, doctype, undefined);
	          reject(err);
	          options.onError && options.onError(err);
	        }
	      }));
	    });
	  }));
	}
	
	function stopReplication(cozy, doctype) {
	  if (!getDatabase(cozy, doctype) || !hasReplication(cozy, doctype)) {
	    return Promise.resolve();
	  }
	
	  return new Promise(function (resolve) {
	    try {
	      getReplicationPromise(cozy, doctype).then(function () {
	        resolve();
	      });
	      getReplication(cozy, doctype).cancel();
	      // replication is set to undefined by complete replication
	    } catch (e) {
	      resolve();
	    }
	  });
	}
	
	function stopAllReplication(cozy) {
	  var doctypes = getDoctypes(cozy);
	  var stop = function stop(doctype) {
	    return stopReplication(cozy, doctype);
	  };
	  return Promise.all(doctypes.map(stop));
	}
	
	//
	// REPEATED REPLICATION
	//
	
	function getRepeatedReplication(cozy, doctype) {
	  return getInfo(cozy, doctype).interval;
	}
	
	function setRepeatedReplication(cozy, doctype, interval) {
	  cozy._offline[doctype].interval = interval;
	}
	
	function hasRepeatedReplication(cozy, doctype) {
	  return getRepeatedReplication(cozy, doctype) !== undefined;
	}
	
	function startRepeatedReplication(cozy, doctype, timer) {
	  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	
	  // TODO: add timer limitation for not flooding Gozy
	  if (hasRepeatedReplication(cozy, doctype)) {
	    return getRepeatedReplication(cozy, doctype);
	  }
	
	  return setRepeatedReplication(cozy, doctype, setInterval(function () {
	    if ((0, _utils.isOffline)()) {
	      // network is offline, replication cannot be launched
	      console.info(replicationOfflineError);
	      return;
	    }
	    if (!hasReplication(cozy, doctype)) {
	      replicateFromCozy(cozy, doctype, options);
	      // TODO: add replicationToCozy
	    }
	  }, timer * 1000));
	}
	
	function stopRepeatedReplication(cozy, doctype) {
	  if (hasRepeatedReplication(cozy, doctype)) {
	    clearInterval(getRepeatedReplication(cozy, doctype));
	    setRepeatedReplication(cozy, doctype, undefined);
	  }
	  if (hasReplication(cozy, doctype)) {
	    return stopReplication(cozy, doctype);
	  }
	
	  return Promise.resolve();
	}
	
	function stopAllRepeatedReplication(cozy) {
	  var doctypes = getDoctypes(cozy);
	  var stop = function stop(doctype) {
	    return stopRepeatedReplication(cozy, doctype);
	  };
	  return Promise.all(doctypes.map(stop));
	}

/***/ },
/* 205 */
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
	exports.updateLastSync = updateLastSync;
	
	var _fetch = __webpack_require__(196);
	
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
	
	function updateLastSync(cozy) {
	  return (0, _fetch.cozyFetchJSON)(cozy, 'POST', '/settings/synchronized');
	}

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.removeReferencedFiles = exports.addReferencedFiles = undefined;
	exports.listReferencedFiles = listReferencedFiles;
	exports.fetchReferencedFiles = fetchReferencedFiles;
	
	var _fetch = __webpack_require__(196);
	
	var _doctypes = __webpack_require__(199);
	
	function updateRelations(verb) {
	  return function (cozy, doc, ids) {
	    if (!doc) throw new Error('missing doc argument');
	    if (!Array.isArray(ids)) ids = [ids];
	
	    var refs = ids.map(function (id) {
	      return { type: _doctypes.DOCTYPE_FILES, id: id };
	    });
	
	    return (0, _fetch.cozyFetchJSON)(cozy, verb, makeReferencesPath(doc), { data: refs });
	  };
	}
	
	var addReferencedFiles = exports.addReferencedFiles = updateRelations('POST');
	var removeReferencedFiles = exports.removeReferencedFiles = updateRelations('DELETE');
	
	function listReferencedFiles(cozy, doc) {
	  if (!doc) throw new Error('missing doc argument');
	  return (0, _fetch.cozyFetchJSON)(cozy, 'GET', makeReferencesPath(doc)).then(function (files) {
	    return files.map(function (file) {
	      return file._id;
	    });
	  });
	}
	
	function fetchReferencedFiles(cozy, doc, options) {
	  if (!doc) throw new Error('missing doc argument');
	  var params = Object.keys(options).map(function (key) {
	    return '&page[' + key + ']=' + options[key];
	  }).join('');
	  // As datetime is the only sort option available, I see no reason to not have it by default
	  return (0, _fetch.cozyFetchRawJSON)(cozy, 'GET', makeReferencesPath(doc) + '?include=files&sort=datetime' + params);
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