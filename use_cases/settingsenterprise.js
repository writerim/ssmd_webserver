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
    SettingsEnterpriseGetAllSearch, 
    SettingsEnterpriseGetAllSearchCount, 
    SettingsEnterpriseGetAllFilter,
    SettingsEnterpriseGetAllIncludesObject,
    SettingsEnterpriseGetAllIncludesObjectCount,
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

        return SettingsEnterpriseAdd(data).then(res => {
                            return new SettingsEnterprise(res.dataValues) 
                        })
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
        return SettingsEnterpriseFindById(data.id).then(row => {
            if (row) {
                
                Object.keys(row.dataValues).forEach((key,value) => {
                    if(typeof data[key] == 'undefined'){
                        data[key] = row.dataValues[key]
                    }
                })

                return SettingsEnterpriseUpdate(data).then(res => {
                    if (!res) {
                        throw new Error(NOT_FOUND_ROW)
                    }
                                                            })
            }
            return new Promise((resolve) => resolve({ result: false }))
        }).catch(e => {
            console.log(e);
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
                    throw new Error(e)
                })
            }
            return new Promise((resolve) => resolve({ result: false }))
        }).catch(e => {
            console.log(e)
            throw new Error(e)
        })
    },


    async GetAllSettingsEnterprise(params, flags , user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return SettingsEnterpriseGetAll(params, flags).then(res=>{
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
            
            
    async GetAllByFilterSettingsEnterprise(filter, params , flags, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return SettingsEnterpriseGetAllFilter(filter, params, flags).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new SettingsEnterprise(r.dataValues))
            })
            return output
        })
    },


    async GetAllSearchSettingsEnterprise(text, params , flags, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return SettingsEnterpriseGetAllSearch(text, params, flags).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new SettingsEnterprise(r.dataValues))
            })
            return output
        })
    },

    async GetAllSearchCountSettingsEnterprise(text, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return SettingsEnterpriseGetAllSearchCount(text)
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