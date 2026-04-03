const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/letahDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/Task");
const assistantRoutes = require("./routes/assistantRoutes");


app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/assistant", assistantRoutes);
app.listen(5000, () => {
    console.log("Server running on port 5000");
});