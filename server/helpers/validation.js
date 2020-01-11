const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

function validateContact (contact) {
    const contactSchema = {
        _id: Joi.objectId().required(),
        firstName: Joi.string().min(1).required(),
        lastName: Joi.string().min(1).required(),
        phoneNumber: Joi.string().min(5).required(),
        email: Joi.string().min(6).required,
        contactImage: Joi.string(),
        createdOn: Joi.string(),
        createdBy: Joi.objectId(),
    }

    return Joi.validate(contact, contactSchema);
}

function validateUser(user) {
    const userSchema = {
        _id: Joi.objectId().required(),
        username: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(6).max(50).required(),
        password: Joi.string().min(6).max(50).required(),
    }

    return Joi.validate(user, userSchema);
}

function validateUserLogin(userLogin) {
    const userSchema = {
        email: Joi.string().min(6).max(50).required(),
        password: Joi.string().min(6).max(50).required(),
    }

    return Joi.validate(userLogin, userSchema);
}

module.exports = {
    validateContact,
    validateUser,
    validateUserLogin
}
