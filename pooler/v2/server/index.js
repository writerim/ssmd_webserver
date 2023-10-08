const { DeviceGetAll } = require("../../../repositories/device");
const { LastDataGetAll } = require("../../../repositories/lastdata");
const { ModGetAll } = require("../../../repositories/mod");
const { ParameterGetAll } = require("../../../repositories/parameter");
const { ADD_LAST_DATA, ADD_DEVICE, ADD_PARAMETER, ADD_MOD } = require("../constants/commands");
const Device = require("../entity/device");
const LastData = require("../entity/last_data");
const Mod = require("../entity/mod");
const Parameter = require("../entity/parameter");
const { InitMods } = require("./add_mod");

module.exports = {
    Start : (e) => {

        InitMods()

        // Получаем все последние данные
        LastDataGetAll({}).then(res => {
            res.forEach(last_data => {
                new LastData(last_data.dataValues, e)
            });
        })
        e.on(ADD_LAST_DATA, (data)=>{
            new LastData(data.dataValues, e)
        })
        
        
        // Получаем все устройства
        DeviceGetAll({}).then(res => {
            res.forEach(device => {
                new Device(device.dataValues, e)
            })
        })
        e.on(ADD_DEVICE, (data)=>{
            new Device(data.dataValues, e)
        })


        ParameterGetAll({}).then(res => {
            res.forEach(parameter => {
                new Parameter(parameter.dataValues, e)
            })
        })
        e.on(ADD_PARAMETER, (data)=>{
            new Parameter(data.dataValues, e)
        })


        ModGetAll({}).then(res => {
            res.forEach(mod => {
                new Mod(mod.dataValues, e)
            })
        })
        e.on(ADD_MOD, (data)=>{
            new Mod(data.dataValues, e)
        })

    }
}