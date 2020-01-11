const jwt = require("jsonwebtoken");

const checkAuthStatus = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({
                status: "error",
                message: "No Token Provided.",
            });
        }
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
    checkAuthStatus,
}
