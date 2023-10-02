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

const TABLENAME = 'user'

const ERROR_VALIDATE_INVALID_DATA = `invalid data`;
const ERROR_NOT_FOUND = `not found`;
const ERROR_VALIDATE_NAME = 'error validate data: name'
const ERROR_UPDATE_ISSET_NAME = 'error: undefined data: name'
const ERROR_VALIDATE_LOGIN = 'error validate data: login'
const ERROR_UPDATE_ISSET_LOGIN = 'error: undefined data: login'
const ERROR_VALIDATE_PASSWORD = 'error validate data: password'
const ERROR_UPDATE_ISSET_PASSWORD = 'error: undefined data: password'
const ERROR_VALIDATE_ISGROUP = 'error validate data: is_group'
const ERROR_UPDATE_ISSET_ISGROUP = 'error: undefined data: is_group'

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
  GetConnect().getQueryInterface().addColumn(TABLENAME + 's', 'last_name', {
    type: DataTypes.STRING,
  }, {
    mustExist: false
  }).catch(() => {});
  GetConnect().getQueryInterface().addColumn(TABLENAME + 's', 'login', {
    type: DataTypes.STRING,
  }, {
    mustExist: false
  }).catch(() => {});
  GetConnect().getQueryInterface().addColumn(TABLENAME + 's', 'password', {
    type: DataTypes.STRING,
  }, {
    mustExist: false
  }).catch(() => {});
  GetConnect().getQueryInterface().addColumn(TABLENAME + 's', 'parent_id', {
    type: DataTypes.INTEGER,
  }, {
    mustExist: false
  }).catch(() => {});
  GetConnect().getQueryInterface().addColumn(TABLENAME + 's', 'is_group', {
    type: DataTypes.BOOLEAN,
  }, {
    mustExist: false
  }).catch(() => {});
  GetConnect().getQueryInterface().addColumn(TABLENAME + 's', 'lft', {
    type: DataTypes.INTEGER,
  }, {
    mustExist: false
  }).catch(() => {});
  GetConnect().getQueryInterface().addColumn(TABLENAME + 's', 'rgt', {
    type: DataTypes.INTEGER,
  }, {
    mustExist: false
  }).catch(() => {});
  GetConnect().getQueryInterface().addColumn(TABLENAME + 's', 'token', {
    type: DataTypes.STRING,
  }, {
    mustExist: false
  }).catch(() => {});
  GetConnect().getQueryInterface().addColumn(TABLENAME + 's', 'is_system', {
    type: DataTypes.BOOLEAN,
  }, {
    mustExist: false
  }).catch(() => {});

  setTimeout(() => {
    let data = {}
  }, 500)
}

// Инициализация модели
const User = GetConnect({
  name: 'User',
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
  last_name: {
    type: DataTypes.STRING,
  },
  login: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  parent_id: {
    type: DataTypes.INTEGER,
  },
  is_group: {
    type: DataTypes.BOOLEAN,
  },
  lft: {
    type: DataTypes.INTEGER,
  },
  rgt: {
    type: DataTypes.INTEGER,
  },
  token: {
    type: DataTypes.STRING,
  },
  is_system: {
    type: DataTypes.BOOLEAN,
  },
})

// Добавление записи
const Add = async (data) => {

  let uniques_where = {}
  if (Object.keys(uniques_where).length) {
    return User.findOne({
      where: uniques_where
    }).then(res => {
      if (res) {
        return FindById(res.get('id'))
      } else {
        let error = ValidateInsert(data)
        if (error) {
          throw new Error(error)
        }
        APP_EVENTS.emit(`ADD:user`, data)
        return User.create(data);
      }
    })
  }

  let error = ValidateInsert(data)
  if (error) {
    throw new Error(error)
  }
  return User.create(data);
}

// Поиск по id
const FindById = async (id) => {
  return User.findOne({
    where: {
      id: id
    }
  })
}

// Получение всех записей
const GetAllCount = async (id) => {
  return User.count()
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
          APP_EVENTS.emit(`DELETE:user:${id}`)
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
  await User.update(data, {
    where: {
      id: data.id
    }
  })
  APP_EVENTS.emit(`UPDATE:user:${data.id}`)
  return FindById(data.id)
}

// Получение всех записей
const GetAll = async (params) => {
  return User.findAll(params)
}

// Получение всех записей по вхождению строки куда либо
const GetAllSerach = async (text, params) => {
  let filter_by_text = []
  return User.findAll({
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
  return User.count({
    where: filter,
    ...filter
  })
}

// Фильтрация записей. Подходит для касточных запросов
const GetAllFilter = async (filter, params) => {
  if (Object.keys(filter).length == 0) {
    return [];
  }
  return User.findAll({
    where: filter,
    ...params
  })
}

// Валидация для обновления данных
const ValidateUpdate = (data) => {

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
  if (!data.login) {
    return ERROR_VALIDATE_LOGIN
  }
  if (!data.password) {
    return ERROR_VALIDATE_PASSWORD
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
    return {
      res: 'success'
    }
  }).catch(e => {
    console.log(e)
  })

}

module.exports = {

  USER_ERROR_VALIDATE_INVALID_DATA: ERROR_VALIDATE_INVALID_DATA,
  USER_ERROR_NOT_FOUND: ERROR_NOT_FOUND,
  USER_ERROR_VALIDATE_NAME: ERROR_VALIDATE_NAME,
  USER_ERROR_VALIDATE_LOGIN: ERROR_VALIDATE_LOGIN,
  USER_ERROR_VALIDATE_PASSWORD: ERROR_VALIDATE_PASSWORD,
  USER_ERROR_VALIDATE_ISGROUP: ERROR_VALIDATE_ISGROUP,

  UserGetAll: GetAll,
  UserGetAllCount: GetAllCount,
  UserUpdate: Update,
  UserAdd: Add,
  UserDrop: Drop,
  UserFindById: FindById,
  UserValidateUpdate: ValidateUpdate,
  UserValidateInsert: ValidateInsert,
  UserModel: User,
  UserGetAllFilter: GetAllFilter,
  UserGetAllFilterCount: GetAllFilterCount,
  UserRecalcTree: RecalcTree,
}