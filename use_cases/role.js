// generated

const Role = require("../entity/role");
const UserCtx = require("../entity/user");

const { 
    RoleValidate, 
    RoleAdd, 
    RoleFindById, 
    RoleUpdate, 
    RoleDrop, 
    RoleGetAllCount, 
    RoleGetAllSerach, 
    RoleGetAllSerachCount, 
    RoleGetAllFilter,
    RoleGetAllFilterCount,
    RoleGetAll 
} = require("../repositories/role");


const NOT_FOUND_CONTEXT = 'not fount context';
const NOT_FOUND_ROW = 'not fount row';

module.exports = {

    Role_NOT_FOUND_ROW : NOT_FOUND_ROW,
    Role_NOT_FOUND_CONTEXT : NOT_FOUND_CONTEXT,

    async AddRole(data,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        var error_validate = RoleValidate(data)
        if (error_validate != '') {
            throw new Error(error_validate)
        }

        return RoleAdd(data).then(res=> new Role(res.dataValues))
    },


    async EditRole(data,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        var error_validate = RoleValidate(data)
        if (error_validate != '') {
            throw new Error(error_validate)
        }

        return RoleUpdate(data).then(res => {
            if (!res) {
                throw new Error(NOT_FOUND_ROW)
            }
            return new Role(res.dataValues)
        })
    },

    async DropRole(id,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        return RoleFindById(id).then(r => {
            if (r) {
                return RoleDrop(id).then(res => {
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


    async GetAllRole(params , user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return RoleGetAll(params).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new Role(r.dataValues))
            })
            return output
        })
    },

    
    async GetAllCountRole(user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
                throw new Error(NOT_FOUND_CONTEXT)
        }
            return RoleGetAllCount()
     },
            
            
            
            
    async GetAllByFilterRole(filter, params , user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return RoleGetAllFilter(filter, params).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new Role(r.dataValues))
            })
            return output
        })
    },


    async GetAllSerachRole(text, params , user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return RoleGetAllSerach(text, params).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new Role(r.dataValues))
            })
            return output
        })
    },

    async GetAllSerachCountRole(text, filter, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return RoleGetAllFilterCount(text, filter)
    },

    async GetAllByFilterCountRole(filter, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return RoleGetAllFilterCount(filter)
    },


    async FindByIdRole(id, user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        return RoleFindById(id).then(res=> {
            if(!res){
                throw new Error(NOT_FOUND_ROW)
            }
            return new Role(res.dataValues)
        })
    },

}