const {
  UserAdd,
  UserDrop,
  UserValidate,
  UserUpdate,
  UserGetAll,
  UserFindById,
  UserRecalcTree,
  USER_ERROR_VALIDATE_INVALID_DATA,
  USER_ERROR_NOT_FOUND,
} = require('./User');

const assert = require('assert').strict;

describe("repo: DB: User", function () {

  let add_id = 0

  it('func Add. Корректное добавление', async function () {

    let o = {}

    o['name'] = 'test'
    o['last_name'] = 'test'
    o['login'] = 'test'
    o['password'] = 'test'
    o['parent_id'] = 10
    o['is_group'] = true
    o['lft'] = 10
    o['rgt'] = 10
    o['token'] = 'test'
    o['is_system'] = true
    return UserAdd(o)
    .then(res => {
      add_id = res.get('id')

      assert.equal(res.get('name'), 'test')

      assert.equal(res.get('last_name'), 'test')

      assert.equal(res.get('login'), 'test')

      assert.equal(res.get('password'), 'test')

      assert.equal(res.get('parent_id'), 10)

      assert.equal(res.get('is_group'), true)

      assert.equal(res.get('lft'), 10)

      assert.equal(res.get('rgt'), 10)

      assert.equal(res.get('token'), 'test')

      assert.equal(res.get('is_system'), true)
    })
  })

  it('func User GetAll. Получение всех записей', async function () {
    return UserGetAll().then(res => {
      if (res.length) {
        res = res[0]

        assert.equal(res.get('name'), 'test')

        assert.equal(res.get('last_name'), 'test')

        assert.equal(res.get('login'), 'test')

        assert.equal(res.get('password'), 'test')

        assert.equal(res.get('parent_id'), 10)

        assert.equal(res.get('is_group'), true)

        assert.equal(res.get('lft'), 10)

        assert.equal(res.get('rgt'), 10)

        assert.equal(res.get('token'), 'test')

        assert.equal(res.get('is_system'), true)
      }
    })
  })

  it('func User FindById. Получение несуществующей записи', async function () {
    return UserFindById(0).then(res => assert.equal(res, null))
  })

  it('func User FindById. Получение одной конкретной записи', async function () {
    return UserFindById(add_id).then(res => {

      assert.equal(res.get('name'), 'test')

      assert.equal(res.get('last_name'), 'test')

      assert.equal(res.get('login'), 'test')

      assert.equal(res.get('password'), 'test')

      assert.equal(res.get('parent_id'), 10)

      assert.equal(res.get('is_group'), true)

      assert.equal(res.get('lft'), 10)

      assert.equal(res.get('rgt'), 10)

      assert.equal(res.get('token'), 'test')

      assert.equal(res.get('is_system'), true)
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
    o['lft'] = 54
    o['rgt'] = 54
    o['token'] = 'test 2'
    o['is_system'] = false

    return UserUpdate(o).then(res => {
      assert.equal(res.get('id'), add_id)

      assert.equal(res.get('name'), 'test 2')

      assert.equal(res.get('last_name'), 'test 2')

      assert.equal(res.get('login'), 'test 2')

      assert.equal(res.get('password'), 'test 2')

      assert.equal(res.get('parent_id'), 54)

      assert.equal(res.get('is_group'), false)

      assert.equal(res.get('lft'), 54)

      assert.equal(res.get('rgt'), 54)

      assert.equal(res.get('token'), 'test 2')

      assert.equal(res.get('is_system'), false)
    })
  })

  it('func User Drop. Удаление несуществующей сущности', async function () {
    return UserDrop(0).catch(e => assert.equal(e.message, USER_ERROR_NOT_FOUND))
  })

  it('func User Drop. Корректное удаление', async function () {
    return UserDrop(add_id)
    .then(res => assert.deepStrictEqual(res, {
      result: true
    }))
  })

})