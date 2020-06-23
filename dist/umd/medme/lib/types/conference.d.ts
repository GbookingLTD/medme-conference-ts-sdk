export declare enum AppointmentEnginesEnum {
    GBooking = "GBooking"
}
export declare enum LanguageListEnum {
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
export declare enum ConferenceRolesEnum {
    Client = "CLIENT",
    Specialist = "SPECIALIST"
}
export declare enum ConferenceStatusesEnum {
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
}
export interface IConferenceInfo {
    appointmentId: string;
    appointmentEngine: AppointmentEnginesEnum;
    createdAt: string;
    cancelledAt?: string;
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
