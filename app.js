const express = require("express");
const data = require("./data.json");
const app = express();
const port = 3000;


//Set the path for express.static function
app.use("/static", express.static("public"));
app.use("/images", express.static("images"));

//Middleware Set Up
app.set('view engine', 'pug');