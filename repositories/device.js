// generated

const { APP_EVENTS } = require('../app_events');

                                                            


const { DataTypes, Op, Sequelize } = require('sequelize');
const { GetConnect } = require('./connect');
var events = require('events');


                                                                                        const { ModModel } = require('./mod');
                            
const TABLENAME = 'device'



const ERROR_VALIDATE_INVALID_DATA = `invalid data`;
const ERROR_NOT_FOUND = `not found`;
            const ERROR_VALIDATE_NAME = 'error validate data: name'
const ERROR_UPDATE_ISSET_NAME = 'error: undefined data: name'
    const ERROR_VALIDATE_SETTINGSCONNECTIONS = 'error validate data: settings_connections'
const ERROR_UPDATE_ISSET_SETTINGSCONNECTIONS = 'error: undefined data: settings_connections'
                const ERROR_VALIDATE_MODID = 'error validate data: mod_id'
const ERROR_UPDATE_ISSET_MODID = 'error: undefined data: mod_id'
                 

// Демон
const initional = ()=>{

    const connect = GetConnect(Sequelize)
    const interfaceConnect = connect.getQueryInterface()

    
                    
            interfaceConnect.addColumn(TABLENAME + 's', 'id', { 
                    type: DataTypes.INTEGER,
                }, {  mustExist: false }).catch(()=>{});
            interfaceConnect.addColumn(TABLENAME + 's', 'parent_id', { 
                    type: DataTypes.INTEGER,
                }, {  mustExist: false }).catch(()=>{});
            interfaceConnect.addColumn(TABLENAME + 's', 'name', { 
                    type: DataTypes.STRING,
                }, {  mustExist: false }).catch(()=>{});
            interfaceConnect.addColumn(TABLENAME + 's', 'settings_connections', { 
                    type: DataTypes.JSON(DataTypes.STRING),
                }, {  mustExist: false }).catch(()=>{});
            interfaceConnect.addColumn(TABLENAME + 's', 'lft', { 
                    type: DataTypes.INTEGER,
                }, {  mustExist: false }).catch(()=>{});
            interfaceConnect.addColumn(TABLENAME + 's', 'rgt', { 
                    type: DataTypes.INTEGER,
                }, {  mustExist: false }).catch(()=>{});
            interfaceConnect.addColumn(TABLENAME + 's', 'utc', { 
                    type: DataTypes.INTEGER,
                }, {  mustExist: false }).catch(()=>{});
            interfaceConnect.addColumn(TABLENAME + 's', 'mod_id', { 
                    type: DataTypes.INTEGER,
                }, {  mustExist: false }).catch(()=>{});
            interfaceConnect.addColumn(TABLENAME + 's', 'time_settings', { 
                    type: DataTypes.JSON(DataTypes.STRING),
                }, {  mustExist: false }).catch(()=>{});
            interfaceConnect.addColumn(TABLENAME + 's', 'types', { 
                    type: DataTypes.JSON(DataTypes.STRING),
                }, {  mustExist: false }).catch(()=>{});
            interfaceConnect.addColumn(TABLENAME + 's', 'status', { 
                    type: DataTypes.INTEGER,
                }, {  mustExist: false }).catch(()=>{});
            interfaceConnect.addColumn(TABLENAME + 's', 'is_exclude', { 
                    type: DataTypes.BOOLEAN,
                }, {  mustExist: false }).catch(()=>{});
        
    setTimeout(()=>{
        let data = {}
            }, 500)
}

// Инициализация модели
const Device = GetConnect({name: 'Device' , deamon : initional}).define(TABLENAME, {
            id: {
                            type: DataTypes.INTEGER,
                                        autoIncrement: true,
                primaryKey: true
                    },
            parent_id: {
                            type: DataTypes.INTEGER,
                                },
            name: {
                            type: DataTypes.STRING,
                                },
            settings_connections: {
                            type: DataTypes.JSON(DataTypes.STRING),
                                },
            lft: {
                            type: DataTypes.INTEGER,
                                },
            rgt: {
                            type: DataTypes.INTEGER,
                                },
            utc: {
                            type: DataTypes.INTEGER,
                                },
            mod_id: {
                            type: DataTypes.INTEGER,
                                },
            time_settings: {
                            type: DataTypes.JSON(DataTypes.STRING),
                                },
            types: {
                            type: DataTypes.JSON(DataTypes.STRING),
                                },
            status: {
                            type: DataTypes.INTEGER,
                                },
            is_exclude: {
                            type: DataTypes.BOOLEAN,
                                },
    })




// Добавление записи
const Add = async (data) => {

    let uniques_where = {}
                                                                                                                                                        if(Object.keys(uniques_where).length){
        return Device.findOne({
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
                APP_EVENTS.emit(`ADD:device`, data)
                return Device.create(data);
            }
        })
    }

    let error = ValidateInsert(data)
    if (error) {
        throw new Error(error)
    }
    return Device.create(data);
}


// Поиск по id
const FindById = async (id) => {
    return Device.findOne({
        where: {
            id: id
        }
    })
}

// Получение всех записей
const GetAllCount = async (id) => {
    return Device.count()
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
                    APP_EVENTS.emit(`DELETE:device:${id}`)
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
    await Device.update(data, { where: { id: data.id } })
    APP_EVENTS.emit(`UPDATE:device:${data.id}`)
    return FindById(data.id)
}

// Получение всех записей
const GetAll = async (params, flags = {include: -1}) => {
        return Device.findAll(params)
}

// Получение всех записей по вхождению строки куда либо
const GetAllSearch = async (text, params, flags = {include: -1}) => {
    let filter_by_text = []
                                                filter_by_text.push({
                name: {
                  [Op.like]: '%' + text + '%'
                }
              })
                                                                                                                        
    
    return Device.findAll({
        where : {
            [Op.or]: filter_by_text
        },
        ...params
    })
}

// Получение всех записей по вхождению строки куда либо
const GetAllSearchCount = async (text) => {
    let filter_by_text = []
                                                filter_by_text.push({
                name: {
                  [Op.like]: '%' + text + '%'
                }
              })
                                                                                                                            return Device.count({
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
    return Device.count({ where:filter,...filter})
}

// Фильтрация записей. Подходит для касточных запросов
const GetAllFilter = async (filter, params, flags = {include: -1}) => {
    if( Object.keys(filter).length == 0 ){
        return [];
    }

    
    return Device.findAll({
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
                    if (!data.settings_connections) {
            return ERROR_VALIDATE_SETTINGSCONNECTIONS
        }
                                            if (!data.mod_id) {
            return ERROR_VALIDATE_MODID
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
                    if (!data.settings_connections) {
            return ERROR_VALIDATE_SETTINGSCONNECTIONS
        }
                                            if (!data.mod_id) {
            return ERROR_VALIDATE_MODID
        }
                                         

    return ``
}


// Полный пересчет дерева пользователей
// Принцип работы:
// Собираем сначала дерево в памяти
// Затем для каждого пользователя мы начинаем перебирать его значения указателей
// Если не совпадает, то мы перезаписываем значения


// Перестройка раотает на промисах для того чтобы было более простая перестройка с зависимостями
// У каждого элемента в структуре есть несколько зависимостей от расчета
// lft завсит от 2 вещей. 1. От rgt предыдущего брата. Если брата нет, то от родительского
// rgt зависит от rgt последнего дочернего. Если он последний то +1 к lft
// для того чтобы составить такую карту нам надо пройти по структуре
// найти корневой элемент
// Начать проходить по нему рекурсивно и выставлять промисы.
// как только будет выполнен промис, то мы будем формировать список
const RecalcTree = async () => {

    var event_emitter = new events.EventEmitter();

    let main_parent = null
    let tree = []

    // Левый указатель зависит от 2 вещей
    //  Если это первый ребенок, то от родительского лекого + 1
    //  Если не первый то от правого указателя брата + 1
    // Правый указатель зависит от 2 вещей
    //  Если есть дети то от правого указателя последнего ребенка + 1
    //  Если нет, то свой левый + 1 
    const setEvents = (parent, last_brother = null) => {

        // тут перебираем дочерних
        let children = []

        tree.forEach(el => {
            if (el.parent_id == parent.id) {
                children.push(el)
            }
        })

        if (last_brother) {
            event_emitter.on(`set_rgt_${last_brother.id}`, (rgt) => {
                parent.lft = rgt + 1
                event_emitter.emit(`set_lft_${parent.id}`, parent.lft);
            });
        }

        // Для выставления lft текущего элемента надо от lft его дочернего вычесть 1
        if (children.length) {
            for (let index = 0; index < children.length; index++) {
                const child = children[index];

                if (index == 0) {
                    event_emitter.on(`set_lft_${parent.id}`, (lft) => {
                        child.lft = lft + 1
                        event_emitter.emit(`set_lft_${child.id}`, child.lft);
                    });
                }
                if (index == children.length - 1) {
                    event_emitter.on(`set_rgt_${child.id}`, (rgt) => {
                        parent.rgt = rgt + 1
                        event_emitter.emit(`set_rgt_${parent.id}`, parent.rgt);
                    });
                }
            }
        } else {
            event_emitter.on(`set_lft_${parent.id}`, (lft) => {
                parent.rgt = lft + 1
                event_emitter.emit(`set_rgt_${parent.id}`, parent.rgt);
            });
            if (!last_brother) {
                event_emitter.on(`set_lft_${parent.parent_id}`, (lft) => {
                    parent.lft = lft + 1
                    event_emitter.emit(`set_rgt_${parent.id}`, parent.rgt);
                });
            } else {
                event_emitter.on(`set_rgt_${last_brother.id}`, (rgt) => {
                    parent.lft = rgt + 1
                    event_emitter.emit(`set_lft_${parent.id}`, parent.lft);
                });
            }
        }
        for (let index = 0; index < children.length; index++) {
            const child = children[index];
            let last_brother = null
            if (index != 0) {
                last_brother = children[index - 1]
            }
            setEvents(child, last_brother)
        }

    }

    return GetAll().then(res_tree => {

        res_tree.forEach(el => {
            if (el.parent_id == 0) {
                main_parent = el
            }
            tree.push({
                id: el.get('id'),
                parent_id: el.get('parent_id'),
                origin_lft: el.get('lft') || 0,
                origin_rgt: el.get('rgt') || 0,
                lft: 0,
                rgt: 0,
                obj: el
            })
        })

        setEvents(main_parent)

        main_parent.lft = 1
        event_emitter.emit(`set_lft_${main_parent.id}`, 1)

        tree.forEach(el => {
            if (!el.origin_lft || !el.origin_rgt || el.lft != el.origin_lft || el.rgt != el.origin_rgt) {
                el.obj.set('rgt', el.rgt)
                el.obj.set('lft', el.lft)
                Update(el.obj.dataValues)
            }
        })
        event_emitter.removeAllListeners()
        return  { res: 'success' }
    }).catch(e => {
        console.log(e)
    })

}


module.exports = {

DEVICE_ERROR_VALIDATE_INVALID_DATA: ERROR_VALIDATE_INVALID_DATA,
DEVICE_ERROR_NOT_FOUND: ERROR_NOT_FOUND,
                            DEVICE_ERROR_VALIDATE_NAME: ERROR_VALIDATE_NAME,
                    DEVICE_ERROR_VALIDATE_SETTINGSCONNECTIONS: ERROR_VALIDATE_SETTINGSCONNECTIONS,
                                            DEVICE_ERROR_VALIDATE_MODID: ERROR_VALIDATE_MODID,
                                         

    DeviceGetAll: GetAll,
    DeviceGetAllCount: GetAllCount,
    DeviceUpdate: Update,
    DeviceAdd: Add,
    DeviceDrop: Drop,
    DeviceFindById: FindById,
    DeviceValidateUpdate: ValidateUpdate,
    DeviceValidateInsert: ValidateInsert,
    DeviceModel: Device,
    DeviceGetAllFilter: GetAllFilter,
    DeviceGetAllFilterCount: GetAllFilterCount,
    DeviceGetAllSearch: GetAllSearch,
    DeviceGetAllSearchCount: GetAllSearchCount,
            DeviceRecalcTree: RecalcTree,
    }