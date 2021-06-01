const mongoose = require("mongoose");

const ScedulesSchema = mongoose.Schema({
  user_id: {
    type: String,
    required:true,
  },
  days : {
    type:Object,
    default:{
            monday:false,
            tuesday:false,
            wednesday:false,
            thursday:false,
            friday:false,
            saturday:false,
            sunday:false
        }
  },
  from_time:{
      type:String,
      default:"",
  },
  to_time:{
      type:String,
      default:"",
  }
});

module.exports = mongoose.model("Scedules", ScedulesSchema, "Scedules_table");