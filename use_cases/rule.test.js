const {
  AddRule,
  EditRule,
  DropRule,
  GetAllRule,
  FindByIdRule,
  Rule_NOT_FOUND_ROW,
  Rule_NOT_FOUND_CONTEXT,
  RULE_ERROR_NOT_FOUND
} = require('./rule.js');

const User = require("../entity/user");

const {
  RULE_ERROR_VALIDATE_INVALID_DATA,
} = require('../repositories/rule.js');

const assert = require('assert').strict;

describe("use_cases: Rule", function () {

  let add_id = 0

  it('func Add. Корректное добавление', async function () {

    let o = {}

    o['name'] = 'test'
    o['description'] = 'test'
    return AddRule(o, new User())
      .then(res => {
        add_id = res.id

        assert.equal(res.name, 'test')

        assert.equal(res.description, 'test')
      })
  })

  it('func Rule GetAll. Получение всех записей', async function () {
    return GetAllRule({
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

  it('func Rule FindById. Получение несуществующей записи', async function () {
    return FindByIdRule(0, new User()).catch(res => assert.equal(res.message, Rule_NOT_FOUND_ROW))
  })

  it('func Rule FindById. Получение одной конкретной записи', async function () {
    return FindByIdRule(add_id, new User()).then(res => {

      assert.equal(res.name, 'test')

      assert.equal(res.description, 'test')
    })
  })

  it('func Rule Update. Редоктирование корректными значениями', async function () {

    let o = {}

    o['id'] = add_id
    o['name'] = 'test 2'
    o['description'] = 'test 2'

    return EditRule(o, new User()).then(res => {
      assert.equal(res.id, add_id)

      assert.equal(res.name, 'test 2')

      assert.equal(res.description, 'test 2')
    })
  })

  it('func Rule Drop. Удаление несуществующей сущности', async function () {
    return DropRule(0, new User()).catch(e => assert.equal(e.message, RULE_ERROR_NOT_FOUND))
  })

  it('func Rule Drop. Корректное удаление', async function () {
    return DropRule(add_id, new User())
      .then(res => assert.deepStrictEqual(res, {
        result: true
      }))
  })

})