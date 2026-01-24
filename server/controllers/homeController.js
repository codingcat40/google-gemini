const GeminiModel = require('../models/GeminiModel.js')
const {callGemini} = require('../service/geminiService.js');
const { callOpenAI } = require('../service/openAIService.js');


module.exports.SendAPIRequest = async (req, res) => {
    try{
        
        const {prompt,model} = req.body;

        if(!prompt || !model){
            return res.status(400).json({error:  'prompt and model are required'})
        }

        console.log("is this nigga even executing")
        console.log(prompt)
        console.log(model)

        const userId = req.userId;
        console.log(userId)
        let responseText = ''
        switch(model){
            case 'gemini':
                responseText = await callGemini(prompt)
                break;
            case 'gpt-4':
                responseText = await callOpenAI(prompt)
                break;
            default:
                return res.status(400).json({log: 'Unsupported Model'})
                

        }

        console.log(responseText)
        const record = await GeminiModel.create({
            user: userId,
            model,
            prompt,
            response:responseText,
        })

         res.status(201).json({message: "Prompt has been sent", responseText});
    }catch(err){
        res.status(500).json({message: "error creating gemini request!", err})
    }
}


module.exports.getMyData = async (req, res) => {
    try {   
        const userId = req.userId
        const data = await GeminiModel.find({user: userId})
        if(data.length === 0){
           return res.status(200).json({message: 'No data'})
        }
        res.status(200).json({message: 'Data Has been fetched',data})


    } catch (error) {
        console.error("gemini error: ",error)
        res.status(500).json({message: 'Error getting Gemini Data',data})
    }
}


module.exports.deleteQuery = async (req, res) => {
    try{
        const {id} = req.params
        if(!id){
            return res.status(400).json({message:"Id is required"})
        }
        const deleted = await GeminiModel.findByIdAndDelete(id);
        if(!deleted){
            res.status(404).json({message: "Chat not found"})
        }
        res.status(200).json({message: "chat deleted successfully"})
    }catch(err){
        res.status(500).json({Error: 'error deleting'});
    }
}