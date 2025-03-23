
import React from "react";

type ChatMessageProps = {
  message: {
    id: number;
    sender: string;
    text: string;
    time: string;
  };
};

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div 
      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div 
        className={`max-w-[80%] p-3 rounded-lg ${
          message.sender === 'user' 
            ? 'bg-[#301A4B] text-white rounded-tr-none' 
            : 'bg-gray-100 text-gray-800 rounded-tl-none'
        }`}
      >
        <p>{message.text}</p>
        <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
          {message.time}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
