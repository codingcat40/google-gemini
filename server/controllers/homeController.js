const GeminiModel = require('../models/GeminiModel.js')
const {callGemini} = require('../service/geminiService.js')


module.exports.SendAPIRequest = async (req, res) => {
    try{
        const {prompt} = req.body;
        const userId = req.userId;

        const responseText = await callGemini(prompt)
        const record = await GeminiModel.create({
            user: userId,
            prompt,
            response:responseText,
        })

        res.json({response: responseText});
    }catch(err){
        res.status(500).json({message: "error creating gemini request!"})
    }
}


module.exports.getMyData = async (req, res) => {
    try {   
        const userId = req.userId
        const data = await GeminiModel.find({user: userId})
        if(!data){
           return res.status(200).json({message: 'No data'})
        }
        res.status(201).json({message: 'Data Has been fetched'})

        
    } catch (error) {
        res.status(500).json({message: 'Error getting Gemini Data'}, data)
    }
}