const mongoose = require("mongoose");

const answersSchema = new mongoose.Schema({
    answer: String,
    correct: Boolean
});

const questionsSchema = new mongoose.Schema({
    question_text: String,
    answers: [answersSchema]
});

const quizSchema = new mongoose.Schema({
	title: String,
    description: String,
	userName: String,
	subject: { type: mongoose.Schema.ObjectId, ref: "subjects" },
	questions: [questionsSchema],
});

quizSchema.static('getQuizzes', async function () {
    return this.find({}).populate('subject')
});

quizSchema.static('getQuiz', function (_id) {
    return this.findOne({_id}).populate('subject');
});

quizSchema.static('addQuiz', async function (quizData) {
    const newQuiz = new this(quizData);
    const savedQuiz = await newQuiz.save();
    return savedQuiz.populate('subject');
})

quizSchema.static('deleteQuiz', function (_id) {
	return this.findOneAndDelete({_id});
});

quizSchema.static('updateQuiz', async function (_id, updatedQuiz) {
    return this.findOneAndUpdate({ _id: _id}, updatedQuiz, {new: true, runValidators: true})
})


const quizModel = mongoose.model("Quiz", quizSchema, "quizzes")

module.exports = quizModel