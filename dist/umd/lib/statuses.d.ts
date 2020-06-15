/**
 * Успешный статус запроса к API.
 */
export declare const SuccessStatus: string;
/**
 * Статус ошибки запроса к API.
 */
export declare enum ErrorStatuses {
    UnknownError = "UNKNOWN_ERROR",
    Unauthorized = "UNAUTHORIZED",
    ValidationError = "VALIDATION_ERROR",
    ExpiredToken = "EXPIRED_TOKEN",
    AccessTokenNotFound = "ACCESS_TOKEN_NOT_FOUND",
    ExpectRequestFields = "EXPECT_REQUEST_FIELDS",
    OtpExpect = "OTP_EXPECT",
    OtpWrongCode = "OTP_WRONG_CODE",
    ExpectAccessToken = "EXPECT_ACCESS_TOKEN",
    ExpectConferenceToken = "EXPECT_CONFERENCE_TOKEN",
    ConferenceIsNotReadyForStart = "CONFERENCE_IS_NOT_READY_FOR_START",
    ConferenceCannotJoin = "CONFERENCE_CANNOT_JOIN",
    ClientAlreadyJoined = "CLIENT_ALREADY_JOINED",
    ClientShouldBeJoined = "CLIENT_SHOULD_BE_JOINED",
    SpecialistShouldBeJoined = "SPECIALIST_SHOULD_BE_JOINED",
    ConferenceWrongSpecialist = "CONFERENCE_WRONG_SPECIALIST",
    ConferenceWrongClient = "CONFERENCE_WRONG_CLIENT",
    ConferenceCannotBeStarted = "CONFERENCE_CANNOT_BE_STARTED",
    ConferenceCannotBeCancelled = "CONFERENCE_CANNOT_BE_CANCELLED",
    ConferenceCannotBeFinished = "CONFERENCE_CANNOT_BE_FINISHED",
    ConferenceCannotBeOpenedForJoin = "CONFERENCE_CANNOT_BE_OPENED_FOR_JOIN",
    ConferenceCannotBeEdited = "CONFERENCE_CANNOT_BE_EDITED",
    UserShouldBeInConference = "USER_SHOULD_BE_IN_CONFERENCE",
    ConferenceWrongStatusChange = "CONFERENCE_WRONG_STATUS_CHANGE"
}
