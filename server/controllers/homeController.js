const GeminiModel = require('../models/GeminiModel.js')
const {callGemini} = require('../service/geminiService.js')


module.exports.SendAPIRequest = async (req, res) => {
    try{
        
        const {prompt} = req.body;
        console.log("is this nigga even executing")
        console.log(prompt)

        const userId = req.userId;
        console.log(userId)

        const responseText = await callGemini(prompt)
        console.log(responseText)
        const record = await GeminiModel.create({
            user: userId,
            prompt,
            response:responseText,
        })

         res.status(201).json({message: "Prompt has been sent", responseText});
    }catch(err){
        res.status(500).json({message: "error creating gemini request!"})
    }
}


module.exports.getMyData = async (req, res) => {
    try {   
        const userId = req.userId
        const data = await GeminiModel.find({user: userId})
        if(data.length === 0){
           return res.status(200).json({message: 'No data'})
        }
        res.status(200).json({message: 'Data Has been fetched'}, data)


    } catch (error) {
        console.error("gemini error: ",error)
        res.status(500).json({message: 'Error getting Gemini Data'}, data)
    }
}