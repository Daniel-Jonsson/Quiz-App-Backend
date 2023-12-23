const express = require("express");
const userRoute = express.Router();
const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const isAuth = require("../middleware/authentication")


userRoute.get("/isSignedIn", isAuth, (req, res) => {
	res.status(200).json();
});


userRoute.get("/logout", (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			res.status(500).json({ message: "Internal Server Error." });
		} else {
			res.status(200).json({message: "Successfully logged out."});
		}
	});
});
userRoute.post("/login", async (req, res) => {
	const { userName, password } = req.body;
	if (userName && password) {
		const foundUser = await userModel.getUser(userName);
		if (!foundUser) {
			res.status(404).json({ message: "User not found." });
			return;
		}

		const match = await bcrypt.compare(password, foundUser.password);
		if (!match) {
			res.status(401).json({ message: "Invalid credentials." });
			return;
		}
		if (req.session.authenticated) {
			res.status(200).json(req.session);
		} else {
			req.session.authenticated = true;
			req.session.user = {
				id: foundUser._id,
				username: userName,
			};
			res.status(200).json(req.session)
		}
	} else {
		res.status(403).json({ message: "Invalid credentials." });
	}
});

userRoute.post("/signup", (req, res) => {
	userModel
		.addUser(req.body)
		.then((result) => {
			res.status(201).json(result);
		})
		.catch(() => {
			res.status(409).json({ message: "Username already exists." });
		});
});

userRoute.put("/:userName", (req, res) => {
	userModel
		.updateUser(req.params.userName, req.body)
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((err) => {
			console.log(err);
		});
});

module.exports = userRoute;
