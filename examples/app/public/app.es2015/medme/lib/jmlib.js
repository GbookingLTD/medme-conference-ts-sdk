import JitsiMeetJS from "@medme/lib-jitsi-meet";
import JitsiConference from "@medme/lib-jitsi-meet/JitsiConference";
import JitsiConnection from "@medme/lib-jitsi-meet/JitsiConnection";
import JitsiLocalTrack from "@medme/lib-jitsi-meet/modules/RTC/JitsiLocalTrack";
import JitsiRemoteTrack from "@medme/lib-jitsi-meet/modules/RTC/JitsiRemoteTrack";
import * as defaultEnv from "../env";
export { JitsiMeetJS, JitsiConference, JitsiConnection, JitsiLocalTrack, JitsiRemoteTrack };
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
export { ConferenceSession };
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
export { ConferenceEvents };
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
export { ConferenceConfig };
var ConferenceCtl = (function () {
    function ConferenceCtl(sess, events) {
        this.session = sess;
        this.events = events;
    }
    ConferenceCtl.prototype.changeAudioOutput = function (selected) {
        JitsiMeetJS.mediaDevices.setAudioOutputDevice(selected);
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
        JitsiMeetJS.createLocalTracks({
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
export { ConferenceCtl };
export function createConferenceAndConnect(config, events) {
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
        sess.room.on(JitsiMeetJS.events.conference.TRACK_ADDED, onRemoteTrack);
        sess.room.on(JitsiMeetJS.events.conference.TRACK_REMOVED, function (track) {
            console.log("track removed!!!" + track);
        });
        sess.room.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, onConferenceJoined);
        sess.room.on(JitsiMeetJS.events.conference.USER_JOINED, function (id) {
            console.log('user join');
            sess._remoteTracks[id] = [];
        });
        sess.room.on(JitsiMeetJS.events.conference.USER_LEFT, onUserLeft);
        sess.room.on(JitsiMeetJS.events.conference.TRACK_MUTE_CHANGED, function (track) {
            console.log(track.getType() + " - " + track.isMuted());
        });
        sess.room.on(JitsiMeetJS.events.conference.DISPLAY_NAME_CHANGED, function (userID, displayName) { return console.log(userID + " - " + displayName); });
        sess.room.on(JitsiMeetJS.events.conference.TRACK_AUDIO_LEVEL_CHANGED, function (userID, audioLevel) { return console.log(userID + " - " + audioLevel); });
        sess.room.on(JitsiMeetJS.events.conference.PHONE_NUMBER_CHANGED, function () { return console.log(sess.room.getPhoneNumber() + " - " + sess.room.getPhonePin()); });
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
        sess.connection.removeEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED, onConnectionSuccess);
        sess.connection.removeEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED, onConnectionFailed);
        sess.connection.removeEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, disconnect);
        events.onConnectionDisconnected(sess);
    }
    var unload = sessCtl.unload.bind(sessCtl);
    var switchVideo = sessCtl.switchVideo.bind(sessCtl);
    var initOptions = {
        disableAudioLevels: true
    };
    JitsiMeetJS.init(initOptions);
    sess.connection = new JitsiMeetJS.JitsiConnection(null, null, options);
    sess.connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED, onConnectionSuccess);
    sess.connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED, onConnectionFailed);
    sess.connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, disconnect);
    JitsiMeetJS.mediaDevices.addEventListener(JitsiMeetJS.events.mediaDevices.DEVICE_LIST_CHANGED, onDeviceListChanged);
    sess.connection.connect();
    JitsiMeetJS.createLocalTracks({ devices: ['audio', 'video'] })
        .then(onLocalTracks)
        .catch(function (error) {
        throw error;
    });
    return sessCtl;
}
//# sourceMappingURL=jmlib.js.map