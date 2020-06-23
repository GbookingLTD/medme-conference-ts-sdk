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
