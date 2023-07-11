const { 
    AddUser, 
    FindByIdUser, 
    EditUser, 
    DropUser, 
    GetAllCountUser, 
    GetAllSearchUser, 
    GetAllSearchCountUser, 
    GetAllByFilterUser, 
    GetAllByFilterCountUser, 
    GetAllUser 
} = require("../../use_cases/User");

const UserCtx = require("../../entity/User");

const CONTEXT_NOT_FOUND = 'not fount context'

module.exports = {

/**
* @api {put} /api/user/0 Добавление Пользователи
* @apiName AddUser
* @apiGroup User
*
*
* @apiHeader {String} Token Ключ авторизации полученный при авторизации
* @apiHeaderExample {Header} Token
*     "Token: ad302aca-13fe-45cc-a126-d27821f143fa"
*
* @apiBody {Number} id Идентификатор записи
* @apiBody {String} name Имя пользователя
* @apiBody {String} last_name Фамилия пользователя
* @apiBody {String} login Логин для авторизации
* @apiBody {String} password Пароль для авторизации
* @apiBody {Number} parent_id Родительский элемент
* @apiBody {Boolean} is_group Является ли это группой
* @apiBody {Number} lft Левый указатель
* @apiBody {Number} rgt Правый указатель
* @apiBody {String} token Сесионный ключ авторизации
* @apiBody {Boolean} is_system Системный ли пользователь
*
* @apiSuccess {Number} id Идентификатор записи
* @apiSuccess {String} name Имя пользователя
* @apiSuccess {String} last_name Фамилия пользователя
* @apiSuccess {String} login Логин для авторизации
* @apiSuccess {String} password Пароль для авторизации
* @apiSuccess {Number} parent_id Родительский элемент
* @apiSuccess {Boolean} is_group Является ли это группой
* @apiSuccess {Number} lft Левый указатель
* @apiSuccess {Number} rgt Правый указатель
* @apiSuccess {String} token Сесионный ключ авторизации
* @apiSuccess {Boolean} is_system Системный ли пользователь
* @apiErrorExample Response (example):
*     HTTP/1.1 200
*     {
*       "error": "invalid data",
*       "error": "not found"
*       "error": "permission denied"
*       "error": "not fount context"
*       "error": "not fount row"
                *       "error": "error validate date name",
                            *       "error": "error validate date login",
                    *       "error": "error validate date password",
                            *       "error": "error validate date is_group",
                                                     
*     }
*/
    ApiAddUser (req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        this.isAuth(req, res).then(user => {
            if(!user){
                res.end(JSON.stringify({ error: CONTEXT_NOT_FOUND }));
                return
            }
            const user_ctx = new UserCtx(user.dataValues)
            return AddUser(req.body, user_ctx).then(r => {
                res.end(JSON.stringify(r));
            }).catch(e => next(e))
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },

/**
* @api {get} /api/user/:id Получение по идентификатору Пользователи
* @apiName iGetByIdUser
* @apiGroup User
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
    ApiGetByIdUser (req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        this.isAuth(req, res).then(user => {
            if(!user){
                res.end(JSON.stringify({ error: CONTEXT_NOT_FOUND }));
                return
            }
            const user_ctx = new UserCtx(user.dataValues)
            return FindByIdUser(req.params.id, user_ctx).then(r => {
                res.end(JSON.stringify(r));
            }).catch(e => next(e))
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },

/**
* @api {put} /api/user/:id Редактирование записи Пользователи
* @apiName EditUser
* @apiGroup User
*
*
* @apiHeader {String} Token Ключ авторизации полученный при авторизации
* @apiHeaderExample {Header} Token
*     "Token: ad302aca-13fe-45cc-a126-d27821f143fa"
*
* @apiParam {Number} id Идентификатор записи устройства
* @apiBody {Number} id Идентификатор записи
* @apiBody {String} name Имя пользователя
* @apiBody {String} last_name Фамилия пользователя
* @apiBody {String} login Логин для авторизации
* @apiBody {String} password Пароль для авторизации
* @apiBody {Number} parent_id Родительский элемент
* @apiBody {Boolean} is_group Является ли это группой
* @apiBody {Number} lft Левый указатель
* @apiBody {Number} rgt Правый указатель
* @apiBody {String} token Сесионный ключ авторизации
* @apiBody {Boolean} is_system Системный ли пользователь
*
*
* @apiSuccess {Number} id=true Идентификатор записи
* @apiSuccess {String} name Имя пользователя
* @apiSuccess {String} last_name Фамилия пользователя
* @apiSuccess {String} login Логин для авторизации
* @apiSuccess {String} password Пароль для авторизации
* @apiSuccess {Number} parent_id=true Родительский элемент
* @apiSuccess {Boolean} is_group Является ли это группой
* @apiSuccess {Number} lft=true Левый указатель
* @apiSuccess {Number} rgt=true Правый указатель
* @apiSuccess {String} token Сесионный ключ авторизации
* @apiSuccess {Boolean} is_system Системный ли пользователь
* @apiErrorExample Response (example):
*     HTTP/1.1 200
*     {
*       "error": "invalid data",
*       "error": "not found"
*       "error": "permission denied"
*       "error": "not fount context"
*       "error": "not fount row"
                *       "error": "error validate date name",
                            *       "error": "error validate date login",
                    *       "error": "error validate date password",
                            *       "error": "error validate date is_group",
                                                     
*     }
*/
    ApiEditUser (req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        this.isAuth(req, res).then(user => {
            if(!user){
                res.end(JSON.stringify({ error: CONTEXT_NOT_FOUND }));
                return
            }
            const user_ctx = new UserCtx(user.dataValues)
            if(!req.body.id){
                return module.exports.ApiAddUser(req, res, next)
            }
            return EditUser(req.body, user_ctx).then(r => {
                res.end(JSON.stringify(r));
            }).catch(e => next(e))
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },


/**
* @api {delete} /api/user/:id Удаление записи Пользователи
* @apiName DeleteUser
* @apiGroup User
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
    ApiDeleteUser (req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        this.isAuth(req, res).then(user => {
            if(!user){
                res.end(JSON.stringify({ error: CONTEXT_NOT_FOUND }));
                return
            }
            const user_ctx = new UserCtx(user.dataValues)
            return DropUser(req.params.id, user_ctx).then(r => {
                res.end(JSON.stringify(r));
            }).catch(e => next(e))
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },


/**
* @api {get} /api/user/all?limit=:limit_row&offset=:offset_row&page=:page_num Получение всех записей Пользователи
* @apiName GetAllUser
* @apiGroup User
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
* @apiSuccess {Number} data.id Идентификатор записи
* @apiSuccess {String} data.name Имя пользователя
* @apiSuccess {String} data.last_name Фамилия пользователя
* @apiSuccess {String} data.login Логин для авторизации
* @apiSuccess {String} data.password Пароль для авторизации
* @apiSuccess {Number} data.parent_id Родительский элемент
* @apiSuccess {Boolean} data.is_group Является ли это группой
* @apiSuccess {Number} data.lft Левый указатель
* @apiSuccess {Number} data.rgt Правый указатель
* @apiSuccess {String} data.token Сесионный ключ авторизации
* @apiSuccess {Boolean} data.is_system Системный ли пользователь
* @apiSuccess {Object} meta Метаданные для списка
* @apiSuccess {Number} meta.total Общее кол-во
* @apiSuccess {Number} meta.limit Лимит по которому ограничена выборка
* @apiSuccess {Number} meta.offset Отступ в кол-ве позиций от начала списка
* @apiSuccess {Object[]} pages Данные о страницах для потсраничного вывода
* @apiSuccess {Number} pages.number Номер страинцы
* @apiSuccess {Number} pages.is_active Активная ли текущая страница
*
* @apiExample {js} Example usage:
* fetch('/api/user/all?limit=10&offset=0&page=1', {
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
    ApiGetAllUser (req, res, next) {
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
            return GetAllCountUser(user_ctx).then(r_count => {
                return GetAllUser({limit: Number(limit) , offset:Number(offset)},user_ctx).then(r => {

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
* @api {get} /api/user/filter?filters_by_id=:filter_id&?filters_by_name=:filter_name&?filters_by_last_name=:filter_last_name&?filters_by_login=:filter_login&?filters_by_password=:filter_password&?filters_by_parent_id=:filter_parent_id&?filters_by_is_group=:filter_is_group&?filters_by_lft=:filter_lft&?filters_by_rgt=:filter_rgt&?filters_by_token=:filter_token&?filters_by_is_system=:filter_is_system&&limit=:limit_row&offset=:offset_row&page=:page_num Получение всех записей по фильтру Пользователи
* @apiName GetAllFilterUser
* @apiGroup User
*
* @apiHeader {String} Token Ключ авторизации полученный при авторизации
* @apiHeaderExample {Header} Token
*     "Token: ad302aca-13fe-45cc-a126-d27821f143fa"
*
* @apiParam { int } filter_id Фильтр по полю id
* @apiParam { string } filter_name Фильтр по полю name
* @apiParam { string } filter_last_name Фильтр по полю last_name
* @apiParam { string } filter_login Фильтр по полю login
* @apiParam { string } filter_password Фильтр по полю password
* @apiParam { int } filter_parent_id Фильтр по полю parent_id
* @apiParam { bool } filter_is_group Фильтр по полю is_group
* @apiParam { int } filter_lft Фильтр по полю lft
* @apiParam { int } filter_rgt Фильтр по полю rgt
* @apiParam { string } filter_token Фильтр по полю token
* @apiParam { bool } filter_is_system Фильтр по полю is_system
* @apiParam {int} limit_row=10   Сколько записей показывать
* @apiParam {int} offset_row=0   Сколько записей отступить от начала
* @apiParam {int} page_num=1  Какую страницу показывать
*
* @apiSuccess {Object[]} data Данные 
* @apiSuccess {Number} data.id Идентификатор записи
* @apiSuccess {String} data.name Имя пользователя
* @apiSuccess {String} data.last_name Фамилия пользователя
* @apiSuccess {String} data.login Логин для авторизации
* @apiSuccess {String} data.password Пароль для авторизации
* @apiSuccess {Number} data.parent_id Родительский элемент
* @apiSuccess {Boolean} data.is_group Является ли это группой
* @apiSuccess {Number} data.lft Левый указатель
* @apiSuccess {Number} data.rgt Правый указатель
* @apiSuccess {String} data.token Сесионный ключ авторизации
* @apiSuccess {Boolean} data.is_system Системный ли пользователь
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
* fetch('/api/user/all?limit=10&offset=0&page=1', {
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
    ApiGetFilterUser (req, res, next) {
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
                            if( typeof req.query.filters_by_last_name != 'undefined' ){
                    filter['last_name'] = req.query.filters_by_last_name
                }

                if( typeof req.params.filters_by_last_name != 'undefined' ){
                    filter['last_name'] = req.params.filters_by_last_name
                }
                            if( typeof req.query.filters_by_login != 'undefined' ){
                    filter['login'] = req.query.filters_by_login
                }

                if( typeof req.params.filters_by_login != 'undefined' ){
                    filter['login'] = req.params.filters_by_login
                }
                            if( typeof req.query.filters_by_password != 'undefined' ){
                    filter['password'] = req.query.filters_by_password
                }

                if( typeof req.params.filters_by_password != 'undefined' ){
                    filter['password'] = req.params.filters_by_password
                }
                            if( typeof req.query.filters_by_parent_id != 'undefined' ){
                    filter['parent_id'] = req.query.filters_by_parent_id
                }

                if( typeof req.params.filters_by_parent_id != 'undefined' ){
                    filter['parent_id'] = req.params.filters_by_parent_id
                }
                            if( typeof req.query.filters_by_is_group != 'undefined' ){
                    filter['is_group'] = req.query.filters_by_is_group
                }

                if( typeof req.params.filters_by_is_group != 'undefined' ){
                    filter['is_group'] = req.params.filters_by_is_group
                }
                            if( typeof req.query.filters_by_lft != 'undefined' ){
                    filter['lft'] = req.query.filters_by_lft
                }

                if( typeof req.params.filters_by_lft != 'undefined' ){
                    filter['lft'] = req.params.filters_by_lft
                }
                            if( typeof req.query.filters_by_rgt != 'undefined' ){
                    filter['rgt'] = req.query.filters_by_rgt
                }

                if( typeof req.params.filters_by_rgt != 'undefined' ){
                    filter['rgt'] = req.params.filters_by_rgt
                }
                            if( typeof req.query.filters_by_token != 'undefined' ){
                    filter['token'] = req.query.filters_by_token
                }

                if( typeof req.params.filters_by_token != 'undefined' ){
                    filter['token'] = req.params.filters_by_token
                }
                            if( typeof req.query.filters_by_is_system != 'undefined' ){
                    filter['is_system'] = req.query.filters_by_is_system
                }

                if( typeof req.params.filters_by_is_system != 'undefined' ){
                    filter['is_system'] = req.params.filters_by_is_system
                }
            
            return GetAllByFilterCountUser(filter, user_ctx).then(r_count => {
                return GetAllByFilterUser(filter, {limit: Number(limit) , offset:Number(offset)}, user_ctx).then(r => {

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
* @api {get} /api/user/search?text=:text&limit=:limit_row&offset=:offset_row&page=:page_num Получение всех записей Пользователи
* @apiName GetAllUser
* @apiGroup User
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
* @apiSuccess {Number} data.id Идентификатор записи
* @apiSuccess {String} data.name Имя пользователя
* @apiSuccess {String} data.last_name Фамилия пользователя
* @apiSuccess {String} data.login Логин для авторизации
* @apiSuccess {String} data.password Пароль для авторизации
* @apiSuccess {Number} data.parent_id Родительский элемент
* @apiSuccess {Boolean} data.is_group Является ли это группой
* @apiSuccess {Number} data.lft Левый указатель
* @apiSuccess {Number} data.rgt Правый указатель
* @apiSuccess {String} data.token Сесионный ключ авторизации
* @apiSuccess {Boolean} data.is_system Системный ли пользователь
* @apiSuccess {Object} meta Метаданные для списка
* @apiSuccess {Number} meta.total Общее кол-во
* @apiSuccess {Number} meta.limit Лимит по которому ограничена выборка
* @apiSuccess {Number} meta.offset Отступ в кол-ве позиций от начала списка
* @apiSuccess {Object[]} pages Данные о страницах для потсраничного вывода
* @apiSuccess {Number} pages.number Номер страинцы
* @apiSuccess {Number} pages.is_active Активная ли текущая страница
*
* @apiExample {js} Example usage:
* fetch('/api/user/filter?limit=10&offset=0&page=1', {
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
    ApiGetSearchUser (req, res, next) {
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
            return GetAllSerachCountUser(req.params.text, user_ctx).then(r_count => {
                return GetAllSerachUser(req.params.text, {limit:Number(limit) , offset:Number(offset)},user_ctx).then(r => {

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