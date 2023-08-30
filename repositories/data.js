// generated

                    


const { DataTypes, Op } = require('sequelize');
const { GetConnect } = require('./connect');
var events = require('events');

const TABLENAME = 'data'



const ERROR_VALIDATE_INVALID_DATA = `invalid data`;
const ERROR_NOT_FOUND = `not found`;
        const ERROR_VALIDATE_DEVICEID = 'error validate data: device_id'
    const ERROR_VALIDATE_PARAMETERID = 'error validate data: parameter_id'
    const ERROR_VALIDATE_DATA = 'error validate data: data'
    const ERROR_VALIDATE_DATE = 'error validate data: date'
 

const initional = ()=>{

    
        
            GetConnect().getQueryInterface().addColumn(TABLENAME + '', 'id', { 
                    type: DataTypes.INTEGER,
                }, {  mustExist: false }).catch(()=>{});
            GetConnect().getQueryInterface().addColumn(TABLENAME + '', 'device_id', { 
                    type: DataTypes.INTEGER,
                }, {  mustExist: false }).catch(()=>{});
            GetConnect().getQueryInterface().addColumn(TABLENAME + '', 'parameter_id', { 
                    type: DataTypes.INTEGER,
                }, {  mustExist: false }).catch(()=>{});
            GetConnect().getQueryInterface().addColumn(TABLENAME + '', 'data', { 
                    type: DataTypes.JSON(DataTypes.STRING),
                }, {  mustExist: false }).catch(()=>{});
            GetConnect().getQueryInterface().addColumn(TABLENAME + '', 'date', { 
                    type: DataTypes.DATE,
                }, {  mustExist: false }).catch(()=>{});
        
    setTimeout(()=>{
        let data = {}
            }, 500)
}

const Data = GetConnect({name: 'Data' , deamon : initional}).define(TABLENAME, {
            id: {
                            type: DataTypes.INTEGER,
                                        autoIncrement: true,
                primaryKey: true
                    },
            device_id: {
                            type: DataTypes.INTEGER,
                                },
            parameter_id: {
                            type: DataTypes.INTEGER,
                                },
            data: {
                            type: DataTypes.JSON(DataTypes.STRING),
                                },
            date: {
                            type: DataTypes.DATE,
                                },
    })


// Добавление сообщения к смене
const Add = async (data) => {

    let uniques_where = {}
                                                                    if(Object.keys(uniques_where).length){
        return Data.findOne({
            where: uniques_where
        }).then(res=>{
            if(res){
                return FindById(res.get('id'))
            }else{
                let error = Validate(data)
                if (error) {
                    throw new Error(error)
                }
                return Data.create(data);
            }
        })
    }

    let error = Validate(data)
    if (error) {
        throw new Error(error)
    }
    return Data.create(data);
}


// Поиск по id
const FindById = async (id) => {
    return Data.findOne({
        where: {
            id: id
        }
    })
}

const GetAllCount = async (id) => {
    return Data.count()
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
        })
    })
}

const Update = async (data) => {
    let error = Validate(data)
    if (error) {
        throw new Error(error)
    }
    await Data.update(data, { where: { id: data.id } })
    return FindById(data.id)
}

const GetAll = async (params) => {
    return Data.findAll(params)
}

const GetAllSerach = async (text, params) => {
    let filter_by_text = []
                                                                    return Data.findAll({
        where : {
            [Op.or]: filter_by_text, ...params
        }
    })
}

const GetAllFilterCount = async (filter) => {
    if( Object.keys(filter).length == 0 ){
        return 0;
    }
    return Data.count({ where:filter,...filter})
}

const GetAllFilter = async (filter, params) => {
    if( Object.keys(filter).length == 0 ){
        return [];
    }
    return Data.findAll({
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
                    if (!data.parameter_id) {
            return ERROR_VALIDATE_PARAMETERID
        }
                    if (!data.data) {
            return ERROR_VALIDATE_DATA
        }
                    if (!data.date) {
            return ERROR_VALIDATE_DATE
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
                    if (!data.parameter_id) {
            return ERROR_VALIDATE_PARAMETERID
        }
                    if (!data.data) {
            return ERROR_VALIDATE_DATA
        }
                    if (!data.date) {
            return ERROR_VALIDATE_DATE
        }
         

    return ``
}




module.exports = {

DATA_ERROR_VALIDATE_INVALID_DATA: ERROR_VALIDATE_INVALID_DATA,
DATA_ERROR_NOT_FOUND: ERROR_NOT_FOUND,
                    DATA_ERROR_VALIDATE_DEVICEID: ERROR_VALIDATE_DEVICEID,
                    DATA_ERROR_VALIDATE_PARAMETERID: ERROR_VALIDATE_PARAMETERID,
                    DATA_ERROR_VALIDATE_DATA: ERROR_VALIDATE_DATA,
                    DATA_ERROR_VALIDATE_DATE: ERROR_VALIDATE_DATE,
         

    DataGetAll: GetAll,
    DataGetAllCount: GetAllCount,
    DataUpdate: Update,
    DataAdd: Add,
    DataDrop: Drop,
    DataFindById: FindById,
    DataValidateUpdate: ValidateUpdate,
    DataValidateInsert: ValidateInsert,
    DataModel: Data,
    DataGetAllFilter: GetAllFilter,
    DataGetAllFilterCount: GetAllFilterCount,
    }