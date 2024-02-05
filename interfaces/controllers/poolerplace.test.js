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

GetConnect().query("truncate poolerplaces");

beforeEach(async () => {
    await GetConnect().query("truncate users");
        await UserAdd({
        name : 'Test PoolerPlace',
        last_name : 'last_name PoolerPlace',
        login : 'login PoolerPlace',
        password : 'password PoolerPlace',
        parent_id : 0,
        is_group : false,
        lft : 1,
        rgt : 2,
        token : 'TOKENPoolerPlace',
        is_system : false,
    })
});


// Проверка добавления сущностей
describe("controllers: PoolerPlace", function (done) {
    
    let lastId_PoolerPlace = 0
    let lastPage_PoolerPlace = 0

        it('GET /api/poolerplace/all Запрос без токена', function (done) {
        request(app)
        .get('/api/poolerplace/all')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/poolerplace/filter Запрос без токена', function (done) {
        request(app)
        .get('/api/poolerplace/filter')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/poolerplace/search Запрос без токена', function (done) {
        request(app)
        .get('/api/poolerplace/search')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/poolerplace/:id Запрос без токена', function (done) {
        request(app)
        .get('/api/poolerplace/10')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('POST /api/poolerplace/:id Запрос без токена', function (done) {
        request(app)
        .post('/api/poolerplace/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('PUT /api/poolerplace/:id Запрос без токена', function (done) {
        request(app)
        .put('/api/poolerplace/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('DELETE /api/poolerplace/:id Запрос без токена', function (done) {
        request(app)
        .delete('/api/poolerplace/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })


        
        it('GET /api/poolerplace/all Чтение всех', function (done) {
        request(app)
        .get('/api/poolerplace/all')
        .set('Accept', 'application/json')
        .set('Token', 'TOKENPoolerPlace')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
            lastId_PoolerPlace = Number(res.body.meta.count) + 1
            lastPage_PoolerPlace = res.body.pages.length + 100
            assert(true, true)
            return done();
        });
    })

        it('GET /api/poolerplace/all?limit=2 Чтение всех лимит', function (done) {
        request(app)
        .get('/api/poolerplace/all?limit=2')
        .set('Accept', 'application/json')
        .set('Token', 'TOKENPoolerPlace')
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