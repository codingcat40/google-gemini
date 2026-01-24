const { OpenAI } = require("openai");
require("dotenv").config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports.callOpenAI = async (prompt) => {
  const responseText = await client.responses.create({
    model: "gpt-4.1-mini",
    instructions: "You are a coding assistant that talks like a pirate",
    
    input: prompt,
  });
  return responseText.output_text;
};
