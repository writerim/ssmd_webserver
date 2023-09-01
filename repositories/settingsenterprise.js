// generated

const {
  DataTypes,
  Op
} = require('sequelize');
const {
  GetConnect
} = require('./connect');
var events = require('events');

const TABLENAME = 'settingsenterprise'

const ERROR_VALIDATE_INVALID_DATA = `invalid data`;
const ERROR_NOT_FOUND = `not found`;
const ERROR_VALIDATE_DESCRIPTION = 'error validate data: description'
const ERROR_VALIDATE_INDEX = 'error validate data: index'
const ERROR_VALIDATE_VALUE = 'error validate data: value'

const initional = () => {

  GetConnect().getQueryInterface().addColumn(TABLENAME + 's', 'id', {
    type: DataTypes.INTEGER,
  }, {
    mustExist: false
  }).catch(() => {});
  GetConnect().getQueryInterface().addColumn(TABLENAME + 's', 'description', {
    type: DataTypes.STRING,
  }, {
    mustExist: false
  }).catch(() => {});
  GetConnect().getQueryInterface().addColumn(TABLENAME + 's', 'index', {
    type: DataTypes.STRING,
  }, {
    mustExist: false
  }).catch(() => {});
  GetConnect().getQueryInterface().addColumn(TABLENAME + 's', 'value', {
    type: DataTypes.STRING,
  }, {
    mustExist: false
  }).catch(() => {});

  setTimeout(() => {
    let data = {}
    data = {}
    data['description'] = 'Главная страница по умолчанию'
    data['index'] = 'main_index_page'
    data['value'] = 'index.hbs'
    Add(data).catch(e => {
      console.log(e)
    })
  }, 500)
}

const SettingsEnterprise = GetConnect({
  name: 'SettingsEnterprise',
  deamon: initional
}).define(TABLENAME, {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  description: {
    type: DataTypes.STRING,
  },
  index: {
    type: DataTypes.STRING,
  },
  value: {
    type: DataTypes.STRING,
  },
})

// Добавление сообщения к смене
const Add = async (data) => {

  let uniques_where = {}
  uniques_where['index'] = data.index
  if (Object.keys(uniques_where).length) {
    return SettingsEnterprise.findOne({
      where: uniques_where
    }).then(res => {
      if (res) {
        return FindById(res.get('id'))
      } else {
        let error = ValidateInsert(data)
        if (error) {
          throw new Error(error)
        }
        return SettingsEnterprise.create(data);
      }
    })
  }

  let error = ValidateInsert(data)
  if (error) {
    throw new Error(error)
  }
  return SettingsEnterprise.create(data);
}

// Поиск по id
const FindById = async (id) => {
  return SettingsEnterprise.findOne({
    where: {
      id: id
    }
  })
}

const GetAllCount = async (id) => {
  return SettingsEnterprise.count()
}

// Поиск по id
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
        }
        throw new Error(ERROR_DROP_MODEL)
      })
    })
  })
}

const Update = async (data) => {
  let error = ValidateUpdate(data)
  if (error) {
    throw new Error(error)
  }
  await SettingsEnterprise.update(data, {
    where: {
      id: data.id
    }
  })
  return FindById(data.id)
}

const GetAll = async (params) => {
  return SettingsEnterprise.findAll(params)
}

const GetAllSerach = async (text, params) => {
  let filter_by_text = []
  return SettingsEnterprise.findAll({
    where: {
            [Op.or]: filter_by_text,
      ...params
    }
  })
}

const GetAllFilterCount = async (filter) => {
  if (Object.keys(filter).length == 0) {
    return 0;
  }
  return SettingsEnterprise.count({
    where: filter,
    ...filter
  })
}

const GetAllFilter = async (filter, params) => {
  if (Object.keys(filter).length == 0) {
    return [];
  }
  return SettingsEnterprise.findAll({
    where: filter,
    ...params
  })
}

// Валидация для обновления данных
const ValidateUpdate = (data) => {

  if (!data || !Object.keys(data).length) {
    return ERROR_VALIDATE_INVALID_DATA
  }

  if (!data.description) {
    return ERROR_VALIDATE_DESCRIPTION
  }
  if (!data.index) {
    return ERROR_VALIDATE_INDEX
  }
  if (!data.value) {
    return ERROR_VALIDATE_VALUE
  }

  return ``
}

// Валидация для вставки данных
const ValidateInsert = (data) => {

  if (!data || !Object.keys(data).length) {
    return ERROR_VALIDATE_INVALID_DATA
  }

  if (!data.description) {
    return ERROR_VALIDATE_DESCRIPTION
  }
  if (!data.index) {
    return ERROR_VALIDATE_INDEX
  }
  if (!data.value) {
    return ERROR_VALIDATE_VALUE
  }

  return ``
}

module.exports = {

  SETTINGSENTERPRISE_ERROR_VALIDATE_INVALID_DATA: ERROR_VALIDATE_INVALID_DATA,
  SETTINGSENTERPRISE_ERROR_NOT_FOUND: ERROR_NOT_FOUND,
  SETTINGSENTERPRISE_ERROR_VALIDATE_DESCRIPTION: ERROR_VALIDATE_DESCRIPTION,
  SETTINGSENTERPRISE_ERROR_VALIDATE_INDEX: ERROR_VALIDATE_INDEX,
  SETTINGSENTERPRISE_ERROR_VALIDATE_VALUE: ERROR_VALIDATE_VALUE,

  SettingsEnterpriseGetAll: GetAll,
  SettingsEnterpriseGetAllCount: GetAllCount,
  SettingsEnterpriseUpdate: Update,
  SettingsEnterpriseAdd: Add,
  SettingsEnterpriseDrop: Drop,
  SettingsEnterpriseFindById: FindById,
  SettingsEnterpriseValidateUpdate: ValidateUpdate,
  SettingsEnterpriseValidateInsert: ValidateInsert,
  SettingsEnterpriseModel: SettingsEnterprise,
  SettingsEnterpriseGetAllFilter: GetAllFilter,
  SettingsEnterpriseGetAllFilterCount: GetAllFilterCount,
}