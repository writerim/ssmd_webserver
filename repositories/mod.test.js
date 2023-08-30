                                                     

 

const { 
    ModAdd, 
    ModDrop, 
    ModValidate, 
    ModUpdate, 
    ModGetAll, 
    ModFindById, 
        MOD_ERROR_VALIDATE_INVALID_DATA,
    MOD_ERROR_NOT_FOUND,
} = require('./Mod');

const assert = require('assert').strict;

describe("repo: DB: Mod", function () {

    

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
                            return ModAdd(o)
        .then(res => {
                                                add_id = res.get('id')
                                    
                                    assert.equal(res.get('name'), 'test')
                                                
                                    assert.equal(res.get('manufactures'), 'test')
                                                
                                    assert.equal(res.get('mark'), 'test')
                                                
                                    assert.equal(res.get('model'), 'test')
                                                
                                    assert.equal(res.get('series'), 'test')
                                                
                                    assert.equal(res.get('sowt_version'), 'test')
                                                
                                    assert.deepStrictEqual(res.get('types_device'), ['a','b'])
                                            
                                    assert.equal(res.get('lib'), 'test')
                                                
                                    assert.deepStrictEqual(res.get('parameters'), ['a','b'])
                                            
                                    assert.deepStrictEqual(res.get('commands'), ['a','b'])
                                            
                                    assert.deepStrictEqual(res.get('lib_description'), {'foo':'bar'})
                                            
                                    assert.deepStrictEqual(res.get('commands'), ['a','b'])
                                    })
    })

    it('func Mod GetAll. Получение всех записей', async function () {
        return ModGetAll().then(res => {
            if (res.length) {
                res = res[0]
                                                                                
                                            assert.equal(res.get('name'), 'test')
                                                            
                                            assert.equal(res.get('manufactures'), 'test')
                                                            
                                            assert.equal(res.get('mark'), 'test')
                                                            
                                            assert.equal(res.get('model'), 'test')
                                                            
                                            assert.equal(res.get('series'), 'test')
                                                            
                                            assert.equal(res.get('sowt_version'), 'test')
                                                            
                                            assert.deepStrictEqual(res.get('types_device'), ['a','b'])
                                                        
                                            assert.equal(res.get('lib'), 'test')
                                                            
                                            assert.deepStrictEqual(res.get('parameters'), ['a','b'])
                                                        
                                            assert.deepStrictEqual(res.get('commands'), ['a','b'])
                                                        
                                            assert.deepStrictEqual(res.get('lib_description'), {'foo':'bar'})
                                                        
                                            assert.deepStrictEqual(res.get('commands'), ['a','b'])
                                                }
        })
    })

    it('func Mod FindById. Получение несуществующей записи', async function () {
        return ModFindById(0).then(res => assert.equal(res , null))
    })

    it('func Mod FindById. Получение одной конкретной записи', async function () {
        return ModFindById(add_id).then(res => {
                                                                
                                    assert.equal(res.get('name'), 'test')
                                                
                                    assert.equal(res.get('manufactures'), 'test')
                                                
                                    assert.equal(res.get('mark'), 'test')
                                                
                                    assert.equal(res.get('model'), 'test')
                                                
                                    assert.equal(res.get('series'), 'test')
                                                
                                    assert.equal(res.get('sowt_version'), 'test')
                                                
                                    assert.deepStrictEqual(res.get('types_device'), ['a','b'])
                                            
                                    assert.equal(res.get('lib'), 'test')
                                                
                                    assert.deepStrictEqual(res.get('parameters'), ['a','b'])
                                            
                                    assert.deepStrictEqual(res.get('commands'), ['a','b'])
                                            
                                    assert.deepStrictEqual(res.get('lib_description'), {'foo':'bar'})
                                            
                                    assert.deepStrictEqual(res.get('commands'), ['a','b'])
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
                            
        return ModUpdate(o).then(res => {
                                                assert.equal(res.get('id'), add_id)
                                    
                                    assert.equal(res.get('name'), 'test 2')
                                            
                                    assert.equal(res.get('manufactures'), 'test 2')
                                            
                                    assert.equal(res.get('mark'), 'test 2')
                                            
                                    assert.equal(res.get('model'), 'test 2')
                                            
                                    assert.equal(res.get('series'), 'test 2')
                                            
                                    assert.equal(res.get('sowt_version'), 'test 2')
                                            
                                    assert.deepStrictEqual(res.get('types_device'), [1,2])
                                            
                                    assert.equal(res.get('lib'), 'test 2')
                                            
                                    assert.deepStrictEqual(res.get('parameters'), [1,2])
                                            
                                    assert.deepStrictEqual(res.get('commands'), [1,2])
                                            
                                    assert.deepStrictEqual(res.get('lib_description'), {'dd' : 'sss'})
                                            
                                    assert.deepStrictEqual(res.get('commands'), [1,2])
                                    })
    })

    it('func Mod Drop. Удаление несуществующей сущности', async function () {
        return ModDrop(0).catch(e => assert.equal(e.message, MOD_ERROR_NOT_FOUND))
    })

    it('func Mod Drop. Корректное удаление', async function () {
        return ModDrop(add_id)
        .then(res => assert.deepStrictEqual(res, { result: true }))
    })
    





})