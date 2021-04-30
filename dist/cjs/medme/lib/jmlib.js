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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConferenceAndConnect = exports.ConferenceCtl = exports.ConferenceConfig = exports.ConferenceEvents = exports.ConferenceSession = exports.JitsiRemoteTrack = exports.JitsiLocalTrack = exports.JitsiConnection = exports.JitsiConference = exports.JitsiMeetJS = void 0;
var lib_jitsi_meet_1 = __importDefault(require("@medme/lib-jitsi-meet"));
exports.JitsiMeetJS = lib_jitsi_meet_1.default;
var JitsiConference_1 = __importDefault(require("@medme/lib-jitsi-meet/JitsiConference"));
exports.JitsiConference = JitsiConference_1.default;
var JitsiConnection_1 = __importDefault(require("@medme/lib-jitsi-meet/JitsiConnection"));
exports.JitsiConnection = JitsiConnection_1.default;
var JitsiLocalTrack_1 = __importDefault(require("@medme/lib-jitsi-meet/modules/RTC/JitsiLocalTrack"));
exports.JitsiLocalTrack = JitsiLocalTrack_1.default;
var JitsiRemoteTrack_1 = __importDefault(require("@medme/lib-jitsi-meet/modules/RTC/JitsiRemoteTrack"));
exports.JitsiRemoteTrack = JitsiRemoteTrack_1.default;
var defaultEnv = __importStar(require("../env"));
var ConferenceSession = (function () {
    function ConferenceSession() {
        var _this = this;
        this.getLocalTracks = function () { return _this._localTracks; };
        this.getRemoteTracks = function () { return _this._remoteTracks; };
        this.connection = null;
        this.isJoined = false;
        this.room = null;
        this._localTracks = [];
        this._remoteTracks = new Map();
        this.isVideo = true;
    }
    return ConferenceSession;
}());
exports.ConferenceSession = ConferenceSession;
;
var voidFn = function () { };
var ConferenceEvents = (function () {
    function ConferenceEvents() {
        this.onLocalTrack = voidFn;
        this.onRemoteTrack = voidFn;
        this.onConferenceJoined = voidFn;
        this.onUserLeft = voidFn;
        this.onConnected = voidFn;
        this.onConnectionFailed = voidFn;
        this.onDeviceListChanged = voidFn;
        this.onConnectionDisconnected = voidFn;
        this.onSwitchVideo = voidFn;
    }
    return ConferenceEvents;
}());
exports.ConferenceEvents = ConferenceEvents;
var ConferenceConfig = (function () {
    function ConferenceConfig(clientNode, env) {
        this.clientNode = clientNode;
        this.env = env || defaultEnv;
    }
    ConferenceConfig.prototype.getConnectionOptions = function () {
        var env = this.env;
        var options = {
            hosts: {
                domain: env.JITSI_DOMAIN,
                muc: env.JITSI_MUC
            },
            bosh: env.JITSI_BOTH,
            clientNode: this.clientNode
        };
        return options;
    };
    ConferenceConfig.prototype.getConferenceOptions = function () {
        var confOptions = {
            openBridgeChannel: true
        };
        return confOptions;
    };
    return ConferenceConfig;
}());
exports.ConferenceConfig = ConferenceConfig;
var ConferenceCtl = (function () {
    function ConferenceCtl(sess, events) {
        this.session = sess;
        this.events = events;
    }
    ConferenceCtl.prototype.changeAudioOutput = function (selected) {
        lib_jitsi_meet_1.default.mediaDevices.setAudioOutputDevice(selected);
    };
    ConferenceCtl.prototype.unload = function () {
        for (var i = 0; i < this.session._localTracks.length; i++) {
            this.session._localTracks[i].dispose();
        }
        this.session.room.leave();
        this.session.connection.disconnect();
    };
    ConferenceCtl.prototype.switchVideo = function () {
        var _this = this;
        this.session.isVideo = !this.session.isVideo;
        if (this.session._localTracks[1]) {
            this.session._localTracks[1].dispose();
            this.session._localTracks.pop();
        }
        lib_jitsi_meet_1.default.createLocalTracks({
            devices: [this.session.isVideo ? 'video' : 'desktop']
        })
            .then(function (tracks) {
            _this.session._localTracks.push(tracks[0]);
            _this.events.onSwitchVideo(_this.session);
            _this.session.room.addTrack(_this.session._localTracks[1]);
        })
            .catch(function (error) { return console.log(error); });
    };
    return ConferenceCtl;
}());
exports.ConferenceCtl = ConferenceCtl;
function createConferenceAndConnect(config, events) {
    var options = config.getConnectionOptions();
    var confOptions = config.getConferenceOptions();
    var sess = new ConferenceSession();
    var sessCtl = new ConferenceCtl(sess, events);
    function onLocalTracks(tracks) {
        sess._localTracks = tracks;
        for (var i = 0; i < sess._localTracks.length; i++) {
            events.onLocalTrack(sess._localTracks[i], i, sess);
            if (sess.isJoined) {
                sess.room.addTrack(sess._localTracks[i]);
            }
        }
    }
    function onRemoteTrack(track) {
        if (track.isLocal()) {
            return;
        }
        var participant = track.getParticipantId();
        if (!sess._remoteTracks[participant]) {
            sess._remoteTracks[participant] = [];
        }
        var idx = sess._remoteTracks[participant].push(track);
        events.onRemoteTrack(track, idx, sess);
    }
    function onConferenceJoined() {
        console.log('conference joined!');
        sess.isJoined = true;
        for (var i = 0; i < sess._localTracks.length; i++) {
            sess.room.addTrack(sess._localTracks[i]);
        }
        events.onConferenceJoined(sess);
    }
    function onUserLeft(id) {
        console.log('user left');
        if (!sess._remoteTracks[id]) {
            return;
        }
        events.onUserLeft(id, sess);
    }
    function onConnectionSuccess() {
        sess.room = sess.connection.initJitsiConference('conference', confOptions);
        sess.room.on(lib_jitsi_meet_1.default.events.conference.TRACK_ADDED, onRemoteTrack);
        sess.room.on(lib_jitsi_meet_1.default.events.conference.TRACK_REMOVED, function (track) {
            console.log("track removed!!!" + track);
        });
        sess.room.on(lib_jitsi_meet_1.default.events.conference.CONFERENCE_JOINED, onConferenceJoined);
        sess.room.on(lib_jitsi_meet_1.default.events.conference.USER_JOINED, function (id) {
            console.log('user join');
            sess._remoteTracks[id] = [];
        });
        sess.room.on(lib_jitsi_meet_1.default.events.conference.USER_LEFT, onUserLeft);
        sess.room.on(lib_jitsi_meet_1.default.events.conference.TRACK_MUTE_CHANGED, function (track) {
            console.log(track.getType() + " - " + track.isMuted());
        });
        sess.room.on(lib_jitsi_meet_1.default.events.conference.DISPLAY_NAME_CHANGED, function (userID, displayName) { return console.log(userID + " - " + displayName); });
        sess.room.on(lib_jitsi_meet_1.default.events.conference.TRACK_AUDIO_LEVEL_CHANGED, function (userID, audioLevel) { return console.log(userID + " - " + audioLevel); });
        sess.room.on(lib_jitsi_meet_1.default.events.conference.PHONE_NUMBER_CHANGED, function () { return console.log(sess.room.getPhoneNumber() + " - " + sess.room.getPhonePin()); });
        sess.room.join();
        events.onConnected(sess);
    }
    function onConnectionFailed() {
        console.error('Connection Failed!');
        events.onConnectionFailed(sess);
    }
    function onDeviceListChanged(devices) {
        console.info('current devices', devices);
        events.onDeviceListChanged(devices, sess);
    }
    function disconnect() {
        console.log('disconnect!');
        sess.connection.removeEventListener(lib_jitsi_meet_1.default.events.connection.CONNECTION_ESTABLISHED, onConnectionSuccess);
        sess.connection.removeEventListener(lib_jitsi_meet_1.default.events.connection.CONNECTION_FAILED, onConnectionFailed);
        sess.connection.removeEventListener(lib_jitsi_meet_1.default.events.connection.CONNECTION_DISCONNECTED, disconnect);
        events.onConnectionDisconnected(sess);
    }
    var unload = sessCtl.unload.bind(sessCtl);
    var switchVideo = sessCtl.switchVideo.bind(sessCtl);
    var initOptions = {
        disableAudioLevels: true
    };
    lib_jitsi_meet_1.default.init(initOptions);
    sess.connection = new lib_jitsi_meet_1.default.JitsiConnection(null, null, options);
    sess.connection.addEventListener(lib_jitsi_meet_1.default.events.connection.CONNECTION_ESTABLISHED, onConnectionSuccess);
    sess.connection.addEventListener(lib_jitsi_meet_1.default.events.connection.CONNECTION_FAILED, onConnectionFailed);
    sess.connection.addEventListener(lib_jitsi_meet_1.default.events.connection.CONNECTION_DISCONNECTED, disconnect);
    lib_jitsi_meet_1.default.mediaDevices.addEventListener(lib_jitsi_meet_1.default.events.mediaDevices.DEVICE_LIST_CHANGED, onDeviceListChanged);
    sess.connection.connect();
    lib_jitsi_meet_1.default.createLocalTracks({ devices: ['audio', 'video'] })
        .then(onLocalTracks)
        .catch(function (error) {
        throw error;
    });
    return sessCtl;
}
exports.createConferenceAndConnect = createConferenceAndConnect;
//# sourceMappingURL=jmlib.js.map