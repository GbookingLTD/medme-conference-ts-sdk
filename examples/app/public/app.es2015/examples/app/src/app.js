import $ from "jquery";
import * as mmconf from "../../../index";
import { openConference } from "./conf";
import moment from "moment";
export var App = {
    main: null,
    renderConferenceInfo: null,
    openForJoin: null,
    join: null,
    finish: null,
    cancel: null,
    leave: null,
    restore: null,
    unload: null,
    switchVideo: null,
    changeAudioOutput: null,
};
App.main = function () {
    var CONFERENCE_ENDPOINT = "https://apiv2.gbooking.ru/meets/v1/c326be0234a0acdd1e3c29510692d32c3f08e05a";
    var CONFERENCE_WS_ENDPOINT = "wss://apiv2.gbooking.ru/meets/v1/ws";
    var conferenceModifyAPI = mmconf.ConferenceModifyAPI.createHttpAPI(CONFERENCE_ENDPOINT);
    var conferenceAccessAPI = mmconf.ConferenceAccessAPI.createHttpAPI(CONFERENCE_ENDPOINT);
    var UX = mmconf.UX;
    var params = new URLSearchParams(location.search);
    var accessToken = params.get('at');
    var lang = 'ru';
    var vertical = 'medicine';
    var text = UX.l10n[lang][vertical];
    text.dateTime = UX.l10n[lang].dateTime;
    moment.locale(lang);
    text.dateTime.fn = {};
    text.dateTime.fn.formatDurationAbbrev = function (sec) {
        sec = Math.floor(sec);
        var res = [];
        if (sec % 60)
            res.push((sec % 60) + " " + text.dateTime.formatDurationAbbrev[3]);
        var min = Math.floor(sec / 60);
        if (min < 1)
            return res.reverse().join(" ");
        if (min % 60)
            res.push((min % 60) + " " + text.dateTime.formatDurationAbbrev[2]);
        var h = Math.floor(min / 60);
        if (h < 1)
            return res.reverse().join(" ");
        if (h % 24)
            res.push((h % 24) + " " + text.dateTime.formatDurationAbbrev[1]);
        var d = Math.floor(h / 24);
        if (d < 1)
            return res.reverse().join(" ");
        res.push(d + " " + text.dateTime.formatDurationAbbrev[0]);
        return res.reverse().join(" ");
    };
    var conferenceWebSocketAPI = new mmconf.sock.ConferenceSock(CONFERENCE_WS_ENDPOINT);
    mmconf.UX.createScreen(conferenceAccessAPI, accessToken).then(function (uxScreen) {
        if (uxScreen.name === UX.ScreenEnum._4xx) {
            $('#content')
                .html('')
                .append("<h1>" + text["404"].title + "</h1>")
                .show();
            return;
        }
        conferenceWebSocketAPI.changeConferenceStatusCallback(function (newStatus) {
            console.info('[%s] ConferenceWS', (new Date).toISOString(), accessToken, 'CHANGE_STATUS_CALLBACK', newStatus);
            location.reload();
        });
        conferenceWebSocketAPI.changeConferenceInfoCallback(function onChangeConferenceInfo() {
            console.info('[%s] ConferenceWS', (new Date).toISOString(), accessToken, 'CHANGE_INFO_CALLBACK');
            $("#notice")
                .html('')
                .append('<span>Данные конференции были измены. Пожалуйста, обновите страницу</span>')
                .show();
        });
        conferenceWebSocketAPI.connect(accessToken);
        if (uxScreen.name === UX.ScreenEnum.PendingClient) {
            var uxPCScreen = uxScreen;
            App.confInfoData = {
                lang: lang,
                text: text,
                timer: null,
                confInfo: uxPCScreen.conference,
                opts: uxPCScreen.confInfoBlock,
            };
            App.renderConferenceInfo();
            $('#content')
                .html('')
                .append("<h1>" + text.pending_client.title + "</h1>")
                .append("<p>" + text.pending_client.hint1 + "</p>")
                .append("<p>" + text.pending_client.hint2 + "</p>")
                .append("<p><a href=\"#\" class=\"conf_info_link\" onclick=\"toggle_info(); return;\">" + text.pending_client.conf_info_link + "</a></p>")
                .show();
            return;
        }
        if (uxScreen.name === UX.ScreenEnum.PendingSpecialist) {
            App.openForJoin = function () {
                conferenceAccessAPI.openForJoin(accessToken).then(function () {
                    location.reload();
                });
            };
            App.cancel = function () {
                conferenceAccessAPI.cancel(accessToken).then(function () {
                    location.reload();
                });
            };
            var uxSCScreen = uxScreen;
            App.confInfoData = {
                lang: lang,
                text: text,
                timer: null,
                confInfo: uxSCScreen.conference,
                opts: uxSCScreen.confInfoBlock
            };
            App.renderConferenceInfo();
            $('#content')
                .html('')
                .append("<h1>" + text.pending_specialist.title + "</h1>")
                .append("<p><input type=\"button\" value=\"" + text.pending_specialist.button_open + "\" onclick=\"App.openForJoin(); return;\"></input></p>")
                .append("<p>" + text.pending_specialist.hint1 + "</p>")
                .append("<p>" + text.pending_specialist.hint2 + "</p>")
                .append("<p><input type=\"button\" value=\"" + text.pending_specialist.cancel_button + "\" onclick=\"App.cancel(); return;\"></input></p>")
                .append("<p><a href=\"#\" class=\"conf_info_link\" onclick=\"toggle_info(); return;\">" + text.pending_specialist.conf_info_link + "</a></p>")
                .show();
            return;
        }
        if (uxScreen.name === UX.ScreenEnum.JoinClient) {
            var uxJCScreen = uxScreen;
            App.confInfoData = {
                lang: lang,
                text: text,
                timer: null,
                confInfo: uxJCScreen.conference,
                opts: uxJCScreen.confInfoBlock
            };
            App.renderConferenceInfo();
            App.join = function () {
                conferenceAccessAPI.join(accessToken).then(function () {
                    location.reload();
                });
            };
            $('#content')
                .html('')
                .append("<h1>" + text.join_client.title + "</h1>")
                .append("<p><input type=\"button\" value=\"" + text.join_client.button + "\" onclick=\"App.join(); return;\"></input></p>")
                .append("<p>" + text.join_client.hint + "</p>")
                .append("<p><a href=\"#\" class=\"conf_info_link\" onclick=\"toggle_info(); return;\">" + text.join_client.conf_info_link + "</a></p>")
                .show();
            return;
        }
        if (uxScreen.name === UX.ScreenEnum.JoinSpecialist) {
            var uxJSScreen = uxScreen;
            App.confInfoData = {
                lang: lang,
                text: text,
                timer: null,
                confInfo: uxJSScreen.conference,
                opts: uxJSScreen.confInfoBlock
            };
            App.renderConferenceInfo();
            App.join = function () {
                conferenceAccessAPI.join(accessToken).then(function () {
                    location.reload();
                });
            };
            $('#content')
                .html('')
                .append("<h1>" + text.join_specialist.title + "</h1>")
                .append("<p><input type=\"button\" value=\"" + text.join_specialist.button + "\" onclick=\"App.join(); return;\"></input></p>")
                .append("<p>" + text.join_specialist.hint + "</p>")
                .append("<p><a href=\"#\" class=\"conf_info_link\" onclick=\"toggle_info(); return;\">" + text.join_specialist.conf_info_link + "</a></p>")
                .show();
            return;
        }
        if (uxScreen.name === UX.ScreenEnum.Cancelled) {
            var uxCancelledScreen = uxScreen;
            App.restore = function () {
                conferenceAccessAPI.restoreTerminatedFast(accessToken).then(function (res) {
                    conferenceWebSocketAPI.changeConferenceStatus(res.newConferenceStatus);
                    location.reload();
                }).catch(function (err) {
                    location.reload();
                });
            };
            App.confInfoData = {
                lang: lang,
                text: text,
                timer: uxCancelledScreen.timerBlock,
                confInfo: uxCancelledScreen.conference,
                opts: uxCancelledScreen.confInfoBlock
            };
            App.renderConferenceInfo();
            $('#content')
                .html('')
                .append("<h1>" + text.cancelled_screen.title + "</h1>")
                .append("<p>" + text.cancelled_screen.client_hint0 + "</p>")
                .append("<p>" + text.cancelled_screen.client_hint0 + "</p>");
            if (uxCancelledScreen.canRestore) {
                $('#content')
                    .append("<p><input type=\"button\" value=\"" + text.cancelled_screen.restore_button + "\" onclick=\"App.restore(); return;\"></input></p>");
            }
            if (uxCancelledScreen.userRole == mmconf.types.conference.ConferenceRolesEnum.Client) {
                $('#content')
                    .append("<p>" + text.cancelled_screen.client_hint0 + "</p>")
                    .append("<p>" + text.cancelled_screen.client_hint0 + "</p>");
            }
            $('#content').show();
            return;
        }
        if (uxScreen.name === UX.ScreenEnum.Finish) {
            var uxFinishScreen = uxScreen;
            App.restore = function () {
                conferenceAccessAPI.restoreTerminatedFast(accessToken).then(function (res) {
                    conferenceWebSocketAPI.changeConferenceStatus(res.newConferenceStatus);
                    location.reload();
                }).catch(function (err) {
                    location.reload();
                });
            };
            App.confInfoData = {
                lang: lang,
                text: text,
                timer: uxFinishScreen.timerBlock,
                confInfo: uxFinishScreen.conference,
                opts: uxFinishScreen.confInfoBlock
            };
            App.renderConferenceInfo();
            $('#content')
                .html('')
                .append("<h1>" + text.finish_screen.title + "</h1>")
                .append("<p><a href=\"#\" class=\"conf_info_link\" onclick=\"toggle_info(); return;\">" + text.finish_screen.conf_info_link + "</a></p>");
            if (uxFinishScreen.canRestore) {
                $('#content')
                    .append("<p><input type=\"button\" value=\"" + text.finish_screen.restore_button + "\" onclick=\"App.restore(); return;\"></input></p>");
            }
            $('#content')
                .show();
            return;
        }
        if (uxScreen.name === UX.ScreenEnum.Started) {
            var uxStartedScreen = uxScreen;
            App.leave = function () {
                conferenceAccessAPI.leave(accessToken).then(function () {
                    location.reload();
                });
            };
            App.finish = function () {
                conferenceAccessAPI.finish(accessToken).then(function () {
                    location.reload();
                });
            };
            App.confInfoData = {
                lang: lang,
                text: text,
                timer: uxStartedScreen.timerBlock,
                confInfo: uxStartedScreen.conference,
                opts: uxStartedScreen.confInfoBlock
            };
            App.renderConferenceInfo();
            $('#content')
                .html('');
            if (uxStartedScreen.userRole == mmconf.types.conference.ConferenceRolesEnum.Specialist) {
                $('#content')
                    .append("<p><input type=\"button\" value=\"" + text.conference_info_block.finish_button + "\" onclick=\"App.finish(); return;\"></input></p>");
            }
            else {
                $('#content')
                    .append("<p><input type=\"button\" value=\"" + text.conference_info_block.leave_meet + "\" onclick=\"App.leave(); return;\"></input></p>");
            }
            $('#content')
                .append("<p><a href=\"#\" class=\"conf_info_link\" onclick=\"toggle_info(); return;\">" + text.join_client.conf_info_link + "</a></p>")
                .show();
            var sessCtl_1 = openConference();
            App.unload = function () {
                sessCtl_1.unload();
            };
            App.switchVideo = function () {
                sessCtl_1.switchVideo();
            };
            App.changeAudioOutput = function (select) {
                sessCtl_1.changeAudioOutput(select.value);
            };
            $('#conference')
                .show();
            return;
        }
        console.error("unknown screen name " + uxScreen.name);
    });
};
App.renderConferenceInfo = function () {
    var data = App.confInfoData;
    _renderConferenceInfo(data.confInfo, data.text, data.lang, data.timerBlock, data.opts);
};
var _renderConferenceInfo = function (confInfo, text, l, timer, opts) {
    var conferenceInfo = confInfo;
    conferenceInfo.services.forEach(function (s) {
        s.l10n_name = s.name.find(function (n) {
            return n.lang === l;
        });
        if (!s.l10n_name && s.name && s.name.length)
            s.l10n_name = s.name[0];
    });
    if (conferenceInfo.specialists.length === 1)
        conferenceInfo.specialist = conferenceInfo.specialists[0];
    conferenceInfo.opts = opts;
    conferenceInfo.scheduledStartFormatFull = moment(conferenceInfo.scheduledStart)
        .format(text.dateTime.formatFull);
    if (conferenceInfo.startedAt) {
        conferenceInfo.realStartFormatShort = moment(conferenceInfo.startedAt)
            .format(text.dateTime.formatTimeShort);
        conferenceInfo.realStartFormatFull = moment(conferenceInfo.startedAt)
            .format(text.dateTime.formatFull);
    }
    if (timer) {
        conferenceInfo.scheduledEndFormatShort = moment(timer.expectedEndAt)
            .format(text.dateTime.formatTimeShort);
    }
    if (opts.showRealTimes && timer) {
        conferenceInfo.realEndFormatFull = moment(conferenceInfo.finishedAt)
            .format(text.dateTime.formatFull);
        conferenceInfo.realDurationFormatAbbrev = text.dateTime.fn
            .formatDurationAbbrev(timer.realDurationSeconds);
    }
    conferenceInfo.scheduledDurationFormatAbbrev = text.dateTime.fn
        .formatDurationAbbrev(conferenceInfo.scheduledDurationSeconds);
    $('#conf_info')
        .html('')
        .append("<h3>" + text.conference_info_block.title + "</h3>")
        .append("<span><b>" + text.conference_info_block.scheduled_start + "</b>: " + conferenceInfo.scheduledStartFormatFull + "</span><br>")
        .append("<span><b>" + text.conference_info_block.scheduled_duration + "</b>: " + conferenceInfo.scheduledDurationFormatAbbrev + "</span><br>");
    if (opts.showRealTimes) {
        $('#conf_info')
            .append("<span><b>" + text.conference_info_block.real_start + "</b>: " + conferenceInfo.realStartFormatFull + "</span><br>")
            .append("<span><b>" + text.conference_info_block.real_end + "</b>: " + conferenceInfo.realEndFormatFull + "</span><br>")
            .append("<span><b>" + text.conference_info_block.real_duration + "</b>: " + conferenceInfo.realDurationFormatAbbrev + "</span><br>");
    }
    $('#conf_info')
        .append("<p id=\"conf_info__services\"><b>" + text.conference_info_block.services + "</b><br></p>");
    confInfo.services.forEach(function (s) {
        $('#conf_info__services')
            .append("<span>" + s.l10n_name.text + "</span><br>");
    });
    $('#conf_info')
        .append("<p id=\"conf_info__specialists\"><b>" + text.conference_info_block.specialists + "</b><br></p>");
    confInfo.specialists.forEach(function (s) {
        $('#conf_info__specialists')
            .append("<b>" + s.profession + "</b><br> <span>" + s.name + " " + s.middleName + " " + s.surname + "</span><br>");
    });
    $('#conf_info')
        .append("<p id=\"conf_info__clients\"><b>" + text.conference_info_block.clients + "</b><br></p>");
    confInfo.clients.forEach(function (s) {
        $('#conf_info__clients')
            .append("<span>" + s.name + " " + s.middleName + " " + s.surname + "</span><br>");
    });
};
//# sourceMappingURL=app.js.map