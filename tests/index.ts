import 'mocha';
import * as assert from 'assert';
import {TimeMs} from './time'
import {ConferenceAccessAPI, ConferenceModifyAPI} from '../lib'
import {APIKEY, CONFERENCE_ENDPOINT} from '../env'
import {APIError, IAPIExpectFieldsErrorResponse} from "../lib/request";
import {ErrorStatuses} from "../lib/statuses";
import {ConferenceRolesEnum, IConferenceInfoInput} from "../lib/types/conference";

let confCounter = 1;
const makeAppointmentId = () =>
    "test_" + Date.now() + "_" + confCounter

const simpleConf = (): IConferenceInfoInput =>
    ({
        appointmentId: makeAppointmentId(),
        clients: [],
        isOpen: false,
        l10n: undefined,
        filialInfo: {
            id: "1",
            title: "Hospital1",
            timezone: "Europe/Moscow"
        },
        organizationInfo: {
            id: "1",
            title: "A"
        },
        openingDurationSeconds: 0, // время, за которое можно открыть возможность входа
        otp: false, // нужна или нет otp авторизация
        scheduledDurationSeconds: 30 * 60,
        scheduledStart: new Date(Date.now() + TimeMs.Week),
        services: [],
        specialists: []
    })

describe('ConferenceModifyAPI', () => {
    let modifyAPI: ConferenceModifyAPI;
    let accessAPI: ConferenceAccessAPI;
    before(() => {
        modifyAPI = new ConferenceModifyAPI(CONFERENCE_ENDPOINT);
        accessAPI = new ConferenceAccessAPI(CONFERENCE_ENDPOINT);
    })
    it('create with wrong apikey should Unauthorized error', async () => {
        try {
            await modifyAPI.create('[:::soME_anOTheR_ApikEy:::]', '1', ConferenceRolesEnum.Client, simpleConf());
        } catch (err) {
            if (err instanceof APIError) {
                assert.strictEqual(err.response.status, ErrorStatuses.Unauthorized)
                assert.strictEqual(err.response.description, 'Wrong APIKEY')
                return ;
            }
        }
        assert.fail('created with wrong apikey')
    });
    it('create without fields should return ExpectRequestFields error', async () => {
        try {
            await modifyAPI.create(APIKEY, '1', ConferenceRolesEnum.Specialist, null);
        } catch (err) {
            if (err instanceof APIError) {
                const res = err.response as IAPIExpectFieldsErrorResponse;
                assert.strictEqual(res.status, ErrorStatuses.ExpectRequestFields)
                assert.ok(res.expect_fields.find((field) => field === 'conference_info'))
                return ;
            }
        }
        assert.fail('created without required fields')
    });
    it('create with simple correct input', async () => {
        const conf = simpleConf();
        conf.clients.push({
            id: '1',
            name: 'Vasja',
            surname: 'Petrov',
            middleName: 'Ibn'
        });
        const res = await modifyAPI.create(APIKEY, '1', ConferenceRolesEnum.Client, conf);
        assert.ok(res && res.access_token)
    });
    it('cancel', () => {

    });
});

describe('ConferenceAccessAPI', () => {
    it('exchange', () => {

    });
    it('getConferenceInfoByAccessToken', () => {

    });
})