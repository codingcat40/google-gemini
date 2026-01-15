import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Loading from "./Loading";
import axios from "axios";

import { Flex, Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;

const contentStyle: React.CSSProperties = {
  textAlign: "right",
  flex: 1,
  justifySelf: "right",
  overflowY: "auto",
  padding: "16px",
  lineHeight: "120px",
};

const siderStyle: React.CSSProperties = {
  textAlign: "left",
  lineHeight: "60px",
  color: "#fff",
  background: "#1b1b1c",
  overflowY: "auto",
  // height:'100vh'
};

const layoutStyle: React.CSSProperties = {
  borderRadius: 8,
  overflow: "hidden",
  width: "100%",
  height: "100vh",
};

const footerStyle: React.CSSProperties = {
  textAlign: "right",
  color: "black",
  height: "20vh",
  background: "#e7e2e2",
  display:'flex',
  flexDirection: "row",
  gap:'64px'
};

const Home = () => {
  type chatInfo = {
    prompt: string;
    response: string;
  };

  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [chatInfo, setChatInfo] = useState<chatInfo[]>([]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (prompt.length === 0) {
      return;
    }
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/gemini/prompt",
        {
          prompt,
        },
        { withCredentials: true }
      );

      setChatInfo((prev) => [
        ...prev,
        { prompt, response: res.data.responseText },
      ]);
      setPrompt("");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      console.log(chatInfo);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/gemini/history",
      { withCredentials: true }
    );
    console.log(response);
    setChatInfo(response.data.data);
  };

  return (
    <Flex gap="middle" wrap style={{}}>
      <Layout style={layoutStyle}>
        <Layout style={{ height: "100vh" }}>
          <Sider
            width="25%"
            style={siderStyle}
            className="hidden md:flex w-64 p-4"
          >
            <span className="text-lg font-semibold">User Queries History</span>
            <hr className="my-2" />

            <ul className="flex-1 overflow-y-auto ">
              {chatInfo && chatInfo.length > 0 ? (
                chatInfo.map((item, index) => (
                  <li
                    key={index}
                    className="text-[16px] truncate cursor-pointer hover:text-blue-500 "
                  >
                    {item.prompt}
                  </li>
                ))
              ) : (
                <span className="text-sm text-gray-500">
                  Nothing to show here
                </span>
              )}
            </ul>
          </Sider>

          <Layout>
            <Content style={contentStyle} className=" bg-white p-3 md:p-6">
              {/* Chat Area */}

              {chatInfo && chatInfo.length > 0 ? (
                <div className="gap-6">
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
            </Content>

            <Footer style={footerStyle}>
              {/* Input Area */}
              <textarea
                className="min-w-[50rem] h-12 p-2"
                rows={2}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask anything..."
              />
              <button
                onClick={handleSubmit}
                className="rounded-xl h-12 bg-black text-white px-6 py-2 text-sm md:text-base hover:scale-105 transition-transform disabled:opacity-50"
                disabled={loading}
              >
                {loading ? <Loading /> : "Send"}
              </button>
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </Flex>
  );
};

export default Home;
