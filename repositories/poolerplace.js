// generated

const { APP_EVENTS } = require('../app_events');

            


const { DataTypes, Op, Sequelize } = require('sequelize');
const { GetConnect } = require('./connect');
var events = require('events');


            
const TABLENAME = 'poolerplace'



const ERROR_VALIDATE_INVALID_DATA = `invalid data`;
const ERROR_NOT_FOUND = `not found`;
        const ERROR_VALIDATE_POOLERID = 'error validate data: pooler_id'
const ERROR_UPDATE_ISSET_POOLERID = 'error: undefined data: pooler_id'
    const ERROR_VALIDATE_PLACEID = 'error validate data: place_id'
const ERROR_UPDATE_ISSET_PLACEID = 'error: undefined data: place_id'
 

// Демон
const initional = ()=>{

    const connect = GetConnect(Sequelize)
    const interfaceConnect = connect.getQueryInterface()

    
                    
            interfaceConnect.addColumn(TABLENAME + 's', 'id', { 
                    type: DataTypes.INTEGER,
                }, {  mustExist: false }).catch(()=>{});
            interfaceConnect.addColumn(TABLENAME + 's', 'pooler_id', { 
                    type: DataTypes.INTEGER,
                }, {  mustExist: false }).catch(()=>{});
            interfaceConnect.addColumn(TABLENAME + 's', 'place_id', { 
                    type: DataTypes.INTEGER,
                }, {  mustExist: false }).catch(()=>{});
        
    setTimeout(()=>{
        let data = {}
            }, 500)
}

// Инициализация модели
const PoolerPlace = GetConnect({name: 'PoolerPlace' , deamon : initional}).define(TABLENAME, {
            id: {
                            type: DataTypes.INTEGER,
                                        autoIncrement: true,
                primaryKey: true
                    },
            pooler_id: {
                            type: DataTypes.INTEGER,
                                },
            place_id: {
                            type: DataTypes.INTEGER,
                                },
    })




// Добавление записи
const Add = async (data) => {

    let uniques_where = {}
                                            if(Object.keys(uniques_where).length){
        return PoolerPlace.findOne({
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
                APP_EVENTS.emit(`ADD:poolerplace`, data)
                return PoolerPlace.create(data);
            }
        })
    }

    let error = ValidateInsert(data)
    if (error) {
        throw new Error(error)
    }
    return PoolerPlace.create(data);
}


// Поиск по id
const FindById = async (id) => {
    return PoolerPlace.findOne({
        where: {
            id: id
        }
    })
}

// Получение всех записей
const GetAllCount = async (id) => {
    return PoolerPlace.count()
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
                    APP_EVENTS.emit(`DELETE:poolerplace:${id}`)
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
    await PoolerPlace.update(data, { where: { id: data.id } })
    APP_EVENTS.emit(`UPDATE:poolerplace:${data.id}`)
    return FindById(data.id)
}

// Получение всех записей
const GetAll = async (params, flags = {include: -1}) => {
        return PoolerPlace.findAll(params)
}

// Получение всех записей по вхождению строки куда либо
const GetAllSearch = async (text, params, flags = {include: -1}) => {
    let filter_by_text = []
                                        
    
    return PoolerPlace.findAll({
        where : {
            [Op.or]: filter_by_text
        },
        ...params
    })
}

// Получение всех записей по вхождению строки куда либо
const GetAllSearchCount = async (text) => {
    let filter_by_text = []
                                            return PoolerPlace.count({
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
    return PoolerPlace.count({ where:filter,...filter})
}

// Фильтрация записей. Подходит для касточных запросов
const GetAllFilter = async (filter, params, flags = {include: -1}) => {
    if( Object.keys(filter).length == 0 ){
        return [];
    }

    
    return PoolerPlace.findAll({
        where : filter,
        ...params
    })
}


// Валидация для обновления данных
const ValidateUpdate = (data) => {
                                     

            if (!data || !Object.keys(data).length) {
            return ERROR_VALIDATE_INVALID_DATA
        }
    
                        if (!data.pooler_id) {
            return ERROR_VALIDATE_POOLERID
        }
                    if (!data.place_id) {
            return ERROR_VALIDATE_PLACEID
        }
         

    return ``
}

// Валидация для вставки данных
const ValidateInsert = (data) => {
                                     

            if (!data || !Object.keys(data).length) {
            return ERROR_VALIDATE_INVALID_DATA
        }
    
                        if (!data.pooler_id) {
            return ERROR_VALIDATE_POOLERID
        }
                    if (!data.place_id) {
            return ERROR_VALIDATE_PLACEID
        }
         

    return ``
}




module.exports = {

POOLERPLACE_ERROR_VALIDATE_INVALID_DATA: ERROR_VALIDATE_INVALID_DATA,
POOLERPLACE_ERROR_NOT_FOUND: ERROR_NOT_FOUND,
                    POOLERPLACE_ERROR_VALIDATE_POOLERID: ERROR_VALIDATE_POOLERID,
                    POOLERPLACE_ERROR_VALIDATE_PLACEID: ERROR_VALIDATE_PLACEID,
         

    PoolerPlaceGetAll: GetAll,
    PoolerPlaceGetAllCount: GetAllCount,
    PoolerPlaceUpdate: Update,
    PoolerPlaceAdd: Add,
    PoolerPlaceDrop: Drop,
    PoolerPlaceFindById: FindById,
    PoolerPlaceValidateUpdate: ValidateUpdate,
    PoolerPlaceValidateInsert: ValidateInsert,
    PoolerPlaceModel: PoolerPlace,
    PoolerPlaceGetAllFilter: GetAllFilter,
    PoolerPlaceGetAllFilterCount: GetAllFilterCount,
    PoolerPlaceGetAllSearch: GetAllSearch,
    PoolerPlaceGetAllSearchCount: GetAllSearchCount,
    }