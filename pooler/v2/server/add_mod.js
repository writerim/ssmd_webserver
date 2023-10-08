const {
    ModAdd
} = require("../../../repositories/mod")

const Emulator = require("../mod/emulator")


module.exports = {
    InitMods: () => {
        // Сначала записываем данные по модам
        ModAdd({
            ident: Emulator.Model,
            manufactures: Emulator.Manufactures,
            mark: Emulator.Mark,
            model: Emulator.Model,
            series: Emulator.Series,
            sowt_version: Emulator.SoftVersion,
            types_device: Emulator.TypeDevices,
            parameters: Emulator.TypeDevices,
            cron_parameters : Emulator.CronParameters,
            commands : Emulator.Commands,
            parameters : Emulator.Parameters,
            device_parameters : Emulator.DeviceParameters,
        })
    }
}