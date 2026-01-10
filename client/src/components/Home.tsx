import React, { useState } from "react";
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


      setChatInfo(prev => [...prev, {prompt, response: res.data.responseText}])
      console.log(res.data)

    }catch(err){
      console.log(err)
    }finally{setLoading(false); console.log(chatInfo)}


  };


 

  return (
    <div className="flex h-screen pt-14">
    

      {/* Main Content */}
      <div className="flex-1 bg-white p-4 md:p-6 flex flex-col">
        {/* Chat box */}
        <div className="flex-1 rounded-2xl border min-h-[400px] md:min-h-[648px] flex text-center justify-center overflow-y-auto">
          {
           
            chatInfo.length > 0 ? 
            <div className="flex flex-col gap-12 overflow-y-auto w-full">
                {
                  chatInfo.map((item, index) => {
                    return <div className="gap-4">
                      <p className="text-right justify-end text-lg">{item.prompt}</p>
                      {/* {loading && <Loading />} */}
                      <p className="text-left justify-start max-w-[60%] text-sm">
                      <ReactMarkdown key={index}>
                        {item.response}
                    </ReactMarkdown></p></div>
                  })
                }
            </div> : <span className="mt-24 text-xl">Welcome to gemini 2.5, How can I help you today :)</span>
          }
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
            className="bg-black text-white px-6 py-2 rounded-2xl md:w-auto w-full cursor-pointer shadow-xl hover:px-8 hover:py-3 transition-all duration-400"
            onClick={handleSubmit}
          >
          {
            loading ? <Loading /> : "Send"
          
            
          }
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
