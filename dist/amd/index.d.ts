declare module "medme/lib/statuses" {
    export const SuccessStatus: string;
    export enum SuccessStatusEnum {
        SuccessStatus = "OK"
    }
    export enum ErrorStatuses {
        UnknownError = "UNKNOWN_ERROR",
        Unauthorized = "UNAUTHORIZED",
        ValidationError = "VALIDATION_ERROR",
        ExpiredToken = "EXPIRED_TOKEN",
        AccessTokenNotFound = "ACCESS_TOKEN_NOT_FOUND",
        ExpectRequestFields = "EXPECT_REQUEST_FIELDS",
        OtpExpect = "OTP_EXPECT",
        OtpWrongCode = "OTP_WRONG_CODE",
        ExpectAccessToken = "EXPECT_ACCESS_TOKEN",
        ExpectConferenceToken = "EXPECT_CONFERENCE_TOKEN",
        ConferenceIsNotReadyForStart = "CONFERENCE_IS_NOT_READY_FOR_START",
        ConferenceCannotJoin = "CONFERENCE_CANNOT_JOIN",
        ClientAlreadyJoined = "CLIENT_ALREADY_JOINED",
        ClientShouldBeJoined = "CLIENT_SHOULD_BE_JOINED",
        SpecialistShouldBeJoined = "SPECIALIST_SHOULD_BE_JOINED",
        ConferenceWrongSpecialist = "CONFERENCE_WRONG_SPECIALIST",
        ConferenceWrongClient = "CONFERENCE_WRONG_CLIENT",
        ConferenceCannotBeStarted = "CONFERENCE_CANNOT_BE_STARTED",
        ConferenceCannotBeCancelled = "CONFERENCE_CANNOT_BE_CANCELLED",
        ConferenceCannotBeFinished = "CONFERENCE_CANNOT_BE_FINISHED",
        ConferenceCannotBeOpenedForJoin = "CONFERENCE_CANNOT_BE_OPENED_FOR_JOIN",
        ConferenceCannotBeEdited = "CONFERENCE_CANNOT_BE_EDITED",
        UserShouldBeInConference = "USER_SHOULD_BE_IN_CONFERENCE",
        ConferenceWrongStatusChange = "CONFERENCE_WRONG_STATUS_CHANGE",
        RestoreFastTimedOut = "RESTORE_FAST_TIMED_OUT"
    }
}
declare module "medme/env" {
    export const CONFERENCE_ENDPOINT: string;
    export const CONFERENCE_WS_ENDPOINT: string;
    export const APIKEY: string;
    export const REQUEST_DEBUG: boolean;
    export const JITSI_DOMAIN: string;
    export const JITSI_MUC: string;
    export const JITSI_BOTH: string;
}
declare module "medme/lib/httpRequest" {
    import { ErrorStatuses } from "medme/lib/statuses";
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
    export class APIError extends Error {
        private readonly apiResponse;
        constructor(message: string, apiRes: IAPIErrorResponse);
        get response(): IAPIErrorResponse;
    }
    export enum HttpMethodsForAPIEnum {
        Get = "GET",
        Post = "POST"
    }
    export type HttpMethodsAPIMap = {
        [url: string]: HttpMethodsForAPIEnum;
    };
    export interface IHttpAPIRequestOwner {
        baseUrl: string;
        httpMethod: HttpMethodsAPIMap;
    }
    export const HttpMethodsAPIMap: HttpMethodsAPIMap;
    export function httpAPIRequest(method: string, params?: {
        [key: string]: any;
    }): Promise<any>;
    export function httpAPIRequest_(httpMethod: string, endpoint: string, params?: object): Promise<any>;
}
declare module "medme/lib/types/conference" {
    export enum AppointmentEnginesEnum {
        GBooking = "GBooking"
    }
    export enum LanguageListEnum {
        EN_US = "en-us",
        RU_RU = "ru-ru",
        HE_IL = "he-il",
        FR_FR = "fr-fr",
        HU_HU = "hu-hu",
        EE_EE = "ee-ee",
        LV_LV = "lv-lv",
        LT_LT = "lt-lt",
        DE_DE = "de-de",
        ZH_CH = "zh-cn",
        FI_FI = "fi-fi",
        AM_AM = "am-am",
        ES_ES = "es-es",
        GE_GE = "ge-ge",
        UZ_UZ = "uz-uz",
        AR_PS = "ar-ps"
    }
    export enum ConferenceRolesEnum {
        Client = "CLIENT",
        Specialist = "SPECIALIST"
    }
    export enum ConferenceStatusesEnum {
        Pending = "pending",
        OpenForJoining = "open_for_joining",
        Started = "started",
        StartedAndWaiting = "started_and_waiting",
        StartedAndPaused = "started_and_paused",
        CancelledBeforeStart = "cancelled_before_start",
        CancelledAfterStart = "cancelled_after_start",
        Finished = "finished"
    }
    export interface ISpecialist {
        id: string;
        name: string;
        surname: string;
        middleName: string;
        profession?: string;
        required?: boolean;
    }
    export interface IClient {
        id: string;
        name: string;
        surname: string;
        middleName: string;
    }
    export interface IService {
        id: string;
        name: {
            lang: LanguageListEnum;
            text: string;
        }[];
        l10n_name: {
            lang: LanguageListEnum;
            text: string;
        };
    }
    export interface IConferenceInfo {
        appointmentId: string;
        appointmentEngine: AppointmentEnginesEnum;
        createdAt: string;
        startedAt?: string;
        finishedAt?: string;
        createdBy: {
            id: string;
            role: ConferenceRolesEnum;
        };
        openingDurationSeconds: number;
        otp: boolean;
        openForJoiningAt?: Date;
        openForJoiningBy?: {
            id: string;
            role: string;
        };
        specialists: ISpecialist[];
        clients: IClient[];
        services: IService[];
        filialInfo?: {
            id: string;
            title: string;
            timezone: string;
        };
        organizationInfo?: {
            id: string;
            title: string;
        };
        cabinetNumber?: string;
        scheduledStart: Date;
        scheduledDurationSeconds: number;
        l10n: LanguageListEnum;
        isOpen: boolean;
        status: ConferenceStatusesEnum;
        joinedSpecialists: ISpecialist[];
        joinedClients: IClient[];
        cancelledByExternal?: boolean;
    }
    export interface IConferenceInfoInput {
        appointmentId: string;
        appointmentEngine?: AppointmentEnginesEnum;
        openingDurationSeconds: number;
        otp: boolean;
        specialists: ISpecialist[];
        clients: IClient[];
        services: IService[];
        filialInfo?: {
            id: string;
            title: string;
            timezone: string;
        };
        organizationInfo?: {
            id: string;
            title: string;
        };
        cabinetNumber?: string;
        scheduledStart: Date;
        scheduledDurationSeconds: number;
        l10n?: LanguageListEnum;
        isOpen?: boolean;
    }
}
declare module "medme/lib/time" {
    export class TimeMs {
        static readonly Minute: number;
        static readonly Hour: number;
        static readonly Day: number;
        static readonly Week: number;
    }
}
declare module "medme/lib/index" {
    import { ConferenceRolesEnum, ConferenceStatusesEnum, IConferenceInfo, IConferenceInfoInput } from "medme/lib/types/conference";
    import { SuccessStatusEnum, ErrorStatuses } from "medme/lib/statuses";
    type APIRequestFn = (method: string, params?: object) => Promise<any>;
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
        newConferenceStatus: ConferenceStatusesEnum;
    }
    export interface IConferenceDurations {
        status: SuccessStatusEnum | ErrorStatuses;
        expectedEndAt: String;
        scheduledDurationSeconds: number;
        netDurationSeconds: number;
        dirtyDurationSeconds: number;
        realDurationSeconds: number;
    }
    export class ConferenceModifyAPI {
        static createHttpAPI(baseUrl: string): ConferenceModifyAPI;
        private readonly apiRequest;
        constructor(apiRequest: APIRequestFn);
        create(apiKey: string, userId: string, userRole: ConferenceRolesEnum, conferenceInfo: IConferenceInfoInput): Promise<ICreateConferenceResponse>;
        move(): Promise<void>;
        resize(): Promise<void>;
        updateInfo(): Promise<void>;
    }
    export const RestoreFastDelayMinutes = 3;
    export class ConferenceAccessAPI {
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
        durations(accessToken: string): Promise<IConferenceDurations>;
    }
}
declare module "medme/lib/types/index" {
    import * as conference from "medme/lib/types/conference";
    export { conference };
}
declare module "medme/lib/sock" {
    import { ConferenceStatusesEnum } from "medme/lib/types/conference";
    export type ChangeConferenceStatusCallback = (newStatus: string) => void;
    export type ChangeConferenceInfoCallback = () => void;
    export interface IConferenceSock {
        changeConferenceStatus(newStatus: ConferenceStatusesEnum): any;
        changeConferenceStatusCallback(cb: ChangeConferenceStatusCallback): any;
        changeConferenceInfoCallback(cb: ChangeConferenceInfoCallback): any;
    }
    export class ConferenceSock implements IConferenceSock {
        private readonly wsUri;
        private ws_?;
        private at_?;
        private changeConferenceStatusCallback_?;
        private changeConferenceInfoCallback_?;
        private write_;
        private onOpen_;
        private onMessage_;
        private onClose_;
        private onError_;
        private doSend_;
        constructor(wsUri: string);
        accessToken(at: string): this;
        connect(at: string): void;
        changeConferenceStatus(newStatus: ConferenceStatusesEnum): void;
        changeConferenceStatusCallback(cb: ChangeConferenceStatusCallback): this;
        changeConferenceInfoCallback(cb: ChangeConferenceInfoCallback): this;
    }
}
declare module "medme/lang/index" {
    export const l10n: any;
}
declare module "medme/3dparts/jitsi-meet" {
    const _exports: any;
    export = _exports;
    export var JitsiMeetExternalAPI: any;
}
declare module "medme/lib/ux" {
    import { ConferenceRolesEnum, IConferenceInfo, LanguageListEnum } from "medme/lib/types/conference";
    import { ConferenceAccessAPI, IConferenceDurations } from "medme/lib/index";
    import { l10n } from "medme/lang/index";
    export { l10n };
    export enum BlockEnum {
        Languages = "langs",
        ConferenceInfo = "conference-info",
        JitsiMeet = "jitsi-meet",
        SpecialistHelp = "specialist-help"
    }
    export interface IBlock {
        type: BlockEnum;
    }
    export interface ILanguagesBlock extends IBlock {
        currentLanguage: LanguageListEnum;
        availableLanguages: LanguageListEnum[];
    }
    export interface IConferenceInfoBlock extends IBlock {
        userRole: ConferenceRolesEnum;
        finishPauseControl: boolean;
        leaveClientControl: boolean;
        showRealTimes: boolean;
        conference: IConferenceInfo;
    }
    export function createConferenceInfoBlock(userRole: ConferenceRolesEnum, confInfo: IConferenceInfo): IConferenceInfoBlock;
    export interface ISpecialistHelpBlock extends IBlock {
        userRole: ConferenceRolesEnum;
    }
    export interface IJitsiMeetBlock extends IBlock {
        conferenceToken: string;
        subject: string;
        displayName: string;
    }
    export type BlockType = (ILanguagesBlock | IConferenceInfoBlock | ISpecialistHelpBlock | IJitsiMeetBlock) & IBlock;
    export enum ScreenEnum {
        _4xx = "4xx",
        PendingClient = "pending-client",
        PendingSpecialist = "pending-specialist",
        JoinClient = "join-client",
        JoinSpecialist = "join-specialist",
        Cancelled = "cancelled",
        Finish = "finish",
        Started = "started"
    }
    export interface IScreen {
        name: ScreenEnum;
        availableBlocks: BlockEnum[];
        langBlock: ILanguagesBlock;
    }
    export interface I4xxScreen extends IScreen {
        status: number;
    }
    export interface IPendingClientScreen extends IScreen {
        conference: IConferenceInfo;
        userRole: ConferenceRolesEnum;
        confInfoBlock: IConferenceInfoBlock;
        specialistHelpBlock: ISpecialistHelpBlock;
    }
    export interface IPendingSpecialistScreen extends IScreen {
        conference: IConferenceInfo;
        userRole: ConferenceRolesEnum;
        confInfoBlock: IConferenceInfoBlock;
        specialistHelpBlock: ISpecialistHelpBlock;
    }
    export interface IJoinClientScreen extends IScreen {
        conference: IConferenceInfo;
        userRole: ConferenceRolesEnum;
        confInfoBlock: IConferenceInfoBlock;
        specialistHelpBlock: ISpecialistHelpBlock;
    }
    export interface IJoinSpecialistScreen extends IScreen {
        conference: IConferenceInfo;
        userRole: ConferenceRolesEnum;
        confInfoBlock: IConferenceInfoBlock;
        specialistHelpBlock: ISpecialistHelpBlock;
    }
    export interface ICancelledScreen extends IScreen {
        conference: IConferenceInfo;
        userRole: ConferenceRolesEnum;
        confInfoBlock: IConferenceInfoBlock;
        specialistHelpBlock: ISpecialistHelpBlock;
        showClientHint: boolean;
        restoreControls: boolean;
        canRestore: boolean;
        timerBlock: IConferenceDurations;
    }
    export interface IFinishScreen extends IScreen {
        conference: IConferenceInfo;
        userRole: ConferenceRolesEnum;
        confInfoBlock: IConferenceInfoBlock;
        specialistHelpBlock: ISpecialistHelpBlock;
        restoreControls: boolean;
        canRestore: boolean;
        timerBlock: IConferenceDurations;
    }
    export interface IStartedScreen extends IScreen {
        conference: IConferenceInfo;
        userRole: ConferenceRolesEnum;
        userId: string;
        accessToken: string;
        confInfoBlock: IConferenceInfoBlock;
        specialistHelpBlock: ISpecialistHelpBlock;
        jitsiMeetBlock: IJitsiMeetBlock;
        conferenceToken: string;
        timerBlock: IConferenceDurations;
    }
    export type ScreenType = (I4xxScreen | IPendingClientScreen | IPendingSpecialistScreen | IJoinClientScreen | IJoinSpecialistScreen | ICancelledScreen | IFinishScreen | IStartedScreen) & IScreen;
    export function createLanguagesBlock(): ILanguagesBlock;
    export function createSpecialistHelpBlock(userRole: ConferenceRolesEnum): ISpecialistHelpBlock;
    export function _make4xxScreen(status: number): ScreenType;
    export function createScreen(api: ConferenceAccessAPI, at: string): Promise<ScreenType>;
    export function timer(confInfo: any, timer: any): {
        updateTime: () => {
            hours: number;
            minutes: number;
            seconds: number;
            timerDelay: number;
            totalRemainSeconds: number;
        };
        getCurrent: () => {
            hours: number;
            minutes: number;
            seconds: number;
            timerDelay: number;
            totalRemainSeconds: number;
        };
    };
    export type ConferenceEventFn = () => void;
    export interface IConferenceConfig {
        lang: LanguageListEnum;
        jitsiDomain: string;
        l10n: {
            dateTime: {
                formatFull: string;
            };
            guest: string;
            specialist: string;
            client: string;
        };
        onJoined: ConferenceEventFn;
        onLeft: ConferenceEventFn;
    }
    export enum VerticalEnum {
        general = "general",
        medicine = "medicine"
    }
    export function initConfConfigL10n(confConfig: IConferenceConfig, vertical: VerticalEnum): void;
    export function openConference(conferenceAccessAPI: ConferenceAccessAPI, uxScreen: IStartedScreen, confConfig: IConferenceConfig): void;
}
declare module "medme/lib/jmlib" {
    import JitsiMeetJS from "@medme/lib-jitsi-meet";
    import JitsiConference from "@medme/lib-jitsi-meet/JitsiConference";
    import JitsiConnection from "@medme/lib-jitsi-meet/JitsiConnection";
    import JitsiLocalTrack from "@medme/lib-jitsi-meet/modules/RTC/JitsiLocalTrack";
    import JitsiRemoteTrack from "@medme/lib-jitsi-meet/modules/RTC/JitsiRemoteTrack";
    export { JitsiMeetJS, JitsiConference, JitsiConnection, JitsiLocalTrack, JitsiRemoteTrack };
    export class ConferenceSession {
        connection: JitsiConnection;
        isJoined: boolean;
        room: JitsiConference;
        _localTracks: Array<JitsiLocalTrack>;
        _remoteTracks: Map<string, JitsiRemoteTrack>;
        isVideo: boolean;
        constructor();
        getLocalTracks: () => Array<JitsiLocalTrack>;
        getRemoteTracks: () => Map<string, JitsiRemoteTrack>;
    }
    export class ConferenceEvents {
        constructor();
        onLocalTrack: (track: JitsiLocalTrack, idx: number, session: ConferenceSession) => void;
        onRemoteTrack: (track: JitsiRemoteTrack, idx: number, session: ConferenceSession) => void;
        onConferenceJoined: (session: ConferenceSession) => void;
        onUserLeft: (id: string, session: ConferenceSession) => void;
        onConnected: (session: ConferenceSession) => void;
        onConnectionFailed: (session: ConferenceSession) => void;
        onDeviceListChanged: (devices: Array<MediaDeviceInfo>, session: ConferenceSession) => void;
        onConnectionDisconnected: (session: ConferenceSession) => void;
        onSwitchVideo: (session: ConferenceSession) => void;
    }
    export class ConferenceConfig {
        env: any;
        clientNode: string;
        constructor(clientNode: string, env?: any);
        getConnectionOptions(): {
            hosts: {
                domain: any;
                muc: any;
            };
            bosh: any;
            clientNode: string;
        };
        getConferenceOptions(): {
            openBridgeChannel: boolean;
        };
    }
    export class ConferenceCtl {
        session: ConferenceSession;
        events: ConferenceEvents;
        constructor(sess: ConferenceSession, events: ConferenceEvents);
        changeAudioOutput(selected: string): void;
        unload(): void;
        switchVideo(): void;
    }
    export function createConferenceAndConnect(config: ConferenceConfig, events: ConferenceEvents): ConferenceCtl;
}
declare module "index" {
    import * as lib from "medme/lib/index";
    import * as env from "medme/env";
    import * as request from "medme/lib/httpRequest";
    import * as statuses from "medme/lib/statuses";
    import * as types from "medme/lib/types/index";
    import * as sock from "medme/lib/sock";
    import * as UX from "medme/lib/ux";
    import * as JML from "medme/lib/jmlib";
    export default lib;
    import ConferenceModifyAPI = lib.ConferenceModifyAPI;
    import ConferenceAccessAPI = lib.ConferenceAccessAPI;
    export { lib, ConferenceModifyAPI, ConferenceAccessAPI, env, request, statuses, types, sock, UX, JML };
    export let conferenceModifyAPI: ConferenceModifyAPI;
    export let conferenceAccessAPI: ConferenceAccessAPI;
    export let conferenceWebSocketAPI: sock.ConferenceSock;
    export function initHttpAPI(): void;
    export function initWebSocketAPI(): void;
}
