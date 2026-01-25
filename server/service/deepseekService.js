require('dotenv').config()
const {OpenAI} = require('openai')

const client = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.DEEPSEEK_API_KEY,
})

module.exports.callDeepSeek = async (prompt) => {
  const completion = await client.chat.completions.create({
  model: "tngtech/deepseek-r1t2-chimera:free",
  messages: [
    { role: "user", content: prompt }
  ],
});

return completion.choices[0].message.content;
};