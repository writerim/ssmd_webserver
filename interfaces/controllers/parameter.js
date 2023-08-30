const { 
    AddParameter, 
    FindByIdParameter, 
    EditParameter, 
    DropParameter, 
    GetAllCountParameter, 
    GetAllSearchParameter, 
    GetAllSearchCountParameter, 
    GetAllByFilterParameter, 
    GetAllByFilterCountParameter, 
    GetAllParameter 
} = require("../../use_cases/parameter");

const UserCtx = require("../../entity/user");

const CONTEXT_NOT_FOUND = 'not fount context'

module.exports = {

/**
* @api {put} /api/parameter/0 Добавление Параметры
* @apiName AddParameter
* @apiGroup Parameter
*
*
* @apiHeader {String} Token Ключ авторизации полученный при авторизации
* @apiHeaderExample {Header} Token
*     "Token: ad302aca-13fe-45cc-a126-d27821f143fa"
*
* @apiBody {Number} id 
* @apiBody {String} ident Иднетификатор
*
* @apiSuccess {Number} id 
* @apiSuccess {String} ident Иднетификатор
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
    ApiAddParameter (req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        this.isAuth(req, res).then(user => {
            if(!user){
                res.end(JSON.stringify({ error: CONTEXT_NOT_FOUND }));
                return
            }
            const user_ctx = new UserCtx(user.dataValues)
            return AddParameter(req.body, user_ctx).then(r => {
                res.end(JSON.stringify(r));
            }).catch(e => next(e))
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },

/**
* @api {get} /api/parameter/:id Получение по идентификатору Параметры
* @apiName iGetByIdParameter
* @apiGroup Parameter
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
    ApiGetByIdParameter (req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        this.isAuth(req, res).then(user => {
            if(!user){
                res.end(JSON.stringify({ error: CONTEXT_NOT_FOUND }));
                return
            }
            const user_ctx = new UserCtx(user.dataValues)
            return FindByIdParameter(req.params.id, user_ctx).then(r => {
                res.end(JSON.stringify(r));
            }).catch(e => next(e))
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },

/**
* @api {put} /api/parameter/:id Редактирование записи Параметры
* @apiName EditParameter
* @apiGroup Parameter
*
*
* @apiHeader {String} Token Ключ авторизации полученный при авторизации
* @apiHeaderExample {Header} Token
*     "Token: ad302aca-13fe-45cc-a126-d27821f143fa"
*
* @apiParam {Number} id Идентификатор записи устройства
* @apiBody {Number} id 
* @apiBody {String} ident Иднетификатор
*
*
* @apiSuccess {Number} id=true 
* @apiSuccess {String} ident Иднетификатор
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
    ApiEditParameter (req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        this.isAuth(req, res).then(user => {
            if(!user){
                res.end(JSON.stringify({ error: CONTEXT_NOT_FOUND }));
                return
            }
            const user_ctx = new UserCtx(user.dataValues)
            if(!req.body.id){
                return module.exports.ApiAddParameter(req, res, next)
            }
            return EditParameter(req.body, user_ctx).then(r => {
                res.end(JSON.stringify(r));
            }).catch(e => next(e))
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },


/**
* @api {delete} /api/parameter/:id Удаление записи Параметры
* @apiName DeleteParameter
* @apiGroup Parameter
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
    ApiDeleteParameter (req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        this.isAuth(req, res).then(user => {
            if(!user){
                res.end(JSON.stringify({ error: CONTEXT_NOT_FOUND }));
                return
            }
            const user_ctx = new UserCtx(user.dataValues)
            return DropParameter(req.params.id, user_ctx).then(r => {
                res.end(JSON.stringify(r));
            }).catch(e => next(e))
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },


/**
* @api {get} /api/parameter/all?limit=:limit_row&offset=:offset_row&page=:page_num Получение всех записей Параметры
* @apiName GetAllParameter
* @apiGroup Parameter
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
* @apiSuccess {String} data.ident Иднетификатор
* @apiSuccess {Object} meta Метаданные для списка
* @apiSuccess {Number} meta.total Общее кол-во
* @apiSuccess {Number} meta.limit Лимит по которому ограничена выборка
* @apiSuccess {Number} meta.offset Отступ в кол-ве позиций от начала списка
* @apiSuccess {Object[]} pages Данные о страницах для потсраничного вывода
* @apiSuccess {Number} pages.number Номер страинцы
* @apiSuccess {Number} pages.is_active Активная ли текущая страница
*
* @apiExample {js} Example usage:
* fetch('/api/parameter/all?limit=10&offset=0&page=1', {
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
    ApiGetAllParameter (req, res, next) {
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
            return GetAllCountParameter(user_ctx).then(r_count => {
                return GetAllParameter({limit: Number(limit) , offset:Number(offset)},user_ctx).then(r => {

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
* @api {get} /api/parameter/filter?filters_by_id=:filter_id&?filters_by_ident=:filter_ident&&limit=:limit_row&offset=:offset_row&page=:page_num Получение всех записей по фильтру Параметры
* @apiName GetAllFilterParameter
* @apiGroup Parameter
*
* @apiHeader {String} Token Ключ авторизации полученный при авторизации
* @apiHeaderExample {Header} Token
*     "Token: ad302aca-13fe-45cc-a126-d27821f143fa"
*
* @apiParam { int } filter_id Фильтр по полю id
* @apiParam { string } filter_ident Фильтр по полю ident
* @apiParam {int} limit_row=10   Сколько записей показывать
* @apiParam {int} offset_row=0   Сколько записей отступить от начала
* @apiParam {int} page_num=1  Какую страницу показывать
*
* @apiSuccess {Object[]} data Данные 
* @apiSuccess {Number} data.id 
* @apiSuccess {String} data.ident Иднетификатор
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
* fetch('/api/parameter/all?limit=10&offset=0&page=1', {
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
    ApiGetFilterParameter (req, res, next) {
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
                            if( typeof req.query.filters_by_ident != 'undefined' ){
                    filter['ident'] = req.query.filters_by_ident
                }

                if( typeof req.params.filters_by_ident != 'undefined' ){
                    filter['ident'] = req.params.filters_by_ident
                }
            
            return GetAllByFilterCountParameter(filter, user_ctx).then(r_count => {
                return GetAllByFilterParameter(filter, {limit: Number(limit) , offset:Number(offset)}, user_ctx).then(r => {

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
* @api {get} /api/parameter/search?text=:text&limit=:limit_row&offset=:offset_row&page=:page_num Получение всех записей Параметры
* @apiName GetAllParameter
* @apiGroup Parameter
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
* @apiSuccess {String} data.ident Иднетификатор
* @apiSuccess {Object} meta Метаданные для списка
* @apiSuccess {Number} meta.total Общее кол-во
* @apiSuccess {Number} meta.limit Лимит по которому ограничена выборка
* @apiSuccess {Number} meta.offset Отступ в кол-ве позиций от начала списка
* @apiSuccess {Object[]} pages Данные о страницах для потсраничного вывода
* @apiSuccess {Number} pages.number Номер страинцы
* @apiSuccess {Number} pages.is_active Активная ли текущая страница
*
* @apiExample {js} Example usage:
* fetch('/api/parameter/filter?limit=10&offset=0&page=1', {
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
    ApiGetSearchParameter (req, res, next) {
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
            return GetAllSerachCountParameter(req.params.text, user_ctx).then(r_count => {
                return GetAllSerachParameter(req.params.text, {limit:Number(limit) , offset:Number(offset)},user_ctx).then(r => {

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