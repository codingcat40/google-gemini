import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Loading from "./Loading";
import axios from "axios";

import { useLLM } from "../context/SharedContext";

import { Button, Flex, Layout, Modal, message, notification } from "antd";
import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
const { Footer, Sider, Content } = Layout;
const { confirm } = Modal;

type NotificationType = "warning";

const Home = () => {
  type chatInfo = {
    _id: string; // backend using _id
    prompt: string;
    response: string;
  };

  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [chatInfo, setChatInfo] = useState<chatInfo[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [model, setModel] = useState<string>("gemini");

  const { selectedRole } = useLLM();

  const [api, warningContext] = notification.useNotification();
  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    title: string,
  ) => {
    api[type]({
      title: `${title}`,
      description: `${message}`,
      duration: 10,
    });
  };

  // rendering
  useEffect(() => {
    fetchAllData();
  }, []);

  // send API request
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (prompt.trim().length === 0) {
      openNotificationWithIcon(
        "warning",
        "Please Enter the Prompt",
        "Empty Fields",
      );
      return;
    }
    setLoading(true);

    try {
      const res = await axios.post(
        "https://noema-ai.vercel.app/api/gemini/prompt",
        {
          prompt,
          model,
          selectedRole,
        },
        { withCredentials: true },
      );
      fetchAllData();
      console.log(res.data);
      console.log("Role:  ", selectedRole);
      setPrompt("");
      messageApi.success("prompt sent successfully");
    } catch (err) {
      console.log(err);
      console.log("Role:  ", selectedRole, typeof selectedRole);
      messageApi.error("Failed to send prompt");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllData = async () => {
    try {
      const response = await axios.get(
        "https://noema-ai.vercel.app/api/gemini/history",
        { withCredentials: true },
      );
      console.log(response);
      setChatInfo(response.data.data || []);
    } catch (err) {
      console.log(err);
      messageApi.error(`Failed to fetch queries ${err}`);
    }
  };

  // delete prompt

  const handleDeletePrompt = (id: string, promptText: string) => {
    confirm({
      title: "Delete chat",
      icon: <ExclamationCircleFilled />,
      content: `Are you sure you want to delete: "${promptText.substring(
        0,
        50,
      )} ${prompt.length > 50 ? "..." : ""}"`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          const res = await axios.delete(
            `https://noema-ai.vercel.app/api/gemini/history/${id}`,
            { withCredentials: true },
          );
          if (res.status === 200) {
            setChatInfo((prev) => prev.filter((item) => item._id !== id));
            messageApi.success("Query Deleted successfully");
          } else {
            messageApi.error("Failed to delete the chat");
          }
        } catch (err: any) {
          console.log("Error deleting this chat", err);
        }
      },
    });
  };

  return (
    <>
      {contextHolder}
      {warningContext}
      <Flex className="w-full">
        <Layout className="w-full">
          <Layout className=" flex h-screen">
            {/* Sidebar */}
            <Sider
              width="25%"
              className="hidden md:flex flex-col bg-[#1b1b1c] text-white"
            >
              <div className="p-4 h-full flex flex-col">
                <h2 className="text-lg font-semibold">User Queries History</h2>
                <hr className="my-2 border-gray-600" />

                <div className="flex-1 overflow-y-auto mt-4">
                  {chatInfo && chatInfo.length > 0 ? (
                    chatInfo.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center justify-between p-2 hover:bg-gray-800 rounded cursor-pointer group mb-1"
                      >
                        <p
                          className="truncate text-sm text-gray-300 group-hover:text-white flex-1 mr-2"
                          title={item.prompt}
                        >
                          {item.prompt}
                        </p>
                        <DeleteOutlined
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePrompt(item._id, item.prompt);
                          }}
                          className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Delete chat"
                        />
                      </div>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">
                      Nothing to show here
                    </span>
                  )}
                </div>
              </div>
            </Sider>

            {/* Main Content Area */}
            <Layout className="flex-1 flex flex-col h-screen">
              {/* Chat Messages Area */}
              <Content className="flex-1 overflow-y-auto bg-[#212121] p-3 md:p-6">
                {chatInfo && chatInfo.length > 0 ? (
                  <div className="space-y-6">
                    {chatInfo.map((item) => (
                      <div key={item._id} className="space-y-4">
                        {/* User Message */}
                        <div className="flex justify-end">
                          <div className="max-w-[80%] bg-black text-white px-4 py-2 rounded-2xl text-sm md:text-base">
                            {item.prompt}
                          </div>
                        </div>

                        {/* AI Response */}
                        <div className="flex justify-start">
                          <div className="max-w-[90%] md:max-w-[800px] px-4 py-3 rounded-2xl shadow-sm overflow-hidden">
                            <div className="text-white text-sm md:text-base whitespace-pre-wrap break-words break-all">
                              <ReactMarkdown>
                                {item.response}
                              </ReactMarkdown>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500 text-center text-base md:text-lg">
                    Welcome to Noema - AI ✨ <br />
                    How can we help you today?
                  </div>
                )}
              </Content>

              {/* Input Area - Fixed Footer */}
              <Footer className="!bg-black text-white p-3 md:p-4 border-t border-gray-700" style={{paddingBottom: '70px'}}>
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:gap-4 w-full">
                  {/* Textarea */}
                  <textarea
                    className="w-full md:flex-1 p-3 border border-gray-600 bg-black text-white rounded-lg resize-none
                 focus:outline-none focus:ring-2 focus:ring-blue-500
                 text-sm md:text-base"
                    rows={2}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ask anything..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        if (prompt.trim()) {
                          handleSubmit(e as any);
                        }
                      }
                    }}
                  />

                  {/* Controls row (mobile) */}
                  <div className="flex items-center justify-between gap-3 md:gap-4">
                    {/* Model select */}
                    <select
                      className="bg-black border border-gray-600 text-white rounded-md px-3 py-2
                   text-sm cursor-pointer focus:outline-none"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                    >
                      <option value="gemini" className="bg-gray-800">
                        Gemini
                      </option>
                      <option value="gpt-4" className="bg-gray-800">
                        GPT-4
                      </option>
                      <option value="deepseek" className="bg-gray-800">
                        DeepSeek R1T2
                      </option>
                      <option value="Llama" className="bg-gray-800">
                        Llama 3.3
                      </option>
                    </select>

                    {/* Send button */}
                    <Button
                      onClick={handleSubmit}
                      type={!prompt.trim() ? "default" : "primary"}
                      size="middle"
                      className="px-4 py-2 md:h-[60px] md:px-6"
                    >
                      {loading ? <Loading /> : "Send"}
                    </Button>
                  </div>
                </div>
              </Footer>
            </Layout>
          </Layout>
        </Layout>
      </Flex>
    </>
  );
};

export default Home;
