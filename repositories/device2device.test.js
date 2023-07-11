                     

         

const { 
    Device2DeviceAdd, 
    Device2DeviceDrop, 
    Device2DeviceValidate, 
    Device2DeviceUpdate, 
    Device2DeviceGetAll, 
    Device2DeviceFindById, 
        DEVICE2DEVICE_ERROR_VALIDATE_INVALID_DATA,
    DEVICE2DEVICE_ERROR_NOT_FOUND,
} = require('./Device2Device');

const assert = require('assert').strict;

describe("repo: DB: Device2Device", function () {

            it('func Device2Device Add. Проверка на пустой объект', async function () {
            return Device2DeviceAdd({}).catch(res => {
                assert.equal(res.message, DEVICE2DEVICE_ERROR_VALIDATE_INVALID_DATA)
            })
        })

            

    let add_id = 0

    it('func Add. Корректное добавление', async function () {

        let o = {}

                                                                            o['device_id'] = 10
                                                            o['parameter_id'] = 10
                                                            o['device_donor_id'] = 10
                                                            o['parameter_donor_id'] = 10
                            return Device2DeviceAdd(o)
        .then(res => {
                                                add_id = res.get('id')
                                    
                                        assert.equal(res.get('device_id'), 10)
                                            
                                        assert.equal(res.get('parameter_id'), 10)
                                            
                                        assert.equal(res.get('device_donor_id'), 10)
                                            
                                        assert.equal(res.get('parameter_donor_id'), 10)
                                    })
    })

    it('func Device2Device GetAll. Получение всех записей', async function () {
        return Device2DeviceGetAll().then(res => {
            if (res.length) {
                res = res[0]
                                                                                
                                                assert.equal(res.get('device_id'), 10)
                                                        
                                                assert.equal(res.get('parameter_id'), 10)
                                                        
                                                assert.equal(res.get('device_donor_id'), 10)
                                                        
                                                assert.equal(res.get('parameter_donor_id'), 10)
                                                }
        })
    })

    it('func Device2Device FindById. Получение несуществующей записи', async function () {
        return Device2DeviceFindById(0).then(res => assert.equal(res , null))
    })

    it('func Device2Device FindById. Получение одной конкретной записи', async function () {
        return Device2DeviceFindById(add_id).then(res => {
                                                                
                                        assert.equal(res.get('device_id'), 10)
                                            
                                        assert.equal(res.get('parameter_id'), 10)
                                            
                                        assert.equal(res.get('device_donor_id'), 10)
                                            
                                        assert.equal(res.get('parameter_donor_id'), 10)
                                    })
    })


    it('func Device2Device Update. Редоктирование корректными значениями', async function () {

        let o = {}

                                    o['id'] = add_id
                                                        o['device_id'] = 54
                                                            o['parameter_id'] = 54
                                                            o['device_donor_id'] = 54
                                                            o['parameter_donor_id'] = 54
                            
        return Device2DeviceUpdate(o).then(res => {
                                                assert.equal(res.get('id'), add_id)
                                    
                                    assert.equal(res.get('device_id'), 54)
                                            
                                    assert.equal(res.get('parameter_id'), 54)
                                            
                                    assert.equal(res.get('device_donor_id'), 54)
                                            
                                    assert.equal(res.get('parameter_donor_id'), 54)
                                    })
    })

    it('func Device2Device Drop. Удаление несуществующей сущности', async function () {
        return Device2DeviceDrop(0).catch(e => assert.equal(e.message, DEVICE2DEVICE_ERROR_NOT_FOUND))
    })

    it('func Device2Device Drop. Корректное удаление', async function () {
        return Device2DeviceDrop(add_id)
        .then(res => assert.deepStrictEqual(res, { result: true }))
    })
    





})