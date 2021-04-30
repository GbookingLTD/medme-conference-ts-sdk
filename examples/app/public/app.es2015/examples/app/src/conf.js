import $ from "jquery";
import { JML } from "../../../index";
var JitsiMeetJS = JML.JitsiMeetJS;
var ConferenceEvents = JML.ConferenceEvents;
var ConferenceConfig = JML.ConferenceConfig;
var createConference = JML.createConferenceAndConnect;
export function openConference() {
    var CLIENT_NODE = location.host + ":" + location.port;
    var config = new ConferenceConfig(CLIENT_NODE);
    var events = new ConferenceEvents();
    events.onConnected = function (sess) {
        return console.info("user connected");
    };
    events.onLocalTrack = function (localTrack, idx, sess) {
        localTrack.addEventListener(JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED, function (audioLevel) { return console.log("Audio Level local: " + audioLevel); });
        localTrack.addEventListener(JitsiMeetJS.events.track.TRACK_MUTE_CHANGED, function () { return console.log('local track muted'); });
        localTrack.addEventListener(JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED, function () { return console.log('local track stoped'); });
        localTrack.addEventListener(JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED, function (deviceId) {
            return console.log("track audio output device was changed to " + deviceId);
        });
        if (localTrack.getType() === 'video') {
            $('body').append("<video autoplay='1' id='localVideo" + idx + "' />");
            localTrack.attach($("#localVideo" + idx)[0]);
        }
        else {
            $('body').append("<audio autoplay='1' muted='true' id='localAudio" + idx + "' />");
            localTrack.attach($("#localAudio" + idx)[0]);
        }
        console.info('localTrack stream', localTrack.getOriginalStream());
    };
    events.onRemoteTrack = function (track, idx, sess) {
        var participant = track.getParticipantId();
        track.addEventListener(JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED, function (audioLevel) { return console.log("Audio Level remote: " + audioLevel); });
        track.addEventListener(JitsiMeetJS.events.track.TRACK_MUTE_CHANGED, function () { return console.log('remote track muted'); });
        track.addEventListener(JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED, function () { return console.log('remote track stoped'); });
        track.addEventListener(JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED, function (deviceId) {
            return console.log("track audio output device was changed to " + deviceId);
        });
        var id = participant + track.getType() + idx;
        if (track.getType() === 'video') {
            $('body').append("<video autoplay='1' id='" + participant + "video" + idx + "' />");
        }
        else {
            $('body').append("<audio autoplay='1' id='" + participant + "audio" + idx + "' />");
        }
        track.attach($("#" + id)[0]);
    };
    events.onUserLeft = function (id, sess) {
        var tracks = sess.getRemoteTracks()[id];
        for (var i = 0; i < tracks.length; i++) {
            tracks[i].detach($("#" + id + tracks[i].getType()));
        }
        ;
    };
    events.onSwitchVideo = function (sess) {
        sess._localTracks[1].addEventListener(JitsiMeetJS.events.track.TRACK_MUTE_CHANGED, function () { return console.log('local track muted'); });
        sess._localTracks[1].addEventListener(JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED, function () { return console.log('local track stoped'); });
        sess._localTracks[1].attach($('#localVideo1')[0]);
    };
    var sessCtl = createConference(config, events);
    $(window).bind('beforeunload', sessCtl.unload);
    $(window).bind('unload', sessCtl.unload);
    if (JitsiMeetJS.mediaDevices.isDeviceChangeAvailable('output')) {
        JitsiMeetJS.mediaDevices.enumerateDevices(function (devices) {
            var audioOutputDevices = devices.filter(function (d) { return d.kind === 'audiooutput'; });
            if (audioOutputDevices.length > 1) {
                $('#audioOutputSelect').html(audioOutputDevices
                    .map(function (d) {
                    return "<option value=\"" + d.deviceId + "\">" + d.label + "</option>";
                })
                    .join('\n'));
                $('#audioOutputSelectWrapper').show();
            }
        });
    }
    return sessCtl;
}
//# sourceMappingURL=conf.js.map