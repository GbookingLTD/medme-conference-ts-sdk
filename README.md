# MedMe Conference Typescript SDK

## Описание

MedMe Conference предоставляет возможность создания, управления телеконференцией, управления доступом к ней,
взаимодействия с системами онлайн-бронирования. 

Данный SDK включает в себя работу с сервером MedMe Conference и бизнес логику, расположенную на стороне 
клиентского приложения.

MedMe Conference имеет следующий функционал:
* Создание конференции
* Отмена конференции
* Завершение конференции
* Получение данных о конференции
* Управление состоянием конференции  
* Получение изменений состояния конференции

MedMe Conference SDK предполагает работу с сервером как через HTTP протокол, так и через вызовы функций 
в среде выполнения nodejs.

[Описание запросов API в формате OpenAPI](https://gbookingltd.github.io/medme-conference-ts-sdk/). 

[Тестовое приложение](examples/app/).

Доступ к тестовому приложению можно получить 

https://gbookingltd.github.io/medme-conference-ts-sdk/examples/app/public/index.html?at=__AccessToken__

__AccessToken__ - ключ доступа, возвращаемый для каждого пользователя при создании конференции.

Получить его можно с помощью скриптов в директории [examples/](examples/) или через 
тестовый [виджет онлайн записи](https://widget.med.me/?BUSINESS_ID=4000000007150).

## Начало работы

Есть несколько вариантов получения MedMe Conference SDK

1. Вставить в HTML ссылку через тег `script`

````html
<script src="https://unpkg.com/@medme/mmconf-ts-sdk@1.0.1/mmconf.min.js"></script>
````

2. Клонировать этот репозиторий 

````bash
git clone https://github.com/GbookingLTD/1.0.1/medme-conference-ts-sdk.git
````

3. Скачать архив исходного кода и разархивировать

````bash
wget  https://github.com/GbookingLTD/medme-conference-ts-sdk/archive/refs/tags/v1.0.1.tar.gz -O mmconf-ts-sdk-v1.0.1.tar.gz
tar -xzvf mmconf-ts-sdk-v1.0.1.tar.gz
````

4. Использовать npm или yarn

````bash
npm i @medme/mmconf-ts-sdk@1.0.1
````

````bash
yarn add @medme/mmconf-ts-sdk@1.0.1
````

Используйте в примерах выше нужный вам номер версии.

## Сборка

0. Установите typescript и webpack

````bash
npm i typescript --save-dev
sudo npm i -g webpack webpack-cli 
````

1. Настройте окружение в файле `medme/env.ts`
2. Выполните `make build` для сборки SDK

## Инициализация

Перед использованием `API` выполните метод `initHttpAPI()`, а так же `initWebSocketAPI`, 
если необходимо получать изменения от сервера.

````ts
import mmconf from "@medme/mmconf-ts-sdk"
mmconf.initHttpAPI();
mmconf.initWebSocketAPI();
````

В случае, если вы используете MedMe Conference сервер, отличный от сервера по умолчанию, необходимо 
создать экземпляры классов и указать в конструкторе свои значения Endpoint сервера 

````ts
import * as mmconf from "@medme/mmconf-ts-sdk"

// medme conference control API
const conferenceModifyAPI = mmconf.ConferenceModifyAPI.createHttpAPI(CONFERENCE_ENDPOINT);
const conferenceAccessAPI = mmconf.ConferenceAccessAPI.createHttpAPI(CONFERENCE_ENDPOINT);

// websocket API
const conferenceWebSocketAPI = new mmconf.ConferenceSock(CONFERENCE_WS_ENDPOINT);
````

## Создание конференции

````js
var confRes = conferenceModifyAPI.create('[:: SEcRet Ap1keY ::]', user_id, user_role, conf_info);
````

Для создания конференции необходимо в качестве первого параметра передать приватный ключ API.

Данный метод необходимо вызывать на стороне сервера, например, при создании приема или при подтверждении бронирования.

В результате метод вернет ключ доступа `confRes.accessToken`. Данный ключ нужно сохранить для доступа к конференции.

Ключ доступа генерируется индивидуально для каждого пользователя и может быть "зашит" в короткую ссылку.

В качестве 2-го и 3-го параметров используются идентификатор пользователя создающего конференцию и его роль. 
Данные пользователя передаются в данных конференции.

В качестве червертого параметра передаются данные конференции.

Примеры использования метода создания конференции смотрите в примерах:

* [examples/conf_a.js](./examples/conf_a.js)
* [examples/conf_b.js](./examples/conf_b.js)
* [examples/conf_c.js](./examples/conf_c.js)

В случае возникновения ошибки возникнет исключение `APIError`. Примеры обработки ошибки смотрите 
в тестах [tests/index.ts](./tests/index.ts).

## Обмен ключей (опционально)

Обмен ключей выполняется в методе `MedMe.UX.createScreen`, поэтому, если вы используете последний, то 
нет необходимости вызывать его. Использование метода `MedMe.UX.createScreen` является предпочтительным.

При переходе пользователя на конференцию происходит проверка ключа доступа (`access_token`).

Для этого используется следующий метод:

````js
const confToken = await conferenceAccessAPI.exchange(access_token);
````

Если ключ доступа не совпадает, то метод выкинет исключение соответствующее 401 ошибке.

В случае успешной проверки будет предоставлен ключ конференции (`conference_token`).

Этот код неодходим для открытия начатой конференции.

В случае, если конференция начата, то при вызове метода `MedMe.UX.createScreen` ключ конференции 
вернется в поле `conferenceToken`.

## Создание страницы конференции

В зависимости от статуса конференции нужно отображать тот или иной экран. Для получения данных для
отображения на экране в зависимости от статуса конференции использкется метод `MedMe.UX.createScreen`:

````js
MedMe.UX.createScreen(conferenceAccessAPI, accessToken).then((uxScreen) => {

    // render screen

});
````

В качестве первого параметра метод принимает экземпляр класса `MedMe.ConferenceAccessAPI`, созданный с помощью
`MedMe.initHttpAPI` или `MedMe.ConferenceAccessAPI.createHttpAPI`.

В качестве второго параметра метод принимает ключ доступа, полученный при создании конференции. 

## Роутинг

Метод `MedMe.UX.createScreen` возвращает прамис с экземпляром класса `ScreenType`.

Данный класс имеет поле `name`, в котором указана страница для отображения. Это поле перечислимого типа `MedMe.UX.ScreenEnum`.

При отображении страницы необходимо выбрать какую страницу отображать основываясь на этом поле.

Ниже приведен пример такого роутинга.

````js
MedMe.UX.createScreen(conferenceAccessAPI, accessToken).then((uxScreen) => {
    
    // ...

    if (uxScreen.name === UX.ScreenEnum._4xx) {
        // отображаем страницу 4xx
    }

    if (uxScreen.name === UX.ScreenEnum.PendingClient) {
        // встреча еще не открыта
        // для клиента показываем сообщение "встреча еще не начата"
    }

    if (uxScreen.name === UX.ScreenEnum.PendingSpecialist) {
        // встреча еще не открыта
        // для специалиста показываем сообщение "приём еще не открыт" и кнопку открыть
    }

    if (uxScreen.name === UX.ScreenEnum.JoinClient) {
        // встреча открыта для присоединения и текущий пользователь - клиент
    }

    if (uxScreen.name === UX.ScreenEnum.JoinSpecialist) {
        // встреча открыта для присоединения и текущий пользователь - специалист
    }

    if (uxScreen.name === UX.ScreenEnum.Cancelled) {
        // конференция отменена
    }

    if (uxScreen.name === UX.ScreenEnum.Finish) {
        // конференция закончена
    }

    if (uxScreen.name === UX.ScreenEnum.Started) {
        // открыть экран конференции
    }

    // показать сообщение о некоректном статусе конференции
});
````

## Открытие конференции

В случае, когда конференция начата (`uxScreen.name === UX.ScreenEnum.Started`) необходимо отобразить экран самой конференции.

Пример вызова метода `openConference`.

````js
const confConfig = {
    lang: 'ru', // 'en', 'he'
    onJoined: function() {
        // some code when current user joined
    },
    onLeft: function() {
        // some code when current user left
    }
};

const vertical = 'medicine'; // 'general';
MedMe.UX.initConfConfigL10n(confConfig, vertical);
MedMe.UX.openConference(conferenceAccessAPI, uxScreen,  confConfig);
````

Параметр `uxScreen` содержит данные для отображения страницы конференции.

Параметр `confConfig` настраивает расположение конференции. 

Метод `MedMe.UX.initConfConfigL10n` устанавливает текстовые переменные в соответствии с локализацией и 
переданной вертикалью.

## Отображение таймера

Для инициализации таймера используйте метод `MedMe.UX.timer`:

````js
const timer1 = MedMe.UX.timer(uxScreen.confInfo, uxScreen.timerBlock)
````

После чего нужно повесить его на `setTimeout`:

````js
let _runTimer;
const tick = function() {
    cur = timer1.updateTime();
    if (cur.totalRemainSeconds === 0)
        // goodbye()
    else {
        // renderTime();
        _runTimer();
    }
};

_runTimer = function() {
    setTimeout(tick, cur.timerDelay);
}

tick();
````

Объект таймера содержит 2 метода:
* updateTime
* getCurrent

Метод `updateTime` пересчитывает оставшееся время до завершения конференции.
Метод `getCurrent` возвращает текущее значение оставшегося времени до завершения конференции в следующем формате:

````ts
{
    hours: number,
    minutes: number,
    seconds: number,
    timerDelay: number,
    totalRemainSeconds: number,
}
````

## Получение событий по websocket

Предварительно сообщите о домене, на котором будет запускаться клиентское приложение.

Для получения событий по веб сокету необходимо выполнить инициализацию соответствуюшего API:

````js
MedMe.initWebSocketAPI()
````

или с использованием websocket сервера, отличного от установленного по умолчанию

````js
const conferenceWebSocketAPI = new ConferenceSock(env.CONFERENCE_WS_ENDPOINT);
````

После этого нужно подписаться на события изменения состояния конференции и установить соединение:

````js
MedMe.conferenceWebSocketAPI.changeConferenceStatusCallback(function onChangeConferenceStatus(newStatus) {
    console.info('[%s] ConferenceWS', (new Date).toISOString(), this.at_, 'CHANGE_STATUS_CALLBACK', newStatus)
    location.reload();
});

MedMe.conferenceWebSocketAPI.changeConferenceInfoCallback(function onChangeConferenceInfo() {
    console.info('[%s] ConferenceWS', (new Date).toISOString(), this.at_, 'CHANGE_INFO_CALLBACK')
    
    // показать сообщение в неблокирующем режиме 
    // "Данные конференции были измены. Пожалуйста, обновите страницу"

});

MedMe.conferenceWebSocketAPI.connect(accessToken);
````



