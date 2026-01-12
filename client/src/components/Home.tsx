import React, { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown'
import Loading from "./Loading";
import axios from "axios";

const Home = () => {

  type chatInfo = {
    prompt: string,
    response: string,
  }


  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [chatInfo, setChatInfo] = useState<chatInfo[]>([])

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(prompt.length === 0){
      return;
    }
    setLoading(true)
    
    try{
      const res = await axios.post('http://localhost:3000/api/gemini/prompt', {
        prompt
      },{withCredentials:  true})


      setChatInfo((prev) => [...prev, {prompt, response: res.data.responseText}])
      setPrompt("");

    }catch(err){
      console.log(err)
    }finally{setLoading(false); console.log(chatInfo)}


  };

 useEffect(() => {
    fetchAllData()
  },[])

  const fetchAllData = async () =>  {
    const response = await axios.get("http://localhost:3000/api/gemini/history", {withCredentials:true});
    console.log(response);
    setChatInfo(response.data.data)
  }
 
 

  return (
   <div className="flex h-screen overflow-hidden">
  {/* Sidebar */}
  <aside className="hidden md:flex w-64 flex-col border-r p-4">
    <span className="text-lg font-semibold">Request History</span>
    <hr className="my-2" />

    <ul className="flex-1 overflow-y-auto space-y-3 mt-4">
      {chatInfo && chatInfo.length > 0 ? (
        chatInfo.map((item, index) => (
          <li
            key={index}
            className="text-sm italic truncate cursor-pointer hover:text-black text-gray-600"
          >
            {item.prompt}
          </li>
        ))
      ) : (
        <span className="text-sm text-gray-500">Nothing to show here</span>
      )}
    </ul>
  </aside>

  {/* Main Content */}
  <main className="flex flex-1 flex-col bg-white p-3 md:p-6">
    {/* Chat Area */}
    <div className="flex-1 overflow-y-auto rounded-2xl border p-4">
      {chatInfo && chatInfo.length > 0 ? (
        <div className="flex flex-col gap-6">
          {chatInfo.map((item, index) => (
            <div key={index} className="flex flex-col gap-3">
              {/* User Message */}
              <div className="self-end max-w-[85%] md:max-w-[60%] bg-black text-white px-4 py-2 rounded-2xl text-sm md:text-base">
                {item.prompt}
              </div>

              {/* AI Response */}
              <div className="self-start max-w-[90%] md:max-w-[70%] bg-gray-100 px-4 py-3 rounded-2xl text-sm">
                <ReactMarkdown>{item.response}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-full flex items-center justify-center text-gray-500 text-center text-base md:text-lg">
          Welcome to Gemini 2.5 ✨ <br />
          How can I help you today?
        </div>
      )}
    </div>

    {/* Input Area */}
    <div className="mt-3 flex flex-col md:flex-row gap-2">
      <textarea
        className="flex-1 resize-none rounded-2xl border p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-black"
        rows={2}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask anything..."
      />

      <button
        onClick={handleSubmit}
        className="rounded-2xl bg-black text-white px-6 py-2 text-sm md:text-base hover:scale-105 transition-transform disabled:opacity-50"
        disabled={loading}
      >
        {loading ? <Loading /> : "Send"}
      </button>
    </div>
  </main>
</div>

  );
};

export default Home;
