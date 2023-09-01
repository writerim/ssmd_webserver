// generated

const Device = require("../entity/device");
const UserCtx = require("../entity/user");

const {
  DeviceValidateInsert,
  DeviceValidateUpdate,
  DeviceAdd,
  DeviceFindById,
  DeviceUpdate,
  DeviceDrop,
  DeviceGetAllCount,
  DeviceGetAllSerach,
  DeviceGetAllSerachCount,
  DeviceGetAllFilter,
  DeviceGetAllFilterCount,
  DeviceGetAll
} = require("../repositories/device");

const NOT_FOUND_CONTEXT = 'not fount context';
const NOT_FOUND_ROW = 'not fount row';

module.exports = {

  Device_NOT_FOUND_ROW: NOT_FOUND_ROW,
  Device_NOT_FOUND_CONTEXT: NOT_FOUND_CONTEXT,

  async AddDevice(data, user_ctx) {
    if (!user_ctx || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }

    if (typeof data.lft !== 'undefined') {
      delete data.lft
    }
    if (typeof data.rgt !== 'undefined') {
      delete data.rgt
    }

    var error_validate = DeviceValidateInsert(data)
    if (error_validate != '') {
      throw new Error(error_validate)
    }

    return DeviceAdd(data).then(res => new Device(res.dataValues))
  },

  async EditDevice(data, user_ctx) {
    if (!user_ctx || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }

    var error_validate = DeviceValidateUpdate(data)
    if (error_validate != '') {
      throw new Error(error_validate)
    }

    // Если какие то поля не были переданы, то нам надо их взять
    // из текущей модели и вставить чтобы не перетереть
    return DeviceFindById(id).then(row => {
      if (row) {

        if (typeof data.lft !== 'undefined') {
          delete data.lft
        }
        if (typeof data.rgt !== 'undefined') {
          delete data.rgt
        }

        row.dataValues.forEach((key, value) => {
          if (typeof data[key] == 'undefined') {
            data[key] = value
          }
        })

        return DeviceUpdate(data).then(res => {
          if (!res) {
            throw new Error(NOT_FOUND_ROW)
          }
          return new Device(res.dataValues)
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

  async DropDevice(id, user_ctx) {
    if (!user_ctx || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }

    return DeviceFindById(id).then(r => {
      if (r) {
        return DeviceDrop(id).then(res => {
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

  async GetAllDevice(params, user_ctx) {
    if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }
    return DeviceGetAll(params).then(res => {
      let output = []
      res.forEach(r => {
        output.push(new Device(r.dataValues))
      })
      return output
    })
  },

  async GetAllCountDevice(user_ctx) {
    if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }
    return DeviceGetAllCount()
  },

  async GetAllByFilterDevice(filter, params, user_ctx) {
    if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }
    return DeviceGetAllFilter(filter, params).then(res => {
      let output = []
      res.forEach(r => {
        output.push(new Device(r.dataValues))
      })
      return output
    })
  },

  async GetAllSerachDevice(text, params, user_ctx) {
    if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }
    return DeviceGetAllSerach(text, params).then(res => {
      let output = []
      res.forEach(r => {
        output.push(new Device(r.dataValues))
      })
      return output
    })
  },

  async GetAllSerachCountDevice(text, filter, user_ctx) {
    if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }
    return DeviceGetAllFilterCount(text, filter)
  },

  async GetAllByFilterCountDevice(filter, user_ctx) {
    if (!user_ctx || typeof user_ctx != 'object' || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }
    return DeviceGetAllFilterCount(filter)
  },

  async FindByIdDevice(id, user_ctx) {
    if (!user_ctx || !(user_ctx instanceof UserCtx)) {
      throw new Error(NOT_FOUND_CONTEXT)
    }

    return DeviceFindById(id).then(res => {
      if (!res) {
        throw new Error(NOT_FOUND_ROW)
      }
      return new Device(res.dataValues)
    })
  },

}