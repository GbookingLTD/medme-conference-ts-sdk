/*
MedMe Audio/Video Conference API SDK
 */

/**
 *
 */
enum AppointmentEnginesEnum {
    GBooking = 'GBooking'
}

/**
 *
 */
enum LanguageListEnum {
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
enum ConferenceRolesEnum {
    Client = 'CLIENT',
    Specialist = 'SPECIALIST'
}

export interface ISpecialist {
    id: String;
    name: String;
    surname: String;
    middleName: String;
    profession: String;
    required: String;
}

export interface IClient {
    id: String;
    name: String;
    surname: String;
    middleName: String;
}

export interface IService {
    id: String;
    name: [{
        lang: LanguageListEnum;
        text: String;
    }]
};

/**
 * Интерфейс данных конференции
 */
export interface IConferenceInfo {
    appointmentId: String,
    appointmentEngine: AppointmentEnginesEnum,
    createdAt: Date,
    createdBy: {
        id: String,
        role: ConferenceRolesEnum,
    },
    openingDurationSeconds: Number,
    otp: Boolean,
    openForJoiningAt?: Date,
    openForJoiningBy?: {
        id: String,
        role: String,
    },
    specialists: [ISpecialist],
    clients: [IClient],
    services: [IService],
    filialInfo?: {
        id: String,
        title: String,
        timezone: String
    },
    organizationInfo?: {
        id: String,
        title: String,
    },
    cabinetNumber?: String,
    scheduledStart: Date,
    scheduledDurationSeconds: Number,
    l10n: LanguageListEnum,
    isOpen: Boolean,
}

/**
 *
 */
export class ConferenceModifyAPI {
    private baseUrl: string;

    public constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    public async createConference() {

    }

    public async moveConference() {

    }

    public async resizeConference() {

    }

    public async updateConferenceInfo() {

    }
}

/**
 *
 */
export class ConferenceAccessAPI {
    private baseUrl: string;

    public constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    public async exchange(accessToken) {

    }

    public async otpSend() {

    }

    public async otpVerify() {

    }

    public async getConferenceInfoByAccessToken() {

    }

    public async openForJoining() {

    }
}