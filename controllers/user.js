const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../services/auth");

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;

  // Add validation for email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.render("signup", { error: "Invalid email format" });
  }

  // Add validation for password length
  if (password.length < 8) {
    return res.render("signup", { error: "Password must be at least 8 characters long" });
  }

  // Add validation for all fields
  if(!name || !email || !password) {
    return res.render("signup", { error: "All fields are required" });
  }

  // check if user already exists
  const existingUser = await User.findOne({ email });

  // If user already exists, render the signup page with an error message
  if (existingUser) {
    return res.render("signup", { error: "User with this email already exists" });
  }
  
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
