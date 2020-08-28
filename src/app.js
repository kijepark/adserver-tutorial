var express = require("express");
var expressHandlebars = require("express-handlebars");
var mongoose = require("mongoose");
var mongooseSequence = require("mongoose-sequence")(mongoose);
var bodyParser = require("body-parser");

// Declare Global Variables
global.mongooseSequence = mongooseSequence;

var config = require("./../config.json");
var router = require("./router");
var init = require("./init");
var handlebars = require("./handlebars")();

var app = express();
var port = 3000;

// Connect to Database
var databaseUri = config.database.uri;
var databaseOptions = config.database.options;
mongoose.connect(databaseUri, databaseOptions, async function(error) {
  if (error) {
    console.error(error);
    return;
  }
  console.log("MongoDB connected");

  // Creates Default Data
  init();
});

// Set Template Engine
app.engine("handlebars", expressHandlebars({
  layoutsDir: __dirname + "/../views/layouts/",
  partialsDir: __dirname + "/../views"
}));
app.set("view engine", "handlebars");

// Set Middlewares
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static("public"));
app.use(router);

// Error Handling 404, 500
app.use(function(req, res, next) {
  console.warn("404 Page Not Found", req.url);
  res.sendStatus(404);
  return;
});

app.use(function(error, req, res, next) {
  console.error(error);
  res.sendStatus(500);
  return;
});

app.listen(port, function() {
  console.log("Server is running on port", port);
});
