(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
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
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("isomorphic-fetch");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global fetch */
	
	
	__webpack_require__(3);
	
	__webpack_require__(4);
	
	__webpack_require__(5);
	
	__webpack_require__(6);
	
	__webpack_require__(7);
	
	__webpack_require__(8);
	
	__webpack_require__(9);
	
	__webpack_require__(10);
	
	__webpack_require__(11);
	
	__webpack_require__(12);
	
	__webpack_require__(13);
	
	__webpack_require__(14);
	
	__webpack_require__(15);
	
	__webpack_require__(16);
	
	__webpack_require__(17);
	
	__webpack_require__(18);
	
	__webpack_require__(19);
	
	__webpack_require__(20);
	
	__webpack_require__(21);
	
	__webpack_require__(22);
	
	__webpack_require__(23);
	
	__webpack_require__(24);
	
	__webpack_require__(25);
	
	__webpack_require__(26);
	
	__webpack_require__(27);
	
	__webpack_require__(28);
	
	__webpack_require__(29);
	
	__webpack_require__(30);
	
	__webpack_require__(31);
	
	__webpack_require__(32);
	
	__webpack_require__(33);
	
	__webpack_require__(34);
	
	__webpack_require__(35);
	
	__webpack_require__(36);
	
	__webpack_require__(37);
	
	__webpack_require__(38);
	
	__webpack_require__(39);
	
	__webpack_require__(40);
	
	__webpack_require__(41);
	
	__webpack_require__(42);
	
	__webpack_require__(43);
	
	__webpack_require__(44);
	
	__webpack_require__(45);
	
	__webpack_require__(46);
	
	__webpack_require__(47);
	
	__webpack_require__(48);
	
	__webpack_require__(49);
	
	__webpack_require__(50);
	
	__webpack_require__(51);
	
	__webpack_require__(52);
	
	__webpack_require__(53);
	
	__webpack_require__(54);
	
	__webpack_require__(55);
	
	__webpack_require__(56);
	
	__webpack_require__(57);
	
	__webpack_require__(58);
	
	__webpack_require__(59);
	
	__webpack_require__(60);
	
	__webpack_require__(61);
	
	__webpack_require__(62);
	
	__webpack_require__(63);
	
	__webpack_require__(64);
	
	__webpack_require__(65);
	
	__webpack_require__(66);
	
	__webpack_require__(67);
	
	__webpack_require__(68);
	
	__webpack_require__(69);
	
	__webpack_require__(70);
	
	__webpack_require__(71);
	
	__webpack_require__(72);
	
	__webpack_require__(73);
	
	__webpack_require__(74);
	
	__webpack_require__(75);
	
	__webpack_require__(76);
	
	__webpack_require__(77);
	
	__webpack_require__(78);
	
	__webpack_require__(79);
	
	__webpack_require__(80);
	
	__webpack_require__(81);
	
	__webpack_require__(82);
	
	__webpack_require__(83);
	
	__webpack_require__(84);
	
	__webpack_require__(85);
	
	__webpack_require__(86);
	
	__webpack_require__(87);
	
	__webpack_require__(88);
	
	var _utils = __webpack_require__(89);
	
	var _auth_storage = __webpack_require__(90);
	
	var _auth_v = __webpack_require__(91);
	
	var _auth_v2 = __webpack_require__(93);
	
	var auth = _interopRequireWildcard(_auth_v2);
	
	var _data = __webpack_require__(97);
	
	var data = _interopRequireWildcard(_data);
	
	var _fetch = __webpack_require__(94);
	
	var cozyFetch = _interopRequireWildcard(_fetch);
	
	var _mango = __webpack_require__(99);
	
	var mango = _interopRequireWildcard(_mango);
	
	var _files = __webpack_require__(100);
	
	var files = _interopRequireWildcard(_files);
	
	var _intents = __webpack_require__(101);
	
	var intents = _interopRequireWildcard(_intents);
	
	var _jobs = __webpack_require__(102);
	
	var jobs = _interopRequireWildcard(_jobs);
	
	var _offline = __webpack_require__(103);
	
	var offline = _interopRequireWildcard(_offline);
	
	var _settings = __webpack_require__(104);
	
	var settings = _interopRequireWildcard(_settings);
	
	var _relations = __webpack_require__(105);
	
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
	  deleteClientById: settings.deleteClientById
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
	        console.warn && console.warn('cozy.client.fetchJSON is a temporary method for development purpose, you should avoid using it.');
	        var args = [this].concat(Array.prototype.slice.call(arguments));
	        return cozyFetch.cozyFetchJSON.apply(this, args);
	      };
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
/* 3 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.typed.data-view");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.typed.int8-array");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.typed.uint8-array");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.typed.uint8-clamped-array");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.typed.int16-array");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.typed.uint16-array");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.typed.int32-array");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.typed.uint32-array");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.typed.float32-array");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.typed.float64-array");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.map");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.set");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.weak-map");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.weak-set");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.reflect.apply");

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.reflect.construct");

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.reflect.define-property");

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.reflect.delete-property");

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.reflect.get");

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.reflect.get-own-property-descriptor");

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.reflect.get-prototype-of");

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.reflect.has");

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.reflect.is-extensible");

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.reflect.own-keys");

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.reflect.prevent-extensions");

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.reflect.set");

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.reflect.set-prototype-of");

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.promise");

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.symbol");

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.object.assign");

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.object.is");

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.object.set-prototype-of");

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.function.name");

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.string.raw");

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.string.from-code-point");

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.string.code-point-at");

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.string.repeat");

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.string.starts-with");

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.string.ends-with");

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.string.includes");

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.regexp.flags");

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.regexp.match");

/***/ },
/* 45 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.regexp.replace");

/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.regexp.split");

/***/ },
/* 47 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.regexp.search");

/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.array.from");

/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.array.of");

/***/ },
/* 50 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.array.copy-within");

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.array.find");

/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.array.find-index");

/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.array.fill");

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.array.iterator");

/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.number.is-finite");

/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.number.is-integer");

/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.number.is-safe-integer");

/***/ },
/* 58 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.number.is-nan");

/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.number.epsilon");

/***/ },
/* 60 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.number.min-safe-integer");

/***/ },
/* 61 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.number.max-safe-integer");

/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.math.acosh");

/***/ },
/* 63 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.math.asinh");

/***/ },
/* 64 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.math.atanh");

/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.math.cbrt");

/***/ },
/* 66 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.math.clz32");

/***/ },
/* 67 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.math.cosh");

/***/ },
/* 68 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.math.expm1");

/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.math.fround");

/***/ },
/* 70 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.math.hypot");

/***/ },
/* 71 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.math.imul");

/***/ },
/* 72 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.math.log1p");

/***/ },
/* 73 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.math.log10");

/***/ },
/* 74 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.math.log2");

/***/ },
/* 75 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.math.sign");

/***/ },
/* 76 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.math.sinh");

/***/ },
/* 77 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.math.tanh");

/***/ },
/* 78 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es6.math.trunc");

/***/ },
/* 79 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es7.array.includes");

/***/ },
/* 80 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es7.object.values");

/***/ },
/* 81 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es7.object.entries");

/***/ },
/* 82 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es7.object.get-own-property-descriptors");

/***/ },
/* 83 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es7.string.pad-start");

/***/ },
/* 84 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/es7.string.pad-end");

/***/ },
/* 85 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/web.timers");

/***/ },
/* 86 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/web.immediate");

/***/ },
/* 87 */
/***/ function(module, exports) {

	module.exports = require("core-js/modules/web.dom.iterable");

/***/ },
/* 88 */
/***/ function(module, exports) {

	module.exports = require("regenerator-runtime/runtime");

/***/ },
/* 89 */
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
	    return;
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
/* 90 */
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
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(btoa) {'use strict';
	
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(92)))

/***/ },
/* 92 */
/***/ function(module, exports) {

	module.exports = require("btoa");

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(btoa) {'use strict';
	
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
	
	var _utils = __webpack_require__(89);
	
	var _fetch = __webpack_require__(94);
	
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
	      buffer = __webpack_require__(96).randomBytes(StateSize);
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(92)))

/***/ },
/* 94 */
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
	
	var _auth_v = __webpack_require__(93);
	
	var _utils = __webpack_require__(89);
	
	var _jsonapi = __webpack_require__(95);
	
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
/* 95 */
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
/* 96 */
/***/ function(module, exports) {

	module.exports = require("crypto");

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.create = create;
	exports.find = find;
	exports.findMany = findMany;
	exports.changesFeed = changesFeed;
	exports.update = update;
	exports.updateAttributes = updateAttributes;
	exports._delete = _delete;
	
	var _utils = __webpack_require__(89);
	
	var _doctypes = __webpack_require__(98);
	
	var _fetch = __webpack_require__(94);
	
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
	
	      // When no doc was ever created ant the database does not exist yet,
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
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DOCTYPE_FILES = undefined;
	exports.normalizeDoctype = normalizeDoctype;
	
	var _utils = __webpack_require__(89);
	
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
/* 99 */
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
	
	var _utils = __webpack_require__(89);
	
	var _doctypes = __webpack_require__(98);
	
	var _fetch = __webpack_require__(94);
	
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
	    since: options.since
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
/* 100 */
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
	
	var _fetch = __webpack_require__(94);
	
	var _jsonapi = __webpack_require__(95);
	
	var _jsonapi2 = _interopRequireDefault(_jsonapi);
	
	var _doctypes = __webpack_require__(98);
	
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
	
	function destroyById(cozy, id) {
	  return (0, _fetch.cozyFetchJSON)(cozy, 'DELETE', '/files/trash/' + encodeURIComponent(id));
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
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.create = create;
	exports.createService = createService;
	
	var _fetch = __webpack_require__(94);
	
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
	function injectService(url, element, intent, data) {
	  var document = element.ownerDocument;
	  if (!document) throw new Error('Cannot retrieve document object from given element');
	
	  var window = document.defaultView;
	  if (!window) throw new Error('Cannot retrieve window object from document');
	
	  var iframe = document.createElement('iframe');
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
	          if (event.data.dimensions[prop]) element.style[prop] = event.data.dimensions[prop] + 'px';
	        });
	
	        return true;
	      }
	
	      window.removeEventListener('message', messageHandler);
	      iframe.parentNode.removeChild(iframe);
	
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
	
	  createPromise.start = function (element) {
	    return createPromise.then(function (intent) {
	      var service = intent.attributes.services && intent.attributes.services[0];
	
	      if (!service) {
	        return Promise.reject(new Error('Unable to find a service'));
	      }
	
	      return injectService(service.href, element, intent, data);
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
	
	    var resizeClient = function resizeClient(dimensions) {
	      if (terminated) throw new Error('Intent service has been terminated');
	
	      var message = {
	        type: 'intent-' + intent._id + ':resize',
	        // if a dom element is passed, calculate its size
	        dimensions: dimensions.element ? Object.assign({}, dimensions, {
	          maxHeight: dimensions.element.clientHeight,
	          maxWidth: dimensions.element.clientWidth
	        }) : dimensions
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
	          return _terminate({
	            type: 'intent-' + intent._id + ':done',
	            document: doc
	          });
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
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.count = count;
	exports.create = create;
	
	var _fetch = __webpack_require__(94);
	
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
/* 103 */
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
	
	var _doctypes = __webpack_require__(98);
	
	var _auth_v = __webpack_require__(93);
	
	var _utils = __webpack_require__(89);
	
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
/* 104 */
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
	
	var _fetch = __webpack_require__(94);
	
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
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.removeReferencedFiles = exports.addReferencedFiles = undefined;
	exports.listReferencedFiles = listReferencedFiles;
	exports.fetchReferencedFiles = fetchReferencedFiles;
	
	var _fetch = __webpack_require__(94);
	
	var _doctypes = __webpack_require__(98);
	
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
	  return (0, _fetch.cozyFetchRawJSON)(cozy, 'GET', makeReferencesPath(doc) + '?include=files' + params);
	}
	
	function makeReferencesPath(doc) {
	  var type = encodeURIComponent(doc._type);
	  var id = encodeURIComponent(doc._id);
	  return '/data/' + type + '/' + id + '/relationships/references';
	}

/***/ }
/******/ ])));
//# sourceMappingURL=cozy-client.node.js.map