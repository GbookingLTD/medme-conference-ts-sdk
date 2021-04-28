import dateTimeEN from './date-time-en.json';
import textGenEN from './en-en.json';
import textMedEN from './en-medicine.json';
import dateTimeHE from './date-time-he.json';
import textGenHE from './he-he.json';
import textMedHE from './he-medicine.json';
import dateTimeRU from './date-time-ru.json';
import textGenRU from './ru-ru.json';
import textMedRU from './ru-medicine.json';
import langList from './lang-list.json';

export const l10n: any = {ru: {}, he: {}, en: {}};

l10n.en.dateTime = dateTimeEN
l10n.en.general = textGenEN
l10n.en.medicine = textMedEN
l10n.he.dateTime = dateTimeHE
l10n.he.general = textGenHE
l10n.he.medicine = textMedHE
l10n.ru.dateTime = dateTimeRU
l10n.ru.general = textGenRU
l10n.ru.medicine = textMedRU
l10n.langList = langList
