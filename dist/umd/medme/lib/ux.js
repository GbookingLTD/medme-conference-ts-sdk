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
        define(["require", "exports", "./httpRequest", "./statuses"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports._make4xxScreen = exports.createUX = exports.ScreenEnum = exports.BlockEnum = void 0;
    var httpRequest_1 = require("./httpRequest");
    var statuses_1 = require("./statuses");
    var BlockEnum;
    (function (BlockEnum) {
        BlockEnum["Languages"] = "langs";
        BlockEnum["ConferenceInfo"] = "conference-info";
        BlockEnum["JitsiMeet"] = "jitsi-meet";
        BlockEnum["SpecialistHelp"] = "specialist-help";
    })(BlockEnum = exports.BlockEnum || (exports.BlockEnum = {}));
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
    function createUX(accessAPI, at) {
        return __awaiter(this, void 0, void 0, function () {
            var exchangeRes, confRes, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!at)
                            return [2, _make4xxScreen(404)];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4, accessAPI.exchange(at)];
                    case 2:
                        exchangeRes = _a.sent();
                        return [4, accessAPI.getConferenceInfo(at)];
                    case 3:
                        confRes = _a.sent();
                        return [2, new UX(confRes.conference_info, exchangeRes.conference_token)];
                    case 4:
                        err_1 = _a.sent();
                        if (err_1 instanceof httpRequest_1.APIError &&
                            [
                                statuses_1.ErrorStatuses.Unauthorized,
                                statuses_1.ErrorStatuses.ExpiredToken,
                                statuses_1.ErrorStatuses.ExpectConferenceToken,
                            ].indexOf(err_1.response.status) >= 0)
                            return [2, _make4xxScreen(401)];
                        if (err_1 instanceof httpRequest_1.APIError &&
                            [
                                statuses_1.ErrorStatuses.AccessTokenNotFound,
                                statuses_1.ErrorStatuses.ExpectAccessToken,
                            ].indexOf(err_1.response.status) >= 0)
                            return [2, _make4xxScreen(404)];
                        throw err_1;
                    case 5: return [2];
                }
            });
        });
    }
    exports.createUX = createUX;
    function _make4xxScreen(status) {
        console.assert(status === 401 || status === 404);
        return new UXTrivial({
            name: ScreenEnum._4xx,
            availableBlocks: [{ type: BlockEnum.Languages }],
            status: status
        });
    }
    exports._make4xxScreen = _make4xxScreen;
    var UXTrivial = (function () {
        function UXTrivial(screen) {
        }
        UXTrivial.prototype.getCurrentPage = function () {
            return this.screen_;
        };
        return UXTrivial;
    }());
    var UX = (function () {
        function UX(confInfo, confToken) {
            if (confToken === void 0) { confToken = null; }
            this.conferenceInfo_ = confInfo;
            this.conferenceToken_ = confToken;
        }
        UX.prototype.getCurrentPage = function () {
            return {
                name: ScreenEnum._4xx,
                availableBlocks: [{ type: BlockEnum.Languages }]
            };
        };
        return UX;
    }());
});
