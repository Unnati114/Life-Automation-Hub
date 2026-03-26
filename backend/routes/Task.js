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
        res.status(500).json({ error: error.message });
    }
});


// GET TASK
router.get("/all", async (req, res) => {

    try {

        const tasks = await Task.find();
        res.json(tasks);

    } catch (error) {

        res.status(500).json(error);
    }
});


// DELETE
router.delete("/delete/:id", async (req, res) => {

    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });

});


// UPDATE
router.put("/update/:id", async (req, res) => {

    await Task.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        date: req.body.date
    });

    res.json({ message: "Updated" });

});

module.exports = router;