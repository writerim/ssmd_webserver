// generated

const { APP_EVENTS } = require('../app_events');

                                                        


const { DataTypes, Op, Sequelize } = require('sequelize');
const { GetConnect } = require('./connect');
var events = require('events');


                                                        
const TABLENAME = 'mod'



const ERROR_VALIDATE_INVALID_DATA = `invalid data`;
const ERROR_NOT_FOUND = `not found`;
                                    const ERROR_VALIDATE_TYPESDEVICE = 'error validate data: types_device'
const ERROR_UPDATE_ISSET_TYPESDEVICE = 'error: undefined data: types_device'
                     

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
            interfaceConnect.addColumn(TABLENAME + 's', 'version', { 
                    type: DataTypes.STRING,
                }, {  mustExist: false }).catch(()=>{});
            interfaceConnect.addColumn(TABLENAME + 's', 'manufactures', { 
                    type: DataTypes.STRING,
                }, {  mustExist: false }).catch(()=>{});
            interfaceConnect.addColumn(TABLENAME + 's', 'mark', { 
                    type: DataTypes.STRING,
                }, {  mustExist: false }).catch(()=>{});
            interfaceConnect.addColumn(TABLENAME + 's', 'model', { 
                    type: DataTypes.STRING,
                }, {  mustExist: false }).catch(()=>{});
            interfaceConnect.addColumn(TABLENAME + 's', 'series', { 
                    type: DataTypes.STRING,
                }, {  mustExist: false }).catch(()=>{});
            interfaceConnect.addColumn(TABLENAME + 's', 'sowt_version', { 
                    type: DataTypes.STRING,
                }, {  mustExist: false }).catch(()=>{});
            interfaceConnect.addColumn(TABLENAME + 's', 'types_device', { 
                    type: DataTypes.JSON(DataTypes.STRING),
                }, {  mustExist: false }).catch(()=>{});
            interfaceConnect.addColumn(TABLENAME + 's', 'cron_parameters', { 
                    type: DataTypes.JSON(DataTypes.STRING),
                }, {  mustExist: false }).catch(()=>{});
            interfaceConnect.addColumn(TABLENAME + 's', 'commands', { 
                    type: DataTypes.JSON(DataTypes.STRING),
                }, {  mustExist: false }).catch(()=>{});
            interfaceConnect.addColumn(TABLENAME + 's', 'parameters', { 
                    type: DataTypes.JSON(DataTypes.STRING),
                }, {  mustExist: false }).catch(()=>{});
            interfaceConnect.addColumn(TABLENAME + 's', 'time_settings', { 
                    type: DataTypes.JSON(DataTypes.STRING),
                }, {  mustExist: false }).catch(()=>{});
            interfaceConnect.addColumn(TABLENAME + 's', 'device_parameters', { 
                    type: DataTypes.JSON(DataTypes.STRING),
                }, {  mustExist: false }).catch(()=>{});
        
    setTimeout(()=>{
        let data = {}
            }, 500)
}

// Инициализация модели
const Mod = GetConnect({name: 'Mod' , deamon : initional}).define(TABLENAME, {
            id: {
                            type: DataTypes.INTEGER,
                                        autoIncrement: true,
                primaryKey: true
                    },
            ident: {
                            type: DataTypes.STRING,
                                },
            version: {
                            type: DataTypes.STRING,
                                },
            manufactures: {
                            type: DataTypes.STRING,
                                },
            mark: {
                            type: DataTypes.STRING,
                                },
            model: {
                            type: DataTypes.STRING,
                                },
            series: {
                            type: DataTypes.STRING,
                                },
            sowt_version: {
                            type: DataTypes.STRING,
                                },
            types_device: {
                            type: DataTypes.JSON(DataTypes.STRING),
                                },
            cron_parameters: {
                            type: DataTypes.JSON(DataTypes.STRING),
                                },
            commands: {
                            type: DataTypes.JSON(DataTypes.STRING),
                                },
            parameters: {
                            type: DataTypes.JSON(DataTypes.STRING),
                                },
            time_settings: {
                            type: DataTypes.JSON(DataTypes.STRING),
                                },
            device_parameters: {
                            type: DataTypes.JSON(DataTypes.STRING),
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
        return Mod.findOne({
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
                APP_EVENTS.emit(`ADD:mod`, data)
                return Mod.create(data);
            }
        })
    }

    let error = ValidateInsert(data)
    if (error) {
        throw new Error(error)
    }
    return Mod.create(data);
}


// Поиск по id
const FindById = async (id) => {
    return Mod.findOne({
        where: {
            id: id
        }
    })
}

// Получение всех записей
const GetAllCount = async (id) => {
    return Mod.count()
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
                    APP_EVENTS.emit(`DELETE:mod:${id}`)
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
    await Mod.update(data, { where: { id: data.id } })
    APP_EVENTS.emit(`UPDATE:mod:${data.id}`)
    return FindById(data.id)
}

// Получение всех записей
const GetAll = async (params, flags = {include: -1}) => {
    if(flags.include != -1){
        params['include'] = []
                                                                                                                                                                                                                                                                                                    }
    return Mod.findAll(params)
}

// Получение всех записей по вхождению строки куда либо
const GetAllSearch = async (text, params, flags = {include: -1}) => {
    let filter_by_text = []
                                                                                                                                                                            
    if(flags.include != -1){
        params['include'] = []
                                                                                                                                                                                                                                                                                                    }

    return Mod.findAll({
        where : {
            [Op.or]: filter_by_text
        },
        ...params
    })
}

// Получение всех записей по вхождению строки куда либо
const GetAllSearchCount = async (text) => {
    let filter_by_text = []
                                                                                                                                                                                return Mod.count({
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
    return Mod.count({ where:filter,...filter})
}

// Фильтрация записей. Подходит для касточных запросов
const GetAllFilter = async (filter, params, flags = {include: -1}) => {
    if( Object.keys(filter).length == 0 ){
        return [];
    }

    if(flags.include != -1){
        params['include'] = []
                                                                                                                                                                                                                                                                                                    }

    return Mod.findAll({
        where : filter,
        ...params
    })
}


// Валидация для обновления данных
const ValidateUpdate = (data) => {
                                                                                             

            if (!data || !Object.keys(data).length) {
            return ERROR_VALIDATE_INVALID_DATA
        }
    
                                                                                if (!data.types_device) {
            return ERROR_VALIDATE_TYPESDEVICE
        }
                                                 

    return ``
}

// Валидация для вставки данных
const ValidateInsert = (data) => {
                                                                                             

            if (!data || !Object.keys(data).length) {
            return ERROR_VALIDATE_INVALID_DATA
        }
    
                                                                                if (!data.types_device) {
            return ERROR_VALIDATE_TYPESDEVICE
        }
                                                 

    return ``
}




module.exports = {

MOD_ERROR_VALIDATE_INVALID_DATA: ERROR_VALIDATE_INVALID_DATA,
MOD_ERROR_NOT_FOUND: ERROR_NOT_FOUND,
                                                                            MOD_ERROR_VALIDATE_TYPESDEVICE: ERROR_VALIDATE_TYPESDEVICE,
                                                 

    ModGetAll: GetAll,
    ModGetAllCount: GetAllCount,
    ModUpdate: Update,
    ModAdd: Add,
    ModDrop: Drop,
    ModFindById: FindById,
    ModValidateUpdate: ValidateUpdate,
    ModValidateInsert: ValidateInsert,
    ModModel: Mod,
    ModGetAllFilter: GetAllFilter,
    ModGetAllFilterCount: GetAllFilterCount,
    ModGetAllSearch: GetAllSearch,
    ModGetAllSearchCount: GetAllSearchCount,
    }