const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: Number,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contactImage: {
        type: String,
        required: false,
        default: process.env.DEFAULT_CONTACT_IMAGE
    },
    createdOn: {
        type: String,
        required: false,
        default: new Date().toISOString()
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    }
});

module.exports = mongoose.model('Contact', contactSchema);
