const jwt = require("jsonwebtoken");
require("dotenv").config();
const Users = require("./models/Users");

module.exports = async function (req, res, next)  {
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
      console.log(decoded.id);
      const users = await Users.find();      
      users.map(user => {
        if(user._id === decoded.id){
          req.body = { ...req.body, decoded };
          next();
        }else{
          res.json({
            Httpcode: 401,
            Message: "Token Not Valid",
          });
        }
      })
    } catch (error) {
      res.json({
        Httpcode: 401,
        Message: "Token Not Valid",
      });
    }
  }
};
