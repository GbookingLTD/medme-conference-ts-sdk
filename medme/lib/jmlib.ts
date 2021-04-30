import JitsiMeetJS from "@medme/lib-jitsi-meet";
import JitsiConference from "@medme/lib-jitsi-meet/JitsiConference";
import JitsiConnection from "@medme/lib-jitsi-meet/JitsiConnection";
import JitsiLocalTrack from "@medme/lib-jitsi-meet/modules/RTC/JitsiLocalTrack"
import JitsiRemoteTrack from "@medme/lib-jitsi-meet/modules/RTC/JitsiRemoteTrack";

import * as defaultEnv from "../env";

export {
    JitsiMeetJS,
    JitsiConference,
    JitsiConnection,
    JitsiLocalTrack,
    JitsiRemoteTrack
};

export class ConferenceSession {
    connection: JitsiConnection;
    isJoined: boolean;
    room: JitsiConference;
    
    _localTracks: Array<JitsiLocalTrack>;
    _remoteTracks: Map<string, JitsiRemoteTrack>;

    isVideo: boolean;

    constructor() {
        this.connection = null;
        this.isJoined = false;
        this.room = null;
        this._localTracks = [];
        this._remoteTracks = new Map<string, JitsiRemoteTrack>();
        this.isVideo = true;
    }

    getLocalTracks = (): Array<JitsiLocalTrack> => this._localTracks;
    getRemoteTracks = (): Map<string, JitsiRemoteTrack> => this._remoteTracks;
};

const voidFn = () => {};

export class ConferenceEvents {
    constructor() {
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

    onLocalTrack: (track: JitsiLocalTrack, idx: number, session: ConferenceSession) => void;
    onRemoteTrack: (track: JitsiRemoteTrack, idx: number, session: ConferenceSession) => void;
    onConferenceJoined: (session: ConferenceSession) => void;
    onUserLeft: (id: string, session: ConferenceSession) => void;
    onConnected: (session: ConferenceSession) => void;
    onConnectionFailed: (session: ConferenceSession) => void;
    onDeviceListChanged: (devices: Array<MediaDeviceInfo>, session: ConferenceSession) => void;
    onConnectionDisconnected: (session: ConferenceSession) => void;
    onSwitchVideo: (session: ConferenceSession) => void;
}

export class ConferenceConfig {
    env: any;
    clientNode: string;

    constructor(clientNode: string, env?: any) {
        this.clientNode = clientNode;
        this.env = env || defaultEnv;
    }

    getConnectionOptions() {
        const env = this.env;
        const options = {
            hosts: {
                domain: env.JITSI_DOMAIN,
                muc: env.JITSI_MUC // FIXME: use XEP-0030
            },
            bosh: env.JITSI_BOTH, // FIXME: use xep-0156 for that
    
            // The name of client node advertised in XEP-0115 'c' stanza
            clientNode: this.clientNode
        };

        return options;
    }

    getConferenceOptions() {
        const confOptions = {
            openBridgeChannel: true
        };

        return confOptions;
    }
}

export class ConferenceCtl {
    session: ConferenceSession;
    events: ConferenceEvents;

    constructor(sess: ConferenceSession, events: ConferenceEvents) {
        this.session = sess;
        this.events = events;

    }

    changeAudioOutput(selected: string): void {
        JitsiMeetJS.mediaDevices.setAudioOutputDevice(selected);
    }

    unload() {
        for (let i = 0; i < this.session._localTracks.length; i++) {
            this.session._localTracks[i].dispose();
        }
        this.session.room.leave();
        this.session.connection.disconnect();
    }

    switchVideo() {
        this.session.isVideo = !this.session.isVideo;
        if (this.session._localTracks[1]) {
            this.session._localTracks[1].dispose();
            this.session._localTracks.pop();
        }
        JitsiMeetJS.createLocalTracks({
            devices: [ this.session.isVideo ? 'video' : 'desktop' ]
        })
            .then(tracks => {
                this.session._localTracks.push(tracks[0]);
                this.events.onSwitchVideo(this.session);
                this.session.room.addTrack(this.session._localTracks[1]);
            })
            .catch(error => console.log(error));
    }
}

export function createConferenceAndConnect(config: ConferenceConfig, events: ConferenceEvents) {
    const options = config.getConnectionOptions();
    const confOptions = config.getConferenceOptions();

    const sess = new ConferenceSession();
    const sessCtl = new ConferenceCtl(sess, events);

    /**
     * Handles local tracks.
     * @param tracks Array with JitsiTrack objects
     */
    function onLocalTracks(tracks: Array<JitsiLocalTrack>) {
        sess._localTracks = tracks;
        for (let i = 0; i < sess._localTracks.length; i++) {
            events.onLocalTrack(sess._localTracks[i], i, sess);

            if (sess.isJoined) {
                sess.room.addTrack(sess._localTracks[i]);
            }
        }
    }

    /**
     * Handles remote tracks
     * @param track JitsiTrack object
     */
    function onRemoteTrack(track: JitsiRemoteTrack) {
        if (track.isLocal()) {
            return;
        }
        const participant = track.getParticipantId();

        if (!sess._remoteTracks[participant]) {
            sess._remoteTracks[participant] = [];
        }
        const idx = sess._remoteTracks[participant].push(track);

        events.onRemoteTrack(track, idx, sess);
    }

    /**
     * That function is executed when the conference is joined
     */
    function onConferenceJoined() {
        console.log('conference joined!');
        sess.isJoined = true;
        for (let i = 0; i < sess._localTracks.length; i++) {
            sess.room.addTrack(sess._localTracks[i]);
        }

        events.onConferenceJoined(sess);
    }

    /**
     *
     * @param {string} id
     */
    function onUserLeft(id: string) {
        console.log('user left');
        if (!sess._remoteTracks[id]) {
            return;
        }
        events.onUserLeft(id, sess);
    }

    /**
     * That function is called when connection is established successfully
     */
    function onConnectionSuccess() {
        sess.room = sess.connection.initJitsiConference('conference', confOptions);
        sess.room.on(JitsiMeetJS.events.conference.TRACK_ADDED, onRemoteTrack);
        sess.room.on(JitsiMeetJS.events.conference.TRACK_REMOVED, track => {
            console.log(`track removed!!!${track}`);
        });
        sess.room.on(
            JitsiMeetJS.events.conference.CONFERENCE_JOINED,
            onConferenceJoined);
        sess.room.on(JitsiMeetJS.events.conference.USER_JOINED, id => {
            console.log('user join');
            sess._remoteTracks[id] = [];
        });
        sess.room.on(JitsiMeetJS.events.conference.USER_LEFT, onUserLeft);
        sess.room.on(JitsiMeetJS.events.conference.TRACK_MUTE_CHANGED, track => {
            console.log(`${track.getType()} - ${track.isMuted()}`);
        });
        sess.room.on(
            JitsiMeetJS.events.conference.DISPLAY_NAME_CHANGED,
            (userID, displayName) => console.log(`${userID} - ${displayName}`));
        sess.room.on(
            JitsiMeetJS.events.conference.TRACK_AUDIO_LEVEL_CHANGED,
            (userID, audioLevel) => console.log(`${userID} - ${audioLevel}`));
        sess.room.on(
            JitsiMeetJS.events.conference.PHONE_NUMBER_CHANGED,
            () => console.log(`${sess.room.getPhoneNumber()} - ${sess.room.getPhonePin()}`));
        sess.room.join();

        events.onConnected(sess);
    }

    /**
     * This function is called when the connection fail.
     */
    function onConnectionFailed() {
        console.error('Connection Failed!');
        events.onConnectionFailed(sess);
    }

    /**
     * This function is called when the connection fail.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo
     */
    function onDeviceListChanged(devices: Array<MediaDeviceInfo>) {
        console.info('current devices', devices);
        events.onDeviceListChanged(devices, sess);
    }

    /**
     * This function is called when we disconnect.
     */
    function disconnect() {
        console.log('disconnect!');
        sess.connection.removeEventListener(
            JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
            onConnectionSuccess);
        sess.connection.removeEventListener(
            JitsiMeetJS.events.connection.CONNECTION_FAILED,
            onConnectionFailed);
        sess.connection.removeEventListener(
            JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
            disconnect);

        events.onConnectionDisconnected(sess);
    }

    /**
     *
     */
    const unload: () => void = 
        sessCtl.unload.bind(sessCtl);

    /**
     *
     */
    const switchVideo: () => void =
        sessCtl.switchVideo.bind(sessCtl);

    // JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);
    const initOptions = {
        disableAudioLevels: true
    };

    JitsiMeetJS.init(initOptions);

    sess.connection = new JitsiMeetJS.JitsiConnection(null, null, options);

    sess.connection.addEventListener(
        JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
        onConnectionSuccess);
    sess.connection.addEventListener(
        JitsiMeetJS.events.connection.CONNECTION_FAILED,
        onConnectionFailed);
    sess.connection.addEventListener(
        JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
        disconnect);

    JitsiMeetJS.mediaDevices.addEventListener(
        JitsiMeetJS.events.mediaDevices.DEVICE_LIST_CHANGED,
        onDeviceListChanged);

    sess.connection.connect();

    JitsiMeetJS.createLocalTracks({ devices: [ 'audio', 'video' ] })
        .then(onLocalTracks)
        .catch(error => {
            throw error;
        });

    return sessCtl;
}