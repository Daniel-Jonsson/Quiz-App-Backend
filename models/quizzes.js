const mongoose = require("mongoose");

const answersSchema = new mongoose.Schema({
    answer: String,
    correct: Boolean
})

const questionsSchema = new mongoose.Schema({
    question_text: String,
    answers: [answersSchema]
})

const quizesSchema = new mongoose.Schema({
    title: String,
    creatorID: Number,
    subjectCode: String,
    questions: [questionsSchema]
})

const quizesModel = mongoose.model("Quiz", quizesSchema, "quizzes")

module.exports = quizesModel