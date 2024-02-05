const { 
    AddMod, 
    FindByIdMod, 
    EditMod, 
    DropMod, 
    GetAllCountMod, 
    GetAllSearchMod, 
    GetAllSearchCountMod, 
    GetAllByFilterMod, 
    GetAllByFilterCountMod, 
    GetAllMod 
} = require("../../use_cases/mod");

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

    MapToGetResponseMod : MapToGetResponse,
    MapToAddRequestMod : MapToAddRequest,
    MapToAddResponseMod : MapToAddResponse,
    MapToEditRequestMod : MapToEditRequest,
    MapToEditResponseMod : MapToEditResponse,
    MapToDeleteRequestMod : MapToDeleteRequest,
    MapToDeleteResponseMod : MapToDeleteResponse,

/**
* @api {put} /api/mod/0 Добавление Модели
* @apiName AddMod
* @apiGroup Mod
*
*
* @apiHeader {String} Token Ключ авторизации полученный при авторизации
* @apiHeaderExample {Header} Token
*     "Token: ad302aca-13fe-45cc-a126-d27821f143fa"
*
* @apiBody {Number} id 
* @apiBody {String} ident Идентификатор
* @apiBody {String} version Версия бибилиотеки
* @apiBody {String} manufactures Производитель
* @apiBody {String} mark марка
* @apiBody {String} model модель с которой работают
* @apiBody {String} series Уникальная серия
* @apiBody {String} sowt_version Уникальная версия софта
* @apiBody {Array} types_device Какие типы данных может собирать
* @apiBody {Array} cron_parameters Параметры автоматом собираемые системой
* @apiBody {Array} commands Какие поддерживает команжы
* @apiBody {Array} parameters Какие параметры можно прочитать
* @apiBody {Array} time_settings Настройки времени опроса
* @apiBody {Array} device_parameters Какие параметры нужны для работы опросника
*
* @apiSuccess {Number} id 
* @apiSuccess {String} ident Идентификатор
* @apiSuccess {String} version Версия бибилиотеки
* @apiSuccess {String} manufactures Производитель
* @apiSuccess {String} mark марка
* @apiSuccess {String} model модель с которой работают
* @apiSuccess {String} series Уникальная серия
* @apiSuccess {String} sowt_version Уникальная версия софта
* @apiSuccess {Array} types_device Какие типы данных может собирать
* @apiSuccess {Array} cron_parameters Параметры автоматом собираемые системой
* @apiSuccess {Array} commands Какие поддерживает команжы
* @apiSuccess {Array} parameters Какие параметры можно прочитать
* @apiSuccess {Array} time_settings Настройки времени опроса
* @apiSuccess {Array} device_parameters Какие параметры нужны для работы опросника
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
    ApiAddMod (req, res, next) {

        console.log('ApiAddMod');

        res.setHeader('Content-Type', 'application/json');
        this.isAuth(req, res).then(user => {
            if(!user){
                res.end(JSON.stringify({ error: CONTEXT_NOT_FOUND }));
                return
            }
            const user_ctx = new UserCtx(user.dataValues)
            return AddMod(MapToAddRequest(req.body), user_ctx).then(r => {
                res.end(JSON.stringify(r));
            }).catch(e => next(e))
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },

/**
* @api {get} /api/mod/:id Получение по идентификатору Модели
* @apiName iGetByIdMod
* @apiGroup Mod
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
    ApiGetByIdMod (req, res, next) {

    console.log('ApiGetByIdMod');

        res.setHeader('Content-Type', 'application/json');
        this.isAuth(req, res).then(user => {
            if(!user){
                res.end(JSON.stringify({ error: CONTEXT_NOT_FOUND }));
                return
            }
            const user_ctx = new UserCtx(user.dataValues)
            return FindByIdMod(req.params.id, user_ctx).then(r => {
                res.end(JSON.stringify(MapToGetResponse(r)));
            }).catch(e => next(e))
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },

/**
* @api {put} /api/mod/:id Редактирование записи Модели
* @apiName EditMod
* @apiGroup Mod
*
*
* @apiHeader {String} Token Ключ авторизации полученный при авторизации
* @apiHeaderExample {Header} Token
*     "Token: ad302aca-13fe-45cc-a126-d27821f143fa"
*
* @apiParam {Number} id Идентификатор записи устройства
* @apiBody {Number} id 
* @apiBody {String} ident Идентификатор
* @apiBody {String} version Версия бибилиотеки
* @apiBody {String} manufactures Производитель
* @apiBody {String} mark марка
* @apiBody {String} model модель с которой работают
* @apiBody {String} series Уникальная серия
* @apiBody {String} sowt_version Уникальная версия софта
* @apiBody {Array} types_device Какие типы данных может собирать
* @apiBody {Array} cron_parameters Параметры автоматом собираемые системой
* @apiBody {Array} commands Какие поддерживает команжы
* @apiBody {Array} parameters Какие параметры можно прочитать
* @apiBody {Array} time_settings Настройки времени опроса
* @apiBody {Array} device_parameters Какие параметры нужны для работы опросника
*
*
* @apiSuccess {Number} id=true 
* @apiSuccess {String} ident Идентификатор
* @apiSuccess {String} version Версия бибилиотеки
* @apiSuccess {String} manufactures Производитель
* @apiSuccess {String} mark марка
* @apiSuccess {String} model модель с которой работают
* @apiSuccess {String} series Уникальная серия
* @apiSuccess {String} sowt_version Уникальная версия софта
* @apiSuccess {Array} types_device Какие типы данных может собирать
* @apiSuccess {Array} cron_parameters Параметры автоматом собираемые системой
* @apiSuccess {Array} commands Какие поддерживает команжы
* @apiSuccess {Array} parameters Какие параметры можно прочитать
* @apiSuccess {Array} time_settings Настройки времени опроса
* @apiSuccess {Array} device_parameters Какие параметры нужны для работы опросника
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
    ApiEditMod (req, res, next) {

    console.log('ApiEditMod');

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
            return EditMod(MapToEditRequest(req.body), user_ctx).then(r => {
                res.end(JSON.stringify(MapToEditResponse(r)));
            }).catch(e => next(e))
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },


/**
* @api {delete} /api/mod/:id Удаление записи Модели
* @apiName DeleteMod
* @apiGroup Mod
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
    ApiDeleteMod (req, res, next) {

    console.log('ApiDeleteMod');

        res.setHeader('Content-Type', 'application/json');
        this.isAuth(req, res).then(user => {
            if(!user){
                res.end(JSON.stringify({ error: CONTEXT_NOT_FOUND }));
                return
            }
            const user_ctx = new UserCtx(user.dataValues)
            return DropMod(req.params.id, user_ctx).then(r => {
                res.end(JSON.stringify(r));
            }).catch(e => next(e))
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },


/**
* @api {get} /api/mod/all?limit=:limit_row&offset=:offset_row&page=:page_num Получение всех записей Модели
* @apiName GetAllMod
* @apiGroup Mod
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
* @apiSuccess {String} data.ident Идентификатор
* @apiSuccess {String} data.version Версия бибилиотеки
* @apiSuccess {String} data.manufactures Производитель
* @apiSuccess {String} data.mark марка
* @apiSuccess {String} data.model модель с которой работают
* @apiSuccess {String} data.series Уникальная серия
* @apiSuccess {String} data.sowt_version Уникальная версия софта
* @apiSuccess {Array} data.types_device Какие типы данных может собирать
* @apiSuccess {Array} data.cron_parameters Параметры автоматом собираемые системой
* @apiSuccess {Array} data.commands Какие поддерживает команжы
* @apiSuccess {Array} data.parameters Какие параметры можно прочитать
* @apiSuccess {Array} data.time_settings Настройки времени опроса
* @apiSuccess {Array} data.device_parameters Какие параметры нужны для работы опросника
* @apiSuccess {Object} meta Метаданные для списка
* @apiSuccess {Number} meta.total Общее кол-во
* @apiSuccess {Number} meta.limit Лимит по которому ограничена выборка
* @apiSuccess {Number} meta.offset Отступ в кол-ве позиций от начала списка
* @apiSuccess {Object[]} pages Данные о страницах для потсраничного вывода
* @apiSuccess {Number} pages.number Номер страинцы
* @apiSuccess {Number} pages.is_active Активная ли текущая страница
*
* @apiExample {js} Example usage:
* fetch('/api/mod/all?limit=10&offset=0&page=1', {
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
    ApiGetAllMod (req, res, next) {

    console.log('ApiGetAllMod');

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

            return GetAllCountMod(user_ctx).then(r_count => {
                return GetAllMod(
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
* @api {get} /api/mod/filter?filters_by_id=:filter_id&?filters_by_ident=:filter_ident&?filters_by_version=:filter_version&?filters_by_manufactures=:filter_manufactures&?filters_by_mark=:filter_mark&?filters_by_model=:filter_model&?filters_by_series=:filter_series&?filters_by_sowt_version=:filter_sowt_version&?filters_by_types_device=:filter_types_device&?filters_by_cron_parameters=:filter_cron_parameters&?filters_by_commands=:filter_commands&?filters_by_parameters=:filter_parameters&?filters_by_time_settings=:filter_time_settings&?filters_by_device_parameters=:filter_device_parameters&&limit=:limit_row&offset=:offset_row&page=:page_num Получение всех записей по фильтру Модели
* @apiName GetAllFilterMod
* @apiGroup Mod
*
* @apiHeader {String} Token Ключ авторизации полученный при авторизации
* @apiHeaderExample {Header} Token
*     "Token: ad302aca-13fe-45cc-a126-d27821f143fa"
*
* @apiParam { int } filter_id Фильтр по полю id
* @apiParam { string } filter_ident Фильтр по полю ident
* @apiParam { string } filter_version Фильтр по полю version
* @apiParam { string } filter_manufactures Фильтр по полю manufactures
* @apiParam { string } filter_mark Фильтр по полю mark
* @apiParam { string } filter_model Фильтр по полю model
* @apiParam { string } filter_series Фильтр по полю series
* @apiParam { string } filter_sowt_version Фильтр по полю sowt_version
* @apiParam { array } filter_types_device Фильтр по полю types_device
* @apiParam { array } filter_cron_parameters Фильтр по полю cron_parameters
* @apiParam { array } filter_commands Фильтр по полю commands
* @apiParam { array } filter_parameters Фильтр по полю parameters
* @apiParam { array } filter_time_settings Фильтр по полю time_settings
* @apiParam { array } filter_device_parameters Фильтр по полю device_parameters
* @apiParam {int} limit_row=10   Сколько записей показывать
* @apiParam {int} offset_row=0   Сколько записей отступить от начала
* @apiParam {int} page_num=1  Какую страницу показывать
*
* @apiSuccess {Object[]} data Данные 
* @apiSuccess {Number} data.id 
* @apiSuccess {String} data.ident Идентификатор
* @apiSuccess {String} data.version Версия бибилиотеки
* @apiSuccess {String} data.manufactures Производитель
* @apiSuccess {String} data.mark марка
* @apiSuccess {String} data.model модель с которой работают
* @apiSuccess {String} data.series Уникальная серия
* @apiSuccess {String} data.sowt_version Уникальная версия софта
* @apiSuccess {Array} data.types_device Какие типы данных может собирать
* @apiSuccess {Array} data.cron_parameters Параметры автоматом собираемые системой
* @apiSuccess {Array} data.commands Какие поддерживает команжы
* @apiSuccess {Array} data.parameters Какие параметры можно прочитать
* @apiSuccess {Array} data.time_settings Настройки времени опроса
* @apiSuccess {Array} data.device_parameters Какие параметры нужны для работы опросника
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
* fetch('/api/mod/all?limit=10&offset=0&page=1', {
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
    ApiGetFilterMod (req, res, next) {

    console.log('ApiGetFilterMod');

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
                            if( typeof req.query.filters_by_ident != 'undefined' ){
                    filter['ident'] = req.query.filters_by_ident
                }

                if( typeof req.params.filters_by_ident != 'undefined' ){
                    filter['ident'] = req.params.filters_by_ident
                }
                            if( typeof req.query.filters_by_version != 'undefined' ){
                    filter['version'] = req.query.filters_by_version
                }

                if( typeof req.params.filters_by_version != 'undefined' ){
                    filter['version'] = req.params.filters_by_version
                }
                            if( typeof req.query.filters_by_manufactures != 'undefined' ){
                    filter['manufactures'] = req.query.filters_by_manufactures
                }

                if( typeof req.params.filters_by_manufactures != 'undefined' ){
                    filter['manufactures'] = req.params.filters_by_manufactures
                }
                            if( typeof req.query.filters_by_mark != 'undefined' ){
                    filter['mark'] = req.query.filters_by_mark
                }

                if( typeof req.params.filters_by_mark != 'undefined' ){
                    filter['mark'] = req.params.filters_by_mark
                }
                            if( typeof req.query.filters_by_model != 'undefined' ){
                    filter['model'] = req.query.filters_by_model
                }

                if( typeof req.params.filters_by_model != 'undefined' ){
                    filter['model'] = req.params.filters_by_model
                }
                            if( typeof req.query.filters_by_series != 'undefined' ){
                    filter['series'] = req.query.filters_by_series
                }

                if( typeof req.params.filters_by_series != 'undefined' ){
                    filter['series'] = req.params.filters_by_series
                }
                            if( typeof req.query.filters_by_sowt_version != 'undefined' ){
                    filter['sowt_version'] = req.query.filters_by_sowt_version
                }

                if( typeof req.params.filters_by_sowt_version != 'undefined' ){
                    filter['sowt_version'] = req.params.filters_by_sowt_version
                }
                            if( typeof req.query.filters_by_types_device != 'undefined' ){
                    filter['types_device'] = req.query.filters_by_types_device
                }

                if( typeof req.params.filters_by_types_device != 'undefined' ){
                    filter['types_device'] = req.params.filters_by_types_device
                }
                            if( typeof req.query.filters_by_cron_parameters != 'undefined' ){
                    filter['cron_parameters'] = req.query.filters_by_cron_parameters
                }

                if( typeof req.params.filters_by_cron_parameters != 'undefined' ){
                    filter['cron_parameters'] = req.params.filters_by_cron_parameters
                }
                            if( typeof req.query.filters_by_commands != 'undefined' ){
                    filter['commands'] = req.query.filters_by_commands
                }

                if( typeof req.params.filters_by_commands != 'undefined' ){
                    filter['commands'] = req.params.filters_by_commands
                }
                            if( typeof req.query.filters_by_parameters != 'undefined' ){
                    filter['parameters'] = req.query.filters_by_parameters
                }

                if( typeof req.params.filters_by_parameters != 'undefined' ){
                    filter['parameters'] = req.params.filters_by_parameters
                }
                            if( typeof req.query.filters_by_time_settings != 'undefined' ){
                    filter['time_settings'] = req.query.filters_by_time_settings
                }

                if( typeof req.params.filters_by_time_settings != 'undefined' ){
                    filter['time_settings'] = req.params.filters_by_time_settings
                }
                            if( typeof req.query.filters_by_device_parameters != 'undefined' ){
                    filter['device_parameters'] = req.query.filters_by_device_parameters
                }

                if( typeof req.params.filters_by_device_parameters != 'undefined' ){
                    filter['device_parameters'] = req.params.filters_by_device_parameters
                }
            
            return GetAllByFilterCountMod(filter, user_ctx).then(r_count => {
                return GetAllByFilterMod(filter, {limit: Number(limit) , offset:Number(offset)}, flags, user_ctx).then(r => {

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
* @api {get} /api/mod/search?text=:text&limit=:limit_row&offset=:offset_row&page=:page_num Получение всех записей Модели
* @apiName GetAllMod
* @apiGroup Mod
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
* @apiSuccess {String} data.ident Идентификатор
* @apiSuccess {String} data.version Версия бибилиотеки
* @apiSuccess {String} data.manufactures Производитель
* @apiSuccess {String} data.mark марка
* @apiSuccess {String} data.model модель с которой работают
* @apiSuccess {String} data.series Уникальная серия
* @apiSuccess {String} data.sowt_version Уникальная версия софта
* @apiSuccess {Array} data.types_device Какие типы данных может собирать
* @apiSuccess {Array} data.cron_parameters Параметры автоматом собираемые системой
* @apiSuccess {Array} data.commands Какие поддерживает команжы
* @apiSuccess {Array} data.parameters Какие параметры можно прочитать
* @apiSuccess {Array} data.time_settings Настройки времени опроса
* @apiSuccess {Array} data.device_parameters Какие параметры нужны для работы опросника
* @apiSuccess {Object} meta Метаданные для списка
* @apiSuccess {Number} meta.total Общее кол-во
* @apiSuccess {Number} meta.limit Лимит по которому ограничена выборка
* @apiSuccess {Number} meta.offset Отступ в кол-ве позиций от начала списка
* @apiSuccess {Object[]} pages Данные о страницах для потсраничного вывода
* @apiSuccess {Number} pages.number Номер страинцы
* @apiSuccess {Number} pages.is_active Активная ли текущая страница
*
* @apiExample {js} Example usage:
* fetch('/api/mod/filter?limit=10&offset=0&page=1', {
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
    ApiGetSearchMod (req, res, next) {

    console.log('ApiGetSearchMod');

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

            return GetAllSearchCountMod(req.params.text, user_ctx).then(r_count => {
                return GetAllSearchMod(req.params.text, f , flags, user_ctx).then(r => {

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


