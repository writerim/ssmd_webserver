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
const Protocol = require("../protocols/emulate");

module.exports = class ModDescription extends Protocol {

    name = 'emulate'
    manufactures = 'empty'
    mark = 'empty'
    model = 'empty'
    series = 'empty'
    sowt_version = ''
    types_device = [
        ELECTRICAL_COUNTER
    ]
    user_commands = [{
        export: false,
        name: "Получение текущих данных",
        command: "GetActualData",
        args: []
    }]

    parameters = [
        {
            ident : PARAMETER_ENEMGY_TARIF_1,
            delay : 50505,
            cmd : "GetActualData"
        }
    ]

    system_commands = [
        {
            ident : "GetActualData",
        }
    ]
    export = false

    max_count_conn = 1

    type_connect = TCP
}