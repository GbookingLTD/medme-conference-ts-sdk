(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("MedMe", ["require", "exports", "./medme/lib/index", "./medme/env", "./medme/lib/request", "./medme/lib/statuses", "./medme/lib/types/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.conferenceAccessAPI = exports.conferenceModifyAPI = exports.types = exports.statuses = exports.request = exports.env = void 0;
    var lib = require("./medme/lib/index");
    var env = require("./medme/env");
    exports.env = env;
    var request = require("./medme/lib/request");
    exports.request = request;
    var statuses = require("./medme/lib/statuses");
    exports.statuses = statuses;
    var types = require("./medme/lib/types/index");
    exports.types = types;
    exports.default = lib;
    exports.conferenceModifyAPI = new lib.ConferenceModifyAPI(env.CONFERENCE_ENDPOINT);
    exports.conferenceAccessAPI = new lib.ConferenceAccessAPI(env.CONFERENCE_ENDPOINT);
});
