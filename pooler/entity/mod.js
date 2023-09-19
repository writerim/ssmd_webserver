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
            const { ParseData, CreateData, Start } = require(`../protocols/${m.protocol}`)
            this.CreateData = CreateData
            this.ParseData = ParseData
            this.Start = Start
        } catch(e) {
            return e
        }

    }
    settings = {}
    device_id = 0
    e = null
}