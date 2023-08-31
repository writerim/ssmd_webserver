const {
  AddPlace,
  EditPlace,
  DropPlace,
  GetAllPlace,
  FindByIdPlace,
  Place_NOT_FOUND_ROW,
  Place_NOT_FOUND_CONTEXT,
  PLACE_ERROR_NOT_FOUND
} = require('./place.js');

const User = require("../entity/user");

const {
  PLACE_ERROR_VALIDATE_INVALID_DATA,
} = require('../repositories/place.js');

const assert = require('assert').strict;

describe("use_cases: Place", function () {

  let add_id = 0

  it('func Add. Корректное добавление', async function () {

    let o = {}

    o['name'] = 'test'
    o['parent_id'] = 10
    o['lft'] = 10
    o['rgt'] = 10
    o['icon'] = 'test'
    o['status'] = 10
    o['is_exclude'] = true
    return AddPlace(o, new User())
      .then(res => {
        add_id = res.id

        assert.equal(res.name, 'test')

        assert.equal(res.parent_id, 10)

        assert.equal(res.lft, 10)

        assert.equal(res.rgt, 10)

        assert.equal(res.icon, 'test')

        assert.equal(res.status, 10)

        assert.equal(res.is_exclude, true)
      })
  })

  it('func Place GetAll. Получение всех записей', async function () {
    return GetAllPlace({
      limit: 10,
      offset: 0
    }, new User({})).then(res => {
      if (res.length) {
        res = res[0]

        assert.equal(res.name, 'test')

        assert.equal(res.parent_id, 10)

        assert.equal(res.lft, 10)

        assert.equal(res.rgt, 10)

        assert.equal(res.icon, 'test')

        assert.equal(res.status, 10)

        assert.equal(res.is_exclude, true)
      }
    })
  })

  it('func Place FindById. Получение несуществующей записи', async function () {
    return FindByIdPlace(0, new User()).catch(res => assert.equal(res.message, Place_NOT_FOUND_ROW))
  })

  it('func Place FindById. Получение одной конкретной записи', async function () {
    return FindByIdPlace(add_id, new User()).then(res => {

      assert.equal(res.name, 'test')

      assert.equal(res.parent_id, 10)

      assert.equal(res.lft, 10)

      assert.equal(res.rgt, 10)

      assert.equal(res.icon, 'test')

      assert.equal(res.status, 10)

      assert.equal(res.is_exclude, true)
    })
  })

  it('func Place Update. Редоктирование корректными значениями', async function () {

    let o = {}

    o['id'] = add_id
    o['name'] = 'test 2'
    o['parent_id'] = 54
    o['lft'] = 54
    o['rgt'] = 54
    o['icon'] = 'test 2'
    o['status'] = 54
    o['is_exclude'] = false

    return EditPlace(o, new User()).then(res => {
      assert.equal(res.id, add_id)

      assert.equal(res.name, 'test 2')

      assert.equal(res.parent_id, 54)

      assert.equal(res.lft, 54)

      assert.equal(res.rgt, 54)

      assert.equal(res.icon, 'test 2')

      assert.equal(res.status, 54)

      assert.equal(res.is_exclude, false)
    })
  })

  it('func Place Drop. Удаление несуществующей сущности', async function () {
    return DropPlace(0, new User()).catch(e => assert.equal(e.message, PLACE_ERROR_NOT_FOUND))
  })

  it('func Place Drop. Корректное удаление', async function () {
    return DropPlace(add_id, new User())
      .then(res => assert.deepStrictEqual(res, {
        result: true
      }))
  })

})