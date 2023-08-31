// generated

const {
  DataTypes,
  Op
} = require('sequelize');
const {
  GetConnect
} = require('./connect');
var events = require('events');

const TABLENAME = 'userplace'

const ERROR_VALIDATE_INVALID_DATA = `invalid data`;
const ERROR_NOT_FOUND = `not found`;
const ERROR_VALIDATE_PLACEID = 'error validate data: plce_id'
const ERROR_VALIDATE_USERID = 'error validate data: user_id'

const initional = () => {

  GetConnect().getQueryInterface().addColumn(TABLENAME + 's', 'id', {
    type: DataTypes.INTEGER,
  }, {
    mustExist: false
  }).catch(() => {});
  GetConnect().getQueryInterface().addColumn(TABLENAME + 's', 'plce_id', {
    type: DataTypes.INTEGER,
  }, {
    mustExist: false
  }).catch(() => {});
  GetConnect().getQueryInterface().addColumn(TABLENAME + 's', 'user_id', {
    type: DataTypes.INTEGER,
  }, {
    mustExist: false
  }).catch(() => {});

  setTimeout(() => {
    let data = {}
  }, 500)
}

const UserPlace = GetConnect({
  name: 'UserPlace',
  deamon: initional
}).define(TABLENAME, {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  plce_id: {
    type: DataTypes.INTEGER,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
})

// Добавление сообщения к смене
const Add = async (data) => {

  let uniques_where = {}
  if (Object.keys(uniques_where).length) {
    return UserPlace.findOne({
      where: uniques_where
    }).then(res => {
      if (res) {
        return FindById(res.get('id'))
      } else {
        let error = ValidateInsert(data)
        if (error) {
          throw new Error(error)
        }
        return UserPlace.create(data);
      }
    })
  }

  let error = ValidateInsert(data)
  if (error) {
    throw new Error(error)
  }
  return UserPlace.create(data);
}

// Поиск по id
const FindById = async (id) => {
  return UserPlace.findOne({
    where: {
      id: id
    }
  })
}

const GetAllCount = async (id) => {
  return UserPlace.count()
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
  await UserPlace.update(data, {
    where: {
      id: data.id
    }
  })
  return FindById(data.id)
}

const GetAll = async (params) => {
  return UserPlace.findAll(params)
}

const GetAllSerach = async (text, params) => {
  let filter_by_text = []
  return UserPlace.findAll({
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
  return UserPlace.count({
    where: filter,
    ...filter
  })
}

const GetAllFilter = async (filter, params) => {
  if (Object.keys(filter).length == 0) {
    return [];
  }
  return UserPlace.findAll({
    where: filter,
    ...params
  })
}

// Валидация для обновления данных
const ValidateUpdate = (data) => {

  if (!data || !Object.keys(data).length) {
    return ERROR_VALIDATE_INVALID_DATA
  }

  if (!data.plce_id) {
    return ERROR_VALIDATE_PLACEID
  }
  if (!data.user_id) {
    return ERROR_VALIDATE_USERID
  }

  return ``
}

// Валидация для вставки данных
const ValidateInsert = (data) => {

  if (!data || !Object.keys(data).length) {
    return ERROR_VALIDATE_INVALID_DATA
  }

  if (!data.plce_id) {
    return ERROR_VALIDATE_PLACEID
  }
  if (!data.user_id) {
    return ERROR_VALIDATE_USERID
  }

  return ``
}

module.exports = {

  USERPLACE_ERROR_VALIDATE_INVALID_DATA: ERROR_VALIDATE_INVALID_DATA,
  USERPLACE_ERROR_NOT_FOUND: ERROR_NOT_FOUND,
  USERPLACE_ERROR_VALIDATE_PLACEID: ERROR_VALIDATE_PLACEID,
  USERPLACE_ERROR_VALIDATE_USERID: ERROR_VALIDATE_USERID,

  UserPlaceGetAll: GetAll,
  UserPlaceGetAllCount: GetAllCount,
  UserPlaceUpdate: Update,
  UserPlaceAdd: Add,
  UserPlaceDrop: Drop,
  UserPlaceFindById: FindById,
  UserPlaceValidateUpdate: ValidateUpdate,
  UserPlaceValidateInsert: ValidateInsert,
  UserPlaceModel: UserPlace,
  UserPlaceGetAllFilter: GetAllFilter,
  UserPlaceGetAllFilterCount: GetAllFilterCount,
}