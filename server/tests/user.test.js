const expect = require('expect');
const supertest = require('supertest');

const app = require('./../index');
const { users, populateUserCollection } = require('./seed/seed');

before(populateUserCollection); // populate the database before the tests are ran

describe('SIGNUP api/v1/users/register', function () {

    it('should create a new user', function (done) {
        supertest(app)
            .post('/api/v1/users/register')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(users[1])
            .expect(function (res) {
                expect(res.body.status).toEqual("success");
                // expect(res.body.createdUser._id).toBeDefined();
                expect(res.body.createdUser.username).toBe(users[1].username)
                expect(res.body.createdUser.email).toBe(users[1].email)
            })
            .expect(201)
            .then(function () {
                done();
            })
            .catch(function () {
                done();
            });
    })

    it('should expect email to already exist', function (done) {
        supertest(app)
            .post('/api/v1/users/register')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(users[0])
            .expect(function (res) {
                expect(res.body.status).toEqual("error");
                expect(res.body.error).toBeDefined();
            })
            .expect(401)
            .then(function () {
                done();
            })
            .catch(function () {
                done();
            });
    });

    /* it('should not create a user if username, email and password are not provided', function (done) {
        supertest(app)
            .post('/api/v1/users/register')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({})
            .expect(function (res) {
                expect(res.body.status).toEqual("error");
                expect(res.body.error).toBeDefined();
            })
            .expect(401)
            .then(function () {
                done();
            })
            .catch(function (err) {
                done();
            });
    }); */

});
