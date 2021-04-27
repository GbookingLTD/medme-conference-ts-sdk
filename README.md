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
wget  https://github.com/GbookingLTD/medme-conference-ts-sdk/archive/refs/tags/v1.0.1.tar.gz -O mmconf-ts-sdk-v1.0.tar.gz
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

## Использование

Перед использованием `API` выполните метод `initHttpAPI()`, а так же `initWebSocketAPI`, 
если необходимо получать изменения от сервера.

````ts
import * as MedMe from "mmconf-ts-sdk"
MedMe.initHttpAPI();
MedMe.initWebSocketAPI();
````

В случае, если вы используете MedMe Conference сервер, отличный от сервера по умолчанию, необходимо 
создать экземпляры классов и указать в конструкторе свои значения Endpoint сервера 

````ts
import * as MedMe from "mmconf-ts-sdk"

// medme conference control API
const conferenceModifyAPI = lib.ConferenceModifyAPI.createHttpAPI(env.CONFERENCE_ENDPOINT);
const conferenceAccessAPI = lib.ConferenceAccessAPI.createHttpAPI(env.CONFERENCE_ENDPOINT);

// websocket API
const conferenceWebSocketAPI = new ConferenceSock(env.CONFERENCE_WS_ENDPOINT);
````



