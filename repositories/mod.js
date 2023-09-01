// generated

const {
  DataTypes,
  Op
} = require('sequelize');
const {
  GetConnect
} = require('./connect');
var events = require('events');

const TABLENAME = 'mod'

const ERROR_VALIDATE_INVALID_DATA = `invalid data`;
const ERROR_NOT_FOUND = `not found`;
const ERROR_VALIDATE_NAME = 'error validate data: name'
const ERROR_VALIDATE_MANUFACTURES = 'error validate data: manufactures'
const ERROR_VALIDATE_MARK = 'error validate data: mark'
const ERROR_VALIDATE_MODEL = 'error validate data: model'
const ERROR_VALIDATE_TYPESDEVICE = 'error validate data: types_device'
const ERROR_VALIDATE_LIB = 'error validate data: lib'
const ERROR_VALIDATE_PARAMETERS = 'error validate data: parameters'
const ERROR_VALIDATE_COMMANDS = 'error validate data: commands'
const ERROR_VALIDATE_LIBDESCRIPTION = 'error validate data: lib_description'
const ERROR_VALIDATE_СOMMANDS = 'error validate data: commands'

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
  GetConnect().getQueryInterface().addColumn(TABLENAME + 's', 'manufactures', {
    type: DataTypes.STRING,
  }, {
    mustExist: false
  }).catch(() => {});
  GetConnect().getQueryInterface().addColumn(TABLENAME + 's', 'mark', {
    type: DataTypes.STRING,
  }, {
    mustExist: false
  }).catch(() => {});
  GetConnect().getQueryInterface().addColumn(TABLENAME + 's', 'model', {
    type: DataTypes.STRING,
  }, {
    mustExist: false
  }).catch(() => {});
  GetConnect().getQueryInterface().addColumn(TABLENAME + 's', 'series', {
    type: DataTypes.STRING,
  }, {
    mustExist: false
  }).catch(() => {});
  GetConnect().getQueryInterface().addColumn(TABLENAME + 's', 'sowt_version', {
    type: DataTypes.STRING,
  }, {
    mustExist: false
  }).catch(() => {});
  GetConnect().getQueryInterface().addColumn(TABLENAME + 's', 'types_device', {
    type: DataTypes.JSON(DataTypes.STRING),
  }, {
    mustExist: false
  }).catch(() => {});
  GetConnect().getQueryInterface().addColumn(TABLENAME + 's', 'lib', {
    type: DataTypes.STRING,
  }, {
    mustExist: false
  }).catch(() => {});
  GetConnect().getQueryInterface().addColumn(TABLENAME + 's', 'parameters', {
    type: DataTypes.JSON(DataTypes.STRING),
  }, {
    mustExist: false
  }).catch(() => {});
  GetConnect().getQueryInterface().addColumn(TABLENAME + 's', 'commands', {
    type: DataTypes.JSON(DataTypes.STRING),
  }, {
    mustExist: false
  }).catch(() => {});
  GetConnect().getQueryInterface().addColumn(TABLENAME + 's', 'lib_description', {
    type: DataTypes.JSON(DataTypes.STRING),
  }, {
    mustExist: false
  }).catch(() => {});
  GetConnect().getQueryInterface().addColumn(TABLENAME + 's', 'commands', {
    type: DataTypes.JSON(DataTypes.STRING),
  }, {
    mustExist: false
  }).catch(() => {});

  setTimeout(() => {
    let data = {}
  }, 500)
}

const Mod = GetConnect({
  name: 'Mod',
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
  manufactures: {
    type: DataTypes.STRING,
  },
  mark: {
    type: DataTypes.STRING,
  },
  model: {
    type: DataTypes.STRING,
  },
  series: {
    type: DataTypes.STRING,
  },
  sowt_version: {
    type: DataTypes.STRING,
  },
  types_device: {
    type: DataTypes.JSON(DataTypes.STRING),
  },
  lib: {
    type: DataTypes.STRING,
  },
  parameters: {
    type: DataTypes.JSON(DataTypes.STRING),
  },
  commands: {
    type: DataTypes.JSON(DataTypes.STRING),
  },
  lib_description: {
    type: DataTypes.JSON(DataTypes.STRING),
  },
  commands: {
    type: DataTypes.JSON(DataTypes.STRING),
  },
})

// Добавление сообщения к смене
const Add = async (data) => {

  let uniques_where = {}
  uniques_where['name'] = data.name
  if (Object.keys(uniques_where).length) {
    return Mod.findOne({
      where: uniques_where
    }).then(res => {
      if (res) {
        return FindById(res.get('id'))
      } else {
        let error = ValidateInsert(data)
        if (error) {
          throw new Error(error)
        }
        return Mod.create(data);
      }
    })
  }

  let error = ValidateInsert(data)
  if (error) {
    throw new Error(error)
  }
  return Mod.create(data);
}

// Поиск по id
const FindById = async (id) => {
  return Mod.findOne({
    where: {
      id: id
    }
  })
}

const GetAllCount = async (id) => {
  return Mod.count()
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
  await Mod.update(data, {
    where: {
      id: data.id
    }
  })
  return FindById(data.id)
}

const GetAll = async (params) => {
  return Mod.findAll(params)
}

const GetAllSerach = async (text, params) => {
  let filter_by_text = []
  return Mod.findAll({
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
  return Mod.count({
    where: filter,
    ...filter
  })
}

const GetAllFilter = async (filter, params) => {
  if (Object.keys(filter).length == 0) {
    return [];
  }
  return Mod.findAll({
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
  if (!data.manufactures) {
    return ERROR_VALIDATE_MANUFACTURES
  }
  if (!data.mark) {
    return ERROR_VALIDATE_MARK
  }
  if (!data.model) {
    return ERROR_VALIDATE_MODEL
  }
  if (!data.types_device) {
    return ERROR_VALIDATE_TYPESDEVICE
  }
  if (!data.lib) {
    return ERROR_VALIDATE_LIB
  }
  if (!data.parameters) {
    return ERROR_VALIDATE_PARAMETERS
  }
  if (!data.commands) {
    return ERROR_VALIDATE_COMMANDS
  }
  if (!data.lib_description) {
    return ERROR_VALIDATE_LIBDESCRIPTION
  }
  if (!data.commands) {
    return ERROR_VALIDATE_СOMMANDS
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
  if (!data.manufactures) {
    return ERROR_VALIDATE_MANUFACTURES
  }
  if (!data.mark) {
    return ERROR_VALIDATE_MARK
  }
  if (!data.model) {
    return ERROR_VALIDATE_MODEL
  }
  if (!data.types_device) {
    return ERROR_VALIDATE_TYPESDEVICE
  }
  if (!data.lib) {
    return ERROR_VALIDATE_LIB
  }
  if (!data.parameters) {
    return ERROR_VALIDATE_PARAMETERS
  }
  if (!data.commands) {
    return ERROR_VALIDATE_COMMANDS
  }
  if (!data.lib_description) {
    return ERROR_VALIDATE_LIBDESCRIPTION
  }
  if (!data.commands) {
    return ERROR_VALIDATE_СOMMANDS
  }

  return ``
}

module.exports = {

  MOD_ERROR_VALIDATE_INVALID_DATA: ERROR_VALIDATE_INVALID_DATA,
  MOD_ERROR_NOT_FOUND: ERROR_NOT_FOUND,
  MOD_ERROR_VALIDATE_NAME: ERROR_VALIDATE_NAME,
  MOD_ERROR_VALIDATE_MANUFACTURES: ERROR_VALIDATE_MANUFACTURES,
  MOD_ERROR_VALIDATE_MARK: ERROR_VALIDATE_MARK,
  MOD_ERROR_VALIDATE_MODEL: ERROR_VALIDATE_MODEL,
  MOD_ERROR_VALIDATE_TYPESDEVICE: ERROR_VALIDATE_TYPESDEVICE,
  MOD_ERROR_VALIDATE_LIB: ERROR_VALIDATE_LIB,
  MOD_ERROR_VALIDATE_PARAMETERS: ERROR_VALIDATE_PARAMETERS,
  MOD_ERROR_VALIDATE_COMMANDS: ERROR_VALIDATE_COMMANDS,
  MOD_ERROR_VALIDATE_LIBDESCRIPTION: ERROR_VALIDATE_LIBDESCRIPTION,
  MOD_ERROR_VALIDATE_СOMMANDS: ERROR_VALIDATE_СOMMANDS,

  ModGetAll: GetAll,
  ModGetAllCount: GetAllCount,
  ModUpdate: Update,
  ModAdd: Add,
  ModDrop: Drop,
  ModFindById: FindById,
  ModValidateUpdate: ValidateUpdate,
  ModValidateInsert: ValidateInsert,
  ModModel: Mod,
  ModGetAllFilter: GetAllFilter,
  ModGetAllFilterCount: GetAllFilterCount,
}