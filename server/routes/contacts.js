const express = require("express");
const router = express.Router();

const {  } = require('./../helpers/auth');
const ContactController = require('./../controllers/contacts');

// create a new contact
router.post('/', ContactController.createContact);
router.get('/', ContactController.getAllContacts);
router.get('/:contactId', checkAuth, ContactController.getContact);
router.patch('/:contactId', checkAuth, ContactController.updateContact);
router.delete('/:contactId', checkAuth, ContactController.deleteContact);

module.exports = router;
