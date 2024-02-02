const { 
    AddData, 
    FindByIdData, 
    EditData, 
    DropData, 
    GetAllCountData, 
    GetAllSearchData, 
    GetAllSearchCountData, 
    GetAllByFilterData, 
    GetAllByFilterCountData, 
    GetAllData 
} = require("../../use_cases/data");

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
* @api {put} /api/data/0 Добавление Данные с приборов учета
* @apiName AddData
* @apiGroup Data
*
*
* @apiHeader {String} Token Ключ авторизации полученный при авторизации
* @apiHeaderExample {Header} Token
*     "Token: ad302aca-13fe-45cc-a126-d27821f143fa"
*
* @apiBody {Number} id 
* @apiBody {Number} device_id Устройство с которого получили данные
* @apiBody {Number} parameter_id Параметр по которому записали данные
* @apiBody {Object} data Данные которые мы записали
* @apiBody {Date} date Время когда записали данные
*
* @apiSuccess {Number} id 
* @apiSuccess {Number} device_id Устройство с которого получили данные
* @apiSuccess {Number} parameter_id Параметр по которому записали данные
* @apiSuccess {Object} data Данные которые мы записали
* @apiSuccess {Date} date Время когда записали данные
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
    ApiAddData (req, res, next) {

        console.log('ApiAddData');

        res.setHeader('Content-Type', 'application/json');
        this.isAuth(req, res).then(user => {
            if(!user){
                res.end(JSON.stringify({ error: CONTEXT_NOT_FOUND }));
                return
            }
            const user_ctx = new UserCtx(user.dataValues)
            return AddData(mapToAddRequest(req.body), user_ctx).then(r => {
                res.end(JSON.stringify(r));
            }).catch(e => next(e))
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },

/**
* @api {get} /api/data/:id Получение по идентификатору Данные с приборов учета
* @apiName iGetByIdData
* @apiGroup Data
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
    ApiGetByIdData (req, res, next) {

    console.log('ApiGetByIdData');

        res.setHeader('Content-Type', 'application/json');
        this.isAuth(req, res).then(user => {
            if(!user){
                res.end(JSON.stringify({ error: CONTEXT_NOT_FOUND }));
                return
            }
            const user_ctx = new UserCtx(user.dataValues)
            return FindByIdData(req.params.id, user_ctx).then(r => {
                res.end(JSON.stringify(mapToGetResponse(r)));
            }).catch(e => next(e))
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },

/**
* @api {put} /api/data/:id Редактирование записи Данные с приборов учета
* @apiName EditData
* @apiGroup Data
*
*
* @apiHeader {String} Token Ключ авторизации полученный при авторизации
* @apiHeaderExample {Header} Token
*     "Token: ad302aca-13fe-45cc-a126-d27821f143fa"
*
* @apiParam {Number} id Идентификатор записи устройства
* @apiBody {Number} id 
* @apiBody {Number} device_id Устройство с которого получили данные
* @apiBody {Number} parameter_id Параметр по которому записали данные
* @apiBody {Object} data Данные которые мы записали
* @apiBody {Date} date Время когда записали данные
*
*
* @apiSuccess {Number} id=true 
* @apiSuccess {Number} device_id=true Устройство с которого получили данные
* @apiSuccess {Number} parameter_id=true Параметр по которому записали данные
* @apiSuccess {Object} data Данные которые мы записали
* @apiSuccess {Date} date Время когда записали данные
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
    ApiEditData (req, res, next) {

    console.log('ApiEditData');

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
            return EditData(mapToEditRequest(req.body), user_ctx).then(r => {
                res.end(JSON.stringify(mapToEditResponse(r)));
            }).catch(e => next(e))
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },


/**
* @api {delete} /api/data/:id Удаление записи Данные с приборов учета
* @apiName DeleteData
* @apiGroup Data
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
    ApiDeleteData (req, res, next) {

    console.log('ApiDeleteData');

        res.setHeader('Content-Type', 'application/json');
        this.isAuth(req, res).then(user => {
            if(!user){
                res.end(JSON.stringify({ error: CONTEXT_NOT_FOUND }));
                return
            }
            const user_ctx = new UserCtx(user.dataValues)
            return DropData(req.params.id, user_ctx).then(r => {
                res.end(JSON.stringify(r));
            }).catch(e => next(e))
        }).catch(e => {
            res.status(401).json({ error: e.message });
        })
    },


/**
* @api {get} /api/data/all?limit=:limit_row&offset=:offset_row&page=:page_num Получение всех записей Данные с приборов учета
* @apiName GetAllData
* @apiGroup Data
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
* @apiSuccess {Number} data.device_id Устройство с которого получили данные
* @apiSuccess {Number} data.parameter_id Параметр по которому записали данные
* @apiSuccess {Object} data.data Данные которые мы записали
* @apiSuccess {Date} data.date Время когда записали данные
* @apiSuccess {Object} meta Метаданные для списка
* @apiSuccess {Number} meta.total Общее кол-во
* @apiSuccess {Number} meta.limit Лимит по которому ограничена выборка
* @apiSuccess {Number} meta.offset Отступ в кол-ве позиций от начала списка
* @apiSuccess {Object[]} pages Данные о страницах для потсраничного вывода
* @apiSuccess {Number} pages.number Номер страинцы
* @apiSuccess {Number} pages.is_active Активная ли текущая страница
*
* @apiExample {js} Example usage:
* fetch('/api/data/all?limit=10&offset=0&page=1', {
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
    ApiGetAllData (req, res, next) {

    console.log('ApiGetAllData');

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

            return GetAllCountData(user_ctx).then(r_count => {
                return GetAllData(
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
* @api {get} /api/data/filter?filters_by_id=:filter_id&?filters_by_device_id=:filter_device_id&?filters_by_parameter_id=:filter_parameter_id&?filters_by_data=:filter_data&?filters_by_date=:filter_date&&limit=:limit_row&offset=:offset_row&page=:page_num Получение всех записей по фильтру Данные с приборов учета
* @apiName GetAllFilterData
* @apiGroup Data
*
* @apiHeader {String} Token Ключ авторизации полученный при авторизации
* @apiHeaderExample {Header} Token
*     "Token: ad302aca-13fe-45cc-a126-d27821f143fa"
*
* @apiParam { int } filter_id Фильтр по полю id
* @apiParam { int } filter_device_id Фильтр по полю device_id
* @apiParam { int } filter_parameter_id Фильтр по полю parameter_id
* @apiParam { json } filter_data Фильтр по полю data
* @apiParam { time } filter_date Фильтр по полю date
* @apiParam {int} limit_row=10   Сколько записей показывать
* @apiParam {int} offset_row=0   Сколько записей отступить от начала
* @apiParam {int} page_num=1  Какую страницу показывать
*
* @apiSuccess {Object[]} data Данные 
* @apiSuccess {Number} data.id 
* @apiSuccess {Number} data.device_id Устройство с которого получили данные
* @apiSuccess {Number} data.parameter_id Параметр по которому записали данные
* @apiSuccess {Object} data.data Данные которые мы записали
* @apiSuccess {Date} data.date Время когда записали данные
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
* fetch('/api/data/all?limit=10&offset=0&page=1', {
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
    ApiGetFilterData (req, res, next) {

    console.log('ApiGetFilterData');

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
                            if( typeof req.query.filters_by_data != 'undefined' ){
                    filter['data'] = req.query.filters_by_data
                }

                if( typeof req.params.filters_by_data != 'undefined' ){
                    filter['data'] = req.params.filters_by_data
                }
                            if( typeof req.query.filters_by_date != 'undefined' ){
                    filter['date'] = req.query.filters_by_date
                }

                if( typeof req.params.filters_by_date != 'undefined' ){
                    filter['date'] = req.params.filters_by_date
                }
            
            return GetAllByFilterCountData(filter, user_ctx).then(r_count => {
                return GetAllByFilterData(filter, {limit: Number(limit) , offset:Number(offset)}, flags, user_ctx).then(r => {

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
* @api {get} /api/data/search?text=:text&limit=:limit_row&offset=:offset_row&page=:page_num Получение всех записей Данные с приборов учета
* @apiName GetAllData
* @apiGroup Data
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
* @apiSuccess {Number} data.device_id Устройство с которого получили данные
* @apiSuccess {Number} data.parameter_id Параметр по которому записали данные
* @apiSuccess {Object} data.data Данные которые мы записали
* @apiSuccess {Date} data.date Время когда записали данные
* @apiSuccess {Object} meta Метаданные для списка
* @apiSuccess {Number} meta.total Общее кол-во
* @apiSuccess {Number} meta.limit Лимит по которому ограничена выборка
* @apiSuccess {Number} meta.offset Отступ в кол-ве позиций от начала списка
* @apiSuccess {Object[]} pages Данные о страницах для потсраничного вывода
* @apiSuccess {Number} pages.number Номер страинцы
* @apiSuccess {Number} pages.is_active Активная ли текущая страница
*
* @apiExample {js} Example usage:
* fetch('/api/data/filter?limit=10&offset=0&page=1', {
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
    ApiGetSearchData (req, res, next) {

    console.log('ApiGetSearchData');

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

            return GetAllSearchCountData(req.params.text, user_ctx).then(r_count => {
                return GetAllSearchData(req.params.text, f , flags, user_ctx).then(r => {

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