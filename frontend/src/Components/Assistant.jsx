import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { BiX, BiSend, BiMessageRoundedDetail } from 'react-icons/bi';

function Assistant() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [accessToken, setAccessToken] = useState(null); // Store token
  const [tokenExpiration, setTokenExpiration] = useState(null); // Store expiration time
  // const [messages, setMessages] = useState([{ sender: "assistant", text: "Hi😊, How can I help you today?" }]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const projectId = 'airtravelassistance'; // Replace with your Dialogflow Project ID
  const sessionId = uuidv4(); // A unique session ID
  const languageCode = 'en'; // Language code

  async function getAccessToken() {
     // Check if the token is already available and not expired
    if (accessToken && tokenExpiration && new Date() < tokenExpiration) {
      return accessToken;
    }
    try {
      const tokenResponse = await axios.get('http://127.0.0.1:8000/get-google-token/');
      const newAccessToken = tokenResponse.data.access_token;
      const expiresIn = tokenResponse.data.expires_in;
      setAccessToken(newAccessToken);
      setTokenExpiration(new Date(new Date().getTime() + expiresIn * 1000)); // Add 1 second to account for rounding errors

      return newAccessToken;
    } catch (error) {
      console.error('Error getting access token', error);
      return;
    }
  }

  const sendMessage = async (e) => {
    e.preventDefault();
    const message = inputText;
    if (!message.trim()) return ;
    setMessages((prevMessages) => [...prevMessages, { text: message, sender: 'user' }]);
    setLoading(true);
    setInputText('');

    // Create Dialogflow API request body
    const data = {
    project_id: projectId,
    session_id: sessionId,
    language_code: languageCode,
    knowledge_base_id: 'Mjk5ODAxNTU0MDU5MDU0Mjg0OQ', // Replace with your Knowledge Base ID
    texts: [message]
    };
    // const data = {
    //   queryInput: {
    //     text: {
    //       text: message,
    //       languageCode: languageCode,
    //     },
    //   },
    // };

    // Get Dialogflow Access Token (replace with your method for obtaining access token)
    const accessToken = await getAccessToken(); // OAuth2 token or service account token

  try {
    const response = await axios.post('http://127.0.0.1:8000/detect_intent_knowledge/', data);
    const botMessages = response.data;

    botMessages.forEach((botMessage) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botMessage.fulfillment_text, sender: 'bot' }
      ]);
    });
  } catch (error) {
    console.error('Error in Dialogflow request', error);
  } finally {
    setLoading(false);
  }
};

  //   try {
  //     const response = await axios.post(
  //       `https://dialogflow.googleapis.com/v2/projects/${projectId}/agent/sessions/${sessionId}:detectIntent`,
  //       data,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );

  //     const botMessage = response.data.queryResult.fulfillmentText;
  //     setMessages((prevMessages) => [...prevMessages, { text: botMessage, sender: 'bot' }]);
  //   } catch (error) {
  //     console.error('Error in Dialogflow request', error);
  //   } finally {
  //     setLoading(false);
  //   }

  // };
    const toggleChat = () => {
    setIsOpen(!isOpen);
    };

  return (
    <div className="fixed bottom-10 right-5 z-50 m-auto">
      {isOpen && (
        <div className="w-80 md:w-[450px] bg-gray-200 opacity-100 text-black shadow-lg rounded-lg">
          <div className="flex justify-between items-center p-2">
            <div className="flex items-center justify-center w-full ">
              <h2 className="text-lg font-semibold text-gray-800 text-center">ASK ATA:😊 </h2>
            </div>
            <button
              onClick={toggleChat}
              className="text-gray-500 text-3xl px-2 hover:text-gray-700"
            >
              <BiX />
            </button>
          </div>
          {/* <h2 className="text-sm font-light mx-2 italic">This is AI powered and may make mistakes.</h2> */}
          <span className="border-b-2 px-1 border-gray-700 w-[98%] mx-auto block"></span>
          <div className="mb-4 h-96 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-600 bg-gray-200 p-3 rounded-md">
            {messages.map((msg, index) => (
              <div key={index} className="mb-2 flex rounded-lg shadow-lg">
                <div className="text-sm text-left font-semibold p-1 text-gray-600">
                  {msg.sender === "user" ? "You:" : "ATA:"}
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
          <form onSubmit={(e) => sendMessage(e)} className="p-2 flex flex-row space-x-2">
            <input
              type="text"
              className="w-[85%] border px-2 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              placeholder="Ask me anything..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
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
}
export default Assistant;
