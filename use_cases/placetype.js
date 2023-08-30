// generated

const PlaceType = require("../entity/placetype");
const UserCtx = require("../entity/user");

const { 
    PlaceTypeValidate, 
    PlaceTypeAdd, 
    PlaceTypeFindById, 
    PlaceTypeUpdate, 
    PlaceTypeDrop, 
    PlaceTypeGetAllCount, 
    PlaceTypeGetAllSerach, 
    PlaceTypeGetAllSerachCount, 
    PlaceTypeGetAllFilter,
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

        var error_validate = PlaceTypeValidate(data)
        if (error_validate != '') {
            throw new Error(error_validate)
        }

        return PlaceTypeAdd(data).then(res=> new PlaceType(res.dataValues))
    },


    async EditPlaceType(data,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        var error_validate = PlaceTypeValidate(data)
        if (error_validate != '') {
            throw new Error(error_validate)
        }

        return PlaceTypeUpdate(data).then(res => {
            if (!res) {
                throw new Error(NOT_FOUND_ROW)
            }
            return new PlaceType(res.dataValues)
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
                })
            }
            return new Promise((resolve) => resolve({ result: false }))
        }).catch(e => {
            console.log(e)
        })
    },


    async GetAllPlaceType(params , user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return PlaceTypeGetAll(params).then(res=>{
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
            
            
            
            
    async GetAllByFilterPlaceType(filter, params , user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return PlaceTypeGetAllFilter(filter, params).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new PlaceType(r.dataValues))
            })
            return output
        })
    },


    async GetAllSerachPlaceType(text, params , user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return PlaceTypeGetAllSerach(text, params).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new PlaceType(r.dataValues))
            })
            return output
        })
    },

    async GetAllSerachCountPlaceType(text, filter, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return PlaceTypeGetAllFilterCount(text, filter)
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