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
export declare function createConferenceInfoBlock(userRole: ConferenceRolesEnum, confInfo: IConferenceInfo): IConferenceInfoBlock;
export interface ISpecialistHelpBlock extends IBlock {
    userRole: ConferenceRolesEnum;
}
export interface IJitsiMeetBlock extends IBlock {
    conferenceToken: string;
    subject: string;
    displayName: string;
}
export declare type BlockType = (ILanguagesBlock | IConferenceInfoBlock | ISpecialistHelpBlock | IJitsiMeetBlock) & IBlock;
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
}
export interface IFinishScreen extends IScreen {
    conference: IConferenceInfo;
    userRole: ConferenceRolesEnum;
    confInfoBlock: IConferenceInfoBlock;
    specialistHelpBlock: ISpecialistHelpBlock;
    restoreControls: boolean;
    canRestore: boolean;
}
export interface IStartedScreen extends IScreen {
    conference: IConferenceInfo;
    userRole: ConferenceRolesEnum;
    confInfoBlock: IConferenceInfoBlock;
    specialistHelpBlock: ISpecialistHelpBlock;
    jitsiMeetBlock: IJitsiMeetBlock;
    conferenceToken: string;
}
declare type ScreenType = (I4xxScreen | IPendingClientScreen | IPendingSpecialistScreen | IJoinClientScreen | IJoinSpecialistScreen | ICancelledScreen | IFinishScreen | IStartedScreen) & IScreen;
export declare function createLanguagesBlock(): ILanguagesBlock;
export declare function createSpecialistHelpBlock(userRole: ConferenceRolesEnum): ISpecialistHelpBlock;
export declare function _make4xxScreen(status: number): ScreenType;
export declare function createScreen(api: ConferenceAccessAPI, at: string): Promise<ScreenType>;
export {};
