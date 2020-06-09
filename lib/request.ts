import * as fetch from 'node-fetch';
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
const handleAPIError = (res, text) => {
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

/**
 * Возвращает результат GET или POST запроса.
 * Когда возвращается HTTP код 300 и выше, вызывается исключение Error или APIError.
 * @param httpMethod
 * @param endpoint
 * @param params
 */
export async function apiRequest(httpMethod: string, endpoint: string, params?: object): Promise<any> {
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

    // @ts-ignore
    const res: fetch.Response = await fetch(endpoint, opts);
    const text = await res.text();
    REQUEST_DEBUG && console.debug('--> [' + new Date().toISOString() + '] ' + res.status)
    REQUEST_DEBUG && console.debug('    ' + text)
    handleAPIError(res, text)
    const apiRes = JSON.parse(text);
    if (apiRes.status !== SuccessStatus)
        throw new APIError(`APIError with 2** HTTP status code and text ${text}`, apiRes);

    return apiRes;
}

