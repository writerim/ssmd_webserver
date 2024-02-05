// generated

const { APP_EVENTS } = require('../app_events');

                


const { DataTypes, Op, Sequelize } = require('sequelize');
const { GetConnect } = require('./connect');
var events = require('events');


                
const TABLENAME = 'pooler'



const ERROR_VALIDATE_INVALID_DATA = `invalid data`;
const ERROR_NOT_FOUND = `not found`;
        const ERROR_VALIDATE_NAME = 'error validate data: name'
const ERROR_UPDATE_ISSET_NAME = 'error: undefined data: name'
    const ERROR_VALIDATE_UUID = 'error validate data: uuid'
const ERROR_UPDATE_ISSET_UUID = 'error: undefined data: uuid'
     

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
            interfaceConnect.addColumn(TABLENAME + 's', 'uuid', { 
                    type: DataTypes.STRING,
                }, {  mustExist: false }).catch(()=>{});
            interfaceConnect.addColumn(TABLENAME + 's', 'settings', { 
                    type: DataTypes.JSON(DataTypes.STRING),
                }, {  mustExist: false }).catch(()=>{});
        
    setTimeout(()=>{
        let data = {}
            }, 500)
}

// Инициализация модели
const Pooler = GetConnect({name: 'Pooler' , deamon : initional}).define(TABLENAME, {
            id: {
                            type: DataTypes.INTEGER,
                                        autoIncrement: true,
                primaryKey: true
                    },
            name: {
                            type: DataTypes.STRING,
                                },
            uuid: {
                            type: DataTypes.STRING,
                                },
            settings: {
                            type: DataTypes.JSON(DataTypes.STRING),
                                },
    })




// Добавление записи
const Add = async (data) => {

    let uniques_where = {}
                                                if(typeof data.uuid == 'undefined') {
                throw new Error(ERROR_UPDATE_ISSET_UUID)
            }
            uniques_where['uuid'] = data.uuid
                            if(Object.keys(uniques_where).length){
        return Pooler.findOne({
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
                APP_EVENTS.emit(`ADD:pooler`, data)
                return Pooler.create(data);
            }
        })
    }

    let error = ValidateInsert(data)
    if (error) {
        throw new Error(error)
    }
    return Pooler.create(data);
}


// Поиск по id
const FindById = async (id) => {
    return Pooler.findOne({
        where: {
            id: id
        }
    })
}

// Получение всех записей
const GetAllCount = async (id) => {
    return Pooler.count()
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
                    APP_EVENTS.emit(`DELETE:pooler:${id}`)
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
    await Pooler.update(data, { where: { id: data.id } })
    APP_EVENTS.emit(`UPDATE:pooler:${data.id}`)
    return FindById(data.id)
}

// Получение всех записей
const GetAll = async (params, flags = {include: -1}) => {
        return Pooler.findAll(params)
}

// Получение всех записей по вхождению строки куда либо
const GetAllSearch = async (text, params, flags = {include: -1}) => {
    let filter_by_text = []
                                                    
    
    return Pooler.findAll({
        where : {
            [Op.or]: filter_by_text
        },
        ...params
    })
}

// Получение всех записей по вхождению строки куда либо
const GetAllSearchCount = async (text) => {
    let filter_by_text = []
                                                        return Pooler.count({
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
    return Pooler.count({ where:filter,...filter})
}

// Фильтрация записей. Подходит для касточных запросов
const GetAllFilter = async (filter, params, flags = {include: -1}) => {
    if( Object.keys(filter).length == 0 ){
        return [];
    }

    
    return Pooler.findAll({
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
                    if (!data.uuid) {
            return ERROR_VALIDATE_UUID
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
                    if (!data.uuid) {
            return ERROR_VALIDATE_UUID
        }
                 

    return ``
}




module.exports = {

POOLER_ERROR_VALIDATE_INVALID_DATA: ERROR_VALIDATE_INVALID_DATA,
POOLER_ERROR_NOT_FOUND: ERROR_NOT_FOUND,
                    POOLER_ERROR_VALIDATE_NAME: ERROR_VALIDATE_NAME,
                    POOLER_ERROR_VALIDATE_UUID: ERROR_VALIDATE_UUID,
                 

    PoolerGetAll: GetAll,
    PoolerGetAllCount: GetAllCount,
    PoolerUpdate: Update,
    PoolerAdd: Add,
    PoolerDrop: Drop,
    PoolerFindById: FindById,
    PoolerValidateUpdate: ValidateUpdate,
    PoolerValidateInsert: ValidateInsert,
    PoolerModel: Pooler,
    PoolerGetAllFilter: GetAllFilter,
    PoolerGetAllFilterCount: GetAllFilterCount,
    PoolerGetAllSearch: GetAllSearch,
    PoolerGetAllSearchCount: GetAllSearchCount,
    }