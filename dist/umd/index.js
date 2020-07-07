(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("MedMe", ["require", "exports", "./medme/lib/index", "./medme/env", "./medme/lib/httpRequest", "./medme/lib/statuses", "./medme/lib/types/index", "./medme/lib/ux"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.initHttpAPI = exports.conferenceAccessAPI = exports.conferenceModifyAPI = exports.UX = exports.types = exports.statuses = exports.request = exports.env = void 0;
    var lib = require("./medme/lib/index");
    var env = require("./medme/env");
    exports.env = env;
    var request = require("./medme/lib/httpRequest");
    exports.request = request;
    var statuses = require("./medme/lib/statuses");
    exports.statuses = statuses;
    var types = require("./medme/lib/types/index");
    exports.types = types;
    var UX = require("./medme/lib/ux");
    exports.UX = UX;
    exports.default = lib;
    function initHttpAPI() {
        exports.conferenceModifyAPI = lib.ConferenceModifyAPI.createHttpAPI(env.CONFERENCE_ENDPOINT);
        exports.conferenceAccessAPI = lib.ConferenceAccessAPI.createHttpAPI(env.CONFERENCE_ENDPOINT);
    }
    exports.initHttpAPI = initHttpAPI;
});
