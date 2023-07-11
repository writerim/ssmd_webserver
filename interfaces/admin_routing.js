const path = require('path');
const UserCtx = require("../entity/User");
const { UserAdd } = require("../repositories/User");
const { UserFindByIsSystem } = require("../repositories/user.custom");
const { GetAllByFilterSettingsEnterprise } = require("../use_cases/SettingsEnterprise");
const { Login, GetUserBySessionToken } = require("../use_cases/user.custom");


const AdminRouter = (app) => {
    app.get('/', (req, res, next) => {
        GetAllByFilterSettingsEnterprise({
            'index': 'main_index_page',
        }, {}, new UserCtx()).then(pages => {

            let page_index = 'index.hbs'
            if (pages && pages.length) {
                page_index = pages[0].get('index')
            }

            res.render(page_index, {
                layout: "index",
                mode: 'blocks'
            });
        })
    });

    app.get('/test_vue', (req, res, next) => {
        res.sendFile(path.join(__dirname, 'web/static/index.html'), {
            layout: "clean",
        });
    });
    app.get('/test_vue2', (req, res, next) => {
        res.sendFile(path.join(__dirname, 'web/static/device.html'), {
            layout: "clean",
        });
    });

    app.get('/admin/place', (req, res, next) => {
        res.render('place.hbs', {
            layout: "admin",
            title: 'Выход',
            mode: 'blocks'
        });
    });

    // Если пользователь авторизован, кидаем его на страницу какую нибудь
    // Если нет то кидаем его на авторизацию
    app.get('/admin/', (req, res, next) => {

        let token = req.header('Token') || req.cookies.Token
        if (!token) {
            res.redirect('/admin/login');
            return
        }
        return GetUserBySessionToken(token, new UserCtx()).then(user => {
            if (user) {
                res.redirect('/admin/dashboard');
            }
        }).catch(e => {
            res.redirect('/admin/login');
        })
    });

    app.get('/admin/dashboard', (req, res, next) => {
        res.render('tree.hbs', {
            layout: "admin",
            title: 'Выход',
            mode: 'blocks'
        });
    });

    app.get('/admin/device', (req, res, next) => {
        res.render('device.hbs', {
            layout: "admin",
            title: 'Выход',
            mode: 'blocks'
        });
    });

    app.get('/admin/login', (req, res, next) => {

        UserFindByIsSystem(true).then(r => {
            if (!r) {
                UserAdd({
                    password: '21232f297a57a5a743894a0e4a801fc3',
                    login: 'admin',
                    lft: 1,
                    rgt: 2,
                    is_system: true,
                    name: 'Администратор',
                    last_name: '',
                    parent_id: 0,
                    is_group: false,
                    token: '',
                })
            }
        }).catch(e => { console.log(e) })

        res.render('login.hbs', {
            layout: "login",
            title: 'Выход',
            mode: 'blocks'
        });
    });
    // Проверка авторизации
    app.post('/admin/login', (req, res, next) => {
        Login(req.body, new UserCtx()).then(r => {
            res.cookie('Token', r.token);
            res.redirect('/admin/dashboard');
        }).catch(e => {

            res.redirect('/admin/login?error=' + e.message);
        })
    });
};

module.exports = AdminRouter;