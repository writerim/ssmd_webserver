// generated

const Place = require("../entity/place");
const UserCtx = require("../entity/User");

const { 
    PlaceValidate, 
    PlaceAdd, 
    PlaceFindById, 
    PlaceUpdate, 
    PlaceDrop, 
    PlaceGetAllCount, 
    PlaceGetAllSerach, 
    PlaceGetAllSerachCount, 
    PlaceGetAllFilter,
    PlaceGetAllFilterCount,
    PlaceGetAll 
} = require("../repositories/Place");


const NOT_FOUND_CONTEXT = 'not fount context';
const NOT_FOUND_ROW = 'not fount row';

module.exports = {

    Place_NOT_FOUND_ROW : NOT_FOUND_ROW,
    Place_NOT_FOUND_CONTEXT : NOT_FOUND_CONTEXT,

    async AddPlace(data,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        var error_validate = PlaceValidate(data)
        if (error_validate != '') {
            throw new Error(error_validate)
        }

        return PlaceAdd(data).then(res=> new Place(res.dataValues))
    },


    async EditPlace(data,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        var error_validate = PlaceValidate(data)
        if (error_validate != '') {
            throw new Error(error_validate)
        }

        return PlaceUpdate(data).then(res => {
            if (!res) {
                throw new Error(NOT_FOUND_ROW)
            }
            return new Place(res.dataValues)
        })
    },

    async DropPlace(id,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        return PlaceFindById(id).then(r => {
            if (r) {
                return PlaceDrop(id).then(res => {
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


    async GetAllPlace(params , user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return PlaceGetAll(params).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new Place(r.dataValues))
            })
            return output
        })
    },

    
    async GetAllCountPlace(user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
                throw new Error(NOT_FOUND_CONTEXT)
        }
            return PlaceGetAllCount()
     },
            
            
            
            
    async GetAllByFilterPlace(filter, params , user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return PlaceGetAllFilter(filter, params).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new Place(r.dataValues))
            })
            return output
        })
    },


    async GetAllSerachPlace(text, params , user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return PlaceGetAllSerach(text, params).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new Place(r.dataValues))
            })
            return output
        })
    },

    async GetAllSerachCountPlace(text, filter, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return PlaceGetAllFilterCount(text, filter)
    },

    async GetAllByFilterCountPlace(filter, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return PlaceGetAllFilterCount(filter)
    },


    async FindByIdPlace(id, user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        return PlaceFindById(id).then(res=> {
            if(!res){
                throw new Error(NOT_FOUND_ROW)
            }
            return new Place(res.dataValues)
        })
    },

}