var express = require("express");

var app = express();
var port = 3000;

// Error Handling 404, 500
app.use((req, res, next) => {
  console.warn("404 Page Not Found", req.url);
  res.sendStatus(404);
  return;
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
  return;
});

app.listen(port, function() {
  console.log("Server is running on port", port);
});
