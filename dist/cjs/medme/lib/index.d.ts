import { ConferenceRolesEnum, IConferenceInfo, IConferenceInfoInput } from './types/conference';
import { SuccessStatusEnum, ErrorStatuses } from "./statuses";
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
export interface IConferenceInfoErrorResponse {
    status: ErrorStatuses;
}
export declare class ConferenceModifyAPI {
    private readonly baseUrl;
    constructor(baseUrl: string);
    create(apiKey: string, userId: string, userRole: ConferenceRolesEnum, conferenceInfo: IConferenceInfoInput): Promise<ICreateConferenceResponse>;
    move(): Promise<void>;
    resize(): Promise<void>;
    updateInfo(): Promise<void>;
}
export declare class ConferenceAccessAPI {
    private readonly baseUrl;
    constructor(baseUrl: string);
    exchange(accessToken: string): Promise<IExchangeTokenResponse>;
    otpSend(): Promise<void>;
    otpVerify(): Promise<void>;
    getConferenceInfo(accessToken: string): Promise<IConferenceInfoSuccessResponse>;
    openForJoining(): Promise<void>;
}
