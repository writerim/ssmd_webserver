const { 
    AddDevice2Device, 
    EditDevice2Device, 
    DropDevice2Device, 
    GetAllDevice2Device, 
    FindByIdDevice2Device, 
    Device2Device_NOT_FOUND_ROW, 
    Device2Device_NOT_FOUND_CONTEXT, 
    DEVICE2DEVICE_ERROR_NOT_FOUND
} = require('./device2device.js');

    const User = require("../entity/user");


const  {
    DEVICE2DEVICE_ERROR_VALIDATE_INVALID_DATA,
} = require('../repositories/device2device.js');

const assert = require('assert').strict;



describe("use_cases: Device2Device", function () {

    

    let add_id = 0

    it('func Add. Корректное добавление', async function () {

        let o = {}

                                                                                                    o['device_id'] = 10
                                                                                    o['parameter_id'] = 10
                                                                                    o['device_donor_id'] = 10
                                                                                    o['parameter_donor_id'] = 10
                            return AddDevice2Device(o,new User())
        .then(res => {
                                                add_id = res.id
                                                                    
                                        assert.equal(res.device_id, 10)
                                                                            
                                        assert.equal(res.parameter_id, 10)
                                                                            
                                        assert.equal(res.device_donor_id, 10)
                                                                            
                                        assert.equal(res.parameter_donor_id, 10)
                                    })
    })

    it('func Device2Device GetAll. Получение всех записей', async function () {
        return GetAllDevice2Device({limit:10,offset:0},new User({})).then(res => {
            if (res.length) {
                res = res[0]
                                                                                                                        
                                                assert.equal(res.device_id, 10)
                                                                                                
                                                assert.equal(res.parameter_id, 10)
                                                                                                
                                                assert.equal(res.device_donor_id, 10)
                                                                                                
                                                assert.equal(res.parameter_donor_id, 10)
                                                }
        })
    })

    it('func Device2Device FindById. Получение несуществующей записи', async function () {
        return FindByIdDevice2Device(0,new User()).catch(res => assert.equal(res.message , Device2Device_NOT_FOUND_ROW))
    })


    it('func Device2Device FindById. Получение одной конкретной записи', async function () {
        return FindByIdDevice2Device(add_id,new User()).then(res => {

                                                                                                
                                    assert.equal(res.device_id, 10)
                                                                            
                                    assert.equal(res.parameter_id, 10)
                                                                            
                                    assert.equal(res.device_donor_id, 10)
                                                                            
                                    assert.equal(res.parameter_donor_id, 10)
                                    })
    })



    it('func Device2Device Update. Редоктирование корректными значениями', async function () {

        let o = {}

                                    o['id'] = add_id
                                                    
                            o['device_id'] = 54
                                                        
                            o['parameter_id'] = 54
                                                        
                            o['device_donor_id'] = 54
                                                        
                            o['parameter_donor_id'] = 54
                            
        return EditDevice2Device(o,new User()).then(res => {
                                                assert.equal(res.id, add_id)
                                    
                                
                                    assert.equal(res.device_id, 54)
                                            
                                
                                    assert.equal(res.parameter_id, 54)
                                            
                                
                                    assert.equal(res.device_donor_id, 54)
                                            
                                
                                    assert.equal(res.parameter_donor_id, 54)
                                    })
    })

    
    it('func Device2Device Drop. Удаление несуществующей сущности', async function () {
        return DropDevice2Device(0,new User()).catch(e => assert.equal(e.message, DEVICE2DEVICE_ERROR_NOT_FOUND))
    })

    it('func Device2Device Drop. Корректное удаление', async function () {
        return DropDevice2Device(add_id,new User())
        .then(res => assert.deepStrictEqual(res, { result: true }))
    })
    
})