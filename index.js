// generated

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const hbs = require('hbs')
const expressHbs = require("express-handlebars");

const {
  dirname
} = require('path');
var cookieParser = require('cookie-parser');

var pjson = require('./package.json');
const { Start } = require('./pooler/v2/server');
const { APP_EVENTS } = require('./app_events');
const { CheckInstallBasePlace } = require('./use_cases/place.custom.js');
const {  CreateDefaultUser } = require('./use_cases/user.custom.js');


// Start the server
const start = async () => {

  try {

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(cors())
    app.use(cookieParser());

    app.set('views', dirname(require.main.filename) + '/views');

    app.engine("hbs", expressHbs.engine({
      layoutsDir: "interfaces/web/layouts",
      defaultLayout: "main",
      extname: "hbs",
      helpers: {
        'ifeq': function (a, b, options) {
          if (a == b) {
            return options.fn(this);
          }
          return options.inverse(this);
        },
        'app_version': function () {
          return pjson.version;
        },
        section: function (name, options) {
          if (!this._sections) {
            this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
          }
        }
      },
      partialsDir: ['interfaces/web/partials']
    }))

    app.set('view engine', 'hbs');
    app.use("/admin/doc", express.static('interfaces/apidoc/index.html'));
    app.use("/assets/assets", express.static('interfaces/apidoc/assets'));
    app.use("/assets", express.static('interfaces/web/static/assets'));
    
    require('./interfaces/base_routing.js')(app);
    require('./interfaces/custom_base_routing.js')(app);
    require('./interfaces/admin_routing.js')(app);


    // Сначала создаем пространства
    CheckInstallBasePlace();

    // Создаем для них пользователей
    CreateDefaultUser();


    app.listen(process.env.APP_PORT, () => {
      console.log('listening on port %s...', process.env.APP_PORT);
    });


    Start(APP_EVENTS)

  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
console.log("start");
start();