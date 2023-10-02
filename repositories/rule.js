// generated

const {
  APP_EVENTS
} = require('../app_events');

const {
  DataTypes,
  Op
} = require('sequelize');
const {
  GetConnect
} = require('./connect');
var events = require('events');

const TABLENAME = 'rule'

const ERROR_VALIDATE_INVALID_DATA = `invalid data`;
const ERROR_NOT_FOUND = `not found`;
const ERROR_VALIDATE_NAME = 'error validate data: name'
const ERROR_UPDATE_ISSET_NAME = 'error: undefined data: name'
const ERROR_VALIDATE_DESCRIPTION = 'error validate data: description'
const ERROR_UPDATE_ISSET_DESCRIPTION = 'error: undefined data: description'

// Демон
const initional = () => {

  GetConnect().getQueryInterface().addColumn(TABLENAME + 's', 'id', {
    type: DataTypes.INTEGER,
  }, {
    mustExist: false
  }).catch(() => {});
  GetConnect().getQueryInterface().addColumn(TABLENAME + 's', 'name', {
    type: DataTypes.STRING,
  }, {
    mustExist: false
  }).catch(() => {});
  GetConnect().getQueryInterface().addColumn(TABLENAME + 's', 'description', {
    type: DataTypes.STRING,
  }, {
    mustExist: false
  }).catch(() => {});

  setTimeout(() => {
    let data = {}
  }, 500)
}

// Инициализация модели
const Rule = GetConnect({
  name: 'Rule',
  deamon: initional
}).define(TABLENAME, {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
})

// Добавление записи
const Add = async (data) => {

  let uniques_where = {}
  if (Object.keys(uniques_where).length) {
    return Rule.findOne({
      where: uniques_where
    }).then(res => {
      if (res) {
        return FindById(res.get('id'))
      } else {
        let error = ValidateInsert(data)
        if (error) {
          throw new Error(error)
        }
        APP_EVENTS.emit(`ADD:rule`, data)
        return Rule.create(data);
      }
    })
  }

  let error = ValidateInsert(data)
  if (error) {
    throw new Error(error)
  }
  return Rule.create(data);
}

// Поиск по id
const FindById = async (id) => {
  return Rule.findOne({
    where: {
      id: id
    }
  })
}

// Получение всех записей
const GetAllCount = async (id) => {
  return Rule.count()
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
          APP_EVENTS.emit(`DELETE:rule:${id}`)
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
  await Rule.update(data, {
    where: {
      id: data.id
    }
  })
  APP_EVENTS.emit(`UPDATE:rule:${data.id}`)
  return FindById(data.id)
}

// Получение всех записей
const GetAll = async (params) => {
  return Rule.findAll(params)
}

// Получение всех записей по вхождению строки куда либо
const GetAllSerach = async (text, params) => {
  let filter_by_text = []
  return Rule.findAll({
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
  return Rule.count({
    where: filter,
    ...filter
  })
}

// Фильтрация записей. Подходит для касточных запросов
const GetAllFilter = async (filter, params) => {
  if (Object.keys(filter).length == 0) {
    return [];
  }
  return Rule.findAll({
    where: filter,
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
  if (!data.description) {
    return ERROR_VALIDATE_DESCRIPTION
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
  if (!data.description) {
    return ERROR_VALIDATE_DESCRIPTION
  }

  return ``
}

module.exports = {

  RULE_ERROR_VALIDATE_INVALID_DATA: ERROR_VALIDATE_INVALID_DATA,
  RULE_ERROR_NOT_FOUND: ERROR_NOT_FOUND,
  RULE_ERROR_VALIDATE_NAME: ERROR_VALIDATE_NAME,
  RULE_ERROR_VALIDATE_DESCRIPTION: ERROR_VALIDATE_DESCRIPTION,

  RuleGetAll: GetAll,
  RuleGetAllCount: GetAllCount,
  RuleUpdate: Update,
  RuleAdd: Add,
  RuleDrop: Drop,
  RuleFindById: FindById,
  RuleValidateUpdate: ValidateUpdate,
  RuleValidateInsert: ValidateInsert,
  RuleModel: Rule,
  RuleGetAllFilter: GetAllFilter,
  RuleGetAllFilterCount: GetAllFilterCount,
}