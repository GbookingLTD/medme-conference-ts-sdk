/// <amd-module name="MedMe" />
import * as lib from './medme/lib/index';
import * as env from './medme/env';
import * as request from './medme/lib/httpRequest';
import * as statuses from './medme/lib/statuses';
import * as types from './medme/lib/types/index';
import * as ux from './medme/lib/ux';
export default lib;
export { env, request, statuses, types, ux };
export declare let conferenceModifyAPI: lib.ConferenceModifyAPI;
export declare let conferenceAccessAPI: lib.ConferenceAccessAPI;
export declare function initHttpAPI(): void;
