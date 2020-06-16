import { ConferenceRolesEnum, IConferenceInfo, IConferenceInfoInput } from './types/conference';
export interface ICreateConferenceResponse {
    access_token: string;
}
export interface IExchangeTokenResponse {
    conference_token: string;
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
    getConferenceInfo(accessToken: string): Promise<IConferenceInfo>;
    openForJoining(): Promise<void>;
}
