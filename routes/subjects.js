const express = require("express");
const subjectRoute = express.Router();
const subjectModel = require("../models/subjects");

subjectRoute.get("/", (req, res) => {
	subjectModel
		.getSubjects()
		.then((subjects) => {
			res.status(200).json(subjects);
		})
		.catch(() => res.status(500).json({message: "Internal Server Error"}));
});

subjectRoute.get("/:subjectCode", async (req, res) => {
	const targetSubject = await subjectModel.getSubject(req.params.subjectCode);
	if(!targetSubject) {
		res.status(404).json({message: "Subject not found."})
	} else {
		res.status(200).json(targetSubject);
	}
});

subjectRoute.post("/", async (req, res) => {
	subjectModel
		.addSubject(req.body)
		.then((response) => {
			console.log(response);
			res.status(201).json(response);
		})
		.catch(() => res.status(500).json({message: "Internal Server Error"}));
});

subjectRoute.delete("/:subjectCode", async (req, res) => {
	const targetSubject = await this.subjectModel.deleteSubject(req.params.subjectCode);
	if(!targetSubject) {
		res.status(404).json({message: "Subject not found."})
	} else {
		res.status(200).json(targetSubject)
	}
});

subjectRoute.put("/:subjectCode", async (req, res) => {
	const subjectCode = req.params.subjectCode;
	const updatedSubject = req.body;
	const result = await subjectModel.updateSubject(subjectCode, updatedSubject);
	if(!result) {
		res.status(404).json({message: "Subject not found."})
	} else {
		res.status(200).json(result);
	}
});

module.exports = subjectRoute;
