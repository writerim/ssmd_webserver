module.exports = class Operation {
    constructor(
        prev_opertaion, // оперейшн перед которым надо вставить
        device, // Устройство, для которого создаем оперейшн
        parent, // Это нам нужно когда оперейшна будет работать для передачи выше
        children, // Это нам нужно когда оперейшн будет разбиать пакет для передачи ниже
        issue_uuid, // Задача на которую будем вешаться
        command, // С какой командой будем выполняться
        mod,
        e
    ) {

        if (opertaion) {
            this.priority = opertaion.priority
            opertaion.priority -= 1
        }

        var self = this

        const e_done_prev_operaion = `DELETE:operation:${opertaion.uuid}`


        // Создание пакета для отправки и передача его родителю если он есть
        // Или передача себе же если родителя нет
        const on_done_prev_operaion = () => {
            const created_pack = self.device.mod_obj.Created(pack)
            self.next_opertaion.Sender(created_pack)
        }
        e.once(e_done_prev_operaion, on_done_prev_operaion)

        this.opertaion = opertaion
        this.device = device
        this.parent = parent
        this.children = children
        this.issue_uuid = issue_uuid
        this.command = command

        this.destroy = () => {

        }
    }

    priority = 0
    opertaion = null
    device_id = null
    command = null
    uuid = null
    Listener = (pack) => {
        // Сначала отдаем бибилиотеке
        // Затем спускаем ниже
        if (this.parent) {
            pack = this.parent.mod_obj.Listener(pack)
        } else {
            pack = this.device.mod_obj.Listener(pack)
        }
        this.opertaion.Listener(pack)
    }
    Sender = (pack) => {
        // Сначала отдаем бибилиотеке
        // Затем поднимаем выше
        pack = this.mod.Sender(pack)
        if (this.parent) {
            pack = this.parent.mod_obj.Listener(pack)
        } else {
            pack = this.device.mod_obj.Listener(pack)
        }
        this.opertaion.Listener(pack)
    }
}