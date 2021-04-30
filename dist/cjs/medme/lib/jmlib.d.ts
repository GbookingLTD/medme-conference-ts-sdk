import JitsiMeetJS from "@medme/lib-jitsi-meet/JitsiMeetJS";
import JitsiConference from "@medme/lib-jitsi-meet/JitsiConference";
import JitsiConnection from "@medme/lib-jitsi-meet/JitsiConnection";
import JitsiLocalTrack from "@medme/lib-jitsi-meet/modules/RTC/JitsiLocalTrack";
import JitsiRemoteTrack from "@medme/lib-jitsi-meet/modules/RTC/JitsiRemoteTrack";
export { JitsiMeetJS, JitsiConference, JitsiConnection, JitsiLocalTrack, JitsiRemoteTrack };
export declare class ConferenceSession {
    connection: JitsiConnection;
    isJoined: boolean;
    room: JitsiConference;
    _localTracks: Array<JitsiLocalTrack>;
    _remoteTracks: Map<string, JitsiRemoteTrack>;
    isVideo: boolean;
    constructor();
    getLocalTracks: () => Array<JitsiLocalTrack>;
    getRemoteTracks: () => Map<string, JitsiRemoteTrack>;
}
export declare class ConferenceEvents {
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
export declare class ConferenceConfig {
    env: any;
    clientNode: string;
    constructor(clientNode: string, env?: any);
    getConnectionOptions(): {
        hosts: {
            domain: any;
            muc: any;
        };
        bosh: any;
        clientNode: string;
    };
    getConferenceOptions(): {
        openBridgeChannel: boolean;
    };
}
export declare class ConferenceCtl {
    session: ConferenceSession;
    events: ConferenceEvents;
    constructor(sess: ConferenceSession, events: ConferenceEvents);
    changeAudioOutput(selected: string): void;
    unload(): void;
    switchVideo(): void;
}
export declare function createConferenceAndConnect(config: ConferenceConfig, events: ConferenceEvents): ConferenceCtl;
