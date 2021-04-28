"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.initWebSocketAPI = exports.initHttpAPI = exports.conferenceWebSocketAPI = exports.conferenceAccessAPI = exports.conferenceModifyAPI = exports.UX = exports.sock = exports.types = exports.statuses = exports.request = exports.env = exports.lib = void 0;
var lib = __importStar(require("./medme/lib/index"));
exports.lib = lib;
var env = __importStar(require("./medme/env"));
exports.env = env;
var request = __importStar(require("./medme/lib/httpRequest"));
exports.request = request;
var statuses = __importStar(require("./medme/lib/statuses"));
exports.statuses = statuses;
var types = __importStar(require("./medme/lib/types/index"));
exports.types = types;
var sock = __importStar(require("./medme/lib/sock"));
exports.sock = sock;
var UX = __importStar(require("./medme/lib/ux"));
exports.UX = UX;
var sock_1 = require("./medme/lib/sock");
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
//# sourceMappingURL=index.js.map