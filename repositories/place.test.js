                                     

         

const { 
    PlaceAdd, 
    PlaceDrop, 
    PlaceValidate, 
    PlaceUpdate, 
    PlaceGetAll, 
    PlaceFindById, 
        PlaceRecalcTree, 
        PLACE_ERROR_VALIDATE_INVALID_DATA,
    PLACE_ERROR_NOT_FOUND,
} = require('./Place');

const assert = require('assert').strict;

describe("repo: DB: Place", function () {

            it('func Place Add. Проверка на пустой объект', async function () {
            return PlaceAdd({}).catch(res => {
                assert.equal(res.message, PLACE_ERROR_VALIDATE_INVALID_DATA)
            })
        })

            

    let add_id = 0

    it('func Add. Корректное добавление', async function () {

        let o = {}

                                                                            o['name'] = 'test'
                                                            o['parent_id'] = 10
                                                            o['lft'] = 10
                                                            o['rgt'] = 10
                                                            o['icon'] = 'test'
                            return PlaceAdd(o)
        .then(res => {
                                                add_id = res.get('id')
                                    
                                    assert.equal(res.get('name'), 'test')
                                                
                                        assert.equal(res.get('parent_id'), 10)
                                            
                                        assert.equal(res.get('lft'), 10)
                                            
                                        assert.equal(res.get('rgt'), 10)
                                            
                                    assert.equal(res.get('icon'), 'test')
                                        })
    })

    it('func Place GetAll. Получение всех записей', async function () {
        return PlaceGetAll().then(res => {
            if (res.length) {
                res = res[0]
                                                                                
                                            assert.equal(res.get('name'), 'test')
                                                            
                                                assert.equal(res.get('parent_id'), 10)
                                                        
                                                assert.equal(res.get('lft'), 10)
                                                        
                                                assert.equal(res.get('rgt'), 10)
                                                        
                                            assert.equal(res.get('icon'), 'test')
                                                    }
        })
    })

    it('func Place FindById. Получение несуществующей записи', async function () {
        return PlaceFindById(0).then(res => assert.equal(res , null))
    })

    it('func Place FindById. Получение одной конкретной записи', async function () {
        return PlaceFindById(add_id).then(res => {
                                                                
                                    assert.equal(res.get('name'), 'test')
                                                
                                        assert.equal(res.get('parent_id'), 10)
                                            
                                        assert.equal(res.get('lft'), 10)
                                            
                                        assert.equal(res.get('rgt'), 10)
                                            
                                    assert.equal(res.get('icon'), 'test')
                                        })
    })


    it('func Place Update. Редоктирование корректными значениями', async function () {

        let o = {}

                                    o['id'] = add_id
                                                        o['name'] = 'test 2'
                                                            o['parent_id'] = 54
                                                            o['lft'] = 54
                                                            o['rgt'] = 54
                                                            o['icon'] = 'test 2'
                            
        return PlaceUpdate(o).then(res => {
                                                assert.equal(res.get('id'), add_id)
                                    
                                    assert.equal(res.get('name'), 'test 2')
                                            
                                    assert.equal(res.get('parent_id'), 54)
                                            
                                    assert.equal(res.get('lft'), 54)
                                            
                                    assert.equal(res.get('rgt'), 54)
                                            
                                    assert.equal(res.get('icon'), 'test 2')
                                    })
    })

    it('func Place Drop. Удаление несуществующей сущности', async function () {
        return PlaceDrop(0).catch(e => assert.equal(e.message, PLACE_ERROR_NOT_FOUND))
    })

    it('func Place Drop. Корректное удаление', async function () {
        return PlaceDrop(add_id)
        .then(res => assert.deepStrictEqual(res, { result: true }))
    })
    





})