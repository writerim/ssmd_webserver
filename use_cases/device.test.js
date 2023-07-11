                                                         

         


const { 
    AddDevice, 
    EditDevice, 
    DropDevice, 
    GetAllDevice, 
    FindByIdDevice, 
    Device_NOT_FOUND_ROW, 
    Device_NOT_FOUND_CONTEXT, 
    DEVICE_ERROR_NOT_FOUND
} = require('./Device');

    const User = require("../entity/User");


const  {
    DEVICE_ERROR_VALIDATE_INVALID_DATA,
} = require('../repositories/Device');

const assert = require('assert').strict;



describe("use_cases: Device", function () {

    
        it('func Device Add. Проверка на контекст', async function () {
            return AddDevice({}).catch(res => {
                assert.equal(res.message, Device_NOT_FOUND_CONTEXT)
            })
        })

        it('func Device Add. Проверка на пустой объект', async function () {
            return AddDevice({},new User()).catch(res => {
                assert.equal(res.message, DEVICE_ERROR_VALIDATE_INVALID_DATA)
            })
        })
        

            

    let add_id = 0

    it('func Add. Корректное добавление', async function () {

        let o = {}

                                                                            o['paren_id'] = 10
                                                            o['name'] = 'test'
                                                            o['settings_connections'] = {'foo':'bar'}
                                                            o['lft'] = 10
                                                            o['rgt'] = 10
                                                            o['place_id'] = 10
                                                            o['utc'] = 10
                                                            o['mod_id'] = 10
                                                            o['time_settings'] = {'foo':'bar'}
                                                            o['types'] = ['a','b']
                            return AddDevice(o,new User())
        .then(res => {
                                                add_id = res.id
                                    
                                        assert.equal(res.paren_id, 10)
                                            
                                    assert.equal(res.name, 'test')
                                                
                                    assert.deepStrictEqual(res.settings_connections, {'foo':'bar'})
                                            
                                        assert.equal(res.lft, 10)
                                            
                                        assert.equal(res.rgt, 10)
                                            
                                        assert.equal(res.place_id, 10)
                                            
                                        assert.equal(res.utc, 10)
                                            
                                        assert.equal(res.mod_id, 10)
                                            
                                    assert.deepStrictEqual(res.time_settings, {'foo':'bar'})
                                            
                                    assert.deepStrictEqual(res.types, ['a','b'])
                                    })
    })

    it('func Device GetAll. Получение всех записей', async function () {
        return GetAllDevice({limit:10,offset:0},new User({})).then(res => {
            if (res.length) {
                res = res[0]
                                                                                
                                                assert.equal(res.paren_id, 10)
                                                        
                                            assert.equal(res.name, 'test')
                                                            
                                            assert.deepStrictEqual(res.settings_connections, {'foo':'bar'})
                                                        
                                                assert.equal(res.lft, 10)
                                                        
                                                assert.equal(res.rgt, 10)
                                                        
                                                assert.equal(res.place_id, 10)
                                                        
                                                assert.equal(res.utc, 10)
                                                        
                                                assert.equal(res.mod_id, 10)
                                                        
                                            assert.deepStrictEqual(res.time_settings, {'foo':'bar'})
                                                        
                                            assert.deepStrictEqual(res.types, ['a','b'])
                                                }
        })
    })

    it('func Device FindById. Получение несуществующей записи', async function () {
        return FindByIdDevice(0,new User()).catch(res => assert.equal(res.message , Device_NOT_FOUND_ROW))
    })


    it('func Device FindById. Получение одной конкретной записи', async function () {
        return FindByIdDevice(add_id,new User()).then(res => {

                                                                
                                    assert.equal(res.paren_id, 10)
                                            
                                    assert.equal(res.name, 'test')
                                            
                                    assert.deepStrictEqual(res.settings_connections, {'foo':'bar'})
                                            
                                    assert.equal(res.lft, 10)
                                            
                                    assert.equal(res.rgt, 10)
                                            
                                    assert.equal(res.place_id, 10)
                                            
                                    assert.equal(res.utc, 10)
                                            
                                    assert.equal(res.mod_id, 10)
                                            
                                    assert.deepStrictEqual(res.time_settings, {'foo':'bar'})
                                            
                                    assert.deepStrictEqual(res.types, ['a','b'])
                                    })
    })



    it('func Device Update. Редоктирование корректными значениями', async function () {

        let o = {}

                                    o['id'] = add_id
                                                        o['paren_id'] = 54
                                                            o['name'] = 'test 2'
                                                            o['settings_connections'] = {'dd' : 'sss'}
                                                            o['lft'] = 54
                                                            o['rgt'] = 54
                                                            o['place_id'] = 54
                                                            o['utc'] = 54
                                                            o['mod_id'] = 54
                                                            o['time_settings'] = {'dd' : 'sss'}
                                                            o['types'] = [1,2]
                            
        return EditDevice(o,new User()).then(res => {
                                                assert.equal(res.id, add_id)
                                    
                                    assert.equal(res.paren_id, 54)
                                            
                                    assert.equal(res.name, 'test 2')
                                            
                                    assert.deepStrictEqual(res.settings_connections, {'dd' : 'sss'})
                                            
                                    assert.equal(res.lft, 54)
                                            
                                    assert.equal(res.rgt, 54)
                                            
                                    assert.equal(res.place_id, 54)
                                            
                                    assert.equal(res.utc, 54)
                                            
                                    assert.equal(res.mod_id, 54)
                                            
                                    assert.deepStrictEqual(res.time_settings, {'dd' : 'sss'})
                                            
                                    assert.deepStrictEqual(res.types, [1,2])
                                    })
    })

    
    it('func Device Drop. Удаление несуществующей сущности', async function () {
        return DropDevice(0,new User()).catch(e => assert.equal(e.message, DEVICE_ERROR_NOT_FOUND))
    })

    it('func Device Drop. Корректное удаление', async function () {
        return DropDevice(add_id,new User())
        .then(res => assert.deepStrictEqual(res, { result: true }))
    })
    
})