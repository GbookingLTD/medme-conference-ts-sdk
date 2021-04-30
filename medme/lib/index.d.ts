import { ConferenceRolesEnum, ConferenceStatusesEnum, IConferenceInfo, IConferenceInfoInput } from './types/conference';
import { SuccessStatusEnum, ErrorStatuses } from "./statuses";
/**
 * Тип функции выполнения запроса к API.
 */
declare type APIRequestFn = (method: string, params?: object) => Promise<any>;
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
 *
 */
export interface IConferenceInfoSuccessResponse {
    status: SuccessStatusEnum;
    role: ConferenceRolesEnum;
    user_id: string;
    conference_info: IConferenceInfo;
}
/**
 * Интерфейс ответа от сервера, содержащего единственное поле "статус"
 */
export interface IConferenceStatusResponse {
    status: SuccessStatusEnum | ErrorStatuses;
    newConferenceStatus: ConferenceStatusesEnum;
}
export interface IConferenceDurations {
    status: SuccessStatusEnum | ErrorStatuses;
    expectedEndAt: String;
    scheduledDurationSeconds: number;
    netDurationSeconds: number;
    dirtyDurationSeconds: number;
    realDurationSeconds: number;
}
/**
 * Содержит запросы на создание и изменение конференций.
 */
export declare class ConferenceModifyAPI {
    /**
     * Возвращает объект ConferenceModifyAPI, инициализированный функцией запроса к HTTP API.
     * @param baseUrl
     */
    static createHttpAPI(baseUrl: string): ConferenceModifyAPI;
    private readonly apiRequest;
    constructor(apiRequest: APIRequestFn);
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
export declare const RestoreFastDelayMinutes = 3;
/**
 * Содержит запросы на получение данных по конференции, а также на управлением статусом и
 * работой конференции.
 */
export declare class ConferenceAccessAPI {
    /**
     * Возвращает объект ConferenceAccessAPI, инициализированный функцией запроса к HTTP API.
     * @param baseUrl
     */
    static createHttpAPI(baseUrl: string): ConferenceAccessAPI;
    private readonly apiRequest;
    constructor(apiRequest: APIRequestFn);
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
    getConferenceInfo(accessToken: string): Promise<IConferenceInfoSuccessResponse>;
    /**
     * Запрос на открытие конференции.
     * @param accessToken
     */
    openForJoin(accessToken: string): Promise<IConferenceStatusResponse>;
    /**
     * Запрос на присоединение к конференции.
     * @param accessToken
     */
    join(accessToken: string): Promise<IConferenceStatusResponse>;
    /**
     * Запрос на отсоединение от конференции.
     * @param accessToken
     */
    leave(accessToken: string): Promise<IConferenceStatusResponse>;
    /**
     * Запрос на завершение конференции.
     * @param accessToken
     */
    finish(accessToken: string): Promise<IConferenceStatusResponse>;
    /**
     * Запрос на отмену конференции.
     * @param accessToken
     */
    cancel(accessToken: string): Promise<IConferenceStatusResponse>;
    /**
     * Запрос на остановку конференции.
     * @param accessToken
     */
    pause(accessToken: string): Promise<IConferenceStatusResponse>;
    /**
     * Запрос на возобновление конференции.
     * @param accessToken
     */
    resume(accessToken: string): Promise<IConferenceStatusResponse>;
    restoreTerminatedFast(accessToken: string): Promise<IConferenceStatusResponse>;
    canRestore(conf: IConferenceInfo): boolean;
    durations(accessToken: string): Promise<IConferenceDurations>;
}
export {};
