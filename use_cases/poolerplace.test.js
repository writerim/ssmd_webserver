const { 
    AddPoolerPlace, 
    EditPoolerPlace, 
    DropPoolerPlace, 
    GetAllPoolerPlace, 
    FindByIdPoolerPlace, 
    PoolerPlace_NOT_FOUND_ROW, 
    PoolerPlace_NOT_FOUND_CONTEXT, 
    POOLERPLACE_ERROR_NOT_FOUND
} = require('./poolerplace.js');

    const User = require("../entity/user");


const  {
    POOLERPLACE_ERROR_VALIDATE_INVALID_DATA,
} = require('../repositories/poolerplace.js');

const assert = require('assert').strict;



describe("use_cases: PoolerPlace", function () {

    

    let add_id = 0

    it('func Add. Корректное добавление', async function () {

        let o = {}

                                                                                                    o['pooler_id'] = 10
                                                                                    o['place_id'] = 10
                            return AddPoolerPlace(o,new User())
        .then(res => {
                                                add_id = res.id
                                                                    
                                        assert.equal(res.pooler_id, 10)
                                                                            
                                        assert.equal(res.place_id, 10)
                                    })
    })

    it('func PoolerPlace GetAll. Получение всех записей', async function () {
        return GetAllPoolerPlace({limit:10,offset:0},new User({})).then(res => {
            if (res.length) {
                res = res[0]
                                                                                                                        
                                                assert.equal(res.pooler_id, 10)
                                                                                                
                                                assert.equal(res.place_id, 10)
                                                }
        })
    })

    it('func PoolerPlace FindById. Получение несуществующей записи', async function () {
        return FindByIdPoolerPlace(0,new User()).catch(res => assert.equal(res.message , PoolerPlace_NOT_FOUND_ROW))
    })


    it('func PoolerPlace FindById. Получение одной конкретной записи', async function () {
        return FindByIdPoolerPlace(add_id,new User()).then(res => {

                                                                                                
                                    assert.equal(res.pooler_id, 10)
                                                                            
                                    assert.equal(res.place_id, 10)
                                    })
    })



    it('func PoolerPlace Update. Редоктирование корректными значениями', async function () {

        let o = {}

                                    o['id'] = add_id
                                                    
                            o['pooler_id'] = 54
                                                        
                            o['place_id'] = 54
                            
        return EditPoolerPlace(o,new User()).then(res => {
                                                assert.equal(res.id, add_id)
                                    
                                
                                    assert.equal(res.pooler_id, 54)
                                            
                                
                                    assert.equal(res.place_id, 54)
                                    })
    })

    
    it('func PoolerPlace Drop. Удаление несуществующей сущности', async function () {
        return DropPoolerPlace(0,new User()).catch(e => assert.equal(e.message, POOLERPLACE_ERROR_NOT_FOUND))
    })

    it('func PoolerPlace Drop. Корректное удаление', async function () {
        return DropPoolerPlace(add_id,new User())
        .then(res => assert.deepStrictEqual(res, { result: true }))
    })
    
})