const { 
    AddRole, 
    FindByIdRole, 
    EditRole, 
    DropRole, 
    GetAllCountRole, 
    GetAllSearchRole, 
    GetAllSearchCountRole, 
    GetAllByFilterRole, 
    GetAllByFilterCountRole, 
    GetAllRole 
} = require("../../use_cases/role");

const UserCtx = require("../../entity/user");

const CONTEXT_NOT_FOUND = 'not fount context'

module.exports = {

/**
* @api {put} /api/role/0 Добавление Роли
* @apiName AddRole
* @apiGroup Role
*
*
* @apiHeader {String} Token Ключ авторизации полученный при авторизации
* @apiHeaderExample {Header} Token
*     "Token: ad302aca-13fe-45cc-a126-d27821f143fa"
*
* @apiBody {Number} id 
* @apiBody {String} name Название роли
* @apiBody {String} description Описание роли
*
* @apiSuccess {Number} id 
* @apiSuccess {String} name Название роли
* @apiSuccess {String} description Описание роли
* @apiErrorExample Response (example):
*     HTTP/1.1 200
*     {
*       "error": "invalid data",
*       "error": "not found"
*       "error": "permission denied"
*       "error": "not fount context"
*       "error": "not fount row"
                *       "error": "error validate date name",
                    *       "error": "error validate date description",
                     
*     }
*/
    ApiAddRole (req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        this.isAuth(req, res).then(user => {
            if(!user){
                res.end(JSON.stringify({ error: CONTEXT_NOT_FOUND }));
                return
            }
            const user_ctx = new UserCtx(user.dataValues)
            return AddRole(req.body, user_ctx).then(r => {
                res.end(JSON.stringify(r));
            }).catch(e => next(e))
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },

/**
* @api {get} /api/role/:id Получение по идентификатору Роли
* @apiName iGetByIdRole
* @apiGroup Role
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
    ApiGetByIdRole (req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        this.isAuth(req, res).then(user => {
            if(!user){
                res.end(JSON.stringify({ error: CONTEXT_NOT_FOUND }));
                return
            }
            const user_ctx = new UserCtx(user.dataValues)
            return FindByIdRole(req.params.id, user_ctx).then(r => {
                res.end(JSON.stringify(r));
            }).catch(e => next(e))
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },

/**
* @api {put} /api/role/:id Редактирование записи Роли
* @apiName EditRole
* @apiGroup Role
*
*
* @apiHeader {String} Token Ключ авторизации полученный при авторизации
* @apiHeaderExample {Header} Token
*     "Token: ad302aca-13fe-45cc-a126-d27821f143fa"
*
* @apiParam {Number} id Идентификатор записи устройства
* @apiBody {Number} id 
* @apiBody {String} name Название роли
* @apiBody {String} description Описание роли
*
*
* @apiSuccess {Number} id=true 
* @apiSuccess {String} name Название роли
* @apiSuccess {String} description Описание роли
* @apiErrorExample Response (example):
*     HTTP/1.1 200
*     {
*       "error": "invalid data",
*       "error": "not found"
*       "error": "permission denied"
*       "error": "not fount context"
*       "error": "not fount row"
                *       "error": "error validate date name",
                    *       "error": "error validate date description",
                     
*     }
*/
    ApiEditRole (req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        this.isAuth(req, res).then(user => {
            if(!user){
                res.end(JSON.stringify({ error: CONTEXT_NOT_FOUND }));
                return
            }
            const user_ctx = new UserCtx(user.dataValues)
            if(!req.body.id){
                return module.exports.ApiAddRole(req, res, next)
            }
            return EditRole(req.body, user_ctx).then(r => {
                res.end(JSON.stringify(r));
            }).catch(e => next(e))
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },


/**
* @api {delete} /api/role/:id Удаление записи Роли
* @apiName DeleteRole
* @apiGroup Role
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
    ApiDeleteRole (req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        this.isAuth(req, res).then(user => {
            if(!user){
                res.end(JSON.stringify({ error: CONTEXT_NOT_FOUND }));
                return
            }
            const user_ctx = new UserCtx(user.dataValues)
            return DropRole(req.params.id, user_ctx).then(r => {
                res.end(JSON.stringify(r));
            }).catch(e => next(e))
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },


/**
* @api {get} /api/role/all?limit=:limit_row&offset=:offset_row&page=:page_num Получение всех записей Роли
* @apiName GetAllRole
* @apiGroup Role
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
* @apiSuccess {String} data.name Название роли
* @apiSuccess {String} data.description Описание роли
* @apiSuccess {Object} meta Метаданные для списка
* @apiSuccess {Number} meta.total Общее кол-во
* @apiSuccess {Number} meta.limit Лимит по которому ограничена выборка
* @apiSuccess {Number} meta.offset Отступ в кол-ве позиций от начала списка
* @apiSuccess {Object[]} pages Данные о страницах для потсраничного вывода
* @apiSuccess {Number} pages.number Номер страинцы
* @apiSuccess {Number} pages.is_active Активная ли текущая страница
*
* @apiExample {js} Example usage:
* fetch('/api/role/all?limit=10&offset=0&page=1', {
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
    ApiGetAllRole (req, res, next) {
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

            let limit = req.params.limit ? req.params.limit : 10
            let offset = req.params.offset ? req.params.offset : 0
            let page = req.params.page ? req.params.page : 1
            if( !offset ) {
                offset = ( page - 1 ) * limit
            }
            return GetAllCountRole(user_ctx).then(r_count => {
                return GetAllRole({limit: Number(limit) , offset:Number(offset)},user_ctx).then(r => {

                    pages = []
                    let total_page = r_count / limit
                    if(r_count % limit){
                        total_page++
                    }
                    for(let i = 1; i <= total_page; i++){
                        pages.push({number: i, is_active: page==i})
                    }

                    res.end(JSON.stringify({
                        data : r , 
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
* @api {get} /api/role/filter?filters_by_id=:filter_id&?filters_by_name=:filter_name&?filters_by_description=:filter_description&&limit=:limit_row&offset=:offset_row&page=:page_num Получение всех записей по фильтру Роли
* @apiName GetAllFilterRole
* @apiGroup Role
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
* @apiSuccess {String} data.name Название роли
* @apiSuccess {String} data.description Описание роли
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
* fetch('/api/role/all?limit=10&offset=0&page=1', {
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
    ApiGetFilterRole (req, res, next) {
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
            
            let limit = req.params.limit ? req.params.limit : 10
            let offset = req.params.offset ? req.params.offset : 0
            let page = req.params.page ? req.params.page : 1
            if( !offset ) {
                offset = ( page - 1 ) * limit
            }

            let filter = {}

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
            
            return GetAllByFilterCountRole(filter, user_ctx).then(r_count => {
                return GetAllByFilterRole(filter, {limit: Number(limit) , offset:Number(offset)}, user_ctx).then(r => {

                    pages = []
                    let total_page = r_count / limit
                    if(r_count % limit){
                        total_page++
                    }
                    for(let i = 1; i <= total_page; i++){
                        pages.push({number: i, is_active: page==i})
                    }

                    res.end(JSON.stringify({
                        data : r , 
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
* @api {get} /api/role/search?text=:text&limit=:limit_row&offset=:offset_row&page=:page_num Получение всех записей Роли
* @apiName GetAllRole
* @apiGroup Role
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
* @apiSuccess {String} data.name Название роли
* @apiSuccess {String} data.description Описание роли
* @apiSuccess {Object} meta Метаданные для списка
* @apiSuccess {Number} meta.total Общее кол-во
* @apiSuccess {Number} meta.limit Лимит по которому ограничена выборка
* @apiSuccess {Number} meta.offset Отступ в кол-ве позиций от начала списка
* @apiSuccess {Object[]} pages Данные о страницах для потсраничного вывода
* @apiSuccess {Number} pages.number Номер страинцы
* @apiSuccess {Number} pages.is_active Активная ли текущая страница
*
* @apiExample {js} Example usage:
* fetch('/api/role/filter?limit=10&offset=0&page=1', {
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
    ApiGetSearchRole (req, res, next) {
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

            let limit = req.params.limit ? req.params.limit : 10
            let offset = req.params.offset ? req.params.offset : 0
            let page = req.params.page ? req.params.page : 1
            if( !offset ) {
                offset = ( page - 1 ) * limit
            }
            return GetAllSerachCountRole(req.params.text, user_ctx).then(r_count => {
                return GetAllSerachRole(req.params.text, {limit:Number(limit) , offset:Number(offset)},user_ctx).then(r => {

                    pages = []
                    let total_page = r_count / limit
                    if(r_count % limit){
                        total_page++
                    }
                    for(let i = 1; i <= total_page; i++){
                        pages.push({number: i, is_active: page==i})
                    }

                    res.end(JSON.stringify({
                        data : r , 
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