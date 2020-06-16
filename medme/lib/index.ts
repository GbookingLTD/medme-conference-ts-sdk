/*
 MedMe Audio/Video Conference API SDK
 */

import {apiRequest} from './request';
import {ConferenceRolesEnum, IConferenceInfo, IConferenceInfoInput} from './types/conference'

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
    private readonly baseUrl: string;

    public constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
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
        return apiRequest('POST', this.baseUrl + '/create', params);
    }

    public async move() {

    }

    public async resize() {

    }

    public async updateInfo() {

    }
}

/**
 * Содержит запросы на получение данных по конференции, а также на управлением статусом и
 * работой конференции.
 */
export class ConferenceAccessAPI {
    private readonly baseUrl: string;

    public constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    /**
     * Возвращает ключ конференции по ключу доступа
     * @param accessToken
     */
    public async exchange(accessToken: string): Promise<IExchangeTokenResponse> {
        return apiRequest('POST', this.baseUrl + '/exchange',
            {access_token: accessToken});
    }

    public async otpSend() {

    }

    public async otpVerify() {

    }

    /**
     * Получение информации по конференции.
     * @param accessToken
     */
    public async getConferenceInfo(accessToken: string): Promise<IConferenceInfo> {
        const urlParams = new URLSearchParams({access_token: accessToken});
        return apiRequest('GET', this.baseUrl + '/info?' + urlParams);
    }

    public async openForJoining() {

    }
}