const mongoose = require('mongoose');

const Contact = require('./../models/contact');

exports.createContact = async (req, res, next) => {
    try {
        const contact = new Contact({
            _id: new mongoose.Types.ObjectId(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            contactImage: req.body.contactImage,
            createdOn: req.body.createdOn,
            createdBy: req.body.createdBy,
        });

        let newContact = await contact.save();

        res.status(201).json({
            status: "success",
            newContact
        });

    } catch (err) {
        res.status(404).json({
            status: "error",
            err: err.message
        });
    }
}

exports.getAllContacts = async (req, res, next) => {
    try {
        let contacts = await Contact.find({
            // createdBy: req.headers['x-current-user']
        });

        if (!contacts) {
            return res.status(404).json({
                status: "error",
                error: "No Contacts Found",
            });
        }

        res.status(200).json({
            status: "success",
            count: contacts.length,
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
    try {
        let contactId = req.params._id;
        let contact = await Contact.findById(contactId);

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

	let contactId = req.params._id;
	let updateInfo = {}

	for (info of req.body) {
		updateInfo[info.propName.toString()] = req.value;
	}

	try {

		let editedContact = await Contact.findByIdAndUpdate({
			_id: contactId
		}, {
			$set: updateInfo
		});

		res.status(200).json({
			status: "success",
			editedContact
		});

	} catch (err) {
		res.status(404).json({
			status: "error",
			err: err.message
		});
	}
}

exports.deleteContact = async (req, res, next) => {
	try {

		let contactId = req.params._id;
		let deletedContact = Contact.findByIdAndDelete({
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
			deletedContact
		});
	} catch (error) {
		res.status(404).json({
			status: "error",
			err: err.message
		});
	}
}
