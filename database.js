require('dotenv').config()
const mongoose = require('mongoose');

module.exports = function connectDB() {
    mongoose.connect(process.env.APP_DATABASE)
    .then(() => console.log("Database is connected"))
    .catch((err) => console.log("Error connecting to MongoDB: ", err));
}