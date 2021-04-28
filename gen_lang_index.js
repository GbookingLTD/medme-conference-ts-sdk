// generate medme/lang/index.ts

let lines = [];
let l10n = [];

['en', 'he', 'ru'].forEach((lang) => {    
    lines.push("import dateTime" + lang.toUpperCase() + " from './date-time-" + lang + ".json';")
    lines.push("import textGen" + lang.toUpperCase() + " from './" + lang + "-" + lang + ".json';")
    lines.push("import textMed" + lang.toUpperCase() + " from './" + lang + "-medicine.json';")
    

    l10n.push("l10n." + lang + ".dateTime = dateTime" + lang.toUpperCase() );
    l10n.push("l10n." + lang + ".general = textGen" + lang.toUpperCase() );
    l10n.push("l10n." + lang + ".medicine = textMed" + lang.toUpperCase() );

});

lines.push("import langList from './lang-list.json';\n")

lines.push("export const l10n: any = {ru: {}, he: {}, en: {}};");

l10n.push("l10n.langList = langList");

console.log(lines.join("\n") + "\n");

console.log(l10n.join("\n"));
