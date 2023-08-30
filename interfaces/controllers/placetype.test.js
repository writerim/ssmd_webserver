             

 

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
    name : 'Test PlaceType',
    last_name : 'last_name PlaceType',
    login : 'login PlaceType',
    password : 'password PlaceType',
    parent_id : 0,
    is_group : false,
    lft : 1,
    rgt : 2,
    token : 'TOKENPlaceType',
    is_system : false,
})


// Проверка добавления сущностей
describe("controllers: PlaceType", function (done) {
    
    let lastId_PlaceType = 0
    let lastPage_PlaceType = 0

        it('GET /api/placetype/all Запрос без токена', function (done) {
        request(app)
        .get('/api/placetype/all')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/placetype/filter Запрос без токена', function (done) {
        request(app)
        .get('/api/placetype/filter')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/placetype/search Запрос без токена', function (done) {
        request(app)
        .get('/api/placetype/search')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/placetype/:id Запрос без токена', function (done) {
        request(app)
        .get('/api/placetype/10')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('POST /api/placetype/:id Запрос без токена', function (done) {
        request(app)
        .post('/api/placetype/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('PUT /api/placetype/:id Запрос без токена', function (done) {
        request(app)
        .put('/api/placetype/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('DELETE /api/placetype/:id Запрос без токена', function (done) {
        request(app)
        .delete('/api/placetype/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })


        
        it('GET /api/placetype/all Чтение всех', function (done) {
        request(app)
        .get('/api/placetype/all')
        .set('Accept', 'application/json')
        .set('Token', 'TOKENPlaceType')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
            lastId_PlaceType = Number(res.body.meta.count) + 1
            lastPage_PlaceType = res.body.pages.length + 100
            assert(true, true)
            return done();
        });
    })

        it('GET /api/placetype/all?limit=2 Чтение всех лимит', function (done) {
        request(app)
        .get('/api/placetype/all?limit=2')
        .set('Accept', 'application/json')
        .set('Token', 'TOKENPlaceType')
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