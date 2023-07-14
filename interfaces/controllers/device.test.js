                                                             

         

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
    name : 'Test Device',
    last_name : 'last_name Device',
    login : 'login Device',
    password : 'password Device',
    parent_id : 0,
    is_group : false,
    lft : 1,
    rgt : 2,
    token : 'TOKENDevice',
    is_system : false,
})


// Проверка добавления сущностей
describe("controllers: Device", function (done) {
    
    let lastId_Device = 0
    let lastPage_Device = 0

        it('GET /api/device/all Запрос без токена', function (done) {
        request(app)
        .get('/api/device/all')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/device/filter Запрос без токена', function (done) {
        request(app)
        .get('/api/device/filter')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/device/search Запрос без токена', function (done) {
        request(app)
        .get('/api/device/search')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/device/:id Запрос без токена', function (done) {
        request(app)
        .get('/api/device/10')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('POST /api/device/:id Запрос без токена', function (done) {
        request(app)
        .post('/api/device/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('PUT /api/device/:id Запрос без токена', function (done) {
        request(app)
        .put('/api/device/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('DELETE /api/device/:id Запрос без токена', function (done) {
        request(app)
        .delete('/api/device/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })


        
        it('GET /api/device/all Чтение всех', function (done) {
        request(app)
        .get('/api/device/all')
        .set('Accept', 'application/json')
        .set('Token', 'TOKENDevice')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
            lastId_Device = Number(res.body.meta.count) + 1
            lastPage_Device = res.body.pages.length + 100
            assert(true, true)
            return done();
        });
    })

        it('GET /api/device/all?limit=2 Чтение всех лимит', function (done) {
        request(app)
        .get('/api/device/all?limit=2')
        .set('Accept', 'application/json')
        .set('Token', 'TOKENDevice')
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