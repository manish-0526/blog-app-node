const mongoose = require('mongoose');
require('dotenv').config();

function connectToMongodb() {
    mongoose.connect(`${process.env.MONGO_CONNECTION_STRING}/${process.env.MONGO_DB_NAME}`);

    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
        console.error(err);
        console.log('Failed to connect to MongoDB');
    });
}

module.exports = { connectToMongodb };