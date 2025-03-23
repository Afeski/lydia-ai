
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
  Search
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

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      sender: "user",
      text: userInput,
      time: "Just now"
    };
    
    setMessages([...messages, newUserMessage]);
    setUserInput("");
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        sender: "system",
        text: "I can help you with that! Would you like me to check your symptoms or schedule an appointment with a doctor?",
        time: "Just now"
      };
      
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
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
      {/* Dashboard header */}
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
            <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-medium">
              JD
            </div>
          </div>
        </div>
      </header>

      <div className="dashboard-container grid grid-cols-1 lg:grid-cols-3 gap-6 py-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Welcome back, {userData.name}</CardTitle>
              <CardDescription>Here's your health summary</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-[#CB48B7]/10 rounded-lg">
                  <Calendar className="h-5 w-5 text-[#CB48B7]" />
                  <div>
                    <p className="text-sm font-medium">Next appointment</p>
                    <p className="text-xs text-gray-500">{userData.upcomingAppointments[0].date} at {userData.upcomingAppointments[0].time}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-[#CB48B7]/10 rounded-lg">
                  <Clock className="h-5 w-5 text-[#CB48B7]" />
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
                  className="h-auto flex-col items-center justify-center py-6 hover:bg-[#CB48B7]/10 hover:text-[#301A4B] hover:border-[#CB48B7]"
                  onClick={startSymptomAssessment}
                >
                  <ThermometerSnowflake className="h-6 w-6 mb-2" />
                  <span className="text-sm">Check Symptoms</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto flex-col items-center justify-center py-6 hover:bg-[#CB48B7]/10 hover:text-[#301A4B] hover:border-[#CB48B7]"
                  onClick={scheduleAppointment}
                >
                  <CalendarCheck className="h-6 w-6 mb-2" />
                  <span className="text-sm">Schedule Visit</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto flex-col items-center justify-center py-6 hover:bg-[#CB48B7]/10 hover:text-[#301A4B] hover:border-[#CB48B7]"
                >
                  <Pill className="h-6 w-6 mb-2" />
                  <span className="text-sm">My Medications</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto flex-col items-center justify-center py-6 hover:bg-[#CB48B7]/10 hover:text-[#301A4B] hover:border-[#CB48B7]"
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
                  <div key={appointment.id} className="p-3 border rounded-lg hover:border-[#CB48B7] transition-all cursor-pointer">
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

        {/* Main content - Chat with Lydia */}
        <div className="lg:col-span-2">
          <Card className="h-[calc(100vh-150px)] flex flex-col animate-scale-in">
            <CardHeader className="pb-2 border-b">
              <CardTitle className="text-xl flex items-center">
                <div className="w-8 h-8 rounded-full bg-[#CB48B7]/20 flex items-center justify-center mr-2">
                  <MessageSquare className="h-4 w-4 text-[#CB48B7]" />
                </div>
                Chat with Lydia
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
              </div>
            </CardContent>
            
            <CardFooter className="border-t p-3">
              <form onSubmit={handleSendMessage} className="w-full flex gap-2">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full p-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CB48B7] focus:border-transparent"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
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
