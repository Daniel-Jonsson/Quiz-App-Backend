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

subjectRoute.post("/", (req, res) => {
	subjectModel
		.addSubject(req.body)
		.then((response) => {
			console.log(response);
			res.status(201).json(response);
		})
		.catch((err) => console.log(err));
});

subjectRoute.delete("/:subjectCode", (req, res) => {
	subjectModel
		.deleteSubject(req.params.subjectCode)
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((err) => console.log(err));
});

subjectRoute.put("/:subjectCode", (req, res) => {
	const subjectCode = req.params.subjectCode;
	const updatedSubject = req.body;
	subjectModel.updateSubject(subjectCode, updatedSubject)
    .then((updatedSubject) => {
        res.status(200).json(updatedSubject)
    })
    .catch((err) => console.log(err))
});

module.exports = subjectRoute;
