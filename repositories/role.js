// generated

const { APP_EVENTS } = require('../app_events');

            


const { DataTypes, Op, Sequelize } = require('sequelize');
const { GetConnect } = require('./connect');
var events = require('events');


            
const TABLENAME = 'role'



const ERROR_VALIDATE_INVALID_DATA = `invalid data`;
const ERROR_NOT_FOUND = `not found`;
        const ERROR_VALIDATE_NAME = 'error validate data: name'
const ERROR_UPDATE_ISSET_NAME = 'error: undefined data: name'
    const ERROR_VALIDATE_DESCRIPTION = 'error validate data: description'
const ERROR_UPDATE_ISSET_DESCRIPTION = 'error: undefined data: description'
 

// Демон
const initional = ()=>{

    const connect = GetConnect(Sequelize)
    const interfaceConnect = connect.getQueryInterface()

    
                    
            interfaceConnect.addColumn(TABLENAME + 's', 'id', { 
                    type: DataTypes.INTEGER,
                }, {  mustExist: false }).catch(()=>{});
            interfaceConnect.addColumn(TABLENAME + 's', 'name', { 
                    type: DataTypes.STRING,
                }, {  mustExist: false }).catch(()=>{});
            interfaceConnect.addColumn(TABLENAME + 's', 'description', { 
                    type: DataTypes.STRING,
                }, {  mustExist: false }).catch(()=>{});
        
    setTimeout(()=>{
        let data = {}
            }, 500)
}

// Инициализация модели
const Role = GetConnect({name: 'Role' , deamon : initional}).define(TABLENAME, {
            id: {
                            type: DataTypes.INTEGER,
                                        autoIncrement: true,
                primaryKey: true
                    },
            name: {
                            type: DataTypes.STRING,
                                },
            description: {
                            type: DataTypes.STRING,
                                },
    })




// Добавление записи
const Add = async (data) => {

    let uniques_where = {}
                                            if(Object.keys(uniques_where).length){
        return Role.findOne({
            where: uniques_where
        }).then(res=>{
            if(res){
                data.id = res.get('id')
                return Update(data)
            }else{
                let error = ValidateInsert(data)
                if (error) {
                    throw new Error(error)
                }
                APP_EVENTS.emit(`ADD:role`, data)
                return Role.create(data);
            }
        })
    }

    let error = ValidateInsert(data)
    if (error) {
        throw new Error(error)
    }
    return Role.create(data);
}


// Поиск по id
const FindById = async (id) => {
    return Role.findOne({
        where: {
            id: id
        }
    })
}

// Получение всех записей
const GetAllCount = async (id) => {
    return Role.count()
}

// Удаление записи по id
const Drop = async (id) => {
    return FindById(id).then(res => {
        if(!res){
            throw new Error(ERROR_NOT_FOUND)
        }
        return res.destroy().then(res => {
            return new Promise(resolve => {
                if(res._modelOptions.whereCollection){
                    resolve({result : true})
                    APP_EVENTS.emit(`DELETE:role:${id}`)
                }
                throw new Error(ERROR_DROP_MODEL)
            })
        })
    })
}

// Обновление записи
const Update = async (data) => {
    let error = ValidateUpdate(data)
    if (error) {
        throw new Error(error)
    }
    await Role.update(data, { where: { id: data.id } })
    APP_EVENTS.emit(`UPDATE:role:${data.id}`)
    return FindById(data.id)
}

// Получение всех записей
const GetAll = async (params, flags = {include: -1}) => {
    if(flags.include != -1){
        params['include'] = []
                                                                        }
    return Role.findAll(params)
}

// Получение всех записей по вхождению строки куда либо
const GetAllSearch = async (text, params, flags = {include: -1}) => {
    let filter_by_text = []
                                        
    if(flags.include != -1){
        params['include'] = []
                                                                        }

    return Role.findAll({
        where : {
            [Op.or]: filter_by_text
        },
        ...params
    })
}

// Получение всех записей по вхождению строки куда либо
const GetAllSearchCount = async (text) => {
    let filter_by_text = []
                                            return Role.count({
        where : {
            [Op.or]: filter_by_text
        }
    })
}


// Получение общего кол-ва записей по фильтру. Подходит для касточных запросов
const GetAllFilterCount = async (filter) => {
    if( Object.keys(filter).length == 0 ){
        return 0;
    }
    return Role.count({ where:filter,...filter})
}

// Фильтрация записей. Подходит для касточных запросов
const GetAllFilter = async (filter, params, flags = {include: -1}) => {
    if( Object.keys(filter).length == 0 ){
        return [];
    }

    if(flags.include != -1){
        params['include'] = []
                                                                        }

    return Role.findAll({
        where : filter,
        ...params
    })
}


// Валидация для обновления данных
const ValidateUpdate = (data) => {
                                     

            if (!data || !Object.keys(data).length) {
            return ERROR_VALIDATE_INVALID_DATA
        }
    
                        if (!data.name) {
            return ERROR_VALIDATE_NAME
        }
                    if (!data.description) {
            return ERROR_VALIDATE_DESCRIPTION
        }
         

    return ``
}

// Валидация для вставки данных
const ValidateInsert = (data) => {
                                     

            if (!data || !Object.keys(data).length) {
            return ERROR_VALIDATE_INVALID_DATA
        }
    
                        if (!data.name) {
            return ERROR_VALIDATE_NAME
        }
                    if (!data.description) {
            return ERROR_VALIDATE_DESCRIPTION
        }
         

    return ``
}




module.exports = {

ROLE_ERROR_VALIDATE_INVALID_DATA: ERROR_VALIDATE_INVALID_DATA,
ROLE_ERROR_NOT_FOUND: ERROR_NOT_FOUND,
                    ROLE_ERROR_VALIDATE_NAME: ERROR_VALIDATE_NAME,
                    ROLE_ERROR_VALIDATE_DESCRIPTION: ERROR_VALIDATE_DESCRIPTION,
         

    RoleGetAll: GetAll,
    RoleGetAllCount: GetAllCount,
    RoleUpdate: Update,
    RoleAdd: Add,
    RoleDrop: Drop,
    RoleFindById: FindById,
    RoleValidateUpdate: ValidateUpdate,
    RoleValidateInsert: ValidateInsert,
    RoleModel: Role,
    RoleGetAllFilter: GetAllFilter,
    RoleGetAllFilterCount: GetAllFilterCount,
    RoleGetAllSearch: GetAllSearch,
    RoleGetAllSearchCount: GetAllSearchCount,
    }