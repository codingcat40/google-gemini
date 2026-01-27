const { GoogleGenAI } = require("@google/genai");

module.exports.callGemini = async (prompt, role) => {
  const key = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({ apiKey: key });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: role == 'user' || role == 'model' ? role : 'user',
        parts: [{ text: prompt }],
      },
    ],
  });

  return response.text;
};
