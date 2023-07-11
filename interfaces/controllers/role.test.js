             

         

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
    name : 'Test Role',
    last_name : 'last_name Role',
    login : 'login Role',
    password : 'password Role',
    parent_id : 0,
    is_group : false,
    lft : 1,
    rgt : 2,
    token : 'TOKENRole',
    is_system : false,
})


// Проверка добавления сущностей
describe("controllers: Role", function (done) {
    
    let lastId_Role = 0
    let lastPage_Role = 0

        it('GET /api/role/all Запрос без токена', function (done) {
        request(app)
        .get('/api/role/all')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/role/filter Запрос без токена', function (done) {
        request(app)
        .get('/api/role/filter')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/role/search Запрос без токена', function (done) {
        request(app)
        .get('/api/role/search')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/role/:id Запрос без токена', function (done) {
        request(app)
        .get('/api/role/10')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('POST /api/role/:id Запрос без токена', function (done) {
        request(app)
        .post('/api/role/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('PUT /api/role/:id Запрос без токена', function (done) {
        request(app)
        .put('/api/role/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('DELETE /api/role/:id Запрос без токена', function (done) {
        request(app)
        .delete('/api/role/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })


        
        it('GET /api/role/all Чтение всех', function (done) {
        request(app)
        .get('/api/role/all')
        .set('Accept', 'application/json')
        .set('Token', 'TOKENRole')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
            lastId_Role = Number(res.body.meta.count) + 1
            lastPage_Role = res.body.pages.length + 100
            assert(true, true)
            return done();
        });
    })

        it('GET /api/role/all?limit=2 Чтение всех лимит', function (done) {
        request(app)
        .get('/api/role/all?limit=2')
        .set('Accept', 'application/json')
        .set('Token', 'TOKENRole')
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