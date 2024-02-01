// generated

const { APP_EVENTS } = require('../app_events');

            


const { DataTypes, Op, Sequelize } = require('sequelize');
const { GetConnect } = require('./connect');
var events = require('events');


                                                    const { PlaceModel } = require('./place');
                                                            const { UserModel } = require('./user');
            
const TABLENAME = 'userplace'



const ERROR_VALIDATE_INVALID_DATA = `invalid data`;
const ERROR_NOT_FOUND = `not found`;
        const ERROR_VALIDATE_PLACEID = 'error validate data: plce_id'
const ERROR_UPDATE_ISSET_PLACEID = 'error: undefined data: plce_id'
    const ERROR_VALIDATE_USERID = 'error validate data: user_id'
const ERROR_UPDATE_ISSET_USERID = 'error: undefined data: user_id'
 

// Демон
const initional = ()=>{

    const connect = GetConnect(Sequelize)
    const interfaceConnect = connect.getQueryInterface()

    
                    
            interfaceConnect.addColumn(TABLENAME + 's', 'id', { 
                    type: DataTypes.INTEGER,
                }, {  mustExist: false }).catch(()=>{});
            interfaceConnect.addColumn(TABLENAME + 's', 'plce_id', { 
                    type: DataTypes.INTEGER,
                }, {  mustExist: false }).catch(()=>{});
            interfaceConnect.addColumn(TABLENAME + 's', 'user_id', { 
                    type: DataTypes.INTEGER,
                }, {  mustExist: false }).catch(()=>{});
        
    setTimeout(()=>{
        let data = {}
            }, 500)
}

// Инициализация модели
const UserPlace = GetConnect({name: 'UserPlace' , deamon : initional}).define(TABLENAME, {
            id: {
                            type: DataTypes.INTEGER,
                                        autoIncrement: true,
                primaryKey: true
                    },
            plce_id: {
                            type: DataTypes.INTEGER,
                                },
            user_id: {
                            type: DataTypes.INTEGER,
                                },
    })




// Добавление записи
const Add = async (data) => {

    let uniques_where = {}
                                            if(Object.keys(uniques_where).length){
        return UserPlace.findOne({
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
                APP_EVENTS.emit(`ADD:userplace`, data)
                return UserPlace.create(data);
            }
        })
    }

    let error = ValidateInsert(data)
    if (error) {
        throw new Error(error)
    }
    return UserPlace.create(data);
}


// Поиск по id
const FindById = async (id) => {
    return UserPlace.findOne({
        where: {
            id: id
        }
    })
}

// Получение всех записей
const GetAllCount = async (id) => {
    return UserPlace.count()
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
                    APP_EVENTS.emit(`DELETE:userplace:${id}`)
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
    await UserPlace.update(data, { where: { id: data.id } })
    APP_EVENTS.emit(`UPDATE:userplace:${data.id}`)
    return FindById(data.id)
}

// Получение всех записей
const GetAll = async (params, flags = {include: -1}) => {
    if(flags.include != -1){
        params['include'] = []
                                                        let iPlace1 = {
                    model: Place,
                    as : 'places'
                }
                if(flags.include){
                    iPlace1.limit = Number(flags.include)
                }
                params['include'].push(iPlace1)
                                                let iUser2 = {
                    model: User,
                    as : 'users'
                }
                if(flags.include){
                    iUser2.limit = Number(flags.include)
                }
                params['include'].push(iUser2)
                        }
    return UserPlace.findAll(params)
}

// Получение всех записей по вхождению строки куда либо
const GetAllSearch = async (text, params, flags = {include: -1}) => {
    let filter_by_text = []
                                        
    if(flags.include != -1){
        params['include'] = []
                                                        let iPlace1 = {
                    model: Place,
                    as : 'places'
                }
                if(flags.include){
                    iPlace1.limit = Number(flags.include)
                }
                params['include'].push(iPlace1)
                                                let iUser2 = {
                    model: User,
                    as : 'users'
                }
                if(flags.include){
                    iUser2.limit = Number(flags.include)
                }
                params['include'].push(iUser2)
                        }

    return UserPlace.findAll({
        where : {
            [Op.or]: filter_by_text
        },
        ...params
    })
}

// Получение всех записей по вхождению строки куда либо
const GetAllSearchCount = async (text) => {
    let filter_by_text = []
                                            return UserPlace.count({
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
    return UserPlace.count({ where:filter,...filter})
}

// Фильтрация записей. Подходит для касточных запросов
const GetAllFilter = async (filter, params, flags = {include: -1}) => {
    if( Object.keys(filter).length == 0 ){
        return [];
    }

    if(flags.include != -1){
        params['include'] = []
                                                        let iPlace1 = {
                    model: Place,
                    as : 'places'
                }
                if(flags.include){
                    iPlace1.limit = Number(flags.include)
                }
                params['include'].push(iPlace1)
                                                let iUser2 = {
                    model: User,
                    as : 'users'
                }
                if(flags.include){
                    iUser2.limit = Number(flags.include)
                }
                params['include'].push(iUser2)
                        }

    return UserPlace.findAll({
        where : filter,
        ...params
    })
}


// Валидация для обновления данных
const ValidateUpdate = (data) => {
                                     

            if (!data || !Object.keys(data).length) {
            return ERROR_VALIDATE_INVALID_DATA
        }
    
                        if (!data.plce_id) {
            return ERROR_VALIDATE_PLACEID
        }
                    if (!data.user_id) {
            return ERROR_VALIDATE_USERID
        }
         

    return ``
}

// Валидация для вставки данных
const ValidateInsert = (data) => {
                                     

            if (!data || !Object.keys(data).length) {
            return ERROR_VALIDATE_INVALID_DATA
        }
    
                        if (!data.plce_id) {
            return ERROR_VALIDATE_PLACEID
        }
                    if (!data.user_id) {
            return ERROR_VALIDATE_USERID
        }
         

    return ``
}




module.exports = {

USERPLACE_ERROR_VALIDATE_INVALID_DATA: ERROR_VALIDATE_INVALID_DATA,
USERPLACE_ERROR_NOT_FOUND: ERROR_NOT_FOUND,
                    USERPLACE_ERROR_VALIDATE_PLACEID: ERROR_VALIDATE_PLACEID,
                    USERPLACE_ERROR_VALIDATE_USERID: ERROR_VALIDATE_USERID,
         

    UserPlaceGetAll: GetAll,
    UserPlaceGetAllCount: GetAllCount,
    UserPlaceUpdate: Update,
    UserPlaceAdd: Add,
    UserPlaceDrop: Drop,
    UserPlaceFindById: FindById,
    UserPlaceValidateUpdate: ValidateUpdate,
    UserPlaceValidateInsert: ValidateInsert,
    UserPlaceModel: UserPlace,
    UserPlaceGetAllFilter: GetAllFilter,
    UserPlaceGetAllFilterCount: GetAllFilterCount,
    UserPlaceGetAllSearch: GetAllSearch,
    UserPlaceGetAllSearchCount: GetAllSearchCount,
    }