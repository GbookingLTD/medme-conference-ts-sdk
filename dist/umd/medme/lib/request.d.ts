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
export declare function apiRequest(httpMethod: string, endpoint: string, params?: object): Promise<any>;
export {};
