#!/usr/bin/env node

/*
Создание тестовой конференции с 2-мя клиентами и 2-мя специалистами
 */

const express = require('express')

//import * as MedMe from 'medme-conference-ts-sdk'
const MedMe = require('../dist/cjs/index')

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
    }, {
        id: '2',
        name: 'Семен',
        middleName: 'Витальевич',
        surname: 'Кол',
        profession: 'Проктолог',
        required: true
    }],
    clients: [{
        id: '3',
        name: 'Анна',
        middleName: 'Александровна',
        surname: 'Язь'
    }, {
        id: '4',
        name: 'Николай',
        middleName: 'Петрович',
        surname: 'Синицын'
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
    }, {
        id: "2",
        name: [{
            lang: MedMe.types.conference.LanguageListEnum.RU_RU,
            text: "Проктолог, Первичный осмотр"
        }, {
            lang: MedMe.types.conference.LanguageListEnum.EN_US,
            text: "Proctologist"
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
    scheduledStart: new Date(Date.parse("2020-07-10T18:45:00.000Z")),
    scheduledDurationSeconds: 1800, // 30 minutes
    l10n: MedMe.types.conference.LanguageListEnum.RU_RU,
    isOpen: false,
    callbackType: 'web_hook',
    webHookUrl: 'http://127.0.0.1:3002/callback'
};



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
    }
})()

async function main() {
    MedMe.initHttpAPI()

    const role = MedMe.types.conference.ConferenceRolesEnum.Client
    MedMe.conferenceModifyAPI.create(MedMe.env.APIKEY, '3', role, confInfo)
}

async function runServer(port) {
    app = express()
    app.get('/callback', function(req, res) {
        console.info('--> [' + new Date(Date.now()).toISOString() + '] CALLBACK', req.path)
        console.info('    user_id', req.query.user_id)
        console.info('    user_role', req.query.user_role)
        console.info('    access_token', req.query.at)

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

