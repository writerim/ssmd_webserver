// generated

const Device2Device = require("../entity/device2device");
const UserCtx = require("../entity/user");

                     


const { 
    Device2DeviceValidateInsert, 
    Device2DeviceValidateUpdate, 
    Device2DeviceAdd, 
    Device2DeviceFindById, 
    Device2DeviceUpdate, 
    Device2DeviceDrop, 
    Device2DeviceGetAllCount, 
    Device2DeviceGetAllSearch, 
    Device2DeviceGetAllSearchCount, 
    Device2DeviceGetAllFilter,
    Device2DeviceGetAllIncludesObject,
    Device2DeviceGetAllIncludesObjectCount,
    Device2DeviceGetAllFilterCount,
    Device2DeviceGetAll 
} = require("../repositories/device2device");


const NOT_FOUND_CONTEXT = 'not fount context';
const NOT_FOUND_ROW = 'not fount row';


module.exports = {

    Device2Device_NOT_FOUND_ROW : NOT_FOUND_ROW,
    Device2Device_NOT_FOUND_CONTEXT : NOT_FOUND_CONTEXT,

    async AddDevice2Device(data,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        
        var error_validate = Device2DeviceValidateInsert(data)
        if (error_validate != '') {
            throw new Error(error_validate)
        }

        return Device2DeviceAdd(data).then(res => {
                            return new Device2Device(res.dataValues) 
                        })
    },


    async EditDevice2Device(data,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        var error_validate = Device2DeviceValidateUpdate(data)
        if (error_validate != '') {
            throw new Error(error_validate)
        }

        // Если какие то поля не были переданы, то нам надо их взять
        // из текущей модели и вставить чтобы не перетереть
        return Device2DeviceFindById(data.id).then(row => {
            if (row) {
                
                Object.keys(row.dataValues).forEach((key,value) => {
                    if(typeof data[key] == 'undefined'){
                        data[key] = row.dataValues[key]
                    }
                })

                return Device2DeviceUpdate(data).then(res => {
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

    async DropDevice2Device(id,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        return Device2DeviceFindById(id).then(r => {
            if (r) {
                return Device2DeviceDrop(id).then(res => {
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


    async GetAllDevice2Device(params, flags , user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return Device2DeviceGetAll(params, flags).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new Device2Device(r.dataValues))
            })
            return output
        })
    },

    
    async GetAllCountDevice2Device(user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
                throw new Error(NOT_FOUND_CONTEXT)
        }
            return Device2DeviceGetAllCount()
     },
            
            
    async GetAllByFilterDevice2Device(filter, params , flags, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return Device2DeviceGetAllFilter(filter, params, flags).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new Device2Device(r.dataValues))
            })
            return output
        })
    },


    async GetAllSearchDevice2Device(text, params , flags, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return Device2DeviceGetAllSearch(text, params, flags).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new Device2Device(r.dataValues))
            })
            return output
        })
    },

    async GetAllSearchCountDevice2Device(text, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return Device2DeviceGetAllSearchCount(text)
    },

    async GetAllByFilterCountDevice2Device(filter, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return Device2DeviceGetAllFilterCount(filter)
    },


    async FindByIdDevice2Device(id, user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        return Device2DeviceFindById(id).then(res=> {
            if(!res){
                throw new Error(NOT_FOUND_ROW)
            }
            return new Device2Device(res.dataValues)
        })
    },

}