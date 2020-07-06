/*
MedMe Conference UX logic
 */

import {ConferenceRolesEnum, IConferenceInfo, LanguageListEnum} from "./types/conference";
import {
    ConferenceAccessAPI,
    IConferenceInfoSuccessResponse,
    IConferenceStatusResponse,
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
    // Информация о конференции
    conference: IConferenceInfo;
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

type BlockType = (ILanguagesBlock | IConferenceInfoBlock | IJitsiMeetBlock) & IBlock;

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
    availableBlocks: BlockType[];
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

}

/**
 *
 */
export interface IPendingSpecialistScreen extends IScreen {

}

/**
 *
 */
export interface IJoinClientScreen extends IScreen {

}

/**
 *
 */
export interface IJoinSpecialistScreen extends IScreen {

}

/**
 *
 */
export interface ICancelledScreen extends IScreen {

}

/**
 *
 */
export interface IFinishScreen extends IScreen {

}

/**
 *
 */
export interface IStartedScreen extends IScreen {

}

/**
 * Создаёт объект класса UX, поместив туда данные, полученные из API.
 * @param accessAPI
 * @param at
 */
export async function createUX(accessAPI:ConferenceAccessAPI, at: string): Promise<IUX> {
    if (!at)
        return _make4xxScreen(404);

    try {
        // если нужно получить доступ к Jitsi Meet используем этот метод
        let exchangeRes: IExchangeTokenResponse = await accessAPI.exchange(at);
        let confRes: IConferenceInfoSuccessResponse = await accessAPI.getConferenceInfo(at);

        return new UX(confRes.conference_info, exchangeRes.conference_token);
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

type ScreenType = (I4xxScreen | IPendingClientScreen | IPendingSpecialistScreen |
    IJoinClientScreen | IJoinSpecialistScreen | ICancelledScreen |
    IFinishScreen | IStartedScreen) & IScreen;

export function _make4xxScreen(status: number): IUX {
    console.assert(status === 401 || status === 404);
    return new UXTrivial({
        name: ScreenEnum._4xx,
        availableBlocks: [{type: BlockEnum.Languages} as ILanguagesBlock],
        status: status
    } as I4xxScreen);
}

/**
 * Интерфейс, предоставляющий логику управления интерфейсом  (UX).
 */
export interface IUX {
    getCurrentPage(): ScreenType;
}

/**
 * Класс, предоставляющий логику управления интерфейсом инициализированную напрямую.
 */
class UXTrivial {
    private screen_: ScreenType;
    constructor(screen: ScreenType) {
    }

    getCurrentPage(): ScreenType {
        return this.screen_;
    }
}

/**
 * Класс, предоставляющий логику управления интерфейсом  (UX).
 * Здесь логика вычисляется исходя из переданных значений
 */
class UX {
    private readonly conferenceToken_?: string;
    private readonly conferenceInfo_: IConferenceInfo;

    constructor(confInfo: IConferenceInfo, confToken: string = null) {
        this.conferenceInfo_ = confInfo;
        this.conferenceToken_ = confToken;
    }

    /**
     * Вернуть текущую страницу
     */
    getCurrentPage(): ScreenType {
        return {
            name: ScreenEnum._4xx,
            availableBlocks: [{type: BlockEnum.Languages} as ILanguagesBlock]
        } as IPendingSpecialistScreen;
    }
}

