// generated

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const hbs = require('hbs')
const expressHbs = require("express-handlebars");
const { dirname } = require('path');
var cookieParser = require('cookie-parser');

var env = process.env.NODE_ENV || 'production';
var config = require(dirname(require.main.filename) + '/config')[env];

var pjson = require('./package.json');

// Start the server
const start = async () => {


    try {

        const app = express();
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cors())
        app.use(cookieParser());



        app.set('views', dirname(require.main.filename) + '/views');

        console.log(dirname(require.main.filename) + "/views/layouts");
        app.engine("hbs", expressHbs.engine(
            {
                layoutsDir: "interfaces/web/layouts",
                defaultLayout: "main",
                extname: "hbs",
                helpers: {
                    'ifeq': function (a, b, options) {
                        if (a == b) { return options.fn(this); }
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
            }
        ))
        
        app.set('view engine', 'hbs');
        app.use("/js", express.static('interfaces/web/js'));
        app.use("/css", express.static('interfaces/web/assets/css/'));
        app.use("/img", express.static('interfaces/web/assets/img/'));
        app.use("/fonts", express.static('interfaces/web/assets/fonts/'));
        app.use("/admin/doc", express.static('interfaces/apidoc/index.html'));
        app.use("/admin/assets", express.static('interfaces/apidoc/assets'));
        app.set('views', path.join(__dirname, 'interfaces/web/pages'));
        


        require('./interfaces/base_routing.js')(app);
        require('./interfaces/custom_base_routing.js')(app);
        require('./interfaces/admin_routing.js')(app);
        
        app.use((err, req, res, next) => {
            res.status(500)
            res.end(JSON.stringify({ error: err.message }));

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