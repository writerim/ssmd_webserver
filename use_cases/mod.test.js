                                                     

 


const { 
    AddMod, 
    EditMod, 
    DropMod, 
    GetAllMod, 
    FindByIdMod, 
    Mod_NOT_FOUND_ROW, 
    Mod_NOT_FOUND_CONTEXT, 
    MOD_ERROR_NOT_FOUND
} = require('./Mod');

    const User = require("../entity/User");


const  {
    MOD_ERROR_VALIDATE_INVALID_DATA,
} = require('../repositories/Mod');

const assert = require('assert').strict;



describe("use_cases: Mod", function () {

    

    let add_id = 0

    it('func Add. Корректное добавление', async function () {

        let o = {}

                                                                            o['name'] = 'test'
                                                            o['manufactures'] = 'test'
                                                            o['mark'] = 'test'
                                                            o['model'] = 'test'
                                                            o['series'] = 'test'
                                                            o['sowt_version'] = 'test'
                                                            o['types_device'] = ['a','b']
                                                            o['lib'] = 'test'
                                                            o['parameters'] = ['a','b']
                                                            o['commands'] = ['a','b']
                                                            o['lib_description'] = {'foo':'bar'}
                                                            o['commands'] = ['a','b']
                            return AddMod(o,new User())
        .then(res => {
                                                add_id = res.id
                                    
                                    assert.equal(res.name, 'test')
                                                
                                    assert.equal(res.manufactures, 'test')
                                                
                                    assert.equal(res.mark, 'test')
                                                
                                    assert.equal(res.model, 'test')
                                                
                                    assert.equal(res.series, 'test')
                                                
                                    assert.equal(res.sowt_version, 'test')
                                                
                                    assert.deepStrictEqual(res.types_device, ['a','b'])
                                            
                                    assert.equal(res.lib, 'test')
                                                
                                    assert.deepStrictEqual(res.parameters, ['a','b'])
                                            
                                    assert.deepStrictEqual(res.commands, ['a','b'])
                                            
                                    assert.deepStrictEqual(res.lib_description, {'foo':'bar'})
                                            
                                    assert.deepStrictEqual(res.commands, ['a','b'])
                                    })
    })

    it('func Mod GetAll. Получение всех записей', async function () {
        return GetAllMod({limit:10,offset:0},new User({})).then(res => {
            if (res.length) {
                res = res[0]
                                                                                
                                            assert.equal(res.name, 'test')
                                                            
                                            assert.equal(res.manufactures, 'test')
                                                            
                                            assert.equal(res.mark, 'test')
                                                            
                                            assert.equal(res.model, 'test')
                                                            
                                            assert.equal(res.series, 'test')
                                                            
                                            assert.equal(res.sowt_version, 'test')
                                                            
                                            assert.deepStrictEqual(res.types_device, ['a','b'])
                                                        
                                            assert.equal(res.lib, 'test')
                                                            
                                            assert.deepStrictEqual(res.parameters, ['a','b'])
                                                        
                                            assert.deepStrictEqual(res.commands, ['a','b'])
                                                        
                                            assert.deepStrictEqual(res.lib_description, {'foo':'bar'})
                                                        
                                            assert.deepStrictEqual(res.commands, ['a','b'])
                                                }
        })
    })

    it('func Mod FindById. Получение несуществующей записи', async function () {
        return FindByIdMod(0,new User()).catch(res => assert.equal(res.message , Mod_NOT_FOUND_ROW))
    })


    it('func Mod FindById. Получение одной конкретной записи', async function () {
        return FindByIdMod(add_id,new User()).then(res => {

                                                                
                                    assert.equal(res.name, 'test')
                                            
                                    assert.equal(res.manufactures, 'test')
                                            
                                    assert.equal(res.mark, 'test')
                                            
                                    assert.equal(res.model, 'test')
                                            
                                    assert.equal(res.series, 'test')
                                            
                                    assert.equal(res.sowt_version, 'test')
                                            
                                    assert.deepStrictEqual(res.types_device, ['a','b'])
                                            
                                    assert.equal(res.lib, 'test')
                                            
                                    assert.deepStrictEqual(res.parameters, ['a','b'])
                                            
                                    assert.deepStrictEqual(res.commands, ['a','b'])
                                            
                                    assert.deepStrictEqual(res.lib_description, {'foo':'bar'})
                                            
                                    assert.deepStrictEqual(res.commands, ['a','b'])
                                    })
    })



    it('func Mod Update. Редоктирование корректными значениями', async function () {

        let o = {}

                                    o['id'] = add_id
                                                        o['name'] = 'test 2'
                                                            o['manufactures'] = 'test 2'
                                                            o['mark'] = 'test 2'
                                                            o['model'] = 'test 2'
                                                            o['series'] = 'test 2'
                                                            o['sowt_version'] = 'test 2'
                                                            o['types_device'] = [1,2]
                                                            o['lib'] = 'test 2'
                                                            o['parameters'] = [1,2]
                                                            o['commands'] = [1,2]
                                                            o['lib_description'] = {'dd' : 'sss'}
                                                            o['commands'] = [1,2]
                            
        return EditMod(o,new User()).then(res => {
                                                assert.equal(res.id, add_id)
                                    
                                    assert.equal(res.name, 'test 2')
                                            
                                    assert.equal(res.manufactures, 'test 2')
                                            
                                    assert.equal(res.mark, 'test 2')
                                            
                                    assert.equal(res.model, 'test 2')
                                            
                                    assert.equal(res.series, 'test 2')
                                            
                                    assert.equal(res.sowt_version, 'test 2')
                                            
                                    assert.deepStrictEqual(res.types_device, [1,2])
                                            
                                    assert.equal(res.lib, 'test 2')
                                            
                                    assert.deepStrictEqual(res.parameters, [1,2])
                                            
                                    assert.deepStrictEqual(res.commands, [1,2])
                                            
                                    assert.deepStrictEqual(res.lib_description, {'dd' : 'sss'})
                                            
                                    assert.deepStrictEqual(res.commands, [1,2])
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