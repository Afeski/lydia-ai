
import React from "react";
import { Calendar, Clock } from "lucide-react";

type UserInfoProps = {
  name: string;
  upcomingAppointments: {
    id: number;
    doctor: string;
    specialty: string;
    date: string;
    time: string;
  }[];
  medications: {
    id: number;
    name: string;
    dosage: string;
    frequency: string;
    time: string;
    nextDose: string;
  }[];
};

const UserInfo = ({ name, upcomingAppointments, medications }: UserInfoProps) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-[#E6E6FA]/10 rounded-lg">
      <Calendar className="h-5 w-5 text-[#E6E6FA]" />
      <div>
        <p className="text-sm font-medium">Next appointment</p>
        <p className="text-xs text-gray-500">{upcomingAppointments[0].date} at {upcomingAppointments[0].time}</p>
      </div>
    </div>
  );
};

export default UserInfo;
