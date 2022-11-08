const express = require("express");

const data = require("./data.json");

//Set the path for express.static function
app.use("/static", express.static("public"));
app.use("/images", express.static("images"));

