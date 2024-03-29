const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const { connectToMongoDB } = require("./connect");
const { restrictToLoggedInUserOnly, checkAuth } = require("./middlewares/auth");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/static");
const userRoute = require("./routes/user");

const app = express();
dotenv.config();
const PORT = process.env.PORT;

connectToMongoDB(process.env.MONGO_URL)
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
app.use(cookieParser()); // To parse the `cookie` data coming from the browser

app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
