const { patch } = require('request');
const { Sequelize } = require('sequelize');
const path = require("path");


const env = process.env.NODE_ENV && process.env.NODE_ENV.trim() || 'production';
const config = require('./../config.json');

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

        if (!config.database[env]) {
            throw new Error('config.js file not valid')
        }

        initial_connect = true
        if (config.database[env].type && config.database[env].type == "sqlite") {
            connect = new Sequelize({
                ...config.database[env],
                dialect: 'sqlite',
            });
        } else {
            console.log("new connect")
            connect = new Sequelize(config.database[env].db, config.database[env].login, config.database[env].password, {
                logging: config.database[env].logging,
                dialect: config.database[env].type,
                host: config.database[env].host
            })
        }
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