const Issue = require("../issue")

module.exports = class LastData {
    constructor(last_data_src, device, parameters, mod_event, e) {

        let parameter = parameters.find(param => param.id == last_data_src.parameter_id)
        if(!parameter){
            throw new Error(`last_data not created. param ${last_data_src.parameter_id} not found`)
        }

        const intervalLoop = () => {
            let last_date = last_data_src.date
            if (!last_date.nex_run) {
                last_date.nex_run = last_date.date
            }

            // Добавляем
            if (last_date.nex_run.getTime() <= (new Date()).getTime()) {

                const cmd = self.mod.parameters[last_data_src.parameter_ident].cmd// TODO device
                let isset_issue = false
                device.issues.forEach(issue => {
                    if (issue.Cmd == cmd) {
                        isset_issue = true
                        return
                    }
                })
                if (!isset_issue) {
                    self.issues.push(new Issue(self.mod.parameters[last_data_src.parameter_ident].cmd, [ /* Сюда аргументы */ ], device, e))
                }
            }
        }

        this.destroy = () => {
            clearInterval(intervalLoop)
        }
        
        // Последние данные должны умереть если устройство сказало умереть
        e.on(`DESTROY LAST_DATA`, (device) => {

        })

    }
}