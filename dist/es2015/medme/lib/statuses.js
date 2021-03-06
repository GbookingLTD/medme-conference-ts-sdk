export var SuccessStatus = 'OK';
export var SuccessStatusEnum;
(function (SuccessStatusEnum) {
    SuccessStatusEnum["SuccessStatus"] = "OK";
})(SuccessStatusEnum || (SuccessStatusEnum = {}));
export var ErrorStatuses;
(function (ErrorStatuses) {
    ErrorStatuses["UnknownError"] = "UNKNOWN_ERROR";
    ErrorStatuses["Unauthorized"] = "UNAUTHORIZED";
    ErrorStatuses["ValidationError"] = "VALIDATION_ERROR";
    ErrorStatuses["ExpiredToken"] = "EXPIRED_TOKEN";
    ErrorStatuses["AccessTokenNotFound"] = "ACCESS_TOKEN_NOT_FOUND";
    ErrorStatuses["ExpectRequestFields"] = "EXPECT_REQUEST_FIELDS";
    ErrorStatuses["OtpExpect"] = "OTP_EXPECT";
    ErrorStatuses["OtpWrongCode"] = "OTP_WRONG_CODE";
    ErrorStatuses["ExpectAccessToken"] = "EXPECT_ACCESS_TOKEN";
    ErrorStatuses["ExpectConferenceToken"] = "EXPECT_CONFERENCE_TOKEN";
    ErrorStatuses["ConferenceIsNotReadyForStart"] = "CONFERENCE_IS_NOT_READY_FOR_START";
    ErrorStatuses["ConferenceCannotJoin"] = "CONFERENCE_CANNOT_JOIN";
    ErrorStatuses["ClientAlreadyJoined"] = "CLIENT_ALREADY_JOINED";
    ErrorStatuses["ClientShouldBeJoined"] = "CLIENT_SHOULD_BE_JOINED";
    ErrorStatuses["SpecialistShouldBeJoined"] = "SPECIALIST_SHOULD_BE_JOINED";
    ErrorStatuses["ConferenceWrongSpecialist"] = "CONFERENCE_WRONG_SPECIALIST";
    ErrorStatuses["ConferenceWrongClient"] = "CONFERENCE_WRONG_CLIENT";
    ErrorStatuses["ConferenceCannotBeStarted"] = "CONFERENCE_CANNOT_BE_STARTED";
    ErrorStatuses["ConferenceCannotBeCancelled"] = "CONFERENCE_CANNOT_BE_CANCELLED";
    ErrorStatuses["ConferenceCannotBeFinished"] = "CONFERENCE_CANNOT_BE_FINISHED";
    ErrorStatuses["ConferenceCannotBeOpenedForJoin"] = "CONFERENCE_CANNOT_BE_OPENED_FOR_JOIN";
    ErrorStatuses["ConferenceCannotBeEdited"] = "CONFERENCE_CANNOT_BE_EDITED";
    ErrorStatuses["UserShouldBeInConference"] = "USER_SHOULD_BE_IN_CONFERENCE";
    ErrorStatuses["ConferenceWrongStatusChange"] = "CONFERENCE_WRONG_STATUS_CHANGE";
    ErrorStatuses["RestoreFastTimedOut"] = "RESTORE_FAST_TIMED_OUT";
})(ErrorStatuses || (ErrorStatuses = {}));
//# sourceMappingURL=statuses.js.map