 const {OpenAI} = require('openai')

 const client = new OpenAI({
    apiKey:  process.env.OPENAI_API_KEY
 });

 module.exports.callOpenAI = async () => {
    await client.responses.create({
        model: 'gpt-4-0613',
        instructions: 'You are a coding assistant that talks like a pirate',
        input: 'Are semicolons optional in Javascript?'
    })
 }
 