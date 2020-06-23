"use strict";

const MinuteMs: number = 60 * 1000;

export class TimeMs {
    static readonly Minute: number = MinuteMs;
    static readonly Hour: number   = 60 * TimeMs.Minute;
    static readonly Day: number    = 24 * TimeMs.Hour;
    static readonly Week: number   = 24 * TimeMs.Day;
}
