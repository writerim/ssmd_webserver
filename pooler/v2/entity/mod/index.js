const {
    GET_MOD, UPDATE_MOD, DELETE_MOD
} = require("../../constants/commands")

module.exports = class Mod {
    constructor(data, e) {
        this.data = data

        var self = this

        const e_get_mod = `${GET_MOD}${data.id}`
        const e_update_mod = `${UPDATE_MOD}${data.id}`
        const e_delete_mod = `${DELETE_MOD}${data.id}`

        const on_get_mod = () => {
            return self
        }

        const on_update_mod = (data) => {
            self.data = data
        }
        const on_delete_mod = (data) => {
            self.destroy()
        }

        e.on(e_get_mod, l_get_mod)
        e.on(e_update_mod, on_update_mod)
        e.on(e_delete_mod, on_delete_mod)

        this.destroy = () => {
            e.removeListener(e_get_mod, on_get_mod)
            e.removeListener(e_update_mod, on_update_mod)
            e.removeListener(e_delete_mod, on_delete_mod)
            self.data = undefined
        }
    }

    data = {}
}