const mongoose = require("mongoose");

const RestrictionsSchema = mongoose.Schema({
  user_id: {
    type: String,
    required:true,
  },
  work_time:{
    type:Array,
    default:[]
  },
  non_work_time:{
    type:Array,
    default:[],
  }
});

module.exports = mongoose.model("Restrictions", RestrictionsSchema, "Restrictions_table");