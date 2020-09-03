/*
 MedMe Audio/Video Conference API SDK
 */

import {httpAPIRequest, HttpMethodsAPIMap, IHttpAPIRequestOwner} from './httpRequest';
import {ConferenceRolesEnum, ConferenceStatusesEnum, IConferenceInfo, IConferenceInfoInput} from './types/conference'
import {SuccessStatusEnum, ErrorStatuses} from "./statuses";
import {TimeMs} from "./time";

/**
 * Тип функции выполнения запроса к API.
 */
type APIRequestFn = (method: string, params?: object) => Promise<any>

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
}

export interface IConferenceDurations {
    status: SuccessStatusEnum | ErrorStatuses;
    expectedEndAt: String; // Date
    scheduledDurationSeconds: number;
    netDurationSeconds: number;
    dirtyDurationSeconds: number;
}

/**
 * Содержит запросы на создание и изменение конференций.
 */
export class ConferenceModifyAPI {
    /**
     * Возвращает объект ConferenceModifyAPI, инициализированный функцией запроса к HTTP API.
     * @param baseUrl
     */
    public static createHttpAPI(baseUrl: string) {
        const reqOwner: IHttpAPIRequestOwner = {
            baseUrl: baseUrl,
            httpMethod: HttpMethodsAPIMap
        }

        return new ConferenceModifyAPI(httpAPIRequest.bind(reqOwner))
    }

    private readonly apiRequest: APIRequestFn;

    public constructor(apiRequest: APIRequestFn) {
        this.apiRequest = apiRequest;
    }

    /**
     * Запрос на создание конференции.
     * @param apiKey
     * @param userId
     * @param userRole
     * @param conferenceInfo
     */
    public async create(apiKey: string, userId: string, userRole: ConferenceRolesEnum, conferenceInfo: IConferenceInfoInput): Promise<ICreateConferenceResponse> {
        const params = {
            api_key: apiKey,
            user_id: userId,
            user_role: userRole,
            conference_info: conferenceInfo
        }
        return this.apiRequest('create', params);
    }

    public async move() {

    }

    public async resize() {

    }

    public async updateInfo() {

    }
}

export const RestoreFastDelayMinutes = 3;

/**
 * Содержит запросы на получение данных по конференции, а также на управлением статусом и
 * работой конференции.
 */
export class ConferenceAccessAPI {
    /**
     * Возвращает объект ConferenceAccessAPI, инициализированный функцией запроса к HTTP API.
     * @param baseUrl
     */
    public static createHttpAPI(baseUrl: string) {
        const reqOwner: IHttpAPIRequestOwner = {
            baseUrl: baseUrl,
            httpMethod: HttpMethodsAPIMap
        }

        return new ConferenceAccessAPI(httpAPIRequest.bind(reqOwner))
    }

    private readonly apiRequest: APIRequestFn;

    public constructor(apiRequest: APIRequestFn) {
        this.apiRequest = apiRequest;
    }

    /**
     * Возвращает ключ конференции по ключу доступа
     * @param accessToken
     */
    public async exchange(accessToken: string): Promise<IExchangeTokenResponse> {
        return this.apiRequest('exchange', {access_token: accessToken});
    }

    public async otpSend() {

    }

    public async otpVerify() {

    }

    /**
     * Получение информации по конференции.
     * @param accessToken
     */
    public async getConferenceInfo(accessToken: string): Promise<IConferenceInfoSuccessResponse> {
        return this.apiRequest('info', {access_token: accessToken});
    }

    /**
     * Запрос на открытие конференции.
     * @param accessToken
     */
    public async openForJoin(accessToken: string): Promise<IConferenceStatusResponse> {
        return this.apiRequest('open_for_join', {
            access_token: accessToken
        });
    }

    /**
     * Запрос на присоединение к конференции.
     * @param accessToken
     */
    public async join(accessToken: string): Promise<IConferenceStatusResponse> {
        return this.apiRequest('join', {
            access_token: accessToken
        });
    }

    /**
     * Запрос на отсоединение от конференции.
     * @param accessToken
     */
    public async leave(accessToken: string): Promise<IConferenceStatusResponse> {
        return this.apiRequest('leave', {
            access_token: accessToken
        });
    }

    /**
     * Запрос на завершение конференции.
     * @param accessToken
     */
    public async finish(accessToken: string): Promise<IConferenceStatusResponse> {
        return this.apiRequest('finish', {
            access_token: accessToken
        })
    }

    /**
     * Запрос на отмену конференции.
     * @param accessToken
     */
    public async cancel(accessToken: string): Promise<IConferenceStatusResponse> {
        return this.apiRequest('cancel', {
            access_token: accessToken
        })
    }

    /**
     * Запрос на остановку конференции.
     * @param accessToken
     */
    public async pause(accessToken: string): Promise<IConferenceStatusResponse> {
        return this.apiRequest('pause', {
            access_token: accessToken
        })
    }

    /**
     * Запрос на возобновление конференции.
     * @param accessToken
     */
    public async resume(accessToken: string): Promise<IConferenceStatusResponse> {
        return this.apiRequest('resume', {
            access_token: accessToken
        })
    }

    public async restoreTerminatedFast(accessToken: string): Promise<IConferenceStatusResponse> {
        return this.apiRequest('restore_terminated_fast', {
            access_token: accessToken
        })
    }

    public canRestore(conf: IConferenceInfo) {
        const delayMs = Date.now() - Date.parse(conf.finishedAt);

        return delayMs <= RestoreFastDelayMinutes * TimeMs.Minute;
    }

    public async durations(accessToken: string): Promise<IConferenceDurations> {
        return this.apiRequest('durations', {
            access_token: accessToken
        })
    }
}