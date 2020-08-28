import express from "express";
import expressHandlebars from "express-handlebars";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import config from "./../config.json";
import router from "./router";
import init from "./init";
import handlebars from "./handlebars";

const app = express();
const port = 3000;
handlebars();

// Connect to Database
const databaseUri = config.database.uri;
const databaseOptions = config.database.options;
mongoose.connect(databaseUri, databaseOptions, async(error) => {
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

app.listen(port, () => {
  console.log("Server is running on port", port);
});
