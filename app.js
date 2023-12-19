require('dotenv').config()
const express = require("express");
const cors = require("cors");
const connectDB = require('./database');



const app = express();
const BASE_API_URL = '/api/v1' // Kanske får ändra denna om vi vill sen
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes

connectDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

app.get("/", function (req, res) {
	res.send("Backend is running");
});
