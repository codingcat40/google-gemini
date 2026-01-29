const { storePrompt } = require("../lib/upsert");
const { callGemini } = require("./geminiService");
const { callOpenAI, callDeepSeek, callLLama } = require("./LLMService");
const {
  getRelevantContext,
  buildEnhancedPrompt,
} = require("./PineConeService");

// fact extraction 

async function extractFactsLLM(userPrompt) {
  const extractorPrompt = `
You are a memory extraction system.

Extract ONLY stable, long-term facts about the USER from the message below.

Rules:
- Extract facts that are likely to remain true
- Do NOT extract questions, greetings, or temporary info
- Do NOT extract assistant information
- If the message contains no facts, return an empty array
- Write facts in canonical form

Canonical examples:
- User name: ...
- User age: ...
- User role: ...
- User tech stack: ...
- User preference: ...
- User location: ...

User message:
"${userPrompt}"

Return ONLY valid JSON as an array of strings.
`;

  const raw = await callOpenAI(extractorPrompt, "system");

  try {
    const facts = JSON.parse(raw);
    return Array.isArray(facts) ? facts : [];
  } catch {
    return [];
  }
}


async function persistMemory(userId, facts) {
  for (const fact of facts) {
    await storePrompt(userId, fact, "memory");
  }
}


module.exports.enhancedChat = async (userId, userPrompt, role, model) => {
  // Retrieve EXISTING memory
  const existingMemory = await getRelevantContext(userId, userPrompt);

  // Extract NEW facts from this message
  const newFacts = await extractFactsLLM(userPrompt);

  // Merge memory
  const allFacts = Array.from(new Set([...existingMemory, ...newFacts]));

  const enhancedPrompt = buildEnhancedPrompt(allFacts, userPrompt);

  console.log("Injected memory:", allFacts);
  console.log("enhanced prompt: ", enhancedPrompt);

  let response;

  switch (model) {
    case "gemini":
      response = await callGemini(enhancedPrompt, role);
      break;
    case "gpt-4":
      response = await callOpenAI(enhancedPrompt, role);
      break;
    case "deepseek":
      response = await callDeepSeek(enhancedPrompt, role);
      break;
    case "Llama":
      response = await callLLama(enhancedPrompt, role);
      break;
    default:
      throw new Error("Unsupported model");
  }

  await persistMemory(userId, newFacts);

  return response;
};
