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
	}
});

subjectSchema.static("getSubjects", function () {
	return this.find({});
});

subjectSchema.static("getSubject", function (subjectCode) {
	return this.findOne({ subjectCode });
});

const subjectModel = model("subjects", subjectSchema);
module.exports = subjectModel;