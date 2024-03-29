const {
    DeviceAdd, 
    DeviceDrop, 
    DeviceValidate, 
    DeviceUpdate, 
    DeviceGetAll, 
    DeviceFindById, 
        DeviceRecalcTree, 
        DEVICE_ERROR_VALIDATE_INVALID_DATA,
    DEVICE_ERROR_NOT_FOUND,
} = require('./Device');

const assert = require('assert').strict;

describe("repo: DB: Device", function () {

    

    let add_id = 0

    it('func Add. Корректное добавление', async function () {

        let o = {}

                                                                            o['parent_id'] = 10
                                                            o['name'] = 'test'
                                                            o['settings_connections'] = {'foo':'bar'}
                                                            o['lft'] = 10
                                                            o['rgt'] = 10
                                                            o['utc'] = 10
                                                            o['mod_id'] = 10
                                                            o['time_settings'] = {'foo':'bar'}
                                                            o['types'] = ['a','b']
                                                            o['status'] = 10
                                                            o['is_exclude'] = true
                            return DeviceAdd(o)
        .then(res => {
                                                add_id = res.get('id')
                                    
                                        assert.equal(res.get('parent_id'), 10)
                                            
                                    assert.equal(res.get('name'), 'test')
                                                
                                    assert.deepStrictEqual(res.get('settings_connections'), {'foo':'bar'})
                                            
                                        assert.equal(res.get('lft'), 10)
                                            
                                        assert.equal(res.get('rgt'), 10)
                                            
                                        assert.equal(res.get('utc'), 10)
                                            
                                        assert.equal(res.get('mod_id'), 10)
                                            
                                    assert.deepStrictEqual(res.get('time_settings'), {'foo':'bar'})
                                            
                                    assert.deepStrictEqual(res.get('types'), ['a','b'])
                                            
                                        assert.equal(res.get('status'), 10)
                                            
                                    assert.equal(res.get('is_exclude'), true)
                                    })
    })

    it('func Device GetAll. Получение всех записей', async function () {
        return DeviceGetAll().then(res => {
            if (res.length) {
                res = res[0]
                                                                                
                                                assert.equal(res.get('parent_id'), 10)
                                                        
                                            assert.equal(res.get('name'), 'test')
                                                            
                                            assert.deepStrictEqual(res.get('settings_connections'), {'foo':'bar'})
                                                        
                                                assert.equal(res.get('lft'), 10)
                                                        
                                                assert.equal(res.get('rgt'), 10)
                                                        
                                                assert.equal(res.get('utc'), 10)
                                                        
                                                assert.equal(res.get('mod_id'), 10)
                                                        
                                            assert.deepStrictEqual(res.get('time_settings'), {'foo':'bar'})
                                                        
                                            assert.deepStrictEqual(res.get('types'), ['a','b'])
                                                        
                                                assert.equal(res.get('status'), 10)
                                                        
                                            assert.equal(res.get('is_exclude'), true)
                                                }
        })
    })

    it('func Device FindById. Получение несуществующей записи', async function () {
        return DeviceFindById(0).then(res => assert.equal(res , null))
    })

    it('func Device FindById. Получение одной конкретной записи', async function () {
        return DeviceFindById(add_id).then(res => {
                                                                
                                        assert.equal(res.get('parent_id'), 10)
                                            
                                    assert.equal(res.get('name'), 'test')
                                                
                                    assert.deepStrictEqual(res.get('settings_connections'), {'foo':'bar'})
                                            
                                        assert.equal(res.get('lft'), 10)
                                            
                                        assert.equal(res.get('rgt'), 10)
                                            
                                        assert.equal(res.get('utc'), 10)
                                            
                                        assert.equal(res.get('mod_id'), 10)
                                            
                                    assert.deepStrictEqual(res.get('time_settings'), {'foo':'bar'})
                                            
                                    assert.deepStrictEqual(res.get('types'), ['a','b'])
                                            
                                        assert.equal(res.get('status'), 10)
                                            
                                    assert.equal(res.get('is_exclude'), true)
                                    })
    })


    it('func Device Update. Редоктирование корректными значениями', async function () {

        let o = {}

                                    o['id'] = add_id
                                                        o['parent_id'] = 54
                                                            o['name'] = 'test 2'
                                                            o['settings_connections'] = {'dd' : 'sss'}
                                                            o['lft'] = 54
                                                            o['rgt'] = 54
                                                            o['utc'] = 54
                                                            o['mod_id'] = 54
                                                            o['time_settings'] = {'dd' : 'sss'}
                                                            o['types'] = [1,2]
                                                            o['status'] = 54
                                                            o['is_exclude'] = false
                            
        return DeviceUpdate(o).then(res => {
                                                assert.equal(res.get('id'), add_id)
                                    
                                    assert.equal(res.get('parent_id'), 54)
                                            
                                    assert.equal(res.get('name'), 'test 2')
                                            
                                    assert.deepStrictEqual(res.get('settings_connections'), {'dd' : 'sss'})
                                            
                                    assert.equal(res.get('lft'), 54)
                                            
                                    assert.equal(res.get('rgt'), 54)
                                            
                                    assert.equal(res.get('utc'), 54)
                                            
                                    assert.equal(res.get('mod_id'), 54)
                                            
                                    assert.deepStrictEqual(res.get('time_settings'), {'dd' : 'sss'})
                                            
                                    assert.deepStrictEqual(res.get('types'), [1,2])
                                            
                                    assert.equal(res.get('status'), 54)
                                            
                                    assert.equal(res.get('is_exclude'), false)
                                    })
    })

    it('func Device Drop. Удаление несуществующей сущности', async function () {
        return DeviceDrop(0).catch(e => assert.equal(e.message, DEVICE_ERROR_NOT_FOUND))
    })

    it('func Device Drop. Корректное удаление', async function () {
        return DeviceDrop(add_id)
        .then(res => assert.deepStrictEqual(res, { result: true }))
    })
    





})