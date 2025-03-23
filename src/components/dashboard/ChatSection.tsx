
import React, { useRef, useEffect, useState } from "react";
import { MessageSquare, Mic, MicOff, Volume2, VolumeX, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatMessage from "./ChatMessage";
import { toast } from "@/components/ui/use-toast";

type Message = {
  id: number;
  sender: string;
  text: string;
  time: string;
};

const ChatSection = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "system", text: "Hello! I'm Lydia, your AI health assistant. How can I help you today?", time: "Just now" }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // For speech recognition
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognitionAPI();
      
      if (recognitionRef.current) {
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';
        
        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[event.results.length - 1][0].transcript;
          setUserInput(transcript);
          handleSendMessage(null, transcript);
        };
        
        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error', event);
          setIsListening(false);
          toast({
            title: "Voice recognition error",
            description: "Please try again or type your message",
            variant: "destructive"
          });
        };
        
        recognitionRef.current.onend = () => {
          if (isListening) {
            recognitionRef.current?.start();
          }
        };
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleListening = () => {
    if (!isListening) {
      if (!recognitionRef.current) {
        toast({
          title: "Voice recognition not supported",
          description: "Your browser doesn't support voice recognition. Please type your message instead.",
          variant: "destructive"
        });
        return;
      }
      
      try {
        recognitionRef.current.start();
        setIsListening(true);
        toast({
          title: "Voice recognition active",
          description: "Speak now. Your voice will be converted to text."
        });
      } catch (error) {
        console.error("Error starting speech recognition:", error);
        toast({
          title: "Error starting voice recognition",
          description: "Please try again or type your message",
          variant: "destructive"
        });
      }
    } else {
      recognitionRef.current?.stop();
      setIsListening(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const handleSendMessage = async (e: React.FormEvent | null, voiceTranscript: string | null = null) => {
    if (e) e.preventDefault();
    
    const inputText = voiceTranscript || userInput;
    if (!inputText.trim()) return;

    const newUserMessage = {
      id: messages.length + 1,
      sender: "user",
      text: inputText,
      time: "Just now"
    };
    
    setMessages([...messages, newUserMessage]);
    setUserInput("");
    setIsLoading(true);
    
    try {
      setTimeout(async () => {
        const aiResponseText = "I can help you with that! Would you like me to check your symptoms or schedule an appointment with a doctor?";
        
        const aiResponse = {
          id: messages.length + 2,
          sender: "system",
          text: aiResponseText,
          time: "Just now"
        };
        
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
        
        if (!isMuted) {
          try {
            const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL', {
              method: 'POST',
              headers: {
                'accept': 'audio/mpeg',
                'xi-api-key': 'Unforgiving Bald Eagle',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                text: aiResponseText,
                model_id: "eleven_multilingual_v2",
                voice_settings: {
                  stability: 0.5,
                  similarity_boost: 0.75
                }
              })
            });
            
            if (response.ok) {
              const blob = await response.blob();
              const audioUrl = URL.createObjectURL(blob);
              
              if (!audioRef.current) {
                audioRef.current = new Audio(audioUrl);
                audioRef.current.muted = isMuted;
              } else {
                audioRef.current.src = audioUrl;
              }
              
              audioRef.current.play();
            } else {
              console.error('Error fetching audio from ElevenLabs:', response.statusText);
            }
          } catch (error) {
            console.error('Error with ElevenLabs text-to-speech:', error);
          }
        }
      }, 1000);
    } catch (error) {
      console.error("Error processing message:", error);
      setIsLoading(false);
      toast({
        title: "Error",
        description: "There was an error processing your message. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="h-[calc(100vh-150px)] flex flex-col animate-scale-in">
      <div className="pb-2 border-b p-4">
        <div className="text-xl flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#E6E6FA]/20 flex items-center justify-center mr-2">
            <MessageSquare className="h-4 w-4 text-[#E6E6FA]" />
          </div>
          Chat with Lydia
          <div className="flex ml-auto gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="h-8 w-8"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleListening}
              className={`h-8 w-8 ${isListening ? 'bg-red-100 text-red-600' : ''}`}
              title={isListening ? "Stop listening" : "Start voice input"}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <div className="text-sm text-gray-500">Your AI health assistant</div>
      </div>
      
      <div className="flex-grow overflow-y-auto pt-4 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 text-gray-800 rounded-tl-none">
                <div className="flex space-x-2 items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="border-t p-3">
        <form onSubmit={handleSendMessage} className="w-full flex gap-2">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder={isListening ? "Listening..." : "Type your message..."}
              className="w-full p-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6E6FA] focus:border-transparent"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={isListening}
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          
          <Button type="submit" className="bg-[#301A4B] hover:bg-[#301A4B]/90">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatSection;
