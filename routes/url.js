const express = require("express");
const {
  handleGenrateNewShortURL,
  handleRedirectURL,
  handleGetAnalytics,
} = require("../controllers/url");
const routes = express.Router();

routes.post("/", handleGenrateNewShortURL);
routes.get("/:shortId", handleRedirectURL);
routes.get("/analytics/:shortId", handleGetAnalytics);

module.exports = routes;
