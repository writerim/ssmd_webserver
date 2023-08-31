const {
  UserAdd
} = require('../../repositories/user.js');
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
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors())

require('../base_routing.js')(app);
require('../custom_base_routing.js')(app);
require('../admin_routing.js')(app);

GetConnect().query("truncate users");

beforeEach(async () => {
  await GetConnect().query("truncate users");
  await UserAdd({
    name: 'Test User',
    last_name: 'last_name User',
    login: 'login User',
    password: 'password User',
    parent_id: 0,
    is_group: false,
    lft: 1,
    rgt: 2,
    token: 'TOKENUser',
    is_system: false,
  })
});

// Проверка добавления сущностей
describe("controllers: User", function (done) {

  let lastId_User = 0
  let lastPage_User = 0

  it('GET /api/user/all Запрос без токена', function (done) {
    request(app)
      .get('/api/user/all')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .end(done);
  })

  it('GET /api/user/filter Запрос без токена', function (done) {
    request(app)
      .get('/api/user/filter')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .end(done);
  })

  it('GET /api/user/search Запрос без токена', function (done) {
    request(app)
      .get('/api/user/search')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .end(done);
  })

  it('GET /api/user/:id Запрос без токена', function (done) {
    request(app)
      .get('/api/user/10')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .end(done);
  })

  it('POST /api/user/:id Запрос без токена', function (done) {
    request(app)
      .post('/api/user/0')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .end(done);
  })

  it('PUT /api/user/:id Запрос без токена', function (done) {
    request(app)
      .put('/api/user/0')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .end(done);
  })

  it('DELETE /api/user/:id Запрос без токена', function (done) {
    request(app)
      .delete('/api/user/0')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .end(done);
  })

  it('GET /api/user/all Чтение всех', function (done) {
    request(app)
      .get('/api/user/all')
      .set('Accept', 'application/json')
      .set('Token', 'TOKENUser')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        lastId_User = Number(res.body.meta.count) + 1
        lastPage_User = res.body.pages.length + 100
        assert(true, true)
        return done();
      });
  })

  it('GET /api/user/all?limit=2 Чтение всех лимит', function (done) {
    request(app)
      .get('/api/user/all?limit=2')
      .set('Accept', 'application/json')
      .set('Token', 'TOKENUser')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        assert(res.body.data.length, 2)
        assert(res.body.meta.limit, 2)
        return done();
      });
  })

})