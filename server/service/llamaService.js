const {OpenRouter}  = require('@openrouter/sdk')

const openrouter = new OpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY
})


module.exports.callLLama = async (prompt) => {

const stream = await openrouter.chat.send({
    model: "meta-llama/llama-3.3-70b-instruct:free",
    messages: [
        {
            "role": "system",
            "content": prompt
        }
    ],
    stream: true
})
let fullText = "";
for await (const chunk of stream){
    const content = chunk.choices[0]?.delta?.content;
    if(content){
        fullText += content
    }
}
    return fullText;
}