const {
    ADD_LAST_DATA_DEVICE,
    GET_DEVICE_TREE,
    GET_DEVICE,
    UPDATE_DEVICE,
    DELETE_DEVICE,
    SET_ISSUE,
    GET_MOD
} = require("../../constants/commands");

const Emulate = {
    Mod
} = require("../../mod/emulator");

const fabticMod = (mod_db) => {
    switch (mod_db.ident) {
        case 'emulate':
            return Emulate
    }
    return new Error(`undefined library in require`)
}

module.exports = class Device {
    constructor(data, e) {

        if (!data.id) {
            throw new Error(`not created device. id invalid`)
        }
        if (!data.mod_id) {
            throw new Error(`not created device. mod_id invalid`)
        }

        this.data = data

        var self = this

        const e_add_last_data = `${ADD_LAST_DATA_DEVICE}${data.id}`
        const e_get_tree_device = `${GET_DEVICE_TREE}${data.id}`
        const e_get_device = `${GET_DEVICE}${data.id}`
        const e_update_device = `${UPDATE_DEVICE}${data.id}`
        const e_delete_parent_device = `${DELETE_DEVICE}${data.parent_id}`
        const e_delete_device = `${DELETE_DEVICE}${data.id}`
        const e_set_issue = `${SET_ISSUE}${data.id}`
        const l_get_mod = `${GET_MOD}${data.mod_id}`

        // Поиск родительского устройства
        const get_parent_device = () => {
            if (self.parent_device) {
                return
            }
            const e_get_parent_device = `${GET_DEVICE}${self.data.parent_id}`

            e.listeners(e_get_parent_device).forEach(l_parent_device => {
                let parent_device = l_parent_device()
                if (parent_device) {
                    self.parent_device = parent_device
                }
            })
        }

        const on_add_last_data = (last_data) => {
            if (!self.last_data.some(last_data.data.id)) {
                // Если не будет хватать данных, то мы будем тут удалять все 
                // лишние последние данные
                // if(self.last_data.length){
                //     last_data.destroy()
                //     return
                // }
                self.last_data.append(last_data)
            }
        }

        // Получение дерева приборов учета
        const on_get_tree_device = () => {
            var valid_tree = true
            const f_parent = (d, res = []) => {
                if (d.data.parent_id && !d.parent_device) {
                    valid_tree = false
                    return
                }
                res.push(d)
                if (d.data.parent_id) {
                    return f_parent(d.parent_device, res)
                }
                return res
            }
            let res = f_parent(self)
            if (valid_tree) {
                return res
            }
            return []
        }

        const on_get_device = () => {
            return self
        }

        const on_update_device = (new_data) => {
            var olf_data = self.data
            self.data = new_data
            Object.keys(data).forEach(key => {
                if (olf_data[key] != new_data[key]) {
                    if (key == 'mod_id') {
                        self.mod = undefined
                    }
                    if (key == 'parent_id') {
                        self.parent_device = undefined
                        get_parent_device()
                    }
                }
            })
        }
        const on_delete_device = () => {
            self.destroy()
        }

        // Проверка можно ли добавлять сюда задачу
        const on_set_issue = (uuid) => {
            if (self.mod.max_count_issues <= self.issues.length) {
                return false
            }
            self.issues.push(uuid)
            return true
        }

        const on_delete_parent_device = () => {
            self.parent_device = undefined
        }

        e.on(e_update_device, on_update_device)
        e.on(e_delete_device, on_delete_device)
        e.on(e_delete_parent_device, on_delete_parent_device)
        e.on(e_set_issue, on_set_issue)
        e.on(e_get_device, on_get_device)
        e.on(e_get_tree_device, on_get_tree_device)
        e.on(e_add_last_data, on_add_last_data)


        const loopCreatedMod = setInterval(() => {
            if (self.mod) {
                return
            }
            e.listeners(l_get_mod).forEach(lmod => {
                let mod = lmod()
                if (mod) {
                    let res = fabticMod(mod)
                    if (!res) {
                        self.mod = undefined
                        return
                    }
                    self.mod = res
                }
            })
        }, 100)

        get_parent_device()

        const loopParentDevice = setInterval(get_parent_device, 100)

        this.destroy = () => {
            e.removeListener(e_add_last_data, on_add_last_data)
            e.removeListener(e_get_device, on_get_device)
            e.removeListener(e_delete_device, on_delete_device)
            e.removeListener(e_update_device, on_update_device)
            e.removeListener(e_get_tree_device, on_get_tree_device)
            e.removeListener(e_set_issue, on_set_issue)
            e.removeListener(e_delete_parent_device, on_delete_parent_device)

            if (loopCreatedMod) {
                clearInterval(loopCreatedMod)
            }
            if (loopParentDevice) {
                clearInterval(loopParentDevice)
            }

            self.last_data = undefined
            self.data = undefined
            self.issues = undefined
            self.mod = undefined
            self.parent_device = undefined

            if (self.destroy) {
                self.destroy = undefined
            }
            if (self.created) {
                self.created = undefined
            }
        }
    }

    data = null
    last_data = []
    issues = []
    mod = null
    parent_device = null

    created = () => {
        return this.mod && this.mod.max_count_issues
    }

}