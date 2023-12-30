/**
 * Contains all routes for accessing and modifying quizzes in the database.
 * @author Daniel Jönsson, Robert Kullman
 */

const express = require("express");
const quizRoute = express.Router();
const quizModel = require("../models/quizzes");
const isAuth = require("../middleware/authentication")

/** Gets all available quizzes from the database. */
quizRoute.get("/", (req, res) => {
	quizModel
		.getQuizzes()
		.then((quizzes) => {
			res.status(200).json(quizzes);
		})
		.catch(() => res.status(500).json({message: "Internal Server Error"}));
});

/** Adds a new quiz to the database. */
quizRoute.post("/", isAuth, (req, res) => {
	quizModel
		.addQuiz(req.body)
		.then((response) => {
			console.log(response);
			res.status(201).json(response);
		})
		.catch(() => res.status(500).json({message: "Could not create quiz, try again later."}));
});

/** Retrieves all quizzes made by the logged in user. */
quizRoute.get("/my", isAuth, (req, res) => {
	const user = req.session.user.username;
	quizModel.find({"userName": user}).populate('subject')
	.then((userQuizzes) => {
		res.status(200).json(userQuizzes)
	})
	.catch(() => res.status(500).json({message: "An error occured while getting quizzes, try again later."}))
})

/** Deletes the specified quiz, provided that the user is logged in. */
quizRoute.delete("/:_id", isAuth, async (req, res) => {
	const deleteQuiz = await quizModel.deleteQuiz(req.params._id);

	if(!deleteQuiz) {
		res.status(404).json({message: "Quiz not found"})
	} else {
		res.status(200).json(deleteQuiz);
	}
});

/** Gets a specific quiz based of the provided quiz id. */
quizRoute.get("/:_id", async (req, res) => {
	const targetQuiz = await quizModel.getQuiz(req.params._id);
	if(!targetQuiz) {
		res.status(404).json({message: "Quiz not found"})
	} else {
		res.status(200).json(targetQuiz)
	}
});

/** Updates an existing quiz, provided that the user is logged in. */
quizRoute.put("/:_id", isAuth, async (req, res) => {
	const updatedQuiz = await quizModel.updateQuiz(req.params._id, req.body);
	if(!updatedQuiz) {
		res.status(404).json({message: "Quiz not found"})
	} else {
		res.status(200).json(updatedQuiz);
	}
});


module.exports = quizRoute