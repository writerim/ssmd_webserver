const { 
    AddRule, 
    FindByIdRule, 
    EditRule, 
    DropRule, 
    GetAllCountRule, 
    GetAllSearchRule, 
    GetAllSearchCountRule, 
    GetAllByFilterRule, 
    GetAllByFilterCountRule, 
    GetAllRule 
} = require("../../use_cases/rule");

const UserCtx = require("../../entity/user");

const CONTEXT_NOT_FOUND = 'not fount context'
const INAVID_ARGS = 'invalid args'

// маппер в ответ для Гет ответа
const MapToGetResponse = (obj) =>{
    let res_obj = {}
            res_obj = obj;
        return res_obj
}


// маппер в ответ для Add запроса
const MapToAddRequest = (obj) =>{
    let res_obj = {}
            res_obj = obj;
        return res_obj
}

// маппер в ответ для Add ответа
const MapToAddResponse = (obj) =>{
    let res_obj = {}
            res_obj = obj;
        return res_obj
}


// маппер в ответ для Edit запроса
const MapToEditRequest = (obj) =>{
    let res_obj = {}
            res_obj = obj;
        return res_obj
}

// маппер в ответ для Edit ответа
const MapToEditResponse = (obj) =>{
    let res_obj = {}
            res_obj = obj;
        return res_obj
}



// маппер в ответ для Delete запроса
const MapToDeleteRequest = (obj) =>{
    let res_obj = {}
            res_obj = obj;
        return res_obj
}

// маппер в ответ для Delete ответа
const MapToDeleteResponse = (obj) =>{
    let res_obj = {}
            res_obj = obj;
        return res_obj
}


module.exports = {

    MapToGetResponseRule : MapToGetResponse,
    MapToAddRequestRule : MapToAddRequest,
    MapToAddResponseRule : MapToAddResponse,
    MapToEditRequestRule : MapToEditRequest,
    MapToEditResponseRule : MapToEditResponse,
    MapToDeleteRequestRule : MapToDeleteRequest,
    MapToDeleteResponseRule : MapToDeleteResponse,

/**
* @api {put} /api/rule/0 Добавление Права
* @apiName AddRule
* @apiGroup Rule
*
*
* @apiHeader {String} Token Ключ авторизации полученный при авторизации
* @apiHeaderExample {Header} Token
*     "Token: ad302aca-13fe-45cc-a126-d27821f143fa"
*
* @apiBody {Number} id 
* @apiBody {String} name Название права
* @apiBody {String} description Описание права
*
* @apiSuccess {Number} id 
* @apiSuccess {String} name Название права
* @apiSuccess {String} description Описание права
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
    ApiAddRule (req, res, next) {

        console.log('ApiAddRule');

        res.setHeader('Content-Type', 'application/json');
        this.isAuth(req, res).then(user => {
            if(!user){
                res.end(JSON.stringify({ error: CONTEXT_NOT_FOUND }));
                return
            }
            const user_ctx = new UserCtx(user.dataValues)
            return AddRule(MapToAddRequest(req.body), user_ctx).then(r => {
                res.end(JSON.stringify(r));
            }).catch(e => next(e))
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },

/**
* @api {get} /api/rule/:id Получение по идентификатору Права
* @apiName iGetByIdRule
* @apiGroup Rule
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
    ApiGetByIdRule (req, res, next) {

    console.log('ApiGetByIdRule');

        res.setHeader('Content-Type', 'application/json');
        this.isAuth(req, res).then(user => {
            if(!user){
                res.end(JSON.stringify({ error: CONTEXT_NOT_FOUND }));
                return
            }
            const user_ctx = new UserCtx(user.dataValues)
            return FindByIdRule(req.params.id, user_ctx).then(r => {
                res.end(JSON.stringify(MapToGetResponse(r)));
            }).catch(e => next(e))
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },

/**
* @api {put} /api/rule/:id Редактирование записи Права
* @apiName EditRule
* @apiGroup Rule
*
*
* @apiHeader {String} Token Ключ авторизации полученный при авторизации
* @apiHeaderExample {Header} Token
*     "Token: ad302aca-13fe-45cc-a126-d27821f143fa"
*
* @apiParam {Number} id Идентификатор записи устройства
* @apiBody {Number} id 
* @apiBody {String} name Название права
* @apiBody {String} description Описание права
*
*
* @apiSuccess {Number} id=true 
* @apiSuccess {String} name Название права
* @apiSuccess {String} description Описание права
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
    ApiEditRule (req, res, next) {

    console.log('ApiEditRule');

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
            return EditRule(MapToEditRequest(req.body), user_ctx).then(r => {
                res.end(JSON.stringify(MapToEditResponse(r)));
            }).catch(e => next(e))
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },


/**
* @api {delete} /api/rule/:id Удаление записи Права
* @apiName DeleteRule
* @apiGroup Rule
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
    ApiDeleteRule (req, res, next) {

    console.log('ApiDeleteRule');

        res.setHeader('Content-Type', 'application/json');
        this.isAuth(req, res).then(user => {
            if(!user){
                res.end(JSON.stringify({ error: CONTEXT_NOT_FOUND }));
                return
            }
            const user_ctx = new UserCtx(user.dataValues)
            return DropRule(req.params.id, user_ctx).then(r => {
                res.end(JSON.stringify(r));
            }).catch(e => next(e))
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },


/**
* @api {get} /api/rule/all?limit=:limit_row&offset=:offset_row&page=:page_num Получение всех записей Права
* @apiName GetAllRule
* @apiGroup Rule
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
* @apiSuccess {String} data.name Название права
* @apiSuccess {String} data.description Описание права
* @apiSuccess {Object} meta Метаданные для списка
* @apiSuccess {Number} meta.total Общее кол-во
* @apiSuccess {Number} meta.limit Лимит по которому ограничена выборка
* @apiSuccess {Number} meta.offset Отступ в кол-ве позиций от начала списка
* @apiSuccess {Object[]} pages Данные о страницах для потсраничного вывода
* @apiSuccess {Number} pages.number Номер страинцы
* @apiSuccess {Number} pages.is_active Активная ли текущая страница
*
* @apiExample {js} Example usage:
* fetch('/api/rule/all?limit=10&offset=0&page=1', {
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
    ApiGetAllRule (req, res, next) {

    console.log('ApiGetAllRule');

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

            return GetAllCountRule(user_ctx).then(r_count => {
                return GetAllRule(
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
                        res_out.push(MapToGetResponse(rr))
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
* @api {get} /api/rule/filter?filters_by_id=:filter_id&?filters_by_name=:filter_name&?filters_by_description=:filter_description&&limit=:limit_row&offset=:offset_row&page=:page_num Получение всех записей по фильтру Права
* @apiName GetAllFilterRule
* @apiGroup Rule
*
* @apiHeader {String} Token Ключ авторизации полученный при авторизации
* @apiHeaderExample {Header} Token
*     "Token: ad302aca-13fe-45cc-a126-d27821f143fa"
*
* @apiParam { int } filter_id Фильтр по полю id
* @apiParam { string } filter_name Фильтр по полю name
* @apiParam { string } filter_description Фильтр по полю description
* @apiParam {int} limit_row=10   Сколько записей показывать
* @apiParam {int} offset_row=0   Сколько записей отступить от начала
* @apiParam {int} page_num=1  Какую страницу показывать
*
* @apiSuccess {Object[]} data Данные 
* @apiSuccess {Number} data.id 
* @apiSuccess {String} data.name Название права
* @apiSuccess {String} data.description Описание права
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
* fetch('/api/rule/all?limit=10&offset=0&page=1', {
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
    ApiGetFilterRule (req, res, next) {

    console.log('ApiGetFilterRule');

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
                            if( typeof req.query.filters_by_name != 'undefined' ){
                    filter['name'] = req.query.filters_by_name
                }

                if( typeof req.params.filters_by_name != 'undefined' ){
                    filter['name'] = req.params.filters_by_name
                }
                            if( typeof req.query.filters_by_description != 'undefined' ){
                    filter['description'] = req.query.filters_by_description
                }

                if( typeof req.params.filters_by_description != 'undefined' ){
                    filter['description'] = req.params.filters_by_description
                }
            
            return GetAllByFilterCountRule(filter, user_ctx).then(r_count => {
                return GetAllByFilterRule(filter, {limit: Number(limit) , offset:Number(offset)}, flags, user_ctx).then(r => {

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
                        res_out.push(MapToGetResponse(rr))
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
* @api {get} /api/rule/search?text=:text&limit=:limit_row&offset=:offset_row&page=:page_num Получение всех записей Права
* @apiName GetAllRule
* @apiGroup Rule
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
* @apiSuccess {String} data.name Название права
* @apiSuccess {String} data.description Описание права
* @apiSuccess {Object} meta Метаданные для списка
* @apiSuccess {Number} meta.total Общее кол-во
* @apiSuccess {Number} meta.limit Лимит по которому ограничена выборка
* @apiSuccess {Number} meta.offset Отступ в кол-ве позиций от начала списка
* @apiSuccess {Object[]} pages Данные о страницах для потсраничного вывода
* @apiSuccess {Number} pages.number Номер страинцы
* @apiSuccess {Number} pages.is_active Активная ли текущая страница
*
* @apiExample {js} Example usage:
* fetch('/api/rule/filter?limit=10&offset=0&page=1', {
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
    ApiGetSearchRule (req, res, next) {

    console.log('ApiGetSearchRule');

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

            return GetAllSearchCountRule(req.params.text, user_ctx).then(r_count => {
                return GetAllSearchRule(req.params.text, f , flags, user_ctx).then(r => {

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
                        res_out.push(MapToGetResponse(rr))
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


