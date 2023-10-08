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

const TABLENAME = 'rolerule'

const ERROR_VALIDATE_INVALID_DATA = `invalid data`;
const ERROR_NOT_FOUND = `not found`;
const ERROR_VALIDATE_ROLEID = 'error validate data: role_id'
const ERROR_UPDATE_ISSET_ROLEID = 'error: undefined data: role_id'
const ERROR_VALIDATE_RULEID = 'error validate data: rule_id'
const ERROR_UPDATE_ISSET_RULEID = 'error: undefined data: rule_id'

// Демон
const initional = () => {

  const connect = GetConnect(Sequelize)
  const interfaceConnect = connect.getQueryInterface()

  interfaceConnect.addColumn(TABLENAME + 's', 'id', {
    type: DataTypes.INTEGER,
  }, {
    mustExist: false
  }).catch(() => {});
  interfaceConnect.addColumn(TABLENAME + 's', 'role_id', {
    type: DataTypes.INTEGER,
  }, {
    mustExist: false
  }).catch(() => {});
  interfaceConnect.addColumn(TABLENAME + 's', 'rule_id', {
    type: DataTypes.INTEGER,
  }, {
    mustExist: false
  }).catch(() => {});

  setTimeout(() => {
    let data = {}
  }, 500)
}

// Инициализация модели
const RoleRule = GetConnect({
  name: 'RoleRule',
  deamon: initional
}).define(TABLENAME, {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  role_id: {
    type: DataTypes.INTEGER,
  },
  rule_id: {
    type: DataTypes.INTEGER,
  },
})

// Добавление записи
const Add = async (data) => {

  let uniques_where = {}
  if (Object.keys(uniques_where).length) {
    return RoleRule.findOne({
      where: uniques_where
    }).then(res => {
      if (res) {
        return FindById(res.get('id'))
      } else {
        let error = ValidateInsert(data)
        if (error) {
          throw new Error(error)
        }
        APP_EVENTS.emit(`ADD:rolerule`, data)
        return RoleRule.create(data);
      }
    })
  }

  let error = ValidateInsert(data)
  if (error) {
    throw new Error(error)
  }
  return RoleRule.create(data);
}

// Поиск по id
const FindById = async (id) => {
  return RoleRule.findOne({
    where: {
      id: id
    }
  })
}

// Получение всех записей
const GetAllCount = async (id) => {
  return RoleRule.count()
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
          APP_EVENTS.emit(`DELETE:rolerule:${id}`)
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
  await RoleRule.update(data, {
    where: {
      id: data.id
    }
  })
  APP_EVENTS.emit(`UPDATE:rolerule:${data.id}`)
  return FindById(data.id)
}

// Получение всех записей
const GetAll = async (params) => {
  return RoleRule.findAll(params)
}

// Получение всех записей по вхождению строки куда либо
const GetAllSerach = async (text, params) => {
  let filter_by_text = []
  return RoleRule.findAll({
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
  return RoleRule.count({
    where: filter,
    ...filter
  })
}

// Фильтрация записей. Подходит для касточных запросов
const GetAllFilter = async (filter, params) => {
  if (Object.keys(filter).length == 0) {
    return [];
  }
  return RoleRule.findAll({
    where: filter,
    ...params
  })
}

// Валидация для обновления данных
const ValidateUpdate = (data) => {

  if (!data || !Object.keys(data).length) {
    return ERROR_VALIDATE_INVALID_DATA
  }

  if (!data.role_id) {
    return ERROR_VALIDATE_ROLEID
  }
  if (!data.rule_id) {
    return ERROR_VALIDATE_RULEID
  }

  return ``
}

// Валидация для вставки данных
const ValidateInsert = (data) => {

  if (!data || !Object.keys(data).length) {
    return ERROR_VALIDATE_INVALID_DATA
  }

  if (!data.role_id) {
    return ERROR_VALIDATE_ROLEID
  }
  if (!data.rule_id) {
    return ERROR_VALIDATE_RULEID
  }

  return ``
}

module.exports = {

  ROLERULE_ERROR_VALIDATE_INVALID_DATA: ERROR_VALIDATE_INVALID_DATA,
  ROLERULE_ERROR_NOT_FOUND: ERROR_NOT_FOUND,
  ROLERULE_ERROR_VALIDATE_ROLEID: ERROR_VALIDATE_ROLEID,
  ROLERULE_ERROR_VALIDATE_RULEID: ERROR_VALIDATE_RULEID,

  RoleRuleGetAll: GetAll,
  RoleRuleGetAllCount: GetAllCount,
  RoleRuleUpdate: Update,
  RoleRuleAdd: Add,
  RoleRuleDrop: Drop,
  RoleRuleFindById: FindById,
  RoleRuleValidateUpdate: ValidateUpdate,
  RoleRuleValidateInsert: ValidateInsert,
  RoleRuleModel: RoleRule,
  RoleRuleGetAllFilter: GetAllFilter,
  RoleRuleGetAllFilterCount: GetAllFilterCount,
}