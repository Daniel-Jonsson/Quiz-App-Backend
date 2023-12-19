const mongoose = require("mongoose");

const answersSchema = new mongoose.Schema({
    answer: String,
    correct: Boolean
})

const questionsSchema = new mongoose.Schema({
    question_text: String,
    answers: [answersSchema]
})

const quizSchema = new mongoose.Schema({
    title: String,
    creatorID: Number,
    subjectCode: String,
    questions: [questionsSchema]
})

quizSchema.static('getQuizzes', function () {
    return this.find({});
})

quizSchema.static('getQuiz', function (_id) {
    return this.findOne({_id});
})



const quizModel = mongoose.model("Quiz", quizSchema, "quizzes")

module.exports = quizModel