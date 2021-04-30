var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
!function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.JitsiMeetExternalAPI = t() : e.JitsiMeetExternalAPI = t();
}(window, (function () {
    return function (e) {
        var t = {};
        function n(r) {
            if (t[r])
                return t[r].exports;
            var i = t[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return e[r].call(i.exports, i, i.exports, n),
                i.l = !0,
                i.exports;
        }
        return n.m = e,
            n.c = t,
            n.d = function (e, t, r) {
                n.o(e, t) || Object.defineProperty(e, t, {
                    enumerable: !0,
                    get: r
                });
            }
            ,
                n.r = function (e) {
                    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                        value: "Module"
                    }),
                        Object.defineProperty(e, "__esModule", {
                            value: !0
                        });
                }
            ,
                n.t = function (e, t) {
                    if (1 & t && (e = n(e)),
                        8 & t)
                        return e;
                    if (4 & t && "object" == typeof e && e && e.__esModule)
                        return e;
                    var r = Object.create(null);
                    if (n.r(r),
                        Object.defineProperty(r, "default", {
                            enumerable: !0,
                            value: e
                        }),
                        2 & t && "string" != typeof e)
                        for (var i in e)
                            n.d(r, i, function (t) {
                                return e[t];
                            }
                                .bind(null, i));
                    return r;
                }
            ,
                n.n = function (e) {
                    var t = e && e.__esModule ? function () {
                        return e.default;
                    }
                        : function () {
                            return e;
                        };
                    return n.d(t, "a", t),
                        t;
                }
            ,
                n.o = function (e, t) {
                    return Object.prototype.hasOwnProperty.call(e, t);
                }
            ,
                n.p = "/libs/",
            n(n.s = 6);
    }([function (e, t, n) {
            "use strict";
            (function (e) {
                n.d(t, "a", (function () {
                    return s;
                })),
                    n.d(t, "b", (function () {
                        return o;
                    })),
                    n.d(t, "c", (function () {
                        return a;
                    })),
                    n.d(t, "d", (function () {
                        return c;
                    })),
                    n.d(t, "e", (function () {
                        return l;
                    })),
                    n.d(t, "f", (function () {
                        return u;
                    })),
                    n.d(t, "g", (function () {
                        return h;
                    })),
                    n.d(t, "h", (function () {
                        return p;
                    }));
                var r = n(5);
                var i = n.n(r).a.getLogger(e);
                function s(e) {
                    return e.sendRequest({
                        type: "devices",
                        name: "getAvailableDevices"
                    }).catch(function (e) { return (i.error(e),
                        {}); });
                }
                function o(e) {
                    return e.sendRequest({
                        type: "devices",
                        name: "getCurrentDevices"
                    }).catch(function (e) { return (i.error(e),
                        {}); });
                }
                function a(e, t) {
                    return e.sendRequest({
                        deviceType: t,
                        type: "devices",
                        name: "isDeviceChangeAvailable"
                    });
                }
                function c(e) {
                    return e.sendRequest({
                        type: "devices",
                        name: "isDeviceListAvailable"
                    });
                }
                function l(e) {
                    return e.sendRequest({
                        type: "devices",
                        name: "isMultipleAudioInputSupported"
                    });
                }
                function u(e, t, n) {
                    return d(e, {
                        id: n,
                        kind: "audioinput",
                        label: t
                    });
                }
                function h(e, t, n) {
                    return d(e, {
                        id: n,
                        kind: "audiooutput",
                        label: t
                    });
                }
                function d(e, t) {
                    return e.sendRequest({
                        type: "devices",
                        name: "setDevice",
                        device: t
                    });
                }
                function p(e, t, n) {
                    return d(e, {
                        id: n,
                        kind: "videoinput",
                        label: t
                    });
                }
            }).call(this, "modules/API/external/functions.js");
        },
        function (e, t, n) {
            "use strict";
            var r, i = "object" == typeof Reflect ? Reflect : null, s = i && "function" == typeof i.apply ? i.apply : function (e, t, n) {
                return Function.prototype.apply.call(e, t, n);
            };
            r = i && "function" == typeof i.ownKeys ? i.ownKeys : Object.getOwnPropertySymbols ? function (e) {
                return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
            }
                : function (e) {
                    return Object.getOwnPropertyNames(e);
                };
            var o = Number.isNaN || function (e) {
                return e != e;
            };
            function a() {
                a.init.call(this);
            }
            e.exports = a,
                a.EventEmitter = a,
                a.prototype._events = void 0,
                a.prototype._eventsCount = 0,
                a.prototype._maxListeners = void 0;
            var c = 10;
            function l(e) {
                if ("function" != typeof e)
                    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
            }
            function u(e) {
                return void 0 === e._maxListeners ? a.defaultMaxListeners : e._maxListeners;
            }
            function h(e, t, n, r) {
                var i, s, o, a;
                if (l(n),
                    void 0 === (s = e._events) ? (s = e._events = Object.create(null),
                        e._eventsCount = 0) : (void 0 !== s.newListener && (e.emit("newListener", t, n.listener ? n.listener : n),
                        s = e._events),
                        o = s[t]),
                    void 0 === o)
                    o = s[t] = n,
                        ++e._eventsCount;
                else if ("function" == typeof o ? o = s[t] = r ? [n, o] : [o, n] : r ? o.unshift(n) : o.push(n),
                    (i = u(e)) > 0 && o.length > i && !o.warned) {
                    o.warned = !0;
                    var c = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
                    c.name = "MaxListenersExceededWarning",
                        c.emitter = e,
                        c.type = t,
                        c.count = o.length,
                        a = c,
                        console && console.warn && console.warn(a);
                }
                return e;
            }
            function d() {
                if (!this.fired)
                    return this.target.removeListener(this.type, this.wrapFn),
                        this.fired = !0,
                        0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
            }
            function p(e, t, n) {
                var r = {
                    fired: !1,
                    wrapFn: void 0,
                    target: e,
                    type: t,
                    listener: n
                }, i = d.bind(r);
                return i.listener = n,
                    r.wrapFn = i,
                    i;
            }
            function f(e, t, n) {
                var r = e._events;
                if (void 0 === r)
                    return [];
                var i = r[t];
                return void 0 === i ? [] : "function" == typeof i ? n ? [i.listener || i] : [i] : n ? function (e) {
                    for (var t = new Array(e.length), n = 0; n < t.length; ++n)
                        t[n] = e[n].listener || e[n];
                    return t;
                }(i) : m(i, i.length);
            }
            function g(e) {
                var t = this._events;
                if (void 0 !== t) {
                    var n = t[e];
                    if ("function" == typeof n)
                        return 1;
                    if (void 0 !== n)
                        return n.length;
                }
                return 0;
            }
            function m(e, t) {
                for (var n = new Array(t), r = 0; r < t; ++r)
                    n[r] = e[r];
                return n;
            }
            Object.defineProperty(a, "defaultMaxListeners", {
                enumerable: !0,
                get: function () {
                    return c;
                },
                set: function (e) {
                    if ("number" != typeof e || e < 0 || o(e))
                        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
                    c = e;
                }
            }),
                a.init = function () {
                    void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null),
                        this._eventsCount = 0),
                        this._maxListeners = this._maxListeners || void 0;
                }
                ,
                    a.prototype.setMaxListeners = function (e) {
                        if ("number" != typeof e || e < 0 || o(e))
                            throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
                        return this._maxListeners = e,
                            this;
                    }
                ,
                    a.prototype.getMaxListeners = function () {
                        return u(this);
                    }
                ,
                    a.prototype.emit = function (e) {
                        for (var t = [], n = 1; n < arguments.length; n++)
                            t.push(arguments[n]);
                        var r = "error" === e, i = this._events;
                        if (void 0 !== i)
                            r = r && void 0 === i.error;
                        else if (!r)
                            return !1;
                        if (r) {
                            var o;
                            if (t.length > 0 && (o = t[0]),
                                o instanceof Error)
                                throw o;
                            var a = new Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
                            throw a.context = o,
                                a;
                        }
                        var c = i[e];
                        if (void 0 === c)
                            return !1;
                        if ("function" == typeof c)
                            s(c, this, t);
                        else {
                            var l = c.length, u = m(c, l);
                            for (n = 0; n < l; ++n)
                                s(u[n], this, t);
                        }
                        return !0;
                    }
                ,
                    a.prototype.addListener = function (e, t) {
                        return h(this, e, t, !1);
                    }
                ,
                    a.prototype.on = a.prototype.addListener,
                a.prototype.prependListener = function (e, t) {
                    return h(this, e, t, !0);
                }
                ,
                    a.prototype.once = function (e, t) {
                        return l(t),
                            this.on(e, p(this, e, t)),
                            this;
                    }
                ,
                    a.prototype.prependOnceListener = function (e, t) {
                        return l(t),
                            this.prependListener(e, p(this, e, t)),
                            this;
                    }
                ,
                    a.prototype.removeListener = function (e, t) {
                        var n, r, i, s, o;
                        if (l(t),
                            void 0 === (r = this._events))
                            return this;
                        if (void 0 === (n = r[e]))
                            return this;
                        if (n === t || n.listener === t)
                            0 == --this._eventsCount ? this._events = Object.create(null) : (delete r[e],
                                r.removeListener && this.emit("removeListener", e, n.listener || t));
                        else if ("function" != typeof n) {
                            for (i = -1,
                                s = n.length - 1; s >= 0; s--)
                                if (n[s] === t || n[s].listener === t) {
                                    o = n[s].listener,
                                        i = s;
                                    break;
                                }
                            if (i < 0)
                                return this;
                            0 === i ? n.shift() : function (e, t) {
                                for (; t + 1 < e.length; t++)
                                    e[t] = e[t + 1];
                                e.pop();
                            }(n, i),
                                1 === n.length && (r[e] = n[0]),
                                void 0 !== r.removeListener && this.emit("removeListener", e, o || t);
                        }
                        return this;
                    }
                ,
                    a.prototype.off = a.prototype.removeListener,
                a.prototype.removeAllListeners = function (e) {
                    var t, n, r;
                    if (void 0 === (n = this._events))
                        return this;
                    if (void 0 === n.removeListener)
                        return 0 === arguments.length ? (this._events = Object.create(null),
                            this._eventsCount = 0) : void 0 !== n[e] && (0 == --this._eventsCount ? this._events = Object.create(null) : delete n[e]),
                            this;
                    if (0 === arguments.length) {
                        var i, s = Object.keys(n);
                        for (r = 0; r < s.length; ++r)
                            "removeListener" !== (i = s[r]) && this.removeAllListeners(i);
                        return this.removeAllListeners("removeListener"),
                            this._events = Object.create(null),
                            this._eventsCount = 0,
                            this;
                    }
                    if ("function" == typeof (t = n[e]))
                        this.removeListener(e, t);
                    else if (void 0 !== t)
                        for (r = t.length - 1; r >= 0; r--)
                            this.removeListener(e, t[r]);
                    return this;
                }
                ,
                    a.prototype.listeners = function (e) {
                        return f(this, e, !0);
                    }
                ,
                    a.prototype.rawListeners = function (e) {
                        return f(this, e, !1);
                    }
                ,
                    a.listenerCount = function (e, t) {
                        return "function" == typeof e.listenerCount ? e.listenerCount(t) : g.call(e, t);
                    }
                ,
                    a.prototype.listenerCount = g,
                a.prototype.eventNames = function () {
                    return this._eventsCount > 0 ? r(this._events) : [];
                };
        },
        function (e, t) {
            var n = {
                trace: 0,
                debug: 1,
                info: 2,
                log: 3,
                warn: 4,
                error: 5
            };
            a.consoleTransport = console;
            var r = [a.consoleTransport];
            a.addGlobalTransport = function (e) {
                -1 === r.indexOf(e) && r.push(e);
            }
                ,
                    a.removeGlobalTransport = function (e) {
                        var t = r.indexOf(e);
                        -1 !== t && r.splice(t, 1);
                    };
            var i = {};
            function s() {
                var e = {
                    methodName: "",
                    fileLocation: "",
                    line: null,
                    column: null
                }, t = new Error, n = t.stack ? t.stack.split("\n") : [];
                if (!n || n.length < 1)
                    return e;
                var r = null;
                return n[3] && (r = n[3].match(/\s*at\s*(.+?)\s*\((\S*)\s*:(\d*)\s*:(\d*)\)/)),
                    !r || r.length <= 4 ? (0 === n[2].indexOf("log@") ? e.methodName = n[3].substr(0, n[3].indexOf("@")) : e.methodName = n[2].substr(0, n[2].indexOf("@")),
                        e) : (e.methodName = r[1],
                        e.fileLocation = r[2],
                        e.line = r[3],
                        e.column = r[4],
                        e);
            }
            function o() {
                var e = arguments[0], t = arguments[1], o = Array.prototype.slice.call(arguments, 2);
                if (!(n[t] < e.level))
                    for (var a = !(e.options.disableCallerInfo || i.disableCallerInfo) && s(), c = r.concat(e.transports), l = 0; l < c.length; l++) {
                        var u = c[l], h = u[t];
                        if (h && "function" == typeof h) {
                            var d = [];
                            d.push((new Date).toISOString()),
                                e.id && d.push("[" + e.id + "]"),
                                a && a.methodName.length > 1 && d.push("<" + a.methodName + ">: ");
                            var p = d.concat(o);
                            h.bind(u).apply(u, p);
                        }
                    }
            }
            function a(e, t, r, i) {
                this.id = t,
                    this.options = i || {},
                    this.transports = r,
                    this.transports || (this.transports = []),
                    this.level = n[e];
                for (var s = Object.keys(n), a = 0; a < s.length; a++)
                    this[s[a]] = o.bind(null, this, s[a]);
            }
            a.setGlobalOptions = function (e) {
                i = e || {};
            }
                ,
                    a.prototype.setLevel = function (e) {
                        this.level = n[e];
                    }
                ,
                    e.exports = a,
                a.levels = {
                    TRACE: "trace",
                    DEBUG: "debug",
                    INFO: "info",
                    LOG: "log",
                    WARN: "warn",
                    ERROR: "error"
                };
        },
        function (e, t) {
            e.exports = function (e) {
                var t, n = e.scope, r = e.window, i = e.windowForEventListening || window, s = e.allowedOrigin, o = {}, a = [], c = {}, l = !1, u = function (e) {
                    var t;
                    try {
                        t = JSON.parse(e.data);
                    }
                    catch (e) {
                        return;
                    }
                    if ((!s || e.origin === s) && t.postis && t.scope === n) {
                        var r = o[t.method];
                        if (r)
                            for (var i = 0; i < r.length; i++)
                                r[i].call(null, t.params);
                        else
                            c[t.method] = c[t.method] || [],
                                c[t.method].push(t.params);
                    }
                };
                i.addEventListener("message", u, !1);
                var h = {
                    listen: function (e, t) {
                        o[e] = o[e] || [],
                            o[e].push(t);
                        var n = c[e];
                        if (n)
                            for (var r = o[e], i = 0; i < r.length; i++)
                                for (var s = 0; s < n.length; s++)
                                    r[i].call(null, n[s]);
                        delete c[e];
                    },
                    send: function (e) {
                        var t = e.method;
                        (l || "__ready__" === e.method) && r && "function" == typeof r.postMessage ? r.postMessage(JSON.stringify({
                            postis: !0,
                            scope: n,
                            method: t,
                            params: e.params
                        }), "*") : a.push(e);
                    },
                    ready: function (e) {
                        l ? e() : setTimeout((function () {
                            h.ready(e);
                        }), 50);
                    },
                    destroy: function (e) {
                        clearInterval(t),
                            l = !1,
                            i && "function" == typeof i.removeEventListener && i.removeEventListener("message", u),
                            e && e();
                    }
                }, d = +new Date + Math.random() + "";
                return t = setInterval((function () {
                    h.send({
                        method: "__ready__",
                        params: d
                    });
                }), 50),
                    h.listen("__ready__", (function (e) {
                        if (e === d) {
                            clearInterval(t),
                                l = !0;
                            for (var n = 0; n < a.length; n++)
                                h.send(a[n]);
                            a = [];
                        }
                        else
                            h.send({
                                method: "__ready__",
                                params: e
                            });
                    })),
                    h;
            };
        }, function (e) {
            e.exports = JSON.parse('{"google-auth":{"matchPatterns":{"url":"accounts.google.com"},"target":"electron"},"dropbox-auth":{"matchPatterns":{"url":"dropbox.com/oauth2/authorize"},"target":"electron"}}');
        }, function (e, t, n) {
            var r = n(2), i = n(7), s = {}, o = [], a = r.levels.TRACE;
            e.exports = {
                addGlobalTransport: function (e) {
                    r.addGlobalTransport(e);
                },
                removeGlobalTransport: function (e) {
                    r.removeGlobalTransport(e);
                },
                setGlobalOptions: function (e) {
                    r.setGlobalOptions(e);
                },
                getLogger: function (e, t, n) {
                    var i = new r(a, e, t, n);
                    return e ? (s[e] = s[e] || [],
                        s[e].push(i)) : o.push(i),
                        i;
                },
                setLogLevelById: function (e, t) {
                    for (var n = t ? s[t] || [] : o, r = 0; r < n.length; r++)
                        n[r].setLevel(e);
                },
                setLogLevel: function (e) {
                    a = e;
                    for (var t = 0; t < o.length; t++)
                        o[t].setLevel(e);
                    for (var n in s) {
                        var r = s[n] || [];
                        for (t = 0; t < r.length; t++)
                            r[t].setLevel(e);
                    }
                },
                levels: r.levels,
                LogCollector: i
            };
        }, function (e, t, n) {
            e.exports = n(8).default;
        }, function (e, t, n) {
            var r = n(2);
            function i(e, t) {
                this.logStorage = e,
                    this.stringifyObjects = !(!t || !t.stringifyObjects) && t.stringifyObjects,
                    this.storeInterval = t && t.storeInterval ? t.storeInterval : 3e4,
                    this.maxEntryLength = t && t.maxEntryLength ? t.maxEntryLength : 1e4,
                    Object.keys(r.levels).forEach(function (e) {
                        this[r.levels[e]] = function () {
                            this._log.apply(this, arguments);
                        }
                            .bind(this, e);
                    }
                        .bind(this)),
                    this.storeLogsIntervalID = null,
                    this.queue = [],
                    this.totalLen = 0,
                    this.outputCache = [];
            }
            i.prototype.stringify = function (e) {
                try {
                    return JSON.stringify(e);
                }
                catch (e) {
                    return "[object with circular refs?]";
                }
            }
                ,
                    i.prototype.formatLogMessage = function (e) {
                        for (var t = "", n = 1, i = arguments.length; n < i; n++) {
                            var s = arguments[n];
                            !this.stringifyObjects && e !== r.levels.ERROR || "object" != typeof s || (s = this.stringify(s)),
                                t += s,
                                n !== i - 1 && (t += " ");
                        }
                        return t.length ? t : null;
                    }
                ,
                    i.prototype._log = function () {
                        var e = arguments[1], t = this.formatLogMessage.apply(this, arguments);
                        if (t) {
                            var n = this.queue[this.queue.length - 1], r = n && n.text;
                            r === t ? n.count += 1 : (this.queue.push({
                                text: t,
                                timestamp: e,
                                count: 1
                            }),
                                this.totalLen += t.length);
                        }
                        this.totalLen >= this.maxEntryLength && this._flush(!0, !0);
                    }
                ,
                    i.prototype.start = function () {
                        this._reschedulePublishInterval();
                    }
                ,
                    i.prototype._reschedulePublishInterval = function () {
                        this.storeLogsIntervalID && (window.clearTimeout(this.storeLogsIntervalID),
                            this.storeLogsIntervalID = null),
                            this.storeLogsIntervalID = window.setTimeout(this._flush.bind(this, !1, !0), this.storeInterval);
                    }
                ,
                    i.prototype.flush = function () {
                        this._flush(!1, !0);
                    }
                ,
                    i.prototype._flush = function (e, t) {
                        this.totalLen > 0 && (this.logStorage.isReady() || e) && (this.logStorage.isReady() ? (this.outputCache.length && (this.outputCache.forEach(function (e) {
                            this.logStorage.storeLogs(e);
                        }
                            .bind(this)),
                            this.outputCache = []),
                            this.logStorage.storeLogs(this.queue)) : this.outputCache.push(this.queue),
                            this.queue = [],
                            this.totalLen = 0),
                            t && this._reschedulePublishInterval();
                    }
                ,
                    i.prototype.stop = function () {
                        this._flush(!1, !1);
                    }
                ,
                    e.exports = i;
        },
        function (e, t, n) {
            "use strict";
            n.r(t),
                n.d(t, "default", (function () {
                    return D;
                }));
            var r = n(1), i = n.n(r);
            var s = (function (_super) {
                __extends(s, _super);
                function s() {
                    var e = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        e[_i] = arguments[_i];
                    }
                    var _this = this;
                    var t, n, r;
                    _this = _super.apply(this, e) || this,
                        r = {},
                        (n = "_storage") in (t = _this) ? Object.defineProperty(t, n, {
                            value: r,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : t[n] = r;
                    return _this;
                }
                s.prototype.clear = function () {
                    this._storage = {};
                };
                Object.defineProperty(s.prototype, "length", {
                    get: function () {
                        return Object.keys(this._storage).length;
                    },
                    enumerable: false,
                    configurable: true
                });
                s.prototype.getItem = function (e) {
                    return this._storage[e];
                };
                s.prototype.setItem = function (e, t) {
                    this._storage[e] = t;
                };
                s.prototype.removeItem = function (e) {
                    delete this._storage[e];
                };
                s.prototype.key = function (e) {
                    var t = Object.keys(this._storage);
                    if (!(t.length <= e))
                        return t[e];
                };
                s.prototype.serialize = function () {
                    return JSON.stringify(this._storage);
                };
                return s;
            }(i.a));
            var o = (function (_super) {
                __extends(o, _super);
                function o() {
                    var _this = _super.call(this) || this;
                    try {
                        _this._storage = window.localStorage,
                            _this._localStorageDisabled = !1;
                    }
                    catch (e) { }
                    _this._storage || (console.warn("Local storage is disabled."),
                        _this._storage = new s,
                        _this._localStorageDisabled = !0);
                    return _this;
                }
                o.prototype.isLocalStorageDisabled = function () {
                    return this._localStorageDisabled;
                };
                o.prototype.clear = function () {
                    this._storage.clear(),
                        this.emit("changed");
                };
                Object.defineProperty(o.prototype, "length", {
                    get: function () {
                        return this._storage.length;
                    },
                    enumerable: false,
                    configurable: true
                });
                o.prototype.getItem = function (e) {
                    return this._storage.getItem(e);
                };
                o.prototype.setItem = function (e, t, n) {
                    if (n === void 0) { n = !1; }
                    this._storage.setItem(e, t),
                        n || this.emit("changed");
                };
                o.prototype.removeItem = function (e) {
                    this._storage.removeItem(e),
                        this.emit("changed");
                };
                o.prototype.key = function (e) {
                    return this._storage.key(e);
                };
                o.prototype.serialize = function () {
                    if (this.isLocalStorageDisabled)
                        return this._storage.serialize();
                    var e = this._storage.length, t = {};
                    for (var n_1 = 0; n_1 < e; n_1++) {
                        var e_1 = this._storage.key(n_1);
                        t[e_1] = this._storage.getItem(e_1);
                    }
                    return JSON.stringify(t);
                };
                return o;
            }(i.a));
            var a = new o;
            function c(e, t, n) {
                if (t === void 0) { t = !1; }
                if (n === void 0) { n = "hash"; }
                var r = "search" === n ? e.search : e.hash, i = {}, s = r && r.substr(1).split("&") || [];
                if ("hash" === n && 1 === s.length) {
                    var e_2 = s[0];
                    if (e_2.startsWith("/") && 1 === e_2.split("&").length)
                        return i;
                }
                return s.forEach(function (e) {
                    var n = e.split("="), r = n[0];
                    if (!r)
                        return;
                    var s;
                    try {
                        if (s = n[1],
                            !t) {
                            var e_3 = decodeURIComponent(s).replace(/\\&/, "&");
                            s = "undefined" === e_3 ? void 0 : JSON.parse(e_3);
                        }
                    }
                    catch (e) {
                        return void function (e, t) {
                            if (t === void 0) { t = ""; }
                            console.error(t, e),
                                window.onerror && window.onerror(t, null, null, null, e);
                        }(e, "Failed to parse URL parameter value: " + String(s));
                    }
                    i[r] = s;
                }),
                    i;
            }
            function l(e) {
                var t = new RegExp("^([a-z][a-z0-9\\.\\+-]*:)+", "gi"), n = t.exec(e);
                if (n) {
                    var r_1 = n[n.length - 1].toLowerCase();
                    "http:" !== r_1 && "https:" !== r_1 && (r_1 = "https:"),
                        (e = e.substring(t.lastIndex)).startsWith("//") && (e = r_1 + e);
                }
                return e;
            }
            function u(e) {
                if (e === void 0) { e = {}; }
                var t = [];
                for (var n_2 in e)
                    try {
                        t.push(n_2 + "=" + encodeURIComponent(JSON.stringify(e[n_2])));
                    }
                    catch (e) {
                        console.warn("Error encoding " + n_2 + ": " + e);
                    }
                return t;
            }
            function h(e) {
                var t = {
                    toString: d
                };
                var n, r, i;
                if (e = e.replace(/\s/g, ""),
                    n = new RegExp("^([a-z][a-z0-9\\.\\+-]*:)", "gi"),
                    r = n.exec(e),
                    r && (t.protocol = r[1].toLowerCase(),
                        e = e.substring(n.lastIndex)),
                    n = new RegExp("^(//[^/?#]+)", "gi"),
                    r = n.exec(e),
                    r) {
                    var i_1 = r[1].substring(2);
                    e = e.substring(n.lastIndex);
                    var s_1 = i_1.indexOf("@");
                    -1 !== s_1 && (i_1 = i_1.substring(s_1 + 1)),
                        t.host = i_1;
                    var o_1 = i_1.lastIndexOf(":");
                    -1 !== o_1 && (t.port = i_1.substring(o_1 + 1),
                        i_1 = i_1.substring(0, o_1)),
                        t.hostname = i_1;
                }
                if (n = new RegExp("^([^?#]*)", "gi"),
                    r = n.exec(e),
                    r && (i = r[1],
                        e = e.substring(n.lastIndex)),
                    i ? i.startsWith("/") || (i = "/" + i) : i = "/",
                    t.pathname = i,
                    e.startsWith("?")) {
                    var n_3 = e.indexOf("#", 1);
                    -1 === n_3 && (n_3 = e.length),
                        t.search = e.substring(0, n_3),
                        e = e.substring(n_3);
                }
                else
                    t.search = "";
                return t.hash = e.startsWith("#") ? e : "",
                    t;
            }
            function d(e) {
                var _a = e || this, t = _a.hash, n = _a.host, r = _a.pathname, i = _a.protocol, s = _a.search;
                var o = "";
                return i && (o += i),
                    n && (o += "//" + n),
                    o += r || "/",
                    s && (o += s),
                    t && (o += t),
                    o;
            }
            function p(e) {
                var t;
                t = e.serverURL && e.room ? new URL(e.room, e.serverURL).toString() : e.room ? e.room : e.url || "";
                var n = h(l(t));
                if (!n.protocol) {
                    var t_1 = e.protocol || e.scheme;
                    t_1 && (t_1.endsWith(":") || (t_1 += ":"),
                        n.protocol = t_1);
                }
                var r = n.pathname;
                if (!n.host) {
                    var t_2 = e.domain || e.host || e.hostname;
                    if (t_2) {
                        var _a = h(l("org.jitsi.meet://" + t_2)), e_4 = _a.host, i_2 = _a.hostname, s_2 = _a.pathname, o_2 = _a.port;
                        e_4 && (n.host = e_4,
                            n.hostname = i_2,
                            n.port = o_2),
                            "/" === r && "/" !== s_2 && (r = s_2);
                    }
                }
                var i = e.roomName || e.room;
                !i || !n.pathname.endsWith("/") && n.pathname.endsWith("/" + i) || (r.endsWith("/") || (r += "/"),
                    r += i),
                    n.pathname = r;
                var s = e.jwt;
                if (s) {
                    var e_5 = n.search;
                    -1 === e_5.indexOf("?jwt=") && -1 === e_5.indexOf("&jwt=") && (e_5.startsWith("?") || (e_5 = "?" + e_5),
                        1 === e_5.length || (e_5 += "&"),
                        e_5 += "jwt=" + s,
                        n.search = e_5);
                }
                var o = n.hash;
                for (var _i = 0, _b = ["config", "interfaceConfig", "devices", "userInfo", "appData"]; _i < _b.length; _i++) {
                    var t_3 = _b[_i];
                    var n_4 = u(e[t_3 + "Overwrite"] || e[t_3] || e[t_3 + "Override"]);
                    if (n_4.length) {
                        var e_6 = t_3 + "." + n_4.join("&" + t_3 + ".");
                        o.length ? e_6 = "&" + e_6 : o = "#",
                            o += e_6;
                    }
                }
                return n.hash = o,
                    n.toString() || void 0;
            }
            var f = n(3), g = n.n(f);
            function m(e, t, n) {
                return t in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n,
                    e;
            }
            var v = {
                window: window.opener || window.parent
            };
            var y = (function () {
                function y(_a) {
                    var _this = this;
                    var e = (_a === void 0 ? {} : _a).postisOptions;
                    this.postis = g()(function (e) {
                        for (var t = 1; t < arguments.length; t++) {
                            var n = null != arguments[t] ? arguments[t] : {}, r = Object.keys(n);
                            "function" == typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(n).filter((function (e) {
                                return Object.getOwnPropertyDescriptor(n, e).enumerable;
                            })))),
                                r.forEach((function (t) {
                                    m(e, t, n[t]);
                                }));
                        }
                        return e;
                    }({}, v, e)),
                        this._receiveCallback = function () { }
                        ,
                            this.postis.listen("message", function (e) { return _this._receiveCallback(e); });
                }
                y.prototype.dispose = function () {
                    this.postis.destroy();
                };
                y.prototype.send = function (e) {
                    this.postis.send({
                        method: "message",
                        params: e
                    });
                };
                y.prototype.setReceiveCallback = function (e) {
                    this._receiveCallback = e;
                };
                return y;
            }());
            var _ = (function () {
                function _(_a) {
                    var e = (_a === void 0 ? {} : _a).backend;
                    this._listeners = new Map,
                        this._requestID = 0,
                        this._responseHandlers = new Map,
                        this._unprocessedMessages = new Set,
                        this.addListener = this.on,
                        e && this.setBackend(e);
                }
                _.prototype._disposeBackend = function () {
                    this._backend && (this._backend.dispose(),
                        this._backend = null);
                };
                _.prototype._onMessageReceived = function (e) {
                    var _this = this;
                    if ("response" === e.type) {
                        var t_4 = this._responseHandlers.get(e.id);
                        t_4 && (t_4(e),
                            this._responseHandlers.delete(e.id));
                    }
                    else
                        "request" === e.type ? this.emit("request", e.data, function (t, n) {
                            _this._backend.send({
                                type: "response",
                                error: n,
                                id: e.id,
                                result: t
                            });
                        }) : this.emit("event", e.data);
                };
                _.prototype.dispose = function () {
                    this._responseHandlers.clear(),
                        this._unprocessedMessages.clear(),
                        this.removeAllListeners(),
                        this._disposeBackend();
                };
                _.prototype.emit = function (e) {
                    var t = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        t[_i - 1] = arguments[_i];
                    }
                    var n = this._listeners.get(e);
                    var r = !1;
                    return n && n.size && n.forEach(function (e) {
                        r = e.apply(void 0, t) || r;
                    }),
                        r || this._unprocessedMessages.add(t),
                        r;
                };
                _.prototype.on = function (e, t) {
                    var _this = this;
                    var n = this._listeners.get(e);
                    return n || (n = new Set,
                        this._listeners.set(e, n)),
                        n.add(t),
                        this._unprocessedMessages.forEach(function (e) {
                            t.apply(void 0, e) && _this._unprocessedMessages.delete(e);
                        }),
                        this;
                };
                _.prototype.removeAllListeners = function (e) {
                    return e ? this._listeners.delete(e) : this._listeners.clear(),
                        this;
                };
                _.prototype.removeListener = function (e, t) {
                    var n = this._listeners.get(e);
                    return n && n.delete(t),
                        this;
                };
                _.prototype.sendEvent = function (e) {
                    if (e === void 0) { e = {}; }
                    this._backend && this._backend.send({
                        type: "event",
                        data: e
                    });
                };
                _.prototype.sendRequest = function (e) {
                    var _this = this;
                    if (!this._backend)
                        return Promise.reject(new Error("No transport backend defined!"));
                    this._requestID++;
                    var t = this._requestID;
                    return new Promise(function (n, r) {
                        _this._responseHandlers.set(t, function (_a) {
                            var e = _a.error, t = _a.result;
                            void 0 !== t ? n(t) : r(void 0 !== e ? e : new Error("Unexpected response format!"));
                        }),
                            _this._backend.send({
                                type: "request",
                                data: e,
                                id: t
                            });
                    });
                };
                _.prototype.setBackend = function (e) {
                    this._disposeBackend(),
                        this._backend = e,
                        this._backend.setReceiveCallback(this._onMessageReceived.bind(this));
                };
                return _;
            }());
            var b = c(window.location).jitsi_meet_external_api_id, w = {};
            var L;
            "number" == typeof b && (w.scope = "jitsi_meet_external_api_" + b),
                (window.JitsiMeetJS || (window.JitsiMeetJS = {}),
                    window.JitsiMeetJS.app || (window.JitsiMeetJS.app = {}),
                    window.JitsiMeetJS.app).setExternalTransportBackend = function (e) { return L.setBackend(e); };
            var O = n(4), x = n(0);
            function j(e, t) {
                if (null == e)
                    return {};
                var n, r, i = function (e, t) {
                    if (null == e)
                        return {};
                    var n, r, i = {}, s = Object.keys(e);
                    for (r = 0; r < s.length; r++)
                        n = s[r],
                            t.indexOf(n) >= 0 || (i[n] = e[n]);
                    return i;
                }(e, t);
                if (Object.getOwnPropertySymbols) {
                    var s = Object.getOwnPropertySymbols(e);
                    for (r = 0; r < s.length; r++)
                        n = s[r],
                            t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
                }
                return i;
            }
            function S(e, t, n) {
                return t in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n,
                    e;
            }
            var E = ["css/all.css", "libs/alwaysontop.min.js"], C = {
                avatarUrl: "avatar-url",
                displayName: "display-name",
                e2eeKey: "e2ee-key",
                email: "email",
                toggleLobby: "toggle-lobby",
                hangup: "video-hangup",
                muteEveryone: "mute-everyone",
                password: "password",
                pinParticipant: "pin-participant",
                resizeLargeVideo: "resize-large-video",
                sendEndpointTextMessage: "send-endpoint-text-message",
                sendTones: "send-tones",
                setLargeVideoParticipant: "set-large-video-participant",
                setVideoQuality: "set-video-quality",
                startRecording: "start-recording",
                stopRecording: "stop-recording",
                subject: "subject",
                submitFeedback: "submit-feedback",
                toggleAudio: "toggle-audio",
                toggleChat: "toggle-chat",
                toggleFilmStrip: "toggle-film-strip",
                toggleShareScreen: "toggle-share-screen",
                toggleTileView: "toggle-tile-view",
                toggleVideo: "toggle-video"
            }, I = {
                "avatar-changed": "avatarChanged",
                "audio-availability-changed": "audioAvailabilityChanged",
                "audio-mute-status-changed": "audioMuteStatusChanged",
                "camera-error": "cameraError",
                "device-list-changed": "deviceListChanged",
                "display-name-change": "displayNameChange",
                "email-change": "emailChange",
                "endpoint-text-message-received": "endpointTextMessageReceived",
                "feedback-submitted": "feedbackSubmitted",
                "feedback-prompt-displayed": "feedbackPromptDisplayed",
                "filmstrip-display-changed": "filmstripDisplayChanged",
                "incoming-message": "incomingMessage",
                log: "log",
                "mic-error": "micError",
                "outgoing-message": "outgoingMessage",
                "participant-joined": "participantJoined",
                "participant-kicked-out": "participantKickedOut",
                "participant-left": "participantLeft",
                "participant-role-changed": "participantRoleChanged",
                "password-required": "passwordRequired",
                "proxy-connection-event": "proxyConnectionEvent",
                "video-ready-to-close": "readyToClose",
                "video-conference-joined": "videoConferenceJoined",
                "video-conference-left": "videoConferenceLeft",
                "video-availability-changed": "videoAvailabilityChanged",
                "video-mute-status-changed": "videoMuteStatusChanged",
                "video-quality-changed": "videoQualityChanged",
                "screen-sharing-status-changed": "screenSharingStatusChanged",
                "dominant-speaker-changed": "dominantSpeakerChanged",
                "subject-change": "subjectChange",
                "suspend-detected": "suspendDetected",
                "tile-view-changed": "tileViewChanged"
            };
            var k = 0;
            function R(e, t) {
                e._numberOfParticipants += t;
            }
            function P(e, t) {
                if (t === void 0) { t = {}; }
                return p(function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = null != arguments[t] ? arguments[t] : {}, r = Object.keys(n);
                        "function" == typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(n).filter((function (e) {
                            return Object.getOwnPropertyDescriptor(n, e).enumerable;
                        })))),
                            r.forEach((function (t) {
                                S(e, t, n[t]);
                            }));
                    }
                    return e;
                }({}, t, {
                    url: (t.noSSL ? "http" : "https") + "://" + e + "/#jitsi_meet_external_api_id=" + k
                }));
            }
            function N(e) {
                var t;
                return "string" == typeof e && null !== String(e).match(/([0-9]*\.?[0-9]+)(em|pt|px|%)$/) ? t = e : "number" == typeof e && (t = e + "px"),
                    t;
            }
            var D = (function (_super) {
                __extends(D, _super);
                function D(e) {
                    var t = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        t[_i - 1] = arguments[_i];
                    }
                    var _this = _super.call(this) || this;
                    var _a = function (e) {
                        if (!e.length)
                            return {};
                        switch (typeof e[0]) {
                            case "string":
                            case void 0:
                                {
                                    var t_5 = e[0], n_5 = e[1], r_2 = e[2], i_3 = e[3], s_3 = e[4], o_3 = e[5], a_1 = e[6], c_1 = e[7], l_1 = e[8];
                                    return {
                                        roomName: t_5,
                                        width: n_5,
                                        height: r_2,
                                        parentNode: i_3,
                                        configOverwrite: s_3,
                                        interfaceConfigOverwrite: o_3,
                                        noSSL: a_1,
                                        jwt: c_1,
                                        onload: l_1
                                    };
                                }
                            case "object":
                                return e[0];
                            default:
                                throw new Error("Can't parse the arguments!");
                        }
                    }(t), _b = _a.roomName, n = _b === void 0 ? "" : _b, _c = _a.width, r = _c === void 0 ? "100%" : _c, _d = _a.height, i = _d === void 0 ? "100%" : _d, _e = _a.parentNode, s = _e === void 0 ? document.body : _e, _f = _a.configOverwrite, o = _f === void 0 ? {} : _f, _g = _a.interfaceConfigOverwrite, c = _g === void 0 ? {} : _g, _h = _a.noSSL, l = _h === void 0 ? !1 : _h, u = _a.jwt, h = _a.onload, d = _a.invitees, p = _a.devices, f = _a.userInfo, g = _a.e2eeKey, m = a.getItem("jitsiLocalStorage");
                    _this._parentNode = s,
                        _this._url = P(e, {
                            configOverwrite: o,
                            interfaceConfigOverwrite: c,
                            jwt: u,
                            noSSL: l,
                            roomName: n,
                            devices: p,
                            userInfo: f,
                            appData: {
                                localStorageContent: m
                            }
                        }),
                        _this._createIFrame(i, r, h),
                        _this._transport = new _({
                            backend: new y({
                                postisOptions: {
                                    allowedOrigin: new URL(_this._url).origin,
                                    scope: "jitsi_meet_external_api_" + k,
                                    window: _this._frame.contentWindow
                                }
                            })
                        }),
                        Array.isArray(d) && d.length > 0 && _this.invite(d),
                        _this._tmpE2EEKey = g,
                        _this._isLargeVideoVisible = !0,
                        _this._numberOfParticipants = 0,
                        _this._participants = {},
                        _this._myUserID = void 0,
                        _this._onStageParticipant = void 0,
                        _this._setupListeners(),
                        k++;
                    return _this;
                }
                D.prototype._createIFrame = function (e, t, n) {
                    var r = "jitsiConferenceFrame" + k;
                    this._frame = document.createElement("iframe"),
                        this._frame.allow = "camera; microphone; display-capture",
                        this._frame.src = this._url,
                        this._frame.name = r,
                        this._frame.id = r,
                        this._setSize(e, t),
                        this._frame.setAttribute("allowFullScreen", "true"),
                        this._frame.style.border = 0,
                        n && (this._frame.onload = n),
                        this._frame = this._parentNode.appendChild(this._frame);
                };
                D.prototype._getAlwaysOnTopResources = function () {
                    var e = this._frame.contentWindow, t = e.document;
                    var n = "";
                    var r = t.querySelector("base");
                    if (r && r.href)
                        n = r.href;
                    else {
                        var _a = e.location, t_6 = _a.protocol, r_3 = _a.host;
                        n = t_6 + "//" + r_3;
                    }
                    return E.map(function (e) { return new URL(e, n).href; });
                };
                D.prototype._getFormattedDisplayName = function (e) {
                    var t = (this._participants[e] || {}).formattedDisplayName;
                    return t;
                };
                D.prototype._getOnStageParticipant = function () {
                    return this._onStageParticipant;
                };
                D.prototype._getLargeVideo = function () {
                    var e = this.getIFrame();
                    if (this._isLargeVideoVisible && e && e.contentWindow && e.contentWindow.document)
                        return e.contentWindow.document.getElementById("largeVideo");
                };
                D.prototype._getParticipantVideo = function (e) {
                    var t = this.getIFrame();
                    if (t && t.contentWindow && t.contentWindow.document)
                        return void 0 === e || e === this._myUserID ? t.contentWindow.document.getElementById("localVideo_container") : t.contentWindow.document.querySelector("#participant_" + e + " video");
                };
                D.prototype._setSize = function (e, t) {
                    var n = N(e), r = N(t);
                    void 0 !== n && (this._height = e,
                        this._frame.style.height = n),
                        void 0 !== r && (this._width = t,
                            this._frame.style.width = r);
                };
                D.prototype._setupListeners = function () {
                    var _this = this;
                    this._transport.on("event", function (e) {
                        var t = e.name, n = j(e, ["name"]);
                        var r = n.id;
                        switch (t) {
                            case "video-conference-joined":
                                void 0 !== _this._tmpE2EEKey && (_this.executeCommand(C.e2eeKey, _this._tmpE2EEKey),
                                    _this._tmpE2EEKey = void 0),
                                    _this._myUserID = r,
                                    _this._participants[r] = {
                                        avatarURL: n.avatarURL
                                    };
                            case "participant-joined":
                                _this._participants[r] = _this._participants[r] || {},
                                    _this._participants[r].displayName = n.displayName,
                                    _this._participants[r].formattedDisplayName = n.formattedDisplayName,
                                    R(_this, 1);
                                break;
                            case "participant-left":
                                R(_this, -1),
                                    delete _this._participants[r];
                                break;
                            case "display-name-change":
                                {
                                    var e_7 = _this._participants[r];
                                    e_7 && (e_7.displayName = n.displayname,
                                        e_7.formattedDisplayName = n.formattedDisplayName);
                                    break;
                                }
                            case "email-change":
                                {
                                    var e_8 = _this._participants[r];
                                    e_8 && (e_8.email = n.email);
                                    break;
                                }
                            case "avatar-changed":
                                {
                                    var e_9 = _this._participants[r];
                                    e_9 && (e_9.avatarURL = n.avatarURL);
                                    break;
                                }
                            case "on-stage-participant-changed":
                                _this._onStageParticipant = r,
                                    _this.emit("largeVideoChanged");
                                break;
                            case "large-video-visibility-changed":
                                _this._isLargeVideoVisible = n.isVisible,
                                    _this.emit("largeVideoChanged");
                                break;
                            case "video-conference-left":
                                R(_this, -1),
                                    delete _this._participants[_this._myUserID];
                                break;
                            case "video-quality-changed":
                                _this._videoQuality = n.videoQuality;
                                break;
                            case "local-storage-changed":
                                return a.setItem("jitsiLocalStorage", n.localStorageContent),
                                    !0;
                        }
                        var i = I[t];
                        return !!i && (_this.emit(i, n),
                            !0);
                    });
                };
                D.prototype.addEventListener = function (e, t) {
                    this.on(e, t);
                };
                D.prototype.addEventListeners = function (e) {
                    for (var t_7 in e)
                        this.addEventListener(t_7, e[t_7]);
                };
                D.prototype.captureLargeVideoScreenshot = function () {
                    return this._transport.sendRequest({
                        name: "capture-largevideo-screenshot"
                    });
                };
                D.prototype.dispose = function () {
                    this.emit("_willDispose"),
                        this._transport.dispose(),
                        this.removeAllListeners(),
                        this._frame && this._frame.parentNode && this._frame.parentNode.removeChild(this._frame);
                };
                D.prototype.executeCommand = function (e) {
                    var t = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        t[_i - 1] = arguments[_i];
                    }
                    e in C ? this._transport.sendEvent({
                        data: t,
                        name: C[e]
                    }) : console.error("Not supported command name.");
                };
                D.prototype.executeCommands = function (e) {
                    for (var t_8 in e)
                        this.executeCommand(t_8, e[t_8]);
                };
                D.prototype.getAvailableDevices = function () {
                    return Object(x.a)(this._transport);
                };
                D.prototype.getCurrentDevices = function () {
                    return Object(x.b)(this._transport);
                };
                D.prototype.getParticipantsInfo = function () {
                    var e = Object.keys(this._participants), t = Object.values(this._participants);
                    return t.forEach(function (t, n) {
                        t.participantId = e[n];
                    }),
                        t;
                };
                D.prototype.getVideoQuality = function () {
                    return this._videoQuality;
                };
                D.prototype.isAudioAvailable = function () {
                    return this._transport.sendRequest({
                        name: "is-audio-available"
                    });
                };
                D.prototype.isDeviceChangeAvailable = function (e) {
                    return Object(x.c)(this._transport, e);
                };
                D.prototype.isDeviceListAvailable = function () {
                    return Object(x.d)(this._transport);
                };
                D.prototype.isMultipleAudioInputSupported = function () {
                    return Object(x.e)(this._transport);
                };
                D.prototype.invite = function (e) {
                    return Array.isArray(e) && 0 !== e.length ? this._transport.sendRequest({
                        name: "invite",
                        invitees: e
                    }) : Promise.reject(new TypeError("Invalid Argument"));
                };
                D.prototype.isAudioMuted = function () {
                    return this._transport.sendRequest({
                        name: "is-audio-muted"
                    });
                };
                D.prototype.isSharingScreen = function () {
                    return this._transport.sendRequest({
                        name: "is-sharing-screen"
                    });
                };
                D.prototype.getAvatarURL = function (e) {
                    var t = (this._participants[e] || {}).avatarURL;
                    return t;
                };
                D.prototype.getDisplayName = function (e) {
                    var t = (this._participants[e] || {}).displayName;
                    return t;
                };
                D.prototype.getEmail = function (e) {
                    var t = (this._participants[e] || {}).email;
                    return t;
                };
                D.prototype.getIFrame = function () {
                    return this._frame;
                };
                D.prototype.getNumberOfParticipants = function () {
                    return this._numberOfParticipants;
                };
                D.prototype.isVideoAvailable = function () {
                    return this._transport.sendRequest({
                        name: "is-video-available"
                    });
                };
                D.prototype.isVideoMuted = function () {
                    return this._transport.sendRequest({
                        name: "is-video-muted"
                    });
                };
                D.prototype.pinParticipant = function (e) {
                    this.executeCommand("pinParticipant", e);
                };
                D.prototype.removeEventListener = function (e) {
                    this.removeAllListeners(e);
                };
                D.prototype.removeEventListeners = function (e) {
                    var _this = this;
                    e.forEach(function (e) { return _this.removeEventListener(e); });
                };
                D.prototype.resizeLargeVideo = function (e, t) {
                    e <= this._width && t <= this._height && this.executeCommand("resizeLargeVideo", e, t);
                };
                D.prototype.sendProxyConnectionEvent = function (e) {
                    this._transport.sendEvent({
                        data: [e],
                        name: "proxy-connection-event"
                    });
                };
                D.prototype.setAudioInputDevice = function (e, t) {
                    return Object(x.f)(this._transport, e, t);
                };
                D.prototype.setAudioOutputDevice = function (e, t) {
                    return Object(x.g)(this._transport, e, t);
                };
                D.prototype.setLargeVideoParticipant = function (e) {
                    this.executeCommand("setLargeVideoParticipant", e);
                };
                D.prototype.setVideoInputDevice = function (e, t) {
                    return Object(x.h)(this._transport, e, t);
                };
                D.prototype._getElectronPopupsConfig = function () {
                    return Promise.resolve(O);
                };
                return D;
            }(i.a));
        }
    ]);
}));
//# sourceMappingURL=jitsi-meet.js.map