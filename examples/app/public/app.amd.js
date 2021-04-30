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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
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
        ErrorStatuses["RestoreFastTimedOut"] = "RESTORE_FAST_TIMED_OUT";
    })(ErrorStatuses = exports.ErrorStatuses || (exports.ErrorStatuses = {}));
});
define("medme/env", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.JITSI_BOTH = exports.JITSI_MUC = exports.JITSI_DOMAIN = exports.REQUEST_DEBUG = exports.APIKEY = exports.CONFERENCE_WS_ENDPOINT = exports.CONFERENCE_ENDPOINT = void 0;
    exports.CONFERENCE_ENDPOINT = "http://apiv2.gbooking.ru/meets/v1";
    exports.CONFERENCE_WS_ENDPOINT = "wss://apiv2.gbooking.ru/meets/v1/ws";
    exports.APIKEY = "[:: Api_KEy ::]";
    exports.REQUEST_DEBUG = true;
    exports.JITSI_DOMAIN = "jitsi.mmconf.net";
    exports.JITSI_MUC = "conference.jitsi.mmconf.net";
    exports.JITSI_BOTH = "https://jitsi.mmconf.net/http-bind";
});
define("medme/lib/httpRequest", ["require", "exports", "cross-fetch", "medme/lib/statuses", "medme/env"], function (require, exports, cross_fetch_1, statuses_1, env_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.httpAPIRequest_ = exports.httpAPIRequest = exports.HttpMethodsAPIMap = exports.HttpMethodsForAPIEnum = exports.APIError = void 0;
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
                return [2, httpAPIRequest_(httpMethod, this.baseUrl + '/' + method +
                        ((httpMethod === HttpMethodsForAPIEnum.Get) && params ? '?' + new URLSearchParams(params) : ''), (httpMethod === HttpMethodsForAPIEnum.Post ? params : {}))];
            });
        });
    }
    exports.httpAPIRequest = httpAPIRequest;
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
    exports.httpAPIRequest_ = httpAPIRequest_;
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
define("medme/lib/time", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TimeMs = void 0;
    var MinuteMs = 60 * 1000;
    var TimeMs = (function () {
        function TimeMs() {
        }
        TimeMs.Minute = MinuteMs;
        TimeMs.Hour = 60 * TimeMs.Minute;
        TimeMs.Day = 24 * TimeMs.Hour;
        TimeMs.Week = 24 * TimeMs.Day;
        return TimeMs;
    }());
    exports.TimeMs = TimeMs;
});
define("medme/lib/index", ["require", "exports", "medme/lib/httpRequest", "medme/lib/time"], function (require, exports, httpRequest_1, time_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConferenceAccessAPI = exports.RestoreFastDelayMinutes = exports.ConferenceModifyAPI = void 0;
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
define("medme/lib/types/index", ["require", "exports", "medme/lib/types/conference"], function (require, exports, conference) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.conference = void 0;
    conference = __importStar(conference);
    exports.conference = conference;
});
define("medme/lib/sock", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConferenceSock = void 0;
    var ConferenceSock = (function () {
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
});
define("medme/lang/date-time-en", [], {
    "formatFull": "dd. DD MMM YYYY, H:mm",
    "formatTimeShort": "HH:mm",
    "formatDurationAbbrev": ["d", "h", "min", "sec"]
});
define("medme/lang/en-en", [], {
    "document_title_prefix": "MedMe Meets | ",
    "conference_preload_text": "please wait...",
    "specialist": "specialist",
    "specialists": "specialists",
    "services": "services",
    "service": "service",
    "clients": "clients",
    "client": "client",
    "guest": "Guest",
    "help_link": "Help",
    "common": {
        "title": "Doctor's appointments online",
        "remained_duration": "remained",
        "real_start": "start time",
        "real_end": "end time"
    },
    "404": {
        "title": "not found"
    },
    "401": {
        "title": "access denied"
    },
    "pending_client": {
        "title": "The meeting hasn't started yet",
        "hint1": "We will send you an invitation 10 minutes before the reception starts",
        "hint2": "Please stay in touch at this time.",
        "conf_info_link": "information about meeting"
    },
    "pending_specialist": {
        "title": "The meeting hasn't started yet",
        "button": "Invite a client to an appointment",
        "button_open": "Open meet",
        "cancel_button": "Cancel the appointment",
        "hint1": "Participants of the video conference will be able to log in to it",
        "hint2": "If you or a client can't make an appointment, you can cancel it",
        "conf_info_link": "information about meeting"
    },
    "join_client": {
        "title": "Join a video conference",
        "button": "Go to the reception",
        "hint": "Click to start an appointment with your specialist",
        "conf_info_link": "information about meeting"
    },
    "join_specialist": {
        "title": "Join a video conference",
        "button": "Join to the meeting",
        "hint": "Click to start a meeting with a client",
        "conf_info_link": "information about meeting"
    },
    "conference_info_block": {
        "title": "Information about this conference",
        "scheduled_start": "scheduled start time",
        "scheduled_duration": "scheduled duration",
        "real_duration": "duration",
        "specialist": "specialist",
        "specialists": "specialists",
        "services": "services",
        "service": "service",
        "clients": "clients",
        "client": "client",
        "cancelled_during_several_minutes": "The meeting will be completed automatically in the next few minutes",
        "finish_button": "Finish",
        "leave_meet": "Leave"
    },
    "finish_screen": {
        "title": "Meeting is already complete",
        "hint1": "You can restore meeting within 3 minutes by clicking the button",
        "restore_button": "To resume receiving",
        "conf_info_link": "information about meeting"
    },
    "pause_block": {
        "title": "Meeting on pause"
    },
    "cancelled_screen": {
        "title": "Meeting canceled",
        "client_hint0": "Your specialist may not be able to see you at this time. ",
        "client_hint1": "You can make an appointment online for a different time or with a different specialist.",
        "hint1": "You can restore meeting within 3 minutes by clicking the button",
        "restore_button": "Resume meeting",
        "conf_info_link": "information about meeting"
    }
});
define("medme/lang/en-medicine", [], {
    "document_title_prefix": "MedMe Meets | ",
    "conference_preload_text": "please wait...",
    "specialist": "doctor",
    "specialists": "doctors",
    "services": "services",
    "service": "service",
    "clients": "patients",
    "client": "patient",
    "guest": "Guest",
    "help_link": "Help",
    "common": {
        "title": "Doctor's appointments online",
        "remained_duration": "remained",
        "real_start": "start time",
        "real_end": "end time"
    },
    "404": {
        "title": "not found"
    },
    "401": {
        "title": "access denied"
    },
    "pending_client": {
        "title": "The meeting hasn't started yet",
        "hint1": "We will send you an invitation 10 minutes before the reception starts",
        "hint2": "Please stay in touch at this time.",
        "conf_info_link": "information about meeting"
    },
    "pending_specialist": {
        "title": "The meeting hasn't started yet",
        "button": "Invite a patient to an appointment",
        "button_open": "Open meet",
        "cancel_button": "Cancel the appointment",
        "hint1": "Participants of the video conference will be able to log in to it",
        "hint2": "If you or a client can't make an appointment, you can cancel it",
        "conf_info_link": "information about meeting"
    },
    "join_client": {
        "title": "Join a video conference",
        "button": "Go to the reception",
        "hint": "Click to start an appointment with your doctor",
        "conf_info_link": "information about meeting"
    },
    "join_specialist": {
        "title": "Join a video conference",
        "button": "Join to the meeting",
        "hint": "Click to start a meeting with a patient",
        "conf_info_link": "information about meeting"
    },
    "conference_info_block": {
        "title": "Information about this conference",
        "scheduled_start": "scheduled start time",
        "scheduled_duration": "scheduled duration",
        "real_duration": "duration",
        "specialist": "doctor",
        "specialists": "doctors",
        "services": "services",
        "service": "service",
        "clients": "patients",
        "client": "patient",
        "cancelled_during_several_minutes": "The meeting will be completed automatically in the next few minutes",
        "finish_button": "Finish",
        "leave_meet": "Leave"
    },
    "finish_screen": {
        "title": "Meeting is already complete",
        "hint1": "You can restore meeting within 3 minutes by clicking the button",
        "restore_button": "To resume receiving",
        "conf_info_link": "information about meeting"
    },
    "pause_block": {
        "title": "Meeting on pause"
    },
    "cancelled_screen": {
        "title": "Meeting canceled",
        "client_hint0": "Your doctor may not be able to see you at this time. ",
        "client_hint1": "You can make an appointment online for a different time or with a different specialist.",
        "hint1": "You can restore meeting within 3 minutes by clicking the button",
        "restore_button": "Resume meeting",
        "conf_info_link": "information about meeting"
    }
});
define("medme/lang/date-time-he", [], {
    "formatFull": "dd. DD MMM YYYY, H:mm",
    "formatTimeShort": "HH:mm",
    "formatDurationAbbrev": ["יום", "שעה", "דק'", "שנ'"]
});
define("medme/lang/he-he", [], {
    "document_title_prefix": "MedMe Meets | ",
    "conference_preload_text": "הפגישה בטעינה...",
    "specialist": "מטפל",
    "specialists": "מטפלים",
    "services": "שרותים",
    "service": "שרות",
    "clients": "מטופלים",
    "client": "מטופל",
    "guest": "אורח",
    "help_link": "Help",
    "common": {
        "title": "MedMe Meets",
        "remained_duration": "עד סוף המפגש נשאר",
        "real_start": "זמן התחלה",
        "real_end": "זמן סיום"
    },
    "404": {
        "title": "המפגש לא נמצא"
    },
    "401": {
        "title": "אין גישה"
    },
    "pending_client": {
        "title": "הפגישה טרם התחילה",
        "hint1": "תקבלו לינק למפגש 10 דק' לפני תחילתו",
        "hint2": "אנא תהיו זמינים",
        "conf_info_link": "מידע על המפגש"
    },
    "pending_specialist": {
        "title": "הפגישה טרם התחילה",
        "button": "להזמין מטופל למפגש",
        "button_open": "לפתוח פגישה",
        "cancel_button": "לבטל פגישה",
        "hint1": "למשתתפי המפגש תהיה אפשרות להתחבר",
        "hint2": "אם המטופל לא מצליח להתחבר ניתן לבטל את הפגישה",
        "conf_info_link": "מידע על המפגש"
    },
    "join_client": {
        "title": "להתחבר לפגישה",
        "button": "להיכנס לפגישה",
        "hint": "נא ללחוץ על מנת להתחיל",
        "conf_info_link": "מידע על המפגש"
    },
    "join_specialist": {
        "title": "להתחבר לפגישה",
        "button": "להיכנס לפגישה",
        "hint": "נא ללחוץ על מנת להתחיל",
        "conf_info_link": "מידע על המפגש"
    },
    "conference_info_block": {
        "title": "מידע על המפגש",
        "scheduled_start": "זמן התחלה מתוכנן",
        "scheduled_duration": "זמן סיום מתוכנן",
        "real_duration": "משך הפגיזה",
        "specialist": "מטפל",
        "specialists": "מטפלים",
        "services": "שרותים",
        "service": "שרות",
        "clients": "מטופלים",
        "client": "מטופל",
        "cancelled_during_several_minutes": "הפגישה תסתיים בעוד כמה דקות",
        "finish_button": "לסיים",
        "leave_meet": "לעזוב את הפגיזה"
    },
    "finish_screen": {
        "title": "הפגישה הסתיימה",
        "hint1": "אתם יכולים להתחבר לפגישה שנית במשך 3 דקות הקרובות על ידי לחיצה על כפתור",
        "restore_button": "לחדש פגישה",
        "conf_info_link": "מידע על הפגישה"
    },
    "pause_block": {
        "title": "הפגישה מעצרה"
    },
    "cancelled_screen": {
        "title": "הפגישה בוטלה",
        "client_hint0": "כנראה המטפל לא יכול לקבל אתכם כעת ",
        "client_hint1": "ניתן להירשם לזמן אחר",
        "hint1": " אתם יכולים להתחבר לפגישה שנית במשך 3 דקות הקרובות על ידי לחיצה על כפתור ",
        "restore_button": "לחדש פגישה",
        "conf_info_link": "מידע על המפגש"
    }
});
define("medme/lang/he-medicine", [], {
    "document_title_prefix": "MedMe Meets | ",
    "conference_preload_text": "הפגישה בטעינה...",
    "specialist": "מטפל",
    "specialists": "מטפלים",
    "services": "שרותים",
    "service": "שרות",
    "clients": "מטופלים",
    "client": "מטופל",
    "guest": "אורח",
    "help_link": "Help",
    "common": {
        "title": "MedMe Meets",
        "remained_duration": "עד סוף המפגש נשאר",
        "real_start": "זמן התחלה",
        "real_end": "זמן סיום"
    },
    "404": {
        "title": "המפגש לא נמצא"
    },
    "401": {
        "title": "אין גישה"
    },
    "pending_client": {
        "title": "הפגישה טרם התחילה",
        "hint1": "תקבלו לינק למפגש 10 דק' לפני תחילתו",
        "hint2": "אנא תהיו זמינים",
        "conf_info_link": "מידע על המפגש"
    },
    "pending_specialist": {
        "title": "הפגישה טרם התחילה",
        "button": "להזמין מטופל למפגש",
        "button_open": "לפתוח פגישה",
        "cancel_button": "לבטל פגישה",
        "hint1": "למשתתפי המפגש תהיה אפשרות להתחבר",
        "hint2": "אם המטופל לא מצליח להתחבר ניתן לבטל את הפגישה",
        "conf_info_link": "מידע על המפגש"
    },
    "join_client": {
        "title": "להתחבר לפגישה",
        "button": "להיכנס לפגישה",
        "hint": "נא ללחוץ על מנת להתחיל",
        "conf_info_link": "מידע על המפגש"
    },
    "join_specialist": {
        "title": "להתחבר לפגישה",
        "button": "להיכנס לפגישה",
        "hint": "נא ללחוץ על מנת להתחיל",
        "conf_info_link": "מידע על המפגש"
    },
    "conference_info_block": {
        "title": "מידע על המפגש",
        "scheduled_start": "זמן התחלה מתוכנן",
        "scheduled_duration": "זמן סיום מתוכנן",
        "real_duration": "משך הפגיזה",
        "specialist": "מטפל",
        "specialists": "מטפלים",
        "services": "שרותים",
        "service": "שרות",
        "clients": "מטופלים",
        "client": "מטופל",
        "cancelled_during_several_minutes": "הפגישה תסתיים בעוד כמה דקות",
        "finish_button": "לסיים",
        "leave_meet": "לעזוב את הפגיזה"
    },
    "finish_screen": {
        "title": "הפגישה הסתיימה",
        "hint1": "אתם יכולים להתחבר לפגישה שנית במשך 3 דקות הקרובות על ידי לחיצה על כפתור",
        "restore_button": "לחדש פגישה",
        "conf_info_link": "מידע על הפגישה"
    },
    "pause_block": {
        "title": "הפגישה מעצרה"
    },
    "cancelled_screen": {
        "title": "הפגישה בוטלה",
        "client_hint0": "כנראה המטפל לא יכול לקבל אתכם כעת ",
        "client_hint1": "ניתן להירשם לזמן אחר",
        "hint1": " אתם יכולים להתחבר לפגישה שנית במשך 3 דקות הקרובות על ידי לחיצה על כפתור ",
        "restore_button": "לחדש פגישה",
        "conf_info_link": "מידע על המפגש"
    }
});
define("medme/lang/date-time-ru", [], {
    "formatFull": "dd. DD MMM YYYY, H:mm",
    "formatTimeShort": "HH:mm",
    "formatDurationAbbrev": ["д", "ч", "мин", "сек"]
});
define("medme/lang/ru-ru", [], {
    "document_title_prefix": "MedMe Meets | ",
    "conference_preload_text": "идет подготовка...",
    "specialist": "специалист",
    "specialists": "специалисты",
    "services": "услуги",
    "service": "услуга",
    "clients": "клиенты",
    "client": "клиент",
    "guest": "Гость",
    "help_link": "Помощь",
    "common": {
        "title": "Приём к специалисту онлайн",
        "remained_duration": "осталось времени",
        "real_start": "время начала",
        "real_end": "время окончания"
    },
    "404": {
        "title": "приём не найден"
    },
    "401": {
        "title": "нет доступа"
    },
    "pending_client": {
        "title": "Приём ещё не начат",
        "hint1": "Мы вышлем вам приглашение за 10 минут до начала приёма.",
        "hint2": "Пожалуйста, будьте на связи в этот момент.",
        "conf_info_link": "информация о приёме"
    },
    "pending_specialist": {
        "title": "Приём ещё не начат",
        "button": "Пригласить клиента на приём",
        "button_open": "Открыть приём",
        "cancel_button": "Отменить приём",
        "hint1": "Участники видеоконференции получат возможность зайти на неё",
        "hint2": "Если у вас или клиента не получается прийти на приём, вы можете отменить его",
        "conf_info_link": "информация о приёме"
    },
    "join_client": {
        "title": "Присоединиться к видеоконференции",
        "button": "Зайти на приём",
        "hint": "Нажмите, чтобы начать встречу со специалистом",
        "conf_info_link": "информация о приёме"
    },
    "join_specialist": {
        "title": "Присоединиться к видеоконференции",
        "button": "Зайти на приём",
        "hint": "Нажмите, чтобы начать встречу с пациентом",
        "conf_info_link": "информация о приёме"
    },
    "conference_info_block": {
        "title": "Информация о приёме",
        "scheduled_start": "запланированное время начала",
        "scheduled_duration": "запланированная длительность",
        "real_duration": "длительность",
        "specialist": "специалист",
        "specialists": "специалисты",
        "services": "услуги",
        "service": "услуга",
        "clients": "клиенты",
        "client": "клиент",
        "cancelled_during_several_minutes": "Встреча будет завершена автоматически в ближайшие несколько минут",
        "finish_button": "Завершить",
        "leave_meet": "Покинуть приём"
    },
    "finish_screen": {
        "title": "Приём завершён",
        "hint1": "Вы можете восстановить приём в течение 3-x минут, нажав по кнопке",
        "restore_button": "Восстановить приём",
        "conf_info_link": "информация о приёме"
    },
    "pause_block": {
        "title": "Приём на паузе"
    },
    "cancelled_screen": {
        "title": "Приём отменён",
        "client_hint0": "Вероятно врач не может вас принять в это время. ",
        "client_hint1": "Вы можете записаться онлайн на другое время или к другому специалисту.",
        "hint1": "Вы можете восстановить приём в течение 3-x минут, нажав по кнопке",
        "restore_button": "Восстановить приём",
        "conf_info_link": "информация о приёме"
    }
});
define("medme/lang/ru-medicine", [], {
    "document_title_prefix": "MedMe Meets | ",
    "conference_preload_text": "идет подготовка...",
    "specialist": "врач",
    "specialists": "врачи",
    "services": "услуги",
    "service": "услуга",
    "clients": "пациенты",
    "client": "пациент",
    "guest": "Гость",
    "help_link": "Помощь",
    "common": {
        "title": "MedMe Meets",
        "remained_duration": "осталось времени",
        "real_start": "время начала",
        "real_end": "время окончания"
    },
    "404": {
        "title": "Приём не найден"
    },
    "401": {
        "title": "Нет доступа"
    },
    "pending_client": {
        "title": "Приём ещё не начат",
        "hint1": "Мы вышлем вам приглашение за 10 минут до начала приёма.",
        "hint2": "Пожалуйста, будьте на связи в этот момент.",
        "conf_info_link": "информация о приёме"
    },
    "pending_specialist": {
        "title": "Приём ещё не начат",
        "button": "Пригласить пациента на приём",
        "button_open": "Открыть приём",
        "cancel_button": "Отменить приём",
        "hint1": "Участники видеоконференции получат возможность зайти на неё",
        "hint2": "Если у вас или клиента не получается прийти на приём, вы можете отменить его",
        "conf_info_link": "информация о приёме"
    },
    "join_client": {
        "title": "Присоединиться к видеоконференции",
        "button": "Зайти на приём",
        "hint": "Нажмите, чтобы начать встречу с врачом",
        "conf_info_link": "информация о приёме"
    },
    "join_specialist": {
        "title": "Присоединиться к видеоконференции",
        "button": "Зайти на приём",
        "hint": "Нажмите, чтобы начать встречу с пациентом",
        "conf_info_link": "информация о приёме"
    },
    "conference_info_block": {
        "title": "Информация о приёме",
        "scheduled_start": "запланированное время начала",
        "scheduled_duration": "запланированная длительность",
        "real_duration": "длительность",
        "specialist": "врач",
        "specialists": "врачи",
        "services": "услуги",
        "service": "услуга",
        "clients": "пациенты",
        "client": "пациент",
        "cancelled_during_several_minutes": "Встреча будет завершена автоматически в ближайшие несколько минут",
        "finish_button": "Завершить",
        "leave_meet": "Покинуть приём"
    },
    "finish_screen": {
        "title": "Приём завершён",
        "hint1": "Вы можете восстановить приём в течение 3-x минут, нажав по кнопке",
        "restore_button": "Восстановить приём",
        "conf_info_link": "информация о приёме"
    },
    "pause_block": {
        "title": "Приём на паузе"
    },
    "cancelled_screen": {
        "title": "Приём отменён",
        "client_hint0": "Вероятно врач не может вас принять в это время. ",
        "client_hint1": "Вы можете записаться онлайн на другое время или к другому специалисту.",
        "hint1": "Вы можете восстановить приём в течение 3-x минут, нажав по кнопке",
        "restore_button": "Восстановить приём",
        "conf_info_link": "информация о приёме"
    }
});
define("medme/lang/lang-list", [], {
    "list": [
        {
            "key": "ru-ru",
            "alias": "Ru"
        },
        {
            "key": "en-en",
            "alias": "En"
        },
        {
            "key": "he-he",
            "alias": "He"
        }
    ]
});
define("medme/lang/index", ["require", "exports", "medme/lang/date-time-en", "medme/lang/en-en", "medme/lang/en-medicine", "medme/lang/date-time-he", "medme/lang/he-he", "medme/lang/he-medicine", "medme/lang/date-time-ru", "medme/lang/ru-ru", "medme/lang/ru-medicine", "medme/lang/lang-list"], function (require, exports, date_time_en_json_1, en_en_json_1, en_medicine_json_1, date_time_he_json_1, he_he_json_1, he_medicine_json_1, date_time_ru_json_1, ru_ru_json_1, ru_medicine_json_1, lang_list_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.l10n = void 0;
    date_time_en_json_1 = __importDefault(date_time_en_json_1);
    en_en_json_1 = __importDefault(en_en_json_1);
    en_medicine_json_1 = __importDefault(en_medicine_json_1);
    date_time_he_json_1 = __importDefault(date_time_he_json_1);
    he_he_json_1 = __importDefault(he_he_json_1);
    he_medicine_json_1 = __importDefault(he_medicine_json_1);
    date_time_ru_json_1 = __importDefault(date_time_ru_json_1);
    ru_ru_json_1 = __importDefault(ru_ru_json_1);
    ru_medicine_json_1 = __importDefault(ru_medicine_json_1);
    lang_list_json_1 = __importDefault(lang_list_json_1);
    exports.l10n = { ru: {}, he: {}, en: {} };
    exports.l10n.en.dateTime = date_time_en_json_1.default;
    exports.l10n.en.general = en_en_json_1.default;
    exports.l10n.en.medicine = en_medicine_json_1.default;
    exports.l10n.he.dateTime = date_time_he_json_1.default;
    exports.l10n.he.general = he_he_json_1.default;
    exports.l10n.he.medicine = he_medicine_json_1.default;
    exports.l10n.ru.dateTime = date_time_ru_json_1.default;
    exports.l10n.ru.general = ru_ru_json_1.default;
    exports.l10n.ru.medicine = ru_medicine_json_1.default;
    exports.l10n.langList = lang_list_json_1.default;
});
!function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.JitsiMeetExternalAPI = t() : e.JitsiMeetExternalAPI = t();
}(window, (function () {
    return function (e) {
        var t = {};
        function n(r) {
            if (t[r])
                return t[r].exports;
            var i = t[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return e[r].call(i.exports, i, i.exports, n),
                i.l = !0,
                i.exports;
        }
        return n.m = e,
            n.c = t,
            n.d = function (e, t, r) {
                n.o(e, t) || Object.defineProperty(e, t, {
                    enumerable: !0,
                    get: r
                });
            }
            ,
                n.r = function (e) {
                    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                        value: "Module"
                    }),
                        Object.defineProperty(e, "__esModule", {
                            value: !0
                        });
                }
            ,
                n.t = function (e, t) {
                    if (1 & t && (e = n(e)),
                        8 & t)
                        return e;
                    if (4 & t && "object" == typeof e && e && e.__esModule)
                        return e;
                    var r = Object.create(null);
                    if (n.r(r),
                        Object.defineProperty(r, "default", {
                            enumerable: !0,
                            value: e
                        }),
                        2 & t && "string" != typeof e)
                        for (var i in e)
                            n.d(r, i, function (t) {
                                return e[t];
                            }
                                .bind(null, i));
                    return r;
                }
            ,
                n.n = function (e) {
                    var t = e && e.__esModule ? function () {
                        return e.default;
                    }
                        : function () {
                            return e;
                        };
                    return n.d(t, "a", t),
                        t;
                }
            ,
                n.o = function (e, t) {
                    return Object.prototype.hasOwnProperty.call(e, t);
                }
            ,
                n.p = "/libs/",
            n(n.s = 6);
    }([function (e, t, n) {
            "use strict";
            (function (e) {
                n.d(t, "a", (function () {
                    return s;
                })),
                    n.d(t, "b", (function () {
                        return o;
                    })),
                    n.d(t, "c", (function () {
                        return a;
                    })),
                    n.d(t, "d", (function () {
                        return c;
                    })),
                    n.d(t, "e", (function () {
                        return l;
                    })),
                    n.d(t, "f", (function () {
                        return u;
                    })),
                    n.d(t, "g", (function () {
                        return h;
                    })),
                    n.d(t, "h", (function () {
                        return p;
                    }));
                var r = n(5);
                var i = n.n(r).a.getLogger(e);
                function s(e) {
                    return e.sendRequest({
                        type: "devices",
                        name: "getAvailableDevices"
                    }).catch(function (e) { return (i.error(e),
                        {}); });
                }
                function o(e) {
                    return e.sendRequest({
                        type: "devices",
                        name: "getCurrentDevices"
                    }).catch(function (e) { return (i.error(e),
                        {}); });
                }
                function a(e, t) {
                    return e.sendRequest({
                        deviceType: t,
                        type: "devices",
                        name: "isDeviceChangeAvailable"
                    });
                }
                function c(e) {
                    return e.sendRequest({
                        type: "devices",
                        name: "isDeviceListAvailable"
                    });
                }
                function l(e) {
                    return e.sendRequest({
                        type: "devices",
                        name: "isMultipleAudioInputSupported"
                    });
                }
                function u(e, t, n) {
                    return d(e, {
                        id: n,
                        kind: "audioinput",
                        label: t
                    });
                }
                function h(e, t, n) {
                    return d(e, {
                        id: n,
                        kind: "audiooutput",
                        label: t
                    });
                }
                function d(e, t) {
                    return e.sendRequest({
                        type: "devices",
                        name: "setDevice",
                        device: t
                    });
                }
                function p(e, t, n) {
                    return d(e, {
                        id: n,
                        kind: "videoinput",
                        label: t
                    });
                }
            }).call(this, "modules/API/external/functions.js");
        },
        function (e, t, n) {
            "use strict";
            var r, i = "object" == typeof Reflect ? Reflect : null, s = i && "function" == typeof i.apply ? i.apply : function (e, t, n) {
                return Function.prototype.apply.call(e, t, n);
            };
            r = i && "function" == typeof i.ownKeys ? i.ownKeys : Object.getOwnPropertySymbols ? function (e) {
                return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
            }
                : function (e) {
                    return Object.getOwnPropertyNames(e);
                };
            var o = Number.isNaN || function (e) {
                return e != e;
            };
            function a() {
                a.init.call(this);
            }
            e.exports = a,
                a.EventEmitter = a,
                a.prototype._events = void 0,
                a.prototype._eventsCount = 0,
                a.prototype._maxListeners = void 0;
            var c = 10;
            function l(e) {
                if ("function" != typeof e)
                    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
            }
            function u(e) {
                return void 0 === e._maxListeners ? a.defaultMaxListeners : e._maxListeners;
            }
            function h(e, t, n, r) {
                var i, s, o, a;
                if (l(n),
                    void 0 === (s = e._events) ? (s = e._events = Object.create(null),
                        e._eventsCount = 0) : (void 0 !== s.newListener && (e.emit("newListener", t, n.listener ? n.listener : n),
                        s = e._events),
                        o = s[t]),
                    void 0 === o)
                    o = s[t] = n,
                        ++e._eventsCount;
                else if ("function" == typeof o ? o = s[t] = r ? [n, o] : [o, n] : r ? o.unshift(n) : o.push(n),
                    (i = u(e)) > 0 && o.length > i && !o.warned) {
                    o.warned = !0;
                    var c = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
                    c.name = "MaxListenersExceededWarning",
                        c.emitter = e,
                        c.type = t,
                        c.count = o.length,
                        a = c,
                        console && console.warn && console.warn(a);
                }
                return e;
            }
            function d() {
                if (!this.fired)
                    return this.target.removeListener(this.type, this.wrapFn),
                        this.fired = !0,
                        0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
            }
            function p(e, t, n) {
                var r = {
                    fired: !1,
                    wrapFn: void 0,
                    target: e,
                    type: t,
                    listener: n
                }, i = d.bind(r);
                return i.listener = n,
                    r.wrapFn = i,
                    i;
            }
            function f(e, t, n) {
                var r = e._events;
                if (void 0 === r)
                    return [];
                var i = r[t];
                return void 0 === i ? [] : "function" == typeof i ? n ? [i.listener || i] : [i] : n ? function (e) {
                    for (var t = new Array(e.length), n = 0; n < t.length; ++n)
                        t[n] = e[n].listener || e[n];
                    return t;
                }(i) : m(i, i.length);
            }
            function g(e) {
                var t = this._events;
                if (void 0 !== t) {
                    var n = t[e];
                    if ("function" == typeof n)
                        return 1;
                    if (void 0 !== n)
                        return n.length;
                }
                return 0;
            }
            function m(e, t) {
                for (var n = new Array(t), r = 0; r < t; ++r)
                    n[r] = e[r];
                return n;
            }
            Object.defineProperty(a, "defaultMaxListeners", {
                enumerable: !0,
                get: function () {
                    return c;
                },
                set: function (e) {
                    if ("number" != typeof e || e < 0 || o(e))
                        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
                    c = e;
                }
            }),
                a.init = function () {
                    void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null),
                        this._eventsCount = 0),
                        this._maxListeners = this._maxListeners || void 0;
                }
                ,
                    a.prototype.setMaxListeners = function (e) {
                        if ("number" != typeof e || e < 0 || o(e))
                            throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
                        return this._maxListeners = e,
                            this;
                    }
                ,
                    a.prototype.getMaxListeners = function () {
                        return u(this);
                    }
                ,
                    a.prototype.emit = function (e) {
                        for (var t = [], n = 1; n < arguments.length; n++)
                            t.push(arguments[n]);
                        var r = "error" === e, i = this._events;
                        if (void 0 !== i)
                            r = r && void 0 === i.error;
                        else if (!r)
                            return !1;
                        if (r) {
                            var o;
                            if (t.length > 0 && (o = t[0]),
                                o instanceof Error)
                                throw o;
                            var a = new Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
                            throw a.context = o,
                                a;
                        }
                        var c = i[e];
                        if (void 0 === c)
                            return !1;
                        if ("function" == typeof c)
                            s(c, this, t);
                        else {
                            var l = c.length, u = m(c, l);
                            for (n = 0; n < l; ++n)
                                s(u[n], this, t);
                        }
                        return !0;
                    }
                ,
                    a.prototype.addListener = function (e, t) {
                        return h(this, e, t, !1);
                    }
                ,
                    a.prototype.on = a.prototype.addListener,
                a.prototype.prependListener = function (e, t) {
                    return h(this, e, t, !0);
                }
                ,
                    a.prototype.once = function (e, t) {
                        return l(t),
                            this.on(e, p(this, e, t)),
                            this;
                    }
                ,
                    a.prototype.prependOnceListener = function (e, t) {
                        return l(t),
                            this.prependListener(e, p(this, e, t)),
                            this;
                    }
                ,
                    a.prototype.removeListener = function (e, t) {
                        var n, r, i, s, o;
                        if (l(t),
                            void 0 === (r = this._events))
                            return this;
                        if (void 0 === (n = r[e]))
                            return this;
                        if (n === t || n.listener === t)
                            0 == --this._eventsCount ? this._events = Object.create(null) : (delete r[e],
                                r.removeListener && this.emit("removeListener", e, n.listener || t));
                        else if ("function" != typeof n) {
                            for (i = -1,
                                s = n.length - 1; s >= 0; s--)
                                if (n[s] === t || n[s].listener === t) {
                                    o = n[s].listener,
                                        i = s;
                                    break;
                                }
                            if (i < 0)
                                return this;
                            0 === i ? n.shift() : function (e, t) {
                                for (; t + 1 < e.length; t++)
                                    e[t] = e[t + 1];
                                e.pop();
                            }(n, i),
                                1 === n.length && (r[e] = n[0]),
                                void 0 !== r.removeListener && this.emit("removeListener", e, o || t);
                        }
                        return this;
                    }
                ,
                    a.prototype.off = a.prototype.removeListener,
                a.prototype.removeAllListeners = function (e) {
                    var t, n, r;
                    if (void 0 === (n = this._events))
                        return this;
                    if (void 0 === n.removeListener)
                        return 0 === arguments.length ? (this._events = Object.create(null),
                            this._eventsCount = 0) : void 0 !== n[e] && (0 == --this._eventsCount ? this._events = Object.create(null) : delete n[e]),
                            this;
                    if (0 === arguments.length) {
                        var i, s = Object.keys(n);
                        for (r = 0; r < s.length; ++r)
                            "removeListener" !== (i = s[r]) && this.removeAllListeners(i);
                        return this.removeAllListeners("removeListener"),
                            this._events = Object.create(null),
                            this._eventsCount = 0,
                            this;
                    }
                    if ("function" == typeof (t = n[e]))
                        this.removeListener(e, t);
                    else if (void 0 !== t)
                        for (r = t.length - 1; r >= 0; r--)
                            this.removeListener(e, t[r]);
                    return this;
                }
                ,
                    a.prototype.listeners = function (e) {
                        return f(this, e, !0);
                    }
                ,
                    a.prototype.rawListeners = function (e) {
                        return f(this, e, !1);
                    }
                ,
                    a.listenerCount = function (e, t) {
                        return "function" == typeof e.listenerCount ? e.listenerCount(t) : g.call(e, t);
                    }
                ,
                    a.prototype.listenerCount = g,
                a.prototype.eventNames = function () {
                    return this._eventsCount > 0 ? r(this._events) : [];
                };
        },
        function (e, t) {
            var n = {
                trace: 0,
                debug: 1,
                info: 2,
                log: 3,
                warn: 4,
                error: 5
            };
            a.consoleTransport = console;
            var r = [a.consoleTransport];
            a.addGlobalTransport = function (e) {
                -1 === r.indexOf(e) && r.push(e);
            }
                ,
                    a.removeGlobalTransport = function (e) {
                        var t = r.indexOf(e);
                        -1 !== t && r.splice(t, 1);
                    };
            var i = {};
            function s() {
                var e = {
                    methodName: "",
                    fileLocation: "",
                    line: null,
                    column: null
                }, t = new Error, n = t.stack ? t.stack.split("\n") : [];
                if (!n || n.length < 1)
                    return e;
                var r = null;
                return n[3] && (r = n[3].match(/\s*at\s*(.+?)\s*\((\S*)\s*:(\d*)\s*:(\d*)\)/)),
                    !r || r.length <= 4 ? (0 === n[2].indexOf("log@") ? e.methodName = n[3].substr(0, n[3].indexOf("@")) : e.methodName = n[2].substr(0, n[2].indexOf("@")),
                        e) : (e.methodName = r[1],
                        e.fileLocation = r[2],
                        e.line = r[3],
                        e.column = r[4],
                        e);
            }
            function o() {
                var e = arguments[0], t = arguments[1], o = Array.prototype.slice.call(arguments, 2);
                if (!(n[t] < e.level))
                    for (var a = !(e.options.disableCallerInfo || i.disableCallerInfo) && s(), c = r.concat(e.transports), l = 0; l < c.length; l++) {
                        var u = c[l], h = u[t];
                        if (h && "function" == typeof h) {
                            var d = [];
                            d.push((new Date).toISOString()),
                                e.id && d.push("[" + e.id + "]"),
                                a && a.methodName.length > 1 && d.push("<" + a.methodName + ">: ");
                            var p = d.concat(o);
                            h.bind(u).apply(u, p);
                        }
                    }
            }
            function a(e, t, r, i) {
                this.id = t,
                    this.options = i || {},
                    this.transports = r,
                    this.transports || (this.transports = []),
                    this.level = n[e];
                for (var s = Object.keys(n), a = 0; a < s.length; a++)
                    this[s[a]] = o.bind(null, this, s[a]);
            }
            a.setGlobalOptions = function (e) {
                i = e || {};
            }
                ,
                    a.prototype.setLevel = function (e) {
                        this.level = n[e];
                    }
                ,
                    e.exports = a,
                a.levels = {
                    TRACE: "trace",
                    DEBUG: "debug",
                    INFO: "info",
                    LOG: "log",
                    WARN: "warn",
                    ERROR: "error"
                };
        },
        function (e, t) {
            e.exports = function (e) {
                var t, n = e.scope, r = e.window, i = e.windowForEventListening || window, s = e.allowedOrigin, o = {}, a = [], c = {}, l = !1, u = function (e) {
                    var t;
                    try {
                        t = JSON.parse(e.data);
                    }
                    catch (e) {
                        return;
                    }
                    if ((!s || e.origin === s) && t.postis && t.scope === n) {
                        var r = o[t.method];
                        if (r)
                            for (var i = 0; i < r.length; i++)
                                r[i].call(null, t.params);
                        else
                            c[t.method] = c[t.method] || [],
                                c[t.method].push(t.params);
                    }
                };
                i.addEventListener("message", u, !1);
                var h = {
                    listen: function (e, t) {
                        o[e] = o[e] || [],
                            o[e].push(t);
                        var n = c[e];
                        if (n)
                            for (var r = o[e], i = 0; i < r.length; i++)
                                for (var s = 0; s < n.length; s++)
                                    r[i].call(null, n[s]);
                        delete c[e];
                    },
                    send: function (e) {
                        var t = e.method;
                        (l || "__ready__" === e.method) && r && "function" == typeof r.postMessage ? r.postMessage(JSON.stringify({
                            postis: !0,
                            scope: n,
                            method: t,
                            params: e.params
                        }), "*") : a.push(e);
                    },
                    ready: function (e) {
                        l ? e() : setTimeout((function () {
                            h.ready(e);
                        }), 50);
                    },
                    destroy: function (e) {
                        clearInterval(t),
                            l = !1,
                            i && "function" == typeof i.removeEventListener && i.removeEventListener("message", u),
                            e && e();
                    }
                }, d = +new Date + Math.random() + "";
                return t = setInterval((function () {
                    h.send({
                        method: "__ready__",
                        params: d
                    });
                }), 50),
                    h.listen("__ready__", (function (e) {
                        if (e === d) {
                            clearInterval(t),
                                l = !0;
                            for (var n = 0; n < a.length; n++)
                                h.send(a[n]);
                            a = [];
                        }
                        else
                            h.send({
                                method: "__ready__",
                                params: e
                            });
                    })),
                    h;
            };
        }, function (e) {
            e.exports = JSON.parse('{"google-auth":{"matchPatterns":{"url":"accounts.google.com"},"target":"electron"},"dropbox-auth":{"matchPatterns":{"url":"dropbox.com/oauth2/authorize"},"target":"electron"}}');
        }, function (e, t, n) {
            var r = n(2), i = n(7), s = {}, o = [], a = r.levels.TRACE;
            e.exports = {
                addGlobalTransport: function (e) {
                    r.addGlobalTransport(e);
                },
                removeGlobalTransport: function (e) {
                    r.removeGlobalTransport(e);
                },
                setGlobalOptions: function (e) {
                    r.setGlobalOptions(e);
                },
                getLogger: function (e, t, n) {
                    var i = new r(a, e, t, n);
                    return e ? (s[e] = s[e] || [],
                        s[e].push(i)) : o.push(i),
                        i;
                },
                setLogLevelById: function (e, t) {
                    for (var n = t ? s[t] || [] : o, r = 0; r < n.length; r++)
                        n[r].setLevel(e);
                },
                setLogLevel: function (e) {
                    a = e;
                    for (var t = 0; t < o.length; t++)
                        o[t].setLevel(e);
                    for (var n in s) {
                        var r = s[n] || [];
                        for (t = 0; t < r.length; t++)
                            r[t].setLevel(e);
                    }
                },
                levels: r.levels,
                LogCollector: i
            };
        }, function (e, t, n) {
            e.exports = n(8).default;
        }, function (e, t, n) {
            var r = n(2);
            function i(e, t) {
                this.logStorage = e,
                    this.stringifyObjects = !(!t || !t.stringifyObjects) && t.stringifyObjects,
                    this.storeInterval = t && t.storeInterval ? t.storeInterval : 3e4,
                    this.maxEntryLength = t && t.maxEntryLength ? t.maxEntryLength : 1e4,
                    Object.keys(r.levels).forEach(function (e) {
                        this[r.levels[e]] = function () {
                            this._log.apply(this, arguments);
                        }
                            .bind(this, e);
                    }
                        .bind(this)),
                    this.storeLogsIntervalID = null,
                    this.queue = [],
                    this.totalLen = 0,
                    this.outputCache = [];
            }
            i.prototype.stringify = function (e) {
                try {
                    return JSON.stringify(e);
                }
                catch (e) {
                    return "[object with circular refs?]";
                }
            }
                ,
                    i.prototype.formatLogMessage = function (e) {
                        for (var t = "", n = 1, i = arguments.length; n < i; n++) {
                            var s = arguments[n];
                            !this.stringifyObjects && e !== r.levels.ERROR || "object" != typeof s || (s = this.stringify(s)),
                                t += s,
                                n !== i - 1 && (t += " ");
                        }
                        return t.length ? t : null;
                    }
                ,
                    i.prototype._log = function () {
                        var e = arguments[1], t = this.formatLogMessage.apply(this, arguments);
                        if (t) {
                            var n = this.queue[this.queue.length - 1], r = n && n.text;
                            r === t ? n.count += 1 : (this.queue.push({
                                text: t,
                                timestamp: e,
                                count: 1
                            }),
                                this.totalLen += t.length);
                        }
                        this.totalLen >= this.maxEntryLength && this._flush(!0, !0);
                    }
                ,
                    i.prototype.start = function () {
                        this._reschedulePublishInterval();
                    }
                ,
                    i.prototype._reschedulePublishInterval = function () {
                        this.storeLogsIntervalID && (window.clearTimeout(this.storeLogsIntervalID),
                            this.storeLogsIntervalID = null),
                            this.storeLogsIntervalID = window.setTimeout(this._flush.bind(this, !1, !0), this.storeInterval);
                    }
                ,
                    i.prototype.flush = function () {
                        this._flush(!1, !0);
                    }
                ,
                    i.prototype._flush = function (e, t) {
                        this.totalLen > 0 && (this.logStorage.isReady() || e) && (this.logStorage.isReady() ? (this.outputCache.length && (this.outputCache.forEach(function (e) {
                            this.logStorage.storeLogs(e);
                        }
                            .bind(this)),
                            this.outputCache = []),
                            this.logStorage.storeLogs(this.queue)) : this.outputCache.push(this.queue),
                            this.queue = [],
                            this.totalLen = 0),
                            t && this._reschedulePublishInterval();
                    }
                ,
                    i.prototype.stop = function () {
                        this._flush(!1, !1);
                    }
                ,
                    e.exports = i;
        },
        function (e, t, n) {
            "use strict";
            n.r(t),
                n.d(t, "default", (function () {
                    return D;
                }));
            var r = n(1), i = n.n(r);
            var s = (function (_super) {
                __extends(s, _super);
                function s() {
                    var e = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        e[_i] = arguments[_i];
                    }
                    var _this = this;
                    var t, n, r;
                    _this = _super.apply(this, e) || this,
                        r = {},
                        (n = "_storage") in (t = _this) ? Object.defineProperty(t, n, {
                            value: r,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : t[n] = r;
                    return _this;
                }
                s.prototype.clear = function () {
                    this._storage = {};
                };
                Object.defineProperty(s.prototype, "length", {
                    get: function () {
                        return Object.keys(this._storage).length;
                    },
                    enumerable: false,
                    configurable: true
                });
                s.prototype.getItem = function (e) {
                    return this._storage[e];
                };
                s.prototype.setItem = function (e, t) {
                    this._storage[e] = t;
                };
                s.prototype.removeItem = function (e) {
                    delete this._storage[e];
                };
                s.prototype.key = function (e) {
                    var t = Object.keys(this._storage);
                    if (!(t.length <= e))
                        return t[e];
                };
                s.prototype.serialize = function () {
                    return JSON.stringify(this._storage);
                };
                return s;
            }(i.a));
            var o = (function (_super) {
                __extends(o, _super);
                function o() {
                    var _this = _super.call(this) || this;
                    try {
                        _this._storage = window.localStorage,
                            _this._localStorageDisabled = !1;
                    }
                    catch (e) { }
                    _this._storage || (console.warn("Local storage is disabled."),
                        _this._storage = new s,
                        _this._localStorageDisabled = !0);
                    return _this;
                }
                o.prototype.isLocalStorageDisabled = function () {
                    return this._localStorageDisabled;
                };
                o.prototype.clear = function () {
                    this._storage.clear(),
                        this.emit("changed");
                };
                Object.defineProperty(o.prototype, "length", {
                    get: function () {
                        return this._storage.length;
                    },
                    enumerable: false,
                    configurable: true
                });
                o.prototype.getItem = function (e) {
                    return this._storage.getItem(e);
                };
                o.prototype.setItem = function (e, t, n) {
                    if (n === void 0) { n = !1; }
                    this._storage.setItem(e, t),
                        n || this.emit("changed");
                };
                o.prototype.removeItem = function (e) {
                    this._storage.removeItem(e),
                        this.emit("changed");
                };
                o.prototype.key = function (e) {
                    return this._storage.key(e);
                };
                o.prototype.serialize = function () {
                    if (this.isLocalStorageDisabled)
                        return this._storage.serialize();
                    var e = this._storage.length, t = {};
                    for (var n_1 = 0; n_1 < e; n_1++) {
                        var e_1 = this._storage.key(n_1);
                        t[e_1] = this._storage.getItem(e_1);
                    }
                    return JSON.stringify(t);
                };
                return o;
            }(i.a));
            var a = new o;
            function c(e, t, n) {
                if (t === void 0) { t = !1; }
                if (n === void 0) { n = "hash"; }
                var r = "search" === n ? e.search : e.hash, i = {}, s = r && r.substr(1).split("&") || [];
                if ("hash" === n && 1 === s.length) {
                    var e_2 = s[0];
                    if (e_2.startsWith("/") && 1 === e_2.split("&").length)
                        return i;
                }
                return s.forEach(function (e) {
                    var n = e.split("="), r = n[0];
                    if (!r)
                        return;
                    var s;
                    try {
                        if (s = n[1],
                            !t) {
                            var e_3 = decodeURIComponent(s).replace(/\\&/, "&");
                            s = "undefined" === e_3 ? void 0 : JSON.parse(e_3);
                        }
                    }
                    catch (e) {
                        return void function (e, t) {
                            if (t === void 0) { t = ""; }
                            console.error(t, e),
                                window.onerror && window.onerror(t, null, null, null, e);
                        }(e, "Failed to parse URL parameter value: " + String(s));
                    }
                    i[r] = s;
                }),
                    i;
            }
            function l(e) {
                var t = new RegExp("^([a-z][a-z0-9\\.\\+-]*:)+", "gi"), n = t.exec(e);
                if (n) {
                    var r_1 = n[n.length - 1].toLowerCase();
                    "http:" !== r_1 && "https:" !== r_1 && (r_1 = "https:"),
                        (e = e.substring(t.lastIndex)).startsWith("//") && (e = r_1 + e);
                }
                return e;
            }
            function u(e) {
                if (e === void 0) { e = {}; }
                var t = [];
                for (var n_2 in e)
                    try {
                        t.push(n_2 + "=" + encodeURIComponent(JSON.stringify(e[n_2])));
                    }
                    catch (e) {
                        console.warn("Error encoding " + n_2 + ": " + e);
                    }
                return t;
            }
            function h(e) {
                var t = {
                    toString: d
                };
                var n, r, i;
                if (e = e.replace(/\s/g, ""),
                    n = new RegExp("^([a-z][a-z0-9\\.\\+-]*:)", "gi"),
                    r = n.exec(e),
                    r && (t.protocol = r[1].toLowerCase(),
                        e = e.substring(n.lastIndex)),
                    n = new RegExp("^(//[^/?#]+)", "gi"),
                    r = n.exec(e),
                    r) {
                    var i_1 = r[1].substring(2);
                    e = e.substring(n.lastIndex);
                    var s_1 = i_1.indexOf("@");
                    -1 !== s_1 && (i_1 = i_1.substring(s_1 + 1)),
                        t.host = i_1;
                    var o_1 = i_1.lastIndexOf(":");
                    -1 !== o_1 && (t.port = i_1.substring(o_1 + 1),
                        i_1 = i_1.substring(0, o_1)),
                        t.hostname = i_1;
                }
                if (n = new RegExp("^([^?#]*)", "gi"),
                    r = n.exec(e),
                    r && (i = r[1],
                        e = e.substring(n.lastIndex)),
                    i ? i.startsWith("/") || (i = "/" + i) : i = "/",
                    t.pathname = i,
                    e.startsWith("?")) {
                    var n_3 = e.indexOf("#", 1);
                    -1 === n_3 && (n_3 = e.length),
                        t.search = e.substring(0, n_3),
                        e = e.substring(n_3);
                }
                else
                    t.search = "";
                return t.hash = e.startsWith("#") ? e : "",
                    t;
            }
            function d(e) {
                var _a = e || this, t = _a.hash, n = _a.host, r = _a.pathname, i = _a.protocol, s = _a.search;
                var o = "";
                return i && (o += i),
                    n && (o += "//" + n),
                    o += r || "/",
                    s && (o += s),
                    t && (o += t),
                    o;
            }
            function p(e) {
                var t;
                t = e.serverURL && e.room ? new URL(e.room, e.serverURL).toString() : e.room ? e.room : e.url || "";
                var n = h(l(t));
                if (!n.protocol) {
                    var t_1 = e.protocol || e.scheme;
                    t_1 && (t_1.endsWith(":") || (t_1 += ":"),
                        n.protocol = t_1);
                }
                var r = n.pathname;
                if (!n.host) {
                    var t_2 = e.domain || e.host || e.hostname;
                    if (t_2) {
                        var _a = h(l("org.jitsi.meet://" + t_2)), e_4 = _a.host, i_2 = _a.hostname, s_2 = _a.pathname, o_2 = _a.port;
                        e_4 && (n.host = e_4,
                            n.hostname = i_2,
                            n.port = o_2),
                            "/" === r && "/" !== s_2 && (r = s_2);
                    }
                }
                var i = e.roomName || e.room;
                !i || !n.pathname.endsWith("/") && n.pathname.endsWith("/" + i) || (r.endsWith("/") || (r += "/"),
                    r += i),
                    n.pathname = r;
                var s = e.jwt;
                if (s) {
                    var e_5 = n.search;
                    -1 === e_5.indexOf("?jwt=") && -1 === e_5.indexOf("&jwt=") && (e_5.startsWith("?") || (e_5 = "?" + e_5),
                        1 === e_5.length || (e_5 += "&"),
                        e_5 += "jwt=" + s,
                        n.search = e_5);
                }
                var o = n.hash;
                for (var _i = 0, _b = ["config", "interfaceConfig", "devices", "userInfo", "appData"]; _i < _b.length; _i++) {
                    var t_3 = _b[_i];
                    var n_4 = u(e[t_3 + "Overwrite"] || e[t_3] || e[t_3 + "Override"]);
                    if (n_4.length) {
                        var e_6 = t_3 + "." + n_4.join("&" + t_3 + ".");
                        o.length ? e_6 = "&" + e_6 : o = "#",
                            o += e_6;
                    }
                }
                return n.hash = o,
                    n.toString() || void 0;
            }
            var f = n(3), g = n.n(f);
            function m(e, t, n) {
                return t in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n,
                    e;
            }
            var v = {
                window: window.opener || window.parent
            };
            var y = (function () {
                function y(_a) {
                    var _this = this;
                    var e = (_a === void 0 ? {} : _a).postisOptions;
                    this.postis = g()(function (e) {
                        for (var t = 1; t < arguments.length; t++) {
                            var n = null != arguments[t] ? arguments[t] : {}, r = Object.keys(n);
                            "function" == typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(n).filter((function (e) {
                                return Object.getOwnPropertyDescriptor(n, e).enumerable;
                            })))),
                                r.forEach((function (t) {
                                    m(e, t, n[t]);
                                }));
                        }
                        return e;
                    }({}, v, e)),
                        this._receiveCallback = function () { }
                        ,
                            this.postis.listen("message", function (e) { return _this._receiveCallback(e); });
                }
                y.prototype.dispose = function () {
                    this.postis.destroy();
                };
                y.prototype.send = function (e) {
                    this.postis.send({
                        method: "message",
                        params: e
                    });
                };
                y.prototype.setReceiveCallback = function (e) {
                    this._receiveCallback = e;
                };
                return y;
            }());
            var _ = (function () {
                function _(_a) {
                    var e = (_a === void 0 ? {} : _a).backend;
                    this._listeners = new Map,
                        this._requestID = 0,
                        this._responseHandlers = new Map,
                        this._unprocessedMessages = new Set,
                        this.addListener = this.on,
                        e && this.setBackend(e);
                }
                _.prototype._disposeBackend = function () {
                    this._backend && (this._backend.dispose(),
                        this._backend = null);
                };
                _.prototype._onMessageReceived = function (e) {
                    var _this = this;
                    if ("response" === e.type) {
                        var t_4 = this._responseHandlers.get(e.id);
                        t_4 && (t_4(e),
                            this._responseHandlers.delete(e.id));
                    }
                    else
                        "request" === e.type ? this.emit("request", e.data, function (t, n) {
                            _this._backend.send({
                                type: "response",
                                error: n,
                                id: e.id,
                                result: t
                            });
                        }) : this.emit("event", e.data);
                };
                _.prototype.dispose = function () {
                    this._responseHandlers.clear(),
                        this._unprocessedMessages.clear(),
                        this.removeAllListeners(),
                        this._disposeBackend();
                };
                _.prototype.emit = function (e) {
                    var t = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        t[_i - 1] = arguments[_i];
                    }
                    var n = this._listeners.get(e);
                    var r = !1;
                    return n && n.size && n.forEach(function (e) {
                        r = e.apply(void 0, t) || r;
                    }),
                        r || this._unprocessedMessages.add(t),
                        r;
                };
                _.prototype.on = function (e, t) {
                    var _this = this;
                    var n = this._listeners.get(e);
                    return n || (n = new Set,
                        this._listeners.set(e, n)),
                        n.add(t),
                        this._unprocessedMessages.forEach(function (e) {
                            t.apply(void 0, e) && _this._unprocessedMessages.delete(e);
                        }),
                        this;
                };
                _.prototype.removeAllListeners = function (e) {
                    return e ? this._listeners.delete(e) : this._listeners.clear(),
                        this;
                };
                _.prototype.removeListener = function (e, t) {
                    var n = this._listeners.get(e);
                    return n && n.delete(t),
                        this;
                };
                _.prototype.sendEvent = function (e) {
                    if (e === void 0) { e = {}; }
                    this._backend && this._backend.send({
                        type: "event",
                        data: e
                    });
                };
                _.prototype.sendRequest = function (e) {
                    var _this = this;
                    if (!this._backend)
                        return Promise.reject(new Error("No transport backend defined!"));
                    this._requestID++;
                    var t = this._requestID;
                    return new Promise(function (n, r) {
                        _this._responseHandlers.set(t, function (_a) {
                            var e = _a.error, t = _a.result;
                            void 0 !== t ? n(t) : r(void 0 !== e ? e : new Error("Unexpected response format!"));
                        }),
                            _this._backend.send({
                                type: "request",
                                data: e,
                                id: t
                            });
                    });
                };
                _.prototype.setBackend = function (e) {
                    this._disposeBackend(),
                        this._backend = e,
                        this._backend.setReceiveCallback(this._onMessageReceived.bind(this));
                };
                return _;
            }());
            var b = c(window.location).jitsi_meet_external_api_id, w = {};
            var L;
            "number" == typeof b && (w.scope = "jitsi_meet_external_api_" + b),
                (window.JitsiMeetJS || (window.JitsiMeetJS = {}),
                    window.JitsiMeetJS.app || (window.JitsiMeetJS.app = {}),
                    window.JitsiMeetJS.app).setExternalTransportBackend = function (e) { return L.setBackend(e); };
            var O = n(4), x = n(0);
            function j(e, t) {
                if (null == e)
                    return {};
                var n, r, i = function (e, t) {
                    if (null == e)
                        return {};
                    var n, r, i = {}, s = Object.keys(e);
                    for (r = 0; r < s.length; r++)
                        n = s[r],
                            t.indexOf(n) >= 0 || (i[n] = e[n]);
                    return i;
                }(e, t);
                if (Object.getOwnPropertySymbols) {
                    var s = Object.getOwnPropertySymbols(e);
                    for (r = 0; r < s.length; r++)
                        n = s[r],
                            t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
                }
                return i;
            }
            function S(e, t, n) {
                return t in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n,
                    e;
            }
            var E = ["css/all.css", "libs/alwaysontop.min.js"], C = {
                avatarUrl: "avatar-url",
                displayName: "display-name",
                e2eeKey: "e2ee-key",
                email: "email",
                toggleLobby: "toggle-lobby",
                hangup: "video-hangup",
                muteEveryone: "mute-everyone",
                password: "password",
                pinParticipant: "pin-participant",
                resizeLargeVideo: "resize-large-video",
                sendEndpointTextMessage: "send-endpoint-text-message",
                sendTones: "send-tones",
                setLargeVideoParticipant: "set-large-video-participant",
                setVideoQuality: "set-video-quality",
                startRecording: "start-recording",
                stopRecording: "stop-recording",
                subject: "subject",
                submitFeedback: "submit-feedback",
                toggleAudio: "toggle-audio",
                toggleChat: "toggle-chat",
                toggleFilmStrip: "toggle-film-strip",
                toggleShareScreen: "toggle-share-screen",
                toggleTileView: "toggle-tile-view",
                toggleVideo: "toggle-video"
            }, I = {
                "avatar-changed": "avatarChanged",
                "audio-availability-changed": "audioAvailabilityChanged",
                "audio-mute-status-changed": "audioMuteStatusChanged",
                "camera-error": "cameraError",
                "device-list-changed": "deviceListChanged",
                "display-name-change": "displayNameChange",
                "email-change": "emailChange",
                "endpoint-text-message-received": "endpointTextMessageReceived",
                "feedback-submitted": "feedbackSubmitted",
                "feedback-prompt-displayed": "feedbackPromptDisplayed",
                "filmstrip-display-changed": "filmstripDisplayChanged",
                "incoming-message": "incomingMessage",
                log: "log",
                "mic-error": "micError",
                "outgoing-message": "outgoingMessage",
                "participant-joined": "participantJoined",
                "participant-kicked-out": "participantKickedOut",
                "participant-left": "participantLeft",
                "participant-role-changed": "participantRoleChanged",
                "password-required": "passwordRequired",
                "proxy-connection-event": "proxyConnectionEvent",
                "video-ready-to-close": "readyToClose",
                "video-conference-joined": "videoConferenceJoined",
                "video-conference-left": "videoConferenceLeft",
                "video-availability-changed": "videoAvailabilityChanged",
                "video-mute-status-changed": "videoMuteStatusChanged",
                "video-quality-changed": "videoQualityChanged",
                "screen-sharing-status-changed": "screenSharingStatusChanged",
                "dominant-speaker-changed": "dominantSpeakerChanged",
                "subject-change": "subjectChange",
                "suspend-detected": "suspendDetected",
                "tile-view-changed": "tileViewChanged"
            };
            var k = 0;
            function R(e, t) {
                e._numberOfParticipants += t;
            }
            function P(e, t) {
                if (t === void 0) { t = {}; }
                return p(function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = null != arguments[t] ? arguments[t] : {}, r = Object.keys(n);
                        "function" == typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(n).filter((function (e) {
                            return Object.getOwnPropertyDescriptor(n, e).enumerable;
                        })))),
                            r.forEach((function (t) {
                                S(e, t, n[t]);
                            }));
                    }
                    return e;
                }({}, t, {
                    url: (t.noSSL ? "http" : "https") + "://" + e + "/#jitsi_meet_external_api_id=" + k
                }));
            }
            function N(e) {
                var t;
                return "string" == typeof e && null !== String(e).match(/([0-9]*\.?[0-9]+)(em|pt|px|%)$/) ? t = e : "number" == typeof e && (t = e + "px"),
                    t;
            }
            var D = (function (_super) {
                __extends(D, _super);
                function D(e) {
                    var t = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        t[_i - 1] = arguments[_i];
                    }
                    var _this = _super.call(this) || this;
                    var _a = function (e) {
                        if (!e.length)
                            return {};
                        switch (typeof e[0]) {
                            case "string":
                            case void 0:
                                {
                                    var t_5 = e[0], n_5 = e[1], r_2 = e[2], i_3 = e[3], s_3 = e[4], o_3 = e[5], a_1 = e[6], c_1 = e[7], l_1 = e[8];
                                    return {
                                        roomName: t_5,
                                        width: n_5,
                                        height: r_2,
                                        parentNode: i_3,
                                        configOverwrite: s_3,
                                        interfaceConfigOverwrite: o_3,
                                        noSSL: a_1,
                                        jwt: c_1,
                                        onload: l_1
                                    };
                                }
                            case "object":
                                return e[0];
                            default:
                                throw new Error("Can't parse the arguments!");
                        }
                    }(t), _b = _a.roomName, n = _b === void 0 ? "" : _b, _c = _a.width, r = _c === void 0 ? "100%" : _c, _d = _a.height, i = _d === void 0 ? "100%" : _d, _e = _a.parentNode, s = _e === void 0 ? document.body : _e, _f = _a.configOverwrite, o = _f === void 0 ? {} : _f, _g = _a.interfaceConfigOverwrite, c = _g === void 0 ? {} : _g, _h = _a.noSSL, l = _h === void 0 ? !1 : _h, u = _a.jwt, h = _a.onload, d = _a.invitees, p = _a.devices, f = _a.userInfo, g = _a.e2eeKey, m = a.getItem("jitsiLocalStorage");
                    _this._parentNode = s,
                        _this._url = P(e, {
                            configOverwrite: o,
                            interfaceConfigOverwrite: c,
                            jwt: u,
                            noSSL: l,
                            roomName: n,
                            devices: p,
                            userInfo: f,
                            appData: {
                                localStorageContent: m
                            }
                        }),
                        _this._createIFrame(i, r, h),
                        _this._transport = new _({
                            backend: new y({
                                postisOptions: {
                                    allowedOrigin: new URL(_this._url).origin,
                                    scope: "jitsi_meet_external_api_" + k,
                                    window: _this._frame.contentWindow
                                }
                            })
                        }),
                        Array.isArray(d) && d.length > 0 && _this.invite(d),
                        _this._tmpE2EEKey = g,
                        _this._isLargeVideoVisible = !0,
                        _this._numberOfParticipants = 0,
                        _this._participants = {},
                        _this._myUserID = void 0,
                        _this._onStageParticipant = void 0,
                        _this._setupListeners(),
                        k++;
                    return _this;
                }
                D.prototype._createIFrame = function (e, t, n) {
                    var r = "jitsiConferenceFrame" + k;
                    this._frame = document.createElement("iframe"),
                        this._frame.allow = "camera; microphone; display-capture",
                        this._frame.src = this._url,
                        this._frame.name = r,
                        this._frame.id = r,
                        this._setSize(e, t),
                        this._frame.setAttribute("allowFullScreen", "true"),
                        this._frame.style.border = 0,
                        n && (this._frame.onload = n),
                        this._frame = this._parentNode.appendChild(this._frame);
                };
                D.prototype._getAlwaysOnTopResources = function () {
                    var e = this._frame.contentWindow, t = e.document;
                    var n = "";
                    var r = t.querySelector("base");
                    if (r && r.href)
                        n = r.href;
                    else {
                        var _a = e.location, t_6 = _a.protocol, r_3 = _a.host;
                        n = t_6 + "//" + r_3;
                    }
                    return E.map(function (e) { return new URL(e, n).href; });
                };
                D.prototype._getFormattedDisplayName = function (e) {
                    var t = (this._participants[e] || {}).formattedDisplayName;
                    return t;
                };
                D.prototype._getOnStageParticipant = function () {
                    return this._onStageParticipant;
                };
                D.prototype._getLargeVideo = function () {
                    var e = this.getIFrame();
                    if (this._isLargeVideoVisible && e && e.contentWindow && e.contentWindow.document)
                        return e.contentWindow.document.getElementById("largeVideo");
                };
                D.prototype._getParticipantVideo = function (e) {
                    var t = this.getIFrame();
                    if (t && t.contentWindow && t.contentWindow.document)
                        return void 0 === e || e === this._myUserID ? t.contentWindow.document.getElementById("localVideo_container") : t.contentWindow.document.querySelector("#participant_" + e + " video");
                };
                D.prototype._setSize = function (e, t) {
                    var n = N(e), r = N(t);
                    void 0 !== n && (this._height = e,
                        this._frame.style.height = n),
                        void 0 !== r && (this._width = t,
                            this._frame.style.width = r);
                };
                D.prototype._setupListeners = function () {
                    var _this = this;
                    this._transport.on("event", function (e) {
                        var t = e.name, n = j(e, ["name"]);
                        var r = n.id;
                        switch (t) {
                            case "video-conference-joined":
                                void 0 !== _this._tmpE2EEKey && (_this.executeCommand(C.e2eeKey, _this._tmpE2EEKey),
                                    _this._tmpE2EEKey = void 0),
                                    _this._myUserID = r,
                                    _this._participants[r] = {
                                        avatarURL: n.avatarURL
                                    };
                            case "participant-joined":
                                _this._participants[r] = _this._participants[r] || {},
                                    _this._participants[r].displayName = n.displayName,
                                    _this._participants[r].formattedDisplayName = n.formattedDisplayName,
                                    R(_this, 1);
                                break;
                            case "participant-left":
                                R(_this, -1),
                                    delete _this._participants[r];
                                break;
                            case "display-name-change":
                                {
                                    var e_7 = _this._participants[r];
                                    e_7 && (e_7.displayName = n.displayname,
                                        e_7.formattedDisplayName = n.formattedDisplayName);
                                    break;
                                }
                            case "email-change":
                                {
                                    var e_8 = _this._participants[r];
                                    e_8 && (e_8.email = n.email);
                                    break;
                                }
                            case "avatar-changed":
                                {
                                    var e_9 = _this._participants[r];
                                    e_9 && (e_9.avatarURL = n.avatarURL);
                                    break;
                                }
                            case "on-stage-participant-changed":
                                _this._onStageParticipant = r,
                                    _this.emit("largeVideoChanged");
                                break;
                            case "large-video-visibility-changed":
                                _this._isLargeVideoVisible = n.isVisible,
                                    _this.emit("largeVideoChanged");
                                break;
                            case "video-conference-left":
                                R(_this, -1),
                                    delete _this._participants[_this._myUserID];
                                break;
                            case "video-quality-changed":
                                _this._videoQuality = n.videoQuality;
                                break;
                            case "local-storage-changed":
                                return a.setItem("jitsiLocalStorage", n.localStorageContent),
                                    !0;
                        }
                        var i = I[t];
                        return !!i && (_this.emit(i, n),
                            !0);
                    });
                };
                D.prototype.addEventListener = function (e, t) {
                    this.on(e, t);
                };
                D.prototype.addEventListeners = function (e) {
                    for (var t_7 in e)
                        this.addEventListener(t_7, e[t_7]);
                };
                D.prototype.captureLargeVideoScreenshot = function () {
                    return this._transport.sendRequest({
                        name: "capture-largevideo-screenshot"
                    });
                };
                D.prototype.dispose = function () {
                    this.emit("_willDispose"),
                        this._transport.dispose(),
                        this.removeAllListeners(),
                        this._frame && this._frame.parentNode && this._frame.parentNode.removeChild(this._frame);
                };
                D.prototype.executeCommand = function (e) {
                    var t = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        t[_i - 1] = arguments[_i];
                    }
                    e in C ? this._transport.sendEvent({
                        data: t,
                        name: C[e]
                    }) : console.error("Not supported command name.");
                };
                D.prototype.executeCommands = function (e) {
                    for (var t_8 in e)
                        this.executeCommand(t_8, e[t_8]);
                };
                D.prototype.getAvailableDevices = function () {
                    return Object(x.a)(this._transport);
                };
                D.prototype.getCurrentDevices = function () {
                    return Object(x.b)(this._transport);
                };
                D.prototype.getParticipantsInfo = function () {
                    var e = Object.keys(this._participants), t = Object.values(this._participants);
                    return t.forEach(function (t, n) {
                        t.participantId = e[n];
                    }),
                        t;
                };
                D.prototype.getVideoQuality = function () {
                    return this._videoQuality;
                };
                D.prototype.isAudioAvailable = function () {
                    return this._transport.sendRequest({
                        name: "is-audio-available"
                    });
                };
                D.prototype.isDeviceChangeAvailable = function (e) {
                    return Object(x.c)(this._transport, e);
                };
                D.prototype.isDeviceListAvailable = function () {
                    return Object(x.d)(this._transport);
                };
                D.prototype.isMultipleAudioInputSupported = function () {
                    return Object(x.e)(this._transport);
                };
                D.prototype.invite = function (e) {
                    return Array.isArray(e) && 0 !== e.length ? this._transport.sendRequest({
                        name: "invite",
                        invitees: e
                    }) : Promise.reject(new TypeError("Invalid Argument"));
                };
                D.prototype.isAudioMuted = function () {
                    return this._transport.sendRequest({
                        name: "is-audio-muted"
                    });
                };
                D.prototype.isSharingScreen = function () {
                    return this._transport.sendRequest({
                        name: "is-sharing-screen"
                    });
                };
                D.prototype.getAvatarURL = function (e) {
                    var t = (this._participants[e] || {}).avatarURL;
                    return t;
                };
                D.prototype.getDisplayName = function (e) {
                    var t = (this._participants[e] || {}).displayName;
                    return t;
                };
                D.prototype.getEmail = function (e) {
                    var t = (this._participants[e] || {}).email;
                    return t;
                };
                D.prototype.getIFrame = function () {
                    return this._frame;
                };
                D.prototype.getNumberOfParticipants = function () {
                    return this._numberOfParticipants;
                };
                D.prototype.isVideoAvailable = function () {
                    return this._transport.sendRequest({
                        name: "is-video-available"
                    });
                };
                D.prototype.isVideoMuted = function () {
                    return this._transport.sendRequest({
                        name: "is-video-muted"
                    });
                };
                D.prototype.pinParticipant = function (e) {
                    this.executeCommand("pinParticipant", e);
                };
                D.prototype.removeEventListener = function (e) {
                    this.removeAllListeners(e);
                };
                D.prototype.removeEventListeners = function (e) {
                    var _this = this;
                    e.forEach(function (e) { return _this.removeEventListener(e); });
                };
                D.prototype.resizeLargeVideo = function (e, t) {
                    e <= this._width && t <= this._height && this.executeCommand("resizeLargeVideo", e, t);
                };
                D.prototype.sendProxyConnectionEvent = function (e) {
                    this._transport.sendEvent({
                        data: [e],
                        name: "proxy-connection-event"
                    });
                };
                D.prototype.setAudioInputDevice = function (e, t) {
                    return Object(x.f)(this._transport, e, t);
                };
                D.prototype.setAudioOutputDevice = function (e, t) {
                    return Object(x.g)(this._transport, e, t);
                };
                D.prototype.setLargeVideoParticipant = function (e) {
                    this.executeCommand("setLargeVideoParticipant", e);
                };
                D.prototype.setVideoInputDevice = function (e, t) {
                    return Object(x.h)(this._transport, e, t);
                };
                D.prototype._getElectronPopupsConfig = function () {
                    return Promise.resolve(O);
                };
                return D;
            }(i.a));
        }
    ]);
}));
define("medme/lib/ux", ["require", "exports", "medme/lib/types/conference", "medme/lib/httpRequest", "medme/lib/statuses", "medme/lang/index", "medme/env", "moment", "medme/3dparts/jitsi-meet"], function (require, exports, conference_1, httpRequest_2, statuses_2, index_1, env, moment_1, jitsi_meet_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.openConference = exports.initConfConfigL10n = exports.VerticalEnum = exports.timer = exports.createScreen = exports._make4xxScreen = exports.createSpecialistHelpBlock = exports.createLanguagesBlock = exports.ScreenEnum = exports.createConferenceInfoBlock = exports.BlockEnum = exports.l10n = void 0;
    env = __importStar(env);
    moment_1 = __importDefault(moment_1);
    Object.defineProperty(exports, "l10n", { enumerable: true, get: function () { return index_1.l10n; } });
    var BlockEnum;
    (function (BlockEnum) {
        BlockEnum["Languages"] = "langs";
        BlockEnum["ConferenceInfo"] = "conference-info";
        BlockEnum["JitsiMeet"] = "jitsi-meet";
        BlockEnum["SpecialistHelp"] = "specialist-help";
    })(BlockEnum = exports.BlockEnum || (exports.BlockEnum = {}));
    function createConferenceInfoBlock(userRole, confInfo) {
        return {
            userRole: userRole,
            finishPauseControl: userRole === conference_1.ConferenceRolesEnum.Specialist &&
                confInfo.status === conference_1.ConferenceStatusesEnum.Started,
            leaveClientControl: userRole === conference_1.ConferenceRolesEnum.Client &&
                (confInfo.status === conference_1.ConferenceStatusesEnum.Started ||
                    confInfo.status === conference_1.ConferenceStatusesEnum.StartedAndWaiting ||
                    confInfo.status === conference_1.ConferenceStatusesEnum.StartedAndPaused),
            showRealTimes: (confInfo.status === conference_1.ConferenceStatusesEnum.Finished),
            conference: confInfo
        };
    }
    exports.createConferenceInfoBlock = createConferenceInfoBlock;
    var ScreenEnum;
    (function (ScreenEnum) {
        ScreenEnum["_4xx"] = "4xx";
        ScreenEnum["PendingClient"] = "pending-client";
        ScreenEnum["PendingSpecialist"] = "pending-specialist";
        ScreenEnum["JoinClient"] = "join-client";
        ScreenEnum["JoinSpecialist"] = "join-specialist";
        ScreenEnum["Cancelled"] = "cancelled";
        ScreenEnum["Finish"] = "finish";
        ScreenEnum["Started"] = "started";
    })(ScreenEnum = exports.ScreenEnum || (exports.ScreenEnum = {}));
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
    function createScreen(api, at) {
        return __awaiter(this, void 0, void 0, function () {
            var exchangeRes, confRes, durations, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!at)
                            return [2, _make4xxScreen(404)];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4, api.exchange(at)];
                    case 2:
                        exchangeRes = _a.sent();
                        return [4, api.getConferenceInfo(at)];
                    case 3:
                        confRes = _a.sent();
                        return [4, api.durations(at)];
                    case 4:
                        durations = _a.sent();
                        return [2, createConferenceScreen(api, confRes.role, confRes.conference_info, at, exchangeRes.conference_token, confRes.user_id, durations)];
                    case 5:
                        err_1 = _a.sent();
                        if (err_1 instanceof httpRequest_2.APIError &&
                            [
                                statuses_2.ErrorStatuses.Unauthorized,
                                statuses_2.ErrorStatuses.ExpiredToken,
                                statuses_2.ErrorStatuses.ExpectConferenceToken,
                            ].indexOf(err_1.response.status) >= 0)
                            return [2, _make4xxScreen(401)];
                        if (err_1 instanceof httpRequest_2.APIError &&
                            [
                                statuses_2.ErrorStatuses.AccessTokenNotFound,
                                statuses_2.ErrorStatuses.ExpectAccessToken,
                            ].indexOf(err_1.response.status) >= 0)
                            return [2, _make4xxScreen(404)];
                        throw err_1;
                    case 6: return [2];
                }
            });
        });
    }
    exports.createScreen = createScreen;
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
    var VerticalEnum;
    (function (VerticalEnum) {
        VerticalEnum["general"] = "general";
        VerticalEnum["medicine"] = "medicine";
    })(VerticalEnum = exports.VerticalEnum || (exports.VerticalEnum = {}));
    ;
    function initConfConfigL10n(confConfig, vertical) {
        var lang = confConfig.lang;
        confConfig.l10n = {
            dateTime: {
                formatFull: index_1.l10n[lang].dateTime.formatFull
            },
            guest: index_1.l10n[lang][vertical].guest,
            specialist: index_1.l10n[lang][vertical].specialist,
            client: index_1.l10n[lang][vertical].client,
        };
    }
    exports.initConfConfigL10n = initConfConfigL10n;
    var joined = false;
    function openConference(conferenceAccessAPI, uxScreen, confConfig) {
        var conferenceToken = uxScreen.conferenceToken;
        var accessToken = uxScreen.accessToken;
        var confInfo = uxScreen.conference;
        var userId = uxScreen.userId;
        var curLang = confConfig.lang;
        var domain = confConfig.jitsiDomain || env.JITSI_DOMAIN;
        var text = confConfig.l10n;
        confInfo.services.forEach(function (s) {
            s.l10n_name = s.name.find(function (n) {
                return n.lang === curLang;
            });
            if (!s.l10n_name && s.name && s.name.length)
                s.l10n_name = s.name[0];
        });
        var subject = confInfo.services.map(function (s) { return s.l10n_name.text; }).join(', ') + ', ' +
            moment_1.default(confInfo.scheduledStart).format(text.dateTime.formatFull);
        var whoIAm;
        if (uxScreen.userRole === conference_1.ConferenceRolesEnum.Specialist)
            whoIAm = confInfo.specialists.find(function (s) { return s.id === userId; });
        else
            whoIAm = confInfo.clients.find(function (c) { return c.id === userId; });
        var displayName;
        if (whoIAm)
            displayName = (whoIAm.profession ||
                (uxScreen.userRole === conference_1.ConferenceRolesEnum.Specialist ? text.specialist : text.client)) + ', ' +
                whoIAm.name + ' ' + whoIAm.middleName + ' ' + whoIAm.surname;
        else
            displayName = text.guest;
        var options = {
            roomName: conferenceToken,
            parentNode: document.getElementById('content'),
            configOverwrite: { defaultLanguage: curLang.substr(0, 2), lang: curLang.substr(0, 2) },
            interfaceConfigOverwrite: { defaultLanguage: curLang.substr(0, 2), lang: curLang.substr(0, 2) },
            userInfo: {}
        };
        var api = new jitsi_meet_1.JitsiMeetExternalAPI(domain, options);
        api.executeCommand('subject', subject);
        api.executeCommand('displayName', displayName);
        api.on('videoConferenceLeft', function (ev) {
            console.warn('videoConferenceLeft', ev);
            confConfig.onLeft && confConfig.onLeft();
            if (joined) {
                conferenceAccessAPI.leave(accessToken);
                joined = false;
                location.reload();
            }
        });
        api.on('videoConferenceJoined', function (ev) {
            confConfig.onJoined && confConfig.onJoined();
            if (!joined) {
                conferenceAccessAPI.join(accessToken);
                joined = true;
            }
        });
    }
    exports.openConference = openConference;
});
define("medme/lib/jmlib", ["require", "exports", "@medme/lib-jitsi-meet", "@medme/lib-jitsi-meet/JitsiConference", "@medme/lib-jitsi-meet/JitsiConnection", "@medme/lib-jitsi-meet/modules/RTC/JitsiLocalTrack", "@medme/lib-jitsi-meet/modules/RTC/JitsiRemoteTrack", "medme/env"], function (require, exports, lib_jitsi_meet_1, JitsiConference_1, JitsiConnection_1, JitsiLocalTrack_1, JitsiRemoteTrack_1, defaultEnv) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createConferenceAndConnect = exports.ConferenceCtl = exports.ConferenceConfig = exports.ConferenceEvents = exports.ConferenceSession = exports.JitsiRemoteTrack = exports.JitsiLocalTrack = exports.JitsiConnection = exports.JitsiConference = exports.JitsiMeetJS = void 0;
    lib_jitsi_meet_1 = __importDefault(lib_jitsi_meet_1);
    JitsiConference_1 = __importDefault(JitsiConference_1);
    JitsiConnection_1 = __importDefault(JitsiConnection_1);
    JitsiLocalTrack_1 = __importDefault(JitsiLocalTrack_1);
    JitsiRemoteTrack_1 = __importDefault(JitsiRemoteTrack_1);
    defaultEnv = __importStar(defaultEnv);
    exports.JitsiMeetJS = lib_jitsi_meet_1.default;
    exports.JitsiConference = JitsiConference_1.default;
    exports.JitsiConnection = JitsiConnection_1.default;
    exports.JitsiLocalTrack = JitsiLocalTrack_1.default;
    exports.JitsiRemoteTrack = JitsiRemoteTrack_1.default;
    var ConferenceSession = (function () {
        function ConferenceSession() {
            var _this = this;
            this.getLocalTracks = function () { return _this._localTracks; };
            this.getRemoteTracks = function () { return _this._remoteTracks; };
            this.connection = null;
            this.isJoined = false;
            this.room = null;
            this._localTracks = [];
            this._remoteTracks = new Map();
            this.isVideo = true;
        }
        return ConferenceSession;
    }());
    exports.ConferenceSession = ConferenceSession;
    ;
    var voidFn = function () { };
    var ConferenceEvents = (function () {
        function ConferenceEvents() {
            this.onLocalTrack = voidFn;
            this.onRemoteTrack = voidFn;
            this.onConferenceJoined = voidFn;
            this.onUserLeft = voidFn;
            this.onConnected = voidFn;
            this.onConnectionFailed = voidFn;
            this.onDeviceListChanged = voidFn;
            this.onConnectionDisconnected = voidFn;
            this.onSwitchVideo = voidFn;
        }
        return ConferenceEvents;
    }());
    exports.ConferenceEvents = ConferenceEvents;
    var ConferenceConfig = (function () {
        function ConferenceConfig(clientNode, env) {
            this.clientNode = clientNode;
            this.env = env || defaultEnv;
        }
        ConferenceConfig.prototype.getConnectionOptions = function () {
            var env = this.env;
            var options = {
                hosts: {
                    domain: env.JITSI_DOMAIN,
                    muc: env.JITSI_MUC
                },
                bosh: env.JITSI_BOTH,
                clientNode: this.clientNode
            };
            return options;
        };
        ConferenceConfig.prototype.getConferenceOptions = function () {
            var confOptions = {
                openBridgeChannel: true
            };
            return confOptions;
        };
        return ConferenceConfig;
    }());
    exports.ConferenceConfig = ConferenceConfig;
    var ConferenceCtl = (function () {
        function ConferenceCtl(sess, events) {
            this.session = sess;
            this.events = events;
        }
        ConferenceCtl.prototype.changeAudioOutput = function (selected) {
            lib_jitsi_meet_1.default.mediaDevices.setAudioOutputDevice(selected);
        };
        ConferenceCtl.prototype.unload = function () {
            for (var i = 0; i < this.session._localTracks.length; i++) {
                this.session._localTracks[i].dispose();
            }
            this.session.room.leave();
            this.session.connection.disconnect();
        };
        ConferenceCtl.prototype.switchVideo = function () {
            var _this = this;
            this.session.isVideo = !this.session.isVideo;
            if (this.session._localTracks[1]) {
                this.session._localTracks[1].dispose();
                this.session._localTracks.pop();
            }
            lib_jitsi_meet_1.default.createLocalTracks({
                devices: [this.session.isVideo ? 'video' : 'desktop']
            })
                .then(function (tracks) {
                _this.session._localTracks.push(tracks[0]);
                _this.events.onSwitchVideo(_this.session);
                _this.session.room.addTrack(_this.session._localTracks[1]);
            })
                .catch(function (error) { return console.log(error); });
        };
        return ConferenceCtl;
    }());
    exports.ConferenceCtl = ConferenceCtl;
    function createConferenceAndConnect(config, events) {
        var options = config.getConnectionOptions();
        var confOptions = config.getConferenceOptions();
        var sess = new ConferenceSession();
        var sessCtl = new ConferenceCtl(sess, events);
        function onLocalTracks(tracks) {
            sess._localTracks = tracks;
            for (var i = 0; i < sess._localTracks.length; i++) {
                events.onLocalTrack(sess._localTracks[i], i, sess);
                if (sess.isJoined) {
                    sess.room.addTrack(sess._localTracks[i]);
                }
            }
        }
        function onRemoteTrack(track) {
            if (track.isLocal()) {
                return;
            }
            var participant = track.getParticipantId();
            if (!sess._remoteTracks[participant]) {
                sess._remoteTracks[participant] = [];
            }
            var idx = sess._remoteTracks[participant].push(track);
            events.onRemoteTrack(track, idx, sess);
        }
        function onConferenceJoined() {
            console.log('conference joined!');
            sess.isJoined = true;
            for (var i = 0; i < sess._localTracks.length; i++) {
                sess.room.addTrack(sess._localTracks[i]);
            }
            events.onConferenceJoined(sess);
        }
        function onUserLeft(id) {
            console.log('user left');
            if (!sess._remoteTracks[id]) {
                return;
            }
            events.onUserLeft(id, sess);
        }
        function onConnectionSuccess() {
            sess.room = sess.connection.initJitsiConference('conference', confOptions);
            sess.room.on(lib_jitsi_meet_1.default.events.conference.TRACK_ADDED, onRemoteTrack);
            sess.room.on(lib_jitsi_meet_1.default.events.conference.TRACK_REMOVED, function (track) {
                console.log("track removed!!!" + track);
            });
            sess.room.on(lib_jitsi_meet_1.default.events.conference.CONFERENCE_JOINED, onConferenceJoined);
            sess.room.on(lib_jitsi_meet_1.default.events.conference.USER_JOINED, function (id) {
                console.log('user join');
                sess._remoteTracks[id] = [];
            });
            sess.room.on(lib_jitsi_meet_1.default.events.conference.USER_LEFT, onUserLeft);
            sess.room.on(lib_jitsi_meet_1.default.events.conference.TRACK_MUTE_CHANGED, function (track) {
                console.log(track.getType() + " - " + track.isMuted());
            });
            sess.room.on(lib_jitsi_meet_1.default.events.conference.DISPLAY_NAME_CHANGED, function (userID, displayName) { return console.log(userID + " - " + displayName); });
            sess.room.on(lib_jitsi_meet_1.default.events.conference.TRACK_AUDIO_LEVEL_CHANGED, function (userID, audioLevel) { return console.log(userID + " - " + audioLevel); });
            sess.room.on(lib_jitsi_meet_1.default.events.conference.PHONE_NUMBER_CHANGED, function () { return console.log(sess.room.getPhoneNumber() + " - " + sess.room.getPhonePin()); });
            sess.room.join();
            events.onConnected(sess);
        }
        function onConnectionFailed() {
            console.error('Connection Failed!');
            events.onConnectionFailed(sess);
        }
        function onDeviceListChanged(devices) {
            console.info('current devices', devices);
            events.onDeviceListChanged(devices, sess);
        }
        function disconnect() {
            console.log('disconnect!');
            sess.connection.removeEventListener(lib_jitsi_meet_1.default.events.connection.CONNECTION_ESTABLISHED, onConnectionSuccess);
            sess.connection.removeEventListener(lib_jitsi_meet_1.default.events.connection.CONNECTION_FAILED, onConnectionFailed);
            sess.connection.removeEventListener(lib_jitsi_meet_1.default.events.connection.CONNECTION_DISCONNECTED, disconnect);
            events.onConnectionDisconnected(sess);
        }
        var unload = sessCtl.unload.bind(sessCtl);
        var switchVideo = sessCtl.switchVideo.bind(sessCtl);
        var initOptions = {
            disableAudioLevels: true
        };
        lib_jitsi_meet_1.default.init(initOptions);
        sess.connection = new lib_jitsi_meet_1.default.JitsiConnection(null, null, options);
        sess.connection.addEventListener(lib_jitsi_meet_1.default.events.connection.CONNECTION_ESTABLISHED, onConnectionSuccess);
        sess.connection.addEventListener(lib_jitsi_meet_1.default.events.connection.CONNECTION_FAILED, onConnectionFailed);
        sess.connection.addEventListener(lib_jitsi_meet_1.default.events.connection.CONNECTION_DISCONNECTED, disconnect);
        lib_jitsi_meet_1.default.mediaDevices.addEventListener(lib_jitsi_meet_1.default.events.mediaDevices.DEVICE_LIST_CHANGED, onDeviceListChanged);
        sess.connection.connect();
        lib_jitsi_meet_1.default.createLocalTracks({ devices: ['audio', 'video'] })
            .then(onLocalTracks)
            .catch(function (error) {
            throw error;
        });
        return sessCtl;
    }
    exports.createConferenceAndConnect = createConferenceAndConnect;
});
define("index", ["require", "exports", "medme/lib/index", "medme/env", "medme/lib/httpRequest", "medme/lib/statuses", "medme/lib/types/index", "medme/lib/sock", "medme/lib/ux", "medme/lib/jmlib", "medme/lib/sock"], function (require, exports, lib, env, request, statuses, types, sock, UX, JML, sock_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.initWebSocketAPI = exports.initHttpAPI = exports.conferenceWebSocketAPI = exports.conferenceAccessAPI = exports.conferenceModifyAPI = exports.JML = exports.UX = exports.sock = exports.types = exports.statuses = exports.request = exports.env = exports.ConferenceAccessAPI = exports.ConferenceModifyAPI = exports.lib = void 0;
    lib = __importStar(lib);
    env = __importStar(env);
    request = __importStar(request);
    statuses = __importStar(statuses);
    types = __importStar(types);
    sock = __importStar(sock);
    UX = __importStar(UX);
    JML = __importStar(JML);
    exports.lib = lib;
    exports.env = env;
    exports.request = request;
    exports.statuses = statuses;
    exports.types = types;
    exports.sock = sock;
    exports.UX = UX;
    exports.JML = JML;
    exports.default = lib;
    var ConferenceModifyAPI = lib.ConferenceModifyAPI;
    exports.ConferenceModifyAPI = ConferenceModifyAPI;
    var ConferenceAccessAPI = lib.ConferenceAccessAPI;
    exports.ConferenceAccessAPI = ConferenceAccessAPI;
    function initHttpAPI() {
        exports.conferenceModifyAPI = lib.ConferenceModifyAPI.createHttpAPI(env.CONFERENCE_ENDPOINT);
        exports.conferenceAccessAPI = lib.ConferenceAccessAPI.createHttpAPI(env.CONFERENCE_ENDPOINT);
    }
    exports.initHttpAPI = initHttpAPI;
    function initWebSocketAPI() {
        exports.conferenceWebSocketAPI = new sock_1.ConferenceSock(env.CONFERENCE_WS_ENDPOINT);
    }
    exports.initWebSocketAPI = initWebSocketAPI;
});
define("examples/app/src/conf", ["require", "exports", "jquery", "index"], function (require, exports, jquery_1, index_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.openConference = void 0;
    jquery_1 = __importDefault(jquery_1);
    var JitsiMeetJS = index_2.JML.JitsiMeetJS;
    var ConferenceEvents = index_2.JML.ConferenceEvents;
    var ConferenceConfig = index_2.JML.ConferenceConfig;
    var createConference = index_2.JML.createConferenceAndConnect;
    function openConference() {
        var CLIENT_NODE = location.host + ":" + location.port;
        var config = new ConferenceConfig(CLIENT_NODE);
        var events = new ConferenceEvents();
        events.onConnected = function (sess) {
            return console.info("user connected");
        };
        events.onLocalTrack = function (localTrack, idx, sess) {
            localTrack.addEventListener(JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED, function (audioLevel) { return console.log("Audio Level local: " + audioLevel); });
            localTrack.addEventListener(JitsiMeetJS.events.track.TRACK_MUTE_CHANGED, function () { return console.log('local track muted'); });
            localTrack.addEventListener(JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED, function () { return console.log('local track stoped'); });
            localTrack.addEventListener(JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED, function (deviceId) {
                return console.log("track audio output device was changed to " + deviceId);
            });
            if (localTrack.getType() === 'video') {
                jquery_1.default('body').append("<video autoplay='1' id='localVideo" + idx + "' />");
                localTrack.attach(jquery_1.default("#localVideo" + idx)[0]);
            }
            else {
                jquery_1.default('body').append("<audio autoplay='1' muted='true' id='localAudio" + idx + "' />");
                localTrack.attach(jquery_1.default("#localAudio" + idx)[0]);
            }
            console.info('localTrack stream', localTrack.getOriginalStream());
        };
        events.onRemoteTrack = function (track, idx, sess) {
            var participant = track.getParticipantId();
            track.addEventListener(JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED, function (audioLevel) { return console.log("Audio Level remote: " + audioLevel); });
            track.addEventListener(JitsiMeetJS.events.track.TRACK_MUTE_CHANGED, function () { return console.log('remote track muted'); });
            track.addEventListener(JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED, function () { return console.log('remote track stoped'); });
            track.addEventListener(JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED, function (deviceId) {
                return console.log("track audio output device was changed to " + deviceId);
            });
            var id = participant + track.getType() + idx;
            if (track.getType() === 'video') {
                jquery_1.default('body').append("<video autoplay='1' id='" + participant + "video" + idx + "' />");
            }
            else {
                jquery_1.default('body').append("<audio autoplay='1' id='" + participant + "audio" + idx + "' />");
            }
            track.attach(jquery_1.default("#" + id)[0]);
        };
        events.onUserLeft = function (id, sess) {
            var tracks = sess.getRemoteTracks()[id];
            for (var i = 0; i < tracks.length; i++) {
                tracks[i].detach(jquery_1.default("#" + id + tracks[i].getType()));
            }
            ;
        };
        events.onSwitchVideo = function (sess) {
            sess._localTracks[1].addEventListener(JitsiMeetJS.events.track.TRACK_MUTE_CHANGED, function () { return console.log('local track muted'); });
            sess._localTracks[1].addEventListener(JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED, function () { return console.log('local track stoped'); });
            sess._localTracks[1].attach(jquery_1.default('#localVideo1')[0]);
        };
        var sessCtl = createConference(config, events);
        jquery_1.default(window).bind('beforeunload', sessCtl.unload);
        jquery_1.default(window).bind('unload', sessCtl.unload);
        if (JitsiMeetJS.mediaDevices.isDeviceChangeAvailable('output')) {
            JitsiMeetJS.mediaDevices.enumerateDevices(function (devices) {
                var audioOutputDevices = devices.filter(function (d) { return d.kind === 'audiooutput'; });
                if (audioOutputDevices.length > 1) {
                    jquery_1.default('#audioOutputSelect').html(audioOutputDevices
                        .map(function (d) {
                        return "<option value=\"" + d.deviceId + "\">" + d.label + "</option>";
                    })
                        .join('\n'));
                    jquery_1.default('#audioOutputSelectWrapper').show();
                }
            });
        }
        return sessCtl;
    }
    exports.openConference = openConference;
});
define("examples/app/src/app", ["require", "exports", "jquery", "index", "examples/app/src/conf", "moment"], function (require, exports, jquery_2, mmconf, conf_1, moment_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.App = void 0;
    jquery_2 = __importDefault(jquery_2);
    mmconf = __importStar(mmconf);
    moment_2 = __importDefault(moment_2);
    exports.App = {
        main: null,
        renderConferenceInfo: null,
        openForJoin: null,
        join: null,
        finish: null,
        cancel: null,
        leave: null,
        restore: null,
        unload: null,
        switchVideo: null,
        changeAudioOutput: null,
    };
    exports.App.main = function () {
        var CONFERENCE_ENDPOINT = "https://apiv2.gbooking.ru/meets/v1/c326be0234a0acdd1e3c29510692d32c3f08e05a";
        var CONFERENCE_WS_ENDPOINT = "wss://apiv2.gbooking.ru/meets/v1/ws";
        var conferenceModifyAPI = mmconf.ConferenceModifyAPI.createHttpAPI(CONFERENCE_ENDPOINT);
        var conferenceAccessAPI = mmconf.ConferenceAccessAPI.createHttpAPI(CONFERENCE_ENDPOINT);
        var UX = mmconf.UX;
        var params = new URLSearchParams(location.search);
        var accessToken = params.get('at');
        var lang = 'ru';
        var vertical = 'medicine';
        var text = UX.l10n[lang][vertical];
        text.dateTime = UX.l10n[lang].dateTime;
        moment_2.default.locale(lang);
        text.dateTime.fn = {};
        text.dateTime.fn.formatDurationAbbrev = function (sec) {
            sec = Math.floor(sec);
            var res = [];
            if (sec % 60)
                res.push((sec % 60) + " " + text.dateTime.formatDurationAbbrev[3]);
            var min = Math.floor(sec / 60);
            if (min < 1)
                return res.reverse().join(" ");
            if (min % 60)
                res.push((min % 60) + " " + text.dateTime.formatDurationAbbrev[2]);
            var h = Math.floor(min / 60);
            if (h < 1)
                return res.reverse().join(" ");
            if (h % 24)
                res.push((h % 24) + " " + text.dateTime.formatDurationAbbrev[1]);
            var d = Math.floor(h / 24);
            if (d < 1)
                return res.reverse().join(" ");
            res.push(d + " " + text.dateTime.formatDurationAbbrev[0]);
            return res.reverse().join(" ");
        };
        var conferenceWebSocketAPI = new mmconf.sock.ConferenceSock(CONFERENCE_WS_ENDPOINT);
        mmconf.UX.createScreen(conferenceAccessAPI, accessToken).then(function (uxScreen) {
            if (uxScreen.name === UX.ScreenEnum._4xx) {
                jquery_2.default('#content')
                    .html('')
                    .append("<h1>" + text["404"].title + "</h1>")
                    .show();
                return;
            }
            conferenceWebSocketAPI.changeConferenceStatusCallback(function (newStatus) {
                console.info('[%s] ConferenceWS', (new Date).toISOString(), accessToken, 'CHANGE_STATUS_CALLBACK', newStatus);
                location.reload();
            });
            conferenceWebSocketAPI.changeConferenceInfoCallback(function onChangeConferenceInfo() {
                console.info('[%s] ConferenceWS', (new Date).toISOString(), accessToken, 'CHANGE_INFO_CALLBACK');
                jquery_2.default("#notice")
                    .html('')
                    .append('<span>Данные конференции были измены. Пожалуйста, обновите страницу</span>')
                    .show();
            });
            conferenceWebSocketAPI.connect(accessToken);
            if (uxScreen.name === UX.ScreenEnum.PendingClient) {
                var uxPCScreen = uxScreen;
                exports.App.confInfoData = {
                    lang: lang,
                    text: text,
                    timer: null,
                    confInfo: uxPCScreen.conference,
                    opts: uxPCScreen.confInfoBlock,
                };
                exports.App.renderConferenceInfo();
                jquery_2.default('#content')
                    .html('')
                    .append("<h1>" + text.pending_client.title + "</h1>")
                    .append("<p>" + text.pending_client.hint1 + "</p>")
                    .append("<p>" + text.pending_client.hint2 + "</p>")
                    .append("<p><a href=\"#\" class=\"conf_info_link\" onclick=\"toggle_info(); return;\">" + text.pending_client.conf_info_link + "</a></p>")
                    .show();
                return;
            }
            if (uxScreen.name === UX.ScreenEnum.PendingSpecialist) {
                exports.App.openForJoin = function () {
                    conferenceAccessAPI.openForJoin(accessToken).then(function () {
                        location.reload();
                    });
                };
                exports.App.cancel = function () {
                    conferenceAccessAPI.cancel(accessToken).then(function () {
                        location.reload();
                    });
                };
                var uxSCScreen = uxScreen;
                exports.App.confInfoData = {
                    lang: lang,
                    text: text,
                    timer: null,
                    confInfo: uxSCScreen.conference,
                    opts: uxSCScreen.confInfoBlock
                };
                exports.App.renderConferenceInfo();
                jquery_2.default('#content')
                    .html('')
                    .append("<h1>" + text.pending_specialist.title + "</h1>")
                    .append("<p><input type=\"button\" value=\"" + text.pending_specialist.button_open + "\" onclick=\"App.openForJoin(); return;\"></input></p>")
                    .append("<p>" + text.pending_specialist.hint1 + "</p>")
                    .append("<p>" + text.pending_specialist.hint2 + "</p>")
                    .append("<p><input type=\"button\" value=\"" + text.pending_specialist.cancel_button + "\" onclick=\"App.cancel(); return;\"></input></p>")
                    .append("<p><a href=\"#\" class=\"conf_info_link\" onclick=\"toggle_info(); return;\">" + text.pending_specialist.conf_info_link + "</a></p>")
                    .show();
                return;
            }
            if (uxScreen.name === UX.ScreenEnum.JoinClient) {
                var uxJCScreen = uxScreen;
                exports.App.confInfoData = {
                    lang: lang,
                    text: text,
                    timer: null,
                    confInfo: uxJCScreen.conference,
                    opts: uxJCScreen.confInfoBlock
                };
                exports.App.renderConferenceInfo();
                exports.App.join = function () {
                    conferenceAccessAPI.join(accessToken).then(function () {
                        location.reload();
                    });
                };
                jquery_2.default('#content')
                    .html('')
                    .append("<h1>" + text.join_client.title + "</h1>")
                    .append("<p><input type=\"button\" value=\"" + text.join_client.button + "\" onclick=\"App.join(); return;\"></input></p>")
                    .append("<p>" + text.join_client.hint + "</p>")
                    .append("<p><a href=\"#\" class=\"conf_info_link\" onclick=\"toggle_info(); return;\">" + text.join_client.conf_info_link + "</a></p>")
                    .show();
                return;
            }
            if (uxScreen.name === UX.ScreenEnum.JoinSpecialist) {
                var uxJSScreen = uxScreen;
                exports.App.confInfoData = {
                    lang: lang,
                    text: text,
                    timer: null,
                    confInfo: uxJSScreen.conference,
                    opts: uxJSScreen.confInfoBlock
                };
                exports.App.renderConferenceInfo();
                exports.App.join = function () {
                    conferenceAccessAPI.join(accessToken).then(function () {
                        location.reload();
                    });
                };
                jquery_2.default('#content')
                    .html('')
                    .append("<h1>" + text.join_specialist.title + "</h1>")
                    .append("<p><input type=\"button\" value=\"" + text.join_specialist.button + "\" onclick=\"App.join(); return;\"></input></p>")
                    .append("<p>" + text.join_specialist.hint + "</p>")
                    .append("<p><a href=\"#\" class=\"conf_info_link\" onclick=\"toggle_info(); return;\">" + text.join_specialist.conf_info_link + "</a></p>")
                    .show();
                return;
            }
            if (uxScreen.name === UX.ScreenEnum.Cancelled) {
                var uxCancelledScreen = uxScreen;
                exports.App.restore = function () {
                    conferenceAccessAPI.restoreTerminatedFast(accessToken).then(function (res) {
                        conferenceWebSocketAPI.changeConferenceStatus(res.newConferenceStatus);
                        location.reload();
                    }).catch(function (err) {
                        location.reload();
                    });
                };
                exports.App.confInfoData = {
                    lang: lang,
                    text: text,
                    timer: uxCancelledScreen.timerBlock,
                    confInfo: uxCancelledScreen.conference,
                    opts: uxCancelledScreen.confInfoBlock
                };
                exports.App.renderConferenceInfo();
                jquery_2.default('#content')
                    .html('')
                    .append("<h1>" + text.cancelled_screen.title + "</h1>")
                    .append("<p>" + text.cancelled_screen.client_hint0 + "</p>")
                    .append("<p>" + text.cancelled_screen.client_hint0 + "</p>");
                if (uxCancelledScreen.canRestore) {
                    jquery_2.default('#content')
                        .append("<p><input type=\"button\" value=\"" + text.cancelled_screen.restore_button + "\" onclick=\"App.restore(); return;\"></input></p>");
                }
                if (uxCancelledScreen.userRole == mmconf.types.conference.ConferenceRolesEnum.Client) {
                    jquery_2.default('#content')
                        .append("<p>" + text.cancelled_screen.client_hint0 + "</p>")
                        .append("<p>" + text.cancelled_screen.client_hint0 + "</p>");
                }
                jquery_2.default('#content').show();
                return;
            }
            if (uxScreen.name === UX.ScreenEnum.Finish) {
                var uxFinishScreen = uxScreen;
                exports.App.restore = function () {
                    conferenceAccessAPI.restoreTerminatedFast(accessToken).then(function (res) {
                        conferenceWebSocketAPI.changeConferenceStatus(res.newConferenceStatus);
                        location.reload();
                    }).catch(function (err) {
                        location.reload();
                    });
                };
                exports.App.confInfoData = {
                    lang: lang,
                    text: text,
                    timer: uxFinishScreen.timerBlock,
                    confInfo: uxFinishScreen.conference,
                    opts: uxFinishScreen.confInfoBlock
                };
                exports.App.renderConferenceInfo();
                jquery_2.default('#content')
                    .html('')
                    .append("<h1>" + text.finish_screen.title + "</h1>")
                    .append("<p><a href=\"#\" class=\"conf_info_link\" onclick=\"toggle_info(); return;\">" + text.finish_screen.conf_info_link + "</a></p>");
                if (uxFinishScreen.canRestore) {
                    jquery_2.default('#content')
                        .append("<p><input type=\"button\" value=\"" + text.finish_screen.restore_button + "\" onclick=\"App.restore(); return;\"></input></p>");
                }
                jquery_2.default('#content')
                    .show();
                return;
            }
            if (uxScreen.name === UX.ScreenEnum.Started) {
                var uxStartedScreen = uxScreen;
                exports.App.leave = function () {
                    conferenceAccessAPI.leave(accessToken).then(function () {
                        location.reload();
                    });
                };
                exports.App.finish = function () {
                    conferenceAccessAPI.finish(accessToken).then(function () {
                        location.reload();
                    });
                };
                exports.App.confInfoData = {
                    lang: lang,
                    text: text,
                    timer: uxStartedScreen.timerBlock,
                    confInfo: uxStartedScreen.conference,
                    opts: uxStartedScreen.confInfoBlock
                };
                exports.App.renderConferenceInfo();
                jquery_2.default('#content')
                    .html('');
                if (uxStartedScreen.userRole == mmconf.types.conference.ConferenceRolesEnum.Specialist) {
                    jquery_2.default('#content')
                        .append("<p><input type=\"button\" value=\"" + text.conference_info_block.finish_button + "\" onclick=\"App.finish(); return;\"></input></p>");
                }
                else {
                    jquery_2.default('#content')
                        .append("<p><input type=\"button\" value=\"" + text.conference_info_block.leave_meet + "\" onclick=\"App.leave(); return;\"></input></p>");
                }
                jquery_2.default('#content')
                    .append("<p><a href=\"#\" class=\"conf_info_link\" onclick=\"toggle_info(); return;\">" + text.join_client.conf_info_link + "</a></p>")
                    .show();
                var sessCtl_1 = conf_1.openConference();
                exports.App.unload = function () {
                    sessCtl_1.unload();
                };
                exports.App.switchVideo = function () {
                    sessCtl_1.switchVideo();
                };
                exports.App.changeAudioOutput = function (select) {
                    sessCtl_1.changeAudioOutput(select.value);
                };
                jquery_2.default('#conference')
                    .show();
                return;
            }
            console.error("unknown screen name " + uxScreen.name);
        });
    };
    exports.App.renderConferenceInfo = function () {
        var data = exports.App.confInfoData;
        _renderConferenceInfo(data.confInfo, data.text, data.lang, data.timerBlock, data.opts);
    };
    var _renderConferenceInfo = function (confInfo, text, l, timer, opts) {
        var conferenceInfo = confInfo;
        conferenceInfo.services.forEach(function (s) {
            s.l10n_name = s.name.find(function (n) {
                return n.lang === l;
            });
            if (!s.l10n_name && s.name && s.name.length)
                s.l10n_name = s.name[0];
        });
        if (conferenceInfo.specialists.length === 1)
            conferenceInfo.specialist = conferenceInfo.specialists[0];
        conferenceInfo.opts = opts;
        conferenceInfo.scheduledStartFormatFull = moment_2.default(conferenceInfo.scheduledStart)
            .format(text.dateTime.formatFull);
        if (conferenceInfo.startedAt) {
            conferenceInfo.realStartFormatShort = moment_2.default(conferenceInfo.startedAt)
                .format(text.dateTime.formatTimeShort);
            conferenceInfo.realStartFormatFull = moment_2.default(conferenceInfo.startedAt)
                .format(text.dateTime.formatFull);
        }
        if (timer) {
            conferenceInfo.scheduledEndFormatShort = moment_2.default(timer.expectedEndAt)
                .format(text.dateTime.formatTimeShort);
        }
        if (opts.showRealTimes && timer) {
            conferenceInfo.realEndFormatFull = moment_2.default(conferenceInfo.finishedAt)
                .format(text.dateTime.formatFull);
            conferenceInfo.realDurationFormatAbbrev = text.dateTime.fn
                .formatDurationAbbrev(timer.realDurationSeconds);
        }
        conferenceInfo.scheduledDurationFormatAbbrev = text.dateTime.fn
            .formatDurationAbbrev(conferenceInfo.scheduledDurationSeconds);
        jquery_2.default('#conf_info')
            .html('')
            .append("<h3>" + text.conference_info_block.title + "</h3>")
            .append("<span><b>" + text.conference_info_block.scheduled_start + "</b>: " + conferenceInfo.scheduledStartFormatFull + "</span><br>")
            .append("<span><b>" + text.conference_info_block.scheduled_duration + "</b>: " + conferenceInfo.scheduledDurationFormatAbbrev + "</span><br>");
        if (opts.showRealTimes) {
            jquery_2.default('#conf_info')
                .append("<span><b>" + text.conference_info_block.real_start + "</b>: " + conferenceInfo.realStartFormatFull + "</span><br>")
                .append("<span><b>" + text.conference_info_block.real_end + "</b>: " + conferenceInfo.realEndFormatFull + "</span><br>")
                .append("<span><b>" + text.conference_info_block.real_duration + "</b>: " + conferenceInfo.realDurationFormatAbbrev + "</span><br>");
        }
        jquery_2.default('#conf_info')
            .append("<p id=\"conf_info__services\"><b>" + text.conference_info_block.services + "</b><br></p>");
        confInfo.services.forEach(function (s) {
            jquery_2.default('#conf_info__services')
                .append("<span>" + s.l10n_name.text + "</span><br>");
        });
        jquery_2.default('#conf_info')
            .append("<p id=\"conf_info__specialists\"><b>" + text.conference_info_block.specialists + "</b><br></p>");
        confInfo.specialists.forEach(function (s) {
            jquery_2.default('#conf_info__specialists')
                .append("<b>" + s.profession + "</b><br> <span>" + s.name + " " + s.middleName + " " + s.surname + "</span><br>");
        });
        jquery_2.default('#conf_info')
            .append("<p id=\"conf_info__clients\"><b>" + text.conference_info_block.clients + "</b><br></p>");
        confInfo.clients.forEach(function (s) {
            jquery_2.default('#conf_info__clients')
                .append("<span>" + s.name + " " + s.middleName + " " + s.surname + "</span><br>");
        });
    };
});
//# sourceMappingURL=app.amd.js.map