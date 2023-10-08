const crypto = require('crypto');
const {
    UPDATE_DEVICE,
    DELETE_DEVICE,
    UPDATE_LAST_DATA,
    DELETE_LAST_DATA,
    GET_LAST_DATA,
    GET_DEVICE_TREE,
    DROP_ISSUES,
    SET_ISSUE,
    GET_DEVICE,
    GET_PARAMETER,
    ADD_LAST_DATA_DEVICE
} = require('../../constants/commands');
const Issue = require('../issue');

module.exports = class LastData {
    constructor(data, e) {

        var self = this

        // validate_data
        if (!data.id) {
            return
        }
        if (!data.device_id) {
            return
        }
        if (!data.paramter_id) {
            return
        }
        if (!data.mod_id) {
            return
        }

        this.data = data

        // event_loop
        const e_update_device = `${UPDATE_DEVICE}${data.device_id}`
        const e_delete_device = `${DELETE_DEVICE}${data.device_id}`
        const e_update_last_data = `${UPDATE_LAST_DATA}${data.id}`
        const e_delete_last_data = `${DELETE_LAST_DATA}${data.id}`
        const e_last_data = `${GET_LAST_DATA}${data.device_id}_${data.parameter_id}`

        // listeners
        const l_get_device_tree = `${GET_DEVICE_TREE}${data.device_id}`
        const l_set_issue = `${SET_ISSUE}${data.device_id}`
        const l_get_device = `${GET_DEVICE}${data.device_id}`
        const l_get_parameter = `${GET_PARAMETER}${data.parameter_id}`

        // Каждый раз будет новое
        this.uuid = crypto.randomUUID()

        // Можно ли запускать опрос
        const ready_next_run = () => {
            const last_data = data.date
            const mod = self.device.mod
            const p = mod.CronParameters.find(p => p.Ident == self.parameter.ident)
            if (p) {
                last_data.setSecounds(last_data.getSecounds() + p.delay)
                if (last_data.getTime() < (new Date).getTime()) {
                    return true
                }
            }
            return false
        }

        const loopSetIssue = setInterval(() => {
            if (!self.created()) {
                return
            }
            if (!ready_next_run()) {
                return
            }
            e.listeners(l_get_device_tree).forEach(l_tree_devices => {
                const devices = l_tree_devices()
                let issue_confirm = true
                devices.forEach(device => {
                    const l_set_issue_e = `${SET_ISSUE}${device.id}`
                    e.listeners(l_set_issue_e).forEach(l_device_set_issue => {
                        if (!issue_confirm) {
                            return false;
                        }
                        if (!l_device_set_issue(self.uuid)) {
                            issue_confirm = false
                        }
                    })
                })
                if (!issue_confirm) {
                    devices.forEach(device => {
                        const l_drop_issues = `${DROP_ISSUES}${device.id}`
                        e.listeners(l_drop_issues).forEach(l_device_drop_issue => {
                            let res = l_device_drop_issue(self.uuid)
                            if (!res) {
                                console.log('not droped issue', self.uuid)
                            }
                        })
                    })
                } else {
                    new Issue({
                        uuid,
                        parameter: self.parameter,
                        device_id: self.device,
                        context_deadline_sec: 60 * 60
                    }, e)
                }
            })
        }, 100)

        // проверяем что устройство есть в сети
        const loopCreatedDevice = setInterval(() => {
            if (self.device) {
                return
            }
            e.listeners(l_get_device).forEach(l => {
                let device = l()
                if (device) {
                    self.device = device
                    e.emit(`${ADD_LAST_DATA_DEVICE}${device.id}`, self)
                }
            })
        }, 100)

        const loopCreatedParameter = setInterval(() => {
            if (self.parameter) {
                return
            }
            e.listeners(l_get_parameter).forEach(l => {
                let parameter = l()
                if (parameter) {
                    self.parameter = parameter
                }
            })
        }, 100)

        // Если изменили иприбор
        const on_update_device = (data) => {
            Object.keys(data).forEach(key => {
                if (self.data[key] != data[key]) {
                    if (key == 'device_id') {
                        self.device = undefined
                    }
                    if (key == 'parameter_id') {
                        self.parameter = undefined
                    }
                }
            })
            self.data = data
        }


        const on_delete_device = () => {
            self.destroy()
        }

        const on_update_last_data = (data) => {
            self.data = data
            self.device = undefined
            self.parameter = undefined
            self.uuid = crypto.randomUUID()
        }

        const on_delete_last_data = () => {
            self.destroy()
        }

        // Нужно для того чтобы понимать есть ли такой класс в обработке
        const on_get_last_data = () => {
            return true
        }

        e.on(e_update_device, on_update_device)
        e.on(e_delete_device, on_delete_device)
        e.on(e_update_last_data, on_update_last_data)
        e.on(e_delete_last_data, on_delete_last_data)
        e.on(e_last_data, on_get_last_data)

        // Полное удаление объекта
        this.destroy = () => {

            self.device = undefined
            self.parameter = undefined
            self.uuid = undefined
            self.data = undefined

            if (loopCreatedDevice) {
                clearInterval(loopCreatedDevice)
            }
            if (loopSetIssue) {
                clearInterval(loopSetIssue)
            }
            if (loopCreatedParameter) {
                clearInterval(loopCreatedParameter)
            }

            e.removeListener(e_update_device, on_update_device)
            e.removeListener(e_delete_device, on_delete_device)
            e.removeListener(e_update_last_data, on_update_last_data)
            e.removeListener(e_delete_last_data, on_delete_last_data)
            e.removeListener(e_last_data, on_get_last_data)

            if (self.destroy) {
                self.destroy = undefined
            }
            if (self.created) {
                self.created = undefined
            }

        }

    }

    uuid = ''
    data = {}
    device = null
    parameter = null

    created = () => {
        return this.device &&
            this.device.created() &&
            this.parameter
    }
}