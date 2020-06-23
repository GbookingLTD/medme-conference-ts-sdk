///<reference path="../../node_modules/cross-fetch/index.d.ts" />
///<amd-module path="../../node_modules/cross-fetch/
import {fetch, Request, Response} from 'cross-fetch';
import {SuccessStatus, ErrorStatuses} from "./statuses";
import {REQUEST_DEBUG} from "../env"

/**
 * Данные ошибки API.
 */
export interface IAPIErrorResponse {
    status: ErrorStatuses;
    description: string;
}

export interface IAPIExpectFieldsErrorResponse extends IAPIErrorResponse {
    expect_fields: string[]
}

interface IValidationError {
    type: string
    path: string
    message: string
}

export interface IAPIValidationErrorResponse extends IAPIErrorResponse {
    errors: IValidationError[];
}

/**
 * Класс ошибки от API.
 */
export class APIError extends Error {
    private readonly apiResponse: IAPIErrorResponse;
    constructor(message: string, apiRes: IAPIErrorResponse) {
        super(message);
        Object.setPrototypeOf(this, APIError.prototype);
        this.name = "APIError";
        this.apiResponse = apiRes;
    }
    get response(): IAPIErrorResponse {
        return this.apiResponse;
    }
}

/**
 * Обработка ошибки HTTP запроса.
 * Для ошибки API выделены HTTP кода 4**. Если приходит такой код, то
 * пытаемся преобразовать к типу ошибки API. Иначе вызываем исключение Error с текстом ошибки.
 * @param res
 * @param text
 */
const handleAPIError = (res: Response, text: string) => {
    if (res.status >= 300) {
        let json;
        try {
            json = JSON.parse(text);
        } catch (parseErr) {
            json = undefined;
        }

        if (json && json.status)
            throw new APIError(`API respond an error with ${res.status} HTTP status code and text ${text}`, json);
        else
            throw new Error(`API respond an error with ${res.status} HTTP status code and text ${text}`)
    }
}

export enum HttpMethodsForAPIEnum {
    Get = 'GET',
    Post = 'POST'
}

export type HttpMethodsAPIMap = {
    [url: string]: HttpMethodsForAPIEnum
}

export interface IHttpAPIRequestOwner {
    baseUrl: string;
    httpMethod: HttpMethodsAPIMap
}

export const HttpMethodsAPIMap: HttpMethodsAPIMap = {
    'exchange': HttpMethodsForAPIEnum.Post,
    'info': HttpMethodsForAPIEnum.Get,
    'create': HttpMethodsForAPIEnum.Post,
    'open_for_join': HttpMethodsForAPIEnum.Post,
    'join': HttpMethodsForAPIEnum.Post,
    'leave': HttpMethodsForAPIEnum.Post,
    'finish': HttpMethodsForAPIEnum.Post,
    'cancel': HttpMethodsForAPIEnum.Post,
    'pause': HttpMethodsForAPIEnum.Post,
    'resume': HttpMethodsForAPIEnum.Post,
    'restore_terminated_fast': HttpMethodsForAPIEnum.Post,
};

export async function httpAPIRequest(method: string, params?: {[key: string]: any}): Promise<any> {
    const thisIsCorrect = this && typeof this.baseUrl === 'string' && typeof this.httpMethod === 'object';
    if (!thisIsCorrect)
        throw new TypeError('http api request should be bind to IHttpAPIRequestOwner instance [method=' +
            method + ', params=' + JSON.stringify(params) + ']');

    const httpMethod = this.httpMethod[method];
    return httpAPIRequest_(httpMethod, this.baseUrl + '/' + method +
        ((httpMethod === HttpMethodsForAPIEnum.Get) && params ? '?' + new URLSearchParams(params) : ''),
        (httpMethod === HttpMethodsForAPIEnum.Post ? params : {}));
}

/**
 * Возвращает результат GET или POST запроса.
 * Когда возвращается HTTP код 300 и выше, вызывается исключение Error или APIError.
 * @param httpMethod
 * @param endpoint
 * @param params
 */
export async function httpAPIRequest_(httpMethod: string, endpoint: string, params?: object): Promise<any> {
    const opts = {
        method: httpMethod.toUpperCase(),
        headers: {
            'Content-Type': 'application/json'
        },
        body: undefined
    };

    REQUEST_DEBUG && console.debug('<-- [' + new Date().toISOString() + '] ' + endpoint);

    if (httpMethod === 'POST') {
        const jsonRequest = JSON.stringify(params);
        REQUEST_DEBUG && console.debug('    ' + jsonRequest);
        opts.body = jsonRequest;
    }

    const res: Response = await fetch(endpoint, opts);
    const text = await res.text();
    REQUEST_DEBUG && console.debug('--> [' + new Date().toISOString() + '] ' + res.status)
    REQUEST_DEBUG && console.debug('    ' + text)
    handleAPIError(res, text)
    const apiRes = JSON.parse(text);
    if (apiRes.status !== SuccessStatus)
        throw new APIError(`APIError with 2** HTTP status code and text ${text}`, apiRes);

    return apiRes;
}

