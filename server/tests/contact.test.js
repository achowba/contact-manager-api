const expect = require('expect');
const supertest = require('supertest');

const app = require('./../index');
const { contacts, users, populateContactCollection } = require('./seed/seed');

before(populateContactCollection); // populate the database before the tests are ran

describe('CONTACTS /api/v1/contacts', function () {

    it('should add a contact', function (done) {
        supertest(app)
            .post('/api/v1/contacts/add')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${users[1].token}`)
            .send(contacts[1])
            .expect((res) => {
                expect(res.body.status).toEqual("success");
                expect(res.body.newContact._id).toBeDefined();
                expect(res.body.newContact.firstName).toEqual(contacts[1].firstName);
                expect(res.body.newContact.lastName).toEqual(contacts[1].lastName);
                expect(res.body.newContact.phoneNumber).toEqual(contacts[1].phoneNumber);
                expect(res.body.newContact.email).toEqual(contacts[1].email);
                expect(res.body.newContact.contactImage).toEqual(contacts[1].contactImage);
                expect(res.body.newContact.createdOn).toBeDefined();
                expect(res.body.newContact.modifiedOn).toBeDefined();
                expect(res.body.newContact.createdBy).toEqual(req.userData.userId);
            })
            .expect(201)
            .then(function () {
                done();
            })
            .catch(function () {
                done();
            });
    });

    it('should get all contacts added by a user', function (done) {
        supertest(app)
            .get('/api/v1/contacts')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${users[0].token}`)
            .expect((res) => {
                expect(res.body.status).toEqual("success");
                expect(res.body.contacts.docs[0]._id).toBeDefined();
                expect(res.body.contacts.docs[0].firstName).toEqual(contacts[0].firstName);
                expect(res.body.contacts.docs[0].lastName).toEqual(contacts[0].lastName);
                expect(res.body.contacts.docs[0].email).toEqual(contacts[0].email);
                expect(res.body.contacts.docs[0].createdBy).toEqual(users[0]._id);
            })
            .expect(200)
            .then(function () {
                done();
            })
            .catch(function () {
                done();
            });
        });

    });

    describe('CONTACTS /api/v1/contacts/:id', function () {

        it('should get a contact added by a user', function (done) {
            supertest(app)
            .get(`/api/v1/contacts/${contacts[1]._id}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${users[1].token}`)
            .expect((res) => {
                expect(res.body.status).toEqual("success");
                expect(res.body.contacts.docs[1]._id).toBeDefined()
                expect(res.body.contacts.docs[1].firstName).toEqual(contacts[1].firstName);
                expect(res.body.contacts.docs[1].lastName).toEqual(contacts[1].lastName);
                expect(res.body.contacts.docs[1].email).toEqual(contacts[1].email);
            })
            .expect(200)
            .then(function () {
                done();
            })
            .catch(function () {
                done();
            });
    });

    it('should edit a contact', function (done) {
        supertest(app)
        .patch(`/api/v1/contacts/edit/${contacts[1]._id}`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${users[1].token}`)
            .send({
                phoneNumber: "7654321",
                email: "edited@test.com"
            })
            .expect((res) => {
                expect(res.body.status).toEqual("success");
                expect(res.body.editedContact._id).toBeDefined();
                expect(res.body.editedContact.phoneNumber).toEqual("7654321");
                expect(res.body.editedContact.email).toEqual("edited@test.com");
            })
            .expect(200)
            .then(function () {
                done();
            })
            .catch(function () {
                done();
            });
        });

    it('should delete a contact', function (done) {
        supertest(app)
            .delete(`/api/v1/contacts/delete/${contacts[0]._id}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${users[0].token}`)
            .expect((res) => {
                expect(res.body.status).toEqual("success");
                expect(res.body.deletedContact._id).toBeDefined();
                expect(res.body.deletedContact.firstName).toEqual(contacts[0].firstName);
                expect(res.body.deletedContact.lastName).toEqual(contacts[0].lastName);
                expect(res.body.deletedContact.email).toEqual(contacts[0].email);
            })
            .expect(200)
            .then(function () {
                done();
            })
            .catch(function () {
                done();
            });
    });

});

