const {
  AddUser,
  EditUser,
  DropUser,
  GetAllUser,
  FindByIdUser,
  User_NOT_FOUND_ROW,
  User_NOT_FOUND_CONTEXT,
  USER_ERROR_NOT_FOUND
} = require('./user.js');

const User = require("../entity/user");

const {
  USER_ERROR_VALIDATE_INVALID_DATA,
} = require('../repositories/user.js');

const assert = require('assert').strict;

describe("use_cases: User", function () {

  let add_id = 0

  it('func Add. Корректное добавление', async function () {

    let o = {}

    o['name'] = 'test'
    o['last_name'] = 'test'
    o['login'] = 'test'
    o['password'] = 'test'
    o['parent_id'] = 10
    o['is_group'] = true
    o['token'] = 'test'
    o['is_system'] = true
    return AddUser(o, new User())
    .then(res => {
      add_id = res.id

      assert.equal(res.name, 'test')

      assert.equal(res.last_name, 'test')

      assert.equal(res.login, 'test')

      assert.equal(res.password, 'test')

      assert.equal(res.parent_id, 10)

      assert.equal(res.is_group, true)

      assert.equal(res.token, 'test')

      assert.equal(res.is_system, true)
    })
  })

  it('func User GetAll. Получение всех записей', async function () {
    return GetAllUser({
      limit: 10,
      offset: 0
    }, new User({})).then(res => {
      if (res.length) {
        res = res[0]

        assert.equal(res.name, 'test')

        assert.equal(res.last_name, 'test')

        assert.equal(res.login, 'test')

        assert.equal(res.password, 'test')

        assert.equal(res.parent_id, 10)

        assert.equal(res.is_group, true)

        assert.equal(res.token, 'test')

        assert.equal(res.is_system, true)
      }
    })
  })

  it('func User FindById. Получение несуществующей записи', async function () {
    return FindByIdUser(0, new User()).catch(res => assert.equal(res.message, User_NOT_FOUND_ROW))
  })

  it('func User FindById. Получение одной конкретной записи', async function () {
    return FindByIdUser(add_id, new User()).then(res => {

      assert.equal(res.name, 'test')

      assert.equal(res.last_name, 'test')

      assert.equal(res.login, 'test')

      assert.equal(res.password, 'test')

      assert.equal(res.parent_id, 10)

      assert.equal(res.is_group, true)

      assert.equal(res.token, 'test')

      assert.equal(res.is_system, true)
    })
  })

  it('func User Update. Редоктирование корректными значениями', async function () {

    let o = {}

    o['id'] = add_id

    o['name'] = 'test 2'

    o['last_name'] = 'test 2'

    o['login'] = 'test 2'

    o['password'] = 'test 2'

    o['parent_id'] = 54

    o['is_group'] = false

    o['token'] = 'test 2'

    o['is_system'] = false

    return EditUser(o, new User()).then(res => {
      assert.equal(res.id, add_id)

      assert.equal(res.name, 'test 2')

      assert.equal(res.last_name, 'test 2')

      assert.equal(res.login, 'test 2')

      assert.equal(res.password, 'test 2')

      assert.equal(res.parent_id, 54)

      assert.equal(res.is_group, false)

      assert.equal(res.token, 'test 2')

      assert.equal(res.is_system, false)
    })
  })

  it('func User Drop. Удаление несуществующей сущности', async function () {
    return DropUser(0, new User()).catch(e => assert.equal(e.message, USER_ERROR_NOT_FOUND))
  })

  it('func User Drop. Корректное удаление', async function () {
    return DropUser(add_id, new User())
    .then(res => assert.deepStrictEqual(res, {
      result: true
    }))
  })

})