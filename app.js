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
const BASE_API_URL = '/api/v1' // Kanske får ändra denna om vi vill sen
const port = process.env.PORT;

connectDB();

const store = new mongoDbSession({
	uri: process.env.APP_DATABASE,
	collection: 'userSessions'
});

app.use(
	session({
		secret: "secret",
		cookie: { maxAge: 30000 },
		resave: true,
		saveUninitialized: false,
		store: store
	})
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

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
