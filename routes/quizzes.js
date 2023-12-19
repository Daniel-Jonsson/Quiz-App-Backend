const express = require("express");
const quizRoute = express.Router();
const quizModel = require("../models/quizzes");

quizRoute.get("/", (req, res) => {
	quizModel
		.getQuizzes()
		.then((quizzes) => {
			res.status(200).json(quizzes);
		})
		.catch((err) => console.error(err));
});

quizRoute.get("/:_id", (req, res) => {
    quizModel
    .getQuiz(req.params._id)
    .then((quiz) => {
        res.status(200).json(quiz)
    })
    .catch((err) => console.error(err))
});


module.exports = quizRoute