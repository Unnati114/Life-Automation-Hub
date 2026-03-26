const express = require("express");
const router = express.Router();
const Task = require("../models/Task");


// ADD TASK
router.post("/add", async (req, res) => {

    try {

        const task = new Task({
            title: req.body.title,
            date: req.body.date
        });

        await task.save();

        res.json({ message: "Task Added" });

    } catch (error) {

        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});


// GET TASK
router.get("/", async (req, res) => {

    try {

        const tasks = await Task.find();

        res.json(tasks);

    } catch (error) {

        res.status(500).json({ message: "Server Error" });
    }
});


// UPDATE TASK
router.put("/update/:id", async (req, res) => {

    console.log("Update API Hit");

    try {

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            message: "Task Updated",
            updatedTask
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});


// DELETE TASK
router.delete("/delete/:id", async (req, res) => {

    console.log("Delete API Hit");

    try {

        await Task.findByIdAndDelete(req.params.id);

        res.json({
            message: "Task Deleted"
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});


module.exports = router;