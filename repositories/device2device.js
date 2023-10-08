// generated

const {
  APP_EVENTS
} = require('../app_events');

const {
  DataTypes,
  Op,
  Sequelize
} = require('sequelize');
const {
  GetConnect
} = require('./connect');
var events = require('events');

const TABLENAME = 'device2device'

const ERROR_VALIDATE_INVALID_DATA = `invalid data`;
const ERROR_NOT_FOUND = `not found`;
const ERROR_VALIDATE_DEVICEID = 'error validate data: device_id'
const ERROR_UPDATE_ISSET_DEVICEID = 'error: undefined data: device_id'
const ERROR_VALIDATE_PARAMETERID = 'error validate data: parameter_id'
const ERROR_UPDATE_ISSET_PARAMETERID = 'error: undefined data: parameter_id'
const ERROR_VALIDATE_DEVICEDONORID = 'error validate data: device_donor_id'
const ERROR_UPDATE_ISSET_DEVICEDONORID = 'error: undefined data: device_donor_id'
const ERROR_VALIDATE_PARAMETERDONORID = 'error validate data: parameter_donor_id'
const ERROR_UPDATE_ISSET_PARAMETERDONORID = 'error: undefined data: parameter_donor_id'

// Демон
const initional = () => {

  const connect = GetConnect(Sequelize)
  const interfaceConnect = connect.getQueryInterface()

  interfaceConnect.addColumn(TABLENAME + 's', 'id', {
    type: DataTypes.INTEGER,
  }, {
    mustExist: false
  }).catch(() => {});
  interfaceConnect.addColumn(TABLENAME + 's', 'device_id', {
    type: DataTypes.INTEGER,
  }, {
    mustExist: false
  }).catch(() => {});
  interfaceConnect.addColumn(TABLENAME + 's', 'parameter_id', {
    type: DataTypes.INTEGER,
  }, {
    mustExist: false
  }).catch(() => {});
  interfaceConnect.addColumn(TABLENAME + 's', 'device_donor_id', {
    type: DataTypes.INTEGER,
  }, {
    mustExist: false
  }).catch(() => {});
  interfaceConnect.addColumn(TABLENAME + 's', 'parameter_donor_id', {
    type: DataTypes.INTEGER,
  }, {
    mustExist: false
  }).catch(() => {});

  setTimeout(() => {
    let data = {}
  }, 500)
}

// Инициализация модели
const Device2Device = GetConnect({
  name: 'Device2Device',
  deamon: initional
}).define(TABLENAME, {
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
  device_donor_id: {
    type: DataTypes.INTEGER,
  },
  parameter_donor_id: {
    type: DataTypes.INTEGER,
  },
})

// Добавление записи
const Add = async (data) => {

  let uniques_where = {}
  if (Object.keys(uniques_where).length) {
    return Device2Device.findOne({
      where: uniques_where
    }).then(res => {
      if (res) {
        return FindById(res.get('id'))
      } else {
        let error = ValidateInsert(data)
        if (error) {
          throw new Error(error)
        }
        APP_EVENTS.emit(`ADD:device2device`, data)
        return Device2Device.create(data);
      }
    })
  }

  let error = ValidateInsert(data)
  if (error) {
    throw new Error(error)
  }
  return Device2Device.create(data);
}

// Поиск по id
const FindById = async (id) => {
  return Device2Device.findOne({
    where: {
      id: id
    }
  })
}

// Получение всех записей
const GetAllCount = async (id) => {
  return Device2Device.count()
}

// Удаление записи по id
const Drop = async (id) => {
  return FindById(id).then(res => {
    if (!res) {
      throw new Error(ERROR_NOT_FOUND)
    }
    return res.destroy().then(res => {
      return new Promise(resolve => {
        if (res._modelOptions.whereCollection) {
          resolve({
            result: true
          })
          APP_EVENTS.emit(`DELETE:device2device:${id}`)
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
  await Device2Device.update(data, {
    where: {
      id: data.id
    }
  })
  APP_EVENTS.emit(`UPDATE:device2device:${data.id}`)
  return FindById(data.id)
}

// Получение всех записей
const GetAll = async (params) => {
  return Device2Device.findAll(params)
}

// Получение всех записей по вхождению строки куда либо
const GetAllSerach = async (text, params) => {
  let filter_by_text = []
  return Device2Device.findAll({
    where: {
            [Op.or]: filter_by_text,
      ...params
    }
  })
}

// Получение общего кол-ва записей по фильтру. Подходит для касточных запросов
const GetAllFilterCount = async (filter) => {
  if (Object.keys(filter).length == 0) {
    return 0;
  }
  return Device2Device.count({
    where: filter,
    ...filter
  })
}

// Фильтрация записей. Подходит для касточных запросов
const GetAllFilter = async (filter, params) => {
  if (Object.keys(filter).length == 0) {
    return [];
  }
  return Device2Device.findAll({
    where: filter,
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
  if (!data.device_donor_id) {
    return ERROR_VALIDATE_DEVICEDONORID
  }
  if (!data.parameter_donor_id) {
    return ERROR_VALIDATE_PARAMETERDONORID
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
  if (!data.device_donor_id) {
    return ERROR_VALIDATE_DEVICEDONORID
  }
  if (!data.parameter_donor_id) {
    return ERROR_VALIDATE_PARAMETERDONORID
  }

  return ``
}

module.exports = {

  DEVICE2DEVICE_ERROR_VALIDATE_INVALID_DATA: ERROR_VALIDATE_INVALID_DATA,
  DEVICE2DEVICE_ERROR_NOT_FOUND: ERROR_NOT_FOUND,
  DEVICE2DEVICE_ERROR_VALIDATE_DEVICEID: ERROR_VALIDATE_DEVICEID,
  DEVICE2DEVICE_ERROR_VALIDATE_PARAMETERID: ERROR_VALIDATE_PARAMETERID,
  DEVICE2DEVICE_ERROR_VALIDATE_DEVICEDONORID: ERROR_VALIDATE_DEVICEDONORID,
  DEVICE2DEVICE_ERROR_VALIDATE_PARAMETERDONORID: ERROR_VALIDATE_PARAMETERDONORID,

  Device2DeviceGetAll: GetAll,
  Device2DeviceGetAllCount: GetAllCount,
  Device2DeviceUpdate: Update,
  Device2DeviceAdd: Add,
  Device2DeviceDrop: Drop,
  Device2DeviceFindById: FindById,
  Device2DeviceValidateUpdate: ValidateUpdate,
  Device2DeviceValidateInsert: ValidateInsert,
  Device2DeviceModel: Device2Device,
  Device2DeviceGetAllFilter: GetAllFilter,
  Device2DeviceGetAllFilterCount: GetAllFilterCount,
}