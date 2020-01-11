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

module.exports = {
    hashPassword,
    comparePassword,
    authenticateUser,
    checkAuthStatus
};
