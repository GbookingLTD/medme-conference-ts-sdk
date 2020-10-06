var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
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
        ErrorStatuses["RestoreFastTimedOut"] = "RESTORE_FAST_TIMED_OUT";
    })(ErrorStatuses = exports.ErrorStatuses || (exports.ErrorStatuses = {}));
});
define("medme/env", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.REQUEST_DEBUG = exports.APIKEY = exports.CONFERENCE_WS_ENDPOINT = exports.CONFERENCE_ENDPOINT = void 0;
    exports.CONFERENCE_ENDPOINT = "http://localhost:3000/meets/v1";
    exports.CONFERENCE_WS_ENDPOINT = "ws://localhost:3333";
    exports.APIKEY = "dfghdshrqweo5y23984wdrty5e3w4q";
    exports.REQUEST_DEBUG = true;
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
define("medme/lib/ux", ["require", "exports", "medme/lib/types/conference", "medme/lib/httpRequest", "medme/lib/statuses"], function (require, exports, conference_1, httpRequest_2, statuses_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.timer = exports.createScreen = exports._make4xxScreen = exports.createSpecialistHelpBlock = exports.createLanguagesBlock = exports.ScreenEnum = exports.createConferenceInfoBlock = exports.BlockEnum = void 0;
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
            var newMinutes = Math.floor(totalRemainSeconds / 60) % 3600;
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
});
define("MedMe", ["require", "exports", "medme/lib/index", "medme/env", "medme/lib/httpRequest", "medme/lib/statuses", "medme/lib/types/index", "medme/lib/sock", "medme/lib/ux", "medme/lib/sock"], function (require, exports, lib, env, request, statuses, types, sock, UX, sock_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.initWebSocketAPI = exports.initHttpAPI = exports.conferenceWebSocketAPI = exports.conferenceAccessAPI = exports.conferenceModifyAPI = exports.UX = exports.sock = exports.types = exports.statuses = exports.request = exports.env = void 0;
    exports.env = env;
    exports.request = request;
    exports.statuses = statuses;
    exports.types = types;
    exports.sock = sock;
    exports.UX = UX;
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
});
