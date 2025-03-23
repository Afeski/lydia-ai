
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight, Plus } from "lucide-react";

type AppointmentProps = {
  upcomingAppointments: {
    id: number;
    doctor: string;
    specialty: string;
    date: string;
    time: string;
  }[];
};

const UpcomingAppointments = ({ upcomingAppointments }: AppointmentProps) => {
  return (
    <>
      <div className="space-y-3">
        {upcomingAppointments.map((appointment) => (
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
      <Button variant="outline" className="w-full text-[#301A4B]">
        <Plus className="mr-2 h-4 w-4" /> Schedule New Appointment
      </Button>
    </>
  );
};

export default UpcomingAppointments;
