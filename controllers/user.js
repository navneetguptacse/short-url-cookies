const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../services/auth");

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  // Add validation for email and password
  
  const newUser = await User.create({ name, email, password });
  const sessionId = uuidv4();
  setUser(sessionId, { id: newUser._id, name: newUser.name, email: newUser.email });
  res.cookie("uid", sessionId);
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", { error: "Invalid email or password" });
  }
  const sessionId = uuidv4();
  setUser(sessionId, { id: user._id, name: user.name, email: user.email });
  res.cookie("uid", sessionId);
  return res.redirect("/");
}

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
