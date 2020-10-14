/*
MedMe Conference UX logic
 */

import {ConferenceRolesEnum, ConferenceStatusesEnum, IConferenceInfo, LanguageListEnum} from "./types/conference";
import {
    ConferenceAccessAPI,
    IConferenceDurations,
    IConferenceInfoSuccessResponse,
    IExchangeTokenResponse
} from "./index";
import {APIError} from "./httpRequest";
import {ErrorStatuses} from "./statuses";

/**
 * Блоки интерфейса.
 */
export enum BlockEnum {
    // панель для переключения языков
    Languages = 'langs',
    // информация по конференции
    ConferenceInfo = 'conference-info',
    // UI клиент Jitsi Meet
    JitsiMeet = 'jitsi-meet',
    // Инструкция для специалиста
    SpecialistHelp = 'specialist-help',
}

/**
 * Общий интерфейс для блока интерфейса
 */
export interface IBlock {
    // тип блока интерфейса
    type: BlockEnum;

}

/**
 * Блок переключения языковой локали.
 */
export interface ILanguagesBlock extends IBlock {
    // текущий язык
    currentLanguage: LanguageListEnum;
    // список доступных языков
    availableLanguages: LanguageListEnum[];
}

/**
 * Блок с информацией о приёме.
 */
export interface IConferenceInfoBlock extends IBlock {
    // Роль пользователя
    userRole: ConferenceRolesEnum;
    // Показывать панель с кнопками "пауза", "завершить"
    finishPauseControl: boolean;
    // Показывать панель с кнопкой "покинуть"
    leaveClientControl: boolean;
    // Показывать реальные время начала и окончания
    showRealTimes: boolean;
    // Информация о конференции
    conference: IConferenceInfo;
}

/**
 * Создает и возвращает блок с информацией о приёме исходя из данных из API, переданных в качестве параметров.
 * @param userRole
 * @param confInfo
 */
export function createConferenceInfoBlock(userRole: ConferenceRolesEnum, confInfo: IConferenceInfo): IConferenceInfoBlock {
    return {
        userRole,
        finishPauseControl: userRole === ConferenceRolesEnum.Specialist &&
            confInfo.status === ConferenceStatusesEnum.Started,
        leaveClientControl: userRole === ConferenceRolesEnum.Client &&
            (
                confInfo.status === ConferenceStatusesEnum.Started ||
                confInfo.status === ConferenceStatusesEnum.StartedAndWaiting ||
                confInfo.status === ConferenceStatusesEnum.StartedAndPaused
            ),
        showRealTimes: (
            // confInfo.status === ConferenceStatusesEnum.CancelledAfterStart ||
            // confInfo.status === ConferenceStatusesEnum.CancelledBeforeStart ||
            confInfo.status === ConferenceStatusesEnum.Finished

        ),
        conference: confInfo
    } as IConferenceInfoBlock
}

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
    // ключ конференции
    conferenceToken: string;
    // заголовок конференции
    subject: string;
    // имя участника
    displayName: string;
}

export type BlockType = (ILanguagesBlock | IConferenceInfoBlock | ISpecialistHelpBlock | IJitsiMeetBlock) & IBlock;

/*
 * Страницы интерфейса
 */
export enum ScreenEnum {
    // Ошибка "конференция не найдена"
    _4xx= '4xx',
    // Ожидание начала приёма клиентом
    PendingClient = 'pending-client',
    // Ожидание начала приёма специалистом
    PendingSpecialist = 'pending-specialist',
    // Страница присоединения конференции клиентом
    JoinClient = 'join-client',
    // Страница присоединения конференции специалистом
    JoinSpecialist = 'join-specialist',
    // Конференция отменена до начала приёма
    Cancelled = 'cancelled',
    // Конференция завершена
    Finish = 'finish',
    // Конференция в процессе
    Started = 'started',
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
    confInfoBlock: IConferenceInfoBlock;
    specialistHelpBlock: ISpecialistHelpBlock;
    jitsiMeetBlock: IJitsiMeetBlock;
    conferenceToken: string;
    timerBlock: IConferenceDurations;
}

type ScreenType = (I4xxScreen | IPendingClientScreen | IPendingSpecialistScreen |
    IJoinClientScreen | IJoinSpecialistScreen | ICancelledScreen |
    IFinishScreen | IStartedScreen) & IScreen;

// TODO Load languages from conference info
export function createLanguagesBlock(): ILanguagesBlock {
    return {
        type: BlockEnum.Languages,
        currentLanguage: LanguageListEnum.RU_RU,
        availableLanguages: [LanguageListEnum.RU_RU, LanguageListEnum.EN_US]
    } as ILanguagesBlock
}

export function createSpecialistHelpBlock(userRole: ConferenceRolesEnum) {
    return {
        type: BlockEnum.SpecialistHelp,
        userRole: userRole
    } as ISpecialistHelpBlock
}

export function _make4xxScreen(status: number): ScreenType {
    console.assert(status === 401 || status === 404);
    return {
        name: ScreenEnum._4xx,
        availableBlocks: [BlockEnum.Languages],
        langBlock: createLanguagesBlock(),
        status: status
    } as I4xxScreen;
}

/**
 * Создаёт объект класса UX, поместив туда данные, полученные из API.
 * @param api
 * @param at
 */
export async function createScreen(api: ConferenceAccessAPI, at: string): Promise<ScreenType> {
    if (!at)
        return _make4xxScreen(404);

    try {
        // получаем ключ к конференции по ключу доступа (как название для jitsi конференции)
        // получаем данные конференции по ключу доступа

        // если нужно получить доступ к Jitsi Meet используем этот метод
        let exchangeRes: IExchangeTokenResponse = await api.exchange(at);
        let confRes: IConferenceInfoSuccessResponse = await api.getConferenceInfo(at);
        let durations: IConferenceDurations = await api.durations(at);

        return createConferenceScreen(api, confRes.role, confRes.conference_info, at,
            exchangeRes.conference_token, confRes.user_id, durations);
    } catch (err) {
        if (err instanceof APIError &&
            [
                ErrorStatuses.Unauthorized,
                ErrorStatuses.ExpiredToken,
                ErrorStatuses.ExpectConferenceToken,
            ].indexOf(err.response.status) >= 0)
            return _make4xxScreen(401);

        if (err instanceof APIError &&
            [
                ErrorStatuses.AccessTokenNotFound,
                ErrorStatuses.ExpectAccessToken,
            ].indexOf(err.response.status) >= 0)
            return _make4xxScreen(404);

        throw err;
    }
}

/**
 * Вернуть текущую страницу конференции в зависимости от статуса конференции и роли пользователя
 */
function createConferenceScreen(api: ConferenceAccessAPI, userRole: ConferenceRolesEnum, confInfo: IConferenceInfo,
                                at: string, confToken: string, userId: string, durations: IConferenceDurations): ScreenType {
    if (userRole === ConferenceRolesEnum.Client &&
        confInfo.status === ConferenceStatusesEnum.Pending)
        return {
            name: ScreenEnum.PendingClient,
            availableBlocks: [BlockEnum.ConferenceInfo],
            userRole: ConferenceRolesEnum.Client,
            conference: confInfo,
            confInfoBlock: createConferenceInfoBlock(userRole, confInfo)
        } as IPendingClientScreen;

    if (userRole === ConferenceRolesEnum.Specialist &&
        confInfo.status === ConferenceStatusesEnum.Pending)
        return {
            name: ScreenEnum.PendingSpecialist,
            availableBlocks: [],
            userRole: ConferenceRolesEnum.Specialist,
            conference: confInfo,
            confInfoBlock: createConferenceInfoBlock(userRole, confInfo),
        } as IPendingSpecialistScreen

    if (userRole === ConferenceRolesEnum.Client && (
            confInfo.status === ConferenceStatusesEnum.OpenForJoining ||
            [
                ConferenceStatusesEnum.Started,
                ConferenceStatusesEnum.StartedAndPaused,
                ConferenceStatusesEnum.StartedAndWaiting
            ].indexOf(confInfo.status) >= 0 && !confInfo.joinedClients.find((item) => item.id === userId)
        ))
        return {
            name: ScreenEnum.JoinClient,
            availableBlocks: [],
            userRole: ConferenceRolesEnum.Client,
            conference: confInfo,
            confInfoBlock: createConferenceInfoBlock(userRole, confInfo),
        } as IJoinClientScreen

    if (userRole === ConferenceRolesEnum.Specialist && (
            confInfo.status === ConferenceStatusesEnum.OpenForJoining ||
            [
                ConferenceStatusesEnum.Started,
                ConferenceStatusesEnum.StartedAndPaused,
                ConferenceStatusesEnum.StartedAndWaiting
            ].indexOf(confInfo.status) >= 0 && !confInfo.joinedSpecialists.find((item) => item.id === userId)
        ))
        return {
            name: ScreenEnum.JoinSpecialist,
            availableBlocks: [],
            userRole: ConferenceRolesEnum.Specialist,
            conference: confInfo,
            confInfoBlock: createConferenceInfoBlock(userRole, confInfo),
        } as IJoinSpecialistScreen

    if (confInfo.status === ConferenceStatusesEnum.CancelledBeforeStart)
        return {
            name: ScreenEnum.Cancelled,
            availableBlocks: [],
            userRole: userRole,
            conference: confInfo,
            confInfoBlock: createConferenceInfoBlock(userRole, confInfo),
            showClientHint: userRole === ConferenceRolesEnum.Client,
            restoreControls: userRole === ConferenceRolesEnum.Specialist,
            canRestore: api.canRestore(confInfo),
            timerBlock: durations
        } as ICancelledScreen

    if (confInfo.status === ConferenceStatusesEnum.CancelledAfterStart ||
        confInfo.status === ConferenceStatusesEnum.Finished)
        return {
            name: ScreenEnum.Finish,
            availableBlocks: [],
            userRole: userRole,
            conference: confInfo,
            confInfoBlock: createConferenceInfoBlock(userRole, confInfo),
            restoreControls: userRole === ConferenceRolesEnum.Specialist,
            canRestore: api.canRestore(confInfo),
            timerBlock: durations
        } as IFinishScreen

    return {
        name: ScreenEnum.Started,
        userRole: userRole,
        availableBlocks: [BlockEnum.ConferenceInfo],
        conference: confInfo,
        userId: userId,
        conferenceToken: confToken,
        accessToken: at,
        langBlock: createLanguagesBlock(),
        confInfoBlock: createConferenceInfoBlock(userRole, confInfo),
        specialistHelpBlock: createSpecialistHelpBlock(userRole),
        jitsiMeetBlock: {
            type: BlockEnum.JitsiMeet,
            conferenceToken: confToken,
            subject: 'Первичный прием, Вт. 12 Мар. 2020, 12:45',
            displayName: 'Врач педиатр, Александр Иванович Синицын',
        } as IJitsiMeetBlock,
        timerBlock: durations
    } as IStartedScreen
}

export function timer(confInfo, timer) {
    let firstUpdateNowSeconds;
    let conferenceScheduledDurationSeconds;
    let netDurationSeconds;

    firstUpdateNowSeconds = Date.now() / 1000;

    conferenceScheduledDurationSeconds = confInfo.scheduledDurationSeconds;
    const delta = (Date.now() - new Date(timer.now).getTime()) / 1000;
    netDurationSeconds = timer.netDurationSeconds + delta;

    let totalRemainSeconds = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let timerDelay = 1000;

    const updateTime = function () {
        const now = Date.now() / 1000;
        const deltaSeconds = now - firstUpdateNowSeconds;
        totalRemainSeconds = Math.max(0, conferenceScheduledDurationSeconds - deltaSeconds - netDurationSeconds);

        hours = Math.floor(totalRemainSeconds / 3600);
        const newMinutes = Math.floor(totalRemainSeconds / 60) % 60;
        // если значение минут не поменялось, то изменяем в следующий раз через 100 мс
        if (newMinutes === minutes)
            timerDelay = 100;
        else
            timerDelay = 1000;
        minutes = newMinutes;
        seconds = Math.floor(totalRemainSeconds % 60);
    };

    const _this = {
        updateTime: function() {
            updateTime();
            return _this.getCurrent();
        },
        getCurrent: function() {
            return {
                hours: hours,
                minutes: minutes,
                seconds: seconds,
                timerDelay: timerDelay,
                totalRemainSeconds: totalRemainSeconds
            }
        }
    }

    return _this;
}
