const mongoose = require('mongoose');

const User = require('./../models/user');
const { authenticateUser, comparePassword, hashPassword } = require('./../helpers/auth');

// create a new user
exports.registerUser = async (req, res, next) => {

    try {
        let hashedPassword = await hashPassword(req.body.password);
        let existingUser = await User.find({
            email: req.body.email,
            username: req.body.username
        });

        if (existingUser.length > 0) {
            return res.status(401).json({
                status: "error",
                error: "Email or Username already Exists!"
            });
        }

        let newUser = new User ({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        let createdUser = await newUser.save();

        return res.status(201).send({
            status: "success",
            username: createdUser.username,
            email: createdUser.email,
            token
        });

    } catch (err) {
        console.log(err);
        return res.status(400).json({
            status: "error",
            error: err.message
            //error: "Failed to Create User.",
        });
    }
}

// login user
exports.loginUser = async (req, res, next) => {

    try {
        let email = req.body.email;
        let password = req.body.password;

        let user = await User.find({
            email
        });

        let userPassword = await comparePassword(password, user[0].password);
        let token = authenticateUser(user[0].email, user[0]._id);

        if (!user || user.length == 0 || !userPassword) {
            return res.status(400).json({
                status: "error",
                error: "Wrong Password or Email.",
            });
        }

        return res.status(200).json({
            status: "success",
            username: user[0].username,
            email: user[0].email,
            token,
        });

    } catch (err) {
        return res.status(400).json({
            status: "error",
            error: err.message
        });
    }
}

