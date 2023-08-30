             

 

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
    name : 'Test Rule',
    last_name : 'last_name Rule',
    login : 'login Rule',
    password : 'password Rule',
    parent_id : 0,
    is_group : false,
    lft : 1,
    rgt : 2,
    token : 'TOKENRule',
    is_system : false,
})


// Проверка добавления сущностей
describe("controllers: Rule", function (done) {
    
    let lastId_Rule = 0
    let lastPage_Rule = 0

        it('GET /api/rule/all Запрос без токена', function (done) {
        request(app)
        .get('/api/rule/all')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/rule/filter Запрос без токена', function (done) {
        request(app)
        .get('/api/rule/filter')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/rule/search Запрос без токена', function (done) {
        request(app)
        .get('/api/rule/search')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/rule/:id Запрос без токена', function (done) {
        request(app)
        .get('/api/rule/10')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('POST /api/rule/:id Запрос без токена', function (done) {
        request(app)
        .post('/api/rule/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('PUT /api/rule/:id Запрос без токена', function (done) {
        request(app)
        .put('/api/rule/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('DELETE /api/rule/:id Запрос без токена', function (done) {
        request(app)
        .delete('/api/rule/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })


        
        it('GET /api/rule/all Чтение всех', function (done) {
        request(app)
        .get('/api/rule/all')
        .set('Accept', 'application/json')
        .set('Token', 'TOKENRule')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
            lastId_Rule = Number(res.body.meta.count) + 1
            lastPage_Rule = res.body.pages.length + 100
            assert(true, true)
            return done();
        });
    })

        it('GET /api/rule/all?limit=2 Чтение всех лимит', function (done) {
        request(app)
        .get('/api/rule/all?limit=2')
        .set('Accept', 'application/json')
        .set('Token', 'TOKENRule')
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