const express = require("express");
const router = express.Router();
const auth = require("../auth");
const Schedules = require("../models/Schedules");



router.post("/add_work_time",auth, async (req, res) => {
    try {
        const schedule = new Schedules({
            user_id:req.body.user_id,
            days:req.body.days,
            from_time:req.body.from_time,
            to_time:req.body.to_time
        })
        await schedule.save()
        res.json({
            Httpcode: 200,
            Message: "Work time Added Successfully",
        });
    } catch (error) {
        console.log(error.message);
        res.json(error.message);
    }
});

router.get("/get_work_time", auth,async (req, res) => {
    try {
        const schedules = await (await Schedules.find({
            user_id: req.query.user_id
        })).reverse();
        res.json({
            Httpcode: 200,
            Response: schedules
        })
    } catch (error) {
        console.log(error.message);
        res.json({error:error.message})
    }
});


router.post("/update_work_time",auth, async (req, res) => {
    try {
        const schedule = await Schedules.findByIdAndUpdate(req.body.schedule_id,{
            days:req.body.days,
            from_time:req.body.from_time,
            to_time:req.body.to_time,
        });
        res.json({
            Httpcode: 200,
            Message: "Work time Updated Successfully",
        });
    } catch (error) {
        console.log(error.message);
        res.json(error.message);
    }
});

router.get("/delete_work_time", auth,async (req, res) => {
    try {
        await Schedules.findByIdAndRemove(req.query.schedule_id);
        res.json({
            Httpcode: 200,
            Response: "Work time deleted"
        })
    } catch (error) {
        console.log(error.message);
        res.json({error:error.message})
    }
});
module.exports = router;