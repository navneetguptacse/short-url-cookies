const express = require("express");
const path = require("path");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/static");
const { connectToMongoDB } = require("./connect");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.set("view engine", "ejs"); // Setting up the view engine
app.set("views", path.resolve("./views")); // Setting up the views directory

app.use(express.json()); // To parse the `json` data coming from the browser
app.use(express.urlencoded({ extended: true })); // To parse the `form` data coming from the browser

app.use("/url", urlRoute);

app.use("/", staticRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
