// Надстройка над модулем который будет общаться между другими муодулями

module.exports = class Mod{
    constructor(
        mod = '',
        device = null,
        e = null,
    ){
        try{
            const ModDescription = require(`../mods/${mod}`)
            const m = new ModDescription()
            this.settings = m
            const Protocol = require(`../protocols/${m.protocol}`)

            this.protocol = new Protocol(e)

            e.once('close', () => {
                console.log('произошло событие!');
            }).once('timeout', () => {
                console.log('произошло событие!');
            }).once('error', (e) => {

                // Дочернее устройство смогло составить пакет и готово отдать родителю
            }).on(`done_create_${device.parent_id}`, (pack) => {
                console.log(pack)
                // Родительское устройство смогло разобрать пакет и дочернее может его взять
            }).on(`done_parse_${device.parent_id}`, (pack) => {
                // 
            })

            this.device = device


        } catch(e) {
            return e
        }

    }
    settings = {}
    device = ''
    protocol = null
    e = null
}