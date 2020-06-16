"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib = require("./medme/lib/index");
var env = require("./medme/env");
exports.default = lib;
exports.conferenceModifyAPI = new lib.ConferenceModifyAPI(env.CONFERENCE_ENDPOINT);
exports.conferenceAccessAPI = new lib.ConferenceAccessAPI(env.CONFERENCE_ENDPOINT);
