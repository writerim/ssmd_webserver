const { CustomGetDeviceByType } = require("../../use_cases/device.custom");
const UserCtx = require("../../entity/User");

module.exports = {
    // Получение приборов по их типу
    // Типа электросчетчик, водо и так далее
    CustomApiGetDeviceByType(req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        let limit = req.params.limit ? req.params.limit : 10
        let offset = req.params.offset ? req.params.offset : 0
        let page = req.params.page ? req.params.page : 1
        if (!offset) {
            offset = (page - 1) * limit
        }
        return CustomGetDeviceByType(req.params.type_id, limit, offset, new UserCtx()).then(r => {
            res.end(JSON.stringify({ data: r, meta: { page, limit, offset } }));
        }).catch(e => next(e))
    },
}