const express = require("express");
const router = express.Router();
const auth = require("../auth");
const Restrictions = require("../models/Restrictions");



router.post("/apps_work_time",auth, async (req, res) => {
    try {
        const checkRestriction = await Restrictions.find({user_id:req.body.user_id})
        if(checkRestriction.length !== 0){
            await Restrictions.findOneAndUpdate({
                user_id:req.body.user_id
            },{
                work_time : req.body.apps
            })
            res.json({
                Httpcode: 200,
                Message: "Work Time Apps Added Successfully",
            });
        }else{
            res.json({
                Httpcode: 201,
                Message: "User id does not match",
            });
        }
    } catch (error) {
        console.log(error.message);
        res.json(error.message);
    }
});

router.post("/apps_non_work_time",auth, async (req, res) => {
    try {
        const checkRestriction = await Restrictions.find({user_id:req.body.user_id})
        if(checkRestriction.length !== 0){
            let applist = checkRestriction[0].non_work_time
            applist.push(req.body.app)
            await Restrictions.findOneAndUpdate({
                user_id:req.body.user_id
            },{
                non_work_time : applist
            })
            res.json({
                Httpcode: 200,
                Message: "Non Work Time Apps Added Successfully",
            });
        }else{
            res.json({
                Httpcode: 201,
                Message: "User id does not match",
            });
        }
    } catch (error) {
        console.log(error.message);
        res.json(error.message);
    }
});

router.get("/get_apps", auth,async (req, res) => {
    try {
        const restrictions = await Restrictions.findOne({
            user_id: req.query.user_id
        })
        res.json({
            Httpcode: 200,
            Response: restrictions
        })
    } catch (error) {
        console.log(error.message);
        res.json({error:error.message})
    }
});


router.post("/update_non_work_time",auth, async (req, res) => {
    try {
        const checkRestriction = await Restrictions.find({user_id:req.body.user_id})
        if(checkRestriction.length !== 0){
            let applist = checkRestriction[0].non_work_time
            for(app of applist){
                if(app.app == req.body.app){
                    app.weekdays = req.body.weekdays
                    app.weekend = req.body.weekend
                }
            }
            await Restrictions.findOneAndUpdate({
                user_id:req.body.user_id
            },{
                non_work_time : applist
            })
            res.json({
                Httpcode: 200,
                Message: "Non Work Time App updated Successfully",
            });
        }else{
            res.json({
                Httpcode: 201,
                Message: "User id does not match",
            });
        }
    } catch (error) {
        console.log(error.message);
        res.json(error.message);
    }
});

router.get("/delete_non_work_time", auth,async (req, res) => {
    try {
        const checkRestriction = await Restrictions.find({user_id:req.query.user_id})
        if(checkRestriction.length !== 0){
            let applist = checkRestriction[0].non_work_time
            let index = 0
            for(app of applist){
                if(app.app == req.query.app){
                    break
                }
                index++
            }
            applist.splice(index,1)
            await Restrictions.findOneAndUpdate({
                user_id:req.query.user_id
            },{
                non_work_time : applist
            })
            res.json({
                Httpcode: 200,
                Message: "Non Work Time App deleted Successfully",
            });
        }else{
            res.json({
                Httpcode: 201,
                Message: "User id does not match",
            });
        }
    } catch (error) {
        console.log(error.message);
        res.json({error:error.message})
    }
});
module.exports = router;