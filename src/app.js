var express = require("express");
var expressHandlebars = require("express-handlebars");

var router = require("./router");

var app = express();
var port = 3000;

// Set Template Engine
app.engine("handlebars", expressHandlebars({
  layoutsDir: __dirname + "/../views/layouts/"
}));
app.set("view engine", "handlebars");

// Set Middlewares
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
