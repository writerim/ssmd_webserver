// generated

const User = require("../entity/user");
const UserCtx = require("../entity/user");

const {
  UserValidateInsert,
  UserValidateUpdate,
  UserAdd,
  UserFindById,
  UserUpdate,
  UserDrop,
  UserGetAllCount,
  UserGetAllSearch,
  UserGetAllSearchCount,
  UserGetAllFilter,
  UserRecalcTree,
  UserGetAllFilterCount,
  UserGetAll
} = require("../repositories/user");

const NOT_FOUND_CONTEXT = 'not fount context';
const NOT_FOUND_ROW = 'not fount row';

module.exports = {

  User_NOT_FOUND_ROW: NOT_FOUND_ROW,
  User_NOT_FOUND_CONTEXT: NOT_FOUND_CONTEXT,

  async AddUser(data, user_ctx) {
    if (!user_ctx || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }

    if (typeof data.lft !== 'undefined') {
      delete data.lft
    }
    if (typeof data.rgt !== 'undefined') {
      delete data.rgt
    }

    var error_validate = UserValidateInsert(data)
    if (error_validate != '') {
      throw new Error(error_validate)
    }

    return UserAdd(data).then(res => {
      return UserRecalcTree().then(t => {
        return new User(res.dataValues)
      })
    })
  },

  async EditUser(data, user_ctx) {
    if (!user_ctx || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }

    var error_validate = UserValidateUpdate(data)
    if (error_validate != '') {
      throw new Error(error_validate)
    }

    // Если какие то поля не были переданы, то нам надо их взять
    // из текущей модели и вставить чтобы не перетереть
    return UserFindById(data.id).then(row => {
      if (row) {
        if (typeof data.lft !== 'undefined') {
          delete data.lft
        }
        if (typeof data.rgt !== 'undefined') {
          delete data.rgt
        }

        Object.keys(row.dataValues).forEach((key, value) => {
          if (typeof data[key] == 'undefined') {
            data[key] = row.dataValues[key]
          }
        })

        return UserUpdate(data).then(res => {
          if (!res) {
            throw new Error(NOT_FOUND_ROW)
          }
          return UserRecalcTree().then(t => {
            return new User(res.dataValues)
          })
        })
      }
      return new Promise((resolve) => resolve({
        result: false
      }))
    }).catch(e => {
      console.log(e);
      throw new Error(e)
    })

  },

  async DropUser(id, user_ctx) {
    if (!user_ctx || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }

    return UserFindById(id).then(r => {
      if (r) {
        return UserDrop(id).then(res => {
          if (res) {
            return new Promise((resolve) => resolve({
              result: true
            }))
          }
          return new Promise((resolve) => resolve({
            result: false
          }))
        }).catch(e => {
          console.log(e)
          throw new Error(e)
        })
      }
      return new Promise((resolve) => resolve({
        result: false
      }))
    }).catch(e => {
      console.log(e)
      throw new Error(e)
    })
  },

  async GetAllUser(params, user_ctx) {
    if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }
    return UserGetAll(params).then(res => {
      let output = []
      res.forEach(r => {
        output.push(new User(r.dataValues))
      })
      return output
    })
  },

  async GetAllCountUser(user_ctx) {
    if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }
    return UserGetAllCount()
  },

  async GetAllByFilterUser(filter, params, user_ctx) {
    if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }
    return UserGetAllFilter(filter, params).then(res => {
      let output = []
      res.forEach(r => {
        output.push(new User(r.dataValues))
      })
      return output
    })
  },

  async GetAllSearchUser(text, params, user_ctx) {
    if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }
    return UserGetAllSearch(text, params).then(res => {
      let output = []
      res.forEach(r => {
        output.push(new User(r.dataValues))
      })
      return output
    })
  },

  async GetAllSearchCountUser(text, user_ctx) {
    if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }
    return UserGetAllSearchCount(text)
  },

  async GetAllByFilterCountUser(filter, user_ctx) {
    if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }
    return UserGetAllFilterCount(filter)
  },

  async FindByIdUser(id, user_ctx) {
    if (!user_ctx || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }

    return UserFindById(id).then(res => {
      if (!res) {
        throw new Error(NOT_FOUND_ROW)
      }
      return new User(res.dataValues)
    })
  },

}