const { 
    AddDevice2Device, 
    FindByIdDevice2Device, 
    EditDevice2Device, 
    DropDevice2Device, 
    GetAllCountDevice2Device, 
    GetAllSearchDevice2Device, 
    GetAllSearchCountDevice2Device, 
    GetAllByFilterDevice2Device, 
    GetAllByFilterCountDevice2Device, 
    GetAllDevice2Device 
} = require("../../use_cases/device2device");

const UserCtx = require("../../entity/user");

const CONTEXT_NOT_FOUND = 'not fount context'

module.exports = {

/**
* @api {put} /api/device2device/0 Добавление Связь устройств
* @apiName AddDevice2Device
* @apiGroup Device2Device
*
*
* @apiHeader {String} Token Ключ авторизации полученный при авторизации
* @apiHeaderExample {Header} Token
*     "Token: ad302aca-13fe-45cc-a126-d27821f143fa"
*
* @apiBody {Number} id 
* @apiBody {Number} device_id Устройство на котром будем показывать данные другого устройства
* @apiBody {Number} parameter_id Параметр на котром будем показывать данные другого устройства
* @apiBody {Number} device_donor_id Устройство с котром будем показывать данные другого устройства
* @apiBody {Number} parameter_donor_id Параметр с котром будем показывать данные другого устройства
*
* @apiSuccess {Number} id 
* @apiSuccess {Number} device_id Устройство на котром будем показывать данные другого устройства
* @apiSuccess {Number} parameter_id Параметр на котром будем показывать данные другого устройства
* @apiSuccess {Number} device_donor_id Устройство с котром будем показывать данные другого устройства
* @apiSuccess {Number} parameter_donor_id Параметр с котром будем показывать данные другого устройства
* @apiErrorExample Response (example):
*     HTTP/1.1 200
*     {
*       "error": "invalid data",
*       "error": "not found"
*       "error": "permission denied"
*       "error": "not fount context"
*       "error": "not fount row"
                *       "error": "error validate date device_id",
                    *       "error": "error validate date parameter_id",
                    *       "error": "error validate date device_donor_id",
                    *       "error": "error validate date parameter_donor_id",
                     
*     }
*/
    ApiAddDevice2Device (req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        this.isAuth(req, res).then(user => {
            if(!user){
                res.end(JSON.stringify({ error: CONTEXT_NOT_FOUND }));
                return
            }
            const user_ctx = new UserCtx(user.dataValues)
            return AddDevice2Device(req.body, user_ctx).then(r => {
                res.end(JSON.stringify(r));
            }).catch(e => next(e))
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },

/**
* @api {get} /api/device2device/:id Получение по идентификатору Связь устройств
* @apiName iGetByIdDevice2Device
* @apiGroup Device2Device
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
    ApiGetByIdDevice2Device (req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        this.isAuth(req, res).then(user => {
            if(!user){
                res.end(JSON.stringify({ error: CONTEXT_NOT_FOUND }));
                return
            }
            const user_ctx = new UserCtx(user.dataValues)
            return FindByIdDevice2Device(req.params.id, user_ctx).then(r => {
                res.end(JSON.stringify(r));
            }).catch(e => next(e))
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },

/**
* @api {put} /api/device2device/:id Редактирование записи Связь устройств
* @apiName EditDevice2Device
* @apiGroup Device2Device
*
*
* @apiHeader {String} Token Ключ авторизации полученный при авторизации
* @apiHeaderExample {Header} Token
*     "Token: ad302aca-13fe-45cc-a126-d27821f143fa"
*
* @apiParam {Number} id Идентификатор записи устройства
* @apiBody {Number} id 
* @apiBody {Number} device_id Устройство на котром будем показывать данные другого устройства
* @apiBody {Number} parameter_id Параметр на котром будем показывать данные другого устройства
* @apiBody {Number} device_donor_id Устройство с котром будем показывать данные другого устройства
* @apiBody {Number} parameter_donor_id Параметр с котром будем показывать данные другого устройства
*
*
* @apiSuccess {Number} id=true 
* @apiSuccess {Number} device_id=true Устройство на котром будем показывать данные другого устройства
* @apiSuccess {Number} parameter_id=true Параметр на котром будем показывать данные другого устройства
* @apiSuccess {Number} device_donor_id=true Устройство с котром будем показывать данные другого устройства
* @apiSuccess {Number} parameter_donor_id=true Параметр с котром будем показывать данные другого устройства
* @apiErrorExample Response (example):
*     HTTP/1.1 200
*     {
*       "error": "invalid data",
*       "error": "not found"
*       "error": "permission denied"
*       "error": "not fount context"
*       "error": "not fount row"
                *       "error": "error validate date device_id",
                    *       "error": "error validate date parameter_id",
                    *       "error": "error validate date device_donor_id",
                    *       "error": "error validate date parameter_donor_id",
                     
*     }
*/
    ApiEditDevice2Device (req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        this.isAuth(req, res).then(user => {
            if(!user){
                res.end(JSON.stringify({ error: CONTEXT_NOT_FOUND }));
                return
            }
            const user_ctx = new UserCtx(user.dataValues)
            if(!req.body.id){
                return module.exports.ApiAddDevice2Device(req, res, next)
            }
            return EditDevice2Device(req.body, user_ctx).then(r => {
                res.end(JSON.stringify(r));
            }).catch(e => next(e))
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },


/**
* @api {delete} /api/device2device/:id Удаление записи Связь устройств
* @apiName DeleteDevice2Device
* @apiGroup Device2Device
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
    ApiDeleteDevice2Device (req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        this.isAuth(req, res).then(user => {
            if(!user){
                res.end(JSON.stringify({ error: CONTEXT_NOT_FOUND }));
                return
            }
            const user_ctx = new UserCtx(user.dataValues)
            return DropDevice2Device(req.params.id, user_ctx).then(r => {
                res.end(JSON.stringify(r));
            }).catch(e => next(e))
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },


/**
* @api {get} /api/device2device/all?limit=:limit_row&offset=:offset_row&page=:page_num Получение всех записей Связь устройств
* @apiName GetAllDevice2Device
* @apiGroup Device2Device
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
* @apiSuccess {Number} data.device_id Устройство на котром будем показывать данные другого устройства
* @apiSuccess {Number} data.parameter_id Параметр на котром будем показывать данные другого устройства
* @apiSuccess {Number} data.device_donor_id Устройство с котром будем показывать данные другого устройства
* @apiSuccess {Number} data.parameter_donor_id Параметр с котром будем показывать данные другого устройства
* @apiSuccess {Object} meta Метаданные для списка
* @apiSuccess {Number} meta.total Общее кол-во
* @apiSuccess {Number} meta.limit Лимит по которому ограничена выборка
* @apiSuccess {Number} meta.offset Отступ в кол-ве позиций от начала списка
* @apiSuccess {Object[]} pages Данные о страницах для потсраничного вывода
* @apiSuccess {Number} pages.number Номер страинцы
* @apiSuccess {Number} pages.is_active Активная ли текущая страница
*
* @apiExample {js} Example usage:
* fetch('/api/device2device/all?limit=10&offset=0&page=1', {
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
    ApiGetAllDevice2Device (req, res, next) {
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
            return GetAllCountDevice2Device(user_ctx).then(r_count => {
                return GetAllDevice2Device({limit: Number(limit) , offset:Number(offset)},user_ctx).then(r => {

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
* @api {get} /api/device2device/filter?filters_by_id=:filter_id&?filters_by_device_id=:filter_device_id&?filters_by_parameter_id=:filter_parameter_id&?filters_by_device_donor_id=:filter_device_donor_id&?filters_by_parameter_donor_id=:filter_parameter_donor_id&&limit=:limit_row&offset=:offset_row&page=:page_num Получение всех записей по фильтру Связь устройств
* @apiName GetAllFilterDevice2Device
* @apiGroup Device2Device
*
* @apiHeader {String} Token Ключ авторизации полученный при авторизации
* @apiHeaderExample {Header} Token
*     "Token: ad302aca-13fe-45cc-a126-d27821f143fa"
*
* @apiParam { int } filter_id Фильтр по полю id
* @apiParam { int } filter_device_id Фильтр по полю device_id
* @apiParam { int } filter_parameter_id Фильтр по полю parameter_id
* @apiParam { int } filter_device_donor_id Фильтр по полю device_donor_id
* @apiParam { int } filter_parameter_donor_id Фильтр по полю parameter_donor_id
* @apiParam {int} limit_row=10   Сколько записей показывать
* @apiParam {int} offset_row=0   Сколько записей отступить от начала
* @apiParam {int} page_num=1  Какую страницу показывать
*
* @apiSuccess {Object[]} data Данные 
* @apiSuccess {Number} data.id 
* @apiSuccess {Number} data.device_id Устройство на котром будем показывать данные другого устройства
* @apiSuccess {Number} data.parameter_id Параметр на котром будем показывать данные другого устройства
* @apiSuccess {Number} data.device_donor_id Устройство с котром будем показывать данные другого устройства
* @apiSuccess {Number} data.parameter_donor_id Параметр с котром будем показывать данные другого устройства
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
* fetch('/api/device2device/all?limit=10&offset=0&page=1', {
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
    ApiGetFilterDevice2Device (req, res, next) {
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
                            if( typeof req.query.filters_by_device_id != 'undefined' ){
                    filter['device_id'] = req.query.filters_by_device_id
                }

                if( typeof req.params.filters_by_device_id != 'undefined' ){
                    filter['device_id'] = req.params.filters_by_device_id
                }
                            if( typeof req.query.filters_by_parameter_id != 'undefined' ){
                    filter['parameter_id'] = req.query.filters_by_parameter_id
                }

                if( typeof req.params.filters_by_parameter_id != 'undefined' ){
                    filter['parameter_id'] = req.params.filters_by_parameter_id
                }
                            if( typeof req.query.filters_by_device_donor_id != 'undefined' ){
                    filter['device_donor_id'] = req.query.filters_by_device_donor_id
                }

                if( typeof req.params.filters_by_device_donor_id != 'undefined' ){
                    filter['device_donor_id'] = req.params.filters_by_device_donor_id
                }
                            if( typeof req.query.filters_by_parameter_donor_id != 'undefined' ){
                    filter['parameter_donor_id'] = req.query.filters_by_parameter_donor_id
                }

                if( typeof req.params.filters_by_parameter_donor_id != 'undefined' ){
                    filter['parameter_donor_id'] = req.params.filters_by_parameter_donor_id
                }
            
            return GetAllByFilterCountDevice2Device(filter, user_ctx).then(r_count => {
                return GetAllByFilterDevice2Device(filter, {limit: Number(limit) , offset:Number(offset)}, user_ctx).then(r => {

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
* @api {get} /api/device2device/search?text=:text&limit=:limit_row&offset=:offset_row&page=:page_num Получение всех записей Связь устройств
* @apiName GetAllDevice2Device
* @apiGroup Device2Device
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
* @apiSuccess {Number} data.device_id Устройство на котром будем показывать данные другого устройства
* @apiSuccess {Number} data.parameter_id Параметр на котром будем показывать данные другого устройства
* @apiSuccess {Number} data.device_donor_id Устройство с котром будем показывать данные другого устройства
* @apiSuccess {Number} data.parameter_donor_id Параметр с котром будем показывать данные другого устройства
* @apiSuccess {Object} meta Метаданные для списка
* @apiSuccess {Number} meta.total Общее кол-во
* @apiSuccess {Number} meta.limit Лимит по которому ограничена выборка
* @apiSuccess {Number} meta.offset Отступ в кол-ве позиций от начала списка
* @apiSuccess {Object[]} pages Данные о страницах для потсраничного вывода
* @apiSuccess {Number} pages.number Номер страинцы
* @apiSuccess {Number} pages.is_active Активная ли текущая страница
*
* @apiExample {js} Example usage:
* fetch('/api/device2device/filter?limit=10&offset=0&page=1', {
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
    ApiGetSearchDevice2Device (req, res, next) {
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
            return GetAllSerachCountDevice2Device(req.params.text, user_ctx).then(r_count => {
                return GetAllSerachDevice2Device(req.params.text, {limit:Number(limit) , offset:Number(offset)},user_ctx).then(r => {

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