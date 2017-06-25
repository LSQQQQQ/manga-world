var express = require("express");
var app = express();
var appController = require("./controllers/appController");

app.use(express.static("./public"));

appController(app);

app.listen(3000);