const {
  LastDataAdd,
  LastDataDrop,
  LastDataValidate,
  LastDataUpdate,
  LastDataGetAll,
  LastDataFindById,
  LASTDATA_ERROR_VALIDATE_INVALID_DATA,
  LASTDATA_ERROR_NOT_FOUND,
} = require('./LastData');

const assert = require('assert').strict;

describe("repo: DB: LastData", function () {

  let add_id = 0

  it('func Add. Корректное добавление', async function () {

    let o = {}

    o['device_id'] = 10
    o['parameter_id'] = 10
    o['data'] = {
      'foo': 'bar'
    }
    return LastDataAdd(o)
      .then(res => {
        add_id = res.get('id')

        assert.equal(res.get('device_id'), 10)

        assert.equal(res.get('parameter_id'), 10)

        assert.deepStrictEqual(res.get('data'), {
          'foo': 'bar'
        })

      })
  })

  it('func LastData GetAll. Получение всех записей', async function () {
    return LastDataGetAll().then(res => {
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

  it('func LastData FindById. Получение несуществующей записи', async function () {
    return LastDataFindById(0).then(res => assert.equal(res, null))
  })

  it('func LastData FindById. Получение одной конкретной записи', async function () {
    return LastDataFindById(add_id).then(res => {

      assert.equal(res.get('device_id'), 10)

      assert.equal(res.get('parameter_id'), 10)

      assert.deepStrictEqual(res.get('data'), {
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

    return LastDataUpdate(o).then(res => {
      assert.equal(res.get('id'), add_id)

      assert.equal(res.get('device_id'), 54)

      assert.equal(res.get('parameter_id'), 54)

      assert.deepStrictEqual(res.get('data'), {
        'dd': 'sss'
      })

    })
  })

  it('func LastData Drop. Удаление несуществующей сущности', async function () {
    return LastDataDrop(0).catch(e => assert.equal(e.message, LASTDATA_ERROR_NOT_FOUND))
  })

  it('func LastData Drop. Корректное удаление', async function () {
    return LastDataDrop(add_id)
      .then(res => assert.deepStrictEqual(res, {
        result: true
      }))
  })

})