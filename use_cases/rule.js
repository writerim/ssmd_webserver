// generated

const Rule = require("../entity/rule");
const UserCtx = require("../entity/user");

const { 
    RuleValidateInsert, 
    RuleValidateUpdate, 
    RuleAdd, 
    RuleFindById, 
    RuleUpdate, 
    RuleDrop, 
    RuleGetAllCount, 
    RuleGetAllSerach, 
    RuleGetAllSerachCount, 
    RuleGetAllFilter,
    RuleGetAllFilterCount,
    RuleGetAll 
} = require("../repositories/rule");


const NOT_FOUND_CONTEXT = 'not fount context';
const NOT_FOUND_ROW = 'not fount row';

module.exports = {

    Rule_NOT_FOUND_ROW : NOT_FOUND_ROW,
    Rule_NOT_FOUND_CONTEXT : NOT_FOUND_CONTEXT,

    async AddRule(data,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        var error_validate = RuleValidateInsert(data)
        if (error_validate != '') {
            throw new Error(error_validate)
        }

        return RuleAdd(data).then(res=> new Rule(res.dataValues))
    },


    async EditRule(data,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        var error_validate = RuleValidateUpdate(data)
        if (error_validate != '') {
            throw new Error(error_validate)
        }

        // Если какие то поля не были переданы, то нам надо их взять
        // из текущей модели и вставить чтобы не перетереть
        return RuleFindById(id).then(row => {
            if (row) {

                row.dataValues.forEach((key,value) => {
                    if(typeof data[key] == 'undefined'){
                        data[key] = value
                    }
                })

                return RuleUpdate(data).then(res => {
                    if (!res) {
                        throw new Error(NOT_FOUND_ROW)
                    }
                    return new Rule(res.dataValues)
                })
            }
            return new Promise((resolve) => resolve({ result: false }))
        }).catch(e => {
            throw new Error(e)
        })

    },

    async DropRule(id,user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        return RuleFindById(id).then(r => {
            if (r) {
                return RuleDrop(id).then(res => {
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


    async GetAllRule(params , user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return RuleGetAll(params).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new Rule(r.dataValues))
            })
            return output
        })
    },

    
    async GetAllCountRule(user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
                throw new Error(NOT_FOUND_CONTEXT)
        }
            return RuleGetAllCount()
     },
            
            
            
            
    async GetAllByFilterRule(filter, params , user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return RuleGetAllFilter(filter, params).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new Rule(r.dataValues))
            })
            return output
        })
    },


    async GetAllSerachRule(text, params , user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return RuleGetAllSerach(text, params).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new Rule(r.dataValues))
            })
            return output
        })
    },

    async GetAllSerachCountRule(text, filter, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return RuleGetAllFilterCount(text, filter)
    },

    async GetAllByFilterCountRule(filter, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return RuleGetAllFilterCount(filter)
    },


    async FindByIdRule(id, user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        return RuleFindById(id).then(res=> {
            if(!res){
                throw new Error(NOT_FOUND_ROW)
            }
            return new Rule(res.dataValues)
        })
    },

}