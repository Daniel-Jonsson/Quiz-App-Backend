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
    creatorID: Number,
    subjectCode: String,
    questions: [questionsSchema]
});

quizSchema.static('getQuizzes', async function () {
    return this.find({});
});

quizSchema.static('getQuiz', async function (_id) {
    return this.findOne({_id});
});

quizSchema.static('addQuiz', async function (quizData) {
    const newQuiz = new this(quizData);
    const savedQuiz = await newQuiz.save();
    return savedQuiz;
})

quizSchema.static('deleteQuiz', async function (_id) {
	return this.findOneAndDelete({_id});
});

quizSchema.static('updateQuiz', async function (_id, updatedQuiz) {
    return this.findOneAndUpdate({ _id: _id}, updatedQuiz, {new: true, runValidators: true})
})


const quizModel = mongoose.model("Quiz", quizSchema, "quizzes")

module.exports = quizModel