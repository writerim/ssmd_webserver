const { 
    AddPlaceDevice, 
    EditPlaceDevice, 
    DropPlaceDevice, 
    GetAllPlaceDevice, 
    FindByIdPlaceDevice, 
    PlaceDevice_NOT_FOUND_ROW, 
    PlaceDevice_NOT_FOUND_CONTEXT, 
    PLACEDEVICE_ERROR_NOT_FOUND
} = require('./placedevice.js');

    const User = require("../entity/user");


const  {
    PLACEDEVICE_ERROR_VALIDATE_INVALID_DATA,
} = require('../repositories/placedevice.js');

const assert = require('assert').strict;



describe("use_cases: PlaceDevice", function () {

    

    let add_id = 0

    it('func Add. Корректное добавление', async function () {

        let o = {}

                                                                                                    o['device_id'] = 10
                                                                                    o['place_id'] = 10
                            return AddPlaceDevice(o,new User())
        .then(res => {
                                                add_id = res.id
                                                                    
                                        assert.equal(res.device_id, 10)
                                                                            
                                        assert.equal(res.place_id, 10)
                                    })
    })

    it('func PlaceDevice GetAll. Получение всех записей', async function () {
        return GetAllPlaceDevice({limit:10,offset:0},new User({})).then(res => {
            if (res.length) {
                res = res[0]
                                                                                                                        
                                                assert.equal(res.device_id, 10)
                                                                                                
                                                assert.equal(res.place_id, 10)
                                                }
        })
    })

    it('func PlaceDevice FindById. Получение несуществующей записи', async function () {
        return FindByIdPlaceDevice(0,new User()).catch(res => assert.equal(res.message , PlaceDevice_NOT_FOUND_ROW))
    })


    it('func PlaceDevice FindById. Получение одной конкретной записи', async function () {
        return FindByIdPlaceDevice(add_id,new User()).then(res => {

                                                                                                
                                    assert.equal(res.device_id, 10)
                                                                            
                                    assert.equal(res.place_id, 10)
                                    })
    })



    it('func PlaceDevice Update. Редоктирование корректными значениями', async function () {

        let o = {}

                                    o['id'] = add_id
                                                    
                            o['device_id'] = 54
                                                        
                            o['place_id'] = 54
                            
        return EditPlaceDevice(o,new User()).then(res => {
                                                assert.equal(res.id, add_id)
                                    
                                
                                    assert.equal(res.device_id, 54)
                                            
                                
                                    assert.equal(res.place_id, 54)
                                    })
    })

    
    it('func PlaceDevice Drop. Удаление несуществующей сущности', async function () {
        return DropPlaceDevice(0,new User()).catch(e => assert.equal(e.message, PLACEDEVICE_ERROR_NOT_FOUND))
    })

    it('func PlaceDevice Drop. Корректное удаление', async function () {
        return DropPlaceDevice(add_id,new User())
        .then(res => assert.deepStrictEqual(res, { result: true }))
    })
    
})