import { ConferenceRolesEnum, IConferenceInfo, LanguageListEnum } from "./types/conference";
import { ConferenceAccessAPI } from "./index";
export declare enum BlockEnum {
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
    conference: IConferenceInfo;
}
export interface IJitsiMeetBlock extends IBlock {
    conferenceToken: string;
    subject: string;
    displayName: string;
}
export declare enum ScreenEnum {
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
    availableBlocks: IBlock[];
}
export interface I4xxScreen extends IScreen {
    status: number;
}
export interface IPendingClientScreen extends IScreen {
}
export interface IPendingSpecialistScreen extends IScreen {
}
export interface IJoinClientScreen extends IScreen {
}
export interface IJoinSpecialistScreen extends IScreen {
}
export interface ICancelledScreen extends IScreen {
}
export interface IFinishScreen extends IScreen {
}
export interface IStartedScreen extends IScreen {
}
export declare function createUX(accessAPI: ConferenceAccessAPI, at: string): Promise<IUX>;
declare type ScreenType = (I4xxScreen | IPendingClientScreen | IPendingSpecialistScreen | IJoinClientScreen | IJoinSpecialistScreen | ICancelledScreen | IFinishScreen | IStartedScreen) & IScreen;
export declare function _make4xxScreen(status: number): IUX;
export interface IUX {
    getCurrentPage(): ScreenType;
}
export {};
