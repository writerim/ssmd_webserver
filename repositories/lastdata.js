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

const TABLENAME = 'lastdata'

const ERROR_VALIDATE_INVALID_DATA = `invalid data`;
const ERROR_NOT_FOUND = `not found`;
const ERROR_VALIDATE_DEVICEID = 'error validate data: device_id'
const ERROR_UPDATE_ISSET_DEVICEID = 'error: undefined data: device_id'
const ERROR_VALIDATE_PARAMETERID = 'error validate data: parameter_id'
const ERROR_UPDATE_ISSET_PARAMETERID = 'error: undefined data: parameter_id'
const ERROR_VALIDATE_DATA = 'error validate data: data'
const ERROR_UPDATE_ISSET_DATA = 'error: undefined data: data'
const ERROR_VALIDATE_DATE = 'error validate data: date'
const ERROR_UPDATE_ISSET_DATE = 'error: undefined data: date'

// Демон
const initional = () => {

  const connect = GetConnect(Sequelize)
  const interfaceConnect = connect.getQueryInterface()

  interfaceConnect.addColumn(TABLENAME + '', 'id', {
    type: DataTypes.INTEGER,
  }, {
    mustExist: false
  }).catch(() => {});
  interfaceConnect.addColumn(TABLENAME + '', 'device_id', {
    type: DataTypes.INTEGER,
  }, {
    mustExist: false
  }).catch(() => {});
  interfaceConnect.addColumn(TABLENAME + '', 'parameter_id', {
    type: DataTypes.INTEGER,
  }, {
    mustExist: false
  }).catch(() => {});
  interfaceConnect.addColumn(TABLENAME + '', 'data', {
    type: DataTypes.JSON(DataTypes.STRING),
  }, {
    mustExist: false
  }).catch(() => {});
  interfaceConnect.addColumn(TABLENAME + '', 'date', {
    type: DataTypes.DATE,
  }, {
    mustExist: false
  }).catch(() => {});

  setTimeout(() => {
    let data = {}
  }, 500)
}

// Инициализация модели
const LastData = GetConnect({
  name: 'LastData',
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
  data: {
    type: DataTypes.JSON(DataTypes.STRING),
  },
  date: {
    type: DataTypes.DATE,
  },
})

// Добавление записи
const Add = async (data) => {

  let uniques_where = {}
  if (Object.keys(uniques_where).length) {
    return LastData.findOne({
      where: uniques_where
    }).then(res => {
      if (res) {
        data.id = res.get('id')
        return Update(data)
      } else {
        let error = ValidateInsert(data)
        if (error) {
          throw new Error(error)
        }
        APP_EVENTS.emit(`ADD:lastdata`, data)
        return LastData.create(data);
      }
    })
  }

  let error = ValidateInsert(data)
  if (error) {
    throw new Error(error)
  }
  return LastData.create(data);
}

// Поиск по id
const FindById = async (id) => {
  return LastData.findOne({
    where: {
      id: id
    }
  })
}

// Получение всех записей
const GetAllCount = async (id) => {
  return LastData.count()
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
          APP_EVENTS.emit(`DELETE:lastdata:${id}`)
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
  await LastData.update(data, {
    where: {
      id: data.id
    }
  })
  APP_EVENTS.emit(`UPDATE:lastdata:${data.id}`)
  return FindById(data.id)
}

// Получение всех записей
const GetAll = async (params) => {
  return LastData.findAll(params)
}

// Получение всех записей по вхождению строки куда либо
const GetAllSearch = async (text, params) => {
  let filter_by_text = []
  return LastData.findAll({
    where: {
            [Op.or]: filter_by_text
    },
    ...params
  })
}

// Получение всех записей по вхождению строки куда либо
const GetAllSearchCount = async (text) => {
  let filter_by_text = []
  return LastData.count({
    where: {
            [Op.or]: filter_by_text
    }
  })
}

// Получение общего кол-ва записей по фильтру. Подходит для касточных запросов
const GetAllFilterCount = async (filter) => {
  if (Object.keys(filter).length == 0) {
    return 0;
  }
  return LastData.count({
    where: filter,
    ...filter
  })
}

// Фильтрация записей. Подходит для касточных запросов
const GetAllFilter = async (filter, params) => {
  if (Object.keys(filter).length == 0) {
    return [];
  }
  return LastData.findAll({
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

  LASTDATA_ERROR_VALIDATE_INVALID_DATA: ERROR_VALIDATE_INVALID_DATA,
  LASTDATA_ERROR_NOT_FOUND: ERROR_NOT_FOUND,
  LASTDATA_ERROR_VALIDATE_DEVICEID: ERROR_VALIDATE_DEVICEID,
  LASTDATA_ERROR_VALIDATE_PARAMETERID: ERROR_VALIDATE_PARAMETERID,
  LASTDATA_ERROR_VALIDATE_DATA: ERROR_VALIDATE_DATA,
  LASTDATA_ERROR_VALIDATE_DATE: ERROR_VALIDATE_DATE,

  LastDataGetAll: GetAll,
  LastDataGetAllCount: GetAllCount,
  LastDataUpdate: Update,
  LastDataAdd: Add,
  LastDataDrop: Drop,
  LastDataFindById: FindById,
  LastDataValidateUpdate: ValidateUpdate,
  LastDataValidateInsert: ValidateInsert,
  LastDataModel: LastData,
  LastDataGetAllFilter: GetAllFilter,
  LastDataGetAllFilterCount: GetAllFilterCount,
  LastDataGetAllSearch: GetAllSearch,
  LastDataGetAllSearchCount: GetAllSearchCount,
}