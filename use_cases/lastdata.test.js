const {
  AddLastData,
  EditLastData,
  DropLastData,
  GetAllLastData,
  FindByIdLastData,
  LastData_NOT_FOUND_ROW,
  LastData_NOT_FOUND_CONTEXT,
  LASTDATA_ERROR_NOT_FOUND
} = require('./lastdata.js');

const User = require("../entity/user");

const {
  LASTDATA_ERROR_VALIDATE_INVALID_DATA,
} = require('../repositories/lastdata.js');

const assert = require('assert').strict;

describe("use_cases: LastData", function () {

  let add_id = 0

  it('func Add. Корректное добавление', async function () {

    let o = {}

    o['device_id'] = 10
    o['parameter_id'] = 10
    o['data'] = {
      'foo': 'bar'
    }
    return AddLastData(o, new User())
      .then(res => {
        add_id = res.id

        assert.equal(res.device_id, 10)

        assert.equal(res.parameter_id, 10)

        assert.deepStrictEqual(res.data, {
          'foo': 'bar'
        })

      })
  })

  it('func LastData GetAll. Получение всех записей', async function () {
    return GetAllLastData({
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

  it('func LastData FindById. Получение несуществующей записи', async function () {
    return FindByIdLastData(0, new User()).catch(res => assert.equal(res.message, LastData_NOT_FOUND_ROW))
  })

  it('func LastData FindById. Получение одной конкретной записи', async function () {
    return FindByIdLastData(add_id, new User()).then(res => {

      assert.equal(res.device_id, 10)

      assert.equal(res.parameter_id, 10)

      assert.deepStrictEqual(res.data, {
        'foo': 'bar'
      })

    })
  })

  it('func LastData Update. Редоктирование корректными значениями', async function () {

    let o = {}

    o['id'] = add_id
    o['device_id'] = 54
    o['parameter_id'] = 54
    o['data'] = {
      'dd': 'sss'
    }

    return EditLastData(o, new User()).then(res => {
      assert.equal(res.id, add_id)

      assert.equal(res.device_id, 54)

      assert.equal(res.parameter_id, 54)

      assert.deepStrictEqual(res.data, {
        'dd': 'sss'
      })

    })
  })

  it('func LastData Drop. Удаление несуществующей сущности', async function () {
    return DropLastData(0, new User()).catch(e => assert.equal(e.message, LASTDATA_ERROR_NOT_FOUND))
  })

  it('func LastData Drop. Корректное удаление', async function () {
    return DropLastData(add_id, new User())
      .then(res => assert.deepStrictEqual(res, {
        result: true
      }))
  })

})