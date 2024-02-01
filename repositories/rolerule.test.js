const {
    RoleRuleAdd, 
    RoleRuleDrop, 
    RoleRuleValidate, 
    RoleRuleUpdate, 
    RoleRuleGetAll, 
    RoleRuleFindById, 
        ROLERULE_ERROR_VALIDATE_INVALID_DATA,
    ROLERULE_ERROR_NOT_FOUND,
} = require('./RoleRule');

const assert = require('assert').strict;

describe("repo: DB: RoleRule", function () {

    

    let add_id = 0

    it('func Add. Корректное добавление', async function () {

        let o = {}

                                                                            o['role_id'] = 10
                                                            o['rule_id'] = 10
                            return RoleRuleAdd(o)
        .then(res => {
                                                add_id = res.get('id')
                                    
                                        assert.equal(res.get('role_id'), 10)
                                            
                                        assert.equal(res.get('rule_id'), 10)
                                    })
    })

    it('func RoleRule GetAll. Получение всех записей', async function () {
        return RoleRuleGetAll().then(res => {
            if (res.length) {
                res = res[0]
                                                                                
                                                assert.equal(res.get('role_id'), 10)
                                                        
                                                assert.equal(res.get('rule_id'), 10)
                                                }
        })
    })

    it('func RoleRule FindById. Получение несуществующей записи', async function () {
        return RoleRuleFindById(0).then(res => assert.equal(res , null))
    })

    it('func RoleRule FindById. Получение одной конкретной записи', async function () {
        return RoleRuleFindById(add_id).then(res => {
                                                                
                                        assert.equal(res.get('role_id'), 10)
                                            
                                        assert.equal(res.get('rule_id'), 10)
                                    })
    })


    it('func RoleRule Update. Редоктирование корректными значениями', async function () {

        let o = {}

                                    o['id'] = add_id
                                                        o['role_id'] = 54
                                                            o['rule_id'] = 54
                            
        return RoleRuleUpdate(o).then(res => {
                                                assert.equal(res.get('id'), add_id)
                                    
                                    assert.equal(res.get('role_id'), 54)
                                            
                                    assert.equal(res.get('rule_id'), 54)
                                    })
    })

    it('func RoleRule Drop. Удаление несуществующей сущности', async function () {
        return RoleRuleDrop(0).catch(e => assert.equal(e.message, ROLERULE_ERROR_NOT_FOUND))
    })

    it('func RoleRule Drop. Корректное удаление', async function () {
        return RoleRuleDrop(add_id)
        .then(res => assert.deepStrictEqual(res, { result: true }))
    })
    





})