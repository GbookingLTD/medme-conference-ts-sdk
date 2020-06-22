import { ErrorStatuses } from "./statuses";
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
export declare class APIError extends Error {
    private readonly apiResponse;
    constructor(message: string, apiRes: IAPIErrorResponse);
    get response(): IAPIErrorResponse;
}
export declare enum HttpMethodsForAPIEnum {
    Get = "GET",
    Post = "POST"
}
export declare type HttpMethodsAPIMap = {
    [url: string]: HttpMethodsForAPIEnum;
};
export interface IHttpAPIRequestOwner {
    baseUrl: string;
    httpMethod: HttpMethodsAPIMap;
}
export declare const HttpMethodsAPIMap: HttpMethodsAPIMap;
export declare function httpAPIRequest(method: string, params?: {
    [key: string]: any;
}): Promise<any>;
export declare function httpAPIRequest_(httpMethod: string, endpoint: string, params?: object): Promise<any>;
export {};
