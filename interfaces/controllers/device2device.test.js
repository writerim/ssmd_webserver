                     

 

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
    name : 'Test Device2Device',
    last_name : 'last_name Device2Device',
    login : 'login Device2Device',
    password : 'password Device2Device',
    parent_id : 0,
    is_group : false,
    lft : 1,
    rgt : 2,
    token : 'TOKENDevice2Device',
    is_system : false,
})


// Проверка добавления сущностей
describe("controllers: Device2Device", function (done) {
    
    let lastId_Device2Device = 0
    let lastPage_Device2Device = 0

        it('GET /api/device2device/all Запрос без токена', function (done) {
        request(app)
        .get('/api/device2device/all')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/device2device/filter Запрос без токена', function (done) {
        request(app)
        .get('/api/device2device/filter')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/device2device/search Запрос без токена', function (done) {
        request(app)
        .get('/api/device2device/search')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/device2device/:id Запрос без токена', function (done) {
        request(app)
        .get('/api/device2device/10')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('POST /api/device2device/:id Запрос без токена', function (done) {
        request(app)
        .post('/api/device2device/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('PUT /api/device2device/:id Запрос без токена', function (done) {
        request(app)
        .put('/api/device2device/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('DELETE /api/device2device/:id Запрос без токена', function (done) {
        request(app)
        .delete('/api/device2device/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })


        
        it('GET /api/device2device/all Чтение всех', function (done) {
        request(app)
        .get('/api/device2device/all')
        .set('Accept', 'application/json')
        .set('Token', 'TOKENDevice2Device')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
            lastId_Device2Device = Number(res.body.meta.count) + 1
            lastPage_Device2Device = res.body.pages.length + 100
            assert(true, true)
            return done();
        });
    })

        it('GET /api/device2device/all?limit=2 Чтение всех лимит', function (done) {
        request(app)
        .get('/api/device2device/all?limit=2')
        .set('Accept', 'application/json')
        .set('Token', 'TOKENDevice2Device')
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