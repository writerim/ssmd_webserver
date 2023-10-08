const {
    CLOSE,
    UPDATE,
    DROP_DEVICE
} = require("../../constants/commands")

module.exports = class Issue {
    constructor(data = {
        uuid: '',
        parameter: null, // какой параметр мы хотим опросить
        device: null,
        context_deadline_sec: 30 // Если в течении этого времени задача не обновлялась, то убиваем ее
        // Беерем из расчета 30 сек по умолчению
    }, e) {

        if (!data.uuid) {
            throw new Error(`is uuid invalid`)
        }
        if (!data.device) {
            throw new Error(`is device_id invalid`)
        }
        // Нельзя сделать задачу которая умрет за сек или за минус времени
        if (!data.context_deadline_sec) {
            throw new Error(`is context_deadline_sec invalid`)
        }

        var self = this

        this.data = data
        this.last_up = new Date()

        const e_update_uuid = `${UPDATE}${self.data.uuid}`
        const e_close_uuid = `${CLOSE}${self.data.uuid}`
        const e_drop_device = `${DROP_DEVICE}${data.device.id}`

        const l_get_tree_device = `${GET_DEVICE_TREE}${data.device.id}`

        // Обновляем когда последний раз были какие то движения по задаче
        const on_update_uuid = () => {
            self.last_up = new Date()
        }
        const on_close_uuid = () => {
            self.destroy()
        }
        const on_drop_device = () => {
            self.destroy()
        }

        e.on(e_update_uuid, on_update_uuid)
        e.on(e_close_uuid, on_close_uuid)
        e.on(e_drop_device, on_drop_device)

        // Проверяем что задача не умерла. Если умерла, то убиваем
        const l_update_uuid = setInterval(() => {
            const t = new Date()
            if (t.getTime() - self.last_up.getTime() >= self.context_deadline_sec * 1000) {
                self.destroy()
            }
        }, 100)

        this.destroy = () => {
            self.data = undefined
            self.last_up = undefined
            self.operations = undefined

            e.removeListener(e_update_uuid, on_update_uuid)
            e.removeListener(e_close_uuid, on_close_uuid)
            e.removeListener(e_drop_device, on_drop_device)
            clearInterval(l_update_uuid)

            e.emit(e_close_uuid)
        }


        let devices = []
        e.listeners(l_get_tree_device).forEach(l_devices => {
            devices = l_devices()
        })

        if (devices.length) self.destroy()

        devices.forEach(device => {
            // Собираем операции
            let mod = device.mod
            let cmd = mod.Parameters[parameter.ident]
            self.mods[device.id] = new mod.Mod(device)
            self.mods[device.id].Created(cmd, self.operations)
        });

        // Собрали оперейшены
        this.operations.forEach((operation, index) => {
            if(self.panic) return
            // Начинаем с того устройства которое отдало его
            // Получим сначала устройство, потом его мод
            const device = operation.device
            const l_get_tree_device_oper = `${GET_DEVICE_TREE}${device.id}`

            let pack = self.mods[device.id].CreatePack(operation)

            let parents = []
            e.listeners(l_get_tree_device_oper).forEach(l_devices => {
                parents = l_devices()
            })
            // Если каким то образом нету родителя, то начинаем экстренно все чистить и 
            // дропать задачу
            if (!parents.length && device.parent_id) {
                self.panic = true
                return
            }

            // Подписываемся что если поменяли данные в пакете то мы время задачи
            const l_pack_update = () => self.last_up = new Date()
            const e_pack_update = `${UPDATE}${pack.uuid}`
            e.on(e_pack_update, l_pack_update)

            let final_parent = null
            parents.forEach(parent => {
                self.mods[parent.id].Pack(pack)
                final_parent = parent
            })

            pack = self.mods[final_parent.id].mod.Send(pack)

            parents.reverse()

            parents.forEach(device => {
                if (operation.device.id == device.id) return
                pack = self.mods[device.id].Parse(pack)
            })

            e.removeListener(e_pack_update, l_pack_update)
            delete operation[index]
        });

        // Нельзя зыпускать до образования оперейшинов, так как задача может удалиться еще до создания оперейшна
        const l_clean_operations = setInterval(() => {
            if (self.operations.length && self.panic) {
                self.operations.forEach(op => {
                    op.destroy()
                })
            }
            if (!self.operations.length) {
                self.destroy()
                clearInterval(l_clean_operations)
            }
            // Надо ли дестроить?
            self.mods = undefined
            
        }, 100)
    }

    SetOperation = (operation) => {
        this.operations.push(operation)
    }

    data = {}
    last_up = new Date()
    context_deadline_sec = 0
    operations = []
    panic = false
    mods = {}
}