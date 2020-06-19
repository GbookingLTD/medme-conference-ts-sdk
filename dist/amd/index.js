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
define("medme/lib/statuses", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ErrorStatuses = exports.SuccessStatusEnum = exports.SuccessStatus = void 0;
    exports.SuccessStatus = 'OK';
    var SuccessStatusEnum;
    (function (SuccessStatusEnum) {
        SuccessStatusEnum["SuccessStatus"] = "OK";
    })(SuccessStatusEnum = exports.SuccessStatusEnum || (exports.SuccessStatusEnum = {}));
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
    })(ErrorStatuses = exports.ErrorStatuses || (exports.ErrorStatuses = {}));
});
define("medme/env", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.REQUEST_DEBUG = exports.APIKEY = exports.CONFERENCE_ENDPOINT = void 0;
    exports.CONFERENCE_ENDPOINT = "http://localhost:3000/meets/v1";
    exports.APIKEY = "dfghdshrqweo5y23984wdrty5e3w4q";
    exports.REQUEST_DEBUG = true;
});
define("medme/lib/request", ["require", "exports", "cross-fetch", "medme/lib/statuses", "medme/env"], function (require, exports, cross_fetch_1, statuses_1, env_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.apiRequest = exports.APIError = void 0;
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
    exports.APIError = APIError;
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
    function apiRequest(httpMethod, endpoint, params) {
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
                        return [4, cross_fetch_1.fetch(endpoint, opts)];
                    case 1:
                        res = _a.sent();
                        return [4, res.text()];
                    case 2:
                        text = _a.sent();
                        env_1.REQUEST_DEBUG && console.debug('--> [' + new Date().toISOString() + '] ' + res.status);
                        env_1.REQUEST_DEBUG && console.debug('    ' + text);
                        handleAPIError(res, text);
                        apiRes = JSON.parse(text);
                        if (apiRes.status !== statuses_1.SuccessStatus)
                            throw new APIError("APIError with 2** HTTP status code and text " + text, apiRes);
                        return [2, apiRes];
                }
            });
        });
    }
    exports.apiRequest = apiRequest;
});
define("medme/lib/types/conference", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConferenceStatusesEnum = exports.ConferenceRolesEnum = exports.LanguageListEnum = exports.AppointmentEnginesEnum = void 0;
    var AppointmentEnginesEnum;
    (function (AppointmentEnginesEnum) {
        AppointmentEnginesEnum["GBooking"] = "GBooking";
    })(AppointmentEnginesEnum = exports.AppointmentEnginesEnum || (exports.AppointmentEnginesEnum = {}));
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
    var ConferenceRolesEnum;
    (function (ConferenceRolesEnum) {
        ConferenceRolesEnum["Client"] = "CLIENT";
        ConferenceRolesEnum["Specialist"] = "SPECIALIST";
    })(ConferenceRolesEnum = exports.ConferenceRolesEnum || (exports.ConferenceRolesEnum = {}));
    var ConferenceStatusesEnum;
    (function (ConferenceStatusesEnum) {
        ConferenceStatusesEnum["Pending"] = "pending";
        ConferenceStatusesEnum["OpenForJoining"] = "open_for_joining";
        ConferenceStatusesEnum["Started"] = "started";
        ConferenceStatusesEnum["StartedAndWaiting"] = "started_and_waiting";
        ConferenceStatusesEnum["StartedAndPaused"] = "started_and_paused";
        ConferenceStatusesEnum["CancelledBeforeStart"] = "cancelled_before_start";
        ConferenceStatusesEnum["CancelledAfterStart"] = "cancelled_after_start";
        ConferenceStatusesEnum["Finished"] = "finished";
    })(ConferenceStatusesEnum = exports.ConferenceStatusesEnum || (exports.ConferenceStatusesEnum = {}));
});
define("medme/lib/index", ["require", "exports", "medme/lib/request"], function (require, exports, request_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConferenceAccessAPI = exports.ConferenceModifyAPI = void 0;
    var ConferenceModifyAPI = (function () {
        function ConferenceModifyAPI(baseUrl) {
            this.baseUrl = baseUrl;
        }
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
                    return [2, request_1.apiRequest('POST', this.baseUrl + '/create', params)];
                });
            });
        };
        ConferenceModifyAPI.prototype.openForJoin = function (accessToken) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2, request_1.apiRequest('POST', this.baseUrl + '/open_for_join', {
                            access_token: accessToken
                        })];
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
    var ConferenceAccessAPI = (function () {
        function ConferenceAccessAPI(baseUrl) {
            this.baseUrl = baseUrl;
        }
        ConferenceAccessAPI.prototype.exchange = function (accessToken) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2, request_1.apiRequest('POST', this.baseUrl + '/exchange', { access_token: accessToken })];
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
                var urlParams;
                return __generator(this, function (_a) {
                    urlParams = new URLSearchParams({ access_token: accessToken });
                    return [2, request_1.apiRequest('GET', this.baseUrl + '/info?' + urlParams)];
                });
            });
        };
        ConferenceAccessAPI.prototype.openForJoining = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2];
                });
            });
        };
        return ConferenceAccessAPI;
    }());
    exports.ConferenceAccessAPI = ConferenceAccessAPI;
});
define("medme/lib/types/index", ["require", "exports", "medme/lib/types/conference"], function (require, exports, conference) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.conference = void 0;
    exports.conference = conference;
});
define("MedMe", ["require", "exports", "medme/lib/index", "medme/env", "medme/lib/request", "medme/lib/statuses", "medme/lib/types/index"], function (require, exports, lib, env, request, statuses, types) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.conferenceAccessAPI = exports.conferenceModifyAPI = exports.types = exports.statuses = exports.request = exports.env = void 0;
    exports.env = env;
    exports.request = request;
    exports.statuses = statuses;
    exports.types = types;
    exports.default = lib;
    exports.conferenceModifyAPI = new lib.ConferenceModifyAPI(env.CONFERENCE_ENDPOINT);
    exports.conferenceAccessAPI = new lib.ConferenceAccessAPI(env.CONFERENCE_ENDPOINT);
});
