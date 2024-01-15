const shortid = require("shortid");
const Url = require("../models/url");

async function handleGenrateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({
      error: "Url is required",
    });
  }

  const shortId = shortid.generate();
  await Url.create({
    shortID: shortId,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user.id,
  });

  return res.render("generate", {
    shortID: shortId,
  });
}

async function handleRedirectURL(req, res) {
  const shortId = req.params.shortId;
  const entry = await Url.findOneAndUpdate(
    {
      shortID: shortId,
    },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  return res.redirect(entry.redirectURL);
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await Url.findOne({ shortID: shortId });

  if (!result) {
    return res.status(404).json({
      error: "Url not found",
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
