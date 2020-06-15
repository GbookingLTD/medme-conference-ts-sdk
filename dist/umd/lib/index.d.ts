import { ConferenceRolesEnum, IConferenceInfo, IConferenceInfoInput } from './types/conference';
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
export declare class ConferenceModifyAPI {
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
export declare class ConferenceAccessAPI {
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
