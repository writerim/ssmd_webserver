const { GET_DEVICE_TREE } = require("../../constants/commands")

module.exports = class Issue {
    constructor(data = {
        uuid: '',
        cmd: '',
        args: [],
        device_id: 0,
        delay_sec : 10 // По умолчанию даем задаче молчать 10 сек
    }, e) {

        if(!uuid){
            throw new Error(`is uuid :${uuid}: invalid`)
        }
        if(!cmd){
            throw new Error(`is cmd :${cmd}: invalid`)
        }
        if(!device_id){
            throw new Error(`is device :${device_id}: invalid`)
        }
        // Нельзя сделать задачу которая умрет за сек или за минус времени
        if(!delay_sec){
            throw new Error(`is delay_sec :${delay_sec}: invalid`)
        }

        var self = this

        this.data = data
        this.last_up = new Date()

        const l_get_device_tree = `${GET_DEVICE_TREE}${device_id}`

        const e_update_uuid = `UPDATE:${self.data.uuid}`
        const e_close_uuid = `CLOSE:${self.data.uuid}`
        const e_send_issue = `SEND ISSUE ${device_id}`

        // Начало опроса
        this.start = () => {
            e.listeners(l_get_device_tree).forEach(l_tree_devices => {
                const devices = l_tree_devices()
                devices.forEach(device => {
                    new device.mod_event(e)
                })
                e.emit(e_send_issue, self)
            })
        }

        // Обновляем когда последний раз были какие то движения по задаче
        const on_update_uuid = ()=>{
            self.last_up = new Date()
        }
        const on_close_uuid = ()=>{
            self.last_up = new Date()
        }

        e.on(e_update_uuid, on_update_uuid)
        e.on(e_close_uuid, on_close_uuid)

        // Проверяем что задача не умерла. Если умерла, то убиваем
        const l_update_uuid = setInterval(() => {
            const t = new Date()
            if(t.getTime() - self.last_up.getTime() >= self.delay_sec * 1000){
                self.destroy()
            }
        }, 100)

        this.destroy = () => {
            self.data = undefined
            self.last_up = undefined

            e.removeListener(e_update_uuid, on_update_uuid)
            e.removeListener(e_close_uuid, on_close_uuid)
            clearInterval(l_update_uuid)
        }
    }

    data = {}
    last_up = new Date()
}