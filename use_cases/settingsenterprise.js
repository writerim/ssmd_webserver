// generated

const SettingsEnterprise = require("../entity/settingsenterprise");
const UserCtx = require("../entity/user");

const { 
    SettingsEnterpriseValidateInsert, 
    SettingsEnterpriseValidateUpdate, 
    SettingsEnterpriseAdd, 
    SettingsEnterpriseFindById, 
    SettingsEnterpriseUpdate, 
    SettingsEnterpriseDrop, 
    SettingsEnterpriseGetAllCount, 
    SettingsEnterpriseGetAllSerach, 
    SettingsEnterpriseGetAllSerachCount, 
    SettingsEnterpriseGetAllFilter,
    SettingsEnterpriseGetAllFilterCount,
    SettingsEnterpriseGetAll 
} = require("../repositories/settingsenterprise");


const NOT_FOUND_CONTEXT = 'not fount context';
const NOT_FOUND_ROW = 'not fount row';

module.exports = {

    SettingsEnterprise_NOT_FOUND_ROW : NOT_FOUND_ROW,
    SettingsEnterprise_NOT_FOUND_CONTEXT : NOT_FOUND_CONTEXT,

    async AddSettingsEnterprise(data,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        var error_validate = SettingsEnterpriseValidateInsert(data)
        if (error_validate != '') {
            throw new Error(error_validate)
        }

        return SettingsEnterpriseAdd(data).then(res=> new SettingsEnterprise(res.dataValues))
    },


    async EditSettingsEnterprise(data,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        var error_validate = SettingsEnterpriseValidateUpdate(data)
        if (error_validate != '') {
            throw new Error(error_validate)
        }

        // Если какие то поля не были переданы, то нам надо их взять
        // из текущей модели и вставить чтобы не перетереть
        return SettingsEnterpriseFindById(id).then(row => {
            if (row) {

                row.dataValues.forEach((key,value) => {
                    if(typeof data[key] == 'undefined'){
                        data[key] = value
                    }
                })

                return SettingsEnterpriseUpdate(data).then(res => {
                    if (!res) {
                        throw new Error(NOT_FOUND_ROW)
                    }
                    return new SettingsEnterprise(res.dataValues)
                })
            }
            return new Promise((resolve) => resolve({ result: false }))
        }).catch(e => {
            throw new Error(e)
        })

    },

    async DropSettingsEnterprise(id,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        return SettingsEnterpriseFindById(id).then(r => {
            if (r) {
                return SettingsEnterpriseDrop(id).then(res => {
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
            console.log(e)
        })
    },


    async GetAllSettingsEnterprise(params , user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return SettingsEnterpriseGetAll(params).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new SettingsEnterprise(r.dataValues))
            })
            return output
        })
    },

    
    async GetAllCountSettingsEnterprise(user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
                throw new Error(NOT_FOUND_CONTEXT)
        }
            return SettingsEnterpriseGetAllCount()
     },
            
            
            
            
    async GetAllByFilterSettingsEnterprise(filter, params , user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return SettingsEnterpriseGetAllFilter(filter, params).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new SettingsEnterprise(r.dataValues))
            })
            return output
        })
    },


    async GetAllSerachSettingsEnterprise(text, params , user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return SettingsEnterpriseGetAllSerach(text, params).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new SettingsEnterprise(r.dataValues))
            })
            return output
        })
    },

    async GetAllSerachCountSettingsEnterprise(text, filter, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return SettingsEnterpriseGetAllFilterCount(text, filter)
    },

    async GetAllByFilterCountSettingsEnterprise(filter, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return SettingsEnterpriseGetAllFilterCount(filter)
    },


    async FindByIdSettingsEnterprise(id, user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        return SettingsEnterpriseFindById(id).then(res=> {
            if(!res){
                throw new Error(NOT_FOUND_ROW)
            }
            return new SettingsEnterprise(res.dataValues)
        })
    },

}