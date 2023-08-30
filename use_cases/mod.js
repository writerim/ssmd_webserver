// generated

const Mod = require("../entity/mod");
const UserCtx = require("../entity/user");

const { 
    ModValidate, 
    ModAdd, 
    ModFindById, 
    ModUpdate, 
    ModDrop, 
    ModGetAllCount, 
    ModGetAllSerach, 
    ModGetAllSerachCount, 
    ModGetAllFilter,
    ModGetAllFilterCount,
    ModGetAll 
} = require("../repositories/mod");


const NOT_FOUND_CONTEXT = 'not fount context';
const NOT_FOUND_ROW = 'not fount row';

module.exports = {

    Mod_NOT_FOUND_ROW : NOT_FOUND_ROW,
    Mod_NOT_FOUND_CONTEXT : NOT_FOUND_CONTEXT,

    async AddMod(data,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        var error_validate = ModValidate(data)
        if (error_validate != '') {
            throw new Error(error_validate)
        }

        return ModAdd(data).then(res=> new Mod(res.dataValues))
    },


    async EditMod(data,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        var error_validate = ModValidate(data)
        if (error_validate != '') {
            throw new Error(error_validate)
        }

        return ModUpdate(data).then(res => {
            if (!res) {
                throw new Error(NOT_FOUND_ROW)
            }
            return new Mod(res.dataValues)
        })
    },

    async DropMod(id,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        return ModFindById(id).then(r => {
            if (r) {
                return ModDrop(id).then(res => {
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


    async GetAllMod(params , user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return ModGetAll(params).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new Mod(r.dataValues))
            })
            return output
        })
    },

    
    async GetAllCountMod(user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
                throw new Error(NOT_FOUND_CONTEXT)
        }
            return ModGetAllCount()
     },
            
            
            
            
    async GetAllByFilterMod(filter, params , user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return ModGetAllFilter(filter, params).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new Mod(r.dataValues))
            })
            return output
        })
    },


    async GetAllSerachMod(text, params , user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return ModGetAllSerach(text, params).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new Mod(r.dataValues))
            })
            return output
        })
    },

    async GetAllSerachCountMod(text, filter, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return ModGetAllFilterCount(text, filter)
    },

    async GetAllByFilterCountMod(filter, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return ModGetAllFilterCount(filter)
    },


    async FindByIdMod(id, user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        return ModFindById(id).then(res=> {
            if(!res){
                throw new Error(NOT_FOUND_ROW)
            }
            return new Mod(res.dataValues)
        })
    },

}