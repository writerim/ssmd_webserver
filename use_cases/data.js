// generated

const Data = require("../entity/data");
const UserCtx = require("../entity/User");

const { 
    DataValidate, 
    DataAdd, 
    DataFindById, 
    DataUpdate, 
    DataDrop, 
    DataGetAllCount, 
    DataGetAllSerach, 
    DataGetAllSerachCount, 
    DataGetAllFilter,
    DataGetAllFilterCount,
    DataGetAll 
} = require("../repositories/Data");


const NOT_FOUND_CONTEXT = 'not fount context';
const NOT_FOUND_ROW = 'not fount row';

module.exports = {

    Data_NOT_FOUND_ROW : NOT_FOUND_ROW,
    Data_NOT_FOUND_CONTEXT : NOT_FOUND_CONTEXT,

    async AddData(data,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        var error_validate = DataValidate(data)
        if (error_validate != '') {
            throw new Error(error_validate)
        }

        return DataAdd(data).then(res=> new Data(res.dataValues))
    },


    async EditData(data,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        var error_validate = DataValidate(data)
        if (error_validate != '') {
            throw new Error(error_validate)
        }

        return DataUpdate(data).then(res => {
            if (!res) {
                throw new Error(NOT_FOUND_ROW)
            }
            return new Data(res.dataValues)
        })
    },

    async DropData(id,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        return DataFindById(id).then(r => {
            if (r) {
                return DataDrop(id).then(res => {
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


    async GetAllData(params , user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return DataGetAll(params).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new Data(r.dataValues))
            })
            return output
        })
    },

    
    async GetAllCountData(user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
                throw new Error(NOT_FOUND_CONTEXT)
        }
            return DataGetAllCount()
     },
            
            
            
            
    async GetAllByFilterData(filter, params , user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return DataGetAllFilter(filter, params).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new Data(r.dataValues))
            })
            return output
        })
    },


    async GetAllSerachData(text, params , user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return DataGetAllSerach(text, params).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new Data(r.dataValues))
            })
            return output
        })
    },

    async GetAllSerachCountData(text, filter, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return DataGetAllFilterCount(text, filter)
    },

    async GetAllByFilterCountData(filter, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return DataGetAllFilterCount(filter)
    },


    async FindByIdData(id, user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        return DataFindById(id).then(res=> {
            if(!res){
                throw new Error(NOT_FOUND_ROW)
            }
            return new Data(res.dataValues)
        })
    },

}