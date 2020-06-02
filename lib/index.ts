/*
 MedMe Audio/Video Conference API SDK
 */

import {apiRequest} from './request';
import {IConferenceInfo} from './types/conference'

/**
 *
 */
export interface ICreateConferenceResponse {
    access_token: string;
}

/**
 *
 */
export interface IExchangeTokenResponse {
    conference_token: string;
}

/**
 *
 */
export class ConferenceModifyAPI {
    private readonly baseUrl: string;

    public constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public async create(apiKey: string): Promise<ICreateConferenceResponse> {
        return apiRequest('POST', this.baseUrl + '/create',
            {api_key: apiKey});
    }

    public async move() {

    }

    public async resize() {

    }

    public async updateInfo() {

    }
}

/**
 *
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

    public async getConferenceInfo(accessToken: string): Promise<IConferenceInfo> {
        const urlParams = new URLSearchParams({access_token: accessToken});
        return apiRequest('GET', this.baseUrl + '/info?' + urlParams);
    }

    public async openForJoining() {

    }
}