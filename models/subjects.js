const { model, Schema } = require("mongoose");

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

subjectSchema.static("getSubjects", function () {
	return this.find({});
});

subjectSchema.static("getSubject", function (subjectCode) {
	return this.findOne({ subjectCode });
});

subjectSchema.static("addSubject", async function (subjectData) {
    const newSubject = new this(subjectData);
    const savedSubject = await newSubject.save();
	return savedSubject
});

subjectSchema.static("deleteSubject", function (subjectCode) {
	return this.findOneAndDelete({ subjectCode });
});

subjectSchema.static("updateSubject", function(subjectCode, updatedSubject) {
    return this.findOneAndUpdate({ subjectCode: subjectCode }, updatedSubject, {new: true, runValidators: true});
})

const subjectModel = model("subjects", subjectSchema);
module.exports = subjectModel;
