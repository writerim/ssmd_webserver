const {
    CONNECT,
    SET_PARAM_CONNECT,
    CLOSE
} = require("../contsants/issue");
const {
    CONVERTER
} = require("../contsants/type_devices");
const Protocol = require("../protocols/emulate_converter");

module.exports = class ModDescription extends Protocol {

    name = 'emulate_converter'
    manufactures = 'empty'
    mark = 'empty'
    model = 'empty'
    series = 'empty'
    sowt_version = ''
    types_device = [
        CONVERTER
    ]
    commands = [
        CONNECT,
        SET_PARAM_CONNECT,
        CLOSE
    ]
    export = false
}