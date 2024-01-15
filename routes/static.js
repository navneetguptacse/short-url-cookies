const express = require("express");
const router = express.Router();
const Url = require("../models/url");

router.get("/", async (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  return res.render("home", {
    name: req.user.name,
    pageTitle: "Quick Linker",
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup", {
    pageTitle: "Sign Up",
  });
});

router.get("/login", (req, res) => {
  return res.render("login", {
    pageTitle: "Login",
  });
});

router.get("/generate", (req, res) => {
  return res.render("generate", {
    pageTitle: "Generate URL",
  });
});

router.get("/view", async (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  const url = await Url.find({ createdBy: req.user.id });
  return res.render("view", {
    urls: url,
    pageTitle: "View URL",
  });
});

module.exports = router;
