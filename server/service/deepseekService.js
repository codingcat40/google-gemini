require('dotenv').config()
const {OpenAI} = require('openai')

const client = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY,
})

module.exports.callDeepSeek = async (prompt) => {
        const completion = await client.chat.completions.create({
        model: "tngtech/deepseek-r1t2-chimera:free",
        messages: [
            { role: "user", content: prompt },
            
        ],
        stream: true,
});

let fullText = "";
for await (const chunk of stream){
    const content = chunk.choices[0]?.delta?.content;
    if(content){
        fullText += content
    }
}
    return fullText;
}