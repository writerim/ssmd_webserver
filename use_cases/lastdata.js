// generated

const LastData = require("../entity/lastdata");
const UserCtx = require("../entity/user");

const {
  LastDataValidateInsert,
  LastDataValidateUpdate,
  LastDataAdd,
  LastDataFindById,
  LastDataUpdate,
  LastDataDrop,
  LastDataGetAllCount,
  LastDataGetAllSearch,
  LastDataGetAllSearchCount,
  LastDataGetAllFilter,
  LastDataGetAllFilterCount,
  LastDataGetAll
} = require("../repositories/lastdata");

const NOT_FOUND_CONTEXT = 'not fount context';
const NOT_FOUND_ROW = 'not fount row';

module.exports = {

  LastData_NOT_FOUND_ROW: NOT_FOUND_ROW,
  LastData_NOT_FOUND_CONTEXT: NOT_FOUND_CONTEXT,

  async AddLastData(data, user_ctx) {
    if (!user_ctx || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }

    var error_validate = LastDataValidateInsert(data)
    if (error_validate != '') {
      throw new Error(error_validate)
    }

    return LastDataAdd(data).then(res => new LastData(res.dataValues))
  },

  async EditLastData(data, user_ctx) {
    if (!user_ctx || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }

    var error_validate = LastDataValidateUpdate(data)
    if (error_validate != '') {
      throw new Error(error_validate)
    }

    // Если какие то поля не были переданы, то нам надо их взять
    // из текущей модели и вставить чтобы не перетереть
    return LastDataFindById(id).then(row => {
      if (row) {

        row.dataValues.forEach((key, value) => {
          if (typeof data[key] == 'undefined') {
            data[key] = value
          }
        })

        return LastDataUpdate(data).then(res => {
          if (!res) {
            throw new Error(NOT_FOUND_ROW)
          }
          return new LastData(res.dataValues)
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

  async DropLastData(id, user_ctx) {
    if (!user_ctx || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }

    return LastDataFindById(id).then(r => {
      if (r) {
        return LastDataDrop(id).then(res => {
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

  async GetAllLastData(params, user_ctx) {
    if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }
    return LastDataGetAll(params).then(res => {
      let output = []
      res.forEach(r => {
        output.push(new LastData(r.dataValues))
      })
      return output
    })
  },

  async GetAllCountLastData(user_ctx) {
    if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }
    return LastDataGetAllCount()
  },

  async GetAllByFilterLastData(filter, params, user_ctx) {
    if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }
    return LastDataGetAllFilter(filter, params).then(res => {
      let output = []
      res.forEach(r => {
        output.push(new LastData(r.dataValues))
      })
      return output
    })
  },

  async GetAllSearchLastData(text, params, user_ctx) {
    if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }
    return LastDataGetAllSearch(text, params).then(res => {
      let output = []
      res.forEach(r => {
        output.push(new LastData(r.dataValues))
      })
      return output
    })
  },

  async GetAllSearchCountLastData(text, filter, user_ctx) {
    if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }
    return LastDataGetAllFilterCount(text, filter)
  },

  async GetAllByFilterCountLastData(filter, user_ctx) {
    if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }
    return LastDataGetAllFilterCount(filter)
  },

  async FindByIdLastData(id, user_ctx) {
    if (!user_ctx || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }

    return LastDataFindById(id).then(res => {
      if (!res) {
        throw new Error(NOT_FOUND_ROW)
      }
      return new LastData(res.dataValues)
    })
  },

}