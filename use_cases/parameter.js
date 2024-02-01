// generated

const Parameter = require("../entity/parameter");
const UserCtx = require("../entity/user");

         


const { 
    ParameterValidateInsert, 
    ParameterValidateUpdate, 
    ParameterAdd, 
    ParameterFindById, 
    ParameterUpdate, 
    ParameterDrop, 
    ParameterGetAllCount, 
    ParameterGetAllSearch, 
    ParameterGetAllSearchCount, 
    ParameterGetAllFilter,
    ParameterGetAllIncludesObject,
    ParameterGetAllIncludesObjectCount,
    ParameterGetAllFilterCount,
    ParameterGetAll 
} = require("../repositories/parameter");


const NOT_FOUND_CONTEXT = 'not fount context';
const NOT_FOUND_ROW = 'not fount row';


module.exports = {

    Parameter_NOT_FOUND_ROW : NOT_FOUND_ROW,
    Parameter_NOT_FOUND_CONTEXT : NOT_FOUND_CONTEXT,

    async AddParameter(data,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        
        var error_validate = ParameterValidateInsert(data)
        if (error_validate != '') {
            throw new Error(error_validate)
        }

        return ParameterAdd(data).then(res => {
                            return new Parameter(res.dataValues) 
                        })
    },


    async EditParameter(data,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        var error_validate = ParameterValidateUpdate(data)
        if (error_validate != '') {
            throw new Error(error_validate)
        }

        // Если какие то поля не были переданы, то нам надо их взять
        // из текущей модели и вставить чтобы не перетереть
        return ParameterFindById(data.id).then(row => {
            if (row) {
                
                Object.keys(row.dataValues).forEach((key,value) => {
                    if(typeof data[key] == 'undefined'){
                        data[key] = row.dataValues[key]
                    }
                })

                return ParameterUpdate(data).then(res => {
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

    async DropParameter(id,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        return ParameterFindById(id).then(r => {
            if (r) {
                return ParameterDrop(id).then(res => {
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


    async GetAllParameter(params, flags , user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return ParameterGetAll(params, flags).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new Parameter(r.dataValues))
            })
            return output
        })
    },

    
    async GetAllCountParameter(user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
                throw new Error(NOT_FOUND_CONTEXT)
        }
            return ParameterGetAllCount()
     },
            
            
    async GetAllByFilterParameter(filter, params , flags, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return ParameterGetAllFilter(filter, params, flags).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new Parameter(r.dataValues))
            })
            return output
        })
    },


    async GetAllSearchParameter(text, params , flags, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return ParameterGetAllSearch(text, params, flags).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new Parameter(r.dataValues))
            })
            return output
        })
    },

    async GetAllSearchCountParameter(text, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return ParameterGetAllSearchCount(text)
    },

    async GetAllByFilterCountParameter(filter, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return ParameterGetAllFilterCount(filter)
    },


    async FindByIdParameter(id, user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        return ParameterFindById(id).then(res=> {
            if(!res){
                throw new Error(NOT_FOUND_ROW)
            }
            return new Parameter(res.dataValues)
        })
    },

}