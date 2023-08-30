         

 


const { 
    AddParameter, 
    EditParameter, 
    DropParameter, 
    GetAllParameter, 
    FindByIdParameter, 
    Parameter_NOT_FOUND_ROW, 
    Parameter_NOT_FOUND_CONTEXT, 
    PARAMETER_ERROR_NOT_FOUND
} = require('./Parameter');

    const User = require("../entity/User");


const  {
    PARAMETER_ERROR_VALIDATE_INVALID_DATA,
} = require('../repositories/Parameter');

const assert = require('assert').strict;



describe("use_cases: Parameter", function () {

    

    let add_id = 0

    it('func Add. Корректное добавление', async function () {

        let o = {}

                                                                            o['ident'] = 'test'
                            return AddParameter(o,new User())
        .then(res => {
                                                add_id = res.id
                                    
                                    assert.equal(res.ident, 'test')
                                        })
    })

    it('func Parameter GetAll. Получение всех записей', async function () {
        return GetAllParameter({limit:10,offset:0},new User({})).then(res => {
            if (res.length) {
                res = res[0]
                                                                                
                                            assert.equal(res.ident, 'test')
                                                    }
        })
    })

    it('func Parameter FindById. Получение несуществующей записи', async function () {
        return FindByIdParameter(0,new User()).catch(res => assert.equal(res.message , Parameter_NOT_FOUND_ROW))
    })


    it('func Parameter FindById. Получение одной конкретной записи', async function () {
        return FindByIdParameter(add_id,new User()).then(res => {

                                                                
                                    assert.equal(res.ident, 'test')
                                    })
    })



    it('func Parameter Update. Редоктирование корректными значениями', async function () {

        let o = {}

                                    o['id'] = add_id
                                                        o['ident'] = 'test 2'
                            
        return EditParameter(o,new User()).then(res => {
                                                assert.equal(res.id, add_id)
                                    
                                    assert.equal(res.ident, 'test 2')
                                    })
    })

    
    it('func Parameter Drop. Удаление несуществующей сущности', async function () {
        return DropParameter(0,new User()).catch(e => assert.equal(e.message, PARAMETER_ERROR_NOT_FOUND))
    })

    it('func Parameter Drop. Корректное удаление', async function () {
        return DropParameter(add_id,new User())
        .then(res => assert.deepStrictEqual(res, { result: true }))
    })
    
})