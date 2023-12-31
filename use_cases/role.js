// generated

const Role = require("../entity/role");
const UserCtx = require("../entity/user");

const {
  RoleValidateInsert,
  RoleValidateUpdate,
  RoleAdd,
  RoleFindById,
  RoleUpdate,
  RoleDrop,
  RoleGetAllCount,
  RoleGetAllSearch,
  RoleGetAllSearchCount,
  RoleGetAllFilter,
  RoleGetAllFilterCount,
  RoleGetAll
} = require("../repositories/role");

const NOT_FOUND_CONTEXT = 'not fount context';
const NOT_FOUND_ROW = 'not fount row';

module.exports = {

  Role_NOT_FOUND_ROW: NOT_FOUND_ROW,
  Role_NOT_FOUND_CONTEXT: NOT_FOUND_CONTEXT,

  async AddRole(data, user_ctx) {
    if (!user_ctx || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }

    var error_validate = RoleValidateInsert(data)
    if (error_validate != '') {
      throw new Error(error_validate)
    }

    return RoleAdd(data).then(res => {
      return RoleRecalcTree().then(t => {
        return new Role(res.dataValues)
      })
    })
  },

  async EditRole(data, user_ctx) {
    if (!user_ctx || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }

    var error_validate = RoleValidateUpdate(data)
    if (error_validate != '') {
      throw new Error(error_validate)
    }

    // Если какие то поля не были переданы, то нам надо их взять
    // из текущей модели и вставить чтобы не перетереть
    return RoleFindById(data.id).then(row => {
      if (row) {

        Object.keys(row.dataValues).forEach((key, value) => {
          if (typeof data[key] == 'undefined') {
            data[key] = row.dataValues[key]
          }
        })

        return RoleUpdate(data).then(res => {
          if (!res) {
            throw new Error(NOT_FOUND_ROW)
          }
          return RoleRecalcTree().then(t => {
            return new Role(res.dataValues)
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

  async DropRole(id, user_ctx) {
    if (!user_ctx || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }

    return RoleFindById(id).then(r => {
      if (r) {
        return RoleDrop(id).then(res => {
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

  async GetAllRole(params, user_ctx) {
    if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }
    return RoleGetAll(params).then(res => {
      let output = []
      res.forEach(r => {
        output.push(new Role(r.dataValues))
      })
      return output
    })
  },

  async GetAllCountRole(user_ctx) {
    if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }
    return RoleGetAllCount()
  },

  async GetAllByFilterRole(filter, params, user_ctx) {
    if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }
    return RoleGetAllFilter(filter, params).then(res => {
      let output = []
      res.forEach(r => {
        output.push(new Role(r.dataValues))
      })
      return output
    })
  },

  async GetAllSearchRole(text, params, user_ctx) {
    if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }
    return RoleGetAllSearch(text, params).then(res => {
      let output = []
      res.forEach(r => {
        output.push(new Role(r.dataValues))
      })
      return output
    })
  },

  async GetAllSearchCountRole(text, user_ctx) {
    if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }
    return RoleGetAllSearchCount(text)
  },

  async GetAllByFilterCountRole(filter, user_ctx) {
    if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }
    return RoleGetAllFilterCount(filter)
  },

  async FindByIdRole(id, user_ctx) {
    if (!user_ctx || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }

    return RoleFindById(id).then(res => {
      if (!res) {
        throw new Error(NOT_FOUND_ROW)
      }
      return new Role(res.dataValues)
    })
  },

}