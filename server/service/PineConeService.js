const { embedText } = require("../lib/embeddings");
const { index } = require("../lib/PineCone");

module.exports.getRelevantContext = async (userId, prompt) => {
  try {
const queryEmbedding = await embedText(prompt);

const result = await index.query({
  vector: queryEmbedding,
  topK: 5,
  filter: {
    userId,
    type: "memory",
  },
  includeMetadata: true,
});
   

    const contexts = (result.matches || []).map((m) => m.metadata?.text);
    console.log("contexts: ", contexts);
    return contexts;
  } catch (err) {
    console.error("🔴 Pinecone query error:", err);
    return [];
  }
};

module.exports.buildEnhancedPrompt = (facts, userPrompt) => {
  if (!facts.length) {
    return `
        You are an AI assistant.
        The following is a message FROM THE USER:
        "${userPrompt}"
        Respond as the AI assistant.
`;
  }

  return `
    You are an AI assistant.
    You are NOT the user.
    You do NOT have a personal name.

    Known facts about the USER:
    ${facts.map((f) => `- ${f}`).join("\n")}

    The following is a message FROM THE USER:
    "${userPrompt}"

    Respond as the AI assistant.
`;
};
