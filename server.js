projectData = {};
contentDate = {};
// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// Start up an instance of app
const app = express();
/* Middleware*/
//port
const port = 1999;

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
app.listen(port, () => {
  console.log(`Server is running on port : http:localhost:${port}`);
});

//get req for temp
app.get("/getData", (req, res) => {
  res.send(projectData);
});

//get req for conetnt and date
app.get("/content", (req, res) => {
  res.send(contentDate);
});

//to store temp from client side
app.post("/all", (req, res) => {
  projectData = {
    temp: req.body.temp,
  };
  res.send(projectData);
});

//to store date and content from client side
app.post("/date", (req, res) => {
  contentDate = {
    date: req.body.date,
    content: req.body.content,
  };
  res.send(contentDate);
});
