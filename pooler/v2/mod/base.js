const Pack = require("../entity/pack")

module.exports = {

    // Сюда сохраняются все данные по опросу. Этот та часть которая будет гонять везде
    Mod: class {

        constructor(device) {
            // device - Отсюда можем получать все данные о настройках
        }

        // Поступает команда на то какую команду надо запустить
        // Мы должны
        Created = (cmd, pull_operations) => {}
        CreatePack = (operation) => {return new Pack()}
        Pack = (pack) => {return pack}
        Send = (pack) => {return pack}
        Parse = (pack) => {return pack}
    }

}