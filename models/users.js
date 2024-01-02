/**
 * Specifies the user model and the user schema, along with 
 * static functions for accessing and modifying data.
 * @author Daniel Jönsson, Robert Kullman
 */

const { model, Schema } = require("mongoose");
const bcrypt = require('bcrypt'); 

/** Schema for user. */
const userSchema = new Schema({
	firstName: {
		type: String,
		required: true,
		trim: true,
	},
    lastName: {
        type: String,
        trim: true
    },
    userName: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        minLength: 4
    },
    password: {
        type: String,
        minLength: 4,
    },
    isAdmin: {
        type: Boolean
    }
});

/** Retrieves all users from the database. */
userSchema.static('getUsers', function () {
    return this.find({});
})

/** Retrieves a specific user based on userName parameter */
userSchema.static('getUser', function (userName) {
    return this.findOne({userName});
});

/** Adds a new user to the database based on the provided user data. */
userSchema.static('addUser', async function(userData) {
    const newUser = new this(userData);
    const savedUser = await newUser.save();
    return savedUser
});

/** Updates the information of an existing user. */
userSchema.static('updateUser', async function (userName, updatedData) {
    const user = await this.findOne({userName});
    if(!user) {
        return null;
    }
    Object.assign(user, updatedData)
    return user.save();
});

/** deletes a user from the database. */
userSchema.static('deleteUser', function (userName) {
    return this.findOneAndDelete({userName});
});

/** Pre hook which hashes user password before proceeding with storing to database. */
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	this.password = await bcrypt.hash(this.password, 10);
});

/** The user model. */
const userModel = model("users", userSchema, "users");

module.exports = userModel;