             

 


const { 
    AddRoleRule, 
    EditRoleRule, 
    DropRoleRule, 
    GetAllRoleRule, 
    FindByIdRoleRule, 
    RoleRule_NOT_FOUND_ROW, 
    RoleRule_NOT_FOUND_CONTEXT, 
    ROLERULE_ERROR_NOT_FOUND
} = require('./RoleRule');

    const User = require("../entity/User");


const  {
    ROLERULE_ERROR_VALIDATE_INVALID_DATA,
} = require('../repositories/RoleRule');

const assert = require('assert').strict;



describe("use_cases: RoleRule", function () {

    

    let add_id = 0

    it('func Add. Корректное добавление', async function () {

        let o = {}

                                                                            o['role_id'] = 10
                                                            o['rule_id'] = 10
                            return AddRoleRule(o,new User())
        .then(res => {
                                                add_id = res.id
                                    
                                        assert.equal(res.role_id, 10)
                                            
                                        assert.equal(res.rule_id, 10)
                                    })
    })

    it('func RoleRule GetAll. Получение всех записей', async function () {
        return GetAllRoleRule({limit:10,offset:0},new User({})).then(res => {
            if (res.length) {
                res = res[0]
                                                                                
                                                assert.equal(res.role_id, 10)
                                                        
                                                assert.equal(res.rule_id, 10)
                                                }
        })
    })

    it('func RoleRule FindById. Получение несуществующей записи', async function () {
        return FindByIdRoleRule(0,new User()).catch(res => assert.equal(res.message , RoleRule_NOT_FOUND_ROW))
    })


    it('func RoleRule FindById. Получение одной конкретной записи', async function () {
        return FindByIdRoleRule(add_id,new User()).then(res => {

                                                                
                                    assert.equal(res.role_id, 10)
                                            
                                    assert.equal(res.rule_id, 10)
                                    })
    })



    it('func RoleRule Update. Редоктирование корректными значениями', async function () {

        let o = {}

                                    o['id'] = add_id
                                                        o['role_id'] = 54
                                                            o['rule_id'] = 54
                            
        return EditRoleRule(o,new User()).then(res => {
                                                assert.equal(res.id, add_id)
                                    
                                    assert.equal(res.role_id, 54)
                                            
                                    assert.equal(res.rule_id, 54)
                                    })
    })

    
    it('func RoleRule Drop. Удаление несуществующей сущности', async function () {
        return DropRoleRule(0,new User()).catch(e => assert.equal(e.message, ROLERULE_ERROR_NOT_FOUND))
    })

    it('func RoleRule Drop. Корректное удаление', async function () {
        return DropRoleRule(add_id,new User())
        .then(res => assert.deepStrictEqual(res, { result: true }))
    })
    
})