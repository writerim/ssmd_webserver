const {
    PlaceDeviceAdd, 
    PlaceDeviceDrop, 
    PlaceDeviceValidate, 
    PlaceDeviceUpdate, 
    PlaceDeviceGetAll, 
    PlaceDeviceFindById, 
        PLACEDEVICE_ERROR_VALIDATE_INVALID_DATA,
    PLACEDEVICE_ERROR_NOT_FOUND,
} = require('./PlaceDevice');

const assert = require('assert').strict;

describe("repo: DB: PlaceDevice", function () {

    

    let add_id = 0

    it('func Add. Корректное добавление', async function () {

        let o = {}

                                                                            o['device_id'] = 10
                                                            o['place_id'] = 10
                            return PlaceDeviceAdd(o)
        .then(res => {
                                                add_id = res.get('id')
                                    
                                        assert.equal(res.get('device_id'), 10)
                                            
                                        assert.equal(res.get('place_id'), 10)
                                    })
    })

    it('func PlaceDevice GetAll. Получение всех записей', async function () {
        return PlaceDeviceGetAll().then(res => {
            if (res.length) {
                res = res[0]
                                                                                
                                                assert.equal(res.get('device_id'), 10)
                                                        
                                                assert.equal(res.get('place_id'), 10)
                                                }
        })
    })

    it('func PlaceDevice FindById. Получение несуществующей записи', async function () {
        return PlaceDeviceFindById(0).then(res => assert.equal(res , null))
    })

    it('func PlaceDevice FindById. Получение одной конкретной записи', async function () {
        return PlaceDeviceFindById(add_id).then(res => {
                                                                
                                        assert.equal(res.get('device_id'), 10)
                                            
                                        assert.equal(res.get('place_id'), 10)
                                    })
    })


    it('func PlaceDevice Update. Редоктирование корректными значениями', async function () {

        let o = {}

                                    o['id'] = add_id
                                                        o['device_id'] = 54
                                                            o['place_id'] = 54
                            
        return PlaceDeviceUpdate(o).then(res => {
                                                assert.equal(res.get('id'), add_id)
                                    
                                    assert.equal(res.get('device_id'), 54)
                                            
                                    assert.equal(res.get('place_id'), 54)
                                    })
    })

    it('func PlaceDevice Drop. Удаление несуществующей сущности', async function () {
        return PlaceDeviceDrop(0).catch(e => assert.equal(e.message, PLACEDEVICE_ERROR_NOT_FOUND))
    })

    it('func PlaceDevice Drop. Корректное удаление', async function () {
        return PlaceDeviceDrop(add_id)
        .then(res => assert.deepStrictEqual(res, { result: true }))
    })
    





})