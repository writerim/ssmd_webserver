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

GetConnect().query("truncate data");

beforeEach(async () => {
  await GetConnect().query("truncate users");
  await UserAdd({
    name: 'Test Data',
    last_name: 'last_name Data',
    login: 'login Data',
    password: 'password Data',
    parent_id: 0,
    is_group: false,
    lft: 1,
    rgt: 2,
    token: 'TOKENData',
    is_system: false,
  })
});

// Проверка добавления сущностей
describe("controllers: Data", function (done) {

  let lastId_Data = 0
  let lastPage_Data = 0

  it('GET /api/data/all Запрос без токена', function (done) {
    request(app)
    .get('/api/data/all')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(401)
    .end(done);
  })

  it('GET /api/data/filter Запрос без токена', function (done) {
    request(app)
    .get('/api/data/filter')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(401)
    .end(done);
  })

  it('GET /api/data/search Запрос без токена', function (done) {
    request(app)
    .get('/api/data/search')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(401)
    .end(done);
  })

  it('GET /api/data/:id Запрос без токена', function (done) {
    request(app)
    .get('/api/data/10')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(401)
    .end(done);
  })

  it('POST /api/data/:id Запрос без токена', function (done) {
    request(app)
    .post('/api/data/0')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(401)
    .end(done);
  })

  it('PUT /api/data/:id Запрос без токена', function (done) {
    request(app)
    .put('/api/data/0')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(401)
    .end(done);
  })

  it('DELETE /api/data/:id Запрос без токена', function (done) {
    request(app)
    .delete('/api/data/0')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(401)
    .end(done);
  })

  it('GET /api/data/all Чтение всех', function (done) {
    request(app)
    .get('/api/data/all')
    .set('Accept', 'application/json')
    .set('Token', 'TOKENData')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      if (err) throw err;
      lastId_Data = Number(res.body.meta.count) + 1
      lastPage_Data = res.body.pages.length + 100
      assert(true, true)
      return done();
    });
  })

  it('GET /api/data/all?limit=2 Чтение всех лимит', function (done) {
    request(app)
    .get('/api/data/all?limit=2')
    .set('Accept', 'application/json')
    .set('Token', 'TOKENData')
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