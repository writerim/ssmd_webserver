             

 

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
    name : 'Test UserPlace',
    last_name : 'last_name UserPlace',
    login : 'login UserPlace',
    password : 'password UserPlace',
    parent_id : 0,
    is_group : false,
    lft : 1,
    rgt : 2,
    token : 'TOKENUserPlace',
    is_system : false,
})


// Проверка добавления сущностей
describe("controllers: UserPlace", function (done) {
    
    let lastId_UserPlace = 0
    let lastPage_UserPlace = 0

        it('GET /api/userplace/all Запрос без токена', function (done) {
        request(app)
        .get('/api/userplace/all')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/userplace/filter Запрос без токена', function (done) {
        request(app)
        .get('/api/userplace/filter')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/userplace/search Запрос без токена', function (done) {
        request(app)
        .get('/api/userplace/search')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/userplace/:id Запрос без токена', function (done) {
        request(app)
        .get('/api/userplace/10')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('POST /api/userplace/:id Запрос без токена', function (done) {
        request(app)
        .post('/api/userplace/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('PUT /api/userplace/:id Запрос без токена', function (done) {
        request(app)
        .put('/api/userplace/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('DELETE /api/userplace/:id Запрос без токена', function (done) {
        request(app)
        .delete('/api/userplace/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })


        
        it('GET /api/userplace/all Чтение всех', function (done) {
        request(app)
        .get('/api/userplace/all')
        .set('Accept', 'application/json')
        .set('Token', 'TOKENUserPlace')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
            lastId_UserPlace = Number(res.body.meta.count) + 1
            lastPage_UserPlace = res.body.pages.length + 100
            assert(true, true)
            return done();
        });
    })

        it('GET /api/userplace/all?limit=2 Чтение всех лимит', function (done) {
        request(app)
        .get('/api/userplace/all?limit=2')
        .set('Accept', 'application/json')
        .set('Token', 'TOKENUserPlace')
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