const { PARAMETER_ENEMGY_TARIF_1, PARAMETER_ENEMGY_TARIF_2, PARAMETER_ENEMGY_TARIF_SUM } = require("../contsants/parameters");
const { TCP } = require("../contsants/type_connects");
const { ELECTRICAL_COUNTER } = require("../contsants/type_devices");

module.exports = class ModDescription{
    
    protocol = 'ce301' 
    name = 'CE 102 R5'
    manufactures = 'Энергомера'
    mark = 'CE'
    model = '102'
    series = 'R5'
    sowt_version = ''
    types_device = [
        ELECTRICAL_COUNTER
    ]
    parameters = [
        PARAMETER_ENEMGY_TARIF_1,
        PARAMETER_ENEMGY_TARIF_2,
        PARAMETER_ENEMGY_TARIF_SUM,
    ]
    commands = ['get_data']
    export = true

    type_connect = TCP
}
