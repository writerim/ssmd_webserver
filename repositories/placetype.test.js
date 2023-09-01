const {
  PlaceTypeAdd,
  PlaceTypeDrop,
  PlaceTypeValidate,
  PlaceTypeUpdate,
  PlaceTypeGetAll,
  PlaceTypeFindById,
  PLACETYPE_ERROR_VALIDATE_INVALID_DATA,
  PLACETYPE_ERROR_NOT_FOUND,
} = require('./PlaceType');

const assert = require('assert').strict;

describe("repo: DB: PlaceType", function () {

  let add_id = 0

  it('func Add. Корректное добавление', async function () {

    let o = {}

    o['ident'] = 'test'
    o['icon'] = 'test'
    return PlaceTypeAdd(o)
    .then(res => {
      add_id = res.get('id')

      assert.equal(res.get('ident'), 'test')

      assert.equal(res.get('icon'), 'test')
    })
  })

  it('func PlaceType GetAll. Получение всех записей', async function () {
    return PlaceTypeGetAll().then(res => {
      if (res.length) {
        res = res[0]

        assert.equal(res.get('ident'), 'test')

        assert.equal(res.get('icon'), 'test')
      }
    })
  })

  it('func PlaceType FindById. Получение несуществующей записи', async function () {
    return PlaceTypeFindById(0).then(res => assert.equal(res, null))
  })

  it('func PlaceType FindById. Получение одной конкретной записи', async function () {
    return PlaceTypeFindById(add_id).then(res => {

      assert.equal(res.get('ident'), 'test')

      assert.equal(res.get('icon'), 'test')
    })
  })

  it('func PlaceType Update. Редоктирование корректными значениями', async function () {

    let o = {}

    o['id'] = add_id
    o['ident'] = 'test 2'
    o['icon'] = 'test 2'

    return PlaceTypeUpdate(o).then(res => {
      assert.equal(res.get('id'), add_id)

      assert.equal(res.get('ident'), 'test 2')

      assert.equal(res.get('icon'), 'test 2')
    })
  })

  it('func PlaceType Drop. Удаление несуществующей сущности', async function () {
    return PlaceTypeDrop(0).catch(e => assert.equal(e.message, PLACETYPE_ERROR_NOT_FOUND))
  })

  it('func PlaceType Drop. Корректное удаление', async function () {
    return PlaceTypeDrop(add_id)
    .then(res => assert.deepStrictEqual(res, {
      result: true
    }))
  })

})