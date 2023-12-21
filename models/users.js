const { model, Schema } = require("mongoose");
const bcrypt = require('bcrypt');

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

userSchema.static('getUsers', function () {
    return this.find({});
})

userSchema.static('getUser', function (userName) {
    return this.findOne({userName});
});

userSchema.static('addUser', async function(userData) {
    const newUser = new this(userData);
    const savedUser = await newUser.save();
    return savedUser
});

userSchema.static('updateUser', async function (userName, updatedData) {
    const user = await this.findOne({userName});
    if(!user) {
        return null;
    }
    Object.assign(user, updatedData)
    return user.save();
});

userSchema.static('deleteUser', function (userName) {
    return this.findOneAndDelete({userName});
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	this.password = await bcrypt.hash(this.password, 10);
});

const userModel = model("users", userSchema, "users");
module.exports = userModel;