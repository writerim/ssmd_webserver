// generated

const Data = require("../entity/data");
const UserCtx = require("../entity/user");

                     


const { 
    DataValidateInsert, 
    DataValidateUpdate, 
    DataAdd, 
    DataFindById, 
    DataUpdate, 
    DataDrop, 
    DataGetAllCount, 
    DataGetAllSearch, 
    DataGetAllSearchCount, 
    DataGetAllFilter,
    DataGetAllIncludesObject,
    DataGetAllIncludesObjectCount,
    DataGetAllFilterCount,
    DataGetAll 
} = require("../repositories/data");


const NOT_FOUND_CONTEXT = 'not fount context';
const NOT_FOUND_ROW = 'not fount row';


module.exports = {

    Data_NOT_FOUND_ROW : NOT_FOUND_ROW,
    Data_NOT_FOUND_CONTEXT : NOT_FOUND_CONTEXT,

    async AddData(data,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        
        var error_validate = DataValidateInsert(data)
        if (error_validate != '') {
            throw new Error(error_validate)
        }

        return DataAdd(data).then(res => {
                            return new Data(res.dataValues) 
                        })
    },


    async EditData(data,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        var error_validate = DataValidateUpdate(data)
        if (error_validate != '') {
            throw new Error(error_validate)
        }

        // Если какие то поля не были переданы, то нам надо их взять
        // из текущей модели и вставить чтобы не перетереть
        return DataFindById(data.id).then(row => {
            if (row) {
                
                Object.keys(row.dataValues).forEach((key,value) => {
                    if(typeof data[key] == 'undefined'){
                        data[key] = row.dataValues[key]
                    }
                })

                return DataUpdate(data).then(res => {
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
                    throw new Error(e)
                })
            }
            return new Promise((resolve) => resolve({ result: false }))
        }).catch(e => {
            console.log(e)
            throw new Error(e)
        })
    },


    async GetAllData(params, flags , user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return DataGetAll(params, flags).then(res=>{
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
            
            
    async GetAllByFilterData(filter, params , flags, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return DataGetAllFilter(filter, params, flags).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new Data(r.dataValues))
            })
            return output
        })
    },


    async GetAllSearchData(text, params , flags, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return DataGetAllSearch(text, params, flags).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new Data(r.dataValues))
            })
            return output
        })
    },

    async GetAllSearchCountData(text, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return DataGetAllSearchCount(text)
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