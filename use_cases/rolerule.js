// generated

const RoleRule = require("../entity/rolerule");
const UserCtx = require("../entity/user");

const {
  RoleRuleValidateInsert,
  RoleRuleValidateUpdate,
  RoleRuleAdd,
  RoleRuleFindById,
  RoleRuleUpdate,
  RoleRuleDrop,
  RoleRuleGetAllCount,
  RoleRuleGetAllSearch,
  RoleRuleGetAllSearchCount,
  RoleRuleGetAllFilter,
  RoleRuleGetAllFilterCount,
  RoleRuleGetAll
} = require("../repositories/rolerule");

const NOT_FOUND_CONTEXT = 'not fount context';
const NOT_FOUND_ROW = 'not fount row';

module.exports = {

  RoleRule_NOT_FOUND_ROW: NOT_FOUND_ROW,
  RoleRule_NOT_FOUND_CONTEXT: NOT_FOUND_CONTEXT,

  async AddRoleRule(data, user_ctx) {
    if (!user_ctx || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }

    var error_validate = RoleRuleValidateInsert(data)
    if (error_validate != '') {
      throw new Error(error_validate)
    }

    return RoleRuleAdd(data).then(res => {
      return RoleRuleRecalcTree().then(t => {
        return new RoleRule(res.dataValues)
      })
    })
  },

  async EditRoleRule(data, user_ctx) {
    if (!user_ctx || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }

    var error_validate = RoleRuleValidateUpdate(data)
    if (error_validate != '') {
      throw new Error(error_validate)
    }

    // Если какие то поля не были переданы, то нам надо их взять
    // из текущей модели и вставить чтобы не перетереть
    return RoleRuleFindById(data.id).then(row => {
      if (row) {

        Object.keys(row.dataValues).forEach((key, value) => {
          if (typeof data[key] == 'undefined') {
            data[key] = row.dataValues[key]
          }
        })

        return RoleRuleUpdate(data).then(res => {
          if (!res) {
            throw new Error(NOT_FOUND_ROW)
          }
          return RoleRuleRecalcTree().then(t => {
            return new RoleRule(res.dataValues)
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

  async DropRoleRule(id, user_ctx) {
    if (!user_ctx || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }

    return RoleRuleFindById(id).then(r => {
      if (r) {
        return RoleRuleDrop(id).then(res => {
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

  async GetAllRoleRule(params, user_ctx) {
    if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }
    return RoleRuleGetAll(params).then(res => {
      let output = []
      res.forEach(r => {
        output.push(new RoleRule(r.dataValues))
      })
      return output
    })
  },

  async GetAllCountRoleRule(user_ctx) {
    if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }
    return RoleRuleGetAllCount()
  },

  async GetAllByFilterRoleRule(filter, params, user_ctx) {
    if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }
    return RoleRuleGetAllFilter(filter, params).then(res => {
      let output = []
      res.forEach(r => {
        output.push(new RoleRule(r.dataValues))
      })
      return output
    })
  },

  async GetAllSearchRoleRule(text, params, user_ctx) {
    if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }
    return RoleRuleGetAllSearch(text, params).then(res => {
      let output = []
      res.forEach(r => {
        output.push(new RoleRule(r.dataValues))
      })
      return output
    })
  },

  async GetAllSearchCountRoleRule(text, user_ctx) {
    if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }
    return RoleRuleGetAllSearchCount(text)
  },

  async GetAllByFilterCountRoleRule(filter, user_ctx) {
    if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }
    return RoleRuleGetAllFilterCount(filter)
  },

  async FindByIdRoleRule(id, user_ctx) {
    if (!user_ctx || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }

    return RoleRuleFindById(id).then(res => {
      if (!res) {
        throw new Error(NOT_FOUND_ROW)
      }
      return new RoleRule(res.dataValues)
    })
  },

}