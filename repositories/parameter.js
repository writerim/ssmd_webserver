// generated

const {
  DataTypes,
  Op
} = require('sequelize');
const {
  GetConnect
} = require('./connect');
var events = require('events');

const TABLENAME = 'parameter'

const ERROR_VALIDATE_INVALID_DATA = `invalid data`;
const ERROR_NOT_FOUND = `not found`;
const ERROR_VALIDATE_IDENT = 'error validate data: ident'

const initional = () => {

  GetConnect().getQueryInterface().addColumn(TABLENAME + 's', 'id', {
    type: DataTypes.INTEGER,
  }, {
    mustExist: false
  }).catch(() => {});
  GetConnect().getQueryInterface().addColumn(TABLENAME + 's', 'ident', {
    type: DataTypes.STRING,
  }, {
    mustExist: false
  }).catch(() => {});

  setTimeout(() => {
    let data = {}
  }, 500)
}

const Parameter = GetConnect({
  name: 'Parameter',
  deamon: initional
}).define(TABLENAME, {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  ident: {
    type: DataTypes.STRING,
  },
})

// Добавление сообщения к смене
const Add = async (data) => {

  let uniques_where = {}
  uniques_where['ident'] = data.ident
  if (Object.keys(uniques_where).length) {
    return Parameter.findOne({
      where: uniques_where
    }).then(res => {
      if (res) {
        return FindById(res.get('id'))
      } else {
        let error = ValidateInsert(data)
        if (error) {
          throw new Error(error)
        }
        return Parameter.create(data);
      }
    })
  }

  let error = ValidateInsert(data)
  if (error) {
    throw new Error(error)
  }
  return Parameter.create(data);
}

// Поиск по id
const FindById = async (id) => {
  return Parameter.findOne({
    where: {
      id: id
    }
  })
}

const GetAllCount = async (id) => {
  return Parameter.count()
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
  await Parameter.update(data, {
    where: {
      id: data.id
    }
  })
  return FindById(data.id)
}

const GetAll = async (params) => {
  return Parameter.findAll(params)
}

const GetAllSerach = async (text, params) => {
  let filter_by_text = []
  return Parameter.findAll({
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
  return Parameter.count({
    where: filter,
    ...filter
  })
}

const GetAllFilter = async (filter, params) => {
  if (Object.keys(filter).length == 0) {
    return [];
  }
  return Parameter.findAll({
    where: filter,
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

  return ``
}

module.exports = {

  PARAMETER_ERROR_VALIDATE_INVALID_DATA: ERROR_VALIDATE_INVALID_DATA,
  PARAMETER_ERROR_NOT_FOUND: ERROR_NOT_FOUND,
  PARAMETER_ERROR_VALIDATE_IDENT: ERROR_VALIDATE_IDENT,

  ParameterGetAll: GetAll,
  ParameterGetAllCount: GetAllCount,
  ParameterUpdate: Update,
  ParameterAdd: Add,
  ParameterDrop: Drop,
  ParameterFindById: FindById,
  ParameterValidateUpdate: ValidateUpdate,
  ParameterValidateInsert: ValidateInsert,
  ParameterModel: Parameter,
  ParameterGetAllFilter: GetAllFilter,
  ParameterGetAllFilterCount: GetAllFilterCount,
}