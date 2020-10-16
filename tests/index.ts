import 'mocha';
import * as assert from 'assert';
import {TimeMs} from './time'
import {ConferenceAccessAPI, ConferenceModifyAPI} from '../medme/lib'
import {APIKEY, CONFERENCE_ENDPOINT} from '../medme/env'
import {APIError, IAPIExpectFieldsErrorResponse} from "../medme/lib/httpRequest";
import {ErrorStatuses} from "../medme/lib/statuses";
import {ConferenceRolesEnum, IConferenceInfoInput} from "../medme/lib/types/conference";
import * as env from '../medme/env'

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

const modifyAPI: ConferenceModifyAPI = ConferenceModifyAPI.createHttpAPI(process.env.CONFERENCE_ENDPOINT || env.CONFERENCE_ENDPOINT);
const accessAPI: ConferenceAccessAPI = ConferenceAccessAPI.createHttpAPI(process.env.CONFERENCE_ENDPOINT || env.CONFERENCE_ENDPOINT);

describe('ConferenceModifyAPI', () => {
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
    // create conf and get access_token
    const createSimpleConf = async () => {
        const conf = simpleConf();
        conf.clients.push({
            id: '1',
            name: 'Vasja',
            surname: 'Petrov',
            middleName: 'Ibn'
        });
        return await modifyAPI.create(APIKEY, '1', ConferenceRolesEnum.Client, conf);
    }

    it('exchange with wrong access_token', async () => {
        try {
            await accessAPI.exchange('[:::wrONG_AcceSs_TokEN:::]');
        } catch (err) {
            if (err instanceof APIError) {
                assert.strictEqual(err.response.status, ErrorStatuses.AccessTokenNotFound)
                return;
            }
        }

        assert.fail('wrong access token passed');
    });
    it('exchange with simple input', async () => {
            const {access_token} = await createSimpleConf();
            const {conference_token} = await accessAPI.exchange(access_token);
            assert(conference_token);
            assert.strictEqual(conference_token.length, 64)
    });
    it('getConferenceInfoByAccessToken', () => {

    });
})
