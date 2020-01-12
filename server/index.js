const app = require('./app');

let port = '';

if (process.env.NODE_ENV == 'test') {
    port = process.env.TEST_PORT || 2400;
} else {
    port = process.env.DEV_PORT || 3600;
}

app.set('port', port);
if(!module.parent) {
    app.listen(app.get('port'), function() {
        console.log( `Server is running on Port: ${app.get('port')}`);
    });
}

module.exports = app;
