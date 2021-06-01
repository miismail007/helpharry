const express = require("express");
var axios = require("axios");
const mongoose = require("mongoose");
var moment = require("moment-timezone");
const url =
  "mongodb+srv://ismail:I$m@i|@12333@harryhelp.aummm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const app = express();
var cors = require("cors");

// Routers
const UsersRouter = require("./routes/users");
const SchedulesRouter = require("./routes/Schedules");
const RestrictionsRouter = require("./routes/Restrictions");




app.use(cors());


mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const con = mongoose.connection;


con.on("open", () => {
  console.log("connected to mongo");
});
app.use(express.json());

//router middlewares
app.use("/users", UsersRouter);
app.use("/schedules", SchedulesRouter);
app.use("/restrictions", RestrictionsRouter);
const port = 80;
var server = app.listen(port, async () => {
  console.log(`listening to port ${port}`);
});
