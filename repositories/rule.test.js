             

 

const { 
    RuleAdd, 
    RuleDrop, 
    RuleValidate, 
    RuleUpdate, 
    RuleGetAll, 
    RuleFindById, 
        RULE_ERROR_VALIDATE_INVALID_DATA,
    RULE_ERROR_NOT_FOUND,
} = require('./Rule');

const assert = require('assert').strict;

describe("repo: DB: Rule", function () {

    

    let add_id = 0

    it('func Add. Корректное добавление', async function () {

        let o = {}

                                                                            o['name'] = 'test'
                                                            o['description'] = 'test'
                            return RuleAdd(o)
        .then(res => {
                                                add_id = res.get('id')
                                    
                                    assert.equal(res.get('name'), 'test')
                                                
                                    assert.equal(res.get('description'), 'test')
                                        })
    })

    it('func Rule GetAll. Получение всех записей', async function () {
        return RuleGetAll().then(res => {
            if (res.length) {
                res = res[0]
                                                                                
                                            assert.equal(res.get('name'), 'test')
                                                            
                                            assert.equal(res.get('description'), 'test')
                                                    }
        })
    })

    it('func Rule FindById. Получение несуществующей записи', async function () {
        return RuleFindById(0).then(res => assert.equal(res , null))
    })

    it('func Rule FindById. Получение одной конкретной записи', async function () {
        return RuleFindById(add_id).then(res => {
                                                                
                                    assert.equal(res.get('name'), 'test')
                                                
                                    assert.equal(res.get('description'), 'test')
                                        })
    })


    it('func Rule Update. Редоктирование корректными значениями', async function () {

        let o = {}

                                    o['id'] = add_id
                                                        o['name'] = 'test 2'
                                                            o['description'] = 'test 2'
                            
        return RuleUpdate(o).then(res => {
                                                assert.equal(res.get('id'), add_id)
                                    
                                    assert.equal(res.get('name'), 'test 2')
                                            
                                    assert.equal(res.get('description'), 'test 2')
                                    })
    })

    it('func Rule Drop. Удаление несуществующей сущности', async function () {
        return RuleDrop(0).catch(e => assert.equal(e.message, RULE_ERROR_NOT_FOUND))
    })

    it('func Rule Drop. Корректное удаление', async function () {
        return RuleDrop(add_id)
        .then(res => assert.deepStrictEqual(res, { result: true }))
    })
    





})