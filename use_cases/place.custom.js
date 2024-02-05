// generated

const Place = require("../entity/place");

const { 
    PlaceAdd, 
    PlaceRecalcTree, 
    PlaceGetAllFilterCount,
} = require("../repositories/place");

module.exports = {

    /*
    
        Проверка что установлены базовые объекты иницализации

        Базовые объекты: это самое глобальное пространство для пользователей рут и так далее
        Оно есть всегда и называется SYSTEM

    */
    async CheckInstallBasePlace() {

        PlaceGetAllFilterCount({
            parent_id : 0
        }).then(res => {
            if(!res){
                return PlaceAdd({
                    name : "SYSTEM",
                    parent_id: 0,
                }).then(res => {
                    return PlaceRecalcTree().then(t => {
                        return new Place(res.dataValues) 
                    })
                })
            }
        })

    },


}