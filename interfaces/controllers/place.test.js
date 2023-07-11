                                     

         

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
    name : 'Test Place',
    last_name : 'last_name Place',
    login : 'login Place',
    password : 'password Place',
    parent_id : 0,
    is_group : false,
    lft : 1,
    rgt : 2,
    token : 'TOKENPlace',
    is_system : false,
})


// Проверка добавления сущностей
describe("controllers: Place", function (done) {
    
    let lastId_Place = 0
    let lastPage_Place = 0

        it('GET /api/place/all Запрос без токена', function (done) {
        request(app)
        .get('/api/place/all')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/place/filter Запрос без токена', function (done) {
        request(app)
        .get('/api/place/filter')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/place/search Запрос без токена', function (done) {
        request(app)
        .get('/api/place/search')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/place/:id Запрос без токена', function (done) {
        request(app)
        .get('/api/place/10')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('POST /api/place/:id Запрос без токена', function (done) {
        request(app)
        .post('/api/place/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('PUT /api/place/:id Запрос без токена', function (done) {
        request(app)
        .put('/api/place/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('DELETE /api/place/:id Запрос без токена', function (done) {
        request(app)
        .delete('/api/place/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })


        
        it('GET /api/place/all Чтение всех', function (done) {
        request(app)
        .get('/api/place/all')
        .set('Accept', 'application/json')
        .set('Token', 'TOKENPlace')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
            lastId_Place = Number(res.body.meta.count) + 1
            lastPage_Place = res.body.pages.length + 100
            assert(true, true)
            return done();
        });
    })

        it('GET /api/place/all?limit=2 Чтение всех лимит', function (done) {
        request(app)
        .get('/api/place/all?limit=2')
        .set('Accept', 'application/json')
        .set('Token', 'TOKENPlace')
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