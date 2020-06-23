"use strict";

/**
 *
 */
export enum AppointmentEnginesEnum {
    GBooking = 'GBooking'
}

/**
 *
 */
export enum LanguageListEnum {
    EN_US = 'en-us',
    RU_RU = 'ru-ru',
    HE_IL = 'he-il',
    FR_FR = 'fr-fr',
    HU_HU = 'hu-hu',
    EE_EE = 'ee-ee',
    LV_LV = 'lv-lv',
    LT_LT = 'lt-lt',
    DE_DE = 'de-de',
    ZH_CH = 'zh-cn',
    FI_FI = 'fi-fi',
    AM_AM = 'am-am',
    ES_ES = 'es-es',
    GE_GE = 'ge-ge',
    UZ_UZ = 'uz-uz',
    AR_PS = 'ar-ps',
}

/**
 *
 */
export enum ConferenceRolesEnum {
    Client = 'CLIENT',
    Specialist = 'SPECIALIST'
}

/**
 *
 */
export enum ConferenceStatusesEnum {
    Pending = 'pending', // ожидание начала
    OpenForJoining = 'open_for_joining', // открыта врачом, но еще не все присоединились
    Started = 'started', // начата
    StartedAndWaiting = 'started_and_waiting', // начата, но врач или пациент не присоединились или вышли
    StartedAndPaused = 'started_and_paused', // начата, но врач поставил на паузу
    CancelledBeforeStart = 'cancelled_before_start', // отменена до начала
    CancelledAfterStart = 'cancelled_after_start', // отменена после начала (врач или пациент не пришли)
    Finished = 'finished' // завершена
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
    }[]
}

/**
 * Интерфейс данных конференции
 */
export interface IConferenceInfo {
    appointmentId: string,
    appointmentEngine: AppointmentEnginesEnum,
    createdAt: string, // Date
    cancelledAt?: string, // Date
    finishedAt?: string, // Date
    createdBy: {
        id: string,
        role: ConferenceRolesEnum,
    },
    openingDurationSeconds: number,
    otp: boolean,
    openForJoiningAt?: Date,
    openForJoiningBy?: {
        id: string,
        role: string,
    },
    specialists: ISpecialist[],
    clients: IClient[],
    services: IService[],
    filialInfo?: {
        id: string,
        title: string,
        timezone: string
    },
    organizationInfo?: {
        id: string,
        title: string,
    },
    cabinetNumber?: string,
    scheduledStart: Date,
    scheduledDurationSeconds: number,
    l10n: LanguageListEnum,
    isOpen: boolean,
    status: ConferenceStatusesEnum
}

/**
 * Описание полей входящего для создания конференции.
 */
export interface IConferenceInfoInput {
    appointmentId: string,
    appointmentEngine?: AppointmentEnginesEnum,
    openingDurationSeconds: number,
    otp: boolean,
    specialists: ISpecialist[],
    clients: IClient[],
    services: IService[],
    filialInfo?: {
        id: string,
        title: string,
        timezone: string
    },
    organizationInfo?: {
        id: string,
        title: string,
    },
    cabinetNumber?: string,
    scheduledStart: Date,
    scheduledDurationSeconds: number,
    l10n?: LanguageListEnum,
    isOpen?: boolean,
}