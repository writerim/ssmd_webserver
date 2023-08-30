             

 


const { 
    AddPlaceType, 
    EditPlaceType, 
    DropPlaceType, 
    GetAllPlaceType, 
    FindByIdPlaceType, 
    PlaceType_NOT_FOUND_ROW, 
    PlaceType_NOT_FOUND_CONTEXT, 
    PLACETYPE_ERROR_NOT_FOUND
} = require('./PlaceType');

    const User = require("../entity/User");


const  {
    PLACETYPE_ERROR_VALIDATE_INVALID_DATA,
} = require('../repositories/PlaceType');

const assert = require('assert').strict;



describe("use_cases: PlaceType", function () {

    

    let add_id = 0

    it('func Add. Корректное добавление', async function () {

        let o = {}

                                                                            o['ident'] = 'test'
                                                            o['icon'] = 'test'
                            return AddPlaceType(o,new User())
        .then(res => {
                                                add_id = res.id
                                    
                                    assert.equal(res.ident, 'test')
                                                
                                    assert.equal(res.icon, 'test')
                                        })
    })

    it('func PlaceType GetAll. Получение всех записей', async function () {
        return GetAllPlaceType({limit:10,offset:0},new User({})).then(res => {
            if (res.length) {
                res = res[0]
                                                                                
                                            assert.equal(res.ident, 'test')
                                                            
                                            assert.equal(res.icon, 'test')
                                                    }
        })
    })

    it('func PlaceType FindById. Получение несуществующей записи', async function () {
        return FindByIdPlaceType(0,new User()).catch(res => assert.equal(res.message , PlaceType_NOT_FOUND_ROW))
    })


    it('func PlaceType FindById. Получение одной конкретной записи', async function () {
        return FindByIdPlaceType(add_id,new User()).then(res => {

                                                                
                                    assert.equal(res.ident, 'test')
                                            
                                    assert.equal(res.icon, 'test')
                                    })
    })



    it('func PlaceType Update. Редоктирование корректными значениями', async function () {

        let o = {}

                                    o['id'] = add_id
                                                        o['ident'] = 'test 2'
                                                            o['icon'] = 'test 2'
                            
        return EditPlaceType(o,new User()).then(res => {
                                                assert.equal(res.id, add_id)
                                    
                                    assert.equal(res.ident, 'test 2')
                                            
                                    assert.equal(res.icon, 'test 2')
                                    })
    })

    
    it('func PlaceType Drop. Удаление несуществующей сущности', async function () {
        return DropPlaceType(0,new User()).catch(e => assert.equal(e.message, PLACETYPE_ERROR_NOT_FOUND))
    })

    it('func PlaceType Drop. Корректное удаление', async function () {
        return DropPlaceType(add_id,new User())
        .then(res => assert.deepStrictEqual(res, { result: true }))
    })
    
})