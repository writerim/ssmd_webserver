         

         

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
    name : 'Test Parameter',
    last_name : 'last_name Parameter',
    login : 'login Parameter',
    password : 'password Parameter',
    parent_id : 0,
    is_group : false,
    lft : 1,
    rgt : 2,
    token : 'TOKENParameter',
    is_system : false,
})


// Проверка добавления сущностей
describe("controllers: Parameter", function (done) {
    
    let lastId_Parameter = 0
    let lastPage_Parameter = 0

        it('GET /api/parameter/all Запрос без токена', function (done) {
        request(app)
        .get('/api/parameter/all')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/parameter/filter Запрос без токена', function (done) {
        request(app)
        .get('/api/parameter/filter')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/parameter/search Запрос без токена', function (done) {
        request(app)
        .get('/api/parameter/search')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/parameter/:id Запрос без токена', function (done) {
        request(app)
        .get('/api/parameter/10')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('POST /api/parameter/:id Запрос без токена', function (done) {
        request(app)
        .post('/api/parameter/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('PUT /api/parameter/:id Запрос без токена', function (done) {
        request(app)
        .put('/api/parameter/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('DELETE /api/parameter/:id Запрос без токена', function (done) {
        request(app)
        .delete('/api/parameter/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })


        
        it('GET /api/parameter/all Чтение всех', function (done) {
        request(app)
        .get('/api/parameter/all')
        .set('Accept', 'application/json')
        .set('Token', 'TOKENParameter')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
            lastId_Parameter = Number(res.body.meta.count) + 1
            lastPage_Parameter = res.body.pages.length + 100
            assert(true, true)
            return done();
        });
    })

        it('GET /api/parameter/all?limit=2 Чтение всех лимит', function (done) {
        request(app)
        .get('/api/parameter/all?limit=2')
        .set('Accept', 'application/json')
        .set('Token', 'TOKENParameter')
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