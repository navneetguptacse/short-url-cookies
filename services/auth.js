const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = "fbea9214ee055e0bc5902786b7fb7fb0";

function setUser(user) {
  return jwt.sign(
    { _id: user._id, name: user.name, email: user.email },
    ACCESS_TOKEN_SECRET
  );
}

function getUser(ACCESS_TOKEN) {
  try {
    return jwt.verify(ACCESS_TOKEN, ACCESS_TOKEN_SECRET);
  } catch (err) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
