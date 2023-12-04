const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenrateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({
      error: "URL is required",
    });
  }
  const shortId = shortid.generate();
  await URL.create({
    shortID: shortId,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  return res.render("home", { // render home page with short url
    id: shortId,
  });
}

async function handleRedirectURL(req, res) {
  const id = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortID: id,
    },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  return res.redirect(entry.redirectURL);
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortID: shortId });

  if (!result) {
    return res.status(404).json({
      error: "URL not found",
    });
  }

  return res.json({
    totalClicks: result.visitHistory.length,
    visitHistoryAnalytics: result.visitHistory,
  });
}

module.exports = {
  handleGenrateNewShortURL,
  handleRedirectURL,
  handleGetAnalytics,
};
