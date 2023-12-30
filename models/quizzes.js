/**
 * Specifies the quiz model, its quiz schema with sub-schemas for questions and answers, along with 
 * static functions for accessing and modifying data.
 * @author Daniel Jönsson, Robert Kullman
 */

const mongoose = require("mongoose");
/** Schema for an answer alternative of a quiz question. */
const answersSchema = new mongoose.Schema({
    answer: String,
    correct: Boolean
});

/** Schema for a question in a quiz. */
const questionsSchema = new mongoose.Schema({
    question_text: String,
    answers: [answersSchema]
});

/** Schema for a quiz. */
const quizSchema = new mongoose.Schema({
	title: String,
    description: String,
	userName: String,
	subject: { type: mongoose.Schema.ObjectId, ref: "subjects" },
	questions: [questionsSchema],
});

/** 
 * Retrieves all available quizzes, populating the subject property with the corresponding subject name.
 */
quizSchema.static('getQuizzes', async function () {
    return this.find({}).populate('subject');
});

/**
 * Retrieves a specific quiz based on the provided _id parameter, populating the subject property with
 * the corresponding subject name.
 */
quizSchema.static('getQuiz', function (_id) {
    return this.findOne({_id}).populate('subject');
});

/**
 * Adds a new quiz to the database based on the provided quizData parameter. Returns the created quiz 
 * with subject property populated with the pertinent subject name.
 */
quizSchema.static('addQuiz', async function (quizData) {
    const newQuiz = new this(quizData);
    const savedQuiz = await newQuiz.save();
    return savedQuiz.populate('subject');
})

/**
 * Deletes a quiz based on the provided _id parameter.
 */
quizSchema.static('deleteQuiz', function (_id) {
	return this.findOneAndDelete({_id});
});

/**
 * Updates a quiz based on the provided _id and quiz data.
 */
quizSchema.static('updateQuiz', async function (_id, updatedQuiz) {
    return this.findOneAndUpdate({ _id: _id}, updatedQuiz, {new: true, runValidators: true});
})

/** The quiz model. */
const quizModel = mongoose.model("Quiz", quizSchema, "quizzes");

 
module.exports = quizModel;