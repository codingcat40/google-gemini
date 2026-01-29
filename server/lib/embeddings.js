const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

module.exports.embedText = async (text) => {
  const embedding = await client.embeddings.create({
    model: "openai/text-embedding-3-small",
    input: text,
  });

  return embedding.data[0].embedding;
};