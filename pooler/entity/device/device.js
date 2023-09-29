const Issue = require("../issue")

module.exports = class Device {
    constructor(
        id = 0,
        parent_id = 0,
        mod = null,
        e
    ) {

        this.id = id
        this.parent_id = parent_id

        if (mod) {
            this.mod = mod
        }

        var self = this

        // можно ли добавить еще соединение к прибору
        const isAddConnection = () => {
            return this.mod.max_count_conn > this.issues.length
        }

        const listener_send_issue = (initiator_device, issue) => {
            if (initiator_device.parent_id == self.id) {

                if (isAddConnection()) {
                    self.issues.push(issue)
                    if (self.parent_id) {
                        e.emit(`SEND ISSUE`, self, issue)
                    } else {
                        e.emit(`CONFIRM ISSUE`, self, issue, true)
                    }
                } else {
                    e.emit(`CONFIRM ISSUE`, self, issue, false)
                }
            }
        }

        const listener_confirm_issue = (parent_device, issue, result) => {
            if (parent_device.id == self.parent_id) {
                if (!result) {
                    self.issues.forEach((i, _issue) => {
                        if (issue.UUID == _issue.UUID) {
                            self.issues.splice(i, 1);
                        }
                    })
                }
                e.emit(`CONFIRM ISSUE`, self, issue, result)
            }
        }


        // От родителя мы получим коллбек для того чтобы ему кидать данные
        e.on(`SEND ISSUE`, listener_send_issue).on(`CONFIRM ISSUE`, listener_confirm_issue)

        const last_data_interval = setInterval(() => {
            if (!self.mod) {
                return;
            }
            self.last_data.forEach(last_data => {
                let last_date = last_data.date
                if (!last_date.nex_run) {
                    last_date.nex_run = last_date.date
                }

                // Добавляем
                if (last_date.nex_run.getTime() <= (new Date()).getTime()) {
                    last_date.nex_run.setSeconds(last_date.nex_run.getSeconds() + self.mod.parameters[last_data.parameter_ident].delay);

                    const cmd = self.mod.parameters[last_data.parameter_ident].cmd
                    let isset_issue = false
                    self.issues.forEach(issue => {
                        if (issue.Cmd == cmd) {
                            isset_issue = true
                            return
                        }
                    })
                    if (!isset_issue) {
                        self.issues.push(new Issue(self.mod.parameters[last_data.parameter_ident].cmd, [], self, e))
                    }
                }
            })
        }, 100)

        this.destroy = () => {
            e.emit(`CLOSE ${self.id}`, this)
            e.removeListener(`SEND ISSUE`, listener_send_issue)
            e.removeListener(`CONFIRM ISSUE`, listener_confirm_issue)
            clearInterval(last_data_interval);
        }

    }
    id = 0
    parent_id = 0
    mod = null
    mod_mapping = null /* Объект у которого забираем какие ли бо свойства для работы */
    // Задачи которые мы прослушиваем
    issues = []

    last_data = []

    // Маппим для того чтобы мы хранили у себя в удобном виде
    MappingLastData = (last_data, all_parameters) => {
        return {
            date: last_data.get('date'),
            parameter_ident: all_parameters.find(parameter => parameter.id == last_data.parameter_id),
        }
    }
}