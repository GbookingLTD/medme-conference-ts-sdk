#!/usr/bin/env node

/*
Создание тестовой конференции с 1-м клиентом и 1-специалистом

[тут статус конференции должен быть pending]

Открываем конференцию для записи.

[тут статус конференции должен быть open_for_join]

жмем ввод
присоединяемся клиентом

жмем ввод
присоединяемся специалистом

[тут статус конференции должен быть started]

 */

const express = require('express')
const readline = require('readline')

//import * as MedMe from 'medme-conference-ts-sdk'
const MedMe = require('..//dist/cjs/index')

const confInfo = {
    appointmentId: process.env.APPOINTMENT_ID || "1",
    appointmentEngine: "GBooking",
    appointmentData: {
        businessId: "4000000007261"
    },
    openingDurationSeconds: 0,
    otp: false,
    specialists: [{
        id: '1',
        name: 'Иван',
        middleName: 'Григорьевич',
        surname: 'Шпак',
        profession: 'Педиатр',
        required: true
    }],
    clients: [{
        id: '2',
        name: 'Анна',
        middleName: 'Александровна',
        surname: 'Язь'
    }],
    services: [{
        id: "1",
        name: [{
            lang: MedMe.types.conference.LanguageListEnum.RU_RU,
            text: "Педиатр, Первичный прием"
        }, {
            lang: MedMe.types.conference.LanguageListEnum.EN_US,
            text: "Paediatrician"
        }]
    }],
    filialInfo: {
        id: "1",
        title: "Полянка, 300",
        timezone: "Europe/Moscow"
    },
    organizationInfo: {
        id: "1",
        title: "Клиника Ромашка",
    },
    autoStart: true,
    scheduledStart: new Date(Date.parse("2019-07-10T18:45:00.000Z")),
    scheduledDurationSeconds: 1800, // 30 minutes
    l10n: MedMe.types.conference.LanguageListEnum.RU_RU,
    isOpen: false,
    callbackType: 'web_hook',
    webHookUrl: 'http://127.0.0.1:3002/callback'
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

(async function() {
    let server;
    try {
        const ret = await runServer(3002)
        server = ret.server;
        await main()

        // wait 2 seconds for web hook calls
        setTimeout(() =>
            server.close(), 2000);
    } catch (err) {
        console.error(err)
        if (server)
            server.close();
        rl.close();
    }
})()

const tokens = [];

async function main() {
    MedMe.initHttpAPI()

    const role = MedMe.types.conference.ConferenceRolesEnum.Specialist
    const confRes = await MedMe.conferenceModifyAPI.create(MedMe.env.APIKEY, '1', role, confInfo)
    await MedMe.conferenceAccessAPI.openForJoin(confRes.access_token);

    await waitUntilPressAnyKey();

    for (let i = 0; i < tokens.length; ++i) {
        if (confRes.access_token === tokens[i].accessToken)
            continue;
        console.info('JOIN A ' + tokens[i].userRole + ' #' + i);
        await MedMe.conferenceAccessAPI.join(tokens[i].accessToken);
    }

    const newConfRes = await MedMe.conferenceAccessAPI.getConferenceInfo(confRes.access_token);
    console.info('NEW CONFERENCE STATUS', newConfRes.conference_info.status);

    await waitUntilPressAnyKey();

    rl.close()
}

async function waitUntilPressAnyKey() {
    return new Promise((resolve) =>
        rl.question('Press any key to continue...\n', () => resolve())
    )
}

async function runServer(port) {
    app = express()
    app.get('/callback', function(req, res) {
        console.info('--> [' + new Date(Date.now()).toISOString() + '] CALLBACK', req.path)
        console.info('    user_id', req.query.user_id)
        console.info('    user_role', req.query.user_role)
        console.info('    access_token', req.query.at)


        tokens.push({
            userId: req.query.user_id,
            userRole: req.query.user_role,
            accessToken: req.query.at
        })

        res.status(200)
        res.send('OK');
    })

    return new Promise((resolve) => {
            const server = app.listen(port, () => {
                console.info(`listening at port ${port}`)
                resolve({app, server})
            })
        })
}

