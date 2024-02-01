const { 
    AddMod, 
    EditMod, 
    DropMod, 
    GetAllMod, 
    FindByIdMod, 
    Mod_NOT_FOUND_ROW, 
    Mod_NOT_FOUND_CONTEXT, 
    MOD_ERROR_NOT_FOUND
} = require('./mod.js');

    const User = require("../entity/user");


const  {
    MOD_ERROR_VALIDATE_INVALID_DATA,
} = require('../repositories/mod.js');

const assert = require('assert').strict;



describe("use_cases: Mod", function () {

    

    let add_id = 0

    it('func Add. Корректное добавление', async function () {

        let o = {}

                                                                                                    o['ident'] = 'test'
                                                                                    o['version'] = 'test'
                                                                                    o['manufactures'] = 'test'
                                                                                    o['mark'] = 'test'
                                                                                    o['model'] = 'test'
                                                                                    o['series'] = 'test'
                                                                                    o['sowt_version'] = 'test'
                                                                                    o['types_device'] = ['a','b']
                                                                                    o['cron_parameters'] = ['a','b']
                                                                                    o['commands'] = ['a','b']
                                                                                    o['parameters'] = ['a','b']
                                                                                    o['time_settings'] = ['a','b']
                                                                                    o['device_parameters'] = ['a','b']
                            return AddMod(o,new User())
        .then(res => {
                                                add_id = res.id
                                                                    
                                    assert.equal(res.ident, 'test')
                                                                                
                                    assert.equal(res.version, 'test')
                                                                                
                                    assert.equal(res.manufactures, 'test')
                                                                                
                                    assert.equal(res.mark, 'test')
                                                                                
                                    assert.equal(res.model, 'test')
                                                                                
                                    assert.equal(res.series, 'test')
                                                                                
                                    assert.equal(res.sowt_version, 'test')
                                                                                
                                    assert.deepStrictEqual(res.types_device, ['a','b'])
                                                                            
                                    assert.deepStrictEqual(res.cron_parameters, ['a','b'])
                                                                            
                                    assert.deepStrictEqual(res.commands, ['a','b'])
                                                                            
                                    assert.deepStrictEqual(res.parameters, ['a','b'])
                                                                            
                                    assert.deepStrictEqual(res.time_settings, ['a','b'])
                                                                            
                                    assert.deepStrictEqual(res.device_parameters, ['a','b'])
                                    })
    })

    it('func Mod GetAll. Получение всех записей', async function () {
        return GetAllMod({limit:10,offset:0},new User({})).then(res => {
            if (res.length) {
                res = res[0]
                                                                                                                        
                                            assert.equal(res.ident, 'test')
                                                                                                    
                                            assert.equal(res.version, 'test')
                                                                                                    
                                            assert.equal(res.manufactures, 'test')
                                                                                                    
                                            assert.equal(res.mark, 'test')
                                                                                                    
                                            assert.equal(res.model, 'test')
                                                                                                    
                                            assert.equal(res.series, 'test')
                                                                                                    
                                            assert.equal(res.sowt_version, 'test')
                                                                                                    
                                            assert.deepStrictEqual(res.types_device, ['a','b'])
                                                                                                
                                            assert.deepStrictEqual(res.cron_parameters, ['a','b'])
                                                                                                
                                            assert.deepStrictEqual(res.commands, ['a','b'])
                                                                                                
                                            assert.deepStrictEqual(res.parameters, ['a','b'])
                                                                                                
                                            assert.deepStrictEqual(res.time_settings, ['a','b'])
                                                                                                
                                            assert.deepStrictEqual(res.device_parameters, ['a','b'])
                                                }
        })
    })

    it('func Mod FindById. Получение несуществующей записи', async function () {
        return FindByIdMod(0,new User()).catch(res => assert.equal(res.message , Mod_NOT_FOUND_ROW))
    })


    it('func Mod FindById. Получение одной конкретной записи', async function () {
        return FindByIdMod(add_id,new User()).then(res => {

                                                                                                
                                    assert.equal(res.ident, 'test')
                                                                            
                                    assert.equal(res.version, 'test')
                                                                            
                                    assert.equal(res.manufactures, 'test')
                                                                            
                                    assert.equal(res.mark, 'test')
                                                                            
                                    assert.equal(res.model, 'test')
                                                                            
                                    assert.equal(res.series, 'test')
                                                                            
                                    assert.equal(res.sowt_version, 'test')
                                                                            
                                    assert.deepStrictEqual(res.types_device, ['a','b'])
                                                                            
                                    assert.deepStrictEqual(res.cron_parameters, ['a','b'])
                                                                            
                                    assert.deepStrictEqual(res.commands, ['a','b'])
                                                                            
                                    assert.deepStrictEqual(res.parameters, ['a','b'])
                                                                            
                                    assert.deepStrictEqual(res.time_settings, ['a','b'])
                                                                            
                                    assert.deepStrictEqual(res.device_parameters, ['a','b'])
                                    })
    })



    it('func Mod Update. Редоктирование корректными значениями', async function () {

        let o = {}

                                    o['id'] = add_id
                                                    
                            o['ident'] = 'test 2'
                                                        
                            o['version'] = 'test 2'
                                                        
                            o['manufactures'] = 'test 2'
                                                        
                            o['mark'] = 'test 2'
                                                        
                            o['model'] = 'test 2'
                                                        
                            o['series'] = 'test 2'
                                                        
                            o['sowt_version'] = 'test 2'
                                                        
                            o['types_device'] = [1,2]
                                                        
                            o['cron_parameters'] = [1,2]
                                                        
                            o['commands'] = [1,2]
                                                        
                            o['parameters'] = [1,2]
                                                        
                            o['time_settings'] = [1,2]
                                                        
                            o['device_parameters'] = [1,2]
                            
        return EditMod(o,new User()).then(res => {
                                                assert.equal(res.id, add_id)
                                    
                                
                                    assert.equal(res.ident, 'test 2')
                                            
                                
                                    assert.equal(res.version, 'test 2')
                                            
                                
                                    assert.equal(res.manufactures, 'test 2')
                                            
                                
                                    assert.equal(res.mark, 'test 2')
                                            
                                
                                    assert.equal(res.model, 'test 2')
                                            
                                
                                    assert.equal(res.series, 'test 2')
                                            
                                
                                    assert.equal(res.sowt_version, 'test 2')
                                            
                                
                                    assert.deepStrictEqual(res.types_device, [1,2])
                                            
                                
                                    assert.deepStrictEqual(res.cron_parameters, [1,2])
                                            
                                
                                    assert.deepStrictEqual(res.commands, [1,2])
                                            
                                
                                    assert.deepStrictEqual(res.parameters, [1,2])
                                            
                                
                                    assert.deepStrictEqual(res.time_settings, [1,2])
                                            
                                
                                    assert.deepStrictEqual(res.device_parameters, [1,2])
                                    })
    })

    
    it('func Mod Drop. Удаление несуществующей сущности', async function () {
        return DropMod(0,new User()).catch(e => assert.equal(e.message, MOD_ERROR_NOT_FOUND))
    })

    it('func Mod Drop. Корректное удаление', async function () {
        return DropMod(add_id,new User())
        .then(res => assert.deepStrictEqual(res, { result: true }))
    })
    
})