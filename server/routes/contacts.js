const express = require("express");
const router = express.Router();

const { upload } = require('./../helpers/fileupload');
const { checkAuthStatus } = require('./../middleware/check-auth');
const ContactController = require('./../controllers/contacts');

router.get('/', ContactController.getAllContacts);
router.post('/add', checkAuthStatus, upload.single('contactImage'), ContactController.createContact);
router.get('/:contactId', checkAuthStatus, ContactController.getContact);
router.patch('/edit/:contactId', checkAuthStatus, ContactController.editContact);
router.delete('/delete/:contactId', checkAuthStatus, ContactController.deleteContact);

module.exports = router;
