const {
    PoolerAdd, 
    PoolerDrop, 
    PoolerValidate, 
    PoolerUpdate, 
    PoolerGetAll, 
    PoolerFindById, 
        POOLER_ERROR_VALIDATE_INVALID_DATA,
    POOLER_ERROR_NOT_FOUND,
} = require('./Pooler');

const assert = require('assert').strict;

describe("repo: DB: Pooler", function () {

    

    let add_id = 0

    it('func Add. Корректное добавление', async function () {

        let o = {}

                                                                            o['name'] = 'test'
                                                            o['uuid'] = 'test'
                                                            o['settings'] = {'foo':'bar'}
                            return PoolerAdd(o)
        .then(res => {
                                                add_id = res.get('id')
                                    
                                    assert.equal(res.get('name'), 'test')
                                                
                                    assert.equal(res.get('uuid'), 'test')
                                                
                                    assert.deepStrictEqual(res.get('settings'), {'foo':'bar'})
                                    })
    })

    it('func Pooler GetAll. Получение всех записей', async function () {
        return PoolerGetAll().then(res => {
            if (res.length) {
                res = res[0]
                                                                                
                                            assert.equal(res.get('name'), 'test')
                                                            
                                            assert.equal(res.get('uuid'), 'test')
                                                            
                                            assert.deepStrictEqual(res.get('settings'), {'foo':'bar'})
                                                }
        })
    })

    it('func Pooler FindById. Получение несуществующей записи', async function () {
        return PoolerFindById(0).then(res => assert.equal(res , null))
    })

    it('func Pooler FindById. Получение одной конкретной записи', async function () {
        return PoolerFindById(add_id).then(res => {
                                                                
                                    assert.equal(res.get('name'), 'test')
                                                
                                    assert.equal(res.get('uuid'), 'test')
                                                
                                    assert.deepStrictEqual(res.get('settings'), {'foo':'bar'})
                                    })
    })


    it('func Pooler Update. Редоктирование корректными значениями', async function () {

        let o = {}

                                    o['id'] = add_id
                                                        o['name'] = 'test 2'
                                                            o['uuid'] = 'test 2'
                                                            o['settings'] = {'dd' : 'sss'}
                            
        return PoolerUpdate(o).then(res => {
                                                assert.equal(res.get('id'), add_id)
                                    
                                    assert.equal(res.get('name'), 'test 2')
                                            
                                    assert.equal(res.get('uuid'), 'test 2')
                                            
                                    assert.deepStrictEqual(res.get('settings'), {'dd' : 'sss'})
                                    })
    })

    it('func Pooler Drop. Удаление несуществующей сущности', async function () {
        return PoolerDrop(0).catch(e => assert.equal(e.message, POOLER_ERROR_NOT_FOUND))
    })

    it('func Pooler Drop. Корректное удаление', async function () {
        return PoolerDrop(add_id)
        .then(res => assert.deepStrictEqual(res, { result: true }))
    })
    





})