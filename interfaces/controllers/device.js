const { 
    AddDevice, 
    FindByIdDevice, 
    EditDevice, 
    DropDevice, 
    GetAllCountDevice, 
    GetAllSearchDevice, 
    GetAllSearchCountDevice, 
    GetAllByFilterDevice, 
    GetAllByFilterCountDevice, 
    GetAllDevice 
} = require("../../use_cases/Device");

const UserCtx = require("../../entity/User");

const CONTEXT_NOT_FOUND = 'not fount context'

module.exports = {

/**
* @api {put} /api/device/0 Добавление Устройства
* @apiName AddDevice
* @apiGroup Device
*
*
* @apiHeader {String} Token Ключ авторизации полученный при авторизации
* @apiHeaderExample {Header} Token
*     "Token: ad302aca-13fe-45cc-a126-d27821f143fa"
*
* @apiBody {Number} id 
* @apiBody {Number} paren_id Родтельское устройство
* @apiBody {String} name Название
* @apiBody {Object} settings_connections Настройки подключения
* @apiBody {Number} lft Левый казатель
* @apiBody {Number} rgt Правый указатель
* @apiBody {Number} utc Сколько часов по гринфичу
* @apiBody {Number} mod_id Какой мобификатор будет опрашивать прибор
* @apiBody {Object} time_settings Временные интервалы для отображения
* @apiBody {Array} types Какие типы поддерживает
* @apiBody {Number} status Статус устройства
* @apiBody {Boolean} is_exclude Исключен из опроса
*
* @apiSuccess {Number} id 
* @apiSuccess {Number} paren_id Родтельское устройство
* @apiSuccess {String} name Название
* @apiSuccess {Object} settings_connections Настройки подключения
* @apiSuccess {Number} lft Левый казатель
* @apiSuccess {Number} rgt Правый указатель
* @apiSuccess {Number} utc Сколько часов по гринфичу
* @apiSuccess {Number} mod_id Какой мобификатор будет опрашивать прибор
* @apiSuccess {Object} time_settings Временные интервалы для отображения
* @apiSuccess {Array} types Какие типы поддерживает
* @apiSuccess {Number} status Статус устройства
* @apiSuccess {Boolean} is_exclude Исключен из опроса
* @apiErrorExample Response (example):
*     HTTP/1.1 200
*     {
*       "error": "invalid data",
*       "error": "not found"
*       "error": "permission denied"
*       "error": "not fount context"
*       "error": "not fount row"
                        *       "error": "error validate date name",
                    *       "error": "error validate date settings_connections",
                                            *       "error": "error validate date mod_id",
                                                     
*     }
*/
    ApiAddDevice (req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        this.isAuth(req, res).then(user => {
            if(!user){
                res.end(JSON.stringify({ error: CONTEXT_NOT_FOUND }));
                return
            }
            const user_ctx = new UserCtx(user.dataValues)
            return AddDevice(req.body, user_ctx).then(r => {
                res.end(JSON.stringify(r));
            }).catch(e => next(e))
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },

/**
* @api {get} /api/device/:id Получение по идентификатору Устройства
* @apiName iGetByIdDevice
* @apiGroup Device
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
    ApiGetByIdDevice (req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        this.isAuth(req, res).then(user => {
            if(!user){
                res.end(JSON.stringify({ error: CONTEXT_NOT_FOUND }));
                return
            }
            const user_ctx = new UserCtx(user.dataValues)
            return FindByIdDevice(req.params.id, user_ctx).then(r => {
                res.end(JSON.stringify(r));
            }).catch(e => next(e))
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },

/**
* @api {put} /api/device/:id Редактирование записи Устройства
* @apiName EditDevice
* @apiGroup Device
*
*
* @apiHeader {String} Token Ключ авторизации полученный при авторизации
* @apiHeaderExample {Header} Token
*     "Token: ad302aca-13fe-45cc-a126-d27821f143fa"
*
* @apiParam {Number} id Идентификатор записи устройства
* @apiBody {Number} id 
* @apiBody {Number} paren_id Родтельское устройство
* @apiBody {String} name Название
* @apiBody {Object} settings_connections Настройки подключения
* @apiBody {Number} lft Левый казатель
* @apiBody {Number} rgt Правый указатель
* @apiBody {Number} utc Сколько часов по гринфичу
* @apiBody {Number} mod_id Какой мобификатор будет опрашивать прибор
* @apiBody {Object} time_settings Временные интервалы для отображения
* @apiBody {Array} types Какие типы поддерживает
* @apiBody {Number} status Статус устройства
* @apiBody {Boolean} is_exclude Исключен из опроса
*
*
* @apiSuccess {Number} id=true 
* @apiSuccess {Number} paren_id=true Родтельское устройство
* @apiSuccess {String} name Название
* @apiSuccess {Object} settings_connections Настройки подключения
* @apiSuccess {Number} lft=true Левый казатель
* @apiSuccess {Number} rgt=true Правый указатель
* @apiSuccess {Number} utc=true Сколько часов по гринфичу
* @apiSuccess {Number} mod_id=true Какой мобификатор будет опрашивать прибор
* @apiSuccess {Object} time_settings Временные интервалы для отображения
* @apiSuccess {Array} types Какие типы поддерживает
* @apiSuccess {Number} status=true Статус устройства
* @apiSuccess {Boolean} is_exclude Исключен из опроса
* @apiErrorExample Response (example):
*     HTTP/1.1 200
*     {
*       "error": "invalid data",
*       "error": "not found"
*       "error": "permission denied"
*       "error": "not fount context"
*       "error": "not fount row"
                        *       "error": "error validate date name",
                    *       "error": "error validate date settings_connections",
                                            *       "error": "error validate date mod_id",
                                                     
*     }
*/
    ApiEditDevice (req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        this.isAuth(req, res).then(user => {
            if(!user){
                res.end(JSON.stringify({ error: CONTEXT_NOT_FOUND }));
                return
            }
            const user_ctx = new UserCtx(user.dataValues)
            if(!req.body.id){
                return module.exports.ApiAddDevice(req, res, next)
            }
            return EditDevice(req.body, user_ctx).then(r => {
                res.end(JSON.stringify(r));
            }).catch(e => next(e))
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },


/**
* @api {delete} /api/device/:id Удаление записи Устройства
* @apiName DeleteDevice
* @apiGroup Device
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
    ApiDeleteDevice (req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        this.isAuth(req, res).then(user => {
            if(!user){
                res.end(JSON.stringify({ error: CONTEXT_NOT_FOUND }));
                return
            }
            const user_ctx = new UserCtx(user.dataValues)
            return DropDevice(req.params.id, user_ctx).then(r => {
                res.end(JSON.stringify(r));
            }).catch(e => next(e))
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },


/**
* @api {get} /api/device/all?limit=:limit_row&offset=:offset_row&page=:page_num Получение всех записей Устройства
* @apiName GetAllDevice
* @apiGroup Device
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
* @apiSuccess {Number} data.paren_id Родтельское устройство
* @apiSuccess {String} data.name Название
* @apiSuccess {Object} data.settings_connections Настройки подключения
* @apiSuccess {Number} data.lft Левый казатель
* @apiSuccess {Number} data.rgt Правый указатель
* @apiSuccess {Number} data.utc Сколько часов по гринфичу
* @apiSuccess {Number} data.mod_id Какой мобификатор будет опрашивать прибор
* @apiSuccess {Object} data.time_settings Временные интервалы для отображения
* @apiSuccess {Array} data.types Какие типы поддерживает
* @apiSuccess {Number} data.status Статус устройства
* @apiSuccess {Boolean} data.is_exclude Исключен из опроса
* @apiSuccess {Object} meta Метаданные для списка
* @apiSuccess {Number} meta.total Общее кол-во
* @apiSuccess {Number} meta.limit Лимит по которому ограничена выборка
* @apiSuccess {Number} meta.offset Отступ в кол-ве позиций от начала списка
* @apiSuccess {Object[]} pages Данные о страницах для потсраничного вывода
* @apiSuccess {Number} pages.number Номер страинцы
* @apiSuccess {Number} pages.is_active Активная ли текущая страница
*
* @apiExample {js} Example usage:
* fetch('/api/device/all?limit=10&offset=0&page=1', {
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
    ApiGetAllDevice (req, res, next) {
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
            return GetAllCountDevice(user_ctx).then(r_count => {
                return GetAllDevice({limit: Number(limit) , offset:Number(offset)},user_ctx).then(r => {

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
* @api {get} /api/device/filter?filters_by_id=:filter_id&?filters_by_paren_id=:filter_paren_id&?filters_by_name=:filter_name&?filters_by_settings_connections=:filter_settings_connections&?filters_by_lft=:filter_lft&?filters_by_rgt=:filter_rgt&?filters_by_utc=:filter_utc&?filters_by_mod_id=:filter_mod_id&?filters_by_time_settings=:filter_time_settings&?filters_by_types=:filter_types&?filters_by_status=:filter_status&?filters_by_is_exclude=:filter_is_exclude&&limit=:limit_row&offset=:offset_row&page=:page_num Получение всех записей по фильтру Устройства
* @apiName GetAllFilterDevice
* @apiGroup Device
*
* @apiHeader {String} Token Ключ авторизации полученный при авторизации
* @apiHeaderExample {Header} Token
*     "Token: ad302aca-13fe-45cc-a126-d27821f143fa"
*
* @apiParam { int } filter_id Фильтр по полю id
* @apiParam { int } filter_paren_id Фильтр по полю paren_id
* @apiParam { string } filter_name Фильтр по полю name
* @apiParam { json } filter_settings_connections Фильтр по полю settings_connections
* @apiParam { int } filter_lft Фильтр по полю lft
* @apiParam { int } filter_rgt Фильтр по полю rgt
* @apiParam { int } filter_utc Фильтр по полю utc
* @apiParam { int } filter_mod_id Фильтр по полю mod_id
* @apiParam { json } filter_time_settings Фильтр по полю time_settings
* @apiParam { array } filter_types Фильтр по полю types
* @apiParam { int } filter_status Фильтр по полю status
* @apiParam { bool } filter_is_exclude Фильтр по полю is_exclude
* @apiParam {int} limit_row=10   Сколько записей показывать
* @apiParam {int} offset_row=0   Сколько записей отступить от начала
* @apiParam {int} page_num=1  Какую страницу показывать
*
* @apiSuccess {Object[]} data Данные 
* @apiSuccess {Number} data.id 
* @apiSuccess {Number} data.paren_id Родтельское устройство
* @apiSuccess {String} data.name Название
* @apiSuccess {Object} data.settings_connections Настройки подключения
* @apiSuccess {Number} data.lft Левый казатель
* @apiSuccess {Number} data.rgt Правый указатель
* @apiSuccess {Number} data.utc Сколько часов по гринфичу
* @apiSuccess {Number} data.mod_id Какой мобификатор будет опрашивать прибор
* @apiSuccess {Object} data.time_settings Временные интервалы для отображения
* @apiSuccess {Array} data.types Какие типы поддерживает
* @apiSuccess {Number} data.status Статус устройства
* @apiSuccess {Boolean} data.is_exclude Исключен из опроса
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
* fetch('/api/device/all?limit=10&offset=0&page=1', {
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
    ApiGetFilterDevice (req, res, next) {
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
                            if( typeof req.query.filters_by_paren_id != 'undefined' ){
                    filter['paren_id'] = req.query.filters_by_paren_id
                }

                if( typeof req.params.filters_by_paren_id != 'undefined' ){
                    filter['paren_id'] = req.params.filters_by_paren_id
                }
                            if( typeof req.query.filters_by_name != 'undefined' ){
                    filter['name'] = req.query.filters_by_name
                }

                if( typeof req.params.filters_by_name != 'undefined' ){
                    filter['name'] = req.params.filters_by_name
                }
                            if( typeof req.query.filters_by_settings_connections != 'undefined' ){
                    filter['settings_connections'] = req.query.filters_by_settings_connections
                }

                if( typeof req.params.filters_by_settings_connections != 'undefined' ){
                    filter['settings_connections'] = req.params.filters_by_settings_connections
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
                            if( typeof req.query.filters_by_utc != 'undefined' ){
                    filter['utc'] = req.query.filters_by_utc
                }

                if( typeof req.params.filters_by_utc != 'undefined' ){
                    filter['utc'] = req.params.filters_by_utc
                }
                            if( typeof req.query.filters_by_mod_id != 'undefined' ){
                    filter['mod_id'] = req.query.filters_by_mod_id
                }

                if( typeof req.params.filters_by_mod_id != 'undefined' ){
                    filter['mod_id'] = req.params.filters_by_mod_id
                }
                            if( typeof req.query.filters_by_time_settings != 'undefined' ){
                    filter['time_settings'] = req.query.filters_by_time_settings
                }

                if( typeof req.params.filters_by_time_settings != 'undefined' ){
                    filter['time_settings'] = req.params.filters_by_time_settings
                }
                            if( typeof req.query.filters_by_types != 'undefined' ){
                    filter['types'] = req.query.filters_by_types
                }

                if( typeof req.params.filters_by_types != 'undefined' ){
                    filter['types'] = req.params.filters_by_types
                }
                            if( typeof req.query.filters_by_status != 'undefined' ){
                    filter['status'] = req.query.filters_by_status
                }

                if( typeof req.params.filters_by_status != 'undefined' ){
                    filter['status'] = req.params.filters_by_status
                }
                            if( typeof req.query.filters_by_is_exclude != 'undefined' ){
                    filter['is_exclude'] = req.query.filters_by_is_exclude
                }

                if( typeof req.params.filters_by_is_exclude != 'undefined' ){
                    filter['is_exclude'] = req.params.filters_by_is_exclude
                }
            
            return GetAllByFilterCountDevice(filter, user_ctx).then(r_count => {
                return GetAllByFilterDevice(filter, {limit: Number(limit) , offset:Number(offset)}, user_ctx).then(r => {

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
* @api {get} /api/device/search?text=:text&limit=:limit_row&offset=:offset_row&page=:page_num Получение всех записей Устройства
* @apiName GetAllDevice
* @apiGroup Device
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
* @apiSuccess {Number} data.paren_id Родтельское устройство
* @apiSuccess {String} data.name Название
* @apiSuccess {Object} data.settings_connections Настройки подключения
* @apiSuccess {Number} data.lft Левый казатель
* @apiSuccess {Number} data.rgt Правый указатель
* @apiSuccess {Number} data.utc Сколько часов по гринфичу
* @apiSuccess {Number} data.mod_id Какой мобификатор будет опрашивать прибор
* @apiSuccess {Object} data.time_settings Временные интервалы для отображения
* @apiSuccess {Array} data.types Какие типы поддерживает
* @apiSuccess {Number} data.status Статус устройства
* @apiSuccess {Boolean} data.is_exclude Исключен из опроса
* @apiSuccess {Object} meta Метаданные для списка
* @apiSuccess {Number} meta.total Общее кол-во
* @apiSuccess {Number} meta.limit Лимит по которому ограничена выборка
* @apiSuccess {Number} meta.offset Отступ в кол-ве позиций от начала списка
* @apiSuccess {Object[]} pages Данные о страницах для потсраничного вывода
* @apiSuccess {Number} pages.number Номер страинцы
* @apiSuccess {Number} pages.is_active Активная ли текущая страница
*
* @apiExample {js} Example usage:
* fetch('/api/device/filter?limit=10&offset=0&page=1', {
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
    ApiGetSearchDevice (req, res, next) {
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
            return GetAllSerachCountDevice(req.params.text, user_ctx).then(r_count => {
                return GetAllSerachDevice(req.params.text, {limit:Number(limit) , offset:Number(offset)},user_ctx).then(r => {

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