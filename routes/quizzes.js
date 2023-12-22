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

quizRoute.post("/", (req, res) => {
	quizModel
		.addQuiz(req.body)
		.then((response) => {
			console.log(response);
			res.status(201).json(response);
		})
		.catch((err) => console.log(err));
});

quizRoute.delete("/:_id", (req, res) => {
	quizModel
		.deleteQuiz(req.params._id)
		.then((deletedQuiz) => {
			res.status(200).json(deletedQuiz);
		})
		.catch((err) => console.log(err));
});

quizRoute.put("/:_id", (req, res) => {
    quizModel.updateQuiz(req.params._id, req.body)
    .then((updatedQuiz) => {
        res.status(200).json(updatedQuiz)
    })
    .catch((err) => console.error(err))
});

// get all quizzes made by specific user
quizRoute.get("/my/:userName", (req, res) => {
	quizModel.find({"userName": req.params.userName}).populate('subject')
	.then((myQuizzes) => {
		res.status(200).json(myQuizzes)
	})
	.catch((err) => console.error(err))
})


module.exports = quizRoute