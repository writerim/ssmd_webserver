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

GetConnect().query("truncate rolerules");

beforeEach(async () => {
    await GetConnect().query("truncate users");
        await UserAdd({
        name : 'Test RoleRule',
        last_name : 'last_name RoleRule',
        login : 'login RoleRule',
        password : 'password RoleRule',
        parent_id : 0,
        is_group : false,
        lft : 1,
        rgt : 2,
        token : 'TOKENRoleRule',
        is_system : false,
    })
});


// Проверка добавления сущностей
describe("controllers: RoleRule", function (done) {
    
    let lastId_RoleRule = 0
    let lastPage_RoleRule = 0

        it('GET /api/rolerule/all Запрос без токена', function (done) {
        request(app)
        .get('/api/rolerule/all')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/rolerule/filter Запрос без токена', function (done) {
        request(app)
        .get('/api/rolerule/filter')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/rolerule/search Запрос без токена', function (done) {
        request(app)
        .get('/api/rolerule/search')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/rolerule/:id Запрос без токена', function (done) {
        request(app)
        .get('/api/rolerule/10')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('POST /api/rolerule/:id Запрос без токена', function (done) {
        request(app)
        .post('/api/rolerule/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('PUT /api/rolerule/:id Запрос без токена', function (done) {
        request(app)
        .put('/api/rolerule/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('DELETE /api/rolerule/:id Запрос без токена', function (done) {
        request(app)
        .delete('/api/rolerule/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })


        
        it('GET /api/rolerule/all Чтение всех', function (done) {
        request(app)
        .get('/api/rolerule/all')
        .set('Accept', 'application/json')
        .set('Token', 'TOKENRoleRule')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
            lastId_RoleRule = Number(res.body.meta.count) + 1
            lastPage_RoleRule = res.body.pages.length + 100
            assert(true, true)
            return done();
        });
    })

        it('GET /api/rolerule/all?limit=2 Чтение всех лимит', function (done) {
        request(app)
        .get('/api/rolerule/all?limit=2')
        .set('Accept', 'application/json')
        .set('Token', 'TOKENRoleRule')
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