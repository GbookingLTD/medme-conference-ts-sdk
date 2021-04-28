"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.l10n = void 0;
var date_time_en_json_1 = __importDefault(require("./date-time-en.json"));
var en_en_json_1 = __importDefault(require("./en-en.json"));
var en_medicine_json_1 = __importDefault(require("./en-medicine.json"));
var date_time_he_json_1 = __importDefault(require("./date-time-he.json"));
var he_he_json_1 = __importDefault(require("./he-he.json"));
var he_medicine_json_1 = __importDefault(require("./he-medicine.json"));
var date_time_ru_json_1 = __importDefault(require("./date-time-ru.json"));
var ru_ru_json_1 = __importDefault(require("./ru-ru.json"));
var ru_medicine_json_1 = __importDefault(require("./ru-medicine.json"));
var lang_list_json_1 = __importDefault(require("./lang-list.json"));
exports.l10n = { ru: {}, he: {}, en: {} };
exports.l10n.en.dateTime = date_time_en_json_1.default;
exports.l10n.en.general = en_en_json_1.default;
exports.l10n.en.medicine = en_medicine_json_1.default;
exports.l10n.he.dateTime = date_time_he_json_1.default;
exports.l10n.he.general = he_he_json_1.default;
exports.l10n.he.medicine = he_medicine_json_1.default;
exports.l10n.ru.dateTime = date_time_ru_json_1.default;
exports.l10n.ru.general = ru_ru_json_1.default;
exports.l10n.ru.medicine = ru_medicine_json_1.default;
exports.l10n.langList = lang_list_json_1.default;
//# sourceMappingURL=index.js.map