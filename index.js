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

var env = process.env.NODE_ENV || 'production';
var config = require('./config.js')[env];

var pjson = require('./package.json');

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

    console.log(dirname(require.main.filename) + "/views/layouts");
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

    app.use((err, req, res, next) => {
      res.status(500)
      res.end(JSON.stringify({
        error: err.message
      }));

    });

    const server = app.listen(config.server.port, () => {
      console.log('listening on port %s...', config.server.port);
    });

  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();