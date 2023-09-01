const {
  AddRole,
  EditRole,
  DropRole,
  GetAllRole,
  FindByIdRole,
  Role_NOT_FOUND_ROW,
  Role_NOT_FOUND_CONTEXT,
  ROLE_ERROR_NOT_FOUND
} = require('./role.js');

const User = require("../entity/user");

const {
  ROLE_ERROR_VALIDATE_INVALID_DATA,
} = require('../repositories/role.js');

const assert = require('assert').strict;

describe("use_cases: Role", function () {

  let add_id = 0

  it('func Add. Корректное добавление', async function () {

    let o = {}

    o['name'] = 'test'
    o['description'] = 'test'
    return AddRole(o, new User())
    .then(res => {
      add_id = res.id

      assert.equal(res.name, 'test')

      assert.equal(res.description, 'test')
    })
  })

  it('func Role GetAll. Получение всех записей', async function () {
    return GetAllRole({
      limit: 10,
      offset: 0
    }, new User({})).then(res => {
      if (res.length) {
        res = res[0]

        assert.equal(res.name, 'test')

        assert.equal(res.description, 'test')
      }
    })
  })

  it('func Role FindById. Получение несуществующей записи', async function () {
    return FindByIdRole(0, new User()).catch(res => assert.equal(res.message, Role_NOT_FOUND_ROW))
  })

  it('func Role FindById. Получение одной конкретной записи', async function () {
    return FindByIdRole(add_id, new User()).then(res => {

      assert.equal(res.name, 'test')

      assert.equal(res.description, 'test')
    })
  })

  it('func Role Update. Редоктирование корректными значениями', async function () {

    let o = {}

    o['id'] = add_id

    o['name'] = 'test 2'

    o['description'] = 'test 2'

    return EditRole(o, new User()).then(res => {
      assert.equal(res.id, add_id)

      assert.equal(res.name, 'test 2')

      assert.equal(res.description, 'test 2')
    })
  })

  it('func Role Drop. Удаление несуществующей сущности', async function () {
    return DropRole(0, new User()).catch(e => assert.equal(e.message, ROLE_ERROR_NOT_FOUND))
  })

  it('func Role Drop. Корректное удаление', async function () {
    return DropRole(add_id, new User())
    .then(res => assert.deepStrictEqual(res, {
      result: true
    }))
  })

})