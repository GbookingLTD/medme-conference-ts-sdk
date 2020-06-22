///<amd-module name="MedMe" />

import * as lib from './medme/lib/index'
import * as env from './medme/env'
import * as request from './medme/lib/request'
import * as statuses from './medme/lib/statuses'
import * as types from './medme/lib/types/index'

export default lib

export {
    env,
    request,
    statuses,
    types
}

export const conferenceModifyAPI: lib.ConferenceModifyAPI = lib.ConferenceModifyAPI.createHttpAPI(env.CONFERENCE_ENDPOINT);
export const conferenceAccessAPI: lib.ConferenceAccessAPI = lib.ConferenceAccessAPI.createHttpAPI(env.CONFERENCE_ENDPOINT);

