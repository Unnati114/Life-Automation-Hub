const express = require("express");

const router = express.Router();

const {
    askAssistant,
    getHistory,
    deleteHistory
} = require("../controllers/assistantController");


router.post("/ask", askAssistant);

router.get("/history", getHistory);

router.delete("/delete/:id", deleteHistory);

module.exports = router;