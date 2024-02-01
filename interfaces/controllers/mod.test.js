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

GetConnect().query("truncate mods");

beforeEach(async () => {
    await GetConnect().query("truncate users");
        await UserAdd({
        name : 'Test Mod',
        last_name : 'last_name Mod',
        login : 'login Mod',
        password : 'password Mod',
        parent_id : 0,
        is_group : false,
        lft : 1,
        rgt : 2,
        token : 'TOKENMod',
        is_system : false,
    })
});


// Проверка добавления сущностей
describe("controllers: Mod", function (done) {
    
    let lastId_Mod = 0
    let lastPage_Mod = 0

        it('GET /api/mod/all Запрос без токена', function (done) {
        request(app)
        .get('/api/mod/all')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/mod/filter Запрос без токена', function (done) {
        request(app)
        .get('/api/mod/filter')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/mod/search Запрос без токена', function (done) {
        request(app)
        .get('/api/mod/search')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/mod/:id Запрос без токена', function (done) {
        request(app)
        .get('/api/mod/10')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('POST /api/mod/:id Запрос без токена', function (done) {
        request(app)
        .post('/api/mod/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('PUT /api/mod/:id Запрос без токена', function (done) {
        request(app)
        .put('/api/mod/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('DELETE /api/mod/:id Запрос без токена', function (done) {
        request(app)
        .delete('/api/mod/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })


        
        it('GET /api/mod/all Чтение всех', function (done) {
        request(app)
        .get('/api/mod/all')
        .set('Accept', 'application/json')
        .set('Token', 'TOKENMod')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
            lastId_Mod = Number(res.body.meta.count) + 1
            lastPage_Mod = res.body.pages.length + 100
            assert(true, true)
            return done();
        });
    })

        it('GET /api/mod/all?limit=2 Чтение всех лимит', function (done) {
        request(app)
        .get('/api/mod/all?limit=2')
        .set('Accept', 'application/json')
        .set('Token', 'TOKENMod')
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