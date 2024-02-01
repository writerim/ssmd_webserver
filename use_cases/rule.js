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
    RuleGetAllSearch, 
    RuleGetAllSearchCount, 
    RuleGetAllFilter,
    RuleGetAllIncludesObject,
    RuleGetAllIncludesObjectCount,
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

        return RuleAdd(data).then(res => {
                            return new Rule(res.dataValues) 
                        })
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
        return RuleFindById(data.id).then(row => {
            if (row) {
                
                Object.keys(row.dataValues).forEach((key,value) => {
                    if(typeof data[key] == 'undefined'){
                        data[key] = row.dataValues[key]
                    }
                })

                return RuleUpdate(data).then(res => {
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
                    throw new Error(e)
                })
            }
            return new Promise((resolve) => resolve({ result: false }))
        }).catch(e => {
            console.log(e)
            throw new Error(e)
        })
    },


    async GetAllRule(params, flags , user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return RuleGetAll(params, flags).then(res=>{
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
            
            
    async GetAllByFilterRule(filter, params , flags, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return RuleGetAllFilter(filter, params, flags).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new Rule(r.dataValues))
            })
            return output
        })
    },


    async GetAllSearchRule(text, params , flags, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return RuleGetAllSearch(text, params, flags).then(res=>{
            let output = []
            res.forEach(r => {
                output.push(new Rule(r.dataValues))
            })
            return output
        })
    },

    async GetAllSearchCountRule(text, user_ctx) {
        if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }
        return RuleGetAllSearchCount(text)
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