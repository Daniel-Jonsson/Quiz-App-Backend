/**
 * Database connection.
 * @author Daniel Jönsson, Robert Kullman
 */

require('dotenv').config()
const mongoose = require('mongoose');

/** Establishes connection to the database. */
module.exports = function connectDB() {
    mongoose.connect(process.env.APP_DATABASE)
    .then(() => console.log("Database is connected"))
    .catch((err) => console.log("Error connecting to MongoDB: ", err));
}