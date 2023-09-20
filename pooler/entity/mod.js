// Надстройка над модулем который будет общаться между другими муодулями

module.exports = class Mod{
    constructor(
        mod = '',
        device_id = 0,
        e = null,
    ){
        try{
            const ModDescription = require(`../mods/${mod}`)
            const m = new ModDescription()
            this.settings = m
            const Protocol = require(`../protocols/${m.protocol}`)

            this.protocol = new Protocol(e)

            // const Close = function(){
            //     this.settings = undefined
            //     this.CreateData = undefined
            //     this.ParseData = undefined
            //     this.ParseData = undefined
            // }

            e.on('close', () => {
                console.log('произошло событие!');
            }).on('timeout', () => {
                console.log('произошло событие!');
            }).on('error', (e) => {
                // 
            })


        } catch(e) {
            return e
        }

    }
    settings = {}
    device_id = 0
    protocol = null
    e = null
}