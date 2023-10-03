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
            }else{
                // run issue
                // send pack
                // parse pack
            }
        }

        // От родителя мы получим коллбек для того чтобы ему кидать данные
        e.on(`SEND ISSUE`, listener_send_issue).on(`CONFIRM ISSUE`, listener_confirm_issue)


        this.destroy = () => {
            e.emit(`CLOSE ${self.id}`, self)
            e.removeListener(`SEND ISSUE`, listener_send_issue)
            e.removeListener(`CONFIRM ISSUE`, listener_confirm_issue)
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

        let parameter = all_parameters.find(parameter => parameter.id == last_data.parameter_id)
        if(!parameter){
            return null
        }

        return {
            date: last_data.get('date'),
            parameter_ident: parameter.get('itent'),
            nex_run : last_data.get('date')
        }
    }
}