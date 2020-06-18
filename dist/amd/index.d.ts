declare module "medme/lib/statuses" {
    export const SuccessStatus: string;
    export enum ErrorStatuses {
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
}
declare module "medme/env" {
    export const CONFERENCE_ENDPOINT: string;
    export const APIKEY: string;
    export const REQUEST_DEBUG: boolean;
}
declare module "medme/lib/request" {
    import { ErrorStatuses } from "medme/lib/statuses";
    export interface IAPIErrorResponse {
        status: ErrorStatuses;
        description: string;
    }
    export interface IAPIExpectFieldsErrorResponse extends IAPIErrorResponse {
        expect_fields: string[];
    }
    interface IValidationError {
        type: string;
        path: string;
        message: string;
    }
    export interface IAPIValidationErrorResponse extends IAPIErrorResponse {
        errors: IValidationError[];
    }
    export class APIError extends Error {
        private readonly apiResponse;
        constructor(message: string, apiRes: IAPIErrorResponse);
        get response(): IAPIErrorResponse;
    }
    export function apiRequest(httpMethod: string, endpoint: string, params?: object): Promise<any>;
}
declare module "medme/lib/types/conference" {
    export enum AppointmentEnginesEnum {
        GBooking = "GBooking"
    }
    export enum LanguageListEnum {
        EN_US = "en-us",
        RU_RU = "ru-ru",
        HE_IL = "he-il",
        FR_FR = "fr-fr",
        HU_HU = "hu-hu",
        EE_EE = "ee-ee",
        LV_LV = "lv-lv",
        LT_LT = "lt-lt",
        DE_DE = "de-de",
        ZH_CH = "zh-cn",
        FI_FI = "fi-fi",
        AM_AM = "am-am",
        ES_ES = "es-es",
        GE_GE = "ge-ge",
        UZ_UZ = "uz-uz",
        AR_PS = "ar-ps"
    }
    export enum ConferenceRolesEnum {
        Client = "CLIENT",
        Specialist = "SPECIALIST"
    }
    export enum ConferenceStatusesEnum {
        Pending = "pending",
        OpenForJoining = "open_for_joining",
        Started = "started",
        StartedAndWaiting = "started_and_waiting",
        StartedAndPaused = "started_and_paused",
        CancelledBeforeStart = "cancelled_before_start",
        CancelledAfterStart = "cancelled_after_start",
        Finished = "finished"
    }
    export interface ISpecialist {
        id: string;
        name: string;
        surname: string;
        middleName: string;
        profession?: string;
        required?: boolean;
    }
    export interface IClient {
        id: string;
        name: string;
        surname: string;
        middleName: string;
    }
    export interface IService {
        id: string;
        name: {
            lang: LanguageListEnum;
            text: string;
        }[];
    }
    export interface IConferenceInfo {
        appointmentId: string;
        appointmentEngine: AppointmentEnginesEnum;
        createdAt: Date;
        createdBy: {
            id: string;
            role: ConferenceRolesEnum;
        };
        openingDurationSeconds: number;
        otp: boolean;
        openForJoiningAt?: Date;
        openForJoiningBy?: {
            id: string;
            role: string;
        };
        specialists: ISpecialist[];
        clients: IClient[];
        services: IService[];
        filialInfo?: {
            id: string;
            title: string;
            timezone: string;
        };
        organizationInfo?: {
            id: string;
            title: string;
        };
        cabinetNumber?: string;
        scheduledStart: Date;
        scheduledDurationSeconds: number;
        l10n: LanguageListEnum;
        isOpen: boolean;
        status: ConferenceStatusesEnum;
    }
    export interface IConferenceInfoInput {
        appointmentId: string;
        appointmentEngine?: AppointmentEnginesEnum;
        openingDurationSeconds: number;
        otp: boolean;
        specialists: ISpecialist[];
        clients: IClient[];
        services: IService[];
        filialInfo?: {
            id: string;
            title: string;
            timezone: string;
        };
        organizationInfo?: {
            id: string;
            title: string;
        };
        cabinetNumber?: string;
        scheduledStart: Date;
        scheduledDurationSeconds: number;
        l10n?: LanguageListEnum;
        isOpen?: boolean;
    }
}
declare module "medme/lib/index" {
    import { ConferenceRolesEnum, IConferenceInfo, IConferenceInfoInput } from "medme/lib/types/conference";
    export interface ICreateConferenceResponse {
        access_token: string;
    }
    export interface IExchangeTokenResponse {
        conference_token: string;
    }
    export class ConferenceModifyAPI {
        private readonly baseUrl;
        constructor(baseUrl: string);
        create(apiKey: string, userId: string, userRole: ConferenceRolesEnum, conferenceInfo: IConferenceInfoInput): Promise<ICreateConferenceResponse>;
        move(): Promise<void>;
        resize(): Promise<void>;
        updateInfo(): Promise<void>;
    }
    export class ConferenceAccessAPI {
        private readonly baseUrl;
        constructor(baseUrl: string);
        exchange(accessToken: string): Promise<IExchangeTokenResponse>;
        otpSend(): Promise<void>;
        otpVerify(): Promise<void>;
        getConferenceInfo(accessToken: string): Promise<IConferenceInfo>;
        openForJoining(): Promise<void>;
    }
}
declare module "medme/lib/types/index" {
    import * as conference from "medme/lib/types/conference";
    export { conference };
}
/// <amd-module name="MedMe" />
declare module "MedMe" {
    import * as lib from "medme/lib/index";
    import * as env from "medme/env";
    import * as request from "medme/lib/request";
    import * as statuses from "medme/lib/statuses";
    import * as types from "medme/lib/types/index";
    export default lib;
    export { env, request, statuses, types };
    export const conferenceModifyAPI: lib.ConferenceModifyAPI;
    export const conferenceAccessAPI: lib.ConferenceAccessAPI;
}
