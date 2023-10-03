const Pack = require("../entity/pack");
const ModDescription = require("../../mods/emulate_converter");

module.exports = class EvetMod extends ModDescription {
    constructor(
        e,
        Device
    ) {

        super();

        this.inited = false
        this.set_conn = false

        var self = this

        var children_pack = null

        const listener_pack = (pack) => {
            // Этот пакет прислали нам
            if (pack.Device.parent_id == Device.Id) {

                children_pack = pack

                if(!self.init_pack){
                    e.emit('SEND PACK', new Pack(/* init */))
                }

            }
        }

        const parse_pack = (pack) => {
            // Parse pack
            if(pack.Device.id == Device.Id){
                if(!self.set_conn && pack.Device.id == Device.Id){
                    e.emit('SEND PACK', new Pack(/* connect */))
                    return
                }
                if(pack.Command == 'SET CONN'){
                    e.emit('SEND PACK', children_pack)
                }
            }
        }

        e.on('SEND PACK', listener_pack)
        e.on('PARSE PACK', parse_pack)

        this.destroy = () => {
            e.emit(`CLOSE ${this.id}`, this)
            e.removeListener(`SEND PACK`, listener_pack)
            e.removeListener(`PARSE PACK`, parse_pack)
        }
    }
}