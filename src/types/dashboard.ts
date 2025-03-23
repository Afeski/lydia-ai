
export type UserData = {
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

export type Message = {
  id: number;
  sender: string;
  text: string;
  time: string;
};
