
import React, { useState, useRef, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

type Message = {
  id: number;
  sender: string;
  text: string;
  time: string;
};

const useChatSystem = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "system", text: "Hello! I'm Lydia, your AI health assistant. How can I help you today?", time: "Just now" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const startSymptomAssessment = () => {
    const systemMessage = {
      id: messages.length + 1,
      sender: "system",
      text: "Let's check your symptoms. Can you describe what you're experiencing?",
      time: "Just now"
    };
    
    setMessages(prevMessages => [...prevMessages, systemMessage]);
  };

  const scheduleAppointment = () => {
    const systemMessage = {
      id: messages.length + 1,
      sender: "system",
      text: "I'd be happy to help you schedule an appointment. What type of doctor would you like to see?",
      time: "Just now"
    };
    
    setMessages(prevMessages => [...prevMessages, systemMessage]);
  };

  return {
    messages,
    setMessages,
    isLoading,
    setIsLoading,
    userInput,
    setUserInput,
    isListening,
    setIsListening,
    isMuted,
    setIsMuted,
    audioRef,
    recognitionRef,
    startSymptomAssessment,
    scheduleAppointment
  };
};

export default useChatSystem;
