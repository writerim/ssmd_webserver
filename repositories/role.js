// generated

const {
  DataTypes,
  Op
} = require('sequelize');
const {
  GetConnect
} = require('./connect');
var events = require('events');

const TABLENAME = 'role'

const ERROR_VALIDATE_INVALID_DATA = `invalid data`;
const ERROR_NOT_FOUND = `not found`;
const ERROR_VALIDATE_NAME = 'error validate data: name'
const ERROR_VALIDATE_DESCRIPTION = 'error validate data: description'

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

const Role = GetConnect({
  name: 'Role',
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

// Добавление сообщения к смене
const Add = async (data) => {

  let uniques_where = {}
  if (Object.keys(uniques_where).length) {
    return Role.findOne({
      where: uniques_where
    }).then(res => {
      if (res) {
        return FindById(res.get('id'))
      } else {
        let error = Validate(data)
        if (error) {
          throw new Error(error)
        }
        return Role.create(data);
      }
    })
  }

  let error = Validate(data)
  if (error) {
    throw new Error(error)
  }
  return Role.create(data);
}

// Поиск по id
const FindById = async (id) => {
  return Role.findOne({
    where: {
      id: id
    }
  })
}

const GetAllCount = async (id) => {
  return Role.count()
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
  let error = Validate(data)
  if (error) {
    throw new Error(error)
  }
  await Role.update(data, {
    where: {
      id: data.id
    }
  })
  return FindById(data.id)
}

const GetAll = async (params) => {
  return Role.findAll(params)
}

const GetAllSerach = async (text, params) => {
  let filter_by_text = []
  return Role.findAll({
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
  return Role.count({
    where: filter,
    ...filter
  })
}

const GetAllFilter = async (filter, params) => {
  if (Object.keys(filter).length == 0) {
    return [];
  }
  return Role.findAll({
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

  ROLE_ERROR_VALIDATE_INVALID_DATA: ERROR_VALIDATE_INVALID_DATA,
  ROLE_ERROR_NOT_FOUND: ERROR_NOT_FOUND,
  ROLE_ERROR_VALIDATE_NAME: ERROR_VALIDATE_NAME,
  ROLE_ERROR_VALIDATE_DESCRIPTION: ERROR_VALIDATE_DESCRIPTION,

  RoleGetAll: GetAll,
  RoleGetAllCount: GetAllCount,
  RoleUpdate: Update,
  RoleAdd: Add,
  RoleDrop: Drop,
  RoleFindById: FindById,
  RoleValidateUpdate: ValidateUpdate,
  RoleValidateInsert: ValidateInsert,
  RoleModel: Role,
  RoleGetAllFilter: GetAllFilter,
  RoleGetAllFilterCount: GetAllFilterCount,
}