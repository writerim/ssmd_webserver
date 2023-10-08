const { Mod } = require("./base")

module.exports = {

    // по идентификатору мы будем понимать какой мод нам нужен для работы
    Ident: "emulator",

    Name: "",
    Manufactures: "",
    Model: "",
    Mark: "",
    Series: "",
    SoftVersion: "",

    // Версия нужна для внутреннего пользования. Не обязательная, но заложена на будущее
    Version: "0.0.1",

    // Какие параметры считываем по крону
    // Сюда пишем как часто надо опрашивать какие параметры
    CronParameters: [{
        ident: "GET_DATA",
        delay: 60 * 60,
        cmd: "GET_DATA"
    }],

    // прочие параметры которые можно прочитать, записать
    Parameters: [],

    // Какие команды поддерживает устройство
    Commands: [{
        ident: "GET_DATA",
        description: "Получение данных",
        args: []
    }],

    // Разные настройки таймингов
    TimeSettings: [],

    // Данные устройства, которые должен настроить клиент
    DeviceParameters: [{
        ident: "num485",
        // ...
    }],

    // Какие это типы устройств
    TypeDevices : [],

    Mod: class extends Mod{

        constructor(device) {
            // device - Отсюда можем получать все данные о настройках
        }

        // Поступает команда на то какую команду надо запустить
        // Мы должны
        Created = (cmd) => {}
        CreatePack = (operation) => {}
        Pack = (pack) => {}
        Send = (pack) => {}
        Parse = (pack) => {}
    }

}