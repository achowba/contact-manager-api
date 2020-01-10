const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// function to hash user password
async function hashPassword (password) {
    const saltRounds = process.env.BCRYPT_SALT_ROUNDS;

    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function(err, hash) {
            if (err) {
                reject(err);
            }

            resolve(hash);
        });
    });

    return hashedPassword;
}

async function comparePassword (password, userPassword) {
    const comparedPassword = await new Promise((resolve, reject) => {
        bcrypt.compare(password, userPassword, function(err, result) {
            if (err) {
                reject(err);
            }

            resolve(result);
        });

    });

    return comparedPassword;
}

function authenticateUser (userEmail, userId) {
    const token = jwt.sign({
        email: userEmail,
        userId,
    }, process.env.JWT_SECRET, {
        expiresIn: "24h"
    });

    return token;
}

const checkAuthStatus = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // get token from request header
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userData = decoded;
        next(); // call next to run next middleware if user is authenticated
    } catch (err) {
        // return an error response that if user is not authenticated
        return res.status(401).json({
            message: 'Authentication Failed.',
            errorMessage: err.message
        });
    }
}

module.exports = {
    hashPassword,
    comparePassword,
    authenticateUser,
    checkAuthStatus
};
