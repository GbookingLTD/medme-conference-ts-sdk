/// <amd-module name="MedMe" />
import * as lib from './medme/lib/index';
import * as env from './medme/env';
import * as request from './medme/lib/httpRequest';
import * as statuses from './medme/lib/statuses';
import * as types from './medme/lib/types/index';
import * as sock from './medme/lib/sock';
import * as UX from './medme/lib/ux';
export default lib;
export { env, request, statuses, types, sock, UX };
export declare let conferenceModifyAPI: lib.ConferenceModifyAPI;
export declare let conferenceAccessAPI: lib.ConferenceAccessAPI;
export declare let conferenceWebSocketAPI: sock.ConferenceSock;
export declare function initHttpAPI(): void;
export declare function initWebSocketAPI(): void;
