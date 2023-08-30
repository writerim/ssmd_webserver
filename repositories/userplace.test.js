             

 

const { 
    UserPlaceAdd, 
    UserPlaceDrop, 
    UserPlaceValidate, 
    UserPlaceUpdate, 
    UserPlaceGetAll, 
    UserPlaceFindById, 
        USERPLACE_ERROR_VALIDATE_INVALID_DATA,
    USERPLACE_ERROR_NOT_FOUND,
} = require('./UserPlace');

const assert = require('assert').strict;

describe("repo: DB: UserPlace", function () {

    

    let add_id = 0

    it('func Add. Корректное добавление', async function () {

        let o = {}

                                                                            o['plce_id'] = 10
                                                            o['user_id'] = 10
                            return UserPlaceAdd(o)
        .then(res => {
                                                add_id = res.get('id')
                                    
                                        assert.equal(res.get('plce_id'), 10)
                                            
                                        assert.equal(res.get('user_id'), 10)
                                    })
    })

    it('func UserPlace GetAll. Получение всех записей', async function () {
        return UserPlaceGetAll().then(res => {
            if (res.length) {
                res = res[0]
                                                                                
                                                assert.equal(res.get('plce_id'), 10)
                                                        
                                                assert.equal(res.get('user_id'), 10)
                                                }
        })
    })

    it('func UserPlace FindById. Получение несуществующей записи', async function () {
        return UserPlaceFindById(0).then(res => assert.equal(res , null))
    })

    it('func UserPlace FindById. Получение одной конкретной записи', async function () {
        return UserPlaceFindById(add_id).then(res => {
                                                                
                                        assert.equal(res.get('plce_id'), 10)
                                            
                                        assert.equal(res.get('user_id'), 10)
                                    })
    })


    it('func UserPlace Update. Редоктирование корректными значениями', async function () {

        let o = {}

                                    o['id'] = add_id
                                                        o['plce_id'] = 54
                                                            o['user_id'] = 54
                            
        return UserPlaceUpdate(o).then(res => {
                                                assert.equal(res.get('id'), add_id)
                                    
                                    assert.equal(res.get('plce_id'), 54)
                                            
                                    assert.equal(res.get('user_id'), 54)
                                    })
    })

    it('func UserPlace Drop. Удаление несуществующей сущности', async function () {
        return UserPlaceDrop(0).catch(e => assert.equal(e.message, USERPLACE_ERROR_NOT_FOUND))
    })

    it('func UserPlace Drop. Корректное удаление', async function () {
        return UserPlaceDrop(add_id)
        .then(res => assert.deepStrictEqual(res, { result: true }))
    })
    





})