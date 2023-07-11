const { patch } = require('request');
const { Sequelize } = require('sequelize');
const path = require("path");


const env = process.env.NODE_ENV && process.env.NODE_ENV.trim() || 'production';
const conf = require(__dirname + '/config');

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
        const config = conf[env];

        if (connect) {
            return connect
        }

        if (!config) {
            throw new Error('config.js file not valid')
        }

        initial_connect = true
        if (config.type && config.type == "sqlite") {
            connect = new Sequelize({
                ...config,
                dialect: 'sqlite',
            });
        } else {
            console.log("new connect")
            connect = new Sequelize(config.db, config.login, config.password, {
                logging: config.logging,
                dialect: config.type
            })
        }
        if (init_callers_deamons[caller.name] != "") {
            init_callers_deamons[caller.name] = caller.deamon
            init_callers_deamons[caller.name]()
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