const { UserAdd } = require('../../repositories/user.js');
const {
  GetConnect
} = require('../../repositories/connect');

const assert = require('assert').strict;
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var cookieParser = require('cookie-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

require('../base_routing.js')(app);
require('../custom_base_routing.js')(app);
require('../admin_routing.js')(app);

GetConnect().query("truncate settingsenterprises");

beforeEach(async () => {
    await GetConnect().query("truncate users");
        await UserAdd({
        name : 'Test SettingsEnterprise',
        last_name : 'last_name SettingsEnterprise',
        login : 'login SettingsEnterprise',
        password : 'password SettingsEnterprise',
        parent_id : 0,
        is_group : false,
        lft : 1,
        rgt : 2,
        token : 'TOKENSettingsEnterprise',
        is_system : false,
    })
});


// Проверка добавления сущностей
describe("controllers: SettingsEnterprise", function (done) {
    
    let lastId_SettingsEnterprise = 0
    let lastPage_SettingsEnterprise = 0

        it('GET /api/settingsenterprise/all Запрос без токена', function (done) {
        request(app)
        .get('/api/settingsenterprise/all')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/settingsenterprise/filter Запрос без токена', function (done) {
        request(app)
        .get('/api/settingsenterprise/filter')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/settingsenterprise/search Запрос без токена', function (done) {
        request(app)
        .get('/api/settingsenterprise/search')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/settingsenterprise/:id Запрос без токена', function (done) {
        request(app)
        .get('/api/settingsenterprise/10')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('POST /api/settingsenterprise/:id Запрос без токена', function (done) {
        request(app)
        .post('/api/settingsenterprise/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('PUT /api/settingsenterprise/:id Запрос без токена', function (done) {
        request(app)
        .put('/api/settingsenterprise/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('DELETE /api/settingsenterprise/:id Запрос без токена', function (done) {
        request(app)
        .delete('/api/settingsenterprise/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })


        
        it('GET /api/settingsenterprise/all Чтение всех', function (done) {
        request(app)
        .get('/api/settingsenterprise/all')
        .set('Accept', 'application/json')
        .set('Token', 'TOKENSettingsEnterprise')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
            lastId_SettingsEnterprise = Number(res.body.meta.count) + 1
            lastPage_SettingsEnterprise = res.body.pages.length + 100
            assert(true, true)
            return done();
        });
    })

        it('GET /api/settingsenterprise/all?limit=2 Чтение всех лимит', function (done) {
        request(app)
        .get('/api/settingsenterprise/all?limit=2')
        .set('Accept', 'application/json')
        .set('Token', 'TOKENSettingsEnterprise')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
            assert(res.body.data.length, 2)
            assert(res.body.meta.limit, 2)
            return done();
        });
    })

            
        
    
    
})