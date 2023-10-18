// generated

const UserPlace = require("../entity/userplace");
const UserCtx = require("../entity/user");

const {
  UserPlaceValidateInsert,
  UserPlaceValidateUpdate,
  UserPlaceAdd,
  UserPlaceFindById,
  UserPlaceUpdate,
  UserPlaceDrop,
  UserPlaceGetAllCount,
  UserPlaceGetAllSearch,
  UserPlaceGetAllSearchCount,
  UserPlaceGetAllFilter,
  UserPlaceGetAllFilterCount,
  UserPlaceGetAll
} = require("../repositories/userplace");

const NOT_FOUND_CONTEXT = 'not fount context';
const NOT_FOUND_ROW = 'not fount row';

module.exports = {

  UserPlace_NOT_FOUND_ROW: NOT_FOUND_ROW,
  UserPlace_NOT_FOUND_CONTEXT: NOT_FOUND_CONTEXT,

  async AddUserPlace(data, user_ctx) {
    if (!user_ctx || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }

    var error_validate = UserPlaceValidateInsert(data)
    if (error_validate != '') {
      throw new Error(error_validate)
    }

    return UserPlaceAdd(data).then(res => new UserPlace(res.dataValues))
  },

  async EditUserPlace(data, user_ctx) {
    if (!user_ctx || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }

    var error_validate = UserPlaceValidateUpdate(data)
    if (error_validate != '') {
      throw new Error(error_validate)
    }

    // Если какие то поля не были переданы, то нам надо их взять
    // из текущей модели и вставить чтобы не перетереть
    return UserPlaceFindById(data.id).then(row => {
      if (row) {

        Object.keys(row.dataValues).forEach((key, value) => {
          if (typeof data[key] == 'undefined') {
            data[key] = row.dataValues[key]
          }
        })

        return UserPlaceUpdate(data).then(res => {
          if (!res) {
            throw new Error(NOT_FOUND_ROW)
          }
          return new UserPlace(res.dataValues)
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

  async DropUserPlace(id, user_ctx) {
    if (!user_ctx || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }

    return UserPlaceFindById(id).then(r => {
      if (r) {
        return UserPlaceDrop(id).then(res => {
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

  async GetAllUserPlace(params, user_ctx) {
    if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }
    return UserPlaceGetAll(params).then(res => {
      let output = []
      res.forEach(r => {
        output.push(new UserPlace(r.dataValues))
      })
      return output
    })
  },

  async GetAllCountUserPlace(user_ctx) {
    if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }
    return UserPlaceGetAllCount()
  },

  async GetAllByFilterUserPlace(filter, params, user_ctx) {
    if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }
    return UserPlaceGetAllFilter(filter, params).then(res => {
      let output = []
      res.forEach(r => {
        output.push(new UserPlace(r.dataValues))
      })
      return output
    })
  },

  async GetAllSearchUserPlace(text, params, user_ctx) {
    if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }
    return UserPlaceGetAllSearch(text, params).then(res => {
      let output = []
      res.forEach(r => {
        output.push(new UserPlace(r.dataValues))
      })
      return output
    })
  },

  async GetAllSearchCountUserPlace(text, filter, user_ctx) {
    if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }
    return UserPlaceGetAllFilterCount(text, filter)
  },

  async GetAllByFilterCountUserPlace(filter, user_ctx) {
    if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }
    return UserPlaceGetAllFilterCount(filter)
  },

  async FindByIdUserPlace(id, user_ctx) {
    if (!user_ctx || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }

    return UserPlaceFindById(id).then(res => {
      if (!res) {
        throw new Error(NOT_FOUND_ROW)
      }
      return new UserPlace(res.dataValues)
    })
  },

}