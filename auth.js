const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  if (req.headers.authorization === undefined) {
    return res.json({
      Httpcode: 401,
      Message: "No token, Authorization denied",
    });
  } else {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.json({
        Httpcode: 401,
        Message: "No token, Authorization denied",
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.body = { ...req.body, decoded };
      next();
    } catch (error) {
      res.json({
        Httpcode: 401,
        Message: "Token Not Valid",
      });
    }
  }
};
