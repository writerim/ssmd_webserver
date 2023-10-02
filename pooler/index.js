var events = require('events');
const e = new events.EventEmitter();

const {
    DeviceGetAll
} = require("../repositories/device")
const Device = require("./entity/device/device")
const {
    LastDataGetAllFilter,
} = require('../repositories/lastdata');
const {
    ModGetAll,
    ModAdd
} = require('../repositories/mod');
const parameters = require('./contsants/parameters');
const {
    ParameterAdd,
    ParameterGetAll
} = require('../repositories/parameter');
const {
    MappingToDB
} = require('./entity/mod/mapping');
const { InitModEvents } = require('./event_mod');
const LastData = require('../entity/lastdata');

const Parameters = {}

module.exports = {
    Start: function (app) {

        setInterval(() => {

            Promise.all([DeviceGetAll({}), ModGetAll({}), ParameterGetAll({})]).then(res => {
                const devices = res[0]
                const mods = res[1]
                Parameters = res[2]

                devices.forEach(d => {

                    let dd = new Device(
                        d.get('id'),
                        d.get('parent_id'),
                        null,
                        e
                    )
                    if (dd) {
                        const mod = mods.find(m => m.get('id') == d.get('mod_id'))
                        if (mod) {
                            let init_mod_event = InitModEvents(mod.get('ident'), dd, e)
                            if(!init_mod_event){
                                LastDataGetAllFilter({
                                    device_id: dd.id
                                }).then(last_data => {
                                    let l = new LastData(last_data, dd, Parameters, init_mod_event, e)
                                    if(l){
                                        dd.last_data.push(l)
                                    }
                                })
                                .catch((e) => {
                                    console.log(e)
                                })
                            }
                        }
                    }
                })
            })

        }, 5 * 60 * 1000) // every 5 minutes
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