import axios from 'axios';
import { BiX, BiSend, BiMessageRoundedDetail } from 'react-icons/bi';
import { useState } from 'react';

const Assistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [conversation, setConversation] = useState([{ sender: "assistant", text: "Hi😊, How can I help you today?" }]);
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    const newConversation = [...conversation, { sender: "user", text: query }];
    setConversation(newConversation);
    setQuery("");
    setLoading(true);

    try {
      const assistantResponse = await axios.post(`http://127.0.0.1:8000/assistant/`, { query });
      const response = assistantResponse.data.response;

      setConversation([...newConversation, { sender: "assistant", text: response }]);
    } catch (error) {
      setConversation([...newConversation, { sender: "assistant", text: "Sorry, something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" z-50 m-auto">
      {isOpen && (
        <div className="w-80 md:w-[400px] bg-gray-200 opacity-100 text-black shadow-lg rounded-lg">
          <div className="flex justify-between items-center p-2">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold text-gray-800">Personal Assistant</h2>
            </div>
            <button
              onClick={toggleChat}
              className="text-gray-500 text-3xl hover:text-gray-700"
            >
              <BiX />
            </button>
          </div>
          <h2 className="text-sm font-light mx-2 italic">This is AI powered and may make mistakes.</h2>
          <span className="border-b-2 px-1 border-gray-700 w-[98%] mx-auto block"></span>
          <div className="mb-4 h-72 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-600 bg-gray-200 p-3 rounded-md">
            {conversation.map((msg, index) => (
              <div key={index} className="mb-2 rounded-lg shadow-lg">
                <div className="text-sm font-semibold p-1 text-gray-600">
                  {msg.sender === "user" ? "You:" : "Assistant:"}
                </div>
                <div className="p-1">
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                <div className="animate-pulse flex space-x-4">
                  <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-200 rounded"></div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                      </div>
                      <div className="h-2 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              // <div className="text-gray-600 italic">Assistant is typing...</div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="p-2 flex flex-row space-x-2">
            <input
              type="text"
              className="w-[85%] border px-2 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              placeholder="Ask me anything..."
              value={query}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="w-[10%] text-gray-500 text-5xl -rotate-45 rounded-md hover:text-orange-600 transition-colors"
            >
              <BiSend />
            </button>
          </form>
        </div>
      )}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-gray-400 m-auto text-white p-1 md:text-5xl rounded-full shadow-lg hover:bg-gray-600 transition-colors"
        >
          <BiMessageRoundedDetail />
        </button>
      )}
    </div>
  );
};

export default Assistant;
