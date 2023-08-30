                 

 

const { 
    SettingsEnterpriseAdd, 
    SettingsEnterpriseDrop, 
    SettingsEnterpriseValidate, 
    SettingsEnterpriseUpdate, 
    SettingsEnterpriseGetAll, 
    SettingsEnterpriseFindById, 
        SETTINGSENTERPRISE_ERROR_VALIDATE_INVALID_DATA,
    SETTINGSENTERPRISE_ERROR_NOT_FOUND,
} = require('./SettingsEnterprise');

const assert = require('assert').strict;

describe("repo: DB: SettingsEnterprise", function () {

    

    let add_id = 0

    it('func Add. Корректное добавление', async function () {

        let o = {}

                                                                            o['description'] = 'test'
                                                            o['index'] = 'test'
                                                            o['value'] = 'test'
                            return SettingsEnterpriseAdd(o)
        .then(res => {
                                                add_id = res.get('id')
                                    
                                    assert.equal(res.get('description'), 'test')
                                                
                                    assert.equal(res.get('index'), 'test')
                                                
                                    assert.equal(res.get('value'), 'test')
                                        })
    })

    it('func SettingsEnterprise GetAll. Получение всех записей', async function () {
        return SettingsEnterpriseGetAll().then(res => {
            if (res.length) {
                res = res[0]
                                                                                
                                            assert.equal(res.get('description'), 'test')
                                                            
                                            assert.equal(res.get('index'), 'test')
                                                            
                                            assert.equal(res.get('value'), 'test')
                                                    }
        })
    })

    it('func SettingsEnterprise FindById. Получение несуществующей записи', async function () {
        return SettingsEnterpriseFindById(0).then(res => assert.equal(res , null))
    })

    it('func SettingsEnterprise FindById. Получение одной конкретной записи', async function () {
        return SettingsEnterpriseFindById(add_id).then(res => {
                                                                
                                    assert.equal(res.get('description'), 'test')
                                                
                                    assert.equal(res.get('index'), 'test')
                                                
                                    assert.equal(res.get('value'), 'test')
                                        })
    })


    it('func SettingsEnterprise Update. Редоктирование корректными значениями', async function () {

        let o = {}

                                    o['id'] = add_id
                                                        o['description'] = 'test 2'
                                                            o['index'] = 'test 2'
                                                            o['value'] = 'test 2'
                            
        return SettingsEnterpriseUpdate(o).then(res => {
                                                assert.equal(res.get('id'), add_id)
                                    
                                    assert.equal(res.get('description'), 'test 2')
                                            
                                    assert.equal(res.get('index'), 'test 2')
                                            
                                    assert.equal(res.get('value'), 'test 2')
                                    })
    })

    it('func SettingsEnterprise Drop. Удаление несуществующей сущности', async function () {
        return SettingsEnterpriseDrop(0).catch(e => assert.equal(e.message, SETTINGSENTERPRISE_ERROR_NOT_FOUND))
    })

    it('func SettingsEnterprise Drop. Корректное удаление', async function () {
        return SettingsEnterpriseDrop(add_id)
        .then(res => assert.deepStrictEqual(res, { result: true }))
    })
    





})