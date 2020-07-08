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
    user_id: string;
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
    move(): Promise<void>;
    resize(): Promise<void>;
    updateInfo(): Promise<void>;
}
export declare const RestoreFastDelayMinutes = 3;
export declare class ConferenceAccessAPI {
    static createHttpAPI(baseUrl: string): ConferenceAccessAPI;
    private readonly apiRequest;
    constructor(apiRequest: APIRequestFn);
    exchange(accessToken: string): Promise<IExchangeTokenResponse>;
    otpSend(): Promise<void>;
    otpVerify(): Promise<void>;
    getConferenceInfo(accessToken: string): Promise<IConferenceInfoSuccessResponse>;
    openForJoin(accessToken: string): Promise<IConferenceStatusResponse>;
    join(accessToken: string): Promise<IConferenceStatusResponse>;
    leave(accessToken: string): Promise<IConferenceStatusResponse>;
    finish(accessToken: string): Promise<IConferenceStatusResponse>;
    cancel(accessToken: string): Promise<IConferenceStatusResponse>;
    pause(accessToken: string): Promise<IConferenceStatusResponse>;
    resume(accessToken: string): Promise<IConferenceStatusResponse>;
    restoreTerminatedFast(accessToken: string): Promise<IConferenceStatusResponse>;
    canRestore(conf: IConferenceInfo): boolean;
}
export {};
