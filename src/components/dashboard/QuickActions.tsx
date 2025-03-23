
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  ThermometerSnowflake, 
  CalendarCheck, 
  Pill, 
  User 
} from "lucide-react";

type QuickActionsProps = {
  startSymptomAssessment: () => void;
  scheduleAppointment: () => void;
};

const QuickActions = ({ startSymptomAssessment, scheduleAppointment }: QuickActionsProps) => {
  return (
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
  );
};

export default QuickActions;
