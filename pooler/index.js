var events = require('events');
const fs = require('fs');

const e = new events.EventEmitter();

const {
    DeviceGetAll
} = require("../repositories/device")
const Device = require("./entity/device/device")
const {
    LastDataGetAllFilter
} = require('../repositories/lastdata');
const {
    ModGetAll,
    ModAdd
} = require('../repositories/mod');
const parameters = require('./contsants/parameters');
const {
    ParameterAdd, ParameterGetAll
} = require('../repositories/parameter');
const { MappingToPooler, MappingToDB } = require('./entity/mod/mapping');

const ModDescription_ce102_r5 = {
    ModDescription
} = require(`./mods/ce102_r5.js`);
const ModDescription_emulate_converter = {
    ModDescription
} = require(`./mods/emulate_converter.js`);
const ModDescription_emulate = {
    ModDescription
} = require(`./mods/emulate.js`);

const Mods = [
    new ModDescription_ce102_r5(),
    new ModDescription_emulate(),
    new ModDescription_emulate_converter()
]

const Devices = {}
const Parameters = {}

module.exports = {
    Start: function (app) {

        // Добавить интервал
        setInterval(() => {

            Promise.all([DeviceGetAll({}), ModGetAll({}), ParameterGetAll({})]).then(res => {
                const devices = res[0]
                const mods = res[1]
                Parameters = res[2]

                devices.forEach(d => {

                    let dd
                    if (Devices[dd.id]) {
                        dd = Devices[dd.id]
                        dd.parent_id = d.get('parent_id')
                    } else {
                        dd = new Device(
                            d.get('id'),
                            d.get('parent_id'),
                            null,
                            e
                        )
                        if (dd) {
                            Devices[dd.id] = dd

                            // Ищем мод
                            const listener_mod = setInterval(() => {
                                const mod = mods.find(m => m.get('id') == d.get('mod_id'))
                                if (mod) {
                                    Mods.forEach(mods_sys => {
                                        if (mods_sys.name == mod.get('name')) {
                                            dd.mod = mods_sys
                                            dd.mod_mapping = MappingToPooler(mods_sys)
                                            clearInterval(listener_mod)
                                        }
                                    })
                                }
                            }, 100);
                        }
                    }

                    if (dd) {
                        LastDataGetAllFilter({
                                device_id: dd.id
                            }).then(last_data => dd.last_data = dd.MappingLastData(last_data, Parameters))
                            .catch((e) => {
                                console.log(e)
                            })
                    }

                })
            })

        }, 5 * 60 * 1000) // every minutes
    },


    // синхронизируем данные для сервера
    Sync: function () {
        // Отправляем все параметры которые у нас есть
        Object.keys(parameters).forEach(index => {
            ParameterAdd({
                ident: parameters[index]
            })
        })

        Mods.forEach(mod => {
            ModAdd(MappingToDB(mod)).catch(e => {
                console.log(e)
            })
        })
    }
}