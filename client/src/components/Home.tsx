import React, { useState } from "react";
import { GoogleGenAI } from "@google/genai";

const Home = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [history, setHistory] = useState<Array<string>>([]);
  const [response, setResponse] = useState<string | undefined>("");

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const key = import.meta.env.VITE_API_KEY;
    const ai = new GoogleGenAI({ apiKey: key });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    console.log(response.text);
    setResponse(response.text)
  };


//   to fetch the past items
  const fetchHistory = () => {
    
  }

  return (
    <div className="flex h-screen">
      <div className="hidden md:block w-64 bg-red-200 border-r p-4">
        Request History
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white p-4 md:p-6 flex flex-col">
        {/* Chat box */}
        <div className="flex-1 rounded-2xl border min-h-[400px] md:min-h-[648px] overflow-y-auto">
          {/* messages/content here */}
        </div>

        {/* Input area */}
        <div className="flex flex-col md:flex-row items-stretch gap-2 mt-4">
          <textarea
            className="flex-1 bg-red-100 rounded-2xl p-2 resize-none min-h-[100px] md:min-h-[60px]"
            value={prompt}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setPrompt(e.target.value)
            }
            placeholder="Ask Anything..."
          />
          <button
            className="bg-black text-white px-6 py-2 rounded-2xl md:w-auto w-full"
            onClick={handleSubmit}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
