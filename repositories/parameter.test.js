const {
  ParameterAdd,
  ParameterDrop,
  ParameterValidate,
  ParameterUpdate,
  ParameterGetAll,
  ParameterFindById,
  PARAMETER_ERROR_VALIDATE_INVALID_DATA,
  PARAMETER_ERROR_NOT_FOUND,
} = require('./Parameter');

const assert = require('assert').strict;

describe("repo: DB: Parameter", function () {

  let add_id = 0

  it('func Add. Корректное добавление', async function () {

    let o = {}

    o['ident'] = 'test'
    return ParameterAdd(o)
      .then(res => {
        add_id = res.get('id')

        assert.equal(res.get('ident'), 'test')
      })
  })

  it('func Parameter GetAll. Получение всех записей', async function () {
    return ParameterGetAll().then(res => {
      if (res.length) {
        res = res[0]

        assert.equal(res.get('ident'), 'test')
      }
    })
  })

  it('func Parameter FindById. Получение несуществующей записи', async function () {
    return ParameterFindById(0).then(res => assert.equal(res, null))
  })

  it('func Parameter FindById. Получение одной конкретной записи', async function () {
    return ParameterFindById(add_id).then(res => {

      assert.equal(res.get('ident'), 'test')
    })
  })

  it('func Parameter Update. Редоктирование корректными значениями', async function () {

    let o = {}

    o['id'] = add_id
    o['ident'] = 'test 2'

    return ParameterUpdate(o).then(res => {
      assert.equal(res.get('id'), add_id)

      assert.equal(res.get('ident'), 'test 2')
    })
  })

  it('func Parameter Drop. Удаление несуществующей сущности', async function () {
    return ParameterDrop(0).catch(e => assert.equal(e.message, PARAMETER_ERROR_NOT_FOUND))
  })

  it('func Parameter Drop. Корректное удаление', async function () {
    return ParameterDrop(add_id)
      .then(res => assert.deepStrictEqual(res, {
        result: true
      }))
  })

})