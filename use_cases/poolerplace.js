// generated

const PoolerPlace = require("../entity/poolerplace");
const UserCtx = require("../entity/user");

             


const { 
    PoolerPlaceValidateInsert, 
    PoolerPlaceValidateUpdate, 
    PoolerPlaceAdd, 
    PoolerPlaceFindById, 
    PoolerPlaceUpdate, 
    PoolerPlaceDrop, 
    PoolerPlaceGetAllCount, 
    PoolerPlaceGetAllSearch, 
    PoolerPlaceGetAllSearchCount, 
    PoolerPlaceGetAllFilter,
    PoolerPlaceGetAllIncludesObject,
    PoolerPlaceGetAllIncludesObjectCount,
    PoolerPlaceGetAllFilterCount,
    PoolerPlaceGetAll 
} = require("../repositories/poolerplace");


const NOT_FOUND_CONTEXT = 'not fount context';
const NOT_FOUND_ROW = 'not fount row';


module.exports = {

    PoolerPlace_NOT_FOUND_ROW : NOT_FOUND_ROW,
    PoolerPlace_NOT_FOUND_CONTEXT : NOT_FOUND_CONTEXT,

    async AddPoolerPlace(data,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        
        var error_validate = PoolerPlaceValidateInsert(data)
        if (error_validate != '') {
            throw new Error(error_validate)
        }

        return PoolerPlaceAdd(data).then(res => {
                            return new PoolerPlace(res.dataValues) 
                        })
    },


    async EditPoolerPlace(data,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        var error_validate = PoolerPlaceValidateUpdate(data)
        if (error_validate != '') {
            throw new Error(error_validate)
        }

        // Если какие то поля не были переданы, то нам надо их взять
        // из текущей модели и вставить чтобы не перетереть
        return PoolerPlaceFindById(data.id).then(row => {
            if (row) {
                
                Object.keys(row.dataValues).forEach((key,value) => {
                    if(typeof data[key] == 'undefined'){
                        data[key] = row.dataValues[key]
                    }
                })

                return PoolerPlaceUpdate(data).then(res => {
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

    async DropPoolerPlace(id,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        return PoolerPlaceFindById(id).then(r => {
            if (r) {
                return PoolerPlaceDrop(id).then(res => {
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


    async GetAllPoolerPlace(params, flags , user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return PoolerPlaceGetAll(params, flags).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new PoolerPlace(r.dataValues))
            })
            return output
        })
    },

    
    async GetAllCountPoolerPlace(user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
                throw new Error(NOT_FOUND_CONTEXT)
        }
            return PoolerPlaceGetAllCount()
     },
            
            
    async GetAllByFilterPoolerPlace(filter, params , flags, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return PoolerPlaceGetAllFilter(filter, params, flags).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new PoolerPlace(r.dataValues))
            })
            return output
        })
    },


    async GetAllSearchPoolerPlace(text, params , flags, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return PoolerPlaceGetAllSearch(text, params, flags).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new PoolerPlace(r.dataValues))
            })
            return output
        })
    },

    async GetAllSearchCountPoolerPlace(text, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return PoolerPlaceGetAllSearchCount(text)
    },

    async GetAllByFilterCountPoolerPlace(filter, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return PoolerPlaceGetAllFilterCount(filter)
    },


    async FindByIdPoolerPlace(id, user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        return PoolerPlaceFindById(id).then(res=> {
            if(!res){
                throw new Error(NOT_FOUND_ROW)
            }
            return new PoolerPlace(res.dataValues)
        })
    },

}