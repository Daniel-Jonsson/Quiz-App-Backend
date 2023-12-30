/**
 * Specifies the subject model and the subject schema , along with 
 * static functions for accessing and modifying data.
 * @author Daniel Jönsson, Robert Kullman
 */

const { model, Schema } = require("mongoose");

/** Schema for a quiz subject. */
const subjectSchema = new Schema({
	subjectName: {
		type: String,
		required: true,
		trim: true,
	},
	subjectCode: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		uppercase: true,
		maxLength: 3,
	},
	description: {
		type: String,
		trim: true,
	},
});

/** Retrieves all subjects. */
subjectSchema.static("getSubjects", function () {
	return this.find({});
});

/** Retrieves a specific subject based on the subject code parameter. */
subjectSchema.static("getSubject", function (subjectCode) {
	return this.findOne({ subjectCode });
});

/** Adds a new subject based on the provided data. */
subjectSchema.static("addSubject", async function (subjectData) {
    const newSubject = new this(subjectData);
    const savedSubject = await newSubject.save();
	return savedSubject
});

/** Deletes the specified subject. */
subjectSchema.static("deleteSubject", function (subjectCode) {
	return this.findOneAndDelete({ subjectCode });
});

/** Updates a subject based on the provided _id and updatedSubject parameters */
subjectSchema.static("updateSubject", function(subjectCode, updatedSubject) {
    return this.findOneAndUpdate({ subjectCode: subjectCode }, updatedSubject, {new: true, runValidators: true});
})

/** The subject model */
const subjectModel = model("subjects", subjectSchema);
module.exports = subjectModel;
