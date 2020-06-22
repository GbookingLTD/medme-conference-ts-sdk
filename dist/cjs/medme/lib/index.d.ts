import { ConferenceRolesEnum, IConferenceInfo, IConferenceInfoInput } from './types/conference';
import { SuccessStatusEnum, ErrorStatuses } from "./statuses";
declare type APIRequestFn = (method: string, params?: object) => Promise<any>;
export interface ICreateConferenceResponse {
    access_token: string;
}
export interface IExchangeTokenResponse {
    conference_token: string;
}
export interface IConferenceInfoSuccessResponse {
    status: SuccessStatusEnum;
    role: ConferenceRolesEnum;
    conference_info: IConferenceInfo;
}
export interface IConferenceStatusResponse {
    status: SuccessStatusEnum | ErrorStatuses;
}
export declare class ConferenceModifyAPI {
    static createHttpAPI(baseUrl: string): ConferenceModifyAPI;
    private readonly apiRequest;
    constructor(apiRequest: APIRequestFn);
    create(apiKey: string, userId: string, userRole: ConferenceRolesEnum, conferenceInfo: IConferenceInfoInput): Promise<ICreateConferenceResponse>;
    openForJoin(accessToken: string): Promise<IConferenceStatusResponse>;
    move(): Promise<void>;
    resize(): Promise<void>;
    updateInfo(): Promise<void>;
}
export declare class ConferenceAccessAPI {
    static createHttpAPI(baseUrl: string): ConferenceAccessAPI;
    private readonly apiRequest;
    constructor(apiRequest: APIRequestFn);
    exchange(accessToken: string): Promise<IExchangeTokenResponse>;
    otpSend(): Promise<void>;
    otpVerify(): Promise<void>;
    getConferenceInfo(accessToken: string): Promise<IConferenceInfoSuccessResponse>;
    openForJoining(): Promise<void>;
}
export {};
