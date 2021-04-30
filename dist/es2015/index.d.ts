/// <amd-module name="MedMe" />
import * as lib from './medme/lib/index';
import * as env from './medme/env';
import * as request from './medme/lib/httpRequest';
import * as statuses from './medme/lib/statuses';
import * as types from './medme/lib/types/index';
import * as sock from './medme/lib/sock';
import * as UX from './medme/lib/ux';
import * as JML from './medme/lib/jmlib';
export default lib;
import ConferenceModifyAPI = lib.ConferenceModifyAPI;
import ConferenceAccessAPI = lib.ConferenceAccessAPI;
export { lib, ConferenceModifyAPI, ConferenceAccessAPI, env, request, statuses, types, sock, UX, JML };
export declare let conferenceModifyAPI: ConferenceModifyAPI;
export declare let conferenceAccessAPI: ConferenceAccessAPI;
export declare let conferenceWebSocketAPI: sock.ConferenceSock;
export declare function initHttpAPI(): void;
export declare function initWebSocketAPI(): void;
