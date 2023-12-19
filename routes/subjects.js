const express = require("express");
const subjectRoute = express.Router();
const subjectModel = require("../models/subjects");

subjectRoute.get("/", (req, res) => {
	subjectModel
		.getSubjects()
		.then((subjects) => {
			res.status(200).json(subjects);
		})
		.catch((err) => console.error(err));
});

subjectRoute.get("/:subjectCode", (req, res) => {
	subjectModel
		.getSubject(req.params.subjectCode)
		.then((subject) => {
			res.status(200).json(subject);
		})
		.catch((err) => console.error(err));
});



module.exports = subjectRoute;
