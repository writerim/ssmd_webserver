// const ModDescription_ce102_r5 = {
//     EvetMod
// } = require(`./ce102_r5.js`);
const ModDescription_emulate_converter = {
    EvetMod
} = require(`./emulate_converter.js`);
const ModDescription_emulate = {
    EvetMod
} = require(`./emulate.js`);

// Тут инициализируем все модели слушатели
module.exports = {
    InitModEvents: (mod_ident, device, e) => {
        switch (mod_ident) {
            // case 'ce102_r5':
            //     return new ModDescription_ce102_r5(device, e);
            case 'emulate_converter':
                return new ModDescription_emulate_converter(e, device);
            case 'emulate_converter':
                return new ModDescription_emulate(e, device);

            default:
                throw new Error(`${mod_ident}: mod not found`)
        }
    }
}