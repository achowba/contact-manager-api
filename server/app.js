require('dotenv').config();
require('./helpers/db-config');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

const userRoutes = require('./routes/users');
const contactRoutes = require('./routes/contacts');

// configure bodyParser middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// set headers to allow cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // replace localhost with actual host
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next(); // move to the next middleware
});
app.use(cors());

// create routes
app.use('api/v1/contacts', contactRoutes);
app.use('api/v1/users', userRoutes);

// middleware to handle 404 errors
app.use((req, res, next) => {
    const error = new Error('Route Does Not Exist 😢');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        }
    });
});

module.exports = app;
