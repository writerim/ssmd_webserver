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

GetConnect().query("truncate poolers");

beforeEach(async () => {
    await GetConnect().query("truncate users");
        await UserAdd({
        name : 'Test Pooler',
        last_name : 'last_name Pooler',
        login : 'login Pooler',
        password : 'password Pooler',
        parent_id : 0,
        is_group : false,
        lft : 1,
        rgt : 2,
        token : 'TOKENPooler',
        is_system : false,
    })
});


// Проверка добавления сущностей
describe("controllers: Pooler", function (done) {
    
    let lastId_Pooler = 0
    let lastPage_Pooler = 0

        it('GET /api/pooler/all Запрос без токена', function (done) {
        request(app)
        .get('/api/pooler/all')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/pooler/filter Запрос без токена', function (done) {
        request(app)
        .get('/api/pooler/filter')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/pooler/search Запрос без токена', function (done) {
        request(app)
        .get('/api/pooler/search')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/pooler/:id Запрос без токена', function (done) {
        request(app)
        .get('/api/pooler/10')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('POST /api/pooler/:id Запрос без токена', function (done) {
        request(app)
        .post('/api/pooler/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('PUT /api/pooler/:id Запрос без токена', function (done) {
        request(app)
        .put('/api/pooler/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('DELETE /api/pooler/:id Запрос без токена', function (done) {
        request(app)
        .delete('/api/pooler/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })


        
        it('GET /api/pooler/all Чтение всех', function (done) {
        request(app)
        .get('/api/pooler/all')
        .set('Accept', 'application/json')
        .set('Token', 'TOKENPooler')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
            lastId_Pooler = Number(res.body.meta.count) + 1
            lastPage_Pooler = res.body.pages.length + 100
            assert(true, true)
            return done();
        });
    })

        it('GET /api/pooler/all?limit=2 Чтение всех лимит', function (done) {
        request(app)
        .get('/api/pooler/all?limit=2')
        .set('Accept', 'application/json')
        .set('Token', 'TOKENPooler')
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