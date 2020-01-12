const mongoose = require('mongoose');

const Contact = require('./../models/contact');
const { validateContact } = require('./../helpers/validation');

exports.createContact = async (req, res, next) => {
    try {

        const { error } = validateContact(req.body);

        const contact = new Contact({
            _id: new mongoose.Types.ObjectId(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            contactImage: req.body.contactImage,
            createdOn: new Date().toISOString(),
            createdBy: req.userData.userId,
        });

        let newContact = await contact.save();

        res.status(201).json({
            status: "success",
            created: true,
            newContact: {
                _id: newContact._id,
                firstName: newContact.firstName,
                lastName: newContact.lastName,
                phoneNumber: newContact.phoneNumber,
                email: newContact.email,
                contactImage: newContact.contactImage,
                createdOn: newContact.createdOn,
                modifiedOn: newContact.modifiedOn,
                createdBy: newContact.createdBy,
            }
        });

    } catch (err) {
        res.status(404).json({
            status: "error",
            created: false,
            err: err.message
        });
    }
}

exports.getAllContacts = async (req, res, next) => {

    let { limit, page } = req.query;
    let paginationOptions = {
        select: "_id firstName lastName phoneNumber email createdOn createdBy modifiedOn contactImage",
        limit: parseInt(limit) || 5,
        page: parseInt(page) || 1,
    }

    try {
        let contacts = await Contact.paginate({}, paginationOptions);

        if (!contacts) {
            return res.status(404).json({
                status: "error",
                error: "No Contacts Found",
            });
        }

        res.status(200).json({
            /* status: "success",
            count: contacts.length, */
            contacts
        });

    } catch (err) {
        res.status(404).json({
            status: "error",
            err: err.message
        });
    }
}

exports.getContact = async (req, res, next) => {
    let contactId = req.params.contactId;
    let contact = await Contact.findById(contactId).select('_id firstName lastName phoneNumber email createdOn createdBy modifiedOn contactImage').sort('createdOn');

    try {

        if (!contact) {
            return res.status(404).json({
                status: "error",
                error: "Contact Not Found",
            });
        }

        res.status(200).json({
            status: "success",
            contact
        });

    } catch (err) {
        res.status(404).json({
            status: "error",
            err: err.message
        });
    }
}

exports.editContact = async (req, res, next) => {

	let contactId = req.params.contactId;
	let updateInfo = {}

	for (info of Object.keys(req.body)) {
        updateInfo[info] = req.body[info];
	}

    updateInfo = {
        ...updateInfo,
        modifiedOn: new Date().toISOString(),
    }

	try {

		let editedContact = await Contact.findByIdAndUpdate({
			_id: contactId
		}, {
			$set: updateInfo
		});

		res.status(200).json({
            status: "success",
            edited: true,
			editedContact: {
                _id: updateInfo._id,
                firstName: updateInfo.firstName,
                lastName: updateInfo.lastName,
                phoneNumber: updateInfo.phoneNumber,
                email: updateInfo.email,
                contactImage: updateInfo.contactImage,
                createdOn: updateInfo.createdOn,
                modifiedOn: updateInfo.modifiedOn,
                createdBy: updateInfo.createdBy,
            }
		});

	} catch (err) {
		res.status(404).json({
            status: "error",
            edited: false,
			err: err.message
		});
	}
}

exports.deleteContact = async (req, res, next) => {
	try {

		let contactId = req.params.contactId;
		let deletedContact = await Contact.findByIdAndDelete({
			_id: contactId
		});

		if (!deletedContact) {
			return res.status(404).json({
				status: "error",
				message: "No valid contact found for provided ID",
			});
		}

		res.status(200).json({
            status: "success",
            deleted: true,
			deletedContact
		});
	} catch (err) {
		res.status(404).json({
            status: "error",
            deleted: false,
			err: err.message
		});
	}
}
