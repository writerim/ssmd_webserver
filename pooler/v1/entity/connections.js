const { POINT } = require("./type_connects")

// Приведение всех соединений к корректным функциям
module.exports = class ConnectPoint{
    constructor( type_connect = null, parent = null, child = null ){
    }

    RR = null
    RW = null
    LR = null
    LW = null
}