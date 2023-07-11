// generated May 18, 2023

             



const { DataTypes } = require('sequelize');
const { GetConnect } = require('./connect');
var events = require('events');

const TABLENAME = 'rolerule'



const ERROR_VALIDATE_INVALID_DATA = `invalid data`;
const ERROR_NOT_FOUND = `not found`;
        const ERROR_VALIDATE_ROLEID = 'error validate date role_id'
        const ERROR_VALIDATE_RULEID = 'error validate date rule_id'
     

const RoleRule = GetConnect().define(TABLENAME, {
            id: {
                            type: DataTypes.INTEGER,
                                        autoIncrement: true,
                primaryKey: true
                    },
            role_id: {
                            type: DataTypes.INTEGER,
                                },
            rule_id: {
                            type: DataTypes.INTEGER,
                                },
    });



// Добавление сообщения к смене
const Add = async (data) => {
    let error = Validate(data)
    if (error) {
        throw new Error(error)
    }
    return RoleRule.create(data);
}


// Поиск по id
const FindById = async (id) => {
    return RoleRule.findOne({
        where: {
            id: id
        }
    })
}

// Поиск по id
const Drop = async (id) => {
    return FindById(id).then(res => {
        if(!res){
            throw new Error(ERROR_NOT_FOUND)
        }
        return res.destroy().then(res => {
            return new Promise(resolve => {
                if(res._modelOptions.whereCollection){
                    resolve({result : true})
                }
                throw new Error(ERROR_DROP_MODEL)
            })
        }).catch(e => {
            console.log(e)
        })
    }).catch(e => {
        console.log(e)
    })
}

const Update = async (data) => {
    let error = Validate(data)
    if (error) {
        throw new Error(error)
    }
    return RoleRule.update(data, { where: { id: data.id } })
}

const GetAll = async () => {
    return RoleRule.findAll()
}

const Validate = (data) => {
                                     
    
            if (!data) {
            return ERROR_VALIDATE_INVALID_DATA
        }
    
                        if (!data.role_id) {
            return ERROR_VALIDATE_ROLEID
        }
                    if (!data.rule_id) {
            return ERROR_VALIDATE_RULEID
        }
         

    return ``
}




module.exports = {

ROLERULE_ERROR_VALIDATE_INVALID_DATA: ERROR_VALIDATE_INVALID_DATA,
ROLERULE_ERROR_NOT_FOUND: ERROR_NOT_FOUND,
                    ROLERULE_ERROR_VALIDATE_ROLEID: ERROR_VALIDATE_ROLEID,
                    ROLERULE_ERROR_VALIDATE_RULEID: ERROR_VALIDATE_RULEID,
         

    RoleRuleGetAll: GetAll,
    RoleRuleUpdate: Update,
    RoleRuleAdd: Add,
    RoleRuleDrop: Drop,
    RoleRuleFindById: FindById,
    RoleRuleValidate: Validate,
    }