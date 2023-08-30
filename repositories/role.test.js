             

 

const { 
    RoleAdd, 
    RoleDrop, 
    RoleValidate, 
    RoleUpdate, 
    RoleGetAll, 
    RoleFindById, 
        ROLE_ERROR_VALIDATE_INVALID_DATA,
    ROLE_ERROR_NOT_FOUND,
} = require('./Role');

const assert = require('assert').strict;

describe("repo: DB: Role", function () {

    

    let add_id = 0

    it('func Add. Корректное добавление', async function () {

        let o = {}

                                                                            o['name'] = 'test'
                                                            o['description'] = 'test'
                            return RoleAdd(o)
        .then(res => {
                                                add_id = res.get('id')
                                    
                                    assert.equal(res.get('name'), 'test')
                                                
                                    assert.equal(res.get('description'), 'test')
                                        })
    })

    it('func Role GetAll. Получение всех записей', async function () {
        return RoleGetAll().then(res => {
            if (res.length) {
                res = res[0]
                                                                                
                                            assert.equal(res.get('name'), 'test')
                                                            
                                            assert.equal(res.get('description'), 'test')
                                                    }
        })
    })

    it('func Role FindById. Получение несуществующей записи', async function () {
        return RoleFindById(0).then(res => assert.equal(res , null))
    })

    it('func Role FindById. Получение одной конкретной записи', async function () {
        return RoleFindById(add_id).then(res => {
                                                                
                                    assert.equal(res.get('name'), 'test')
                                                
                                    assert.equal(res.get('description'), 'test')
                                        })
    })


    it('func Role Update. Редоктирование корректными значениями', async function () {

        let o = {}

                                    o['id'] = add_id
                                                        o['name'] = 'test 2'
                                                            o['description'] = 'test 2'
                            
        return RoleUpdate(o).then(res => {
                                                assert.equal(res.get('id'), add_id)
                                    
                                    assert.equal(res.get('name'), 'test 2')
                                            
                                    assert.equal(res.get('description'), 'test 2')
                                    })
    })

    it('func Role Drop. Удаление несуществующей сущности', async function () {
        return RoleDrop(0).catch(e => assert.equal(e.message, ROLE_ERROR_NOT_FOUND))
    })

    it('func Role Drop. Корректное удаление', async function () {
        return RoleDrop(add_id)
        .then(res => assert.deepStrictEqual(res, { result: true }))
    })
    





})