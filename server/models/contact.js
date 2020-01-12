const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const contactSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
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
        default: process.env.DEFAULT_CONTACT_IMAGE_URL
    },
    createdOn: {
        type: String,
        default: new Date().toISOString()
    },
    modifiedOn: {
        type: String,
        default: new Date().toISOString()
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

contactSchema.plugin(mongoosePaginate); // add pagination plugin to schema
module.exports = mongoose.model('Contact', contactSchema);
