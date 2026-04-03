const Assistant = require("../models/assistantModel");


// Save question

exports.askAssistant = async (req,res)=>{

    try{

        const {question} = req.body;

        let answer = "This is AI response for: " + question;

        const data = new Assistant({

            question,
            answer
        });

        await data.save();

        res.json({
            message:"Saved",
            data
        });

    }catch(error){

        res.status(500).json({
            message:"Server error"
        });

    }
};


// Get all history

exports.getHistory = async (req,res)=>{

    const history = await Assistant.find();

    res.json(history);
};


// Delete history

exports.deleteHistory = async (req,res)=>{

    await Assistant.findByIdAndDelete(req.params.id);

    res.json({
        message:"Deleted"
    });

};