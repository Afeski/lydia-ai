
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ChevronRight, Loader2, CalendarCheck } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { toast } from "@/hooks/use-toast";

interface AppointmentManagerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAppointmentBooked: (appointment: any) => void;
}

const MOCK_DOCTORS = [
  { id: 1, name: "Dr. Sarah Johnson", specialty: "Cardiologist", available: true },
  { id: 2, name: "Dr. Michael Chen", specialty: "Primary Care", available: true },
  { id: 3, name: "Dr. Emily Rodriguez", specialty: "Dermatologist", available: true },
  { id: 4, name: "Dr. James Wilson", specialty: "Neurologist", available: false },
];

const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", 
  "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM"
];

const AppointmentManager: React.FC<AppointmentManagerProps> = ({ 
  open, 
  onOpenChange,
  onAppointmentBooked
}) => {
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  const resetState = () => {
    setStep(1);
    setSelectedDoctor(null);
    setSelectedDate(undefined);
    setSelectedTime(null);
  };

  const handleSelectDoctor = (doctor: any) => {
    setSelectedDoctor(doctor);
    setStep(2);
  };

  const handleSelectDate = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) setStep(3);
  };

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
  };

  const handleBookAppointment = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) return;
    
    setIsBooking(true);
    
    try {
      // In a real app, this would be an API call to save the appointment
      // For this demo, we'll simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newAppointment = {
        id: Math.floor(Math.random() * 10000),
        doctor: selectedDoctor.name,
        specialty: selectedDoctor.specialty,
        date: format(selectedDate, "MMMM d, yyyy"),
        time: selectedTime
      };
      
      onAppointmentBooked(newAppointment);
      
      toast({
        title: "Appointment Booked",
        description: `Your appointment with ${selectedDoctor.name} on ${format(selectedDate, "MMMM d, yyyy")} at ${selectedTime} has been scheduled.`,
      });
      
      resetState();
      onOpenChange(false);
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast({
        title: "Booking Failed",
        description: "There was an error booking your appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={(newOpen) => {
      if (!newOpen) resetState();
      onOpenChange(newOpen);
    }}>
      <SheetContent className="sm:max-w-md md:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <CalendarCheck className="mr-2 h-5 w-5 text-[#CB48B7]" />
            Schedule an Appointment
          </SheetTitle>
          <SheetDescription>
            {step === 1 && "Select a healthcare provider to begin."}
            {step === 2 && "Choose a date for your appointment."}
            {step === 3 && "Select an available time slot."}
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6">
          {step === 1 && (
            <div className="space-y-4">
              {MOCK_DOCTORS.map(doctor => (
                <div 
                  key={doctor.id}
                  onClick={() => doctor.available && handleSelectDoctor(doctor)}
                  className={`p-4 border rounded-lg flex justify-between items-center cursor-pointer transition-all ${
                    doctor.available 
                      ? 'hover:border-[#CB48B7] hover:bg-[#CB48B7]/5' 
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div>
                    <h3 className="font-medium">{doctor.name}</h3>
                    <p className="text-sm text-gray-500">{doctor.specialty}</p>
                    {!doctor.available && (
                      <p className="text-xs text-red-500 mt-1">Currently unavailable</p>
                    )}
                  </div>
                  {doctor.available && <ChevronRight className="h-5 w-5 text-gray-400" />}
                </div>
              ))}
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-[#CB48B7]/10 p-3 rounded-lg flex items-center">
                <div className="mr-3 h-8 w-8 rounded-full bg-[#CB48B7]/20 flex items-center justify-center">
                  <CalendarCheck className="h-4 w-4 text-[#CB48B7]" />
                </div>
                <div>
                  <p className="font-medium">{selectedDoctor?.name}</p>
                  <p className="text-sm text-gray-500">{selectedDoctor?.specialty}</p>
                </div>
              </div>
              
              <div className="flex justify-center p-2">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleSelectDate}
                  disabled={(date) => 
                    date < new Date() || 
                    date.getDay() === 0 || 
                    date.getDay() === 6
                  }
                  className="rounded-md border"
                />
              </div>
              
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-4">
              <div className="bg-[#CB48B7]/10 p-3 rounded-lg flex items-center">
                <div className="mr-3 h-8 w-8 rounded-full bg-[#CB48B7]/20 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-[#CB48B7]" />
                </div>
                <div>
                  <p className="font-medium">{selectedDoctor?.name}</p>
                  <p className="text-sm text-gray-500">
                    {selectedDate && format(selectedDate, "MMMM d, yyyy")}
                  </p>
                </div>
              </div>
              
              <h3 className="font-medium">Available Time Slots</h3>
              <div className="grid grid-cols-3 gap-2">
                {TIME_SLOTS.map((time) => (
                  <button
                    key={time}
                    onClick={() => handleSelectTime(time)}
                    className={`p-2 rounded-md text-sm flex items-center justify-center gap-1 transition-all ${
                      selectedTime === time 
                        ? 'bg-[#301A4B] text-white' 
                        : 'border hover:border-[#CB48B7] hover:bg-[#CB48B7]/5'
                    }`}
                  >
                    <Clock className="h-3 w-3" />
                    {time}
                  </button>
                ))}
              </div>
              
              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setStep(2)}
                >
                  Back
                </Button>
                
                <Button 
                  className="bg-[#301A4B] hover:bg-[#301A4B]/90"
                  disabled={!selectedTime || isBooking}
                  onClick={handleBookAppointment}
                >
                  {isBooking ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                  {isBooking ? "Booking..." : "Book Appointment"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AppointmentManager;
