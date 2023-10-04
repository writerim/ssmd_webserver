const Emulate = require("../../mod_event/emulator")

module.exports = class Mod{
    constructor(data, e){
        this.data = data

    }

    data = {}
    init_event = () => {
        switch (this.mod_ident) {
            case 'emulate':
                return new Emulate()
        
            default:
                break;
        }
    }
}