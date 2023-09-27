module.exports = class Device {
    constructor(
        id = 0,
        parent_id = 0,
        mod = '',
        e
    ) {
        this.id = id
        this.parent_id = parent_id
        this.mod = mod
        this.e = e
        this.mod_obj = {
            max_count_conn: 0
        }

        var self = this
        /*
            От родительского слушаем
            UNBUSY
            CLOSE
            TIMEOUT
            ERROR
            PARSE PACK
            CONFIRM ISSUE

            от дочернего слушаем
            SET ISSUE
            CLOSE
            TIMEOUT
            ERROR
            SEND PACK
        */

        // можно ли добавить еще соединение к прибору
        const isAddConnection = () => {
            return this.mod_obj.max_count_conn > this.issues.length
        }

        const listener_send_issue = (initiator_device, issue) => {
            // console.log('Получили задачу от ' + initiator_device.id, self.id)
            if (initiator_device.parent_id == self.id) {
                // console.log('Задача для нас ' + initiator_device.id, self.id)

                if (isAddConnection()) {
                    self.issues.push(issue)
                    // console.log('Можем принять задачу ' + initiator_device.id, self.id)
                    if (self.parent_id) {
                        // console.log('Отправляем роятелю ' + initiator_device.id, self.id)
                        e.emit(`SEND ISSUE`, self, issue)
                    } else {
                        e.emit(`CONFIRM ISSUE`, self, issue, true)
                    }
                } else {
                    // console.log('Не можем принять задачу ' + initiator_device.id, self.id)
                    // console.log('Отправляем родителю ' + initiator_device.id, self.id)
                    e.emit(`CONFIRM ISSUE`, self, issue, false)
                }
            }
        }

        const listener_confirm_issue = (parent_device, issue, result) => {
            // console.log('Получили сообщение что кто обработал задачу ' + parent_device.id, self.id, result)
            if (parent_device.id == self.parent_id) {
                // console.log('Да это наш родитель ответил ' + parent_device.id, self.id, result)
                if (!result) {
                    // console.log('Удаляем задачу так как мы не можем ее принять из-за родителя ' + parent_device.id, self.id, result)
                    self.issues.forEach((i, _issue) => {
                        if (issue.UUID == _issue.UUID) {
                            self.issues.splice(i, 1);
                        }
                    })
                }
                e.emit(`CONFIRM ISSUE`, self, issue, result)
                // if(issue.Device.id == self.id){
                //     if(result){
                //         // Начинаем опрос
                //     }
                //     // return
                // }
                // console.log('Шлем что мы приняли задачу ' + parent_device.id, self.id, result)
            }
        }


        // От родителя мы получим коллбек для того чтобы ему кидать данные
        e.on(`SEND ISSUE`, listener_send_issue).on(`CONFIRM ISSUE`, listener_confirm_issue)

        this.destroy = () => {
            e.emit(`CLOSE ${this.id}`, this)
            e.removeListener(`SEND ISSUE`, listener_send_issue)
            e.removeListener(`CONFIRM ISSUE`, listener_confirm_issue)
        }

    }
    id = 0
    parent_id = 0
    mod = ''
    mod_obj = {
        max_count_conn: 0
    }
    // Задачи которые мы прослушиваем
    issues = []

    last_data = []
}