(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("MedMe", ["require", "exports", "./medme/lib/index", "./medme/env"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var lib = require("./medme/lib/index");
    var env = require("./medme/env");
    exports.default = lib;
    exports.conferenceModifyAPI = new lib.ConferenceModifyAPI(env.CONFERENCE_ENDPOINT);
    exports.conferenceAccessAPI = new lib.ConferenceAccessAPI(env.CONFERENCE_ENDPOINT);
});
