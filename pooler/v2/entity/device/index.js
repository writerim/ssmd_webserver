const {
    ADD_LAST_DATA_DEVICE,
    GET_DEVICE_TREE,
    GET_DEVICE,
    UPDATE_DEVICE,
    DELETE_DEVICE,
    SET_ISSUE
} = require("../../constants/commands")

module.exports = class Device {
    constructor(data, e) {

        if (!data.id) {
            throw new Error(`not created device. id invalid`)
        }

        this.data = data

        self = this

        const e_add_last_data = `${ADD_LAST_DATA_DEVICE}${data.id}`
        const e_get_tree_device = `${GET_DEVICE_TREE}${data.id}`
        const e_get_device = `${GET_DEVICE}${data.id}`
        const e_update_device = `${UPDATE_DEVICE}${data.device_id}`
        const e_delete_device = `${DELETE_DEVICE}${data.device_id}`
        const e_set_issue = `${SET_ISSUE}${data.device_id}`

        const on_add_last_data = e.on(e_add_last_data, (last_data) => {
            if (!self.last_data.some(last_data.data.id)) {
                self.last_data.append(last_data)
            }
        })

        // Получение дерева приборов учета
        const on_get_tree_device = e.on(e_get_tree_device, (res = []) => {
            e.listeners(`${GET_DEVICE_TREE}${self.data.parent_id}`).forEach(l_tree_devices => {
                l_tree_devices(res)
            })
            res.push(self.data.id)
            return
        })

        const on_get_device = e.on(`${GET_DEVICE}${data.id}`, () => {
            return self
        })

        const on_update_device = e.on(e_update_device, (new_data) => {

        })
        const on_delete_device = e.on(e_delete_device, () => {
            self.destroy()
        })

        // Проверка можно ли добавлять сюда задачу
        const on_set_issue = e.on(e_set_issue, (uuid) => {
            if(self.max_count_issues <= self.issues.length){
                return false
            }
            self.issues.push(uuid)
            return true
        })

        this.destroy = () => {
            e.removeListener(e_add_last_data, e_add_last_data)
            e.removeListener(e_get_tree_device, on_add_last_data)
            e.removeListener(e_get_device, on_get_device)
            e.removeListener(e_delete_device, on_delete_device)
            e.removeListener(e_update_device, on_update_device)
            e.removeListener(e_get_tree_device, on_get_tree_device)
            e.removeListener(e_set_issue, on_set_issue)

            this.last_data = undefined
            this.data = undefined
        }
    }

    data = null
    last_data = []
    issues = []
    max_count_issues = 0
}