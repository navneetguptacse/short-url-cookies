const { getUser } = require("../services/auth");

async function restrictToLoggedInUserOnly(req, res, next) { // This middleware is used to check if the user is logged in or not
  const userUid = req.cookies.uid;
  if (!userUid) {
    return res.redirect("/login");
  }
  const user = getUser(userUid);
  if (!user) {
    return res.redirect("/login");
  }
  req.user = user;
  next();
}

// Little-bit confusing, but this middleware is used to send the `user object` to the next middleware/route handler
async function checkAuth(req, res, next) {
  const userUid = req.cookies.uid;
  const user = getUser(userUid);
  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedInUserOnly,
  checkAuth,
};
