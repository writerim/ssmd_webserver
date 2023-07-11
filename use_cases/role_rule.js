// generated May 18, 2023

const RoleRule = require("../entity/rolerule");
const { 
    RoleRuleValidate, 
    RoleRuleAdd, 
    RoleRuleFindById, 
    RoleRuleUpdate, 
    RoleRuleDrop, 
    RoleRuleGetAll 
} = require("../repositories/RoleRule");

const NOT_FOUND_CONTEXT = 'not fount context';

module.exports = {

    async AddRoleRule(data,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof Chat)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        var error_validate = RoleRuleValidate(data)
        if (error_validate != '') {
            throw new Error(error_validate)
        }

        return RoleRuleAdd(data)
    },


    async EditRoleRule(data,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof Chat)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        var error_validate = RoleRuleValidate(data)
        if (error_validate != '') {
            throw new Error(error_validate)
        }

        return RoleRuleFindById(data.id).then(res => {
            if (!res) {
                return RoleRuleUpdate(data).then(res => {
                    return RoleRuleFindById(data.id)
                }).catch(e => {
                    console.log(e)
                })
            }
            return RoleRuleFindById(data.id)
        }).catch(e => {
            console.log(e)
        })
    },

    async DropRoleRule(id,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof Chat)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        return RoleRuleFindById(id).then(r => {
            if (r) {
                return RoleRuleDrop(id).then(res => {
                    if(res){
                        return new Promise((resolve) => resolve({ result: true }))
                    }
                    return new Promise((resolve) => resolve({ result: false }))
                }).catch(e => {
                    console.log(e)
                })
            }
            return new Promise((resolve) => resolve({ result: false }))
        }).catch(e => {
            cconsole.log(e)
        })
    },


    async EditRoleRule(data,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof Chat)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        var error_validate = RoleRuleValidate(data)
        if (error_validate != '') {
            throw new Error(error_validate)
        }

        if (Number(data.id) <= 0) {
            throw new Error(ERROR_MESSAGE_EDIT_MESSAGE_NOT_CRON_ID)
        }

        return RoleRuleFindById(data.id).then(res => {
            if (res) {
                return RoleRuleUpdate(data).then(res => {
                    return RoleRuleFindById(data.id)
                }).catch(e => {
                    console.log(e)
                })
            }
            return RoleRuleFindById(data.id)
        }).catch(e => {
            console.log(e)
        })
    },

    async GetAllRoleRule(user_ctx) {
        if (!user_ctx || !(user_ctx instanceof Chat)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        return RoleRuleGetAll()
    },

}