const {
    ModAdd
} = require("../../../repositories/mod");
const emulator_ce301 = require("../mod/emulator_ce301");
const emulator_snr = require("../mod/emulator_snr");

var env = process.env.NODE_ENV.trim() || 'production';

const mapper = (mod) => {
    if(mod.Env != env){
        return {}
    }
    return {
        ident: mod.Ident,
        version: mod.Version,
        manufactures: mod.Manufactures,
        mark: mod.Mark,
        model: mod.Model,
        series: mod.Series,
        sowt_version: mod.SoftVersion,
        types_device: mod.TypeDevices,
        parameters: mod.TypeDevices,
        cron_parameters : mod.CronParameters,
        commands : mod.Commands,
        parameters : mod.Parameters,
        device_parameters : mod.DeviceParameters,
    }
}

module.exports = {
    InitMods: () => {
        // Сначала записываем данные по модам
        [emulator_ce301, emulator_snr].forEach(m => {
            ModAdd(mapper(m))
        })
    }
}