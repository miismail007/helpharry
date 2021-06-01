const mongoose = require("mongoose");

const Userschema = mongoose.Schema({
  user_name: {
    type: String,
    default: "",
  },
  user_email: {
    type: String,
    default: "",
  },
  user_password: {
    type: String,
    default: "",
  },
  user_mobile_number: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Users", Userschema, "Users_table");
