"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initWebSocketAPI = exports.initHttpAPI = exports.conferenceWebSocketAPI = exports.conferenceAccessAPI = exports.conferenceModifyAPI = exports.UX = exports.sock = exports.types = exports.statuses = exports.request = exports.env = void 0;
var lib = require("./medme/lib/index");
var env = require("./medme/env");
exports.env = env;
var request = require("./medme/lib/httpRequest");
exports.request = request;
var statuses = require("./medme/lib/statuses");
exports.statuses = statuses;
var types = require("./medme/lib/types/index");
exports.types = types;
var sock = require("./medme/lib/sock");
exports.sock = sock;
var UX = require("./medme/lib/ux");
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
