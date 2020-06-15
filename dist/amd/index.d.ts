declare module "lib/statuses" {
    /**
     * Успешный статус запроса к API.
     */
    export const SuccessStatus: string;
    /**
     * Статус ошибки запроса к API.
     */
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
declare module "env" {
    export const CONFERENCE_ENDPOINT: string;
    export const APIKEY: string;
    export const REQUEST_DEBUG: boolean;
}
declare module "lib/request" {
    import { ErrorStatuses } from "lib/statuses";
    /**
     * Данные ошибки API.
     */
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
    /**
     * Класс ошибки от API.
     */
    export class APIError extends Error {
        private readonly apiResponse;
        constructor(message: string, apiRes: IAPIErrorResponse);
        get response(): IAPIErrorResponse;
    }
    /**
     * Возвращает результат GET или POST запроса.
     * Когда возвращается HTTP код 300 и выше, вызывается исключение Error или APIError.
     * @param httpMethod
     * @param endpoint
     * @param params
     */
    export function apiRequest(httpMethod: string, endpoint: string, params?: object): Promise<any>;
}
declare module "lib/types/conference" {
    /**
     *
     */
    enum AppointmentEnginesEnum {
        GBooking = "GBooking"
    }
    /**
     *
     */
    enum LanguageListEnum {
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
    /**
     *
     */
    export enum ConferenceRolesEnum {
        Client = "CLIENT",
        Specialist = "SPECIALIST"
    }
    export interface ISpecialist {
        id: string;
        name: string;
        surname: string;
        middleName: string;
        profession: string;
        required: string;
    }
    export interface IClient {
        id: string;
        name: string;
        surname: string;
        middleName: string;
    }
    export interface IService {
        id: string;
        name: [{
            lang: LanguageListEnum;
            text: string;
        }];
    }
    /**
     * Интерфейс данных конференции
     */
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
    }
    /**
     * Описание полей входящего для создания конференции.
     */
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
declare module "lib/index" {
    import { ConferenceRolesEnum, IConferenceInfo, IConferenceInfoInput } from "lib/types/conference";
    /**
     * Описание ответа на запрос создания конференции.
     * В ответ приходит поле access_token. По нему будет осуществляться доступ
     * к другим действиям над конференцией.
     */
    export interface ICreateConferenceResponse {
        access_token: string;
    }
    /**
     * Описание ответа на запрос получения ключа конференции (conference_token).
     * Этот ключ используется для перехода на страницу конференции.
     */
    export interface IExchangeTokenResponse {
        conference_token: string;
    }
    /**
     * Содержит запросы на создание и изменение конференций.
     */
    export class ConferenceModifyAPI {
        private readonly baseUrl;
        constructor(baseUrl: string);
        /**
         * Запрос на создание конференции.
         * @param apiKey
         * @param userId
         * @param userRole
         * @param conferenceInfo
         */
        create(apiKey: string, userId: string, userRole: ConferenceRolesEnum, conferenceInfo: IConferenceInfoInput): Promise<ICreateConferenceResponse>;
        move(): Promise<void>;
        resize(): Promise<void>;
        updateInfo(): Promise<void>;
    }
    /**
     * Содержит запросы на получение данных по конференции, а также на управлением статусом и
     * работой конференции.
     */
    export class ConferenceAccessAPI {
        private readonly baseUrl;
        constructor(baseUrl: string);
        /**
         * Возвращает ключ конференции по ключу доступа
         * @param accessToken
         */
        exchange(accessToken: string): Promise<IExchangeTokenResponse>;
        otpSend(): Promise<void>;
        otpVerify(): Promise<void>;
        /**
         * Получение информации по конференции.
         * @param accessToken
         */
        getConferenceInfo(accessToken: string): Promise<IConferenceInfo>;
        openForJoining(): Promise<void>;
    }
}
