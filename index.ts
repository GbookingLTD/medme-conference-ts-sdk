///<amd-module name="MedMe" />

import * as lib from './medme/lib/index'
import * as env from './medme/env'

export default lib

export const conferenceModifyAPI: lib.ConferenceModifyAPI = new lib.ConferenceModifyAPI(env.CONFERENCE_ENDPOINT);
export const conferenceAccessAPI: lib.ConferenceAccessAPI = new lib.ConferenceAccessAPI(env.CONFERENCE_ENDPOINT);

