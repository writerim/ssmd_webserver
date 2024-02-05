const {
    PoolerPlaceAdd, 
    PoolerPlaceDrop, 
    PoolerPlaceValidate, 
    PoolerPlaceUpdate, 
    PoolerPlaceGetAll, 
    PoolerPlaceFindById, 
        POOLERPLACE_ERROR_VALIDATE_INVALID_DATA,
    POOLERPLACE_ERROR_NOT_FOUND,
} = require('./PoolerPlace');

const assert = require('assert').strict;

describe("repo: DB: PoolerPlace", function () {

    

    let add_id = 0

    it('func Add. Корректное добавление', async function () {

        let o = {}

                                                                            o['pooler_id'] = 10
                                                            o['place_id'] = 10
                            return PoolerPlaceAdd(o)
        .then(res => {
                                                add_id = res.get('id')
                                    
                                        assert.equal(res.get('pooler_id'), 10)
                                            
                                        assert.equal(res.get('place_id'), 10)
                                    })
    })

    it('func PoolerPlace GetAll. Получение всех записей', async function () {
        return PoolerPlaceGetAll().then(res => {
            if (res.length) {
                res = res[0]
                                                                                
                                                assert.equal(res.get('pooler_id'), 10)
                                                        
                                                assert.equal(res.get('place_id'), 10)
                                                }
        })
    })

    it('func PoolerPlace FindById. Получение несуществующей записи', async function () {
        return PoolerPlaceFindById(0).then(res => assert.equal(res , null))
    })

    it('func PoolerPlace FindById. Получение одной конкретной записи', async function () {
        return PoolerPlaceFindById(add_id).then(res => {
                                                                
                                        assert.equal(res.get('pooler_id'), 10)
                                            
                                        assert.equal(res.get('place_id'), 10)
                                    })
    })


    it('func PoolerPlace Update. Редоктирование корректными значениями', async function () {

        let o = {}

                                    o['id'] = add_id
                                                        o['pooler_id'] = 54
                                                            o['place_id'] = 54
                            
        return PoolerPlaceUpdate(o).then(res => {
                                                assert.equal(res.get('id'), add_id)
                                    
                                    assert.equal(res.get('pooler_id'), 54)
                                            
                                    assert.equal(res.get('place_id'), 54)
                                    })
    })

    it('func PoolerPlace Drop. Удаление несуществующей сущности', async function () {
        return PoolerPlaceDrop(0).catch(e => assert.equal(e.message, POOLERPLACE_ERROR_NOT_FOUND))
    })

    it('func PoolerPlace Drop. Корректное удаление', async function () {
        return PoolerPlaceDrop(add_id)
        .then(res => assert.deepStrictEqual(res, { result: true }))
    })
    





})