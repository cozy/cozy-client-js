(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("cozy-client-js", [], factory);
	else if(typeof exports === 'object')
		exports["cozy-client-js"] = factory();
	else
		root["cozy-client-js"] = factory();
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
	__webpack_require__(2);
	module.exports = __webpack_require__(3);


/***/ },
/* 1 */
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
	    var list = this.map[name]
	    if (!list) {
	      list = []
	      this.map[name] = list
	    }
	    list.push(value)
	  }
	
	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }
	
	  Headers.prototype.get = function(name) {
	    var values = this.map[normalizeName(name)]
	    return values ? values[0] : null
	  }
	
	  Headers.prototype.getAll = function(name) {
	    return this.map[normalizeName(name)] || []
	  }
	
	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }
	
	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)]
	  }
	
	  Headers.prototype.forEach = function(callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function(name) {
	      this.map[name].forEach(function(value) {
	        callback.call(thisArg, value, name, this)
	      }, this)
	    }, this)
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
	    reader.readAsArrayBuffer(blob)
	    return fileReaderReady(reader)
	  }
	
	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    reader.readAsText(blob)
	    return fileReaderReady(reader)
	  }
	
	  function Body() {
	    this.bodyUsed = false
	
	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString()
	      } else if (!body) {
	        this._bodyText = ''
	      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
	        // Only support ArrayBuffers for POST method.
	        // Receiving ArrayBuffers happens via Blobs, instead.
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
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }
	
	      this.arrayBuffer = function() {
	        return this.blob().then(readBlobAsArrayBuffer)
	      }
	
	      this.text = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }
	
	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text')
	        } else {
	          return Promise.resolve(this._bodyText)
	        }
	      }
	    } else {
	      this.text = function() {
	        var rejected = consumed(this)
	        return rejected ? rejected : Promise.resolve(this._bodyText)
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
	    if (Request.prototype.isPrototypeOf(input)) {
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
	      if (!body) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    } else {
	      this.url = input
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
	    return new Request(this)
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
	
	  function headers(xhr) {
	    var head = new Headers()
	    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n')
	    pairs.forEach(function(header) {
	      var split = header.trim().split(':')
	      var key = split.shift().trim()
	      var value = split.join(':').trim()
	      head.append(key, value)
	    })
	    return head
	  }
	
	  Body.call(Request.prototype)
	
	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }
	
	    this.type = 'default'
	    this.status = options.status
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = options.statusText
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
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
	      var request
	      if (Request.prototype.isPrototypeOf(input) && !init) {
	        request = input
	      } else {
	        request = new Request(input, init)
	      }
	
	      var xhr = new XMLHttpRequest()
	
	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL
	        }
	
	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL')
	        }
	
	        return
	      }
	
	      xhr.onload = function() {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        }
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
/* 2 */
/***/ function(module, exports) {

	/**
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
	
	  var hasOwn = Object.prototype.hasOwnProperty;
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
	
	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";
	
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
	
	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" ||
	              (method === "throw" && delegate.iterator[method] === undefined)) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;
	
	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }
	
	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }
	
	          var record = tryCatch(
	            delegate.iterator[method],
	            delegate.iterator,
	            arg
	          );
	
	          if (record.type === "throw") {
	            context.delegate = null;
	
	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }
	
	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;
	
	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }
	
	          context.delegate = null;
	        }
	
	        if (method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = arg;
	
	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }
	
	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }
	
	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }
	
	        state = GenStateExecuting;
	
	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;
	
	          var info = {
	            value: record.arg,
	            done: context.done
	          };
	
	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }
	
	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }
	
	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);
	
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };
	
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
	        return !!caught;
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
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }
	
	      return ContinueSentinel;
	    },
	
	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }
	
	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _crud = __webpack_require__(4);
	
	var crud = _interopRequireWildcard(_crud);
	
	var _mango = __webpack_require__(7);
	
	var mango = _interopRequireWildcard(_mango);
	
	var _files = __webpack_require__(8);
	
	var files = _interopRequireWildcard(_files);
	
	var _init2 = __webpack_require__(9);
	
	var _init3 = _interopRequireDefault(_init2);
	
	var _utils = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var filesProto = {
	  create: function create(data, options, optCallback) {
	    return (0, _utils.promiser)(files.create(data, options), optCallback);
	  },
	  createDirectory: function createDirectory(options, optCallback) {
	    return (0, _utils.promiser)(files.createDirectory(options), optCallback);
	  },
	  updateById: function updateById(id, data, options, optCallback) {
	    return (0, _utils.promiser)(files.updateById(id, data, options), optCallback);
	  },
	  updateAttributesById: function updateAttributesById(id, attrs, optCallback) {
	    return (0, _utils.promiser)(files.updateAttributesById(id, attrs), optCallback);
	  },
	  updateAttributesByPath: function updateAttributesByPath(path, attrs, optCallback) {
	    return (0, _utils.promiser)(files.updateAttributesByPath(path, attrs), optCallback);
	  },
	  trashById: function trashById(id, optCallback) {
	    return (0, _utils.promiser)(files.trashById(id), optCallback);
	  },
	  statById: function statById(id, optCallback) {
	    return (0, _utils.promiser)(files.statById(id), optCallback);
	  },
	  statByPath: function statByPath(path, optCallback) {
	    return (0, _utils.promiser)(files.statByPath(path), optCallback);
	  },
	  downloadById: function downloadById(id, optCallback) {
	    return (0, _utils.promiser)(files.downloadById(id), optCallback);
	  },
	  downloadByPath: function downloadByPath(path, optCallback) {
	    return (0, _utils.promiser)(files.downloadByPath(path), optCallback);
	  }
	};
	
	var cozy = {
	  init: function init(opts, optCallback) {
	    return (0, _utils.promiser)((0, _init3.default)(opts), optCallback);
	  },
	  // create(doctype, attributes) add a document to the database
	  create: function create(doctype, attributes, optCallback) {
	    return (0, _utils.promiser)(crud.create(doctype, attributes), optCallback);
	  },
	  // find(doctype, id) retrieve a document by its doctype & ID.
	  find: function find(doctype, id, optCallback) {
	    return (0, _utils.promiser)(crud.find(doctype, id), optCallback);
	  },
	  update: function update(doctype, doc, changes, optCallback) {
	    return (0, _utils.promiser)(crud.update(doctype, doc, changes), optCallback);
	  },
	  delete: function _delete(doctype, doc, optCallback) {
	    return (0, _utils.promiser)(crud._delete(doctype, doc), optCallback);
	  },
	  defineIndex: function defineIndex(doctype, indexDef, optCallback) {
	    return (0, _utils.promiser)(mango.defineIndex(doctype, indexDef), optCallback);
	  },
	  query: function query(indexRef, _query, optCallback) {
	    return (0, _utils.promiser)(mango.query(indexRef, _query), optCallback);
	  },
	  // updateAttributes(doctype, id, changes) performs a patch.
	  updateAttribute: function updateAttribute(doctype, id, changes, optCallback) {
	    return (0, _utils.promiser)(crud.updateAttributes(doctype, id, changes), optCallback);
	  },
	  // aliased delete to destroy fo browser-sdk compatibility
	  destroy: function destroy(doctype, doc, optCallback) {
	    (0, _utils.warn)('destroy is deprecated, use cozy.delete instead.');
	    return (0, _utils.promiser)(crud._delete(doctype, doc), optCallback);
	  },
	
	  files: filesProto
	};
	
	if (typeof window !== 'undefined') window.cozy = cozy;
	
	exports.default = cozy;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._delete = exports.updateAttributes = exports.update = exports.find = exports.create = undefined;
	
	var create = exports.create = function () {
	  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(doctype, attributes) {
	    var config, path, response;
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            _context.next = 2;
	            return (0, _utils.waitConfig)();
	
	          case 2:
	            config = _context.sent;
	
	            doctype = (0, _utils.normalizeDoctype)(config, doctype);
	
	            if (config.isV2) attributes.docType = doctype;
	
	            path = (0, _utils.createPath)(config, doctype);
	            _context.next = 8;
	            return (0, _utils.doFetchJSON)(config, 'POST', path, attributes);
	
	          case 8:
	            response = _context.sent;
	
	            if (!config.isV2) {
	              _context.next = 13;
	              break;
	            }
	
	            _context.next = 12;
	            return find(doctype, response._id);
	
	          case 12:
	            return _context.abrupt('return', _context.sent);
	
	          case 13:
	            return _context.abrupt('return', response.data);
	
	          case 14:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }));
	
	  return function create(_x, _x2) {
	    return _ref.apply(this, arguments);
	  };
	}();
	
	var find = exports.find = function () {
	  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(doctype, id) {
	    var config, path, response;
	    return regeneratorRuntime.wrap(function _callee2$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            _context2.next = 2;
	            return (0, _utils.waitConfig)();
	
	          case 2:
	            config = _context2.sent;
	
	            doctype = (0, _utils.normalizeDoctype)(config, doctype);
	
	            if (id) {
	              _context2.next = 6;
	              break;
	            }
	
	            throw new Error('Missing id parameter');
	
	          case 6:
	            path = (0, _utils.createPath)(config, doctype, id);
	            _context2.next = 9;
	            return (0, _utils.doFetchJSON)(config, 'GET', path);
	
	          case 9:
	            response = _context2.sent;
	
	
	            if (config.isV2) Object.assign(response, { _rev: NOREV });
	
	            return _context2.abrupt('return', response);
	
	          case 12:
	          case 'end':
	            return _context2.stop();
	        }
	      }
	    }, _callee2, this);
	  }));
	
	  return function find(_x3, _x4) {
	    return _ref2.apply(this, arguments);
	  };
	}();
	
	var update = exports.update = function () {
	  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(doctype, doc, changes) {
	    var config, _id, _rev, path, response;
	
	    return regeneratorRuntime.wrap(function _callee3$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	            _context3.next = 2;
	            return (0, _utils.waitConfig)();
	
	          case 2:
	            config = _context3.sent;
	
	            doctype = (0, _utils.normalizeDoctype)(config, doctype);
	
	            _id = doc._id, _rev = doc._rev;
	
	            if (_id) {
	              _context3.next = 7;
	              break;
	            }
	
	            throw new Error('Missing _id field in passed document');
	
	          case 7:
	            if (!(!config.isV2 && !_rev)) {
	              _context3.next = 9;
	              break;
	            }
	
	            throw new Error('Missing _rev field in passed document');
	
	          case 9:
	
	            if (config.isV2) {
	              changes = Object.assign({ _id: _id }, changes);
	            } else {
	              changes = Object.assign({ _id: _id, _rev: _rev }, changes);
	            }
	
	            path = (0, _utils.createPath)(config, doctype, _id);
	            _context3.next = 13;
	            return (0, _utils.doFetchJSON)(config, 'PUT', path, changes);
	
	          case 13:
	            response = _context3.sent;
	
	            if (!config.isV2) {
	              _context3.next = 18;
	              break;
	            }
	
	            _context3.next = 17;
	            return find(doctype, _id);
	
	          case 17:
	            return _context3.abrupt('return', _context3.sent);
	
	          case 18:
	            return _context3.abrupt('return', response.data);
	
	          case 19:
	          case 'end':
	            return _context3.stop();
	        }
	      }
	    }, _callee3, this);
	  }));
	
	  return function update(_x5, _x6, _x7) {
	    return _ref3.apply(this, arguments);
	  };
	}();
	
	var updateAttributes = exports.updateAttributes = function () {
	  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(doctype, _id, changes) {
	    var tries = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 3;
	    var config, doc, updated;
	    return regeneratorRuntime.wrap(function _callee4$(_context4) {
	      while (1) {
	        switch (_context4.prev = _context4.next) {
	          case 0:
	            _context4.next = 2;
	            return (0, _utils.waitConfig)();
	
	          case 2:
	            config = _context4.sent;
	
	            doctype = (0, _utils.normalizeDoctype)(config, doctype);
	            _context4.next = 6;
	            return find(doctype, _id);
	
	          case 6:
	            doc = _context4.sent;
	            updated = Object.assign({ _id: _id }, doc, changes);
	            _context4.prev = 8;
	            _context4.next = 11;
	            return update(doctype, doc, updated);
	
	          case 11:
	            _context4.next = 20;
	            break;
	
	          case 13:
	            _context4.prev = 13;
	            _context4.t0 = _context4['catch'](8);
	
	            if (!(tries > 0)) {
	              _context4.next = 19;
	              break;
	            }
	
	            updateAttributes(doctype, _id, changes, tries - 1);
	            _context4.next = 20;
	            break;
	
	          case 19:
	            throw _context4.t0;
	
	          case 20:
	          case 'end':
	            return _context4.stop();
	        }
	      }
	    }, _callee4, this, [[8, 13]]);
	  }));
	
	  return function updateAttributes(_x8, _x9, _x10, _x11) {
	    return _ref4.apply(this, arguments);
	  };
	}();
	
	var _delete = exports._delete = function () {
	  var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(doctype, doc) {
	    var config, _id, _rev, query, path, response;
	
	    return regeneratorRuntime.wrap(function _callee5$(_context5) {
	      while (1) {
	        switch (_context5.prev = _context5.next) {
	          case 0:
	            _context5.next = 2;
	            return (0, _utils.waitConfig)();
	
	          case 2:
	            config = _context5.sent;
	
	            doctype = (0, _utils.normalizeDoctype)(config, doctype);
	
	            _id = doc._id, _rev = doc._rev;
	
	            if (_id) {
	              _context5.next = 7;
	              break;
	            }
	
	            throw new Error('Missing _id field in passed document');
	
	          case 7:
	            if (!(!config.isV2 && !_rev)) {
	              _context5.next = 9;
	              break;
	            }
	
	            throw new Error('Missing _rev field in passed document');
	
	          case 9:
	            query = config.isV2 ? null : { rev: _rev };
	            path = (0, _utils.createPath)(config, doctype, _id, query);
	            _context5.next = 13;
	            return (0, _utils.doFetchJSON)(config, 'DELETE', path);
	
	          case 13:
	            response = _context5.sent;
	
	
	            if (config.isV2) Object.assign(response, { id: _id, rev: NOREV });
	
	            return _context5.abrupt('return', response);
	
	          case 16:
	          case 'end':
	            return _context5.stop();
	        }
	      }
	    }, _callee5, this);
	  }));
	
	  return function _delete(_x13, _x14) {
	    return _ref5.apply(this, arguments);
	  };
	}();
	
	var _utils = __webpack_require__(5);
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
	
	var NOREV = 'stack-v2-no-rev';

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.waitConfig = exports.config = undefined;
	
	var waitConfig = exports.waitConfig = function () {
	  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(opts) {
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            if (!(opts && opts.nocompat === true && config.isV2)) {
	              _context.next = 2;
	              break;
	            }
	
	            throw new Error('not implemented on v2');
	
	          case 2:
	            return _context.abrupt('return', config);
	
	          case 3:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }));
	
	  return function waitConfig(_x) {
	    return _ref.apply(this, arguments);
	  };
	}();
	
	exports.configure = configure;
	exports.promiser = promiser;
	exports.createPath = createPath;
	exports.doFetch = doFetch;
	exports.doFetchJSON = doFetchJSON;
	exports.normalizeDoctype = normalizeDoctype;
	exports.warn = warn;
	
	var _jsonapi = __webpack_require__(6);
	
	var _jsonapi2 = _interopRequireDefault(_jsonapi);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* global fetch, btoa */
	
	
	var config = exports.config = {};
	
	function configure(opts) {
	  exports.config = config = opts;
	  return config;
	}
	
	function promiser(promise, optCallback) {
	  if (!optCallback || typeof optCallback !== 'function') {
	    return promise;
	  }
	  promise.then(function (result) {
	    optCallback(null, result);
	  }, function (err) {
	    optCallback(err, null);
	  });
	  return null;
	}
	
	function createPath(config, doctype) {
	  var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
	  var query = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
	
	  var route = '/data/';
	  if (!config.isV2) {
	    route += encodeURIComponent(doctype) + '/';
	  }
	  if (id !== '') {
	    route += encodeURIComponent(id);
	  }
	  if (query) {
	    var q = [];
	    for (var qname in query) {
	      q.push(encodeURIComponent(qname) + '=' + encodeURIComponent(query[qname]));
	    }
	    route += '?' + q.join('&');
	  }
	  return route;
	}
	
	function doFetch(config, method, path, body) {
	  var options = { method: method, headers: {} };
	
	  if (body !== undefined) {
	    options.headers['Content-Type'] = 'application/json';
	    options.body = JSON.stringify(body);
	  }
	
	  if (config.auth) {
	    var auth = config.auth.appName + ':' + config.auth.token;
	    options.headers['Authorization'] = 'Basic ' + btoa(auth);
	  }
	
	  var target = config.target || '';
	  var pathprefix = config.isV2 ? '/ds-api' : '';
	  var fullpath = target + pathprefix + path;
	  return fetch(fullpath, options).then(function (res) {
	    if (!res.ok) {
	      var contentType = res.headers.get('content-type');
	      var data = void 0;
	      if (contentType && contentType.indexOf('json') >= 0) {
	        data = res.json().then(function (err) {
	          throw err;
	        });
	      } else {
	        data = res.text();
	      }
	      return data.then(function (err) {
	        throw err;
	      });
	    }
	    return res;
	  });
	}
	
	function doFetchJSON(config, method, path, body) {
	  return doFetch(config, method, path, body).then(function (res) {
	    var contentType = res.headers.get('content-type');
	    var json = res.json();
	    if (contentType && contentType.indexOf('application/vnd.api+json') === 0) {
	      return json.then(_jsonapi2.default);
	    } else {
	      return json;
	    }
	  });
	}
	
	var KNOWN_DOCTYPES = {
	  'files': 'io.cozy.files',
	  'folder': 'io.cozy.folders',
	  'contact': 'io.cozy.contacts',
	  'event': 'io.cozy.events',
	  'track': 'io.cozy.labs.music.track',
	  'playlist': 'io.cozy.labs.music.playlist'
	};
	var REVERSE_KNOWN = {};
	Object.keys(KNOWN_DOCTYPES).forEach(function (k) {
	  REVERSE_KNOWN[KNOWN_DOCTYPES[k]] = k;
	});
	function normalizeDoctype(config, doctype) {
	  var isQualified = doctype.indexOf('.') !== -1;
	  if (config.isV2 && isQualified) {
	    var known = REVERSE_KNOWN[doctype];
	    if (known) return known;
	    return doctype.replace(/\./g, '-');
	  }
	  if (config.isV3 && !isQualified) {
	    var _known = KNOWN_DOCTYPES[doctype];
	    if (_known) {
	      warn('you are using a non-qualified doctype ' + doctype + ' assumed to be ' + _known);
	      return _known;
	    }
	    throw new Error('Doctype ' + doctype + ' should be qualified.');
	  }
	  return doctype;
	}
	
	var warned = [];
	function warn(text) {
	  if (warned.indexOf(text) === -1) {
	    warned.push(text);
	    console.log('Warning', text);
	  }
	}

/***/ },
/* 6 */
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
	
	function handleResource(rawResource, resources) {
	  var resource = {
	    _id: rawResource.id,
	    _type: rawResource.type,
	    _rev: rawResource.meta.rev,
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
	      return handleResource(r, resources);
	    });
	  }
	
	  if (Array.isArray(doc.data)) {
	    return doc.data.map(function (r) {
	      return handleResource(r, resources);
	    });
	  } else {
	    return handleResource(doc.data, resources);
	  }
	}
	
	exports.default = handleTopLevel;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.query = exports.defineIndex = undefined;
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var defineIndex = exports.defineIndex = function () {
	  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(doctype, fields) {
	    var config;
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            _context.next = 2;
	            return (0, _utils.waitConfig)();
	
	          case 2:
	            config = _context.sent;
	
	            doctype = (0, _utils.normalizeDoctype)(config, doctype);
	
	            if (!(!Array.isArray(fields) || fields.length === 0)) {
	              _context.next = 6;
	              break;
	            }
	
	            throw new Error('defineIndex fields should be a non-empty array');
	
	          case 6:
	            if (!config.isV2) {
	              _context.next = 12;
	              break;
	            }
	
	            _context.next = 9;
	            return defineIndexV2(config, doctype, fields);
	
	          case 9:
	            return _context.abrupt('return', _context.sent);
	
	          case 12:
	            _context.next = 14;
	            return defineIndexV3(config, doctype, fields);
	
	          case 14:
	            return _context.abrupt('return', _context.sent);
	
	          case 15:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }));
	
	  return function defineIndex(_x, _x2) {
	    return _ref.apply(this, arguments);
	  };
	}();
	
	var query = exports.query = function () {
	  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(indexRef, options) {
	    var config;
	    return regeneratorRuntime.wrap(function _callee2$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            _context2.next = 2;
	            return (0, _utils.waitConfig)();
	
	          case 2:
	            config = _context2.sent;
	
	            if (indexRef) {
	              _context2.next = 5;
	              break;
	            }
	
	            throw new Error('query should be passed the indexRef');
	
	          case 5:
	            if (!config.isV2) {
	              _context2.next = 11;
	              break;
	            }
	
	            _context2.next = 8;
	            return queryV2(config, indexRef, options);
	
	          case 8:
	            return _context2.abrupt('return', _context2.sent);
	
	          case 11:
	            _context2.next = 13;
	            return queryV3(config, indexRef, options);
	
	          case 13:
	            return _context2.abrupt('return', _context2.sent);
	
	          case 14:
	          case 'end':
	            return _context2.stop();
	        }
	      }
	    }, _callee2, this);
	  }));
	
	  return function query(_x3, _x4) {
	    return _ref2.apply(this, arguments);
	  };
	}();
	
	// Internals
	
	/* eslint-enable */
	
	// defineIndexV2 is equivalent to defineIndex but only works for V2.
	// It transforms the index fields into a map reduce view.
	var defineIndexV2 = function () {
	  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(config, doctype, fields) {
	    var indexName, indexDefinition, path;
	    return regeneratorRuntime.wrap(function _callee3$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	            indexName = 'by' + fields.map(capitalize).join('');
	            indexDefinition = { map: makeMapFunction(doctype, fields), reduce: '_count' };
	            path = '/request/' + doctype + '/' + indexName + '/';
	            _context3.next = 5;
	            return (0, _utils.doFetchJSON)(config, 'PUT', path, indexDefinition);
	
	          case 5:
	            return _context3.abrupt('return', { doctype: doctype, type: 'mapreduce', name: indexName, fields: fields });
	
	          case 6:
	          case 'end':
	            return _context3.stop();
	        }
	      }
	    }, _callee3, this);
	  }));
	
	  return function defineIndexV2(_x5, _x6, _x7) {
	    return _ref3.apply(this, arguments);
	  };
	}();
	
	// defineIndexV2 is equivalent to defineIndex but only works for V2.
	// It transforms the index fields into a map reduce view.
	
	
	var defineIndexV3 = function () {
	  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(config, doctype, fields) {
	    var path, indexDefinition, response;
	    return regeneratorRuntime.wrap(function _callee4$(_context4) {
	      while (1) {
	        switch (_context4.prev = _context4.next) {
	          case 0:
	            path = (0, _utils.createPath)(config, doctype, '_index');
	            indexDefinition = { 'index': { fields: fields } };
	            _context4.next = 4;
	            return (0, _utils.doFetchJSON)(config, 'POST', path, indexDefinition);
	
	          case 4:
	            response = _context4.sent;
	            return _context4.abrupt('return', { doctype: doctype, type: 'mango', name: response.id, fields: fields });
	
	          case 6:
	          case 'end':
	            return _context4.stop();
	        }
	      }
	    }, _callee4, this);
	  }));
	
	  return function defineIndexV3(_x8, _x9, _x10) {
	    return _ref4.apply(this, arguments);
	  };
	}();
	
	// queryV2 is equivalent to query but only works for V2.
	// It transforms the query into a _views call using makeMapReduceQuery
	
	
	var queryV2 = function () {
	  var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(config, indexRef, options) {
	    var path, opts, response;
	    return regeneratorRuntime.wrap(function _callee5$(_context5) {
	      while (1) {
	        switch (_context5.prev = _context5.next) {
	          case 0:
	            if (!(indexRef.type !== 'mapreduce')) {
	              _context5.next = 2;
	              break;
	            }
	
	            throw new Error('query indexRef should be the return value of defineIndexV2');
	
	          case 2:
	            if (options.fields) {
	              (0, _utils.warn)('query fields will be ignored on v2');
	            }
	
	            path = '/request/' + indexRef.doctype + '/' + indexRef.name + '/';
	            opts = makeMapReduceQuery(indexRef, options);
	            _context5.next = 7;
	            return (0, _utils.doFetchJSON)(config, 'POST', path, opts);
	
	          case 7:
	            response = _context5.sent;
	            return _context5.abrupt('return', response.map(function (r) {
	              return r.value;
	            }));
	
	          case 9:
	          case 'end':
	            return _context5.stop();
	        }
	      }
	    }, _callee5, this);
	  }));
	
	  return function queryV2(_x11, _x12, _x13) {
	    return _ref5.apply(this, arguments);
	  };
	}();
	
	// queryV3 is equivalent to query but only works for V3
	
	
	var queryV3 = function () {
	  var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(config, indexRef, options) {
	    var opts, path, response;
	    return regeneratorRuntime.wrap(function _callee6$(_context6) {
	      while (1) {
	        switch (_context6.prev = _context6.next) {
	          case 0:
	            if (!(indexRef.type !== 'mango')) {
	              _context6.next = 2;
	              break;
	            }
	
	            throw new Error('indexRef should be the return value of defineIndexV3');
	
	          case 2:
	            opts = {
	              use_index: indexRef.name,
	              fields: options.fields,
	              selector: options.selector,
	              limit: options.limit,
	              since: options.since,
	              sort: indexRef.fields // sort is useless with mango
	            };
	            path = (0, _utils.createPath)(config, indexRef.doctype, '_find');
	            _context6.next = 6;
	            return (0, _utils.doFetchJSON)(config, 'POST', path, opts);
	
	          case 6:
	            response = _context6.sent;
	            return _context6.abrupt('return', response.docs);
	
	          case 8:
	          case 'end':
	            return _context6.stop();
	        }
	      }
	    }, _callee6, this);
	  }));
	
	  return function queryV3(_x14, _x15, _x16) {
	    return _ref6.apply(this, arguments);
	  };
	}();
	
	// misc
	
	
	exports.parseSelector = parseSelector;
	exports.normalizeSelector = normalizeSelector;
	exports.makeMapReduceQuery = makeMapReduceQuery;
	
	var _utils = __webpack_require__(5);
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
	
	var VALUEOPERATORS = ['$eq', '$gt', '$gte', '$lt', '$lte'];
	var LOGICOPERATORS = ['$or', '$and', '$not'];
	
	/* eslint-disable */
	var MAP_TEMPLATE = function (doc) {
	  if (doc.docType.toLowerCase() === 'DOCTYPEPLACEHOLDER') {
	    emit(FIELDSPLACEHOLDER, doc);
	  }
	}.toString().replace(/ /g, '').replace(/\n/g, '');
	var COUCHDB_INFINITY = { '\uFFFF': '\uFFFF' };
	var COUCHDB_LOWEST = null;function capitalize(name) {
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
	
	  return mrquery;
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.downloadByPath = exports.downloadById = exports.statByPath = exports.statById = exports.trashById = exports.updateAttributesByPath = exports.updateAttributesById = exports.updateById = exports.createDirectory = exports.create = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var doUpload = function () {
	  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(config, data, contentType, method, path) {
	    var isBuffer, isFile, isBlob, isString, target;
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            if (data) {
	              _context.next = 2;
	              break;
	            }
	
	            throw new Error('missing data argument');
	
	          case 2:
	
	            // transform any ArrayBufferView to ArrayBuffer
	            if (data.buffer && data.buffer instanceof ArrayBuffer) {
	              data = data.buffer;
	            }
	
	            isBuffer = typeof ArrayBuffer !== 'undefined' && data instanceof ArrayBuffer;
	            isFile = typeof File !== 'undefined' && data instanceof File;
	            isBlob = typeof Blob !== 'undefined' && data instanceof Blob;
	            isString = typeof data === 'string';
	
	            if (!(!isBuffer && !isFile && !isBlob && !isString)) {
	              _context.next = 9;
	              break;
	            }
	
	            throw new Error('invalid data type');
	
	          case 9:
	
	            if (!contentType) {
	              if (isBuffer) {
	                contentType = contentTypeOctetStream;
	              } else if (isFile) {
	                contentType = data.type || contentTypeOctetStream;
	              } else if (isBlob) {
	                contentType = contentTypeOctetStream;
	              } else if (typeof data === 'string') {
	                contentType = 'text/plain';
	              }
	            }
	
	            target = config.target || '';
	            return _context.abrupt('return', fetch('' + target + path, {
	              method: method,
	              headers: { 'Content-Type': contentType },
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
	            }));
	
	          case 12:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }));
	
	  return function doUpload(_x, _x2, _x3, _x4, _x5) {
	    return _ref.apply(this, arguments);
	  };
	}();
	
	var create = exports.create = function () {
	  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(data, options) {
	    var config, _ref3, name, dirID, contentType, path, query;
	
	    return regeneratorRuntime.wrap(function _callee2$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            _context2.next = 2;
	            return (0, _utils.waitConfig)({ nocompat: true });
	
	          case 2:
	            config = _context2.sent;
	            _ref3 = options || {}, name = _ref3.name, dirID = _ref3.dirID, contentType = _ref3.contentType;
	
	            // handle case where data is a file and contains the name
	
	            if (!name && typeof data.name === 'string') {
	              name = data.name;
	            }
	
	            if (!(typeof name !== 'string' || name === '')) {
	              _context2.next = 7;
	              break;
	            }
	
	            throw new Error('missing name argument');
	
	          case 7:
	            path = '/files/' + encodeURIComponent(dirID || '');
	            query = '?Name=' + encodeURIComponent(name) + '&Type=file';
	            return _context2.abrupt('return', doUpload(config, data, contentType, 'POST', '' + path + query));
	
	          case 10:
	          case 'end':
	            return _context2.stop();
	        }
	      }
	    }, _callee2, this);
	  }));
	
	  return function create(_x6, _x7) {
	    return _ref2.apply(this, arguments);
	  };
	}();
	
	var createDirectory = exports.createDirectory = function () {
	  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(options) {
	    var config, _ref5, name, dirID, path, query;
	
	    return regeneratorRuntime.wrap(function _callee3$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	            _context3.next = 2;
	            return (0, _utils.waitConfig)({ nocompat: true });
	
	          case 2:
	            config = _context3.sent;
	            _ref5 = options || {}, name = _ref5.name, dirID = _ref5.dirID;
	
	            if (!(typeof name !== 'string' || name === '')) {
	              _context3.next = 6;
	              break;
	            }
	
	            throw new Error('missing name argument');
	
	          case 6:
	            path = '/files/' + encodeURIComponent(dirID || '');
	            query = '?Name=' + encodeURIComponent(name) + '&Type=directory';
	            return _context3.abrupt('return', (0, _utils.doFetchJSON)(config, 'POST', '' + path + query));
	
	          case 9:
	          case 'end':
	            return _context3.stop();
	        }
	      }
	    }, _callee3, this);
	  }));
	
	  return function createDirectory(_x8) {
	    return _ref4.apply(this, arguments);
	  };
	}();
	
	var updateById = exports.updateById = function () {
	  var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(id, data, options) {
	    var config, _ref7, contentType;
	
	    return regeneratorRuntime.wrap(function _callee4$(_context4) {
	      while (1) {
	        switch (_context4.prev = _context4.next) {
	          case 0:
	            _context4.next = 2;
	            return (0, _utils.waitConfig)({ nocompat: true });
	
	          case 2:
	            config = _context4.sent;
	            _ref7 = options || {}, contentType = _ref7.contentType;
	            return _context4.abrupt('return', doUpload(config, data, contentType, 'PUT', '/files/' + encodeURIComponent(id)));
	
	          case 5:
	          case 'end':
	            return _context4.stop();
	        }
	      }
	    }, _callee4, this);
	  }));
	
	  return function updateById(_x9, _x10, _x11) {
	    return _ref6.apply(this, arguments);
	  };
	}();
	
	var updateAttributesById = exports.updateAttributesById = function () {
	  var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(id, attrs) {
	    var config, body;
	    return regeneratorRuntime.wrap(function _callee5$(_context5) {
	      while (1) {
	        switch (_context5.prev = _context5.next) {
	          case 0:
	            _context5.next = 2;
	            return (0, _utils.waitConfig)({ nocompat: true });
	
	          case 2:
	            config = _context5.sent;
	
	            if (!(!attrs || (typeof attrs === 'undefined' ? 'undefined' : _typeof(attrs)) !== 'object')) {
	              _context5.next = 5;
	              break;
	            }
	
	            throw new Error('missing attrs argument');
	
	          case 5:
	            body = { data: { attributes: attrs } };
	            return _context5.abrupt('return', (0, _utils.doFetchJSON)(config, 'PATCH', '/files/' + encodeURIComponent(id), body));
	
	          case 7:
	          case 'end':
	            return _context5.stop();
	        }
	      }
	    }, _callee5, this);
	  }));
	
	  return function updateAttributesById(_x12, _x13) {
	    return _ref8.apply(this, arguments);
	  };
	}();
	
	var updateAttributesByPath = exports.updateAttributesByPath = function () {
	  var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(path, attrs) {
	    var config, body;
	    return regeneratorRuntime.wrap(function _callee6$(_context6) {
	      while (1) {
	        switch (_context6.prev = _context6.next) {
	          case 0:
	            _context6.next = 2;
	            return (0, _utils.waitConfig)({ nocompat: true });
	
	          case 2:
	            config = _context6.sent;
	
	            if (!(!attrs || (typeof attrs === 'undefined' ? 'undefined' : _typeof(attrs)) !== 'object')) {
	              _context6.next = 5;
	              break;
	            }
	
	            throw new Error('missing attrs argument');
	
	          case 5:
	            body = { data: { attributes: attrs } };
	            return _context6.abrupt('return', (0, _utils.doFetchJSON)(config, 'PATCH', '/files/metadata?Path=' + encodeURIComponent(path), body));
	
	          case 7:
	          case 'end':
	            return _context6.stop();
	        }
	      }
	    }, _callee6, this);
	  }));
	
	  return function updateAttributesByPath(_x14, _x15) {
	    return _ref9.apply(this, arguments);
	  };
	}();
	
	var trashById = exports.trashById = function () {
	  var _ref10 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(id) {
	    var config;
	    return regeneratorRuntime.wrap(function _callee7$(_context7) {
	      while (1) {
	        switch (_context7.prev = _context7.next) {
	          case 0:
	            _context7.next = 2;
	            return (0, _utils.waitConfig)({ nocompat: true });
	
	          case 2:
	            config = _context7.sent;
	
	            if (!(typeof id !== 'string' || id === '')) {
	              _context7.next = 5;
	              break;
	            }
	
	            throw new Error('missing id argument');
	
	          case 5:
	            return _context7.abrupt('return', (0, _utils.doFetchJSON)(config, 'DELETE', '/files/' + encodeURIComponent(id)));
	
	          case 6:
	          case 'end':
	            return _context7.stop();
	        }
	      }
	    }, _callee7, this);
	  }));
	
	  return function trashById(_x16) {
	    return _ref10.apply(this, arguments);
	  };
	}();
	
	var statById = exports.statById = function () {
	  var _ref11 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(id) {
	    var config, res;
	    return regeneratorRuntime.wrap(function _callee8$(_context8) {
	      while (1) {
	        switch (_context8.prev = _context8.next) {
	          case 0:
	            _context8.next = 2;
	            return (0, _utils.waitConfig)({ nocompat: true });
	
	          case 2:
	            config = _context8.sent;
	            _context8.next = 5;
	            return (0, _utils.doFetchJSON)(config, 'GET', '/files/' + encodeURIComponent(id));
	
	          case 5:
	            res = _context8.sent;
	
	            res.isDir = isDir(res);
	            return _context8.abrupt('return', res);
	
	          case 8:
	          case 'end':
	            return _context8.stop();
	        }
	      }
	    }, _callee8, this);
	  }));
	
	  return function statById(_x17) {
	    return _ref11.apply(this, arguments);
	  };
	}();
	
	var statByPath = exports.statByPath = function () {
	  var _ref12 = _asyncToGenerator(regeneratorRuntime.mark(function _callee9(path) {
	    var config, res;
	    return regeneratorRuntime.wrap(function _callee9$(_context9) {
	      while (1) {
	        switch (_context9.prev = _context9.next) {
	          case 0:
	            _context9.next = 2;
	            return (0, _utils.waitConfig)({ nocompat: true });
	
	          case 2:
	            config = _context9.sent;
	            _context9.next = 5;
	            return (0, _utils.doFetchJSON)(config, 'GET', '/files/metadata?Path=' + encodeURIComponent(path));
	
	          case 5:
	            res = _context9.sent;
	
	            res.isDir = isDir(res);
	            return _context9.abrupt('return', res);
	
	          case 8:
	          case 'end':
	            return _context9.stop();
	        }
	      }
	    }, _callee9, this);
	  }));
	
	  return function statByPath(_x18) {
	    return _ref12.apply(this, arguments);
	  };
	}();
	
	var downloadById = exports.downloadById = function () {
	  var _ref13 = _asyncToGenerator(regeneratorRuntime.mark(function _callee10(id) {
	    var config;
	    return regeneratorRuntime.wrap(function _callee10$(_context10) {
	      while (1) {
	        switch (_context10.prev = _context10.next) {
	          case 0:
	            _context10.next = 2;
	            return (0, _utils.waitConfig)({ nocompat: true });
	
	          case 2:
	            config = _context10.sent;
	            return _context10.abrupt('return', (0, _utils.doFetch)(config, 'GET', '/files/download/' + encodeURIComponent(id)));
	
	          case 4:
	          case 'end':
	            return _context10.stop();
	        }
	      }
	    }, _callee10, this);
	  }));
	
	  return function downloadById(_x19) {
	    return _ref13.apply(this, arguments);
	  };
	}();
	
	var downloadByPath = exports.downloadByPath = function () {
	  var _ref14 = _asyncToGenerator(regeneratorRuntime.mark(function _callee11(path) {
	    var config;
	    return regeneratorRuntime.wrap(function _callee11$(_context11) {
	      while (1) {
	        switch (_context11.prev = _context11.next) {
	          case 0:
	            _context11.next = 2;
	            return (0, _utils.waitConfig)({ nocompat: true });
	
	          case 2:
	            config = _context11.sent;
	            return _context11.abrupt('return', (0, _utils.doFetch)(config, 'GET', '/files/download?Path=' + encodeURIComponent(path)));
	
	          case 4:
	          case 'end':
	            return _context11.stop();
	        }
	      }
	    }, _callee11, this);
	  }));
	
	  return function downloadByPath(_x20) {
	    return _ref14.apply(this, arguments);
	  };
	}();
	
	var _utils = __webpack_require__(5);
	
	var _jsonapi = __webpack_require__(6);
	
	var _jsonapi2 = _interopRequireDefault(_jsonapi);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* global fetch Blob File */
	
	
	var contentTypeOctetStream = 'application/octet-stream';
	
	function isDir(obj) {
	  return obj.attributes.type === 'directory';
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var getV3Token = function () {
	  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            return _context.abrupt('return', { appName: 'noauth', token: 'irrelevant' });
	
	          case 1:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }));
	
	  return function getV3Token() {
	    return _ref.apply(this, arguments);
	  };
	}();
	
	var isV2 = function () {
	  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(opts) {
	    var response, status;
	    return regeneratorRuntime.wrap(function _callee2$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            _context2.next = 2;
	            return fetch((opts.target || '') + '/status/');
	
	          case 2:
	            response = _context2.sent;
	            _context2.next = 5;
	            return response.json();
	
	          case 5:
	            status = _context2.sent;
	            return _context2.abrupt('return', status.datasystem !== undefined);
	
	          case 7:
	          case 'end':
	            return _context2.stop();
	        }
	      }
	    }, _callee2, this);
	  }));
	
	  return function isV2(_x) {
	    return _ref2.apply(this, arguments);
	  };
	}();
	
	var getAuth = function () {
	  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(opts) {
	    return regeneratorRuntime.wrap(function _callee3$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	            _context3.t0 = opts.isV2;
	
	            if (_context3.t0) {
	              _context3.next = 5;
	              break;
	            }
	
	            _context3.next = 4;
	            return isV2(opts);
	
	          case 4:
	            _context3.t0 = _context3.sent;
	
	          case 5:
	            opts.isV2 = _context3.t0;
	
	            if (!opts.isV2) {
	              _context3.next = 10;
	              break;
	            }
	
	            _context3.next = 9;
	            return getV2Token(opts);
	
	          case 9:
	            return _context3.abrupt('return', _context3.sent);
	
	          case 10:
	            _context3.next = 12;
	            return getV3Token(opts);
	
	          case 12:
	            return _context3.abrupt('return', _context3.sent);
	
	          case 13:
	          case 'end':
	            return _context3.stop();
	        }
	      }
	    }, _callee3, this);
	  }));
	
	  return function getAuth(_x2) {
	    return _ref3.apply(this, arguments);
	  };
	}();
	
	var _utils = __webpack_require__(5);
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* global fetch */
	
	
	var V2TOKEN_ABORT_TIMEOUT = 3000;
	
	function getV2Token() {
	  return new Promise(function (resolve, reject) {
	    if (typeof window === 'undefined') {
	      reject(new Error('getV2Token should be used in browser'));
	    } else if (!window.parent) {
	      reject(new Error('getV2Token should be used in iframe'));
	    } else if (!window.parent.postMessage) {
	      reject(new Error('getV2Token should be used in modern browser'));
	    } else {
	      (function () {
	        var origin = window.location.origin;
	        var intent = { action: 'getToken' };
	        var timeout = null;
	        var receiver = function receiver(event) {
	          window.removeEventListener('message', receiver);
	          clearTimeout(timeout);
	          resolve({
	            appName: event.data.appName,
	            token: event.data.token
	          });
	        };
	        window.addEventListener('message', receiver, false);
	        window.parent.postMessage(intent, origin);
	        timeout = setTimeout(function () {
	          reject(new Error('No response from parent iframe after 3s'));
	        }, V2TOKEN_ABORT_TIMEOUT);
	      })();
	    }
	  });
	}
	
	exports.default = function () {
	  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(opts) {
	    return regeneratorRuntime.wrap(function _callee4$(_context4) {
	      while (1) {
	        switch (_context4.prev = _context4.next) {
	          case 0:
	            opts = opts || {};
	            _context4.t0 = opts.auth;
	
	            if (_context4.t0) {
	              _context4.next = 6;
	              break;
	            }
	
	            _context4.next = 5;
	            return getAuth(opts);
	
	          case 5:
	            _context4.t0 = _context4.sent;
	
	          case 6:
	            opts.auth = _context4.t0;
	            return _context4.abrupt('return', (0, _utils.configure)(opts));
	
	          case 8:
	          case 'end':
	            return _context4.stop();
	        }
	      }
	    }, _callee4, this);
	  }));
	
	  return function (_x3) {
	    return _ref4.apply(this, arguments);
	  };
	}();

/***/ }
/******/ ])
});
;
//# sourceMappingURL=cozy-client.js.map