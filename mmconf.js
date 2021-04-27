/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/cross-fetch/dist/browser-ponyfill.js":
/*!***********************************************************!*\
  !*** ./node_modules/cross-fetch/dist/browser-ponyfill.js ***!
  \***********************************************************/
/***/ (function(module, exports) {

var __self__ = (function (root) {
function F() {
this.fetch = false;
this.DOMException = root.DOMException
}
F.prototype = root;
return new F();
})(typeof self !== 'undefined' ? self : this);
(function(self) {

var irrelevant = (function (exports) {
  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob:
      'FileReader' in self &&
      'Blob' in self &&
      (function() {
        try {
          new Blob();
          return true
        } catch (e) {
          return false
        }
      })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  function isDataView(obj) {
    return obj && DataView.prototype.isPrototypeOf(obj)
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
    ];

    var isArrayBufferView =
      ArrayBuffer.isView ||
      function(obj) {
        return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
      };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift();
        return {done: value === undefined, value: value}
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      };
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue + ', ' + value : value;
  };

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function(name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null
  };

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  };

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };

  Headers.prototype.keys = function() {
    var items = [];
    this.forEach(function(value, name) {
      items.push(name);
    });
    return iteratorFor(items)
  };

  Headers.prototype.values = function() {
    var items = [];
    this.forEach(function(value) {
      items.push(value);
    });
    return iteratorFor(items)
  };

  Headers.prototype.entries = function() {
    var items = [];
    this.forEach(function(value, name) {
      items.push([name, value]);
    });
    return iteratorFor(items)
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.onerror = function() {
        reject(reader.error);
      };
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function(body) {
      this._bodyInit = body;
      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        this._bodyText = body = Object.prototype.toString.call(body);
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this);
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
      };

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      };
    }

    this.text = function() {
      var rejected = consumed(this);
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
    };

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      };
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    };

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      this.signal = input.signal;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || 'same-origin';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.signal = options.signal || this.signal;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body);
  }

  Request.prototype.clone = function() {
    return new Request(this, {body: this._bodyInit})
  };

  function decode(body) {
    var form = new FormData();
    body
      .trim()
      .split('&')
      .forEach(function(bytes) {
        if (bytes) {
          var split = bytes.split('=');
          var name = split.shift().replace(/\+/g, ' ');
          var value = split.join('=').replace(/\+/g, ' ');
          form.append(decodeURIComponent(name), decodeURIComponent(value));
        }
      });
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
    preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = options.status === undefined ? 200 : options.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = 'statusText' in options ? options.statusText : 'OK';
    this.headers = new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  };

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''});
    response.type = 'error';
    return response
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  };

  exports.DOMException = self.DOMException;
  try {
    new exports.DOMException();
  } catch (err) {
    exports.DOMException = function(message, name) {
      this.message = message;
      this.name = name;
      var error = Error(message);
      this.stack = error.stack;
    };
    exports.DOMException.prototype = Object.create(Error.prototype);
    exports.DOMException.prototype.constructor = exports.DOMException;
  }

  function fetch(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init);

      if (request.signal && request.signal.aborted) {
        return reject(new exports.DOMException('Aborted', 'AbortError'))
      }

      var xhr = new XMLHttpRequest();

      function abortXhr() {
        xhr.abort();
      }

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.onabort = function() {
        reject(new exports.DOMException('Aborted', 'AbortError'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value);
      });

      if (request.signal) {
        request.signal.addEventListener('abort', abortXhr);

        xhr.onreadystatechange = function() {
          // DONE (success or failure)
          if (xhr.readyState === 4) {
            request.signal.removeEventListener('abort', abortXhr);
          }
        };
      }

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    })
  }

  fetch.polyfill = true;

  if (!self.fetch) {
    self.fetch = fetch;
    self.Headers = Headers;
    self.Request = Request;
    self.Response = Response;
  }

  exports.Headers = Headers;
  exports.Request = Request;
  exports.Response = Response;
  exports.fetch = fetch;

  return exports;

}({}));
})(__self__);
delete __self__.fetch.polyfill
exports = __self__.fetch // To enable: import fetch from 'cross-fetch'
exports.default = __self__.fetch // For TypeScript consumers without esModuleInterop.
exports.fetch = __self__.fetch // To enable: import {fetch} from 'cross-fetch'
exports.Headers = __self__.Headers
exports.Request = __self__.Request
exports.Response = __self__.Response
module.exports = exports


/***/ }),

/***/ "./medme/env.ts":
/*!**********************!*\
  !*** ./medme/env.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.REQUEST_DEBUG = exports.APIKEY = exports.CONFERENCE_WS_ENDPOINT = exports.CONFERENCE_ENDPOINT = void 0;
exports.CONFERENCE_ENDPOINT = "http://localhost:3000/meets/v1";
exports.CONFERENCE_WS_ENDPOINT = "ws://localhost:3333";
exports.APIKEY = "dfghdshrqweo5y23984wdrty5e3w4q";
exports.REQUEST_DEBUG = true;


/***/ }),

/***/ "./medme/lib/httpRequest.ts":
/*!**********************************!*\
  !*** ./medme/lib/httpRequest.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.httpAPIRequest_ = exports.httpAPIRequest = exports.HttpMethodsAPIMap = exports.HttpMethodsForAPIEnum = exports.APIError = void 0;
///<reference path="../../node_modules/cross-fetch/index.d.ts" />
///<amd-module path="../../node_modules/cross-fetch/
var cross_fetch_1 = __webpack_require__(/*! cross-fetch */ "./node_modules/cross-fetch/dist/browser-ponyfill.js");
var statuses_1 = __webpack_require__(/*! ./statuses */ "./medme/lib/statuses.ts");
var env_1 = __webpack_require__(/*! ../env */ "./medme/env.ts");
/**
 * Класс ошибки от API.
 */
var APIError = /** @class */ (function (_super) {
    __extends(APIError, _super);
    function APIError(message, apiRes) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, APIError.prototype);
        _this.name = "APIError";
        _this.apiResponse = apiRes;
        return _this;
    }
    Object.defineProperty(APIError.prototype, "response", {
        get: function () {
            return this.apiResponse;
        },
        enumerable: false,
        configurable: true
    });
    return APIError;
}(Error));
exports.APIError = APIError;
/**
 * Обработка ошибки HTTP запроса.
 * Для ошибки API выделены HTTP кода 4**. Если приходит такой код, то
 * пытаемся преобразовать к типу ошибки API. Иначе вызываем исключение Error с текстом ошибки.
 * @param res
 * @param text
 */
var handleAPIError = function (res, text) {
    if (res.status >= 300) {
        var json = void 0;
        try {
            json = JSON.parse(text);
        }
        catch (parseErr) {
            json = undefined;
        }
        if (json && json.status)
            throw new APIError("API respond an error with " + res.status + " HTTP status code and text " + text, json);
        else
            throw new Error("API respond an error with " + res.status + " HTTP status code and text " + text);
    }
};
var HttpMethodsForAPIEnum;
(function (HttpMethodsForAPIEnum) {
    HttpMethodsForAPIEnum["Get"] = "GET";
    HttpMethodsForAPIEnum["Post"] = "POST";
})(HttpMethodsForAPIEnum = exports.HttpMethodsForAPIEnum || (exports.HttpMethodsForAPIEnum = {}));
exports.HttpMethodsAPIMap = {
    'exchange': HttpMethodsForAPIEnum.Post,
    'info': HttpMethodsForAPIEnum.Get,
    'create': HttpMethodsForAPIEnum.Post,
    'open_for_join': HttpMethodsForAPIEnum.Post,
    'join': HttpMethodsForAPIEnum.Post,
    'leave': HttpMethodsForAPIEnum.Post,
    'finish': HttpMethodsForAPIEnum.Post,
    'cancel': HttpMethodsForAPIEnum.Post,
    'pause': HttpMethodsForAPIEnum.Post,
    'resume': HttpMethodsForAPIEnum.Post,
    'restore_terminated_fast': HttpMethodsForAPIEnum.Post,
    'durations': HttpMethodsForAPIEnum.Post
};
function httpAPIRequest(method, params) {
    return __awaiter(this, void 0, void 0, function () {
        var thisIsCorrect, httpMethod;
        return __generator(this, function (_a) {
            thisIsCorrect = this && typeof this.baseUrl === 'string' && typeof this.httpMethod === 'object';
            if (!thisIsCorrect)
                throw new TypeError('http api request should be bind to IHttpAPIRequestOwner instance [method=' +
                    method + ', params=' + JSON.stringify(params) + ']');
            httpMethod = this.httpMethod[method];
            return [2 /*return*/, httpAPIRequest_(httpMethod, this.baseUrl + '/' + method +
                    ((httpMethod === HttpMethodsForAPIEnum.Get) && params ? '?' + new URLSearchParams(params) : ''), (httpMethod === HttpMethodsForAPIEnum.Post ? params : {}))];
        });
    });
}
exports.httpAPIRequest = httpAPIRequest;
/**
 * Возвращает результат GET или POST запроса.
 * Когда возвращается HTTP код 300 и выше, вызывается исключение Error или APIError.
 * @param httpMethod
 * @param endpoint
 * @param params
 */
function httpAPIRequest_(httpMethod, endpoint, params) {
    return __awaiter(this, void 0, void 0, function () {
        var opts, jsonRequest, res, text, apiRes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    opts = {
                        method: httpMethod.toUpperCase(),
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: undefined
                    };
                    env_1.REQUEST_DEBUG && console.debug('<-- [' + new Date().toISOString() + '] ' + endpoint);
                    if (httpMethod === 'POST') {
                        jsonRequest = JSON.stringify(params);
                        env_1.REQUEST_DEBUG && console.debug('    ' + jsonRequest);
                        opts.body = jsonRequest;
                    }
                    return [4 /*yield*/, cross_fetch_1.fetch(endpoint, opts)];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.text()];
                case 2:
                    text = _a.sent();
                    env_1.REQUEST_DEBUG && console.debug('--> [' + new Date().toISOString() + '] ' + res.status);
                    env_1.REQUEST_DEBUG && console.debug('    ' + text);
                    handleAPIError(res, text);
                    apiRes = JSON.parse(text);
                    if (apiRes.status !== statuses_1.SuccessStatus)
                        throw new APIError("APIError with 2** HTTP status code and text " + text, apiRes);
                    return [2 /*return*/, apiRes];
            }
        });
    });
}
exports.httpAPIRequest_ = httpAPIRequest_;


/***/ }),

/***/ "./medme/lib/index.ts":
/*!****************************!*\
  !*** ./medme/lib/index.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

/*
 MedMe Audio/Video Conference API SDK
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConferenceAccessAPI = exports.RestoreFastDelayMinutes = exports.ConferenceModifyAPI = void 0;
var httpRequest_1 = __webpack_require__(/*! ./httpRequest */ "./medme/lib/httpRequest.ts");
var time_1 = __webpack_require__(/*! ./time */ "./medme/lib/time.ts");
/**
 * Содержит запросы на создание и изменение конференций.
 */
var ConferenceModifyAPI = /** @class */ (function () {
    function ConferenceModifyAPI(apiRequest) {
        this.apiRequest = apiRequest;
    }
    /**
     * Возвращает объект ConferenceModifyAPI, инициализированный функцией запроса к HTTP API.
     * @param baseUrl
     */
    ConferenceModifyAPI.createHttpAPI = function (baseUrl) {
        var reqOwner = {
            baseUrl: baseUrl,
            httpMethod: httpRequest_1.HttpMethodsAPIMap
        };
        return new ConferenceModifyAPI(httpRequest_1.httpAPIRequest.bind(reqOwner));
    };
    /**
     * Запрос на создание конференции.
     * @param apiKey
     * @param userId
     * @param userRole
     * @param conferenceInfo
     */
    ConferenceModifyAPI.prototype.create = function (apiKey, userId, userRole, conferenceInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {
                    api_key: apiKey,
                    user_id: userId,
                    user_role: userRole,
                    conference_info: conferenceInfo
                };
                return [2 /*return*/, this.apiRequest('create', params)];
            });
        });
    };
    ConferenceModifyAPI.prototype.move = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    ConferenceModifyAPI.prototype.resize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    ConferenceModifyAPI.prototype.updateInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return ConferenceModifyAPI;
}());
exports.ConferenceModifyAPI = ConferenceModifyAPI;
exports.RestoreFastDelayMinutes = 3;
/**
 * Содержит запросы на получение данных по конференции, а также на управлением статусом и
 * работой конференции.
 */
var ConferenceAccessAPI = /** @class */ (function () {
    function ConferenceAccessAPI(apiRequest) {
        this.apiRequest = apiRequest;
    }
    /**
     * Возвращает объект ConferenceAccessAPI, инициализированный функцией запроса к HTTP API.
     * @param baseUrl
     */
    ConferenceAccessAPI.createHttpAPI = function (baseUrl) {
        var reqOwner = {
            baseUrl: baseUrl,
            httpMethod: httpRequest_1.HttpMethodsAPIMap
        };
        return new ConferenceAccessAPI(httpRequest_1.httpAPIRequest.bind(reqOwner));
    };
    /**
     * Возвращает ключ конференции по ключу доступа
     * @param accessToken
     */
    ConferenceAccessAPI.prototype.exchange = function (accessToken) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiRequest('exchange', { access_token: accessToken })];
            });
        });
    };
    ConferenceAccessAPI.prototype.otpSend = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    ConferenceAccessAPI.prototype.otpVerify = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    /**
     * Получение информации по конференции.
     * @param accessToken
     */
    ConferenceAccessAPI.prototype.getConferenceInfo = function (accessToken) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiRequest('info', { access_token: accessToken })];
            });
        });
    };
    /**
     * Запрос на открытие конференции.
     * @param accessToken
     */
    ConferenceAccessAPI.prototype.openForJoin = function (accessToken) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiRequest('open_for_join', {
                        access_token: accessToken
                    })];
            });
        });
    };
    /**
     * Запрос на присоединение к конференции.
     * @param accessToken
     */
    ConferenceAccessAPI.prototype.join = function (accessToken) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiRequest('join', {
                        access_token: accessToken
                    })];
            });
        });
    };
    /**
     * Запрос на отсоединение от конференции.
     * @param accessToken
     */
    ConferenceAccessAPI.prototype.leave = function (accessToken) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiRequest('leave', {
                        access_token: accessToken
                    })];
            });
        });
    };
    /**
     * Запрос на завершение конференции.
     * @param accessToken
     */
    ConferenceAccessAPI.prototype.finish = function (accessToken) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiRequest('finish', {
                        access_token: accessToken
                    })];
            });
        });
    };
    /**
     * Запрос на отмену конференции.
     * @param accessToken
     */
    ConferenceAccessAPI.prototype.cancel = function (accessToken) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiRequest('cancel', {
                        access_token: accessToken
                    })];
            });
        });
    };
    /**
     * Запрос на остановку конференции.
     * @param accessToken
     */
    ConferenceAccessAPI.prototype.pause = function (accessToken) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiRequest('pause', {
                        access_token: accessToken
                    })];
            });
        });
    };
    /**
     * Запрос на возобновление конференции.
     * @param accessToken
     */
    ConferenceAccessAPI.prototype.resume = function (accessToken) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiRequest('resume', {
                        access_token: accessToken
                    })];
            });
        });
    };
    ConferenceAccessAPI.prototype.restoreTerminatedFast = function (accessToken) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiRequest('restore_terminated_fast', {
                        access_token: accessToken
                    })];
            });
        });
    };
    ConferenceAccessAPI.prototype.canRestore = function (conf) {
        if (conf.cancelledByExternal)
            return false;
        var delayMs = Date.now() - Date.parse(conf.finishedAt);
        return delayMs <= exports.RestoreFastDelayMinutes * time_1.TimeMs.Minute;
    };
    ConferenceAccessAPI.prototype.durations = function (accessToken) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apiRequest('durations', {
                        access_token: accessToken
                    })];
            });
        });
    };
    return ConferenceAccessAPI;
}());
exports.ConferenceAccessAPI = ConferenceAccessAPI;


/***/ }),

/***/ "./medme/lib/sock.ts":
/*!***************************!*\
  !*** ./medme/lib/sock.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConferenceSock = void 0;
var ConferenceSock = /** @class */ (function () {
    function ConferenceSock(wsUri) {
        this.wsUri = wsUri;
    }
    ConferenceSock.prototype.write_ = function (msg) {
        console.info('[%s] ConferenceWS', (new Date).toISOString(), this.at_, msg);
    };
    ConferenceSock.prototype.onOpen_ = function () {
        this.write_("CONNECTED");
        this.doSend_(JSON.stringify({
            path: 'handshake',
            at: this.at_
        }));
    };
    ConferenceSock.prototype.onMessage_ = function (msg) {
        this.write_("RECEIVE: " + msg.data);
        var json = JSON.parse(msg.data);
        if (json.path === 'change_status_callback')
            this.changeConferenceStatusCallback_.call(this, json.newStatus);
        if (json.path === 'change_conf_info_callback')
            this.changeConferenceInfoCallback_.call(this);
    };
    ConferenceSock.prototype.onClose_ = function (evt) {
        this.write_("CLOSED: " + evt.code + " " + evt.reason);
    };
    ConferenceSock.prototype.onError_ = function (err) {
        this.write_("ERROR: " + (err.message || err));
    };
    ConferenceSock.prototype.doSend_ = function (message) {
        this.write_("SENT: " + message);
        this.ws_.send(message);
    };
    ConferenceSock.prototype.accessToken = function (at) {
        this.at_ = at;
        return this;
    };
    ConferenceSock.prototype.connect = function (at) {
        this.ws_ = new WebSocket(this.wsUri);
        this.at_ = at;
        this.ws_.onopen = this.onOpen_.bind(this);
        this.ws_.onmessage = this.onMessage_.bind(this);
        this.ws_.onclose = this.onClose_.bind(this);
        this.ws_.onerror = this.onError_.bind(this);
    };
    ConferenceSock.prototype.changeConferenceStatus = function (newStatus) {
        this.doSend_(JSON.stringify({
            path: 'change_status',
            at: this.at_,
            newStatus: newStatus
        }));
    };
    ConferenceSock.prototype.changeConferenceStatusCallback = function (cb) {
        this.changeConferenceStatusCallback_ = cb;
        return this;
    };
    ConferenceSock.prototype.changeConferenceInfoCallback = function (cb) {
        this.changeConferenceInfoCallback_ = cb;
        return this;
    };
    return ConferenceSock;
}());
exports.ConferenceSock = ConferenceSock;


/***/ }),

/***/ "./medme/lib/statuses.ts":
/*!*******************************!*\
  !*** ./medme/lib/statuses.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ErrorStatuses = exports.SuccessStatusEnum = exports.SuccessStatus = void 0;
/**
 * Успешный статус запроса к API.
 */
exports.SuccessStatus = 'OK';
var SuccessStatusEnum;
(function (SuccessStatusEnum) {
    SuccessStatusEnum["SuccessStatus"] = "OK";
})(SuccessStatusEnum = exports.SuccessStatusEnum || (exports.SuccessStatusEnum = {}));
/**
 * Статус ошибки запроса к API.
 */
var ErrorStatuses;
(function (ErrorStatuses) {
    ErrorStatuses["UnknownError"] = "UNKNOWN_ERROR";
    ErrorStatuses["Unauthorized"] = "UNAUTHORIZED";
    ErrorStatuses["ValidationError"] = "VALIDATION_ERROR";
    ErrorStatuses["ExpiredToken"] = "EXPIRED_TOKEN";
    ErrorStatuses["AccessTokenNotFound"] = "ACCESS_TOKEN_NOT_FOUND";
    ErrorStatuses["ExpectRequestFields"] = "EXPECT_REQUEST_FIELDS";
    ErrorStatuses["OtpExpect"] = "OTP_EXPECT";
    ErrorStatuses["OtpWrongCode"] = "OTP_WRONG_CODE";
    ErrorStatuses["ExpectAccessToken"] = "EXPECT_ACCESS_TOKEN";
    ErrorStatuses["ExpectConferenceToken"] = "EXPECT_CONFERENCE_TOKEN";
    ErrorStatuses["ConferenceIsNotReadyForStart"] = "CONFERENCE_IS_NOT_READY_FOR_START";
    ErrorStatuses["ConferenceCannotJoin"] = "CONFERENCE_CANNOT_JOIN";
    ErrorStatuses["ClientAlreadyJoined"] = "CLIENT_ALREADY_JOINED";
    ErrorStatuses["ClientShouldBeJoined"] = "CLIENT_SHOULD_BE_JOINED";
    ErrorStatuses["SpecialistShouldBeJoined"] = "SPECIALIST_SHOULD_BE_JOINED";
    ErrorStatuses["ConferenceWrongSpecialist"] = "CONFERENCE_WRONG_SPECIALIST";
    ErrorStatuses["ConferenceWrongClient"] = "CONFERENCE_WRONG_CLIENT";
    ErrorStatuses["ConferenceCannotBeStarted"] = "CONFERENCE_CANNOT_BE_STARTED";
    ErrorStatuses["ConferenceCannotBeCancelled"] = "CONFERENCE_CANNOT_BE_CANCELLED";
    ErrorStatuses["ConferenceCannotBeFinished"] = "CONFERENCE_CANNOT_BE_FINISHED";
    ErrorStatuses["ConferenceCannotBeOpenedForJoin"] = "CONFERENCE_CANNOT_BE_OPENED_FOR_JOIN";
    ErrorStatuses["ConferenceCannotBeEdited"] = "CONFERENCE_CANNOT_BE_EDITED";
    ErrorStatuses["UserShouldBeInConference"] = "USER_SHOULD_BE_IN_CONFERENCE";
    ErrorStatuses["ConferenceWrongStatusChange"] = "CONFERENCE_WRONG_STATUS_CHANGE";
    ErrorStatuses["RestoreFastTimedOut"] = "RESTORE_FAST_TIMED_OUT";
})(ErrorStatuses = exports.ErrorStatuses || (exports.ErrorStatuses = {}));


/***/ }),

/***/ "./medme/lib/time.ts":
/*!***************************!*\
  !*** ./medme/lib/time.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TimeMs = void 0;
var MinuteMs = 60 * 1000;
var TimeMs = /** @class */ (function () {
    function TimeMs() {
    }
    TimeMs.Minute = MinuteMs;
    TimeMs.Hour = 60 * TimeMs.Minute;
    TimeMs.Day = 24 * TimeMs.Hour;
    TimeMs.Week = 24 * TimeMs.Day;
    return TimeMs;
}());
exports.TimeMs = TimeMs;


/***/ }),

/***/ "./medme/lib/types/conference.ts":
/*!***************************************!*\
  !*** ./medme/lib/types/conference.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConferenceStatusesEnum = exports.ConferenceRolesEnum = exports.LanguageListEnum = exports.AppointmentEnginesEnum = void 0;
/**
 *
 */
var AppointmentEnginesEnum;
(function (AppointmentEnginesEnum) {
    AppointmentEnginesEnum["GBooking"] = "GBooking";
})(AppointmentEnginesEnum = exports.AppointmentEnginesEnum || (exports.AppointmentEnginesEnum = {}));
/**
 *
 */
var LanguageListEnum;
(function (LanguageListEnum) {
    LanguageListEnum["EN_US"] = "en-us";
    LanguageListEnum["RU_RU"] = "ru-ru";
    LanguageListEnum["HE_IL"] = "he-il";
    LanguageListEnum["FR_FR"] = "fr-fr";
    LanguageListEnum["HU_HU"] = "hu-hu";
    LanguageListEnum["EE_EE"] = "ee-ee";
    LanguageListEnum["LV_LV"] = "lv-lv";
    LanguageListEnum["LT_LT"] = "lt-lt";
    LanguageListEnum["DE_DE"] = "de-de";
    LanguageListEnum["ZH_CH"] = "zh-cn";
    LanguageListEnum["FI_FI"] = "fi-fi";
    LanguageListEnum["AM_AM"] = "am-am";
    LanguageListEnum["ES_ES"] = "es-es";
    LanguageListEnum["GE_GE"] = "ge-ge";
    LanguageListEnum["UZ_UZ"] = "uz-uz";
    LanguageListEnum["AR_PS"] = "ar-ps";
})(LanguageListEnum = exports.LanguageListEnum || (exports.LanguageListEnum = {}));
/**
 *
 */
var ConferenceRolesEnum;
(function (ConferenceRolesEnum) {
    ConferenceRolesEnum["Client"] = "CLIENT";
    ConferenceRolesEnum["Specialist"] = "SPECIALIST";
})(ConferenceRolesEnum = exports.ConferenceRolesEnum || (exports.ConferenceRolesEnum = {}));
/**
 *
 */
var ConferenceStatusesEnum;
(function (ConferenceStatusesEnum) {
    ConferenceStatusesEnum["Pending"] = "pending";
    ConferenceStatusesEnum["OpenForJoining"] = "open_for_joining";
    ConferenceStatusesEnum["Started"] = "started";
    ConferenceStatusesEnum["StartedAndWaiting"] = "started_and_waiting";
    ConferenceStatusesEnum["StartedAndPaused"] = "started_and_paused";
    ConferenceStatusesEnum["CancelledBeforeStart"] = "cancelled_before_start";
    ConferenceStatusesEnum["CancelledAfterStart"] = "cancelled_after_start";
    ConferenceStatusesEnum["Finished"] = "finished"; // завершена
})(ConferenceStatusesEnum = exports.ConferenceStatusesEnum || (exports.ConferenceStatusesEnum = {}));


/***/ }),

/***/ "./medme/lib/types/index.ts":
/*!**********************************!*\
  !*** ./medme/lib/types/index.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.conference = void 0;
var conference = __webpack_require__(/*! ./conference */ "./medme/lib/types/conference.ts");
exports.conference = conference;


/***/ }),

/***/ "./medme/lib/ux.ts":
/*!*************************!*\
  !*** ./medme/lib/ux.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

/*
MedMe Conference UX logic
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.timer = exports.createScreen = exports._make4xxScreen = exports.createSpecialistHelpBlock = exports.createLanguagesBlock = exports.ScreenEnum = exports.createConferenceInfoBlock = exports.BlockEnum = void 0;
var conference_1 = __webpack_require__(/*! ./types/conference */ "./medme/lib/types/conference.ts");
var httpRequest_1 = __webpack_require__(/*! ./httpRequest */ "./medme/lib/httpRequest.ts");
var statuses_1 = __webpack_require__(/*! ./statuses */ "./medme/lib/statuses.ts");
/**
 * Блоки интерфейса.
 */
var BlockEnum;
(function (BlockEnum) {
    // панель для переключения языков
    BlockEnum["Languages"] = "langs";
    // информация по конференции
    BlockEnum["ConferenceInfo"] = "conference-info";
    // UI клиент Jitsi Meet
    BlockEnum["JitsiMeet"] = "jitsi-meet";
    // Инструкция для специалиста
    BlockEnum["SpecialistHelp"] = "specialist-help";
})(BlockEnum = exports.BlockEnum || (exports.BlockEnum = {}));
/**
 * Создает и возвращает блок с информацией о приёме исходя из данных из API, переданных в качестве параметров.
 * @param userRole
 * @param confInfo
 */
function createConferenceInfoBlock(userRole, confInfo) {
    return {
        userRole: userRole,
        finishPauseControl: userRole === conference_1.ConferenceRolesEnum.Specialist &&
            confInfo.status === conference_1.ConferenceStatusesEnum.Started,
        leaveClientControl: userRole === conference_1.ConferenceRolesEnum.Client &&
            (confInfo.status === conference_1.ConferenceStatusesEnum.Started ||
                confInfo.status === conference_1.ConferenceStatusesEnum.StartedAndWaiting ||
                confInfo.status === conference_1.ConferenceStatusesEnum.StartedAndPaused),
        showRealTimes: (
        // confInfo.status === ConferenceStatusesEnum.CancelledAfterStart ||
        // confInfo.status === ConferenceStatusesEnum.CancelledBeforeStart ||
        confInfo.status === conference_1.ConferenceStatusesEnum.Finished),
        conference: confInfo
    };
}
exports.createConferenceInfoBlock = createConferenceInfoBlock;
/*
 * Страницы интерфейса
 */
var ScreenEnum;
(function (ScreenEnum) {
    // Ошибка "конференция не найдена"
    ScreenEnum["_4xx"] = "4xx";
    // Ожидание начала приёма клиентом
    ScreenEnum["PendingClient"] = "pending-client";
    // Ожидание начала приёма специалистом
    ScreenEnum["PendingSpecialist"] = "pending-specialist";
    // Страница присоединения конференции клиентом
    ScreenEnum["JoinClient"] = "join-client";
    // Страница присоединения конференции специалистом
    ScreenEnum["JoinSpecialist"] = "join-specialist";
    // Конференция отменена до начала приёма
    ScreenEnum["Cancelled"] = "cancelled";
    // Конференция завершена
    ScreenEnum["Finish"] = "finish";
    // Конференция в процессе
    ScreenEnum["Started"] = "started";
})(ScreenEnum = exports.ScreenEnum || (exports.ScreenEnum = {}));
// TODO Load languages from conference info
function createLanguagesBlock() {
    return {
        type: BlockEnum.Languages,
        currentLanguage: conference_1.LanguageListEnum.RU_RU,
        availableLanguages: [conference_1.LanguageListEnum.RU_RU, conference_1.LanguageListEnum.EN_US]
    };
}
exports.createLanguagesBlock = createLanguagesBlock;
function createSpecialistHelpBlock(userRole) {
    return {
        type: BlockEnum.SpecialistHelp,
        userRole: userRole
    };
}
exports.createSpecialistHelpBlock = createSpecialistHelpBlock;
function _make4xxScreen(status) {
    console.assert(status === 401 || status === 404);
    return {
        name: ScreenEnum._4xx,
        availableBlocks: [BlockEnum.Languages],
        langBlock: createLanguagesBlock(),
        status: status
    };
}
exports._make4xxScreen = _make4xxScreen;
/**
 * Создаёт объект класса UX, поместив туда данные, полученные из API.
 * @param api
 * @param at
 */
function createScreen(api, at) {
    return __awaiter(this, void 0, void 0, function () {
        var exchangeRes, confRes, durations, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!at)
                        return [2 /*return*/, _make4xxScreen(404)];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, api.exchange(at)];
                case 2:
                    exchangeRes = _a.sent();
                    return [4 /*yield*/, api.getConferenceInfo(at)];
                case 3:
                    confRes = _a.sent();
                    return [4 /*yield*/, api.durations(at)];
                case 4:
                    durations = _a.sent();
                    return [2 /*return*/, createConferenceScreen(api, confRes.role, confRes.conference_info, at, exchangeRes.conference_token, confRes.user_id, durations)];
                case 5:
                    err_1 = _a.sent();
                    if (err_1 instanceof httpRequest_1.APIError &&
                        [
                            statuses_1.ErrorStatuses.Unauthorized,
                            statuses_1.ErrorStatuses.ExpiredToken,
                            statuses_1.ErrorStatuses.ExpectConferenceToken,
                        ].indexOf(err_1.response.status) >= 0)
                        return [2 /*return*/, _make4xxScreen(401)];
                    if (err_1 instanceof httpRequest_1.APIError &&
                        [
                            statuses_1.ErrorStatuses.AccessTokenNotFound,
                            statuses_1.ErrorStatuses.ExpectAccessToken,
                        ].indexOf(err_1.response.status) >= 0)
                        return [2 /*return*/, _make4xxScreen(404)];
                    throw err_1;
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.createScreen = createScreen;
/**
 * Вернуть текущую страницу конференции в зависимости от статуса конференции и роли пользователя
 */
function createConferenceScreen(api, userRole, confInfo, at, confToken, userId, durations) {
    if (userRole === conference_1.ConferenceRolesEnum.Client &&
        confInfo.status === conference_1.ConferenceStatusesEnum.Pending)
        return {
            name: ScreenEnum.PendingClient,
            availableBlocks: [BlockEnum.ConferenceInfo],
            userRole: conference_1.ConferenceRolesEnum.Client,
            conference: confInfo,
            confInfoBlock: createConferenceInfoBlock(userRole, confInfo)
        };
    if (userRole === conference_1.ConferenceRolesEnum.Specialist &&
        confInfo.status === conference_1.ConferenceStatusesEnum.Pending)
        return {
            name: ScreenEnum.PendingSpecialist,
            availableBlocks: [],
            userRole: conference_1.ConferenceRolesEnum.Specialist,
            conference: confInfo,
            confInfoBlock: createConferenceInfoBlock(userRole, confInfo),
        };
    if (userRole === conference_1.ConferenceRolesEnum.Client && (confInfo.status === conference_1.ConferenceStatusesEnum.OpenForJoining ||
        [
            conference_1.ConferenceStatusesEnum.Started,
            conference_1.ConferenceStatusesEnum.StartedAndPaused,
            conference_1.ConferenceStatusesEnum.StartedAndWaiting
        ].indexOf(confInfo.status) >= 0 && !confInfo.joinedClients.find(function (item) { return item.id === userId; })))
        return {
            name: ScreenEnum.JoinClient,
            availableBlocks: [],
            userRole: conference_1.ConferenceRolesEnum.Client,
            conference: confInfo,
            confInfoBlock: createConferenceInfoBlock(userRole, confInfo),
        };
    if (userRole === conference_1.ConferenceRolesEnum.Specialist && (confInfo.status === conference_1.ConferenceStatusesEnum.OpenForJoining ||
        [
            conference_1.ConferenceStatusesEnum.Started,
            conference_1.ConferenceStatusesEnum.StartedAndPaused,
            conference_1.ConferenceStatusesEnum.StartedAndWaiting
        ].indexOf(confInfo.status) >= 0 && !confInfo.joinedSpecialists.find(function (item) { return item.id === userId; })))
        return {
            name: ScreenEnum.JoinSpecialist,
            availableBlocks: [],
            userRole: conference_1.ConferenceRolesEnum.Specialist,
            conference: confInfo,
            confInfoBlock: createConferenceInfoBlock(userRole, confInfo),
        };
    if (confInfo.status === conference_1.ConferenceStatusesEnum.CancelledBeforeStart)
        return {
            name: ScreenEnum.Cancelled,
            availableBlocks: [],
            userRole: userRole,
            conference: confInfo,
            confInfoBlock: createConferenceInfoBlock(userRole, confInfo),
            showClientHint: userRole === conference_1.ConferenceRolesEnum.Client,
            restoreControls: userRole === conference_1.ConferenceRolesEnum.Specialist,
            canRestore: api.canRestore(confInfo),
            timerBlock: durations
        };
    if (confInfo.status === conference_1.ConferenceStatusesEnum.CancelledAfterStart ||
        confInfo.status === conference_1.ConferenceStatusesEnum.Finished)
        return {
            name: ScreenEnum.Finish,
            availableBlocks: [],
            userRole: userRole,
            conference: confInfo,
            confInfoBlock: createConferenceInfoBlock(userRole, confInfo),
            restoreControls: userRole === conference_1.ConferenceRolesEnum.Specialist,
            canRestore: api.canRestore(confInfo),
            timerBlock: durations
        };
    return {
        name: ScreenEnum.Started,
        userRole: userRole,
        availableBlocks: [BlockEnum.ConferenceInfo],
        conference: confInfo,
        userId: userId,
        conferenceToken: confToken,
        accessToken: at,
        langBlock: createLanguagesBlock(),
        confInfoBlock: createConferenceInfoBlock(userRole, confInfo),
        specialistHelpBlock: createSpecialistHelpBlock(userRole),
        jitsiMeetBlock: {
            type: BlockEnum.JitsiMeet,
            conferenceToken: confToken,
            subject: 'Первичный прием, Вт. 12 Мар. 2020, 12:45',
            displayName: 'Врач педиатр, Александр Иванович Синицын',
        },
        timerBlock: durations
    };
}
function timer(confInfo, timer) {
    var firstUpdateNowSeconds;
    var conferenceScheduledDurationSeconds;
    var netDurationSeconds;
    firstUpdateNowSeconds = Date.now() / 1000;
    conferenceScheduledDurationSeconds = confInfo.scheduledDurationSeconds;
    var delta = (Date.now() - new Date(timer.now).getTime()) / 1000;
    netDurationSeconds = timer.netDurationSeconds + delta;
    var totalRemainSeconds = 0;
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    var timerDelay = 1000;
    var updateTime = function () {
        var now = Date.now() / 1000;
        var deltaSeconds = now - firstUpdateNowSeconds;
        totalRemainSeconds = Math.max(0, conferenceScheduledDurationSeconds - deltaSeconds - netDurationSeconds);
        hours = Math.floor(totalRemainSeconds / 3600);
        var newMinutes = Math.floor(totalRemainSeconds / 60) % 60;
        // если значение минут не поменялось, то изменяем в следующий раз через 100 мс
        if (newMinutes === minutes)
            timerDelay = 100;
        else
            timerDelay = 1000;
        minutes = newMinutes;
        seconds = Math.floor(totalRemainSeconds % 60);
    };
    var _this = {
        updateTime: function () {
            updateTime();
            return _this.getCurrent();
        },
        getCurrent: function () {
            return {
                hours: hours,
                minutes: minutes,
                seconds: seconds,
                timerDelay: timerDelay,
                totalRemainSeconds: totalRemainSeconds
            };
        }
    };
    return _this;
}
exports.timer = timer;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;
/*!******************!*\
  !*** ./index.ts ***!
  \******************/

///<amd-module name="MedMe" />
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initWebSocketAPI = exports.initHttpAPI = exports.conferenceWebSocketAPI = exports.conferenceAccessAPI = exports.conferenceModifyAPI = exports.UX = exports.sock = exports.types = exports.statuses = exports.request = exports.env = exports.lib = void 0;
var lib = __webpack_require__(/*! ./medme/lib/index */ "./medme/lib/index.ts");
exports.lib = lib;
var env = __webpack_require__(/*! ./medme/env */ "./medme/env.ts");
exports.env = env;
var request = __webpack_require__(/*! ./medme/lib/httpRequest */ "./medme/lib/httpRequest.ts");
exports.request = request;
var statuses = __webpack_require__(/*! ./medme/lib/statuses */ "./medme/lib/statuses.ts");
exports.statuses = statuses;
var types = __webpack_require__(/*! ./medme/lib/types/index */ "./medme/lib/types/index.ts");
exports.types = types;
var sock = __webpack_require__(/*! ./medme/lib/sock */ "./medme/lib/sock.ts");
exports.sock = sock;
var UX = __webpack_require__(/*! ./medme/lib/ux */ "./medme/lib/ux.ts");
exports.UX = UX;
var sock_1 = __webpack_require__(/*! ./medme/lib/sock */ "./medme/lib/sock.ts");
exports.default = lib;
function initHttpAPI() {
    exports.conferenceModifyAPI = lib.ConferenceModifyAPI.createHttpAPI(env.CONFERENCE_ENDPOINT);
    exports.conferenceAccessAPI = lib.ConferenceAccessAPI.createHttpAPI(env.CONFERENCE_ENDPOINT);
}
exports.initHttpAPI = initHttpAPI;
function initWebSocketAPI() {
    exports.conferenceWebSocketAPI = new sock_1.ConferenceSock(env.CONFERENCE_WS_ENDPOINT);
}
exports.initWebSocketAPI = initWebSocketAPI;

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AbWVkbWUvbW1jb25mLXRzLXNkay8uL25vZGVfbW9kdWxlcy9jcm9zcy1mZXRjaC9kaXN0L2Jyb3dzZXItcG9ueWZpbGwuanMiLCJ3ZWJwYWNrOi8vQG1lZG1lL21tY29uZi10cy1zZGsvLi9tZWRtZS9lbnYudHMiLCJ3ZWJwYWNrOi8vQG1lZG1lL21tY29uZi10cy1zZGsvLi9tZWRtZS9saWIvaHR0cFJlcXVlc3QudHMiLCJ3ZWJwYWNrOi8vQG1lZG1lL21tY29uZi10cy1zZGsvLi9tZWRtZS9saWIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vQG1lZG1lL21tY29uZi10cy1zZGsvLi9tZWRtZS9saWIvc29jay50cyIsIndlYnBhY2s6Ly9AbWVkbWUvbW1jb25mLXRzLXNkay8uL21lZG1lL2xpYi9zdGF0dXNlcy50cyIsIndlYnBhY2s6Ly9AbWVkbWUvbW1jb25mLXRzLXNkay8uL21lZG1lL2xpYi90aW1lLnRzIiwid2VicGFjazovL0BtZWRtZS9tbWNvbmYtdHMtc2RrLy4vbWVkbWUvbGliL3R5cGVzL2NvbmZlcmVuY2UudHMiLCJ3ZWJwYWNrOi8vQG1lZG1lL21tY29uZi10cy1zZGsvLi9tZWRtZS9saWIvdHlwZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vQG1lZG1lL21tY29uZi10cy1zZGsvLi9tZWRtZS9saWIvdXgudHMiLCJ3ZWJwYWNrOi8vQG1lZG1lL21tY29uZi10cy1zZGsvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQG1lZG1lL21tY29uZi10cy1zZGsvLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLGlCQUFpQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNULDhFQUE4RTtBQUM5RTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4QkFBOEIscUJBQXFCO0FBQ25EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFlLG1CQUFPLENBQUMscURBQXNCO0FBQzdDLGdCQUFnQjtBQUNoQixZQUFZLG1CQUFPLENBQUMsMkRBQXlCO0FBQzdDLGFBQWE7QUFDYixXQUFXLG1CQUFPLENBQUMsNkNBQWtCO0FBQ3JDLFlBQVk7QUFDWixTQUFTLG1CQUFPLENBQUMseUNBQWdCO0FBQ2pDLFVBQVU7QUFDVixhQUFhLG1CQUFPLENBQUMsNkNBQWtCO0FBQ3ZDLGVBQWU7QUFDZjtBQUNBLElBQUksMkJBQTJCO0FBQy9CLElBQUksMkJBQTJCO0FBQy9CO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0EsSUFBSSw4QkFBOEI7QUFDbEM7QUFDQSx3QkFBd0IiLCJmaWxlIjoiaW5kZXguYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fc2VsZl9fID0gKGZ1bmN0aW9uIChyb290KSB7XG5mdW5jdGlvbiBGKCkge1xudGhpcy5mZXRjaCA9IGZhbHNlO1xudGhpcy5ET01FeGNlcHRpb24gPSByb290LkRPTUV4Y2VwdGlvblxufVxuRi5wcm90b3R5cGUgPSByb290O1xucmV0dXJuIG5ldyBGKCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcyk7XG4oZnVuY3Rpb24oc2VsZikge1xuXG52YXIgaXJyZWxldmFudCA9IChmdW5jdGlvbiAoZXhwb3J0cykge1xuICB2YXIgc3VwcG9ydCA9IHtcbiAgICBzZWFyY2hQYXJhbXM6ICdVUkxTZWFyY2hQYXJhbXMnIGluIHNlbGYsXG4gICAgaXRlcmFibGU6ICdTeW1ib2wnIGluIHNlbGYgJiYgJ2l0ZXJhdG9yJyBpbiBTeW1ib2wsXG4gICAgYmxvYjpcbiAgICAgICdGaWxlUmVhZGVyJyBpbiBzZWxmICYmXG4gICAgICAnQmxvYicgaW4gc2VsZiAmJlxuICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIG5ldyBCbG9iKCk7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9KSgpLFxuICAgIGZvcm1EYXRhOiAnRm9ybURhdGEnIGluIHNlbGYsXG4gICAgYXJyYXlCdWZmZXI6ICdBcnJheUJ1ZmZlcicgaW4gc2VsZlxuICB9O1xuXG4gIGZ1bmN0aW9uIGlzRGF0YVZpZXcob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBEYXRhVmlldy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihvYmopXG4gIH1cblxuICBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlcikge1xuICAgIHZhciB2aWV3Q2xhc3NlcyA9IFtcbiAgICAgICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgICAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgICAnW29iamVjdCBGbG9hdDY0QXJyYXldJ1xuICAgIF07XG5cbiAgICB2YXIgaXNBcnJheUJ1ZmZlclZpZXcgPVxuICAgICAgQXJyYXlCdWZmZXIuaXNWaWV3IHx8XG4gICAgICBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iaiAmJiB2aWV3Q2xhc3Nlcy5pbmRleE9mKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopKSA+IC0xXG4gICAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplTmFtZShuYW1lKSB7XG4gICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgbmFtZSA9IFN0cmluZyhuYW1lKTtcbiAgICB9XG4gICAgaWYgKC9bXmEtejAtOVxcLSMkJSYnKisuXl9gfH5dL2kudGVzdChuYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBjaGFyYWN0ZXIgaW4gaGVhZGVyIGZpZWxkIG5hbWUnKVxuICAgIH1cbiAgICByZXR1cm4gbmFtZS50b0xvd2VyQ2FzZSgpXG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB2YWx1ZSA9IFN0cmluZyh2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgLy8gQnVpbGQgYSBkZXN0cnVjdGl2ZSBpdGVyYXRvciBmb3IgdGhlIHZhbHVlIGxpc3RcbiAgZnVuY3Rpb24gaXRlcmF0b3JGb3IoaXRlbXMpIHtcbiAgICB2YXIgaXRlcmF0b3IgPSB7XG4gICAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gaXRlbXMuc2hpZnQoKTtcbiAgICAgICAgcmV0dXJuIHtkb25lOiB2YWx1ZSA9PT0gdW5kZWZpbmVkLCB2YWx1ZTogdmFsdWV9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gICAgICBpdGVyYXRvcltTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvclxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXRlcmF0b3JcbiAgfVxuXG4gIGZ1bmN0aW9uIEhlYWRlcnMoaGVhZGVycykge1xuICAgIHRoaXMubWFwID0ge307XG5cbiAgICBpZiAoaGVhZGVycyBpbnN0YW5jZW9mIEhlYWRlcnMpIHtcbiAgICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICB0aGlzLmFwcGVuZChuYW1lLCB2YWx1ZSk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaGVhZGVycykpIHtcbiAgICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbihoZWFkZXIpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQoaGVhZGVyWzBdLCBoZWFkZXJbMV0pO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfSBlbHNlIGlmIChoZWFkZXJzKSB7XG4gICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhoZWFkZXJzKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQobmFtZSwgaGVhZGVyc1tuYW1lXSk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9XG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgIG5hbWUgPSBub3JtYWxpemVOYW1lKG5hbWUpO1xuICAgIHZhbHVlID0gbm9ybWFsaXplVmFsdWUodmFsdWUpO1xuICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMubWFwW25hbWVdO1xuICAgIHRoaXMubWFwW25hbWVdID0gb2xkVmFsdWUgPyBvbGRWYWx1ZSArICcsICcgKyB2YWx1ZSA6IHZhbHVlO1xuICB9O1xuXG4gIEhlYWRlcnMucHJvdG90eXBlWydkZWxldGUnXSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV07XG4gIH07XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24obmFtZSkge1xuICAgIG5hbWUgPSBub3JtYWxpemVOYW1lKG5hbWUpO1xuICAgIHJldHVybiB0aGlzLmhhcyhuYW1lKSA/IHRoaXMubWFwW25hbWVdIDogbnVsbFxuICB9O1xuXG4gIEhlYWRlcnMucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAuaGFzT3duUHJvcGVydHkobm9ybWFsaXplTmFtZShuYW1lKSlcbiAgfTtcblxuICBIZWFkZXJzLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldID0gbm9ybWFsaXplVmFsdWUodmFsdWUpO1xuICB9O1xuXG4gIEhlYWRlcnMucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcy5tYXApIHtcbiAgICAgIGlmICh0aGlzLm1hcC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHRoaXMubWFwW25hbWVdLCBuYW1lLCB0aGlzKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgSGVhZGVycy5wcm90b3R5cGUua2V5cyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtcyA9IFtdO1xuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgaXRlbXMucHVzaChuYW1lKTtcbiAgICB9KTtcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH07XG5cbiAgSGVhZGVycy5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW107XG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBpdGVtcy5wdXNoKHZhbHVlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH07XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZW50cmllcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtcyA9IFtdO1xuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgaXRlbXMucHVzaChbbmFtZSwgdmFsdWVdKTtcbiAgICB9KTtcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH07XG5cbiAgaWYgKHN1cHBvcnQuaXRlcmFibGUpIHtcbiAgICBIZWFkZXJzLnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdID0gSGVhZGVycy5wcm90b3R5cGUuZW50cmllcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnN1bWVkKGJvZHkpIHtcbiAgICBpZiAoYm9keS5ib2R5VXNlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpKVxuICAgIH1cbiAgICBib2R5LmJvZHlVc2VkID0gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlc29sdmUocmVhZGVyLnJlc3VsdCk7XG4gICAgICB9O1xuICAgICAgcmVhZGVyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KHJlYWRlci5lcnJvcik7XG4gICAgICB9O1xuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiByZWFkQmxvYkFzQXJyYXlCdWZmZXIoYmxvYikge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHZhciBwcm9taXNlID0gZmlsZVJlYWRlclJlYWR5KHJlYWRlcik7XG4gICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGJsb2IpO1xuICAgIHJldHVybiBwcm9taXNlXG4gIH1cblxuICBmdW5jdGlvbiByZWFkQmxvYkFzVGV4dChibG9iKSB7XG4gICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgdmFyIHByb21pc2UgPSBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKTtcbiAgICByZWFkZXIucmVhZEFzVGV4dChibG9iKTtcbiAgICByZXR1cm4gcHJvbWlzZVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEFycmF5QnVmZmVyQXNUZXh0KGJ1Zikge1xuICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoYnVmKTtcbiAgICB2YXIgY2hhcnMgPSBuZXcgQXJyYXkodmlldy5sZW5ndGgpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2aWV3Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGFyc1tpXSA9IFN0cmluZy5mcm9tQ2hhckNvZGUodmlld1tpXSk7XG4gICAgfVxuICAgIHJldHVybiBjaGFycy5qb2luKCcnKVxuICB9XG5cbiAgZnVuY3Rpb24gYnVmZmVyQ2xvbmUoYnVmKSB7XG4gICAgaWYgKGJ1Zi5zbGljZSkge1xuICAgICAgcmV0dXJuIGJ1Zi5zbGljZSgwKVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1Zi5ieXRlTGVuZ3RoKTtcbiAgICAgIHZpZXcuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZikpO1xuICAgICAgcmV0dXJuIHZpZXcuYnVmZmVyXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gQm9keSgpIHtcbiAgICB0aGlzLmJvZHlVc2VkID0gZmFsc2U7XG5cbiAgICB0aGlzLl9pbml0Qm9keSA9IGZ1bmN0aW9uKGJvZHkpIHtcbiAgICAgIHRoaXMuX2JvZHlJbml0ID0gYm9keTtcbiAgICAgIGlmICghYm9keSkge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9ICcnO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5O1xuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmJsb2IgJiYgQmxvYi5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5QmxvYiA9IGJvZHk7XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuZm9ybURhdGEgJiYgRm9ybURhdGEucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUZvcm1EYXRhID0gYm9keTtcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5zZWFyY2hQYXJhbXMgJiYgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlUZXh0ID0gYm9keS50b1N0cmluZygpO1xuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyICYmIHN1cHBvcnQuYmxvYiAmJiBpc0RhdGFWaWV3KGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlciA9IGJ1ZmZlckNsb25lKGJvZHkuYnVmZmVyKTtcbiAgICAgICAgLy8gSUUgMTAtMTEgY2FuJ3QgaGFuZGxlIGEgRGF0YVZpZXcgYm9keS5cbiAgICAgICAgdGhpcy5fYm9keUluaXQgPSBuZXcgQmxvYihbdGhpcy5fYm9keUFycmF5QnVmZmVyXSk7XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIgJiYgKEFycmF5QnVmZmVyLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpIHx8IGlzQXJyYXlCdWZmZXJWaWV3KGJvZHkpKSkge1xuICAgICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIgPSBidWZmZXJDbG9uZShib2R5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2JvZHlUZXh0ID0gYm9keSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChib2R5KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSkge1xuICAgICAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCcpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlCbG9iICYmIHRoaXMuX2JvZHlCbG9iLnR5cGUpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCB0aGlzLl9ib2R5QmxvYi50eXBlKTtcbiAgICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9VVRGLTgnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoc3VwcG9ydC5ibG9iKSB7XG4gICAgICB0aGlzLmJsb2IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlamVjdGVkID0gY29uc3VtZWQodGhpcyk7XG4gICAgICAgIGlmIChyZWplY3RlZCkge1xuICAgICAgICAgIHJldHVybiByZWplY3RlZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2JvZHlCbG9iKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QmxvYilcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBCbG9iKFt0aGlzLl9ib2R5QXJyYXlCdWZmZXJdKSlcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgYmxvYicpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbdGhpcy5fYm9keVRleHRdKSlcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgdGhpcy5hcnJheUJ1ZmZlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5fYm9keUFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbnN1bWVkKHRoaXMpIHx8IFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuYmxvYigpLnRoZW4ocmVhZEJsb2JBc0FycmF5QnVmZmVyKVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIHRoaXMudGV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHJlamVjdGVkID0gY29uc3VtZWQodGhpcyk7XG4gICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdGVkXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICByZXR1cm4gcmVhZEJsb2JBc1RleHQodGhpcy5fYm9keUJsb2IpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlYWRBcnJheUJ1ZmZlckFzVGV4dCh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIHRleHQnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5VGV4dClcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHN1cHBvcnQuZm9ybURhdGEpIHtcbiAgICAgIHRoaXMuZm9ybURhdGEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dCgpLnRoZW4oZGVjb2RlKVxuICAgICAgfTtcbiAgICB9XG5cbiAgICB0aGlzLmpzb24gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnRleHQoKS50aGVuKEpTT04ucGFyc2UpXG4gICAgfTtcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBIVFRQIG1ldGhvZHMgd2hvc2UgY2FwaXRhbGl6YXRpb24gc2hvdWxkIGJlIG5vcm1hbGl6ZWRcbiAgdmFyIG1ldGhvZHMgPSBbJ0RFTEVURScsICdHRVQnLCAnSEVBRCcsICdPUFRJT05TJywgJ1BPU1QnLCAnUFVUJ107XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplTWV0aG9kKG1ldGhvZCkge1xuICAgIHZhciB1cGNhc2VkID0gbWV0aG9kLnRvVXBwZXJDYXNlKCk7XG4gICAgcmV0dXJuIG1ldGhvZHMuaW5kZXhPZih1cGNhc2VkKSA+IC0xID8gdXBjYXNlZCA6IG1ldGhvZFxuICB9XG5cbiAgZnVuY3Rpb24gUmVxdWVzdChpbnB1dCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHZhciBib2R5ID0gb3B0aW9ucy5ib2R5O1xuXG4gICAgaWYgKGlucHV0IGluc3RhbmNlb2YgUmVxdWVzdCkge1xuICAgICAgaWYgKGlucHV0LmJvZHlVc2VkKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpXG4gICAgICB9XG4gICAgICB0aGlzLnVybCA9IGlucHV0LnVybDtcbiAgICAgIHRoaXMuY3JlZGVudGlhbHMgPSBpbnB1dC5jcmVkZW50aWFscztcbiAgICAgIGlmICghb3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKGlucHV0LmhlYWRlcnMpO1xuICAgICAgfVxuICAgICAgdGhpcy5tZXRob2QgPSBpbnB1dC5tZXRob2Q7XG4gICAgICB0aGlzLm1vZGUgPSBpbnB1dC5tb2RlO1xuICAgICAgdGhpcy5zaWduYWwgPSBpbnB1dC5zaWduYWw7XG4gICAgICBpZiAoIWJvZHkgJiYgaW5wdXQuX2JvZHlJbml0ICE9IG51bGwpIHtcbiAgICAgICAgYm9keSA9IGlucHV0Ll9ib2R5SW5pdDtcbiAgICAgICAgaW5wdXQuYm9keVVzZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVybCA9IFN0cmluZyhpbnB1dCk7XG4gICAgfVxuXG4gICAgdGhpcy5jcmVkZW50aWFscyA9IG9wdGlvbnMuY3JlZGVudGlhbHMgfHwgdGhpcy5jcmVkZW50aWFscyB8fCAnc2FtZS1vcmlnaW4nO1xuICAgIGlmIChvcHRpb25zLmhlYWRlcnMgfHwgIXRoaXMuaGVhZGVycykge1xuICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKTtcbiAgICB9XG4gICAgdGhpcy5tZXRob2QgPSBub3JtYWxpemVNZXRob2Qob3B0aW9ucy5tZXRob2QgfHwgdGhpcy5tZXRob2QgfHwgJ0dFVCcpO1xuICAgIHRoaXMubW9kZSA9IG9wdGlvbnMubW9kZSB8fCB0aGlzLm1vZGUgfHwgbnVsbDtcbiAgICB0aGlzLnNpZ25hbCA9IG9wdGlvbnMuc2lnbmFsIHx8IHRoaXMuc2lnbmFsO1xuICAgIHRoaXMucmVmZXJyZXIgPSBudWxsO1xuXG4gICAgaWYgKCh0aGlzLm1ldGhvZCA9PT0gJ0dFVCcgfHwgdGhpcy5tZXRob2QgPT09ICdIRUFEJykgJiYgYm9keSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm9keSBub3QgYWxsb3dlZCBmb3IgR0VUIG9yIEhFQUQgcmVxdWVzdHMnKVxuICAgIH1cbiAgICB0aGlzLl9pbml0Qm9keShib2R5KTtcbiAgfVxuXG4gIFJlcXVlc3QucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBSZXF1ZXN0KHRoaXMsIHtib2R5OiB0aGlzLl9ib2R5SW5pdH0pXG4gIH07XG5cbiAgZnVuY3Rpb24gZGVjb2RlKGJvZHkpIHtcbiAgICB2YXIgZm9ybSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgIGJvZHlcbiAgICAgIC50cmltKClcbiAgICAgIC5zcGxpdCgnJicpXG4gICAgICAuZm9yRWFjaChmdW5jdGlvbihieXRlcykge1xuICAgICAgICBpZiAoYnl0ZXMpIHtcbiAgICAgICAgICB2YXIgc3BsaXQgPSBieXRlcy5zcGxpdCgnPScpO1xuICAgICAgICAgIHZhciBuYW1lID0gc3BsaXQuc2hpZnQoKS5yZXBsYWNlKC9cXCsvZywgJyAnKTtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBzcGxpdC5qb2luKCc9JykucmVwbGFjZSgvXFwrL2csICcgJyk7XG4gICAgICAgICAgZm9ybS5hcHBlbmQoZGVjb2RlVVJJQ29tcG9uZW50KG5hbWUpLCBkZWNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgcmV0dXJuIGZvcm1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhyYXdIZWFkZXJzKSB7XG4gICAgdmFyIGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgIC8vIFJlcGxhY2UgaW5zdGFuY2VzIG9mIFxcclxcbiBhbmQgXFxuIGZvbGxvd2VkIGJ5IGF0IGxlYXN0IG9uZSBzcGFjZSBvciBob3Jpem9udGFsIHRhYiB3aXRoIGEgc3BhY2VcbiAgICAvLyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNzIzMCNzZWN0aW9uLTMuMlxuICAgIHZhciBwcmVQcm9jZXNzZWRIZWFkZXJzID0gcmF3SGVhZGVycy5yZXBsYWNlKC9cXHI/XFxuW1xcdCBdKy9nLCAnICcpO1xuICAgIHByZVByb2Nlc3NlZEhlYWRlcnMuc3BsaXQoL1xccj9cXG4vKS5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgIHZhciBwYXJ0cyA9IGxpbmUuc3BsaXQoJzonKTtcbiAgICAgIHZhciBrZXkgPSBwYXJ0cy5zaGlmdCgpLnRyaW0oKTtcbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gcGFydHMuam9pbignOicpLnRyaW0oKTtcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoa2V5LCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGhlYWRlcnNcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXF1ZXN0LnByb3RvdHlwZSk7XG5cbiAgZnVuY3Rpb24gUmVzcG9uc2UoYm9keUluaXQsIG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG5cbiAgICB0aGlzLnR5cGUgPSAnZGVmYXVsdCc7XG4gICAgdGhpcy5zdGF0dXMgPSBvcHRpb25zLnN0YXR1cyA9PT0gdW5kZWZpbmVkID8gMjAwIDogb3B0aW9ucy5zdGF0dXM7XG4gICAgdGhpcy5vayA9IHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDMwMDtcbiAgICB0aGlzLnN0YXR1c1RleHQgPSAnc3RhdHVzVGV4dCcgaW4gb3B0aW9ucyA/IG9wdGlvbnMuc3RhdHVzVGV4dCA6ICdPSyc7XG4gICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKTtcbiAgICB0aGlzLnVybCA9IG9wdGlvbnMudXJsIHx8ICcnO1xuICAgIHRoaXMuX2luaXRCb2R5KGJvZHlJbml0KTtcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXNwb25zZS5wcm90b3R5cGUpO1xuXG4gIFJlc3BvbnNlLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgUmVzcG9uc2UodGhpcy5fYm9keUluaXQsIHtcbiAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICBzdGF0dXNUZXh0OiB0aGlzLnN0YXR1c1RleHQsXG4gICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyh0aGlzLmhlYWRlcnMpLFxuICAgICAgdXJsOiB0aGlzLnVybFxuICAgIH0pXG4gIH07XG5cbiAgUmVzcG9uc2UuZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UobnVsbCwge3N0YXR1czogMCwgc3RhdHVzVGV4dDogJyd9KTtcbiAgICByZXNwb25zZS50eXBlID0gJ2Vycm9yJztcbiAgICByZXR1cm4gcmVzcG9uc2VcbiAgfTtcblxuICB2YXIgcmVkaXJlY3RTdGF0dXNlcyA9IFszMDEsIDMwMiwgMzAzLCAzMDcsIDMwOF07XG5cbiAgUmVzcG9uc2UucmVkaXJlY3QgPSBmdW5jdGlvbih1cmwsIHN0YXR1cykge1xuICAgIGlmIChyZWRpcmVjdFN0YXR1c2VzLmluZGV4T2Yoc3RhdHVzKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHN0YXR1cyBjb2RlJylcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IHN0YXR1cywgaGVhZGVyczoge2xvY2F0aW9uOiB1cmx9fSlcbiAgfTtcblxuICBleHBvcnRzLkRPTUV4Y2VwdGlvbiA9IHNlbGYuRE9NRXhjZXB0aW9uO1xuICB0cnkge1xuICAgIG5ldyBleHBvcnRzLkRPTUV4Y2VwdGlvbigpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBleHBvcnRzLkRPTUV4Y2VwdGlvbiA9IGZ1bmN0aW9uKG1lc3NhZ2UsIG5hbWUpIHtcbiAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgdmFyIGVycm9yID0gRXJyb3IobWVzc2FnZSk7XG4gICAgICB0aGlzLnN0YWNrID0gZXJyb3Iuc3RhY2s7XG4gICAgfTtcbiAgICBleHBvcnRzLkRPTUV4Y2VwdGlvbi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSk7XG4gICAgZXhwb3J0cy5ET01FeGNlcHRpb24ucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gZXhwb3J0cy5ET01FeGNlcHRpb247XG4gIH1cblxuICBmdW5jdGlvbiBmZXRjaChpbnB1dCwgaW5pdCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoaW5wdXQsIGluaXQpO1xuXG4gICAgICBpZiAocmVxdWVzdC5zaWduYWwgJiYgcmVxdWVzdC5zaWduYWwuYWJvcnRlZCkge1xuICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBleHBvcnRzLkRPTUV4Y2VwdGlvbignQWJvcnRlZCcsICdBYm9ydEVycm9yJykpXG4gICAgICB9XG5cbiAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgZnVuY3Rpb24gYWJvcnRYaHIoKSB7XG4gICAgICAgIHhoci5hYm9ydCgpO1xuICAgICAgfVxuXG4gICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICAgIHN0YXR1czogeGhyLnN0YXR1cyxcbiAgICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dCxcbiAgICAgICAgICBoZWFkZXJzOiBwYXJzZUhlYWRlcnMoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpIHx8ICcnKVxuICAgICAgICB9O1xuICAgICAgICBvcHRpb25zLnVybCA9ICdyZXNwb25zZVVSTCcgaW4geGhyID8geGhyLnJlc3BvbnNlVVJMIDogb3B0aW9ucy5oZWFkZXJzLmdldCgnWC1SZXF1ZXN0LVVSTCcpO1xuICAgICAgICB2YXIgYm9keSA9ICdyZXNwb25zZScgaW4geGhyID8geGhyLnJlc3BvbnNlIDogeGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgcmVzb2x2ZShuZXcgUmVzcG9uc2UoYm9keSwgb3B0aW9ucykpO1xuICAgICAgfTtcblxuICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ05ldHdvcmsgcmVxdWVzdCBmYWlsZWQnKSk7XG4gICAgICB9O1xuXG4gICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChuZXcgVHlwZUVycm9yKCdOZXR3b3JrIHJlcXVlc3QgZmFpbGVkJykpO1xuICAgICAgfTtcblxuICAgICAgeGhyLm9uYWJvcnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBleHBvcnRzLkRPTUV4Y2VwdGlvbignQWJvcnRlZCcsICdBYm9ydEVycm9yJykpO1xuICAgICAgfTtcblxuICAgICAgeGhyLm9wZW4ocmVxdWVzdC5tZXRob2QsIHJlcXVlc3QudXJsLCB0cnVlKTtcblxuICAgICAgaWYgKHJlcXVlc3QuY3JlZGVudGlhbHMgPT09ICdpbmNsdWRlJykge1xuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAocmVxdWVzdC5jcmVkZW50aWFscyA9PT0gJ29taXQnKSB7XG4gICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCdyZXNwb25zZVR5cGUnIGluIHhociAmJiBzdXBwb3J0LmJsb2IpIHtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdibG9iJztcbiAgICAgIH1cblxuICAgICAgcmVxdWVzdC5oZWFkZXJzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIobmFtZSwgdmFsdWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChyZXF1ZXN0LnNpZ25hbCkge1xuICAgICAgICByZXF1ZXN0LnNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIGFib3J0WGhyKTtcblxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gRE9ORSAoc3VjY2VzcyBvciBmYWlsdXJlKVxuICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgcmVxdWVzdC5zaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBhYm9ydFhocik7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICB4aHIuc2VuZCh0eXBlb2YgcmVxdWVzdC5fYm9keUluaXQgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IHJlcXVlc3QuX2JvZHlJbml0KTtcbiAgICB9KVxuICB9XG5cbiAgZmV0Y2gucG9seWZpbGwgPSB0cnVlO1xuXG4gIGlmICghc2VsZi5mZXRjaCkge1xuICAgIHNlbGYuZmV0Y2ggPSBmZXRjaDtcbiAgICBzZWxmLkhlYWRlcnMgPSBIZWFkZXJzO1xuICAgIHNlbGYuUmVxdWVzdCA9IFJlcXVlc3Q7XG4gICAgc2VsZi5SZXNwb25zZSA9IFJlc3BvbnNlO1xuICB9XG5cbiAgZXhwb3J0cy5IZWFkZXJzID0gSGVhZGVycztcbiAgZXhwb3J0cy5SZXF1ZXN0ID0gUmVxdWVzdDtcbiAgZXhwb3J0cy5SZXNwb25zZSA9IFJlc3BvbnNlO1xuICBleHBvcnRzLmZldGNoID0gZmV0Y2g7XG5cbiAgcmV0dXJuIGV4cG9ydHM7XG5cbn0oe30pKTtcbn0pKF9fc2VsZl9fKTtcbmRlbGV0ZSBfX3NlbGZfXy5mZXRjaC5wb2x5ZmlsbFxuZXhwb3J0cyA9IF9fc2VsZl9fLmZldGNoIC8vIFRvIGVuYWJsZTogaW1wb3J0IGZldGNoIGZyb20gJ2Nyb3NzLWZldGNoJ1xuZXhwb3J0cy5kZWZhdWx0ID0gX19zZWxmX18uZmV0Y2ggLy8gRm9yIFR5cGVTY3JpcHQgY29uc3VtZXJzIHdpdGhvdXQgZXNNb2R1bGVJbnRlcm9wLlxuZXhwb3J0cy5mZXRjaCA9IF9fc2VsZl9fLmZldGNoIC8vIFRvIGVuYWJsZTogaW1wb3J0IHtmZXRjaH0gZnJvbSAnY3Jvc3MtZmV0Y2gnXG5leHBvcnRzLkhlYWRlcnMgPSBfX3NlbGZfXy5IZWFkZXJzXG5leHBvcnRzLlJlcXVlc3QgPSBfX3NlbGZfXy5SZXF1ZXN0XG5leHBvcnRzLlJlc3BvbnNlID0gX19zZWxmX18uUmVzcG9uc2Vcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlJFUVVFU1RfREVCVUcgPSBleHBvcnRzLkFQSUtFWSA9IGV4cG9ydHMuQ09ORkVSRU5DRV9XU19FTkRQT0lOVCA9IGV4cG9ydHMuQ09ORkVSRU5DRV9FTkRQT0lOVCA9IHZvaWQgMDtcbmV4cG9ydHMuQ09ORkVSRU5DRV9FTkRQT0lOVCA9IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL21lZXRzL3YxXCI7XG5leHBvcnRzLkNPTkZFUkVOQ0VfV1NfRU5EUE9JTlQgPSBcIndzOi8vbG9jYWxob3N0OjMzMzNcIjtcbmV4cG9ydHMuQVBJS0VZID0gXCJkZmdoZHNocnF3ZW81eTIzOTg0d2RydHk1ZTN3NHFcIjtcbmV4cG9ydHMuUkVRVUVTVF9ERUJVRyA9IHRydWU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaHR0cEFQSVJlcXVlc3RfID0gZXhwb3J0cy5odHRwQVBJUmVxdWVzdCA9IGV4cG9ydHMuSHR0cE1ldGhvZHNBUElNYXAgPSBleHBvcnRzLkh0dHBNZXRob2RzRm9yQVBJRW51bSA9IGV4cG9ydHMuQVBJRXJyb3IgPSB2b2lkIDA7XG4vLy88cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9ub2RlX21vZHVsZXMvY3Jvc3MtZmV0Y2gvaW5kZXguZC50c1wiIC8+XG4vLy88YW1kLW1vZHVsZSBwYXRoPVwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nyb3NzLWZldGNoL1xudmFyIGNyb3NzX2ZldGNoXzEgPSByZXF1aXJlKFwiY3Jvc3MtZmV0Y2hcIik7XG52YXIgc3RhdHVzZXNfMSA9IHJlcXVpcmUoXCIuL3N0YXR1c2VzXCIpO1xudmFyIGVudl8xID0gcmVxdWlyZShcIi4uL2VudlwiKTtcbi8qKlxuICog0JrQu9Cw0YHRgSDQvtGI0LjQsdC60Lgg0L7RgiBBUEkuXG4gKi9cbnZhciBBUElFcnJvciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQVBJRXJyb3IsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQVBJRXJyb3IobWVzc2FnZSwgYXBpUmVzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIG1lc3NhZ2UpIHx8IHRoaXM7XG4gICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihfdGhpcywgQVBJRXJyb3IucHJvdG90eXBlKTtcbiAgICAgICAgX3RoaXMubmFtZSA9IFwiQVBJRXJyb3JcIjtcbiAgICAgICAgX3RoaXMuYXBpUmVzcG9uc2UgPSBhcGlSZXM7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFQSUVycm9yLnByb3RvdHlwZSwgXCJyZXNwb25zZVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXBpUmVzcG9uc2U7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gQVBJRXJyb3I7XG59KEVycm9yKSk7XG5leHBvcnRzLkFQSUVycm9yID0gQVBJRXJyb3I7XG4vKipcbiAqINCe0LHRgNCw0LHQvtGC0LrQsCDQvtGI0LjQsdC60LggSFRUUCDQt9Cw0L/RgNC+0YHQsC5cbiAqINCU0LvRjyDQvtGI0LjQsdC60LggQVBJINCy0YvQtNC10LvQtdC90YsgSFRUUCDQutC+0LTQsCA0KiouINCV0YHQu9C4INC/0YDQuNGF0L7QtNC40YIg0YLQsNC60L7QuSDQutC+0LQsINGC0L5cbiAqINC/0YvRgtCw0LXQvNGB0Y8g0L/RgNC10L7QsdGA0LDQt9C+0LLQsNGC0Ywg0Log0YLQuNC/0YMg0L7RiNC40LHQutC4IEFQSS4g0JjQvdCw0YfQtSDQstGL0LfRi9Cy0LDQtdC8INC40YHQutC70Y7Rh9C10L3QuNC1IEVycm9yINGBINGC0LXQutGB0YLQvtC8INC+0YjQuNCx0LrQuC5cbiAqIEBwYXJhbSByZXNcbiAqIEBwYXJhbSB0ZXh0XG4gKi9cbnZhciBoYW5kbGVBUElFcnJvciA9IGZ1bmN0aW9uIChyZXMsIHRleHQpIHtcbiAgICBpZiAocmVzLnN0YXR1cyA+PSAzMDApIHtcbiAgICAgICAgdmFyIGpzb24gPSB2b2lkIDA7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBqc29uID0gSlNPTi5wYXJzZSh0ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAocGFyc2VFcnIpIHtcbiAgICAgICAgICAgIGpzb24gPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGpzb24gJiYganNvbi5zdGF0dXMpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQVBJRXJyb3IoXCJBUEkgcmVzcG9uZCBhbiBlcnJvciB3aXRoIFwiICsgcmVzLnN0YXR1cyArIFwiIEhUVFAgc3RhdHVzIGNvZGUgYW5kIHRleHQgXCIgKyB0ZXh0LCBqc29uKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQVBJIHJlc3BvbmQgYW4gZXJyb3Igd2l0aCBcIiArIHJlcy5zdGF0dXMgKyBcIiBIVFRQIHN0YXR1cyBjb2RlIGFuZCB0ZXh0IFwiICsgdGV4dCk7XG4gICAgfVxufTtcbnZhciBIdHRwTWV0aG9kc0ZvckFQSUVudW07XG4oZnVuY3Rpb24gKEh0dHBNZXRob2RzRm9yQVBJRW51bSkge1xuICAgIEh0dHBNZXRob2RzRm9yQVBJRW51bVtcIkdldFwiXSA9IFwiR0VUXCI7XG4gICAgSHR0cE1ldGhvZHNGb3JBUElFbnVtW1wiUG9zdFwiXSA9IFwiUE9TVFwiO1xufSkoSHR0cE1ldGhvZHNGb3JBUElFbnVtID0gZXhwb3J0cy5IdHRwTWV0aG9kc0ZvckFQSUVudW0gfHwgKGV4cG9ydHMuSHR0cE1ldGhvZHNGb3JBUElFbnVtID0ge30pKTtcbmV4cG9ydHMuSHR0cE1ldGhvZHNBUElNYXAgPSB7XG4gICAgJ2V4Y2hhbmdlJzogSHR0cE1ldGhvZHNGb3JBUElFbnVtLlBvc3QsXG4gICAgJ2luZm8nOiBIdHRwTWV0aG9kc0ZvckFQSUVudW0uR2V0LFxuICAgICdjcmVhdGUnOiBIdHRwTWV0aG9kc0ZvckFQSUVudW0uUG9zdCxcbiAgICAnb3Blbl9mb3Jfam9pbic6IEh0dHBNZXRob2RzRm9yQVBJRW51bS5Qb3N0LFxuICAgICdqb2luJzogSHR0cE1ldGhvZHNGb3JBUElFbnVtLlBvc3QsXG4gICAgJ2xlYXZlJzogSHR0cE1ldGhvZHNGb3JBUElFbnVtLlBvc3QsXG4gICAgJ2ZpbmlzaCc6IEh0dHBNZXRob2RzRm9yQVBJRW51bS5Qb3N0LFxuICAgICdjYW5jZWwnOiBIdHRwTWV0aG9kc0ZvckFQSUVudW0uUG9zdCxcbiAgICAncGF1c2UnOiBIdHRwTWV0aG9kc0ZvckFQSUVudW0uUG9zdCxcbiAgICAncmVzdW1lJzogSHR0cE1ldGhvZHNGb3JBUElFbnVtLlBvc3QsXG4gICAgJ3Jlc3RvcmVfdGVybWluYXRlZF9mYXN0JzogSHR0cE1ldGhvZHNGb3JBUElFbnVtLlBvc3QsXG4gICAgJ2R1cmF0aW9ucyc6IEh0dHBNZXRob2RzRm9yQVBJRW51bS5Qb3N0XG59O1xuZnVuY3Rpb24gaHR0cEFQSVJlcXVlc3QobWV0aG9kLCBwYXJhbXMpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0aGlzSXNDb3JyZWN0LCBodHRwTWV0aG9kO1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICB0aGlzSXNDb3JyZWN0ID0gdGhpcyAmJiB0eXBlb2YgdGhpcy5iYXNlVXJsID09PSAnc3RyaW5nJyAmJiB0eXBlb2YgdGhpcy5odHRwTWV0aG9kID09PSAnb2JqZWN0JztcbiAgICAgICAgICAgIGlmICghdGhpc0lzQ29ycmVjdClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdodHRwIGFwaSByZXF1ZXN0IHNob3VsZCBiZSBiaW5kIHRvIElIdHRwQVBJUmVxdWVzdE93bmVyIGluc3RhbmNlIFttZXRob2Q9JyArXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZCArICcsIHBhcmFtcz0nICsgSlNPTi5zdHJpbmdpZnkocGFyYW1zKSArICddJyk7XG4gICAgICAgICAgICBodHRwTWV0aG9kID0gdGhpcy5odHRwTWV0aG9kW21ldGhvZF07XG4gICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgaHR0cEFQSVJlcXVlc3RfKGh0dHBNZXRob2QsIHRoaXMuYmFzZVVybCArICcvJyArIG1ldGhvZCArXG4gICAgICAgICAgICAgICAgICAgICgoaHR0cE1ldGhvZCA9PT0gSHR0cE1ldGhvZHNGb3JBUElFbnVtLkdldCkgJiYgcGFyYW1zID8gJz8nICsgbmV3IFVSTFNlYXJjaFBhcmFtcyhwYXJhbXMpIDogJycpLCAoaHR0cE1ldGhvZCA9PT0gSHR0cE1ldGhvZHNGb3JBUElFbnVtLlBvc3QgPyBwYXJhbXMgOiB7fSkpXTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5leHBvcnRzLmh0dHBBUElSZXF1ZXN0ID0gaHR0cEFQSVJlcXVlc3Q7XG4vKipcbiAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINGA0LXQt9GD0LvRjNGC0LDRgiBHRVQg0LjQu9C4IFBPU1Qg0LfQsNC/0YDQvtGB0LAuXG4gKiDQmtC+0LPQtNCwINCy0L7Qt9Cy0YDQsNGJ0LDQtdGC0YHRjyBIVFRQINC60L7QtCAzMDAg0Lgg0LLRi9GI0LUsINCy0YvQt9GL0LLQsNC10YLRgdGPINC40YHQutC70Y7Rh9C10L3QuNC1IEVycm9yINC40LvQuCBBUElFcnJvci5cbiAqIEBwYXJhbSBodHRwTWV0aG9kXG4gKiBAcGFyYW0gZW5kcG9pbnRcbiAqIEBwYXJhbSBwYXJhbXNcbiAqL1xuZnVuY3Rpb24gaHR0cEFQSVJlcXVlc3RfKGh0dHBNZXRob2QsIGVuZHBvaW50LCBwYXJhbXMpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvcHRzLCBqc29uUmVxdWVzdCwgcmVzLCB0ZXh0LCBhcGlSZXM7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIG9wdHMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IGh0dHBNZXRob2QudG9VcHBlckNhc2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGVudl8xLlJFUVVFU1RfREVCVUcgJiYgY29uc29sZS5kZWJ1ZygnPC0tIFsnICsgbmV3IERhdGUoKS50b0lTT1N0cmluZygpICsgJ10gJyArIGVuZHBvaW50KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGh0dHBNZXRob2QgPT09ICdQT1NUJykge1xuICAgICAgICAgICAgICAgICAgICAgICAganNvblJlcXVlc3QgPSBKU09OLnN0cmluZ2lmeShwYXJhbXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW52XzEuUkVRVUVTVF9ERUJVRyAmJiBjb25zb2xlLmRlYnVnKCcgICAgJyArIGpzb25SZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuYm9keSA9IGpzb25SZXF1ZXN0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGNyb3NzX2ZldGNoXzEuZmV0Y2goZW5kcG9pbnQsIG9wdHMpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIHJlcyA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmVzLnRleHQoKV07XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICBlbnZfMS5SRVFVRVNUX0RFQlVHICYmIGNvbnNvbGUuZGVidWcoJy0tPiBbJyArIG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSArICddICcgKyByZXMuc3RhdHVzKTtcbiAgICAgICAgICAgICAgICAgICAgZW52XzEuUkVRVUVTVF9ERUJVRyAmJiBjb25zb2xlLmRlYnVnKCcgICAgJyArIHRleHQpO1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVBUElFcnJvcihyZXMsIHRleHQpO1xuICAgICAgICAgICAgICAgICAgICBhcGlSZXMgPSBKU09OLnBhcnNlKHRleHQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXBpUmVzLnN0YXR1cyAhPT0gc3RhdHVzZXNfMS5TdWNjZXNzU3RhdHVzKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFQSUVycm9yKFwiQVBJRXJyb3Igd2l0aCAyKiogSFRUUCBzdGF0dXMgY29kZSBhbmQgdGV4dCBcIiArIHRleHQsIGFwaVJlcyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBhcGlSZXNdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuaHR0cEFQSVJlcXVlc3RfID0gaHR0cEFQSVJlcXVlc3RfO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKlxuIE1lZE1lIEF1ZGlvL1ZpZGVvIENvbmZlcmVuY2UgQVBJIFNES1xuICovXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Db25mZXJlbmNlQWNjZXNzQVBJID0gZXhwb3J0cy5SZXN0b3JlRmFzdERlbGF5TWludXRlcyA9IGV4cG9ydHMuQ29uZmVyZW5jZU1vZGlmeUFQSSA9IHZvaWQgMDtcbnZhciBodHRwUmVxdWVzdF8xID0gcmVxdWlyZShcIi4vaHR0cFJlcXVlc3RcIik7XG52YXIgdGltZV8xID0gcmVxdWlyZShcIi4vdGltZVwiKTtcbi8qKlxuICog0KHQvtC00LXRgNC20LjRgiDQt9Cw0L/RgNC+0YHRiyDQvdCwINGB0L7Qt9C00LDQvdC40LUg0Lgg0LjQt9C80LXQvdC10L3QuNC1INC60L7QvdGE0LXRgNC10L3RhtC40LkuXG4gKi9cbnZhciBDb25mZXJlbmNlTW9kaWZ5QVBJID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbmZlcmVuY2VNb2RpZnlBUEkoYXBpUmVxdWVzdCkge1xuICAgICAgICB0aGlzLmFwaVJlcXVlc3QgPSBhcGlSZXF1ZXN0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDQktC+0LfQstGA0LDRidCw0LXRgiDQvtCx0YrQtdC60YIgQ29uZmVyZW5jZU1vZGlmeUFQSSwg0LjQvdC40YbQuNCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C5INGE0YPQvdC60YbQuNC10Lkg0LfQsNC/0YDQvtGB0LAg0LogSFRUUCBBUEkuXG4gICAgICogQHBhcmFtIGJhc2VVcmxcbiAgICAgKi9cbiAgICBDb25mZXJlbmNlTW9kaWZ5QVBJLmNyZWF0ZUh0dHBBUEkgPSBmdW5jdGlvbiAoYmFzZVVybCkge1xuICAgICAgICB2YXIgcmVxT3duZXIgPSB7XG4gICAgICAgICAgICBiYXNlVXJsOiBiYXNlVXJsLFxuICAgICAgICAgICAgaHR0cE1ldGhvZDogaHR0cFJlcXVlc3RfMS5IdHRwTWV0aG9kc0FQSU1hcFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IENvbmZlcmVuY2VNb2RpZnlBUEkoaHR0cFJlcXVlc3RfMS5odHRwQVBJUmVxdWVzdC5iaW5kKHJlcU93bmVyKSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiDQl9Cw0L/RgNC+0YEg0L3QsCDRgdC+0LfQtNCw0L3QuNC1INC60L7QvdGE0LXRgNC10L3RhtC40LguXG4gICAgICogQHBhcmFtIGFwaUtleVxuICAgICAqIEBwYXJhbSB1c2VySWRcbiAgICAgKiBAcGFyYW0gdXNlclJvbGVcbiAgICAgKiBAcGFyYW0gY29uZmVyZW5jZUluZm9cbiAgICAgKi9cbiAgICBDb25mZXJlbmNlTW9kaWZ5QVBJLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoYXBpS2V5LCB1c2VySWQsIHVzZXJSb2xlLCBjb25mZXJlbmNlSW5mbykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcGFyYW1zO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgYXBpX2tleTogYXBpS2V5LFxuICAgICAgICAgICAgICAgICAgICB1c2VyX2lkOiB1c2VySWQsXG4gICAgICAgICAgICAgICAgICAgIHVzZXJfcm9sZTogdXNlclJvbGUsXG4gICAgICAgICAgICAgICAgICAgIGNvbmZlcmVuY2VfaW5mbzogY29uZmVyZW5jZUluZm9cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLmFwaVJlcXVlc3QoJ2NyZWF0ZScsIHBhcmFtcyldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQ29uZmVyZW5jZU1vZGlmeUFQSS5wcm90b3R5cGUubW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIENvbmZlcmVuY2VNb2RpZnlBUEkucHJvdG90eXBlLnJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIENvbmZlcmVuY2VNb2RpZnlBUEkucHJvdG90eXBlLnVwZGF0ZUluZm8gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gQ29uZmVyZW5jZU1vZGlmeUFQSTtcbn0oKSk7XG5leHBvcnRzLkNvbmZlcmVuY2VNb2RpZnlBUEkgPSBDb25mZXJlbmNlTW9kaWZ5QVBJO1xuZXhwb3J0cy5SZXN0b3JlRmFzdERlbGF5TWludXRlcyA9IDM7XG4vKipcbiAqINCh0L7QtNC10YDQttC40YIg0LfQsNC/0YDQvtGB0Ysg0L3QsCDQv9C+0LvRg9GH0LXQvdC40LUg0LTQsNC90L3Ri9GFINC/0L4g0LrQvtC90YTQtdGA0LXQvdGG0LjQuCwg0LAg0YLQsNC60LbQtSDQvdCwINGD0L/RgNCw0LLQu9C10L3QuNC10Lwg0YHRgtCw0YLRg9GB0L7QvCDQuFxuICog0YDQsNCx0L7RgtC+0Lkg0LrQvtC90YTQtdGA0LXQvdGG0LjQuC5cbiAqL1xudmFyIENvbmZlcmVuY2VBY2Nlc3NBUEkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29uZmVyZW5jZUFjY2Vzc0FQSShhcGlSZXF1ZXN0KSB7XG4gICAgICAgIHRoaXMuYXBpUmVxdWVzdCA9IGFwaVJlcXVlc3Q7XG4gICAgfVxuICAgIC8qKlxuICAgICAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINC+0LHRitC10LrRgiBDb25mZXJlbmNlQWNjZXNzQVBJLCDQuNC90LjRhtC40LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0Lkg0YTRg9C90LrRhtC40LXQuSDQt9Cw0L/RgNC+0YHQsCDQuiBIVFRQIEFQSS5cbiAgICAgKiBAcGFyYW0gYmFzZVVybFxuICAgICAqL1xuICAgIENvbmZlcmVuY2VBY2Nlc3NBUEkuY3JlYXRlSHR0cEFQSSA9IGZ1bmN0aW9uIChiYXNlVXJsKSB7XG4gICAgICAgIHZhciByZXFPd25lciA9IHtcbiAgICAgICAgICAgIGJhc2VVcmw6IGJhc2VVcmwsXG4gICAgICAgICAgICBodHRwTWV0aG9kOiBodHRwUmVxdWVzdF8xLkh0dHBNZXRob2RzQVBJTWFwXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXcgQ29uZmVyZW5jZUFjY2Vzc0FQSShodHRwUmVxdWVzdF8xLmh0dHBBUElSZXF1ZXN0LmJpbmQocmVxT3duZXIpKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINC60LvRjtGHINC60L7QvdGE0LXRgNC10L3RhtC40Lgg0L/QviDQutC70Y7Rh9GDINC00L7RgdGC0YPQv9CwXG4gICAgICogQHBhcmFtIGFjY2Vzc1Rva2VuXG4gICAgICovXG4gICAgQ29uZmVyZW5jZUFjY2Vzc0FQSS5wcm90b3R5cGUuZXhjaGFuZ2UgPSBmdW5jdGlvbiAoYWNjZXNzVG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLmFwaVJlcXVlc3QoJ2V4Y2hhbmdlJywgeyBhY2Nlc3NfdG9rZW46IGFjY2Vzc1Rva2VuIH0pXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIENvbmZlcmVuY2VBY2Nlc3NBUEkucHJvdG90eXBlLm90cFNlbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBDb25mZXJlbmNlQWNjZXNzQVBJLnByb3RvdHlwZS5vdHBWZXJpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUg0LjQvdGE0L7RgNC80LDRhtC40Lgg0L/QviDQutC+0L3RhNC10YDQtdC90YbQuNC4LlxuICAgICAqIEBwYXJhbSBhY2Nlc3NUb2tlblxuICAgICAqL1xuICAgIENvbmZlcmVuY2VBY2Nlc3NBUEkucHJvdG90eXBlLmdldENvbmZlcmVuY2VJbmZvID0gZnVuY3Rpb24gKGFjY2Vzc1Rva2VuKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5hcGlSZXF1ZXN0KCdpbmZvJywgeyBhY2Nlc3NfdG9rZW46IGFjY2Vzc1Rva2VuIH0pXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqINCX0LDQv9GA0L7RgSDQvdCwINC+0YLQutGA0YvRgtC40LUg0LrQvtC90YTQtdGA0LXQvdGG0LjQuC5cbiAgICAgKiBAcGFyYW0gYWNjZXNzVG9rZW5cbiAgICAgKi9cbiAgICBDb25mZXJlbmNlQWNjZXNzQVBJLnByb3RvdHlwZS5vcGVuRm9ySm9pbiA9IGZ1bmN0aW9uIChhY2Nlc3NUb2tlbikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMuYXBpUmVxdWVzdCgnb3Blbl9mb3Jfam9pbicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc190b2tlbjogYWNjZXNzVG9rZW5cbiAgICAgICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICog0JfQsNC/0YDQvtGBINC90LAg0L/RgNC40YHQvtC10LTQuNC90LXQvdC40LUg0Log0LrQvtC90YTQtdGA0LXQvdGG0LjQuC5cbiAgICAgKiBAcGFyYW0gYWNjZXNzVG9rZW5cbiAgICAgKi9cbiAgICBDb25mZXJlbmNlQWNjZXNzQVBJLnByb3RvdHlwZS5qb2luID0gZnVuY3Rpb24gKGFjY2Vzc1Rva2VuKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5hcGlSZXF1ZXN0KCdqb2luJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXNzX3Rva2VuOiBhY2Nlc3NUb2tlblxuICAgICAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiDQl9Cw0L/RgNC+0YEg0L3QsCDQvtGC0YHQvtC10LTQuNC90LXQvdC40LUg0L7RgiDQutC+0L3RhNC10YDQtdC90YbQuNC4LlxuICAgICAqIEBwYXJhbSBhY2Nlc3NUb2tlblxuICAgICAqL1xuICAgIENvbmZlcmVuY2VBY2Nlc3NBUEkucHJvdG90eXBlLmxlYXZlID0gZnVuY3Rpb24gKGFjY2Vzc1Rva2VuKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5hcGlSZXF1ZXN0KCdsZWF2ZScsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc190b2tlbjogYWNjZXNzVG9rZW5cbiAgICAgICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICog0JfQsNC/0YDQvtGBINC90LAg0LfQsNCy0LXRgNGI0LXQvdC40LUg0LrQvtC90YTQtdGA0LXQvdGG0LjQuC5cbiAgICAgKiBAcGFyYW0gYWNjZXNzVG9rZW5cbiAgICAgKi9cbiAgICBDb25mZXJlbmNlQWNjZXNzQVBJLnByb3RvdHlwZS5maW5pc2ggPSBmdW5jdGlvbiAoYWNjZXNzVG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLmFwaVJlcXVlc3QoJ2ZpbmlzaCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc190b2tlbjogYWNjZXNzVG9rZW5cbiAgICAgICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICog0JfQsNC/0YDQvtGBINC90LAg0L7RgtC80LXQvdGDINC60L7QvdGE0LXRgNC10L3RhtC40LguXG4gICAgICogQHBhcmFtIGFjY2Vzc1Rva2VuXG4gICAgICovXG4gICAgQ29uZmVyZW5jZUFjY2Vzc0FQSS5wcm90b3R5cGUuY2FuY2VsID0gZnVuY3Rpb24gKGFjY2Vzc1Rva2VuKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5hcGlSZXF1ZXN0KCdjYW5jZWwnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NfdG9rZW46IGFjY2Vzc1Rva2VuXG4gICAgICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqINCX0LDQv9GA0L7RgSDQvdCwINC+0YHRgtCw0L3QvtCy0LrRgyDQutC+0L3RhNC10YDQtdC90YbQuNC4LlxuICAgICAqIEBwYXJhbSBhY2Nlc3NUb2tlblxuICAgICAqL1xuICAgIENvbmZlcmVuY2VBY2Nlc3NBUEkucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24gKGFjY2Vzc1Rva2VuKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5hcGlSZXF1ZXN0KCdwYXVzZScsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc190b2tlbjogYWNjZXNzVG9rZW5cbiAgICAgICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICog0JfQsNC/0YDQvtGBINC90LAg0LLQvtC30L7QsdC90L7QstC70LXQvdC40LUg0LrQvtC90YTQtdGA0LXQvdGG0LjQuC5cbiAgICAgKiBAcGFyYW0gYWNjZXNzVG9rZW5cbiAgICAgKi9cbiAgICBDb25mZXJlbmNlQWNjZXNzQVBJLnByb3RvdHlwZS5yZXN1bWUgPSBmdW5jdGlvbiAoYWNjZXNzVG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLmFwaVJlcXVlc3QoJ3Jlc3VtZScsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc190b2tlbjogYWNjZXNzVG9rZW5cbiAgICAgICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQ29uZmVyZW5jZUFjY2Vzc0FQSS5wcm90b3R5cGUucmVzdG9yZVRlcm1pbmF0ZWRGYXN0ID0gZnVuY3Rpb24gKGFjY2Vzc1Rva2VuKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5hcGlSZXF1ZXN0KCdyZXN0b3JlX3Rlcm1pbmF0ZWRfZmFzdCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc190b2tlbjogYWNjZXNzVG9rZW5cbiAgICAgICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQ29uZmVyZW5jZUFjY2Vzc0FQSS5wcm90b3R5cGUuY2FuUmVzdG9yZSA9IGZ1bmN0aW9uIChjb25mKSB7XG4gICAgICAgIGlmIChjb25mLmNhbmNlbGxlZEJ5RXh0ZXJuYWwpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHZhciBkZWxheU1zID0gRGF0ZS5ub3coKSAtIERhdGUucGFyc2UoY29uZi5maW5pc2hlZEF0KTtcbiAgICAgICAgcmV0dXJuIGRlbGF5TXMgPD0gZXhwb3J0cy5SZXN0b3JlRmFzdERlbGF5TWludXRlcyAqIHRpbWVfMS5UaW1lTXMuTWludXRlO1xuICAgIH07XG4gICAgQ29uZmVyZW5jZUFjY2Vzc0FQSS5wcm90b3R5cGUuZHVyYXRpb25zID0gZnVuY3Rpb24gKGFjY2Vzc1Rva2VuKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5hcGlSZXF1ZXN0KCdkdXJhdGlvbnMnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NfdG9rZW46IGFjY2Vzc1Rva2VuXG4gICAgICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBDb25mZXJlbmNlQWNjZXNzQVBJO1xufSgpKTtcbmV4cG9ydHMuQ29uZmVyZW5jZUFjY2Vzc0FQSSA9IENvbmZlcmVuY2VBY2Nlc3NBUEk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ29uZmVyZW5jZVNvY2sgPSB2b2lkIDA7XG52YXIgQ29uZmVyZW5jZVNvY2sgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29uZmVyZW5jZVNvY2sod3NVcmkpIHtcbiAgICAgICAgdGhpcy53c1VyaSA9IHdzVXJpO1xuICAgIH1cbiAgICBDb25mZXJlbmNlU29jay5wcm90b3R5cGUud3JpdGVfID0gZnVuY3Rpb24gKG1zZykge1xuICAgICAgICBjb25zb2xlLmluZm8oJ1slc10gQ29uZmVyZW5jZVdTJywgKG5ldyBEYXRlKS50b0lTT1N0cmluZygpLCB0aGlzLmF0XywgbXNnKTtcbiAgICB9O1xuICAgIENvbmZlcmVuY2VTb2NrLnByb3RvdHlwZS5vbk9wZW5fID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLndyaXRlXyhcIkNPTk5FQ1RFRFwiKTtcbiAgICAgICAgdGhpcy5kb1NlbmRfKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIHBhdGg6ICdoYW5kc2hha2UnLFxuICAgICAgICAgICAgYXQ6IHRoaXMuYXRfXG4gICAgICAgIH0pKTtcbiAgICB9O1xuICAgIENvbmZlcmVuY2VTb2NrLnByb3RvdHlwZS5vbk1lc3NhZ2VfID0gZnVuY3Rpb24gKG1zZykge1xuICAgICAgICB0aGlzLndyaXRlXyhcIlJFQ0VJVkU6IFwiICsgbXNnLmRhdGEpO1xuICAgICAgICB2YXIganNvbiA9IEpTT04ucGFyc2UobXNnLmRhdGEpO1xuICAgICAgICBpZiAoanNvbi5wYXRoID09PSAnY2hhbmdlX3N0YXR1c19jYWxsYmFjaycpXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUNvbmZlcmVuY2VTdGF0dXNDYWxsYmFja18uY2FsbCh0aGlzLCBqc29uLm5ld1N0YXR1cyk7XG4gICAgICAgIGlmIChqc29uLnBhdGggPT09ICdjaGFuZ2VfY29uZl9pbmZvX2NhbGxiYWNrJylcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlQ29uZmVyZW5jZUluZm9DYWxsYmFja18uY2FsbCh0aGlzKTtcbiAgICB9O1xuICAgIENvbmZlcmVuY2VTb2NrLnByb3RvdHlwZS5vbkNsb3NlXyA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgdGhpcy53cml0ZV8oXCJDTE9TRUQ6IFwiICsgZXZ0LmNvZGUgKyBcIiBcIiArIGV2dC5yZWFzb24pO1xuICAgIH07XG4gICAgQ29uZmVyZW5jZVNvY2sucHJvdG90eXBlLm9uRXJyb3JfID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICB0aGlzLndyaXRlXyhcIkVSUk9SOiBcIiArIChlcnIubWVzc2FnZSB8fCBlcnIpKTtcbiAgICB9O1xuICAgIENvbmZlcmVuY2VTb2NrLnByb3RvdHlwZS5kb1NlbmRfID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy53cml0ZV8oXCJTRU5UOiBcIiArIG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLndzXy5zZW5kKG1lc3NhZ2UpO1xuICAgIH07XG4gICAgQ29uZmVyZW5jZVNvY2sucHJvdG90eXBlLmFjY2Vzc1Rva2VuID0gZnVuY3Rpb24gKGF0KSB7XG4gICAgICAgIHRoaXMuYXRfID0gYXQ7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQ29uZmVyZW5jZVNvY2sucHJvdG90eXBlLmNvbm5lY3QgPSBmdW5jdGlvbiAoYXQpIHtcbiAgICAgICAgdGhpcy53c18gPSBuZXcgV2ViU29ja2V0KHRoaXMud3NVcmkpO1xuICAgICAgICB0aGlzLmF0XyA9IGF0O1xuICAgICAgICB0aGlzLndzXy5vbm9wZW4gPSB0aGlzLm9uT3Blbl8uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy53c18ub25tZXNzYWdlID0gdGhpcy5vbk1lc3NhZ2VfLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMud3NfLm9uY2xvc2UgPSB0aGlzLm9uQ2xvc2VfLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMud3NfLm9uZXJyb3IgPSB0aGlzLm9uRXJyb3JfLmJpbmQodGhpcyk7XG4gICAgfTtcbiAgICBDb25mZXJlbmNlU29jay5wcm90b3R5cGUuY2hhbmdlQ29uZmVyZW5jZVN0YXR1cyA9IGZ1bmN0aW9uIChuZXdTdGF0dXMpIHtcbiAgICAgICAgdGhpcy5kb1NlbmRfKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIHBhdGg6ICdjaGFuZ2Vfc3RhdHVzJyxcbiAgICAgICAgICAgIGF0OiB0aGlzLmF0XyxcbiAgICAgICAgICAgIG5ld1N0YXR1czogbmV3U3RhdHVzXG4gICAgICAgIH0pKTtcbiAgICB9O1xuICAgIENvbmZlcmVuY2VTb2NrLnByb3RvdHlwZS5jaGFuZ2VDb25mZXJlbmNlU3RhdHVzQ2FsbGJhY2sgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VDb25mZXJlbmNlU3RhdHVzQ2FsbGJhY2tfID0gY2I7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQ29uZmVyZW5jZVNvY2sucHJvdG90eXBlLmNoYW5nZUNvbmZlcmVuY2VJbmZvQ2FsbGJhY2sgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VDb25mZXJlbmNlSW5mb0NhbGxiYWNrXyA9IGNiO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIHJldHVybiBDb25mZXJlbmNlU29jaztcbn0oKSk7XG5leHBvcnRzLkNvbmZlcmVuY2VTb2NrID0gQ29uZmVyZW5jZVNvY2s7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRXJyb3JTdGF0dXNlcyA9IGV4cG9ydHMuU3VjY2Vzc1N0YXR1c0VudW0gPSBleHBvcnRzLlN1Y2Nlc3NTdGF0dXMgPSB2b2lkIDA7XG4vKipcbiAqINCj0YHQv9C10YjQvdGL0Lkg0YHRgtCw0YLRg9GBINC30LDQv9GA0L7RgdCwINC6IEFQSS5cbiAqL1xuZXhwb3J0cy5TdWNjZXNzU3RhdHVzID0gJ09LJztcbnZhciBTdWNjZXNzU3RhdHVzRW51bTtcbihmdW5jdGlvbiAoU3VjY2Vzc1N0YXR1c0VudW0pIHtcbiAgICBTdWNjZXNzU3RhdHVzRW51bVtcIlN1Y2Nlc3NTdGF0dXNcIl0gPSBcIk9LXCI7XG59KShTdWNjZXNzU3RhdHVzRW51bSA9IGV4cG9ydHMuU3VjY2Vzc1N0YXR1c0VudW0gfHwgKGV4cG9ydHMuU3VjY2Vzc1N0YXR1c0VudW0gPSB7fSkpO1xuLyoqXG4gKiDQodGC0LDRgtGD0YEg0L7RiNC40LHQutC4INC30LDQv9GA0L7RgdCwINC6IEFQSS5cbiAqL1xudmFyIEVycm9yU3RhdHVzZXM7XG4oZnVuY3Rpb24gKEVycm9yU3RhdHVzZXMpIHtcbiAgICBFcnJvclN0YXR1c2VzW1wiVW5rbm93bkVycm9yXCJdID0gXCJVTktOT1dOX0VSUk9SXCI7XG4gICAgRXJyb3JTdGF0dXNlc1tcIlVuYXV0aG9yaXplZFwiXSA9IFwiVU5BVVRIT1JJWkVEXCI7XG4gICAgRXJyb3JTdGF0dXNlc1tcIlZhbGlkYXRpb25FcnJvclwiXSA9IFwiVkFMSURBVElPTl9FUlJPUlwiO1xuICAgIEVycm9yU3RhdHVzZXNbXCJFeHBpcmVkVG9rZW5cIl0gPSBcIkVYUElSRURfVE9LRU5cIjtcbiAgICBFcnJvclN0YXR1c2VzW1wiQWNjZXNzVG9rZW5Ob3RGb3VuZFwiXSA9IFwiQUNDRVNTX1RPS0VOX05PVF9GT1VORFwiO1xuICAgIEVycm9yU3RhdHVzZXNbXCJFeHBlY3RSZXF1ZXN0RmllbGRzXCJdID0gXCJFWFBFQ1RfUkVRVUVTVF9GSUVMRFNcIjtcbiAgICBFcnJvclN0YXR1c2VzW1wiT3RwRXhwZWN0XCJdID0gXCJPVFBfRVhQRUNUXCI7XG4gICAgRXJyb3JTdGF0dXNlc1tcIk90cFdyb25nQ29kZVwiXSA9IFwiT1RQX1dST05HX0NPREVcIjtcbiAgICBFcnJvclN0YXR1c2VzW1wiRXhwZWN0QWNjZXNzVG9rZW5cIl0gPSBcIkVYUEVDVF9BQ0NFU1NfVE9LRU5cIjtcbiAgICBFcnJvclN0YXR1c2VzW1wiRXhwZWN0Q29uZmVyZW5jZVRva2VuXCJdID0gXCJFWFBFQ1RfQ09ORkVSRU5DRV9UT0tFTlwiO1xuICAgIEVycm9yU3RhdHVzZXNbXCJDb25mZXJlbmNlSXNOb3RSZWFkeUZvclN0YXJ0XCJdID0gXCJDT05GRVJFTkNFX0lTX05PVF9SRUFEWV9GT1JfU1RBUlRcIjtcbiAgICBFcnJvclN0YXR1c2VzW1wiQ29uZmVyZW5jZUNhbm5vdEpvaW5cIl0gPSBcIkNPTkZFUkVOQ0VfQ0FOTk9UX0pPSU5cIjtcbiAgICBFcnJvclN0YXR1c2VzW1wiQ2xpZW50QWxyZWFkeUpvaW5lZFwiXSA9IFwiQ0xJRU5UX0FMUkVBRFlfSk9JTkVEXCI7XG4gICAgRXJyb3JTdGF0dXNlc1tcIkNsaWVudFNob3VsZEJlSm9pbmVkXCJdID0gXCJDTElFTlRfU0hPVUxEX0JFX0pPSU5FRFwiO1xuICAgIEVycm9yU3RhdHVzZXNbXCJTcGVjaWFsaXN0U2hvdWxkQmVKb2luZWRcIl0gPSBcIlNQRUNJQUxJU1RfU0hPVUxEX0JFX0pPSU5FRFwiO1xuICAgIEVycm9yU3RhdHVzZXNbXCJDb25mZXJlbmNlV3JvbmdTcGVjaWFsaXN0XCJdID0gXCJDT05GRVJFTkNFX1dST05HX1NQRUNJQUxJU1RcIjtcbiAgICBFcnJvclN0YXR1c2VzW1wiQ29uZmVyZW5jZVdyb25nQ2xpZW50XCJdID0gXCJDT05GRVJFTkNFX1dST05HX0NMSUVOVFwiO1xuICAgIEVycm9yU3RhdHVzZXNbXCJDb25mZXJlbmNlQ2Fubm90QmVTdGFydGVkXCJdID0gXCJDT05GRVJFTkNFX0NBTk5PVF9CRV9TVEFSVEVEXCI7XG4gICAgRXJyb3JTdGF0dXNlc1tcIkNvbmZlcmVuY2VDYW5ub3RCZUNhbmNlbGxlZFwiXSA9IFwiQ09ORkVSRU5DRV9DQU5OT1RfQkVfQ0FOQ0VMTEVEXCI7XG4gICAgRXJyb3JTdGF0dXNlc1tcIkNvbmZlcmVuY2VDYW5ub3RCZUZpbmlzaGVkXCJdID0gXCJDT05GRVJFTkNFX0NBTk5PVF9CRV9GSU5JU0hFRFwiO1xuICAgIEVycm9yU3RhdHVzZXNbXCJDb25mZXJlbmNlQ2Fubm90QmVPcGVuZWRGb3JKb2luXCJdID0gXCJDT05GRVJFTkNFX0NBTk5PVF9CRV9PUEVORURfRk9SX0pPSU5cIjtcbiAgICBFcnJvclN0YXR1c2VzW1wiQ29uZmVyZW5jZUNhbm5vdEJlRWRpdGVkXCJdID0gXCJDT05GRVJFTkNFX0NBTk5PVF9CRV9FRElURURcIjtcbiAgICBFcnJvclN0YXR1c2VzW1wiVXNlclNob3VsZEJlSW5Db25mZXJlbmNlXCJdID0gXCJVU0VSX1NIT1VMRF9CRV9JTl9DT05GRVJFTkNFXCI7XG4gICAgRXJyb3JTdGF0dXNlc1tcIkNvbmZlcmVuY2VXcm9uZ1N0YXR1c0NoYW5nZVwiXSA9IFwiQ09ORkVSRU5DRV9XUk9OR19TVEFUVVNfQ0hBTkdFXCI7XG4gICAgRXJyb3JTdGF0dXNlc1tcIlJlc3RvcmVGYXN0VGltZWRPdXRcIl0gPSBcIlJFU1RPUkVfRkFTVF9USU1FRF9PVVRcIjtcbn0pKEVycm9yU3RhdHVzZXMgPSBleHBvcnRzLkVycm9yU3RhdHVzZXMgfHwgKGV4cG9ydHMuRXJyb3JTdGF0dXNlcyA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVGltZU1zID0gdm9pZCAwO1xudmFyIE1pbnV0ZU1zID0gNjAgKiAxMDAwO1xudmFyIFRpbWVNcyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUaW1lTXMoKSB7XG4gICAgfVxuICAgIFRpbWVNcy5NaW51dGUgPSBNaW51dGVNcztcbiAgICBUaW1lTXMuSG91ciA9IDYwICogVGltZU1zLk1pbnV0ZTtcbiAgICBUaW1lTXMuRGF5ID0gMjQgKiBUaW1lTXMuSG91cjtcbiAgICBUaW1lTXMuV2VlayA9IDI0ICogVGltZU1zLkRheTtcbiAgICByZXR1cm4gVGltZU1zO1xufSgpKTtcbmV4cG9ydHMuVGltZU1zID0gVGltZU1zO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNvbmZlcmVuY2VTdGF0dXNlc0VudW0gPSBleHBvcnRzLkNvbmZlcmVuY2VSb2xlc0VudW0gPSBleHBvcnRzLkxhbmd1YWdlTGlzdEVudW0gPSBleHBvcnRzLkFwcG9pbnRtZW50RW5naW5lc0VudW0gPSB2b2lkIDA7XG4vKipcbiAqXG4gKi9cbnZhciBBcHBvaW50bWVudEVuZ2luZXNFbnVtO1xuKGZ1bmN0aW9uIChBcHBvaW50bWVudEVuZ2luZXNFbnVtKSB7XG4gICAgQXBwb2ludG1lbnRFbmdpbmVzRW51bVtcIkdCb29raW5nXCJdID0gXCJHQm9va2luZ1wiO1xufSkoQXBwb2ludG1lbnRFbmdpbmVzRW51bSA9IGV4cG9ydHMuQXBwb2ludG1lbnRFbmdpbmVzRW51bSB8fCAoZXhwb3J0cy5BcHBvaW50bWVudEVuZ2luZXNFbnVtID0ge30pKTtcbi8qKlxuICpcbiAqL1xudmFyIExhbmd1YWdlTGlzdEVudW07XG4oZnVuY3Rpb24gKExhbmd1YWdlTGlzdEVudW0pIHtcbiAgICBMYW5ndWFnZUxpc3RFbnVtW1wiRU5fVVNcIl0gPSBcImVuLXVzXCI7XG4gICAgTGFuZ3VhZ2VMaXN0RW51bVtcIlJVX1JVXCJdID0gXCJydS1ydVwiO1xuICAgIExhbmd1YWdlTGlzdEVudW1bXCJIRV9JTFwiXSA9IFwiaGUtaWxcIjtcbiAgICBMYW5ndWFnZUxpc3RFbnVtW1wiRlJfRlJcIl0gPSBcImZyLWZyXCI7XG4gICAgTGFuZ3VhZ2VMaXN0RW51bVtcIkhVX0hVXCJdID0gXCJodS1odVwiO1xuICAgIExhbmd1YWdlTGlzdEVudW1bXCJFRV9FRVwiXSA9IFwiZWUtZWVcIjtcbiAgICBMYW5ndWFnZUxpc3RFbnVtW1wiTFZfTFZcIl0gPSBcImx2LWx2XCI7XG4gICAgTGFuZ3VhZ2VMaXN0RW51bVtcIkxUX0xUXCJdID0gXCJsdC1sdFwiO1xuICAgIExhbmd1YWdlTGlzdEVudW1bXCJERV9ERVwiXSA9IFwiZGUtZGVcIjtcbiAgICBMYW5ndWFnZUxpc3RFbnVtW1wiWkhfQ0hcIl0gPSBcInpoLWNuXCI7XG4gICAgTGFuZ3VhZ2VMaXN0RW51bVtcIkZJX0ZJXCJdID0gXCJmaS1maVwiO1xuICAgIExhbmd1YWdlTGlzdEVudW1bXCJBTV9BTVwiXSA9IFwiYW0tYW1cIjtcbiAgICBMYW5ndWFnZUxpc3RFbnVtW1wiRVNfRVNcIl0gPSBcImVzLWVzXCI7XG4gICAgTGFuZ3VhZ2VMaXN0RW51bVtcIkdFX0dFXCJdID0gXCJnZS1nZVwiO1xuICAgIExhbmd1YWdlTGlzdEVudW1bXCJVWl9VWlwiXSA9IFwidXotdXpcIjtcbiAgICBMYW5ndWFnZUxpc3RFbnVtW1wiQVJfUFNcIl0gPSBcImFyLXBzXCI7XG59KShMYW5ndWFnZUxpc3RFbnVtID0gZXhwb3J0cy5MYW5ndWFnZUxpc3RFbnVtIHx8IChleHBvcnRzLkxhbmd1YWdlTGlzdEVudW0gPSB7fSkpO1xuLyoqXG4gKlxuICovXG52YXIgQ29uZmVyZW5jZVJvbGVzRW51bTtcbihmdW5jdGlvbiAoQ29uZmVyZW5jZVJvbGVzRW51bSkge1xuICAgIENvbmZlcmVuY2VSb2xlc0VudW1bXCJDbGllbnRcIl0gPSBcIkNMSUVOVFwiO1xuICAgIENvbmZlcmVuY2VSb2xlc0VudW1bXCJTcGVjaWFsaXN0XCJdID0gXCJTUEVDSUFMSVNUXCI7XG59KShDb25mZXJlbmNlUm9sZXNFbnVtID0gZXhwb3J0cy5Db25mZXJlbmNlUm9sZXNFbnVtIHx8IChleHBvcnRzLkNvbmZlcmVuY2VSb2xlc0VudW0gPSB7fSkpO1xuLyoqXG4gKlxuICovXG52YXIgQ29uZmVyZW5jZVN0YXR1c2VzRW51bTtcbihmdW5jdGlvbiAoQ29uZmVyZW5jZVN0YXR1c2VzRW51bSkge1xuICAgIENvbmZlcmVuY2VTdGF0dXNlc0VudW1bXCJQZW5kaW5nXCJdID0gXCJwZW5kaW5nXCI7XG4gICAgQ29uZmVyZW5jZVN0YXR1c2VzRW51bVtcIk9wZW5Gb3JKb2luaW5nXCJdID0gXCJvcGVuX2Zvcl9qb2luaW5nXCI7XG4gICAgQ29uZmVyZW5jZVN0YXR1c2VzRW51bVtcIlN0YXJ0ZWRcIl0gPSBcInN0YXJ0ZWRcIjtcbiAgICBDb25mZXJlbmNlU3RhdHVzZXNFbnVtW1wiU3RhcnRlZEFuZFdhaXRpbmdcIl0gPSBcInN0YXJ0ZWRfYW5kX3dhaXRpbmdcIjtcbiAgICBDb25mZXJlbmNlU3RhdHVzZXNFbnVtW1wiU3RhcnRlZEFuZFBhdXNlZFwiXSA9IFwic3RhcnRlZF9hbmRfcGF1c2VkXCI7XG4gICAgQ29uZmVyZW5jZVN0YXR1c2VzRW51bVtcIkNhbmNlbGxlZEJlZm9yZVN0YXJ0XCJdID0gXCJjYW5jZWxsZWRfYmVmb3JlX3N0YXJ0XCI7XG4gICAgQ29uZmVyZW5jZVN0YXR1c2VzRW51bVtcIkNhbmNlbGxlZEFmdGVyU3RhcnRcIl0gPSBcImNhbmNlbGxlZF9hZnRlcl9zdGFydFwiO1xuICAgIENvbmZlcmVuY2VTdGF0dXNlc0VudW1bXCJGaW5pc2hlZFwiXSA9IFwiZmluaXNoZWRcIjsgLy8g0LfQsNCy0LXRgNGI0LXQvdCwXG59KShDb25mZXJlbmNlU3RhdHVzZXNFbnVtID0gZXhwb3J0cy5Db25mZXJlbmNlU3RhdHVzZXNFbnVtIHx8IChleHBvcnRzLkNvbmZlcmVuY2VTdGF0dXNlc0VudW0gPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNvbmZlcmVuY2UgPSB2b2lkIDA7XG52YXIgY29uZmVyZW5jZSA9IHJlcXVpcmUoXCIuL2NvbmZlcmVuY2VcIik7XG5leHBvcnRzLmNvbmZlcmVuY2UgPSBjb25mZXJlbmNlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKlxuTWVkTWUgQ29uZmVyZW5jZSBVWCBsb2dpY1xuICovXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy50aW1lciA9IGV4cG9ydHMuY3JlYXRlU2NyZWVuID0gZXhwb3J0cy5fbWFrZTR4eFNjcmVlbiA9IGV4cG9ydHMuY3JlYXRlU3BlY2lhbGlzdEhlbHBCbG9jayA9IGV4cG9ydHMuY3JlYXRlTGFuZ3VhZ2VzQmxvY2sgPSBleHBvcnRzLlNjcmVlbkVudW0gPSBleHBvcnRzLmNyZWF0ZUNvbmZlcmVuY2VJbmZvQmxvY2sgPSBleHBvcnRzLkJsb2NrRW51bSA9IHZvaWQgMDtcbnZhciBjb25mZXJlbmNlXzEgPSByZXF1aXJlKFwiLi90eXBlcy9jb25mZXJlbmNlXCIpO1xudmFyIGh0dHBSZXF1ZXN0XzEgPSByZXF1aXJlKFwiLi9odHRwUmVxdWVzdFwiKTtcbnZhciBzdGF0dXNlc18xID0gcmVxdWlyZShcIi4vc3RhdHVzZXNcIik7XG4vKipcbiAqINCR0LvQvtC60Lgg0LjQvdGC0LXRgNGE0LXQudGB0LAuXG4gKi9cbnZhciBCbG9ja0VudW07XG4oZnVuY3Rpb24gKEJsb2NrRW51bSkge1xuICAgIC8vINC/0LDQvdC10LvRjCDQtNC70Y8g0L/QtdGA0LXQutC70Y7Rh9C10L3QuNGPINGP0LfRi9C60L7QslxuICAgIEJsb2NrRW51bVtcIkxhbmd1YWdlc1wiXSA9IFwibGFuZ3NcIjtcbiAgICAvLyDQuNC90YTQvtGA0LzQsNGG0LjRjyDQv9C+INC60L7QvdGE0LXRgNC10L3RhtC40LhcbiAgICBCbG9ja0VudW1bXCJDb25mZXJlbmNlSW5mb1wiXSA9IFwiY29uZmVyZW5jZS1pbmZvXCI7XG4gICAgLy8gVUkg0LrQu9C40LXQvdGCIEppdHNpIE1lZXRcbiAgICBCbG9ja0VudW1bXCJKaXRzaU1lZXRcIl0gPSBcImppdHNpLW1lZXRcIjtcbiAgICAvLyDQmNC90YHRgtGA0YPQutGG0LjRjyDQtNC70Y8g0YHQv9C10YbQuNCw0LvQuNGB0YLQsFxuICAgIEJsb2NrRW51bVtcIlNwZWNpYWxpc3RIZWxwXCJdID0gXCJzcGVjaWFsaXN0LWhlbHBcIjtcbn0pKEJsb2NrRW51bSA9IGV4cG9ydHMuQmxvY2tFbnVtIHx8IChleHBvcnRzLkJsb2NrRW51bSA9IHt9KSk7XG4vKipcbiAqINCh0L7Qt9C00LDQtdGCINC4INCy0L7Qt9Cy0YDQsNGJ0LDQtdGCINCx0LvQvtC6INGBINC40L3RhNC+0YDQvNCw0YbQuNC10Lkg0L4g0L/RgNC40ZHQvNC1INC40YHRhdC+0LTRjyDQuNC3INC00LDQvdC90YvRhSDQuNC3IEFQSSwg0L/QtdGA0LXQtNCw0L3QvdGL0YUg0LIg0LrQsNGH0LXRgdGC0LLQtSDQv9Cw0YDQsNC80LXRgtGA0L7Qsi5cbiAqIEBwYXJhbSB1c2VyUm9sZVxuICogQHBhcmFtIGNvbmZJbmZvXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUNvbmZlcmVuY2VJbmZvQmxvY2sodXNlclJvbGUsIGNvbmZJbmZvKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdXNlclJvbGU6IHVzZXJSb2xlLFxuICAgICAgICBmaW5pc2hQYXVzZUNvbnRyb2w6IHVzZXJSb2xlID09PSBjb25mZXJlbmNlXzEuQ29uZmVyZW5jZVJvbGVzRW51bS5TcGVjaWFsaXN0ICYmXG4gICAgICAgICAgICBjb25mSW5mby5zdGF0dXMgPT09IGNvbmZlcmVuY2VfMS5Db25mZXJlbmNlU3RhdHVzZXNFbnVtLlN0YXJ0ZWQsXG4gICAgICAgIGxlYXZlQ2xpZW50Q29udHJvbDogdXNlclJvbGUgPT09IGNvbmZlcmVuY2VfMS5Db25mZXJlbmNlUm9sZXNFbnVtLkNsaWVudCAmJlxuICAgICAgICAgICAgKGNvbmZJbmZvLnN0YXR1cyA9PT0gY29uZmVyZW5jZV8xLkNvbmZlcmVuY2VTdGF0dXNlc0VudW0uU3RhcnRlZCB8fFxuICAgICAgICAgICAgICAgIGNvbmZJbmZvLnN0YXR1cyA9PT0gY29uZmVyZW5jZV8xLkNvbmZlcmVuY2VTdGF0dXNlc0VudW0uU3RhcnRlZEFuZFdhaXRpbmcgfHxcbiAgICAgICAgICAgICAgICBjb25mSW5mby5zdGF0dXMgPT09IGNvbmZlcmVuY2VfMS5Db25mZXJlbmNlU3RhdHVzZXNFbnVtLlN0YXJ0ZWRBbmRQYXVzZWQpLFxuICAgICAgICBzaG93UmVhbFRpbWVzOiAoXG4gICAgICAgIC8vIGNvbmZJbmZvLnN0YXR1cyA9PT0gQ29uZmVyZW5jZVN0YXR1c2VzRW51bS5DYW5jZWxsZWRBZnRlclN0YXJ0IHx8XG4gICAgICAgIC8vIGNvbmZJbmZvLnN0YXR1cyA9PT0gQ29uZmVyZW5jZVN0YXR1c2VzRW51bS5DYW5jZWxsZWRCZWZvcmVTdGFydCB8fFxuICAgICAgICBjb25mSW5mby5zdGF0dXMgPT09IGNvbmZlcmVuY2VfMS5Db25mZXJlbmNlU3RhdHVzZXNFbnVtLkZpbmlzaGVkKSxcbiAgICAgICAgY29uZmVyZW5jZTogY29uZkluZm9cbiAgICB9O1xufVxuZXhwb3J0cy5jcmVhdGVDb25mZXJlbmNlSW5mb0Jsb2NrID0gY3JlYXRlQ29uZmVyZW5jZUluZm9CbG9jaztcbi8qXG4gKiDQodGC0YDQsNC90LjRhtGLINC40L3RgtC10YDRhNC10LnRgdCwXG4gKi9cbnZhciBTY3JlZW5FbnVtO1xuKGZ1bmN0aW9uIChTY3JlZW5FbnVtKSB7XG4gICAgLy8g0J7RiNC40LHQutCwIFwi0LrQvtC90YTQtdGA0LXQvdGG0LjRjyDQvdC1INC90LDQudC00LXQvdCwXCJcbiAgICBTY3JlZW5FbnVtW1wiXzR4eFwiXSA9IFwiNHh4XCI7XG4gICAgLy8g0J7QttC40LTQsNC90LjQtSDQvdCw0YfQsNC70LAg0L/RgNC40ZHQvNCwINC60LvQuNC10L3RgtC+0LxcbiAgICBTY3JlZW5FbnVtW1wiUGVuZGluZ0NsaWVudFwiXSA9IFwicGVuZGluZy1jbGllbnRcIjtcbiAgICAvLyDQntC20LjQtNCw0L3QuNC1INC90LDRh9Cw0LvQsCDQv9GA0LjRkdC80LAg0YHQv9C10YbQuNCw0LvQuNGB0YLQvtC8XG4gICAgU2NyZWVuRW51bVtcIlBlbmRpbmdTcGVjaWFsaXN0XCJdID0gXCJwZW5kaW5nLXNwZWNpYWxpc3RcIjtcbiAgICAvLyDQodGC0YDQsNC90LjRhtCwINC/0YDQuNGB0L7QtdC00LjQvdC10L3QuNGPINC60L7QvdGE0LXRgNC10L3RhtC40Lgg0LrQu9C40LXQvdGC0L7QvFxuICAgIFNjcmVlbkVudW1bXCJKb2luQ2xpZW50XCJdID0gXCJqb2luLWNsaWVudFwiO1xuICAgIC8vINCh0YLRgNCw0L3QuNGG0LAg0L/RgNC40YHQvtC10LTQuNC90LXQvdC40Y8g0LrQvtC90YTQtdGA0LXQvdGG0LjQuCDRgdC/0LXRhtC40LDQu9C40YHRgtC+0LxcbiAgICBTY3JlZW5FbnVtW1wiSm9pblNwZWNpYWxpc3RcIl0gPSBcImpvaW4tc3BlY2lhbGlzdFwiO1xuICAgIC8vINCa0L7QvdGE0LXRgNC10L3RhtC40Y8g0L7RgtC80LXQvdC10L3QsCDQtNC+INC90LDRh9Cw0LvQsCDQv9GA0LjRkdC80LBcbiAgICBTY3JlZW5FbnVtW1wiQ2FuY2VsbGVkXCJdID0gXCJjYW5jZWxsZWRcIjtcbiAgICAvLyDQmtC+0L3RhNC10YDQtdC90YbQuNGPINC30LDQstC10YDRiNC10L3QsFxuICAgIFNjcmVlbkVudW1bXCJGaW5pc2hcIl0gPSBcImZpbmlzaFwiO1xuICAgIC8vINCa0L7QvdGE0LXRgNC10L3RhtC40Y8g0LIg0L/RgNC+0YbQtdGB0YHQtVxuICAgIFNjcmVlbkVudW1bXCJTdGFydGVkXCJdID0gXCJzdGFydGVkXCI7XG59KShTY3JlZW5FbnVtID0gZXhwb3J0cy5TY3JlZW5FbnVtIHx8IChleHBvcnRzLlNjcmVlbkVudW0gPSB7fSkpO1xuLy8gVE9ETyBMb2FkIGxhbmd1YWdlcyBmcm9tIGNvbmZlcmVuY2UgaW5mb1xuZnVuY3Rpb24gY3JlYXRlTGFuZ3VhZ2VzQmxvY2soKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogQmxvY2tFbnVtLkxhbmd1YWdlcyxcbiAgICAgICAgY3VycmVudExhbmd1YWdlOiBjb25mZXJlbmNlXzEuTGFuZ3VhZ2VMaXN0RW51bS5SVV9SVSxcbiAgICAgICAgYXZhaWxhYmxlTGFuZ3VhZ2VzOiBbY29uZmVyZW5jZV8xLkxhbmd1YWdlTGlzdEVudW0uUlVfUlUsIGNvbmZlcmVuY2VfMS5MYW5ndWFnZUxpc3RFbnVtLkVOX1VTXVxuICAgIH07XG59XG5leHBvcnRzLmNyZWF0ZUxhbmd1YWdlc0Jsb2NrID0gY3JlYXRlTGFuZ3VhZ2VzQmxvY2s7XG5mdW5jdGlvbiBjcmVhdGVTcGVjaWFsaXN0SGVscEJsb2NrKHVzZXJSb2xlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogQmxvY2tFbnVtLlNwZWNpYWxpc3RIZWxwLFxuICAgICAgICB1c2VyUm9sZTogdXNlclJvbGVcbiAgICB9O1xufVxuZXhwb3J0cy5jcmVhdGVTcGVjaWFsaXN0SGVscEJsb2NrID0gY3JlYXRlU3BlY2lhbGlzdEhlbHBCbG9jaztcbmZ1bmN0aW9uIF9tYWtlNHh4U2NyZWVuKHN0YXR1cykge1xuICAgIGNvbnNvbGUuYXNzZXJ0KHN0YXR1cyA9PT0gNDAxIHx8IHN0YXR1cyA9PT0gNDA0KTtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBTY3JlZW5FbnVtLl80eHgsXG4gICAgICAgIGF2YWlsYWJsZUJsb2NrczogW0Jsb2NrRW51bS5MYW5ndWFnZXNdLFxuICAgICAgICBsYW5nQmxvY2s6IGNyZWF0ZUxhbmd1YWdlc0Jsb2NrKCksXG4gICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgfTtcbn1cbmV4cG9ydHMuX21ha2U0eHhTY3JlZW4gPSBfbWFrZTR4eFNjcmVlbjtcbi8qKlxuICog0KHQvtC30LTQsNGR0YIg0L7QsdGK0LXQutGCINC60LvQsNGB0YHQsCBVWCwg0L/QvtC80LXRgdGC0LjQsiDRgtGD0LTQsCDQtNCw0L3QvdGL0LUsINC/0L7Qu9GD0YfQtdC90L3Ri9C1INC40LcgQVBJLlxuICogQHBhcmFtIGFwaVxuICogQHBhcmFtIGF0XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVNjcmVlbihhcGksIGF0KSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZXhjaGFuZ2VSZXMsIGNvbmZSZXMsIGR1cmF0aW9ucywgZXJyXzE7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIGlmICghYXQpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgX21ha2U0eHhTY3JlZW4oNDA0KV07XG4gICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMSwgNSwgLCA2XSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGFwaS5leGNoYW5nZShhdCldO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgZXhjaGFuZ2VSZXMgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGFwaS5nZXRDb25mZXJlbmNlSW5mbyhhdCldO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgY29uZlJlcyA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgYXBpLmR1cmF0aW9ucyhhdCldO1xuICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb25zID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgY3JlYXRlQ29uZmVyZW5jZVNjcmVlbihhcGksIGNvbmZSZXMucm9sZSwgY29uZlJlcy5jb25mZXJlbmNlX2luZm8sIGF0LCBleGNoYW5nZVJlcy5jb25mZXJlbmNlX3Rva2VuLCBjb25mUmVzLnVzZXJfaWQsIGR1cmF0aW9ucyldO1xuICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgZXJyXzEgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJfMSBpbnN0YW5jZW9mIGh0dHBSZXF1ZXN0XzEuQVBJRXJyb3IgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXNlc18xLkVycm9yU3RhdHVzZXMuVW5hdXRob3JpemVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1c2VzXzEuRXJyb3JTdGF0dXNlcy5FeHBpcmVkVG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzZXNfMS5FcnJvclN0YXR1c2VzLkV4cGVjdENvbmZlcmVuY2VUb2tlbixcbiAgICAgICAgICAgICAgICAgICAgICAgIF0uaW5kZXhPZihlcnJfMS5yZXNwb25zZS5zdGF0dXMpID49IDApXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgX21ha2U0eHhTY3JlZW4oNDAxKV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJfMSBpbnN0YW5jZW9mIGh0dHBSZXF1ZXN0XzEuQVBJRXJyb3IgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXNlc18xLkVycm9yU3RhdHVzZXMuQWNjZXNzVG9rZW5Ob3RGb3VuZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXNlc18xLkVycm9yU3RhdHVzZXMuRXhwZWN0QWNjZXNzVG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICBdLmluZGV4T2YoZXJyXzEucmVzcG9uc2Uuc3RhdHVzKSA+PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9tYWtlNHh4U2NyZWVuKDQwNCldO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJfMTtcbiAgICAgICAgICAgICAgICBjYXNlIDY6IHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5leHBvcnRzLmNyZWF0ZVNjcmVlbiA9IGNyZWF0ZVNjcmVlbjtcbi8qKlxuICog0JLQtdGA0L3Rg9GC0Ywg0YLQtdC60YPRidGD0Y4g0YHRgtGA0LDQvdC40YbRgyDQutC+0L3RhNC10YDQtdC90YbQuNC4INCyINC30LDQstC40YHQuNC80L7RgdGC0Lgg0L7RgiDRgdGC0LDRgtGD0YHQsCDQutC+0L3RhNC10YDQtdC90YbQuNC4INC4INGA0L7Qu9C4INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRj1xuICovXG5mdW5jdGlvbiBjcmVhdGVDb25mZXJlbmNlU2NyZWVuKGFwaSwgdXNlclJvbGUsIGNvbmZJbmZvLCBhdCwgY29uZlRva2VuLCB1c2VySWQsIGR1cmF0aW9ucykge1xuICAgIGlmICh1c2VyUm9sZSA9PT0gY29uZmVyZW5jZV8xLkNvbmZlcmVuY2VSb2xlc0VudW0uQ2xpZW50ICYmXG4gICAgICAgIGNvbmZJbmZvLnN0YXR1cyA9PT0gY29uZmVyZW5jZV8xLkNvbmZlcmVuY2VTdGF0dXNlc0VudW0uUGVuZGluZylcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWU6IFNjcmVlbkVudW0uUGVuZGluZ0NsaWVudCxcbiAgICAgICAgICAgIGF2YWlsYWJsZUJsb2NrczogW0Jsb2NrRW51bS5Db25mZXJlbmNlSW5mb10sXG4gICAgICAgICAgICB1c2VyUm9sZTogY29uZmVyZW5jZV8xLkNvbmZlcmVuY2VSb2xlc0VudW0uQ2xpZW50LFxuICAgICAgICAgICAgY29uZmVyZW5jZTogY29uZkluZm8sXG4gICAgICAgICAgICBjb25mSW5mb0Jsb2NrOiBjcmVhdGVDb25mZXJlbmNlSW5mb0Jsb2NrKHVzZXJSb2xlLCBjb25mSW5mbylcbiAgICAgICAgfTtcbiAgICBpZiAodXNlclJvbGUgPT09IGNvbmZlcmVuY2VfMS5Db25mZXJlbmNlUm9sZXNFbnVtLlNwZWNpYWxpc3QgJiZcbiAgICAgICAgY29uZkluZm8uc3RhdHVzID09PSBjb25mZXJlbmNlXzEuQ29uZmVyZW5jZVN0YXR1c2VzRW51bS5QZW5kaW5nKVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZTogU2NyZWVuRW51bS5QZW5kaW5nU3BlY2lhbGlzdCxcbiAgICAgICAgICAgIGF2YWlsYWJsZUJsb2NrczogW10sXG4gICAgICAgICAgICB1c2VyUm9sZTogY29uZmVyZW5jZV8xLkNvbmZlcmVuY2VSb2xlc0VudW0uU3BlY2lhbGlzdCxcbiAgICAgICAgICAgIGNvbmZlcmVuY2U6IGNvbmZJbmZvLFxuICAgICAgICAgICAgY29uZkluZm9CbG9jazogY3JlYXRlQ29uZmVyZW5jZUluZm9CbG9jayh1c2VyUm9sZSwgY29uZkluZm8pLFxuICAgICAgICB9O1xuICAgIGlmICh1c2VyUm9sZSA9PT0gY29uZmVyZW5jZV8xLkNvbmZlcmVuY2VSb2xlc0VudW0uQ2xpZW50ICYmIChjb25mSW5mby5zdGF0dXMgPT09IGNvbmZlcmVuY2VfMS5Db25mZXJlbmNlU3RhdHVzZXNFbnVtLk9wZW5Gb3JKb2luaW5nIHx8XG4gICAgICAgIFtcbiAgICAgICAgICAgIGNvbmZlcmVuY2VfMS5Db25mZXJlbmNlU3RhdHVzZXNFbnVtLlN0YXJ0ZWQsXG4gICAgICAgICAgICBjb25mZXJlbmNlXzEuQ29uZmVyZW5jZVN0YXR1c2VzRW51bS5TdGFydGVkQW5kUGF1c2VkLFxuICAgICAgICAgICAgY29uZmVyZW5jZV8xLkNvbmZlcmVuY2VTdGF0dXNlc0VudW0uU3RhcnRlZEFuZFdhaXRpbmdcbiAgICAgICAgXS5pbmRleE9mKGNvbmZJbmZvLnN0YXR1cykgPj0gMCAmJiAhY29uZkluZm8uam9pbmVkQ2xpZW50cy5maW5kKGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiBpdGVtLmlkID09PSB1c2VySWQ7IH0pKSlcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWU6IFNjcmVlbkVudW0uSm9pbkNsaWVudCxcbiAgICAgICAgICAgIGF2YWlsYWJsZUJsb2NrczogW10sXG4gICAgICAgICAgICB1c2VyUm9sZTogY29uZmVyZW5jZV8xLkNvbmZlcmVuY2VSb2xlc0VudW0uQ2xpZW50LFxuICAgICAgICAgICAgY29uZmVyZW5jZTogY29uZkluZm8sXG4gICAgICAgICAgICBjb25mSW5mb0Jsb2NrOiBjcmVhdGVDb25mZXJlbmNlSW5mb0Jsb2NrKHVzZXJSb2xlLCBjb25mSW5mbyksXG4gICAgICAgIH07XG4gICAgaWYgKHVzZXJSb2xlID09PSBjb25mZXJlbmNlXzEuQ29uZmVyZW5jZVJvbGVzRW51bS5TcGVjaWFsaXN0ICYmIChjb25mSW5mby5zdGF0dXMgPT09IGNvbmZlcmVuY2VfMS5Db25mZXJlbmNlU3RhdHVzZXNFbnVtLk9wZW5Gb3JKb2luaW5nIHx8XG4gICAgICAgIFtcbiAgICAgICAgICAgIGNvbmZlcmVuY2VfMS5Db25mZXJlbmNlU3RhdHVzZXNFbnVtLlN0YXJ0ZWQsXG4gICAgICAgICAgICBjb25mZXJlbmNlXzEuQ29uZmVyZW5jZVN0YXR1c2VzRW51bS5TdGFydGVkQW5kUGF1c2VkLFxuICAgICAgICAgICAgY29uZmVyZW5jZV8xLkNvbmZlcmVuY2VTdGF0dXNlc0VudW0uU3RhcnRlZEFuZFdhaXRpbmdcbiAgICAgICAgXS5pbmRleE9mKGNvbmZJbmZvLnN0YXR1cykgPj0gMCAmJiAhY29uZkluZm8uam9pbmVkU3BlY2lhbGlzdHMuZmluZChmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gaXRlbS5pZCA9PT0gdXNlcklkOyB9KSkpXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiBTY3JlZW5FbnVtLkpvaW5TcGVjaWFsaXN0LFxuICAgICAgICAgICAgYXZhaWxhYmxlQmxvY2tzOiBbXSxcbiAgICAgICAgICAgIHVzZXJSb2xlOiBjb25mZXJlbmNlXzEuQ29uZmVyZW5jZVJvbGVzRW51bS5TcGVjaWFsaXN0LFxuICAgICAgICAgICAgY29uZmVyZW5jZTogY29uZkluZm8sXG4gICAgICAgICAgICBjb25mSW5mb0Jsb2NrOiBjcmVhdGVDb25mZXJlbmNlSW5mb0Jsb2NrKHVzZXJSb2xlLCBjb25mSW5mbyksXG4gICAgICAgIH07XG4gICAgaWYgKGNvbmZJbmZvLnN0YXR1cyA9PT0gY29uZmVyZW5jZV8xLkNvbmZlcmVuY2VTdGF0dXNlc0VudW0uQ2FuY2VsbGVkQmVmb3JlU3RhcnQpXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiBTY3JlZW5FbnVtLkNhbmNlbGxlZCxcbiAgICAgICAgICAgIGF2YWlsYWJsZUJsb2NrczogW10sXG4gICAgICAgICAgICB1c2VyUm9sZTogdXNlclJvbGUsXG4gICAgICAgICAgICBjb25mZXJlbmNlOiBjb25mSW5mbyxcbiAgICAgICAgICAgIGNvbmZJbmZvQmxvY2s6IGNyZWF0ZUNvbmZlcmVuY2VJbmZvQmxvY2sodXNlclJvbGUsIGNvbmZJbmZvKSxcbiAgICAgICAgICAgIHNob3dDbGllbnRIaW50OiB1c2VyUm9sZSA9PT0gY29uZmVyZW5jZV8xLkNvbmZlcmVuY2VSb2xlc0VudW0uQ2xpZW50LFxuICAgICAgICAgICAgcmVzdG9yZUNvbnRyb2xzOiB1c2VyUm9sZSA9PT0gY29uZmVyZW5jZV8xLkNvbmZlcmVuY2VSb2xlc0VudW0uU3BlY2lhbGlzdCxcbiAgICAgICAgICAgIGNhblJlc3RvcmU6IGFwaS5jYW5SZXN0b3JlKGNvbmZJbmZvKSxcbiAgICAgICAgICAgIHRpbWVyQmxvY2s6IGR1cmF0aW9uc1xuICAgICAgICB9O1xuICAgIGlmIChjb25mSW5mby5zdGF0dXMgPT09IGNvbmZlcmVuY2VfMS5Db25mZXJlbmNlU3RhdHVzZXNFbnVtLkNhbmNlbGxlZEFmdGVyU3RhcnQgfHxcbiAgICAgICAgY29uZkluZm8uc3RhdHVzID09PSBjb25mZXJlbmNlXzEuQ29uZmVyZW5jZVN0YXR1c2VzRW51bS5GaW5pc2hlZClcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWU6IFNjcmVlbkVudW0uRmluaXNoLFxuICAgICAgICAgICAgYXZhaWxhYmxlQmxvY2tzOiBbXSxcbiAgICAgICAgICAgIHVzZXJSb2xlOiB1c2VyUm9sZSxcbiAgICAgICAgICAgIGNvbmZlcmVuY2U6IGNvbmZJbmZvLFxuICAgICAgICAgICAgY29uZkluZm9CbG9jazogY3JlYXRlQ29uZmVyZW5jZUluZm9CbG9jayh1c2VyUm9sZSwgY29uZkluZm8pLFxuICAgICAgICAgICAgcmVzdG9yZUNvbnRyb2xzOiB1c2VyUm9sZSA9PT0gY29uZmVyZW5jZV8xLkNvbmZlcmVuY2VSb2xlc0VudW0uU3BlY2lhbGlzdCxcbiAgICAgICAgICAgIGNhblJlc3RvcmU6IGFwaS5jYW5SZXN0b3JlKGNvbmZJbmZvKSxcbiAgICAgICAgICAgIHRpbWVyQmxvY2s6IGR1cmF0aW9uc1xuICAgICAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IFNjcmVlbkVudW0uU3RhcnRlZCxcbiAgICAgICAgdXNlclJvbGU6IHVzZXJSb2xlLFxuICAgICAgICBhdmFpbGFibGVCbG9ja3M6IFtCbG9ja0VudW0uQ29uZmVyZW5jZUluZm9dLFxuICAgICAgICBjb25mZXJlbmNlOiBjb25mSW5mbyxcbiAgICAgICAgdXNlcklkOiB1c2VySWQsXG4gICAgICAgIGNvbmZlcmVuY2VUb2tlbjogY29uZlRva2VuLFxuICAgICAgICBhY2Nlc3NUb2tlbjogYXQsXG4gICAgICAgIGxhbmdCbG9jazogY3JlYXRlTGFuZ3VhZ2VzQmxvY2soKSxcbiAgICAgICAgY29uZkluZm9CbG9jazogY3JlYXRlQ29uZmVyZW5jZUluZm9CbG9jayh1c2VyUm9sZSwgY29uZkluZm8pLFxuICAgICAgICBzcGVjaWFsaXN0SGVscEJsb2NrOiBjcmVhdGVTcGVjaWFsaXN0SGVscEJsb2NrKHVzZXJSb2xlKSxcbiAgICAgICAgaml0c2lNZWV0QmxvY2s6IHtcbiAgICAgICAgICAgIHR5cGU6IEJsb2NrRW51bS5KaXRzaU1lZXQsXG4gICAgICAgICAgICBjb25mZXJlbmNlVG9rZW46IGNvbmZUb2tlbixcbiAgICAgICAgICAgIHN1YmplY3Q6ICfQn9C10YDQstC40YfQvdGL0Lkg0L/RgNC40LXQvCwg0JLRgi4gMTIg0JzQsNGALiAyMDIwLCAxMjo0NScsXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ9CS0YDQsNGHINC/0LXQtNC40LDRgtGALCDQkNC70LXQutGB0LDQvdC00YAg0JjQstCw0L3QvtCy0LjRhyDQodC40L3QuNGG0YvQvScsXG4gICAgICAgIH0sXG4gICAgICAgIHRpbWVyQmxvY2s6IGR1cmF0aW9uc1xuICAgIH07XG59XG5mdW5jdGlvbiB0aW1lcihjb25mSW5mbywgdGltZXIpIHtcbiAgICB2YXIgZmlyc3RVcGRhdGVOb3dTZWNvbmRzO1xuICAgIHZhciBjb25mZXJlbmNlU2NoZWR1bGVkRHVyYXRpb25TZWNvbmRzO1xuICAgIHZhciBuZXREdXJhdGlvblNlY29uZHM7XG4gICAgZmlyc3RVcGRhdGVOb3dTZWNvbmRzID0gRGF0ZS5ub3coKSAvIDEwMDA7XG4gICAgY29uZmVyZW5jZVNjaGVkdWxlZER1cmF0aW9uU2Vjb25kcyA9IGNvbmZJbmZvLnNjaGVkdWxlZER1cmF0aW9uU2Vjb25kcztcbiAgICB2YXIgZGVsdGEgPSAoRGF0ZS5ub3coKSAtIG5ldyBEYXRlKHRpbWVyLm5vdykuZ2V0VGltZSgpKSAvIDEwMDA7XG4gICAgbmV0RHVyYXRpb25TZWNvbmRzID0gdGltZXIubmV0RHVyYXRpb25TZWNvbmRzICsgZGVsdGE7XG4gICAgdmFyIHRvdGFsUmVtYWluU2Vjb25kcyA9IDA7XG4gICAgdmFyIGhvdXJzID0gMDtcbiAgICB2YXIgbWludXRlcyA9IDA7XG4gICAgdmFyIHNlY29uZHMgPSAwO1xuICAgIHZhciB0aW1lckRlbGF5ID0gMTAwMDtcbiAgICB2YXIgdXBkYXRlVGltZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG5vdyA9IERhdGUubm93KCkgLyAxMDAwO1xuICAgICAgICB2YXIgZGVsdGFTZWNvbmRzID0gbm93IC0gZmlyc3RVcGRhdGVOb3dTZWNvbmRzO1xuICAgICAgICB0b3RhbFJlbWFpblNlY29uZHMgPSBNYXRoLm1heCgwLCBjb25mZXJlbmNlU2NoZWR1bGVkRHVyYXRpb25TZWNvbmRzIC0gZGVsdGFTZWNvbmRzIC0gbmV0RHVyYXRpb25TZWNvbmRzKTtcbiAgICAgICAgaG91cnMgPSBNYXRoLmZsb29yKHRvdGFsUmVtYWluU2Vjb25kcyAvIDM2MDApO1xuICAgICAgICB2YXIgbmV3TWludXRlcyA9IE1hdGguZmxvb3IodG90YWxSZW1haW5TZWNvbmRzIC8gNjApICUgNjA7XG4gICAgICAgIC8vINC10YHQu9C4INC30L3QsNGH0LXQvdC40LUg0LzQuNC90YPRgiDQvdC1INC/0L7QvNC10L3Rj9C70L7RgdGMLCDRgtC+INC40LfQvNC10L3Rj9C10Lwg0LIg0YHQu9C10LTRg9GO0YnQuNC5INGA0LDQtyDRh9C10YDQtdC3IDEwMCDQvNGBXG4gICAgICAgIGlmIChuZXdNaW51dGVzID09PSBtaW51dGVzKVxuICAgICAgICAgICAgdGltZXJEZWxheSA9IDEwMDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGltZXJEZWxheSA9IDEwMDA7XG4gICAgICAgIG1pbnV0ZXMgPSBuZXdNaW51dGVzO1xuICAgICAgICBzZWNvbmRzID0gTWF0aC5mbG9vcih0b3RhbFJlbWFpblNlY29uZHMgJSA2MCk7XG4gICAgfTtcbiAgICB2YXIgX3RoaXMgPSB7XG4gICAgICAgIHVwZGF0ZVRpbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHVwZGF0ZVRpbWUoKTtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5nZXRDdXJyZW50KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldEN1cnJlbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaG91cnM6IGhvdXJzLFxuICAgICAgICAgICAgICAgIG1pbnV0ZXM6IG1pbnV0ZXMsXG4gICAgICAgICAgICAgICAgc2Vjb25kczogc2Vjb25kcyxcbiAgICAgICAgICAgICAgICB0aW1lckRlbGF5OiB0aW1lckRlbGF5LFxuICAgICAgICAgICAgICAgIHRvdGFsUmVtYWluU2Vjb25kczogdG90YWxSZW1haW5TZWNvbmRzXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gX3RoaXM7XG59XG5leHBvcnRzLnRpbWVyID0gdGltZXI7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLy88YW1kLW1vZHVsZSBuYW1lPVwiTWVkTWVcIiAvPlxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0V2ViU29ja2V0QVBJID0gZXhwb3J0cy5pbml0SHR0cEFQSSA9IGV4cG9ydHMuY29uZmVyZW5jZVdlYlNvY2tldEFQSSA9IGV4cG9ydHMuY29uZmVyZW5jZUFjY2Vzc0FQSSA9IGV4cG9ydHMuY29uZmVyZW5jZU1vZGlmeUFQSSA9IGV4cG9ydHMuVVggPSBleHBvcnRzLnNvY2sgPSBleHBvcnRzLnR5cGVzID0gZXhwb3J0cy5zdGF0dXNlcyA9IGV4cG9ydHMucmVxdWVzdCA9IGV4cG9ydHMuZW52ID0gZXhwb3J0cy5saWIgPSB2b2lkIDA7XG52YXIgbGliID0gcmVxdWlyZShcIi4vbWVkbWUvbGliL2luZGV4XCIpO1xuZXhwb3J0cy5saWIgPSBsaWI7XG52YXIgZW52ID0gcmVxdWlyZShcIi4vbWVkbWUvZW52XCIpO1xuZXhwb3J0cy5lbnYgPSBlbnY7XG52YXIgcmVxdWVzdCA9IHJlcXVpcmUoXCIuL21lZG1lL2xpYi9odHRwUmVxdWVzdFwiKTtcbmV4cG9ydHMucmVxdWVzdCA9IHJlcXVlc3Q7XG52YXIgc3RhdHVzZXMgPSByZXF1aXJlKFwiLi9tZWRtZS9saWIvc3RhdHVzZXNcIik7XG5leHBvcnRzLnN0YXR1c2VzID0gc3RhdHVzZXM7XG52YXIgdHlwZXMgPSByZXF1aXJlKFwiLi9tZWRtZS9saWIvdHlwZXMvaW5kZXhcIik7XG5leHBvcnRzLnR5cGVzID0gdHlwZXM7XG52YXIgc29jayA9IHJlcXVpcmUoXCIuL21lZG1lL2xpYi9zb2NrXCIpO1xuZXhwb3J0cy5zb2NrID0gc29jaztcbnZhciBVWCA9IHJlcXVpcmUoXCIuL21lZG1lL2xpYi91eFwiKTtcbmV4cG9ydHMuVVggPSBVWDtcbnZhciBzb2NrXzEgPSByZXF1aXJlKFwiLi9tZWRtZS9saWIvc29ja1wiKTtcbmV4cG9ydHMuZGVmYXVsdCA9IGxpYjtcbmZ1bmN0aW9uIGluaXRIdHRwQVBJKCkge1xuICAgIGV4cG9ydHMuY29uZmVyZW5jZU1vZGlmeUFQSSA9IGxpYi5Db25mZXJlbmNlTW9kaWZ5QVBJLmNyZWF0ZUh0dHBBUEkoZW52LkNPTkZFUkVOQ0VfRU5EUE9JTlQpO1xuICAgIGV4cG9ydHMuY29uZmVyZW5jZUFjY2Vzc0FQSSA9IGxpYi5Db25mZXJlbmNlQWNjZXNzQVBJLmNyZWF0ZUh0dHBBUEkoZW52LkNPTkZFUkVOQ0VfRU5EUE9JTlQpO1xufVxuZXhwb3J0cy5pbml0SHR0cEFQSSA9IGluaXRIdHRwQVBJO1xuZnVuY3Rpb24gaW5pdFdlYlNvY2tldEFQSSgpIHtcbiAgICBleHBvcnRzLmNvbmZlcmVuY2VXZWJTb2NrZXRBUEkgPSBuZXcgc29ja18xLkNvbmZlcmVuY2VTb2NrKGVudi5DT05GRVJFTkNFX1dTX0VORFBPSU5UKTtcbn1cbmV4cG9ydHMuaW5pdFdlYlNvY2tldEFQSSA9IGluaXRXZWJTb2NrZXRBUEk7XG4iXSwic291cmNlUm9vdCI6IiJ9