// generated

const Pooler = require("../entity/pooler");
const UserCtx = require("../entity/user");

                 


const { 
    PoolerValidateInsert, 
    PoolerValidateUpdate, 
    PoolerAdd, 
    PoolerFindById, 
    PoolerUpdate, 
    PoolerDrop, 
    PoolerGetAllCount, 
    PoolerGetAllSearch, 
    PoolerGetAllSearchCount, 
    PoolerGetAllFilter,
    PoolerGetAllIncludesObject,
    PoolerGetAllIncludesObjectCount,
    PoolerGetAllFilterCount,
    PoolerGetAll 
} = require("../repositories/pooler");


const NOT_FOUND_CONTEXT = 'not fount context';
const NOT_FOUND_ROW = 'not fount row';


module.exports = {

    Pooler_NOT_FOUND_ROW : NOT_FOUND_ROW,
    Pooler_NOT_FOUND_CONTEXT : NOT_FOUND_CONTEXT,

    async AddPooler(data,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        
        var error_validate = PoolerValidateInsert(data)
        if (error_validate != '') {
            throw new Error(error_validate)
        }

        return PoolerAdd(data).then(res => {
                            return new Pooler(res.dataValues) 
                        })
    },


    async EditPooler(data,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        var error_validate = PoolerValidateUpdate(data)
        if (error_validate != '') {
            throw new Error(error_validate)
        }

        // Если какие то поля не были переданы, то нам надо их взять
        // из текущей модели и вставить чтобы не перетереть
        return PoolerFindById(data.id).then(row => {
            if (row) {
                
                Object.keys(row.dataValues).forEach((key,value) => {
                    if(typeof data[key] == 'undefined'){
                        data[key] = row.dataValues[key]
                    }
                })

                return PoolerUpdate(data).then(res => {
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

    async DropPooler(id,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        return PoolerFindById(id).then(r => {
            if (r) {
                return PoolerDrop(id).then(res => {
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


    async GetAllPooler(params, flags , user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return PoolerGetAll(params, flags).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new Pooler(r.dataValues))
            })
            return output
        })
    },

    
    async GetAllCountPooler(user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
                throw new Error(NOT_FOUND_CONTEXT)
        }
            return PoolerGetAllCount()
     },
            
            
    async GetAllByFilterPooler(filter, params , flags, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return PoolerGetAllFilter(filter, params, flags).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new Pooler(r.dataValues))
            })
            return output
        })
    },


    async GetAllSearchPooler(text, params , flags, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return PoolerGetAllSearch(text, params, flags).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new Pooler(r.dataValues))
            })
            return output
        })
    },

    async GetAllSearchCountPooler(text, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return PoolerGetAllSearchCount(text)
    },

    async GetAllByFilterCountPooler(filter, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return PoolerGetAllFilterCount(filter)
    },


    async FindByIdPooler(id, user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        return PoolerFindById(id).then(res=> {
            if(!res){
                throw new Error(NOT_FOUND_ROW)
            }
            return new Pooler(res.dataValues)
        })
    },

}