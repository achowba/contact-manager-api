const express = require("express");
const router = express.Router();

const UserController = require('./../controllers/users');

// create a new user
router.post('/register', UserController.registerUser);

// route to authenticate/log user in
router.post('/login', UserController.loginUser);

module.exports = router;
