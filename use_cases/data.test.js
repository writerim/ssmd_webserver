const {
  AddData,
  EditData,
  DropData,
  GetAllData,
  FindByIdData,
  Data_NOT_FOUND_ROW,
  Data_NOT_FOUND_CONTEXT,
  DATA_ERROR_NOT_FOUND
} = require('./data.js');

const User = require("../entity/user");

const {
  DATA_ERROR_VALIDATE_INVALID_DATA,
} = require('../repositories/data.js');

const assert = require('assert').strict;

describe("use_cases: Data", function () {

  let add_id = 0

  it('func Add. Корректное добавление', async function () {

    let o = {}

    o['device_id'] = 10
    o['parameter_id'] = 10
    o['data'] = {
      'foo': 'bar'
    }
    return AddData(o, new User())
      .then(res => {
        add_id = res.id

        assert.equal(res.device_id, 10)

        assert.equal(res.parameter_id, 10)

        assert.deepStrictEqual(res.data, {
          'foo': 'bar'
        })

      })
  })

  it('func Data GetAll. Получение всех записей', async function () {
    return GetAllData({
      limit: 10,
      offset: 0
    }, new User({})).then(res => {
      if (res.length) {
        res = res[0]

        assert.equal(res.device_id, 10)

        assert.equal(res.parameter_id, 10)

        assert.deepStrictEqual(res.data, {
          'foo': 'bar'
        })

      }
    })
  })

  it('func Data FindById. Получение несуществующей записи', async function () {
    return FindByIdData(0, new User()).catch(res => assert.equal(res.message, Data_NOT_FOUND_ROW))
  })

  it('func Data FindById. Получение одной конкретной записи', async function () {
    return FindByIdData(add_id, new User()).then(res => {

      assert.equal(res.device_id, 10)

      assert.equal(res.parameter_id, 10)

      assert.deepStrictEqual(res.data, {
        'foo': 'bar'
      })

    })
  })

  it('func Data Update. Редоктирование корректными значениями', async function () {

    let o = {}

    o['id'] = add_id

    o['device_id'] = 54

    o['parameter_id'] = 54

    o['data'] = {
      'dd': 'sss'
    }

    return EditData(o, new User()).then(res => {
      assert.equal(res.id, add_id)

      assert.equal(res.device_id, 54)

      assert.equal(res.parameter_id, 54)

      assert.deepStrictEqual(res.data, {
        'dd': 'sss'
      })

    })
  })

  it('func Data Drop. Удаление несуществующей сущности', async function () {
    return DropData(0, new User()).catch(e => assert.equal(e.message, DATA_ERROR_NOT_FOUND))
  })

  it('func Data Drop. Корректное удаление', async function () {
    return DropData(add_id, new User())
      .then(res => assert.deepStrictEqual(res, {
        result: true
      }))
  })

})