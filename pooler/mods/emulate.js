const {
    CMD_TEST_MODE_CLOSE,
    CMD_TEST_MODE_ERROR,
    CMD_TEST_MODE_TIMEOUT,
    GET_ACTUAL_DATA
} = require("../contsants/issue");
const {
    PARAMETER_ENEMGY_TARIF_1,
    PARAMETER_ENEMGY_TARIF_2,
    PARAMETER_ENEMGY_TARIF_SUM
} = require("../contsants/parameters");
const {
    TCP
} = require("../contsants/type_connects");
const {
    ELECTRICAL_COUNTER
} = require("../contsants/type_devices");

module.exports = class ModDescription {

    protocol = 'emulate'
    name = 'empty'
    manufactures = 'empty'
    mark = 'empty'
    model = 'empty'
    series = 'empty'
    sowt_version = ''
    types_device = [
        ELECTRICAL_COUNTER
    ]
    parameters = [
        PARAMETER_ENEMGY_TARIF_1,
        PARAMETER_ENEMGY_TARIF_2,
        PARAMETER_ENEMGY_TARIF_SUM,
    ]
    commands = [
        CMD_TEST_MODE_CLOSE,
        CMD_TEST_MODE_ERROR,
        CMD_TEST_MODE_TIMEOUT,
        GET_ACTUAL_DATA
    ]
    export = false

    type_connect = TCP
}