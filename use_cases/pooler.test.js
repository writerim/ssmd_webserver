const { 
    AddPooler, 
    EditPooler, 
    DropPooler, 
    GetAllPooler, 
    FindByIdPooler, 
    Pooler_NOT_FOUND_ROW, 
    Pooler_NOT_FOUND_CONTEXT, 
    POOLER_ERROR_NOT_FOUND
} = require('./pooler.js');

    const User = require("../entity/user");


const  {
    POOLER_ERROR_VALIDATE_INVALID_DATA,
} = require('../repositories/pooler.js');

const assert = require('assert').strict;



describe("use_cases: Pooler", function () {

    

    let add_id = 0

    it('func Add. Корректное добавление', async function () {

        let o = {}

                                                                                                    o['name'] = 'test'
                                                                                    o['uuid'] = 'test'
                                                                                    o['settings'] = {'foo':'bar'}
                            return AddPooler(o,new User())
        .then(res => {
                                                add_id = res.id
                                                                    
                                    assert.equal(res.name, 'test')
                                                                                
                                    assert.equal(res.uuid, 'test')
                                                                                
                                    assert.deepStrictEqual(res.settings, {'foo':'bar'})
                                    })
    })

    it('func Pooler GetAll. Получение всех записей', async function () {
        return GetAllPooler({limit:10,offset:0},new User({})).then(res => {
            if (res.length) {
                res = res[0]
                                                                                                                        
                                            assert.equal(res.name, 'test')
                                                                                                    
                                            assert.equal(res.uuid, 'test')
                                                                                                    
                                            assert.deepStrictEqual(res.settings, {'foo':'bar'})
                                                }
        })
    })

    it('func Pooler FindById. Получение несуществующей записи', async function () {
        return FindByIdPooler(0,new User()).catch(res => assert.equal(res.message , Pooler_NOT_FOUND_ROW))
    })


    it('func Pooler FindById. Получение одной конкретной записи', async function () {
        return FindByIdPooler(add_id,new User()).then(res => {

                                                                                                
                                    assert.equal(res.name, 'test')
                                                                            
                                    assert.equal(res.uuid, 'test')
                                                                            
                                    assert.deepStrictEqual(res.settings, {'foo':'bar'})
                                    })
    })



    it('func Pooler Update. Редоктирование корректными значениями', async function () {

        let o = {}

                                    o['id'] = add_id
                                                    
                            o['name'] = 'test 2'
                                                        
                            o['uuid'] = 'test 2'
                                                        
                            o['settings'] = {'dd' : 'sss'}
                            
        return EditPooler(o,new User()).then(res => {
                                                assert.equal(res.id, add_id)
                                    
                                
                                    assert.equal(res.name, 'test 2')
                                            
                                
                                    assert.equal(res.uuid, 'test 2')
                                            
                                
                                    assert.deepStrictEqual(res.settings, {'dd' : 'sss'})
                                    })
    })

    
    it('func Pooler Drop. Удаление несуществующей сущности', async function () {
        return DropPooler(0,new User()).catch(e => assert.equal(e.message, POOLER_ERROR_NOT_FOUND))
    })

    it('func Pooler Drop. Корректное удаление', async function () {
        return DropPooler(add_id,new User())
        .then(res => assert.deepStrictEqual(res, { result: true }))
    })
    
})