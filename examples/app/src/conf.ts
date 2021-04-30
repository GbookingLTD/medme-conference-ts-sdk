import $ from "jquery";
//import {JML} from "@medme/mmconf-ts-sdk";
import {JML} from "../../../index";

import JitsiMeetJS = JML.JitsiMeetJS;
import ConferenceEvents = JML.ConferenceEvents;
import ConferenceConfig = JML.ConferenceConfig;
import JitsiLocalTrack = JML.JitsiLocalTrack;
import ConferenceSession = JML.ConferenceSession;
import JitsiRemoteTrack = JML.JitsiRemoteTrack;
import createConference = JML.createConferenceAndConnect;

export function openConference() {
    // The name of client node advertised in XEP-0115 'c' stanza
    const CLIENT_NODE = location.host + ":" + location.port // "localhost:4000"

    const config = new ConferenceConfig(CLIENT_NODE);
    const events = new ConferenceEvents();

    events.onConnected = (sess: ConferenceSession) =>
        console.info("user connected");
    
    events.onLocalTrack = (localTrack: JitsiLocalTrack, idx: number, sess: ConferenceSession) => {
        localTrack.addEventListener(
            JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED,
            audioLevel => console.log(`Audio Level local: ${audioLevel}`));
        localTrack.addEventListener(
            JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
            () => console.log('local track muted'));
        localTrack.addEventListener(
            JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
            () => console.log('local track stoped'));
        localTrack.addEventListener(
            JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
            deviceId =>
                console.log(
                    `track audio output device was changed to ${deviceId}`));

        if (localTrack.getType() === 'video') {
            $('body').append(`<video autoplay='1' id='localVideo${idx}' />`);
            localTrack.attach($(`#localVideo${idx}`)[0]);
        } else {
            $('body').append(
                `<audio autoplay='1' muted='true' id='localAudio${idx}' />`);
                localTrack.attach($(`#localAudio${idx}`)[0]);
        }

        console.info('localTrack stream', 
            localTrack.getOriginalStream());
    };

    events.onRemoteTrack = (track: JitsiRemoteTrack, idx: number, sess: ConferenceSession) => {
        const participant = track.getParticipantId();

        track.addEventListener(
            JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED,
            audioLevel => console.log(`Audio Level remote: ${audioLevel}`));
        track.addEventListener(
            JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
            () => console.log('remote track muted'));
        track.addEventListener(
            JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
            () => console.log('remote track stoped'));
        track.addEventListener(JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
            deviceId =>
                console.log(
                    `track audio output device was changed to ${deviceId}`));

        const id = participant + track.getType() + idx;

        if (track.getType() === 'video') {
            $('body').append(
                `<video autoplay='1' id='${participant}video${idx}' />`);
        } else {
            $('body').append(
                `<audio autoplay='1' id='${participant}audio${idx}' />`);
        }
        track.attach($(`#${id}`)[0]);
    };

    events.onUserLeft = (id: string, sess: ConferenceSession) => {
        const tracks = sess.getRemoteTracks()[id];
        for (let i = 0; i < tracks.length; i++) {
            tracks[i].detach($(`#${id}${tracks[i].getType()}`));
        };
    }

    events.onSwitchVideo = (sess: ConferenceSession) => {
        sess._localTracks[1].addEventListener(
            JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
            () => console.log('local track muted'));
        sess._localTracks[1].addEventListener(
            JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
            () => console.log('local track stoped'));
        sess._localTracks[1].attach($('#localVideo1')[0]);
    };

    const sessCtl = createConference(config, events);

    $(window).bind('beforeunload', sessCtl.unload);
    $(window).bind('unload', sessCtl.unload);

    if (JitsiMeetJS.mediaDevices.isDeviceChangeAvailable('output')) {
        JitsiMeetJS.mediaDevices.enumerateDevices(devices => {
            const audioOutputDevices
                = devices.filter(d => d.kind === 'audiooutput');

            if (audioOutputDevices.length > 1) {
                $('#audioOutputSelect').html(
                    audioOutputDevices
                        .map(
                            d =>
                                `<option value="${d.deviceId}">${d.label}</option>`)
                        .join('\n'));

                $('#audioOutputSelectWrapper').show();
            }
        });
    }

}