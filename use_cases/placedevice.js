// generated

const PlaceDevice = require("../entity/placedevice");
const UserCtx = require("../entity/user");

             


const { 
    PlaceDeviceValidateInsert, 
    PlaceDeviceValidateUpdate, 
    PlaceDeviceAdd, 
    PlaceDeviceFindById, 
    PlaceDeviceUpdate, 
    PlaceDeviceDrop, 
    PlaceDeviceGetAllCount, 
    PlaceDeviceGetAllSearch, 
    PlaceDeviceGetAllSearchCount, 
    PlaceDeviceGetAllFilter,
    PlaceDeviceGetAllIncludesObject,
    PlaceDeviceGetAllIncludesObjectCount,
    PlaceDeviceGetAllFilterCount,
    PlaceDeviceGetAll 
} = require("../repositories/placedevice");


const NOT_FOUND_CONTEXT = 'not fount context';
const NOT_FOUND_ROW = 'not fount row';


module.exports = {

    PlaceDevice_NOT_FOUND_ROW : NOT_FOUND_ROW,
    PlaceDevice_NOT_FOUND_CONTEXT : NOT_FOUND_CONTEXT,

    async AddPlaceDevice(data,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        
        var error_validate = PlaceDeviceValidateInsert(data)
        if (error_validate != '') {
            throw new Error(error_validate)
        }

        return PlaceDeviceAdd(data).then(res => {
                            return new PlaceDevice(res.dataValues) 
                        })
    },


    async EditPlaceDevice(data,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        var error_validate = PlaceDeviceValidateUpdate(data)
        if (error_validate != '') {
            throw new Error(error_validate)
        }

        // Если какие то поля не были переданы, то нам надо их взять
        // из текущей модели и вставить чтобы не перетереть
        return PlaceDeviceFindById(data.id).then(row => {
            if (row) {
                
                Object.keys(row.dataValues).forEach((key,value) => {
                    if(typeof data[key] == 'undefined'){
                        data[key] = row.dataValues[key]
                    }
                })

                return PlaceDeviceUpdate(data).then(res => {
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

    async DropPlaceDevice(id,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        return PlaceDeviceFindById(id).then(r => {
            if (r) {
                return PlaceDeviceDrop(id).then(res => {
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


    async GetAllPlaceDevice(params, flags , user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return PlaceDeviceGetAll(params, flags).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new PlaceDevice(r.dataValues))
            })
            return output
        })
    },

    
    async GetAllCountPlaceDevice(user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
                throw new Error(NOT_FOUND_CONTEXT)
        }
            return PlaceDeviceGetAllCount()
     },
            
            
    async GetAllByFilterPlaceDevice(filter, params , flags, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return PlaceDeviceGetAllFilter(filter, params, flags).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new PlaceDevice(r.dataValues))
            })
            return output
        })
    },


    async GetAllSearchPlaceDevice(text, params , flags, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return PlaceDeviceGetAllSearch(text, params, flags).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new PlaceDevice(r.dataValues))
            })
            return output
        })
    },

    async GetAllSearchCountPlaceDevice(text, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return PlaceDeviceGetAllSearchCount(text)
    },

    async GetAllByFilterCountPlaceDevice(filter, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return PlaceDeviceGetAllFilterCount(filter)
    },


    async FindByIdPlaceDevice(id, user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        return PlaceDeviceFindById(id).then(res=> {
            if(!res){
                throw new Error(NOT_FOUND_ROW)
            }
            return new PlaceDevice(res.dataValues)
        })
    },

}