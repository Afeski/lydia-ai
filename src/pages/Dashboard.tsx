import React from 'react';
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  // Placeholder function for scheduling
  const handleSchedule = () => {
    alert("Scheduling functionality will be implemented here.");
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-section-title">Welcome to Your Dashboard</h1>
      <p>Manage your appointments and health information easily.</p>
      
      {/* Update the CTA button color to violet in the Dashboard page */}
      <Button 
        onClick={handleSchedule} 
        className="w-full md:w-auto px-6 py-3 bg-[#301A4B] text-white hover:bg-[#301A4B]/90"
      >
        Schedule New Appointment
      </Button>
      
    </div>
  );
};

export default Dashboard;
