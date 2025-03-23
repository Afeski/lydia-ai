import React, { useState } from "react";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Plus } from "lucide-react";

// Import refactored components
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import UserInfo from "@/components/dashboard/UserInfo";
import QuickActions from "@/components/dashboard/QuickActions";
import UpcomingAppointments from "@/components/dashboard/UpcomingAppointments";
import ChatSection from "@/components/dashboard/ChatSection";
import useChatSystem from "@/hooks/useChatSystem";
import { UserData } from "@/types/dashboard";

// Simulated user data
const userData: UserData = {
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
  const [activeChat, setActiveChat] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { startSymptomAssessment, scheduleAppointment } = useChatSystem();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="dashboard-container grid grid-cols-1 lg:grid-cols-3 gap-6 py-6">
        <div className="lg:col-span-1 space-y-6">
          <Card className="animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Welcome back, {userData.name}</CardTitle>
              <CardDescription>Here's your health summary</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <UserInfo 
                  name={userData.name} 
                  upcomingAppointments={userData.upcomingAppointments} 
                  medications={userData.medications} 
                />
                
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
              <QuickActions 
                startSymptomAssessment={() => {
                  setActiveChat(true);
                  startSymptomAssessment();
                }}
                scheduleAppointment={() => {
                  setActiveChat(true);
                  scheduleAppointment();
                }}
              />
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Upcoming Appointments</CardTitle>
            </CardHeader>
            
            <CardContent>
              <UpcomingAppointments upcomingAppointments={userData.upcomingAppointments} />
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
            <ChatSection />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
