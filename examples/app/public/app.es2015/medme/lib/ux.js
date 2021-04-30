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
import { ConferenceRolesEnum, ConferenceStatusesEnum, LanguageListEnum } from "./types/conference";
import { APIError } from "./httpRequest";
import { ErrorStatuses } from "./statuses";
import { l10n } from "../lang/index";
import * as env from "../env";
import moment from "moment";
import { JitsiMeetExternalAPI } from "../3dparts/jitsi-meet";
export { l10n };
export var BlockEnum;
(function (BlockEnum) {
    BlockEnum["Languages"] = "langs";
    BlockEnum["ConferenceInfo"] = "conference-info";
    BlockEnum["JitsiMeet"] = "jitsi-meet";
    BlockEnum["SpecialistHelp"] = "specialist-help";
})(BlockEnum || (BlockEnum = {}));
export function createConferenceInfoBlock(userRole, confInfo) {
    return {
        userRole: userRole,
        finishPauseControl: userRole === ConferenceRolesEnum.Specialist &&
            confInfo.status === ConferenceStatusesEnum.Started,
        leaveClientControl: userRole === ConferenceRolesEnum.Client &&
            (confInfo.status === ConferenceStatusesEnum.Started ||
                confInfo.status === ConferenceStatusesEnum.StartedAndWaiting ||
                confInfo.status === ConferenceStatusesEnum.StartedAndPaused),
        showRealTimes: (confInfo.status === ConferenceStatusesEnum.Finished),
        conference: confInfo
    };
}
export var ScreenEnum;
(function (ScreenEnum) {
    ScreenEnum["_4xx"] = "4xx";
    ScreenEnum["PendingClient"] = "pending-client";
    ScreenEnum["PendingSpecialist"] = "pending-specialist";
    ScreenEnum["JoinClient"] = "join-client";
    ScreenEnum["JoinSpecialist"] = "join-specialist";
    ScreenEnum["Cancelled"] = "cancelled";
    ScreenEnum["Finish"] = "finish";
    ScreenEnum["Started"] = "started";
})(ScreenEnum || (ScreenEnum = {}));
export function createLanguagesBlock() {
    return {
        type: BlockEnum.Languages,
        currentLanguage: LanguageListEnum.RU_RU,
        availableLanguages: [LanguageListEnum.RU_RU, LanguageListEnum.EN_US]
    };
}
export function createSpecialistHelpBlock(userRole) {
    return {
        type: BlockEnum.SpecialistHelp,
        userRole: userRole
    };
}
export function _make4xxScreen(status) {
    console.assert(status === 401 || status === 404);
    return {
        name: ScreenEnum._4xx,
        availableBlocks: [BlockEnum.Languages],
        langBlock: createLanguagesBlock(),
        status: status
    };
}
export function createScreen(api, at) {
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
                    if (err_1 instanceof APIError &&
                        [
                            ErrorStatuses.Unauthorized,
                            ErrorStatuses.ExpiredToken,
                            ErrorStatuses.ExpectConferenceToken,
                        ].indexOf(err_1.response.status) >= 0)
                        return [2, _make4xxScreen(401)];
                    if (err_1 instanceof APIError &&
                        [
                            ErrorStatuses.AccessTokenNotFound,
                            ErrorStatuses.ExpectAccessToken,
                        ].indexOf(err_1.response.status) >= 0)
                        return [2, _make4xxScreen(404)];
                    throw err_1;
                case 6: return [2];
            }
        });
    });
}
function createConferenceScreen(api, userRole, confInfo, at, confToken, userId, durations) {
    if (userRole === ConferenceRolesEnum.Client &&
        confInfo.status === ConferenceStatusesEnum.Pending)
        return {
            name: ScreenEnum.PendingClient,
            availableBlocks: [BlockEnum.ConferenceInfo],
            userRole: ConferenceRolesEnum.Client,
            conference: confInfo,
            confInfoBlock: createConferenceInfoBlock(userRole, confInfo)
        };
    if (userRole === ConferenceRolesEnum.Specialist &&
        confInfo.status === ConferenceStatusesEnum.Pending)
        return {
            name: ScreenEnum.PendingSpecialist,
            availableBlocks: [],
            userRole: ConferenceRolesEnum.Specialist,
            conference: confInfo,
            confInfoBlock: createConferenceInfoBlock(userRole, confInfo),
        };
    if (userRole === ConferenceRolesEnum.Client && (confInfo.status === ConferenceStatusesEnum.OpenForJoining ||
        [
            ConferenceStatusesEnum.Started,
            ConferenceStatusesEnum.StartedAndPaused,
            ConferenceStatusesEnum.StartedAndWaiting
        ].indexOf(confInfo.status) >= 0 && !confInfo.joinedClients.find(function (item) { return item.id === userId; })))
        return {
            name: ScreenEnum.JoinClient,
            availableBlocks: [],
            userRole: ConferenceRolesEnum.Client,
            conference: confInfo,
            confInfoBlock: createConferenceInfoBlock(userRole, confInfo),
        };
    if (userRole === ConferenceRolesEnum.Specialist && (confInfo.status === ConferenceStatusesEnum.OpenForJoining ||
        [
            ConferenceStatusesEnum.Started,
            ConferenceStatusesEnum.StartedAndPaused,
            ConferenceStatusesEnum.StartedAndWaiting
        ].indexOf(confInfo.status) >= 0 && !confInfo.joinedSpecialists.find(function (item) { return item.id === userId; })))
        return {
            name: ScreenEnum.JoinSpecialist,
            availableBlocks: [],
            userRole: ConferenceRolesEnum.Specialist,
            conference: confInfo,
            confInfoBlock: createConferenceInfoBlock(userRole, confInfo),
        };
    if (confInfo.status === ConferenceStatusesEnum.CancelledBeforeStart)
        return {
            name: ScreenEnum.Cancelled,
            availableBlocks: [],
            userRole: userRole,
            conference: confInfo,
            confInfoBlock: createConferenceInfoBlock(userRole, confInfo),
            showClientHint: userRole === ConferenceRolesEnum.Client,
            restoreControls: userRole === ConferenceRolesEnum.Specialist,
            canRestore: api.canRestore(confInfo),
            timerBlock: durations
        };
    if (confInfo.status === ConferenceStatusesEnum.CancelledAfterStart ||
        confInfo.status === ConferenceStatusesEnum.Finished)
        return {
            name: ScreenEnum.Finish,
            availableBlocks: [],
            userRole: userRole,
            conference: confInfo,
            confInfoBlock: createConferenceInfoBlock(userRole, confInfo),
            restoreControls: userRole === ConferenceRolesEnum.Specialist,
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
export function timer(confInfo, timer) {
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
export var VerticalEnum;
(function (VerticalEnum) {
    VerticalEnum["general"] = "general";
    VerticalEnum["medicine"] = "medicine";
})(VerticalEnum || (VerticalEnum = {}));
;
export function initConfConfigL10n(confConfig, vertical) {
    var lang = confConfig.lang;
    confConfig.l10n = {
        dateTime: {
            formatFull: l10n[lang].dateTime.formatFull
        },
        guest: l10n[lang][vertical].guest,
        specialist: l10n[lang][vertical].specialist,
        client: l10n[lang][vertical].client,
    };
}
var joined = false;
export function openConference(conferenceAccessAPI, uxScreen, confConfig) {
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
        moment(confInfo.scheduledStart).format(text.dateTime.formatFull);
    var whoIAm;
    if (uxScreen.userRole === ConferenceRolesEnum.Specialist)
        whoIAm = confInfo.specialists.find(function (s) { return s.id === userId; });
    else
        whoIAm = confInfo.clients.find(function (c) { return c.id === userId; });
    var displayName;
    if (whoIAm)
        displayName = (whoIAm.profession ||
            (uxScreen.userRole === ConferenceRolesEnum.Specialist ? text.specialist : text.client)) + ', ' +
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
    var api = new JitsiMeetExternalAPI(domain, options);
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
//# sourceMappingURL=ux.js.map