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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./httpRequest", "./time"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConferenceAccessAPI = exports.RestoreFastDelayMinutes = exports.ConferenceModifyAPI = void 0;
    var httpRequest_1 = require("./httpRequest");
    var time_1 = require("./time");
    var ConferenceModifyAPI = (function () {
        function ConferenceModifyAPI(apiRequest) {
            this.apiRequest = apiRequest;
        }
        ConferenceModifyAPI.createHttpAPI = function (baseUrl) {
            var reqOwner = {
                baseUrl: baseUrl,
                httpMethod: httpRequest_1.HttpMethodsAPIMap
            };
            return new ConferenceModifyAPI(httpRequest_1.httpAPIRequest.bind(reqOwner));
        };
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
                    return [2, this.apiRequest('create', params)];
                });
            });
        };
        ConferenceModifyAPI.prototype.move = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2];
                });
            });
        };
        ConferenceModifyAPI.prototype.resize = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2];
                });
            });
        };
        ConferenceModifyAPI.prototype.updateInfo = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2];
                });
            });
        };
        return ConferenceModifyAPI;
    }());
    exports.ConferenceModifyAPI = ConferenceModifyAPI;
    exports.RestoreFastDelayMinutes = 3;
    var ConferenceAccessAPI = (function () {
        function ConferenceAccessAPI(apiRequest) {
            this.apiRequest = apiRequest;
        }
        ConferenceAccessAPI.createHttpAPI = function (baseUrl) {
            var reqOwner = {
                baseUrl: baseUrl,
                httpMethod: httpRequest_1.HttpMethodsAPIMap
            };
            return new ConferenceAccessAPI(httpRequest_1.httpAPIRequest.bind(reqOwner));
        };
        ConferenceAccessAPI.prototype.exchange = function (accessToken) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2, this.apiRequest('exchange', { access_token: accessToken })];
                });
            });
        };
        ConferenceAccessAPI.prototype.otpSend = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2];
                });
            });
        };
        ConferenceAccessAPI.prototype.otpVerify = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2];
                });
            });
        };
        ConferenceAccessAPI.prototype.getConferenceInfo = function (accessToken) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2, this.apiRequest('info', { access_token: accessToken })];
                });
            });
        };
        ConferenceAccessAPI.prototype.openForJoin = function (accessToken) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2, this.apiRequest('open_for_join', {
                            access_token: accessToken
                        })];
                });
            });
        };
        ConferenceAccessAPI.prototype.join = function (accessToken) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2, this.apiRequest('join', {
                            access_token: accessToken
                        })];
                });
            });
        };
        ConferenceAccessAPI.prototype.leave = function (accessToken) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2, this.apiRequest('leave', {
                            access_token: accessToken
                        })];
                });
            });
        };
        ConferenceAccessAPI.prototype.finish = function (accessToken) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2, this.apiRequest('finish', {
                            access_token: accessToken
                        })];
                });
            });
        };
        ConferenceAccessAPI.prototype.cancel = function (accessToken) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2, this.apiRequest('cancel', {
                            access_token: accessToken
                        })];
                });
            });
        };
        ConferenceAccessAPI.prototype.pause = function (accessToken) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2, this.apiRequest('pause', {
                            access_token: accessToken
                        })];
                });
            });
        };
        ConferenceAccessAPI.prototype.resume = function (accessToken) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2, this.apiRequest('resume', {
                            access_token: accessToken
                        })];
                });
            });
        };
        ConferenceAccessAPI.prototype.restoreTerminatedFast = function (accessToken) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2, this.apiRequest('restore_terminated_fast', {
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
                    return [2, this.apiRequest('durations', {
                            access_token: accessToken
                        })];
                });
            });
        };
        return ConferenceAccessAPI;
    }());
    exports.ConferenceAccessAPI = ConferenceAccessAPI;
});
