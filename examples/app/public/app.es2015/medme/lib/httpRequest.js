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
import { fetch } from 'cross-fetch';
import { SuccessStatus } from "./statuses";
import { REQUEST_DEBUG } from "../env";
var APIError = (function (_super) {
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
export { APIError };
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
export var HttpMethodsForAPIEnum;
(function (HttpMethodsForAPIEnum) {
    HttpMethodsForAPIEnum["Get"] = "GET";
    HttpMethodsForAPIEnum["Post"] = "POST";
})(HttpMethodsForAPIEnum || (HttpMethodsForAPIEnum = {}));
export var HttpMethodsAPIMap = {
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
export function httpAPIRequest(method, params) {
    return __awaiter(this, void 0, void 0, function () {
        var thisIsCorrect, httpMethod;
        return __generator(this, function (_a) {
            thisIsCorrect = this && typeof this.baseUrl === 'string' && typeof this.httpMethod === 'object';
            if (!thisIsCorrect)
                throw new TypeError('http api request should be bind to IHttpAPIRequestOwner instance [method=' +
                    method + ', params=' + JSON.stringify(params) + ']');
            httpMethod = this.httpMethod[method];
            return [2, httpAPIRequest_(httpMethod, this.baseUrl + '/' + method +
                    ((httpMethod === HttpMethodsForAPIEnum.Get) && params ? '?' + new URLSearchParams(params) : ''), (httpMethod === HttpMethodsForAPIEnum.Post ? params : {}))];
        });
    });
}
export function httpAPIRequest_(httpMethod, endpoint, params) {
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
                    REQUEST_DEBUG && console.debug('<-- [' + new Date().toISOString() + '] ' + endpoint);
                    if (httpMethod === 'POST') {
                        jsonRequest = JSON.stringify(params);
                        REQUEST_DEBUG && console.debug('    ' + jsonRequest);
                        opts.body = jsonRequest;
                    }
                    return [4, fetch(endpoint, opts)];
                case 1:
                    res = _a.sent();
                    return [4, res.text()];
                case 2:
                    text = _a.sent();
                    REQUEST_DEBUG && console.debug('--> [' + new Date().toISOString() + '] ' + res.status);
                    REQUEST_DEBUG && console.debug('    ' + text);
                    handleAPIError(res, text);
                    apiRes = JSON.parse(text);
                    if (apiRes.status !== SuccessStatus)
                        throw new APIError("APIError with 2** HTTP status code and text " + text, apiRes);
                    return [2, apiRes];
            }
        });
    });
}
//# sourceMappingURL=httpRequest.js.map