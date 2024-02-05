// generated

const { APP_EVENTS } = require('../app_events');

        


const { DataTypes, Op, Sequelize } = require('sequelize');
const { GetConnect } = require('./connect');
var events = require('events');


        
const TABLENAME = 'parameter'



const ERROR_VALIDATE_INVALID_DATA = `invalid data`;
const ERROR_NOT_FOUND = `not found`;
        const ERROR_VALIDATE_IDENT = 'error validate data: ident'
const ERROR_UPDATE_ISSET_IDENT = 'error: undefined data: ident'
 

// Демон
const initional = ()=>{

    const connect = GetConnect(Sequelize)
    const interfaceConnect = connect.getQueryInterface()

    
                    
            interfaceConnect.addColumn(TABLENAME + 's', 'id', { 
                    type: DataTypes.INTEGER,
                }, {  mustExist: false }).catch(()=>{});
            interfaceConnect.addColumn(TABLENAME + 's', 'ident', { 
                    type: DataTypes.STRING,
                }, {  mustExist: false }).catch(()=>{});
        
    setTimeout(()=>{
        let data = {}
            }, 500)
}

// Инициализация модели
const Parameter = GetConnect({name: 'Parameter' , deamon : initional}).define(TABLENAME, {
            id: {
                            type: DataTypes.INTEGER,
                                        autoIncrement: true,
                primaryKey: true
                    },
            ident: {
                            type: DataTypes.STRING,
                                },
    })




// Добавление записи
const Add = async (data) => {

    let uniques_where = {}
                                    if(typeof data.ident == 'undefined') {
                throw new Error(ERROR_UPDATE_ISSET_IDENT)
            }
            uniques_where['ident'] = data.ident
                if(Object.keys(uniques_where).length){
        return Parameter.findOne({
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
                APP_EVENTS.emit(`ADD:parameter`, data)
                return Parameter.create(data);
            }
        })
    }

    let error = ValidateInsert(data)
    if (error) {
        throw new Error(error)
    }
    return Parameter.create(data);
}


// Поиск по id
const FindById = async (id) => {
    return Parameter.findOne({
        where: {
            id: id
        }
    })
}

// Получение всех записей
const GetAllCount = async (id) => {
    return Parameter.count()
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
                    APP_EVENTS.emit(`DELETE:parameter:${id}`)
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
    await Parameter.update(data, { where: { id: data.id } })
    APP_EVENTS.emit(`UPDATE:parameter:${data.id}`)
    return FindById(data.id)
}

// Получение всех записей
const GetAll = async (params, flags = {include: -1}) => {
        return Parameter.findAll(params)
}

// Получение всех записей по вхождению строки куда либо
const GetAllSearch = async (text, params, flags = {include: -1}) => {
    let filter_by_text = []
                            
    
    return Parameter.findAll({
        where : {
            [Op.or]: filter_by_text
        },
        ...params
    })
}

// Получение всех записей по вхождению строки куда либо
const GetAllSearchCount = async (text) => {
    let filter_by_text = []
                                return Parameter.count({
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
    return Parameter.count({ where:filter,...filter})
}

// Фильтрация записей. Подходит для касточных запросов
const GetAllFilter = async (filter, params, flags = {include: -1}) => {
    if( Object.keys(filter).length == 0 ){
        return [];
    }

    
    return Parameter.findAll({
        where : filter,
        ...params
    })
}


// Валидация для обновления данных
const ValidateUpdate = (data) => {
                                     

            if (!data || !Object.keys(data).length) {
            return ERROR_VALIDATE_INVALID_DATA
        }
    
                        if (!data.ident) {
            return ERROR_VALIDATE_IDENT
        }
         

    return ``
}

// Валидация для вставки данных
const ValidateInsert = (data) => {
                                     

            if (!data || !Object.keys(data).length) {
            return ERROR_VALIDATE_INVALID_DATA
        }
    
                        if (!data.ident) {
            return ERROR_VALIDATE_IDENT
        }
         

    return ``
}




module.exports = {

PARAMETER_ERROR_VALIDATE_INVALID_DATA: ERROR_VALIDATE_INVALID_DATA,
PARAMETER_ERROR_NOT_FOUND: ERROR_NOT_FOUND,
                    PARAMETER_ERROR_VALIDATE_IDENT: ERROR_VALIDATE_IDENT,
         

    ParameterGetAll: GetAll,
    ParameterGetAllCount: GetAllCount,
    ParameterUpdate: Update,
    ParameterAdd: Add,
    ParameterDrop: Drop,
    ParameterFindById: FindById,
    ParameterValidateUpdate: ValidateUpdate,
    ParameterValidateInsert: ValidateInsert,
    ParameterModel: Parameter,
    ParameterGetAllFilter: GetAllFilter,
    ParameterGetAllFilterCount: GetAllFilterCount,
    ParameterGetAllSearch: GetAllSearch,
    ParameterGetAllSearchCount: GetAllSearchCount,
    }