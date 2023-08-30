// generated

const LastData = require("../entity/lastdata");
const UserCtx = require("../entity/user");

const { 
    LastDataValidate, 
    LastDataAdd, 
    LastDataFindById, 
    LastDataUpdate, 
    LastDataDrop, 
    LastDataGetAllCount, 
    LastDataGetAllSerach, 
    LastDataGetAllSerachCount, 
    LastDataGetAllFilter,
    LastDataGetAllFilterCount,
    LastDataGetAll 
} = require("../repositories/lastdata");


const NOT_FOUND_CONTEXT = 'not fount context';
const NOT_FOUND_ROW = 'not fount row';

module.exports = {

    LastData_NOT_FOUND_ROW : NOT_FOUND_ROW,
    LastData_NOT_FOUND_CONTEXT : NOT_FOUND_CONTEXT,

    async AddLastData(data,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        var error_validate = LastDataValidate(data)
        if (error_validate != '') {
            throw new Error(error_validate)
        }

        return LastDataAdd(data).then(res=> new LastData(res.dataValues))
    },


    async EditLastData(data,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        var error_validate = LastDataValidate(data)
        if (error_validate != '') {
            throw new Error(error_validate)
        }

        return LastDataUpdate(data).then(res => {
            if (!res) {
                throw new Error(NOT_FOUND_ROW)
            }
            return new LastData(res.dataValues)
        })
    },

    async DropLastData(id,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        return LastDataFindById(id).then(r => {
            if (r) {
                return LastDataDrop(id).then(res => {
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


    async GetAllLastData(params , user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return LastDataGetAll(params).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new LastData(r.dataValues))
            })
            return output
        })
    },

    
    async GetAllCountLastData(user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
                throw new Error(NOT_FOUND_CONTEXT)
        }
            return LastDataGetAllCount()
     },
            
            
            
            
    async GetAllByFilterLastData(filter, params , user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return LastDataGetAllFilter(filter, params).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new LastData(r.dataValues))
            })
            return output
        })
    },


    async GetAllSerachLastData(text, params , user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return LastDataGetAllSerach(text, params).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new LastData(r.dataValues))
            })
            return output
        })
    },

    async GetAllSerachCountLastData(text, filter, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return LastDataGetAllFilterCount(text, filter)
    },

    async GetAllByFilterCountLastData(filter, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return LastDataGetAllFilterCount(filter)
    },


    async FindByIdLastData(id, user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        return LastDataFindById(id).then(res=> {
            if(!res){
                throw new Error(NOT_FOUND_ROW)
            }
            return new LastData(res.dataValues)
        })
    },

}