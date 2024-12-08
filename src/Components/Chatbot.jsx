import React, { useState, useEffect, useRef } from "react";
import { AiOutlineMessage, AiOutlineSend } from "react-icons/ai";
import { IoClose } from "react-icons/io5";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [inactivityTimer, setInactivityTimer] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const chatContainerRef = useRef(null); // Reference for the chat container

  // Rule-based responses
  const rules = {
    hello: "Hi there! How can I help you today?",
    "how are you": "I'm just a bot, but I'm doing great! How about you?",
    help: "Sure, I'm here to help! What do you need assistance with?",
    "what is your name": "I'm your friendly chatbot!",
    default: "I'm sorry, I didn't understand that. Could you rephrase?",
  };

  const toggleChat = () => {
    if (isOpen) {
      // Reset all states when closing the chatbot
      setMessages([]);
      setUserInput("");
      setIsTyping(false);
      if (inactivityTimer) clearTimeout(inactivityTimer);
    }
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    if (userInput.trim() === "") return;

    // Add user message to the chat
    setMessages([...messages, { sender: "user", text: userInput }]);
    resetInactivityTimer();
    setUserInput("");

    // Show typing indicator
    setIsTyping(true);

    // Respond based on rules
    setTimeout(() => {
      const userMessage = userInput.toLowerCase();
      const response = rules[userMessage] || rules.default; // Match rule or use default response

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: response },
      ]);

      setIsTyping(false); // Stop typing indicator
    }, 1500); // Simulate response delay
  };

  const resetInactivityTimer = () => {
    if (inactivityTimer) clearTimeout(inactivityTimer);
    const newTimer = setTimeout(() => {
      setIsOpen(false); // Close chatbot after inactivity
    }, 9000); // 9 seconds
    setInactivityTimer(newTimer);
  };

  // Smooth scroll to the bottom when messages are updated
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) resetInactivityTimer();
    return () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
    };
  }, [isOpen]);

  useEffect(() => {
    resetInactivityTimer();
  }, [userInput]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
        >
          <AiOutlineMessage size={24} />
        </button>
      )}

      {isOpen && (
        <div className="bg-white w-80 sm:w-96 h-96 rounded-lg shadow-lg flex flex-col">
          <div className="flex justify-between items-center bg-blue-500 text-white p-4 rounded-t-lg">
            <h2 className="text-lg font-semibold">Chatbot</h2>
            <button onClick={toggleChat}>
              <IoClose size={20} />
            </button>
          </div>

          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[70%] p-3 rounded-lg bg-gray-300 text-gray-700 italic">
                  Chatbot is typing...
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center border-t p-3">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              className="ml-3 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            >
              <AiOutlineSend size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;

































// import React, { useState, useEffect, useRef } from "react";
// import { AiOutlineMessage, AiOutlineSend } from "react-icons/ai";
// import { IoClose } from "react-icons/io5";

// const Chatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [userInput, setUserInput] = useState("");
//   const [inactivityTimer, setInactivityTimer] = useState(null);
//   const [isTyping, setIsTyping] = useState(false);

//   const chatContainerRef = useRef(null); // Reference for the chat container

//   // Rule-based responses
//   const rules = {
//     hello: "Hi there! How can I help you today?",
//     "how are you": "I'm just a bot, but I'm doing great! How about you?",
//     help: "Sure, I'm here to help! What do you need assistance with?",
//     "what is your name": "I'm your friendly chatbot!",
//     default: "I'm sorry, I didn't understand that. Could you rephrase?",
//   };

//   const toggleChat = () => {
//     setIsOpen(!isOpen);
//     resetInactivityTimer();
//   };

//   const handleSend = () => {
//     if (userInput.trim() === "") return;

//     // Add user message to the chat
//     setMessages([...messages, { sender: "user", text: userInput }]);
//     resetInactivityTimer();
//     setUserInput("");

//     // Show typing indicator
//     setIsTyping(true);

//     // Respond based on rules
//     setTimeout(() => {
//       const userMessage = userInput.toLowerCase();
//       const response = rules[userMessage] || rules.default; // Match rule or use default response

//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { sender: "bot", text: response },
//       ]);

//       setIsTyping(false); // Stop typing indicator
//     }, 1500); // Simulate response delay
//   };

//   const resetInactivityTimer = () => {
//     if (inactivityTimer) clearTimeout(inactivityTimer);
//     const newTimer = setTimeout(() => {
//       setIsOpen(false); // Close chatbot after inactivity
//     }, 9000); // 9 seconds
//     setInactivityTimer(newTimer);
//   };

//   // Smooth scroll to the bottom when messages are updated
//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTo({
//         top: chatContainerRef.current.scrollHeight,
//         behavior: "smooth",
//       });
//     }
//   }, [messages]);

//   useEffect(() => {
//     if (isOpen) resetInactivityTimer();
//     return () => {
//       if (inactivityTimer) clearTimeout(inactivityTimer);
//     };
//   }, [isOpen]);

//   useEffect(() => {
//     resetInactivityTimer();
//   }, [userInput]);

//   return (
//     <div className="fixed bottom-5 right-5 z-50">
//       {!isOpen && (
//         <button
//           onClick={toggleChat}
//           className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
//         >
//           <AiOutlineMessage size={24} />
//         </button>
//       )}

//       {isOpen && (
//         <div className="bg-white w-80 sm:w-96 h-96 rounded-lg shadow-lg flex flex-col">
//           <div className="flex justify-between items-center bg-blue-500 text-white p-4 rounded-t-lg">
//             <h2 className="text-lg font-semibold">Chatbot</h2>
//             <button onClick={toggleChat}>
//               <IoClose size={20} />
//             </button>
//           </div>

//           <div
//             ref={chatContainerRef}
//             className="flex-1 overflow-y-auto p-4 space-y-4"
//           >
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`flex ${
//                   msg.sender === "user" ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 <div
//                   className={`max-w-[70%] p-3 rounded-lg ${
//                     msg.sender === "user"
//                       ? "bg-blue-500 text-white"
//                       : "bg-gray-200 text-gray-800"
//                   }`}
//                 >
//                   {msg.text}
//                 </div>
//               </div>
//             ))}
//             {isTyping && (
//               <div className="flex justify-start">
//                 <div className="max-w-[70%] p-3 rounded-lg bg-gray-300 text-gray-700 italic">
//                   Chatbot is typing...
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="flex items-center border-t p-3">
//             <input
//               type="text"
//               value={userInput}
//               onChange={(e) => setUserInput(e.target.value)}
//               placeholder="Type your message..."
//               className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <button
//               onClick={handleSend}
//               className="ml-3 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
//             >
//               <AiOutlineSend size={20} />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chatbot;