// generated

const PlaceType = require("../entity/placetype");
const UserCtx = require("../entity/user");

             


const { 
    PlaceTypeValidateInsert, 
    PlaceTypeValidateUpdate, 
    PlaceTypeAdd, 
    PlaceTypeFindById, 
    PlaceTypeUpdate, 
    PlaceTypeDrop, 
    PlaceTypeGetAllCount, 
    PlaceTypeGetAllSearch, 
    PlaceTypeGetAllSearchCount, 
    PlaceTypeGetAllFilter,
    PlaceTypeGetAllIncludesObject,
    PlaceTypeGetAllIncludesObjectCount,
    PlaceTypeGetAllFilterCount,
    PlaceTypeGetAll 
} = require("../repositories/placetype");


const NOT_FOUND_CONTEXT = 'not fount context';
const NOT_FOUND_ROW = 'not fount row';


module.exports = {

    PlaceType_NOT_FOUND_ROW : NOT_FOUND_ROW,
    PlaceType_NOT_FOUND_CONTEXT : NOT_FOUND_CONTEXT,

    async AddPlaceType(data,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        
        var error_validate = PlaceTypeValidateInsert(data)
        if (error_validate != '') {
            throw new Error(error_validate)
        }

        return PlaceTypeAdd(data).then(res => {
                            return new PlaceType(res.dataValues) 
                        })
    },


    async EditPlaceType(data,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        var error_validate = PlaceTypeValidateUpdate(data)
        if (error_validate != '') {
            throw new Error(error_validate)
        }

        // Если какие то поля не были переданы, то нам надо их взять
        // из текущей модели и вставить чтобы не перетереть
        return PlaceTypeFindById(data.id).then(row => {
            if (row) {
                
                Object.keys(row.dataValues).forEach((key,value) => {
                    if(typeof data[key] == 'undefined'){
                        data[key] = row.dataValues[key]
                    }
                })

                return PlaceTypeUpdate(data).then(res => {
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

    async DropPlaceType(id,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        return PlaceTypeFindById(id).then(r => {
            if (r) {
                return PlaceTypeDrop(id).then(res => {
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


    async GetAllPlaceType(params, flags , user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return PlaceTypeGetAll(params, flags).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new PlaceType(r.dataValues))
            })
            return output
        })
    },

    
    async GetAllCountPlaceType(user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
                throw new Error(NOT_FOUND_CONTEXT)
        }
            return PlaceTypeGetAllCount()
     },
            
            
    async GetAllByFilterPlaceType(filter, params , flags, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return PlaceTypeGetAllFilter(filter, params, flags).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new PlaceType(r.dataValues))
            })
            return output
        })
    },


    async GetAllSearchPlaceType(text, params , flags, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return PlaceTypeGetAllSearch(text, params, flags).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new PlaceType(r.dataValues))
            })
            return output
        })
    },

    async GetAllSearchCountPlaceType(text, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return PlaceTypeGetAllSearchCount(text)
    },

    async GetAllByFilterCountPlaceType(filter, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return PlaceTypeGetAllFilterCount(filter)
    },


    async FindByIdPlaceType(id, user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        return PlaceTypeFindById(id).then(res=> {
            if(!res){
                throw new Error(NOT_FOUND_ROW)
            }
            return new PlaceType(res.dataValues)
        })
    },

}