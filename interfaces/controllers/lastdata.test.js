                     

 

const { UserAdd } = require('../../repositories/User.js');

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

UserAdd({
    name : 'Test LastData',
    last_name : 'last_name LastData',
    login : 'login LastData',
    password : 'password LastData',
    parent_id : 0,
    is_group : false,
    lft : 1,
    rgt : 2,
    token : 'TOKENLastData',
    is_system : false,
})


// Проверка добавления сущностей
describe("controllers: LastData", function (done) {
    
    let lastId_LastData = 0
    let lastPage_LastData = 0

        it('GET /api/lastdata/all Запрос без токена', function (done) {
        request(app)
        .get('/api/lastdata/all')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/lastdata/filter Запрос без токена', function (done) {
        request(app)
        .get('/api/lastdata/filter')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/lastdata/search Запрос без токена', function (done) {
        request(app)
        .get('/api/lastdata/search')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/lastdata/:id Запрос без токена', function (done) {
        request(app)
        .get('/api/lastdata/10')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('POST /api/lastdata/:id Запрос без токена', function (done) {
        request(app)
        .post('/api/lastdata/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('PUT /api/lastdata/:id Запрос без токена', function (done) {
        request(app)
        .put('/api/lastdata/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('DELETE /api/lastdata/:id Запрос без токена', function (done) {
        request(app)
        .delete('/api/lastdata/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })


        
        it('GET /api/lastdata/all Чтение всех', function (done) {
        request(app)
        .get('/api/lastdata/all')
        .set('Accept', 'application/json')
        .set('Token', 'TOKENLastData')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
            lastId_LastData = Number(res.body.meta.count) + 1
            lastPage_LastData = res.body.pages.length + 100
            assert(true, true)
            return done();
        });
    })

        it('GET /api/lastdata/all?limit=2 Чтение всех лимит', function (done) {
        request(app)
        .get('/api/lastdata/all?limit=2')
        .set('Accept', 'application/json')
        .set('Token', 'TOKENLastData')
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