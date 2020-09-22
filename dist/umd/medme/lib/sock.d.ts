import { ConferenceStatusesEnum } from "./types/conference";
export declare type ChangeConferenceStatusCallback = (newStatus: string) => {};
export interface IConferenceSock {
    changeConferenceStatus(newStatus: ConferenceStatusesEnum): any;
    changeConferenceStatusCallback(cb: ChangeConferenceStatusCallback): any;
}
export declare class ConferenceSock implements IConferenceSock {
    private readonly wsUri;
    private ws_?;
    private at_?;
    private changeConferenceStatusCallback_?;
    private write_;
    private onOpen_;
    private onMessage_;
    private doSend_;
    constructor(wsUri: string);
    accessToken(at: string): this;
    connect(at: string): void;
    changeConferenceStatus(newStatus: ConferenceStatusesEnum): void;
    changeConferenceStatusCallback(cb: ChangeConferenceStatusCallback): this;
}
