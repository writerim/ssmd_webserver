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

GetConnect().query("truncate placedevices");

beforeEach(async () => {
    await GetConnect().query("truncate users");
        await UserAdd({
        name : 'Test PlaceDevice',
        last_name : 'last_name PlaceDevice',
        login : 'login PlaceDevice',
        password : 'password PlaceDevice',
        parent_id : 0,
        is_group : false,
        lft : 1,
        rgt : 2,
        token : 'TOKENPlaceDevice',
        is_system : false,
    })
});


// Проверка добавления сущностей
describe("controllers: PlaceDevice", function (done) {
    
    let lastId_PlaceDevice = 0
    let lastPage_PlaceDevice = 0

        it('GET /api/placedevice/all Запрос без токена', function (done) {
        request(app)
        .get('/api/placedevice/all')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/placedevice/filter Запрос без токена', function (done) {
        request(app)
        .get('/api/placedevice/filter')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/placedevice/search Запрос без токена', function (done) {
        request(app)
        .get('/api/placedevice/search')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('GET /api/placedevice/:id Запрос без токена', function (done) {
        request(app)
        .get('/api/placedevice/10')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('POST /api/placedevice/:id Запрос без токена', function (done) {
        request(app)
        .post('/api/placedevice/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('PUT /api/placedevice/:id Запрос без токена', function (done) {
        request(app)
        .put('/api/placedevice/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })

    it('DELETE /api/placedevice/:id Запрос без токена', function (done) {
        request(app)
        .delete('/api/placedevice/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    })


        
        it('GET /api/placedevice/all Чтение всех', function (done) {
        request(app)
        .get('/api/placedevice/all')
        .set('Accept', 'application/json')
        .set('Token', 'TOKENPlaceDevice')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
            lastId_PlaceDevice = Number(res.body.meta.count) + 1
            lastPage_PlaceDevice = res.body.pages.length + 100
            assert(true, true)
            return done();
        });
    })

        it('GET /api/placedevice/all?limit=2 Чтение всех лимит', function (done) {
        request(app)
        .get('/api/placedevice/all?limit=2')
        .set('Accept', 'application/json')
        .set('Token', 'TOKENPlaceDevice')
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