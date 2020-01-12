const mongoose = require('mongoose');

const User = require('./../../models/user');
const Contact = require('./../../models/contact');
const { authenticateUser } = require('./../../helpers/auth');

const users = [{
    _id: new mongoose.Types.ObjectId(),
    "username": "mark",
    "email": "mark@test.com",
    "password": "password1",
    get token () {
        return authenticateUser(this.email, this._id)
    }
}, {
    _id: new mongoose.Types.ObjectId(),
    "username": "james",
    "email": "james@test.com",
    "password": "password2",
    get token () {
        return authenticateUser(this.email, this._id)
    }
}, {
    _id: new mongoose.Types.ObjectId(),
    "username": "wronguser",
    "email": "wronguser@test.com",
    "password": "password1",
}];

const contacts = [{
    _id: new mongoose.Types.ObjectId(),
    "firstName": "Jane",
    "lastName": "Otto",
    "phoneNumber": "1234567",
    "email": "jane@test.com",
    "contactImage": process.env.DEFAULT_CONTACT_IMAGE_URL,
    "createdBy": users[0]._id
}, {
    _id: new mongoose.Types.ObjectId(),
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "123456789",
    "email": "john@test.com",
    "contactImage": process.env.DEFAULT_CONTACT_IMAGE_URL,
    "createdBy": users[1]._id
}];

let user1 = new User(users[0]);
let contact1 = new Contact(contacts[0]);

const populateUserCollection = (done) => {
    User.deleteMany({}).then(async () => {
        try {
            let firstUser = await user1.save();
            if (firstUser) done();
        } catch (e) {
            done(e);
        }
    });
};

const populateContactCollection = (done) => {
    Contact.deleteMany({}).then(async () => {
        try {
            let firstContact = await contact1.save();
            if (firstContact) done();
        } catch (e) {
            done(e);
        }
    });
};

module.exports = {
    contacts,
    populateContactCollection,
    users,
    populateUserCollection
}
