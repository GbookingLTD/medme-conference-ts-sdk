"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initHttpAPI = exports.conferenceAccessAPI = exports.conferenceModifyAPI = exports.ux = exports.types = exports.statuses = exports.request = exports.env = void 0;
var lib = require("./medme/lib/index");
var env = require("./medme/env");
exports.env = env;
var request = require("./medme/lib/httpRequest");
exports.request = request;
var statuses = require("./medme/lib/statuses");
exports.statuses = statuses;
var types = require("./medme/lib/types/index");
exports.types = types;
var ux = require("./medme/lib/ux");
exports.ux = ux;
exports.default = lib;
function initHttpAPI() {
    exports.conferenceModifyAPI = lib.ConferenceModifyAPI.createHttpAPI(env.CONFERENCE_ENDPOINT);
    exports.conferenceAccessAPI = lib.ConferenceAccessAPI.createHttpAPI(env.CONFERENCE_ENDPOINT);
}
exports.initHttpAPI = initHttpAPI;
