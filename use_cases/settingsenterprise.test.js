const {
  AddSettingsEnterprise,
  EditSettingsEnterprise,
  DropSettingsEnterprise,
  GetAllSettingsEnterprise,
  FindByIdSettingsEnterprise,
  SettingsEnterprise_NOT_FOUND_ROW,
  SettingsEnterprise_NOT_FOUND_CONTEXT,
  SETTINGSENTERPRISE_ERROR_NOT_FOUND
} = require('./settingsenterprise.js');

const User = require("../entity/user");

const {
  SETTINGSENTERPRISE_ERROR_VALIDATE_INVALID_DATA,
} = require('../repositories/settingsenterprise.js');

const assert = require('assert').strict;

describe("use_cases: SettingsEnterprise", function () {

  let add_id = 0

  it('func Add. Корректное добавление', async function () {

    let o = {}

    o['description'] = 'test'
    o['index'] = 'test'
    o['value'] = 'test'
    return AddSettingsEnterprise(o, new User())
    .then(res => {
      add_id = res.id

      assert.equal(res.description, 'test')

      assert.equal(res.index, 'test')

      assert.equal(res.value, 'test')
    })
  })

  it('func SettingsEnterprise GetAll. Получение всех записей', async function () {
    return GetAllSettingsEnterprise({
      limit: 10,
      offset: 0
    }, new User({})).then(res => {
      if (res.length) {
        res = res[0]

        assert.equal(res.description, 'test')

        assert.equal(res.index, 'test')

        assert.equal(res.value, 'test')
      }
    })
  })

  it('func SettingsEnterprise FindById. Получение несуществующей записи', async function () {
    return FindByIdSettingsEnterprise(0, new User()).catch(res => assert.equal(res.message, SettingsEnterprise_NOT_FOUND_ROW))
  })

  it('func SettingsEnterprise FindById. Получение одной конкретной записи', async function () {
    return FindByIdSettingsEnterprise(add_id, new User()).then(res => {

      assert.equal(res.description, 'test')

      assert.equal(res.index, 'test')

      assert.equal(res.value, 'test')
    })
  })

  it('func SettingsEnterprise Update. Редоктирование корректными значениями', async function () {

    let o = {}

    o['id'] = add_id

    o['description'] = 'test 2'

    o['index'] = 'test 2'

    o['value'] = 'test 2'

    return EditSettingsEnterprise(o, new User()).then(res => {
      assert.equal(res.id, add_id)

      assert.equal(res.description, 'test 2')

      assert.equal(res.index, 'test 2')

      assert.equal(res.value, 'test 2')
    })
  })

  it('func SettingsEnterprise Drop. Удаление несуществующей сущности', async function () {
    return DropSettingsEnterprise(0, new User()).catch(e => assert.equal(e.message, SETTINGSENTERPRISE_ERROR_NOT_FOUND))
  })

  it('func SettingsEnterprise Drop. Корректное удаление', async function () {
    return DropSettingsEnterprise(add_id, new User())
    .then(res => assert.deepStrictEqual(res, {
      result: true
    }))
  })

})