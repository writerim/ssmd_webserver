const {
  DataAdd,
  DataDrop,
  DataValidate,
  DataUpdate,
  DataGetAll,
  DataFindById,
  DATA_ERROR_VALIDATE_INVALID_DATA,
  DATA_ERROR_NOT_FOUND,
} = require('./Data');

const assert = require('assert').strict;

describe("repo: DB: Data", function () {

  let add_id = 0

  it('func Add. Корректное добавление', async function () {

    let o = {}

    o['device_id'] = 10
    o['parameter_id'] = 10
    o['data'] = {
      'foo': 'bar'
    }
    return DataAdd(o)
    .then(res => {
      add_id = res.get('id')

      assert.equal(res.get('device_id'), 10)

      assert.equal(res.get('parameter_id'), 10)

      assert.deepStrictEqual(res.get('data'), {
        'foo': 'bar'
      })

    })
  })

  it('func Data GetAll. Получение всех записей', async function () {
    return DataGetAll().then(res => {
      if (res.length) {
        res = res[0]

        assert.equal(res.get('device_id'), 10)

        assert.equal(res.get('parameter_id'), 10)

        assert.deepStrictEqual(res.get('data'), {
          'foo': 'bar'
        })

      }
    })
  })

  it('func Data FindById. Получение несуществующей записи', async function () {
    return DataFindById(0).then(res => assert.equal(res, null))
  })

  it('func Data FindById. Получение одной конкретной записи', async function () {
    return DataFindById(add_id).then(res => {

      assert.equal(res.get('device_id'), 10)

      assert.equal(res.get('parameter_id'), 10)

      assert.deepStrictEqual(res.get('data'), {
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

    return DataUpdate(o).then(res => {
      assert.equal(res.get('id'), add_id)

      assert.equal(res.get('device_id'), 54)

      assert.equal(res.get('parameter_id'), 54)

      assert.deepStrictEqual(res.get('data'), {
        'dd': 'sss'
      })

    })
  })

  it('func Data Drop. Удаление несуществующей сущности', async function () {
    return DataDrop(0).catch(e => assert.equal(e.message, DATA_ERROR_NOT_FOUND))
  })

  it('func Data Drop. Корректное удаление', async function () {
    return DataDrop(add_id)
    .then(res => assert.deepStrictEqual(res, {
      result: true
    }))
  })

})