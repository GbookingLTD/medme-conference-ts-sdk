import * as lib from './medme/lib/index';
import * as env from './medme/env';
import * as request from './medme/lib/httpRequest';
import * as statuses from './medme/lib/statuses';
import * as types from './medme/lib/types/index';
import * as sock from './medme/lib/sock';
import * as UX from './medme/lib/ux';
import * as JML from './medme/lib/jmlib';
import { ConferenceSock } from "./medme/lib/sock";
export default lib;
var ConferenceModifyAPI = lib.ConferenceModifyAPI;
var ConferenceAccessAPI = lib.ConferenceAccessAPI;
export { lib, ConferenceModifyAPI, ConferenceAccessAPI, env, request, statuses, types, sock, UX, JML };
export var conferenceModifyAPI;
export var conferenceAccessAPI;
export var conferenceWebSocketAPI;
export function initHttpAPI() {
    conferenceModifyAPI = lib.ConferenceModifyAPI.createHttpAPI(env.CONFERENCE_ENDPOINT);
    conferenceAccessAPI = lib.ConferenceAccessAPI.createHttpAPI(env.CONFERENCE_ENDPOINT);
}
export function initWebSocketAPI() {
    conferenceWebSocketAPI = new ConferenceSock(env.CONFERENCE_WS_ENDPOINT);
}
//# sourceMappingURL=index.js.map