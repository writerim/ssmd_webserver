const { 
    AddUserPlace, 
    FindByIdUserPlace, 
    EditUserPlace, 
    DropUserPlace, 
    GetAllCountUserPlace, 
    GetAllSearchUserPlace, 
    GetAllSearchCountUserPlace, 
    GetAllByFilterUserPlace, 
    GetAllByFilterCountUserPlace, 
    GetAllUserPlace 
} = require("../../use_cases/userplace");

const UserCtx = require("../../entity/user");

const CONTEXT_NOT_FOUND = 'not fount context'
const INAVID_ARGS = 'invalid args'

// маппер в ответ для Гет ответа
const mapToGetResponse = (obj) =>{
    let res_obj = {}
            res_obj = obj;
        return res_obj
}


// маппер в ответ для Add запроса
const mapToAddRequest = (obj) =>{
    let res_obj = {}
            res_obj = obj;
        return res_obj
}

// маппер в ответ для Add ответа
const mapToAddResponse = (obj) =>{
    let res_obj = {}
            res_obj = obj;
        return res_obj
}


// маппер в ответ для Edit запроса
const mapToEditRequest = (obj) =>{
    let res_obj = {}
            res_obj = obj;
        return res_obj
}

// маппер в ответ для Edit ответа
const mapToEditResponse = (obj) =>{
    let res_obj = {}
            res_obj = obj;
        return res_obj
}



// маппер в ответ для Delete запроса
const mapToDeleteRequest = (obj) =>{
    let res_obj = {}
            res_obj = obj;
        return res_obj
}

// маппер в ответ для Delete ответа
const mapToDeleteResponse = (obj) =>{
    let res_obj = {}
            res_obj = obj;
        return res_obj
}


module.exports = {

/**
* @api {put} /api/userplace/0 Добавление Привязка пользователей к объектам
* @apiName AddUserPlace
* @apiGroup UserPlace
*
*
* @apiHeader {String} Token Ключ авторизации полученный при авторизации
* @apiHeaderExample {Header} Token
*     "Token: ad302aca-13fe-45cc-a126-d27821f143fa"
*
* @apiBody {Number} id 
* @apiBody {Number} plce_id Объект к которому привязан пользователь\группа
* @apiBody {Number} user_id Пользователь\группа, который привязан к объекту
*
* @apiSuccess {Number} id 
* @apiSuccess {Number} plce_id Объект к которому привязан пользователь\группа
* @apiSuccess {Number} user_id Пользователь\группа, который привязан к объекту
* @apiErrorExample Response (example):
*     HTTP/1.1 200
*     {
*       "error": "invalid data",
*       "error": "not found"
*       "error": "permission denied"
*       "error": "not fount context"
*       "error": "not fount row"
                                 
*     }
*/
    ApiAddUserPlace (req, res, next) {

        console.log('ApiAddUserPlace');

        res.setHeader('Content-Type', 'application/json');
        this.isAuth(req, res).then(user => {
            if(!user){
                res.end(JSON.stringify({ error: CONTEXT_NOT_FOUND }));
                return
            }
            const user_ctx = new UserCtx(user.dataValues)
            return AddUserPlace(mapToAddRequest(req.body), user_ctx).then(r => {
                res.end(JSON.stringify(r));
            }).catch(e => next(e))
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },

/**
* @api {get} /api/userplace/:id Получение по идентификатору Привязка пользователей к объектам
* @apiName iGetByIdUserPlace
* @apiGroup UserPlace
*
*
* @apiHeader {String} Token Ключ авторизации полученный при авторизации
* @apiHeaderExample {Header} Token
*     "Token: ad302aca-13fe-45cc-a126-d27821f143fa"
*
* @apiParam {Number} id Users unique ID.
*
* @apiErrorExample Response (example):
*     HTTP/1.1 200
*     {
*       "error": "not found"
*       "error": "permission denied"
*       "error": "not fount context"
*       "error": "not fount row"
*     }
*/
    ApiGetByIdUserPlace (req, res, next) {

    console.log('ApiGetByIdUserPlace');

        res.setHeader('Content-Type', 'application/json');
        this.isAuth(req, res).then(user => {
            if(!user){
                res.end(JSON.stringify({ error: CONTEXT_NOT_FOUND }));
                return
            }
            const user_ctx = new UserCtx(user.dataValues)
            return FindByIdUserPlace(req.params.id, user_ctx).then(r => {
                res.end(JSON.stringify(mapToGetResponse(r)));
            }).catch(e => next(e))
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },

/**
* @api {put} /api/userplace/:id Редактирование записи Привязка пользователей к объектам
* @apiName EditUserPlace
* @apiGroup UserPlace
*
*
* @apiHeader {String} Token Ключ авторизации полученный при авторизации
* @apiHeaderExample {Header} Token
*     "Token: ad302aca-13fe-45cc-a126-d27821f143fa"
*
* @apiParam {Number} id Идентификатор записи устройства
* @apiBody {Number} id 
* @apiBody {Number} plce_id Объект к которому привязан пользователь\группа
* @apiBody {Number} user_id Пользователь\группа, который привязан к объекту
*
*
* @apiSuccess {Number} id=true 
* @apiSuccess {Number} plce_id=true Объект к которому привязан пользователь\группа
* @apiSuccess {Number} user_id=true Пользователь\группа, который привязан к объекту
* @apiErrorExample Response (example):
*     HTTP/1.1 200
*     {
*       "error": "invalid data",
*       "error": "not found"
*       "error": "permission denied"
*       "error": "not fount context"
*       "error": "not fount row"
                                 
*     }
*/
    ApiEditUserPlace (req, res, next) {

    console.log('ApiEditUserPlace');

        res.setHeader('Content-Type', 'application/json');
        this.isAuth(req, res).then(user => {
            if(!user){
                res.end(JSON.stringify({ error: CONTEXT_NOT_FOUND }));
                return
            }
            const user_ctx = new UserCtx(user.dataValues)
            if(!req.body.id && !req.params.id){
                res.status(412).json({ error: INAVID_ARGS });
            }
            return EditUserPlace(mapToEditRequest(req.body), user_ctx).then(r => {
                res.end(JSON.stringify(mapToEditResponse(r)));
            }).catch(e => next(e))
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },


/**
* @api {delete} /api/userplace/:id Удаление записи Привязка пользователей к объектам
* @apiName DeleteUserPlace
* @apiGroup UserPlace
*
* @apiHeader {String} Token Ключ авторизации полученный при авторизации
* @apiHeaderExample {Header} Token
*     "Token: ad302aca-13fe-45cc-a126-d27821f143fa"
*
* @apiParam {Number} id Users unique ID.
* @apiSuccess {Boolean} result <code>true</code>
*
* @apiErrorExample Response (example):
*     HTTP/1.1 200
*     {
*       "error": "invalid data",
*       "error": "not found"
*       "error": "permission denied"
*       "error": "not fount context"
*       "error": "not fount row"
*     }
*/
    ApiDeleteUserPlace (req, res, next) {

    console.log('ApiDeleteUserPlace');

        res.setHeader('Content-Type', 'application/json');
        this.isAuth(req, res).then(user => {
            if(!user){
                res.end(JSON.stringify({ error: CONTEXT_NOT_FOUND }));
                return
            }
            const user_ctx = new UserCtx(user.dataValues)
            return DropUserPlace(req.params.id, user_ctx).then(r => {
                res.end(JSON.stringify(r));
            }).catch(e => next(e))
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },


/**
* @api {get} /api/userplace/all?limit=:limit_row&offset=:offset_row&page=:page_num Получение всех записей Привязка пользователей к объектам
* @apiName GetAllUserPlace
* @apiGroup UserPlace
*
* @apiHeader {String} Token Ключ авторизации полученный при авторизации
* @apiHeaderExample {Header} Token
*     "Token: ad302aca-13fe-45cc-a126-d27821f143fa"
*
* @apiParam {int} limit_row=10   Сколько записей показывать
* @apiParam {int} offset_row=0   Сколько записей отступить от начала
* @apiParam {int} page_num=1  Какую страницу показывать
*
* @apiSuccess {Object[]} data Данные 
* @apiSuccess {Number} data.id 
* @apiSuccess {Number} data.plce_id Объект к которому привязан пользователь\группа
* @apiSuccess {Number} data.user_id Пользователь\группа, который привязан к объекту
* @apiSuccess {Object} meta Метаданные для списка
* @apiSuccess {Number} meta.total Общее кол-во
* @apiSuccess {Number} meta.limit Лимит по которому ограничена выборка
* @apiSuccess {Number} meta.offset Отступ в кол-ве позиций от начала списка
* @apiSuccess {Object[]} pages Данные о страницах для потсраничного вывода
* @apiSuccess {Number} pages.number Номер страинцы
* @apiSuccess {Number} pages.is_active Активная ли текущая страница
*
* @apiExample {js} Example usage:
* fetch('/api/userplace/all?limit=10&offset=0&page=1', {
*   headers: {
*       Token: "ad302aca-13fe-45cc-a126-d27821f143fa"
*   }
* }).then(response => response.json())
*   .then(r => console.log(r));
*
* @apiErrorExample Response (example):
*     HTTP/1.1 200
*     {
*       "error": "permission denied"
*       "error": "not fount context"
*     }
*
*/
    ApiGetAllUserPlace (req, res, next) {

    console.log('ApiGetAllUserPlace');

        res.setHeader('Content-Type', 'application/json');
        this.isAuth(req, res).then(user => {
            if(!user){
                throw new Error(CONTEXT_NOT_FOUND)
            }
            const user_ctx = new UserCtx(user.dataValues)

            if (!req.params.page && req.query.page) {
                req.params.page = req.query.page
            }
            if (!req.params.offset && req.query.offset) {
                req.params.offset = req.query.offset
            }
            if (!req.params.limit && req.query.limit) {
                req.params.limit = req.query.limit
            }
            if (!req.params.includes && req.query.includes) {
                req.params.includes = req.query.includes
            }

            let limit = req.params.limit ? req.params.limit : 10
            let offset = req.params.offset ? req.params.offset : 0
            let page = req.params.page ? req.params.page : 1
            if( !offset ) {
                offset = ( page - 1 ) * limit
            }

            let flags = {
                include : req.params.includes ? req.params.includes : -1
            }

            return GetAllCountUserPlace(user_ctx).then(r_count => {
                return GetAllUserPlace(
                    {
                        limit: Number(limit), 
                        offset:Number(offset)
                    },
                    flags,
                    user_ctx
                ).then(r => {

                    let pages = []
                    let total_page = r_count / limit
                    if(r_count % limit){
                        total_page++
                    }
                    for(let i = 1; i <= total_page; i++){
                        pages.push({number: i, is_active: page==i})
                    }

                    let res_out = []

                    r.forEach(rr => {
                        res_out.push(mapToGetResponse(rr))
                    })

                    res.end(JSON.stringify({
                        data : res_out, 
                        meta : {
                            page, 
                            limit, 
                            offset, 
                            count: r_count
                        },
                        pages
                    })
                );
                }).catch(e => next(e))
            })
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },






















    
/**
* @api {get} /api/userplace/filter?filters_by_id=:filter_id&?filters_by_plce_id=:filter_plce_id&?filters_by_user_id=:filter_user_id&&limit=:limit_row&offset=:offset_row&page=:page_num Получение всех записей по фильтру Привязка пользователей к объектам
* @apiName GetAllFilterUserPlace
* @apiGroup UserPlace
*
* @apiHeader {String} Token Ключ авторизации полученный при авторизации
* @apiHeaderExample {Header} Token
*     "Token: ad302aca-13fe-45cc-a126-d27821f143fa"
*
* @apiParam { int } filter_id Фильтр по полю id
* @apiParam { int } filter_plce_id Фильтр по полю plce_id
* @apiParam { int } filter_user_id Фильтр по полю user_id
* @apiParam {int} limit_row=10   Сколько записей показывать
* @apiParam {int} offset_row=0   Сколько записей отступить от начала
* @apiParam {int} page_num=1  Какую страницу показывать
*
* @apiSuccess {Object[]} data Данные 
* @apiSuccess {Number} data.id 
* @apiSuccess {Number} data.plce_id Объект к которому привязан пользователь\группа
* @apiSuccess {Number} data.user_id Пользователь\группа, который привязан к объекту
* @apiSuccess {Object} meta Метаданные для списка
* @apiSuccess {Number} meta.total Общее кол-во
* @apiSuccess {Number} meta.limit Лимит по которому ограничена выборка
* @apiSuccess {Number} meta.offset Отступ в кол-ве позиций от начала списка
* @apiSuccess {Json} meta.filter Фильтр запроса
* @apiSuccess {Object[]} pages Данные о страницах для потсраничного вывода
* @apiSuccess {Number} pages.number Номер страинцы
* @apiSuccess {Number} pages.is_active Активная ли текущая страница
*
* @apiExample {js} Example usage:
* fetch('/api/userplace/all?limit=10&offset=0&page=1', {
*   headers: {
*       Token: "ad302aca-13fe-45cc-a126-d27821f143fa"
*   }
* }).then(response => response.json())
*   .then(r => console.log(r));
*
* @apiErrorExample Response (example):
*     HTTP/1.1 200
*     {
*       "error": "permission denied"
*       "error": "not fount context"
*     }
*
*/
    ApiGetFilterUserPlace (req, res, next) {

    console.log('ApiGetFilterUserPlace');

        res.setHeader('Content-Type', 'application/json');
        this.isAuth(req, res).then(user => {
            if(!user){
                res.end(JSON.stringify({ error: CONTEXT_NOT_FOUND }));
                return
            }
            const user_ctx = new UserCtx(user.dataValues)

            if (!req.params.page && req.query.page) {
                req.params.page = req.query.page
            }
            if (!req.params.offset && req.query.offset) {
                req.params.offset = req.query.offset
            }
            if (!req.params.limit && req.query.limit) {
                req.params.limit = req.query.limit
            }
            if (!req.params.includes && req.query.includes) {
                req.params.includes = req.query.includes
            }
            
            let limit = req.params.limit ? req.params.limit : 10
            let offset = req.params.offset ? req.params.offset : 0
            let page = req.params.page ? req.params.page : 1
            if( !offset ) {
                offset = ( page - 1 ) * limit
            }

            let filter = {}

            let flags = {
                include : req.params.includes ? req.params.includes : -1
            }

                            if( typeof req.query.filters_by_id != 'undefined' ){
                    filter['id'] = req.query.filters_by_id
                }

                if( typeof req.params.filters_by_id != 'undefined' ){
                    filter['id'] = req.params.filters_by_id
                }
                            if( typeof req.query.filters_by_plce_id != 'undefined' ){
                    filter['plce_id'] = req.query.filters_by_plce_id
                }

                if( typeof req.params.filters_by_plce_id != 'undefined' ){
                    filter['plce_id'] = req.params.filters_by_plce_id
                }
                            if( typeof req.query.filters_by_user_id != 'undefined' ){
                    filter['user_id'] = req.query.filters_by_user_id
                }

                if( typeof req.params.filters_by_user_id != 'undefined' ){
                    filter['user_id'] = req.params.filters_by_user_id
                }
            
            return GetAllByFilterCountUserPlace(filter, user_ctx).then(r_count => {
                return GetAllByFilterUserPlace(filter, {limit: Number(limit) , offset:Number(offset)}, flags, user_ctx).then(r => {

                    let pages = []
                    let total_page = r_count / limit
                    if(r_count % limit){
                        total_page++
                    }
                    for(let i = 1; i <= total_page; i++){
                        pages.push({number: i, is_active: page==i})
                    }

                    let res_out = []

                    r.forEach(rr => {
                        res_out.push(mapToGetResponse(rr))
                    })

                    res.end(JSON.stringify({
                        data : res_out , 
                        meta : {
                            page, 
                            limit, 
                            offset, 
                            count: r_count,
                            filter
                        },
                        pages
                    })
                );
                }).catch(e => next(e))
            })
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },










    

/**
* @api {get} /api/userplace/search?text=:text&limit=:limit_row&offset=:offset_row&page=:page_num Получение всех записей Привязка пользователей к объектам
* @apiName GetAllUserPlace
* @apiGroup UserPlace
*
* @apiHeader {String} Token Ключ авторизации полученный при авторизации
* @apiHeaderExample {Header} Token
*     "Token: ad302aca-13fe-45cc-a126-d27821f143fa"
*
* @apiParam {String} text   Поисковая строка
* @apiParam {int} limit_row=10   Сколько записей показывать
* @apiParam {int} offset_row=0   Сколько записей отступить от начала
* @apiParam {int} page_num=1  Какую страницу показывать
*
* @apiSuccess {Object[]} data Данные 
* @apiSuccess {Number} data.id 
* @apiSuccess {Number} data.plce_id Объект к которому привязан пользователь\группа
* @apiSuccess {Number} data.user_id Пользователь\группа, который привязан к объекту
* @apiSuccess {Object} meta Метаданные для списка
* @apiSuccess {Number} meta.total Общее кол-во
* @apiSuccess {Number} meta.limit Лимит по которому ограничена выборка
* @apiSuccess {Number} meta.offset Отступ в кол-ве позиций от начала списка
* @apiSuccess {Object[]} pages Данные о страницах для потсраничного вывода
* @apiSuccess {Number} pages.number Номер страинцы
* @apiSuccess {Number} pages.is_active Активная ли текущая страница
*
* @apiExample {js} Example usage:
* fetch('/api/userplace/filter?limit=10&offset=0&page=1', {
*   headers: {
*       Token: "ad302aca-13fe-45cc-a126-d27821f143fa"
*   }
* }).then(response => response.json())
*   .then(r => console.log(r));
*
* @apiErrorExample Response (example):
*     HTTP/1.1 200
*     {
*       "error": "permission denied"
*       "error": "not fount context"
*     }
*
*/
    ApiGetSearchUserPlace (req, res, next) {

    console.log('ApiGetSearchUserPlace');

        res.setHeader('Content-Type', 'application/json');
        this.isAuth(req, res).then(user => {
            if(!user){
                res.end(JSON.stringify({ error: CONTEXT_NOT_FOUND }));
                return
            }
            const user_ctx = new UserCtx(user.dataValues)

            if (!req.params.page && req.query.page) {
                req.params.page = req.query.page
            }
            if (!req.params.offset && req.query.offset) {
                req.params.offset = req.query.offset
            }
            if (!req.params.limit && req.query.limit) {
                req.params.limit = req.query.limit
            }
            if (!req.params.text && req.query.text) {
                req.params.text = req.query.text
            }
            if (!req.params.includes && req.query.includes) {
                req.params.includes = req.query.includes
            }

            let limit = req.params.limit ? req.params.limit : 10
            let offset = req.params.offset ? req.params.offset : 0
            let page = req.params.page ? req.params.page : 1
            if( !offset ) {
                offset = ( page - 1 ) * limit
            }

            let f = {limit: Number(limit) , offset:Number(offset)}

            let flags = {
                include : req.params.includes ? req.params.includes : -1
            }

            return GetAllSearchCountUserPlace(req.params.text, user_ctx).then(r_count => {
                return GetAllSearchUserPlace(req.params.text, f , flags, user_ctx).then(r => {

                    let pages = []
                    let total_page = r_count / limit
                    if(r_count % limit){
                        total_page++
                    }
                    for(let i = 1; i <= total_page; i++){
                        pages.push({number: i, is_active: page==i})
                    }

                    let res_out = []

                    r.forEach(rr => {
                        res_out.push(mapToGetResponse(rr))
                    })

                    res.end(JSON.stringify({
                        data : res_out, 
                        meta : {
                            page, 
                            limit, 
                            offset, 
                            count: r_count
                        },
                        pages
                    })
                );
                }).catch(e => next(e))
            })
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },


}