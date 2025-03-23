import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import {
  Calendar,
  Clock,
  MessageSquare,
  Plus,
  User,
  Bell,
  Settings,
  LogOut,
  ThermometerSnowflake,
  CalendarCheck,
  Pill,
  ChevronRight,
  Search,
  Mic,
  MicOff,
  Volume2,
  VolumeX
} from "lucide-react";

// Simulated user data
const userData = {
  name: "John Doe",
  upcomingAppointments: [
    { id: 1, doctor: "Dr. Sarah Johnson", specialty: "Cardiologist", date: "May 15, 2023", time: "10:00 AM" },
    { id: 2, doctor: "Dr. Michael Chen", specialty: "Primary Care", date: "June 2, 2023", time: "2:30 PM" }
  ],
  medications: [
    { id: 1, name: "Lisinopril", dosage: "10mg", frequency: "Once daily", time: "8:00 AM", nextDose: "Today" },
    { id: 2, name: "Metformin", dosage: "500mg", frequency: "Twice daily", time: "8:00 AM / 8:00 PM", nextDose: "Today" },
    { id: 3, name: "Atorvastatin", dosage: "20mg", frequency: "Once daily", time: "8:00 PM", nextDose: "Today" }
  ]
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeChat, setActiveChat] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState([
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

  // Auto-scroll to bottom of chat
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const handleLogout = () => {
    window.logoutUser();
    navigate("/");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
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

  const startSymptomAssessment = () => {
    setActiveChat(true);
    const systemMessage = {
      id: messages.length + 1,
      sender: "system",
      text: "Let's check your symptoms. Can you describe what you're experiencing?",
      time: "Just now"
    };
    
    setMessages([...messages, systemMessage]);
  };

  const scheduleAppointment = () => {
    setActiveChat(true);
    const systemMessage = {
      id: messages.length + 1,
      sender: "system",
      text: "I'd be happy to help you schedule an appointment. What type of doctor would you like to see?",
      time: "Just now"
    };
    
    setMessages([...messages, systemMessage]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#301A4B] text-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Lydia</h1>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Settings className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/10"
              onClick={handleLogout}
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-medium">
              JD
            </div>
          </div>
        </div>
      </header>

      <div className="dashboard-container grid grid-cols-1 lg:grid-cols-3 gap-6 py-6">
        <div className="lg:col-span-1 space-y-6">
          <Card className="animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Welcome back, {userData.name}</CardTitle>
              <CardDescription>Here's your health summary</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-[#E6E6FA]/10 rounded-lg">
                  <Calendar className="h-5 w-5 text-[#E6E6FA]" />
                  <div>
                    <p className="text-sm font-medium">Next appointment</p>
                    <p className="text-xs text-gray-500">{userData.upcomingAppointments[0].date} at {userData.upcomingAppointments[0].time}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-[#E6E6FA]/10 rounded-lg">
                  <Clock className="h-5 w-5 text-[#E6E6FA]" />
                  <div>
                    <p className="text-sm font-medium">Medication reminder</p>
                    <p className="text-xs text-gray-500">Next: {userData.medications[0].name} at {userData.medications[0].time}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Quick Actions</CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="h-auto flex-col items-center justify-center py-6 hover:bg-[#E6E6FA]/10 hover:text-[#301A4B] hover:border-[#E6E6FA]"
                  onClick={startSymptomAssessment}
                >
                  <ThermometerSnowflake className="h-6 w-6 mb-2" />
                  <span className="text-sm">Check Symptoms</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto flex-col items-center justify-center py-6 hover:bg-[#E6E6FA]/10 hover:text-[#301A4B] hover:border-[#E6E6FA]"
                  onClick={scheduleAppointment}
                >
                  <CalendarCheck className="h-6 w-6 mb-2" />
                  <span className="text-sm">Schedule Visit</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto flex-col items-center justify-center py-6 hover:bg-[#E6E6FA]/10 hover:text-[#301A4B] hover:border-[#E6E6FA]"
                >
                  <Pill className="h-6 w-6 mb-2" />
                  <span className="text-sm">My Medications</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto flex-col items-center justify-center py-6 hover:bg-[#E6E6FA]/10 hover:text-[#301A4B] hover:border-[#E6E6FA]"
                >
                  <User className="h-6 w-6 mb-2" />
                  <span className="text-sm">My Profile</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Upcoming Appointments</CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                {userData.upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-3 border rounded-lg hover:border-[#E6E6FA] transition-all cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{appointment.doctor}</p>
                        <p className="text-sm text-gray-500">{appointment.specialty}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>{appointment.date} • {appointment.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            
            <CardFooter>
              <Button variant="outline" className="w-full text-[#301A4B]">
                <Plus className="mr-2 h-4 w-4" /> Schedule New Appointment
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-[calc(100vh-150px)] flex flex-col animate-scale-in">
            <CardHeader className="pb-2 border-b">
              <CardTitle className="text-xl flex items-center">
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
              </CardTitle>
              <CardDescription>Your AI health assistant</CardDescription>
            </CardHeader>
            
            <CardContent className="flex-grow overflow-y-auto pt-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
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
            </CardContent>
            
            <CardFooter className="border-t p-3">
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
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
