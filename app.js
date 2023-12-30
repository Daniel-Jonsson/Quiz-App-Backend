/** 
 * Starting point for backend.
 * @author Daniel Jönsson, Robert Kullman
 */

require('dotenv').config()
const express = require("express");
const cors = require("cors");
const session = require('express-session');
const mongoDbSession = require('connect-mongodb-session')(session)

const connectDB = require('./database');
const subjectRoute = require('./routes/subjects');
const quizRoute = require('./routes/quizzes')
const userRoute = require('./routes/users');


const app = express();
const BASE_API_URL = '/api/v1' 
const port = process.env.PORT;
const allowedOrigins = ["http://localhost:4200", "https://studenter.miun.se"];

app.use(
	cors({
		origin: allowedOrigins,
		credentials: true,
	})
);
app.set('trust proxy', 1)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

const store = new mongoDbSession({
	uri: process.env.APP_DATABASE,
	collection: 'userSessions'
});

// use session middleware
app.use(
	session({
		secret: "secret",
		cookie: {
			sameSite: 'none',
			secure: true,
			httpOnly: true,
			maxAge: 1000 * 60 * 30,
		},
		resave: false,
		saveUninitialized: false,
		store: store,
	})
);

// Routes
app.use(`${BASE_API_URL}/subjects`, subjectRoute);
app.use(`${BASE_API_URL}/quizzes`, quizRoute);
app.use(`${BASE_API_URL}/users`, userRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

app.get("/", function (req, res) {
	res.send("Backend is running");
});
