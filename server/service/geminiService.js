const axios = require('axios')
const {GoogleGenAI} = require('@google/genai')

module.exports.callGemini = async (prompt) => {
        const key = process.env.API_KEY
        const ai = new GoogleGenAI({ apiKey: key });
        const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
        })

        return response.text;
}