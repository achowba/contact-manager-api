const mongoose = require('mongoose');

const Contact = require('./../models/contact');
const { validateContact } = require('./../helpers/validation');
const { deleteContactImage } = require('./../helpers/fileupload');

// create a new contact
exports.createContact = async (req, res, next) => {
    try {
        let newContact = '';
        let contactImagePath = req.file ? req.file.path : req.body.contactImage;
        const { error } = validateContact(req.body);

        const contact = new Contact({
            _id: new mongoose.Types.ObjectId(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            contactImage: contactImagePath,
            createdOn: new Date().toISOString(),
            createdBy: req.userData.userId,
        });

        newContact = await contact.save();

        if (!newContact) {
            deleteContactImage(req.file.path); // if an error occurs and an image was uploaded, delete the image

            res.status(409).json({
                status: "error",
                created: false,
                err: "Failed to Create Contact. Please try again."
            });
        }

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
        if (req.file) deleteContactImage(req.file.path); // if an error occurs and an image was uploaded, delete the image

        res.status(404).json({
            status: "error",
            created: false,
            err: err.message
        });
    }
}

// get all contact
exports.getAllContacts = async (req, res, next) => {

    let { limit, page, sortBy } = req.query;
    let paginationOptions = {
        select: "_id firstName lastName phoneNumber email createdOn createdBy modifiedOn contactImage",
        limit: parseInt(limit) || 5,
        page: parseInt(page) || 1,
        sort: sortBy || "firstName", // sort by firstName is ascending order
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
            status: "success",
            contacts,
        });

    } catch (err) {
        res.status(404).json({
            status: "error",
            err: err.message
        });
    }
}

// get a contact by id
exports.getContact = async (req, res, next) => {

    try {
        let contactId = req.params.contactId;
        let contact = await Contact.findById(contactId).select('_id firstName lastName phoneNumber email createdOn createdBy modifiedOn contactImage').sort('createdOn');

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

// edit a contact
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

        if (!editedContact) {
            return res.status(404).json({
                status: "error",
                error: "Contact Not Found",
            });
        }

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

// delete a contact
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

        deleteContactImage(deletedContact.contactImage);
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
