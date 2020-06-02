import 'mocha';
import * as assert from 'assert';
import {ConferenceModifyAPI, ConferenceAccessAPI} from '../lib'
import {CONFERENCE_ENDPOINT, APIKEY} from '../env'

describe('ConferenceModifyAPI', () => {
    let modifyAPI: ConferenceModifyAPI;
    let accessAPI: ConferenceAccessAPI;
    before(() => {
        modifyAPI = new ConferenceModifyAPI(CONFERENCE_ENDPOINT);
        accessAPI = new ConferenceAccessAPI(CONFERENCE_ENDPOINT);
    })
    it('create', async () => {
        const res = await modifyAPI.create(APIKEY);
        assert.ok(res && res.access_token)
    });
    it('cancel', async () => {

    });
});

describe('ConferenceAccessAPI', () => {
    it('exchange', async () => {

    });
    it('getConferenceInfoByAccessToken', async () => {

    });
})