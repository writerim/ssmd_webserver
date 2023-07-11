const { DeviceFindByType } = require("../repositories/device.custom")

module.exports = {

    CustomGetDeviceByType(type, limit, offset, user_ctx) {
        return DeviceFindByType(type, limit, offset)
    }

}