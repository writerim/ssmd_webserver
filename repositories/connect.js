const { patch } = require('request');
const { Sequelize } = require('sequelize');
const path = require("path");

// Соединение
var connect = null

// Началось ли соединение
var initial_connect = false
var initial_entity = false
var init_callers_deamons = {}
var bussy = false

module.exports = {

    SetConnect(c) {
        connect = c
        initial_connect = true
    },


    // солучение соединения
    // Принимает объект для вызова какой нибудь функции разово при например инициализации объекта
    // Полезно для создания демонов очисщения данных в модулях
    GetConnect: (caller = { name: "", deamon: () => { } }) => {

        if (caller.name && typeof init_callers_deamons[caller.name] == 'undefined') {
            init_callers_deamons[caller.name] = caller.deamon
            if(init_callers_deamons[caller.name]){
                init_callers_deamons[caller.name]()
            }
        }

        if (connect) {
            return connect
        }

        initial_connect = true
        connect = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
            // logging: process.env.DB_LOG,
            dialect: process.env.DB_DIALECT,
            host: process.env.DB_HOST,
            // sync: true,
        })
        if (!initial_entity) {
            connect.sync()
            return connect
        }
        return connect
    },
    GetStatus: {
        initial_connect: initial_connect,
        initial_entity: initial_entity
    }
}