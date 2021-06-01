const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const md5 = require('md5');
const Restrictions = require("../models/Restrictions");
require("dotenv").config();
const Users = require("../models/users");



router.post("/create_user", async (req, res) => {
  const usermodel = new Users({
    user_name: req.body.user_name,
    user_email: req.body.user_email,
    user_mobile_number: req.body.user_mobile_number,
    user_password: md5(req.body.user_password),
  });

  try {
    const Usermobilecheck = await Users.find({
      user_mobile_number: req.body.user_mobile_number,
    });
    const Useremailcheck = await Users.find({
      user_email: req.body.user_email,
    });
    if (Usermobilecheck.length === 0 && Useremailcheck.length === 0) {
        const user = await usermodel.save();
        const restrictions = new Restrictions({
            user_id:user._id,
            work_time : [],
            non_work_time : []
        })
        restrictions.save()
        res.json({
            Httpcode: 200,
            Message: "User Added Successfully",
            });
    } else {
      res.json({
        Httpcode: 201,
        Message: "Email or Mobile number already Exist",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.json(error.message);
  }
});


router.post("/login", async (req, res) => {
  try {
    const resu = await Users.find({ user_email: req.body.user_email });

    if (resu.length === 1) {
      if (resu[0].user_password === md5(req.body.user_password)) {
        let payload = {
          _id: resu[0]._id,
          user_email: resu[0].user_email,
          user_name: resu[0].user_name,
        };
        jwt.sign(
          { id: resu[0]._id },
          process.env.ACCESS_TOKEN_SECRET,
          (err, token) => {
            res.json({
              Httpcode: 200,
              Message: "login successful",
              Response: { ...payload, token },
            });
          }
        );
      } else {
        res.json({
          Httpcode: 202,
          Message: "Password incorrect",
        });
      }
    } else {
      res.json({
        Httpcode: 202,
        Message: "Email does not exist",
      });
    }
  } catch (error) {
    console.log("error");
    res.json(error.message);
  }
});

module.exports = router;