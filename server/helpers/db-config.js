const mongoose = require('mongoose');

let db = mongoose.connection;

if (process.env.NODE_ENV == 'test') {
    connectDB(process.env.TEST_MONGODB_URI);
} else {
    connectDB(process.env.PROD_MONGODB_URI);
}

// listen for DB connect event
db.on('open', () => {
    console.log('Database Connected!');
});

// listen for DB connection error event
db.on('error', (error) => {
    console.log(`Failed to connect to Database. \n${error}`);
});

function connectDB(dbURL) {
    mongoose.connect(dbURL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
}
