// generated

const { APP_EVENTS } = require('../app_events');

            


const { DataTypes, Op, Sequelize } = require('sequelize');
const { GetConnect } = require('./connect');
var events = require('events');


            
const TABLENAME = 'placetype'



const ERROR_VALIDATE_INVALID_DATA = `invalid data`;
const ERROR_NOT_FOUND = `not found`;
        const ERROR_VALIDATE_IDENT = 'error validate data: ident'
const ERROR_UPDATE_ISSET_IDENT = 'error: undefined data: ident'
    const ERROR_VALIDATE_ICON = 'error validate data: icon'
const ERROR_UPDATE_ISSET_ICON = 'error: undefined data: icon'
 

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
            interfaceConnect.addColumn(TABLENAME + 's', 'icon', { 
                    type: DataTypes.STRING,
                }, {  mustExist: false }).catch(()=>{});
        
    setTimeout(()=>{
        let data = {}
                                    data = {}
                                    data['ident'] = 'building'
                                    data['icon'] = 'fa fa-building-o'
                                Add(data).catch(e =>{
                    console.log(e)
                })
                            data = {}
                                    data['ident'] = 'cab'
                                    data['icon'] = 'fa fa-cab'
                                Add(data).catch(e =>{
                    console.log(e)
                })
                            data = {}
                                    data['ident'] = 'folder'
                                    data['icon'] = 'fa fa-folder'
                                Add(data).catch(e =>{
                    console.log(e)
                })
                            data = {}
                                    data['ident'] = 'home'
                                    data['icon'] = 'fa fa-home'
                                Add(data).catch(e =>{
                    console.log(e)
                })
                            data = {}
                                    data['ident'] = 'suitcase'
                                    data['icon'] = 'fa fa-suitcase'
                                Add(data).catch(e =>{
                    console.log(e)
                })
                            data = {}
                                    data['ident'] = 'tree'
                                    data['icon'] = 'fa fa-tree'
                                Add(data).catch(e =>{
                    console.log(e)
                })
                            data = {}
                                    data['ident'] = 'cloud'
                                    data['icon'] = 'fa fa-cloud'
                                Add(data).catch(e =>{
                    console.log(e)
                })
                            data = {}
                                    data['ident'] = 'map-marker'
                                    data['icon'] = 'fa fa-map-marker'
                                Add(data).catch(e =>{
                    console.log(e)
                })
                            data = {}
                                    data['ident'] = 'university'
                                    data['icon'] = 'fa fa-university'
                                Add(data).catch(e =>{
                    console.log(e)
                })
                            data = {}
                                    data['ident'] = 'archive'
                                    data['icon'] = 'fa fa-archive'
                                Add(data).catch(e =>{
                    console.log(e)
                })
                            data = {}
                                    data['ident'] = 'bug'
                                    data['icon'] = 'fa fa-bug'
                                Add(data).catch(e =>{
                    console.log(e)
                })
                            data = {}
                                    data['ident'] = 'book'
                                    data['icon'] = 'fa fa-book'
                                Add(data).catch(e =>{
                    console.log(e)
                })
                            data = {}
                                    data['ident'] = 'coffee'
                                    data['icon'] = 'fa fa-coffee'
                                Add(data).catch(e =>{
                    console.log(e)
                })
                            data = {}
                                    data['ident'] = 'database'
                                    data['icon'] = 'fa fa-database'
                                Add(data).catch(e =>{
                    console.log(e)
                })
                        }, 500)
}

// Инициализация модели
const PlaceType = GetConnect({name: 'PlaceType' , deamon : initional}).define(TABLENAME, {
            id: {
                            type: DataTypes.INTEGER,
                                        autoIncrement: true,
                primaryKey: true
                    },
            ident: {
                            type: DataTypes.STRING,
                                },
            icon: {
                            type: DataTypes.STRING,
                                },
    })




// Добавление записи
const Add = async (data) => {

    let uniques_where = {}
                                                if(typeof data.icon == 'undefined') {
                throw new Error(ERROR_UPDATE_ISSET_ICON)
            }
            uniques_where['icon'] = data.icon
                if(Object.keys(uniques_where).length){
        return PlaceType.findOne({
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
                APP_EVENTS.emit(`ADD:placetype`, data)
                return PlaceType.create(data);
            }
        })
    }

    let error = ValidateInsert(data)
    if (error) {
        throw new Error(error)
    }
    return PlaceType.create(data);
}


// Поиск по id
const FindById = async (id) => {
    return PlaceType.findOne({
        where: {
            id: id
        }
    })
}

// Получение всех записей
const GetAllCount = async (id) => {
    return PlaceType.count()
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
                    APP_EVENTS.emit(`DELETE:placetype:${id}`)
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
    await PlaceType.update(data, { where: { id: data.id } })
    APP_EVENTS.emit(`UPDATE:placetype:${data.id}`)
    return FindById(data.id)
}

// Получение всех записей
const GetAll = async (params, flags = {include: -1}) => {
        return PlaceType.findAll(params)
}

// Получение всех записей по вхождению строки куда либо
const GetAllSearch = async (text, params, flags = {include: -1}) => {
    let filter_by_text = []
                                        
    
    return PlaceType.findAll({
        where : {
            [Op.or]: filter_by_text
        },
        ...params
    })
}

// Получение всех записей по вхождению строки куда либо
const GetAllSearchCount = async (text) => {
    let filter_by_text = []
                                            return PlaceType.count({
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
    return PlaceType.count({ where:filter,...filter})
}

// Фильтрация записей. Подходит для касточных запросов
const GetAllFilter = async (filter, params, flags = {include: -1}) => {
    if( Object.keys(filter).length == 0 ){
        return [];
    }

    
    return PlaceType.findAll({
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
                    if (!data.icon) {
            return ERROR_VALIDATE_ICON
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
                    if (!data.icon) {
            return ERROR_VALIDATE_ICON
        }
         

    return ``
}




module.exports = {

PLACETYPE_ERROR_VALIDATE_INVALID_DATA: ERROR_VALIDATE_INVALID_DATA,
PLACETYPE_ERROR_NOT_FOUND: ERROR_NOT_FOUND,
                    PLACETYPE_ERROR_VALIDATE_IDENT: ERROR_VALIDATE_IDENT,
                    PLACETYPE_ERROR_VALIDATE_ICON: ERROR_VALIDATE_ICON,
         

    PlaceTypeGetAll: GetAll,
    PlaceTypeGetAllCount: GetAllCount,
    PlaceTypeUpdate: Update,
    PlaceTypeAdd: Add,
    PlaceTypeDrop: Drop,
    PlaceTypeFindById: FindById,
    PlaceTypeValidateUpdate: ValidateUpdate,
    PlaceTypeValidateInsert: ValidateInsert,
    PlaceTypeModel: PlaceType,
    PlaceTypeGetAllFilter: GetAllFilter,
    PlaceTypeGetAllFilterCount: GetAllFilterCount,
    PlaceTypeGetAllSearch: GetAllSearch,
    PlaceTypeGetAllSearchCount: GetAllSearchCount,
    }