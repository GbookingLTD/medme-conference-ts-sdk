"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConferenceStatusesEnum = exports.ConferenceRolesEnum = exports.LanguageListEnum = exports.AppointmentEnginesEnum = void 0;
var AppointmentEnginesEnum;
(function (AppointmentEnginesEnum) {
    AppointmentEnginesEnum["GBooking"] = "GBooking";
})(AppointmentEnginesEnum = exports.AppointmentEnginesEnum || (exports.AppointmentEnginesEnum = {}));
var LanguageListEnum;
(function (LanguageListEnum) {
    LanguageListEnum["EN_US"] = "en-us";
    LanguageListEnum["RU_RU"] = "ru-ru";
    LanguageListEnum["HE_IL"] = "he-il";
    LanguageListEnum["FR_FR"] = "fr-fr";
    LanguageListEnum["HU_HU"] = "hu-hu";
    LanguageListEnum["EE_EE"] = "ee-ee";
    LanguageListEnum["LV_LV"] = "lv-lv";
    LanguageListEnum["LT_LT"] = "lt-lt";
    LanguageListEnum["DE_DE"] = "de-de";
    LanguageListEnum["ZH_CH"] = "zh-cn";
    LanguageListEnum["FI_FI"] = "fi-fi";
    LanguageListEnum["AM_AM"] = "am-am";
    LanguageListEnum["ES_ES"] = "es-es";
    LanguageListEnum["GE_GE"] = "ge-ge";
    LanguageListEnum["UZ_UZ"] = "uz-uz";
    LanguageListEnum["AR_PS"] = "ar-ps";
})(LanguageListEnum = exports.LanguageListEnum || (exports.LanguageListEnum = {}));
var ConferenceRolesEnum;
(function (ConferenceRolesEnum) {
    ConferenceRolesEnum["Client"] = "CLIENT";
    ConferenceRolesEnum["Specialist"] = "SPECIALIST";
})(ConferenceRolesEnum = exports.ConferenceRolesEnum || (exports.ConferenceRolesEnum = {}));
var ConferenceStatusesEnum;
(function (ConferenceStatusesEnum) {
    ConferenceStatusesEnum["Pending"] = "pending";
    ConferenceStatusesEnum["OpenForJoining"] = "open_for_joining";
    ConferenceStatusesEnum["Started"] = "started";
    ConferenceStatusesEnum["StartedAndWaiting"] = "started_and_waiting";
    ConferenceStatusesEnum["StartedAndPaused"] = "started_and_paused";
    ConferenceStatusesEnum["CancelledBeforeStart"] = "cancelled_before_start";
    ConferenceStatusesEnum["CancelledAfterStart"] = "cancelled_after_start";
    ConferenceStatusesEnum["Finished"] = "finished";
})(ConferenceStatusesEnum = exports.ConferenceStatusesEnum || (exports.ConferenceStatusesEnum = {}));
//# sourceMappingURL=conference.js.map