const { DeviceModel } = require("./device")
const { GetConnect } = require("./connect");

module.exports = {

    // Тут будем получать устройства одного типа
    async DeviceFindByType(type, limit, offset) {
        return GetConnect().query('SELECT * from devices d where d.types->"$[0]" = "' + type + '" limit ' + limit + ' offset ' + offset, {
            model: DeviceModel,
            mapToModel: true // pass true here if you have any mapped fields
        });
    }

}