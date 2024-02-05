// generated

const { APP_EVENTS } = require('../app_events');

            


const { DataTypes, Op, Sequelize } = require('sequelize');
const { GetConnect } = require('./connect');
var events = require('events');


                                                    const { DeviceModel } = require('./device');
                                                            const { PlaceModel } = require('./place');
            
const TABLENAME = 'placedevice'



const ERROR_VALIDATE_INVALID_DATA = `invalid data`;
const ERROR_NOT_FOUND = `not found`;
        const ERROR_VALIDATE_DEVICEID = 'error validate data: device_id'
const ERROR_UPDATE_ISSET_DEVICEID = 'error: undefined data: device_id'
    const ERROR_VALIDATE_PLACEID = 'error validate data: place_id'
const ERROR_UPDATE_ISSET_PLACEID = 'error: undefined data: place_id'
 

// Демон
const initional = ()=>{

    const connect = GetConnect(Sequelize)
    const interfaceConnect = connect.getQueryInterface()

    
                    
            interfaceConnect.addColumn(TABLENAME + 's', 'id', { 
                    type: DataTypes.INTEGER,
                }, {  mustExist: false }).catch(()=>{});
            interfaceConnect.addColumn(TABLENAME + 's', 'device_id', { 
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
const PlaceDevice = GetConnect({name: 'PlaceDevice' , deamon : initional}).define(TABLENAME, {
            id: {
                            type: DataTypes.INTEGER,
                                        autoIncrement: true,
                primaryKey: true
                    },
            device_id: {
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
        return PlaceDevice.findOne({
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
                APP_EVENTS.emit(`ADD:placedevice`, data)
                return PlaceDevice.create(data);
            }
        })
    }

    let error = ValidateInsert(data)
    if (error) {
        throw new Error(error)
    }
    return PlaceDevice.create(data);
}


// Поиск по id
const FindById = async (id) => {
    return PlaceDevice.findOne({
        where: {
            id: id
        }
    })
}

// Получение всех записей
const GetAllCount = async (id) => {
    return PlaceDevice.count()
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
                    APP_EVENTS.emit(`DELETE:placedevice:${id}`)
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
    await PlaceDevice.update(data, { where: { id: data.id } })
    APP_EVENTS.emit(`UPDATE:placedevice:${data.id}`)
    return FindById(data.id)
}

// Получение всех записей
const GetAll = async (params, flags = {include: -1}) => {
        return PlaceDevice.findAll(params)
}

// Получение всех записей по вхождению строки куда либо
const GetAllSearch = async (text, params, flags = {include: -1}) => {
    let filter_by_text = []
                                        
    
    return PlaceDevice.findAll({
        where : {
            [Op.or]: filter_by_text
        },
        ...params
    })
}

// Получение всех записей по вхождению строки куда либо
const GetAllSearchCount = async (text) => {
    let filter_by_text = []
                                            return PlaceDevice.count({
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
    return PlaceDevice.count({ where:filter,...filter})
}

// Фильтрация записей. Подходит для касточных запросов
const GetAllFilter = async (filter, params, flags = {include: -1}) => {
    if( Object.keys(filter).length == 0 ){
        return [];
    }

    
    return PlaceDevice.findAll({
        where : filter,
        ...params
    })
}


// Валидация для обновления данных
const ValidateUpdate = (data) => {
                                     

            if (!data || !Object.keys(data).length) {
            return ERROR_VALIDATE_INVALID_DATA
        }
    
                        if (!data.device_id) {
            return ERROR_VALIDATE_DEVICEID
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
    
                        if (!data.device_id) {
            return ERROR_VALIDATE_DEVICEID
        }
                    if (!data.place_id) {
            return ERROR_VALIDATE_PLACEID
        }
         

    return ``
}




module.exports = {

PLACEDEVICE_ERROR_VALIDATE_INVALID_DATA: ERROR_VALIDATE_INVALID_DATA,
PLACEDEVICE_ERROR_NOT_FOUND: ERROR_NOT_FOUND,
                    PLACEDEVICE_ERROR_VALIDATE_DEVICEID: ERROR_VALIDATE_DEVICEID,
                    PLACEDEVICE_ERROR_VALIDATE_PLACEID: ERROR_VALIDATE_PLACEID,
         

    PlaceDeviceGetAll: GetAll,
    PlaceDeviceGetAllCount: GetAllCount,
    PlaceDeviceUpdate: Update,
    PlaceDeviceAdd: Add,
    PlaceDeviceDrop: Drop,
    PlaceDeviceFindById: FindById,
    PlaceDeviceValidateUpdate: ValidateUpdate,
    PlaceDeviceValidateInsert: ValidateInsert,
    PlaceDeviceModel: PlaceDevice,
    PlaceDeviceGetAllFilter: GetAllFilter,
    PlaceDeviceGetAllFilterCount: GetAllFilterCount,
    PlaceDeviceGetAllSearch: GetAllSearch,
    PlaceDeviceGetAllSearchCount: GetAllSearchCount,
    }