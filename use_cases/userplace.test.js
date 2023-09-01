const {
  AddUserPlace,
  EditUserPlace,
  DropUserPlace,
  GetAllUserPlace,
  FindByIdUserPlace,
  UserPlace_NOT_FOUND_ROW,
  UserPlace_NOT_FOUND_CONTEXT,
  USERPLACE_ERROR_NOT_FOUND
} = require('./userplace.js');

const User = require("../entity/user");

const {
  USERPLACE_ERROR_VALIDATE_INVALID_DATA,
} = require('../repositories/userplace.js');

const assert = require('assert').strict;

describe("use_cases: UserPlace", function () {

  let add_id = 0

  it('func Add. Корректное добавление', async function () {

    let o = {}

    o['plce_id'] = 10
    o['user_id'] = 10
    return AddUserPlace(o, new User())
    .then(res => {
      add_id = res.id

      assert.equal(res.plce_id, 10)

      assert.equal(res.user_id, 10)
    })
  })

  it('func UserPlace GetAll. Получение всех записей', async function () {
    return GetAllUserPlace({
      limit: 10,
      offset: 0
    }, new User({})).then(res => {
      if (res.length) {
        res = res[0]

        assert.equal(res.plce_id, 10)

        assert.equal(res.user_id, 10)
      }
    })
  })

  it('func UserPlace FindById. Получение несуществующей записи', async function () {
    return FindByIdUserPlace(0, new User()).catch(res => assert.equal(res.message, UserPlace_NOT_FOUND_ROW))
  })

  it('func UserPlace FindById. Получение одной конкретной записи', async function () {
    return FindByIdUserPlace(add_id, new User()).then(res => {

      assert.equal(res.plce_id, 10)

      assert.equal(res.user_id, 10)
    })
  })

  it('func UserPlace Update. Редоктирование корректными значениями', async function () {

    let o = {}

    o['id'] = add_id

    o['plce_id'] = 54

    o['user_id'] = 54

    return EditUserPlace(o, new User()).then(res => {
      assert.equal(res.id, add_id)

      assert.equal(res.plce_id, 54)

      assert.equal(res.user_id, 54)
    })
  })

  it('func UserPlace Drop. Удаление несуществующей сущности', async function () {
    return DropUserPlace(0, new User()).catch(e => assert.equal(e.message, USERPLACE_ERROR_NOT_FOUND))
  })

  it('func UserPlace Drop. Корректное удаление', async function () {
    return DropUserPlace(add_id, new User())
    .then(res => assert.deepStrictEqual(res, {
      result: true
    }))
  })

})