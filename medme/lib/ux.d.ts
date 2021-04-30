import { ConferenceRolesEnum, IConferenceInfo, LanguageListEnum } from "./types/conference";
import { ConferenceAccessAPI, IConferenceDurations } from "./index";
import { l10n } from "../lang/index";
export { l10n };
/**
 * Блоки интерфейса.
 */
export declare enum BlockEnum {
    Languages = "langs",
    ConferenceInfo = "conference-info",
    JitsiMeet = "jitsi-meet",
    SpecialistHelp = "specialist-help"
}
/**
 * Общий интерфейс для блока интерфейса
 */
export interface IBlock {
    type: BlockEnum;
}
/**
 * Блок переключения языковой локали.
 */
export interface ILanguagesBlock extends IBlock {
    currentLanguage: LanguageListEnum;
    availableLanguages: LanguageListEnum[];
}
/**
 * Блок с информацией о приёме.
 */
export interface IConferenceInfoBlock extends IBlock {
    userRole: ConferenceRolesEnum;
    finishPauseControl: boolean;
    leaveClientControl: boolean;
    showRealTimes: boolean;
    conference: IConferenceInfo;
}
/**
 * Создает и возвращает блок с информацией о приёме исходя из данных из API, переданных в качестве параметров.
 * @param userRole
 * @param confInfo
 */
export declare function createConferenceInfoBlock(userRole: ConferenceRolesEnum, confInfo: IConferenceInfo): IConferenceInfoBlock;
/**
 *
 */
export interface ISpecialistHelpBlock extends IBlock {
    userRole: ConferenceRolesEnum;
}
/**
 * Блок интерфейса Jitsi Meet
 */
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
/**
 * Общий интерфейс данных для отображения страницы приложения.
 * Содержит тип страницы, список доступных блоков.
 */
export interface IScreen {
    name: ScreenEnum;
    availableBlocks: BlockEnum[];
    langBlock: ILanguagesBlock;
}
/**
 * Конференция не найдена по accessToken
 */
export interface I4xxScreen extends IScreen {
    status: number;
}
/**
 * Страница ожидания начала конференции для клиента.
 */
export interface IPendingClientScreen extends IScreen {
    conference: IConferenceInfo;
    userRole: ConferenceRolesEnum;
    confInfoBlock: IConferenceInfoBlock;
    specialistHelpBlock: ISpecialistHelpBlock;
}
/**
 *
 */
export interface IPendingSpecialistScreen extends IScreen {
    conference: IConferenceInfo;
    userRole: ConferenceRolesEnum;
    confInfoBlock: IConferenceInfoBlock;
    specialistHelpBlock: ISpecialistHelpBlock;
}
/**
 *
 */
export interface IJoinClientScreen extends IScreen {
    conference: IConferenceInfo;
    userRole: ConferenceRolesEnum;
    confInfoBlock: IConferenceInfoBlock;
    specialistHelpBlock: ISpecialistHelpBlock;
}
/**
 *
 */
export interface IJoinSpecialistScreen extends IScreen {
    conference: IConferenceInfo;
    userRole: ConferenceRolesEnum;
    confInfoBlock: IConferenceInfoBlock;
    specialistHelpBlock: ISpecialistHelpBlock;
}
/**
 *
 */
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
/**
 *
 */
export interface IFinishScreen extends IScreen {
    conference: IConferenceInfo;
    userRole: ConferenceRolesEnum;
    confInfoBlock: IConferenceInfoBlock;
    specialistHelpBlock: ISpecialistHelpBlock;
    restoreControls: boolean;
    canRestore: boolean;
    timerBlock: IConferenceDurations;
}
/**
 *
 */
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
export declare type ScreenType = (I4xxScreen | IPendingClientScreen | IPendingSpecialistScreen | IJoinClientScreen | IJoinSpecialistScreen | ICancelledScreen | IFinishScreen | IStartedScreen) & IScreen;
export declare function createLanguagesBlock(): ILanguagesBlock;
export declare function createSpecialistHelpBlock(userRole: ConferenceRolesEnum): ISpecialistHelpBlock;
export declare function _make4xxScreen(status: number): ScreenType;
/**
 * Создаёт объект класса UX, поместив туда данные, полученные из API.
 * @param api
 * @param at
 */
export declare function createScreen(api: ConferenceAccessAPI, at: string): Promise<ScreenType>;
export declare function timer(confInfo: any, timer: any): {
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
export declare type ConferenceEventFn = () => void;
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
export declare enum VerticalEnum {
    general = "general",
    medicine = "medicine"
}
export declare function initConfConfigL10n(confConfig: IConferenceConfig, vertical: VerticalEnum): void;
export declare function openConference(conferenceAccessAPI: ConferenceAccessAPI, uxScreen: IStartedScreen, confConfig: IConferenceConfig): void;
