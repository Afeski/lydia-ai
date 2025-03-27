
import React, { useState } from "react";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { 
  CalendarDays, 
  MapPin, 
  Clock, 
  Video, 
  User, 
  Clipboard, 
  Phone, 
  ArrowLeft, 
  Video as VideoIcon 
} from "lucide-react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

type AppointmentType = "virtual" | "in-person";

export interface DoctorDetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doctor: {
    id: number;
    name: string;
    specialty: string;
    image?: string;
    bio?: string;
    location?: string;
    appointmentType: AppointmentType;
    date: string;
    time: string;
    patientCase?: string;
  };
}

type ViewState = "details" | "waiting-room" | "consultation";

const DoctorDetail = ({ open, onOpenChange, doctor }: DoctorDetailProps) => {
  const [viewState, setViewState] = useState<ViewState>("details");
  const isMobile = useIsMobile();
  
  const startConsultation = () => {
    setViewState("consultation");
  };

  const joinWaitingRoom = () => {
    setViewState("waiting-room");
  };

  const goBack = () => {
    if (viewState === "waiting-room") {
      setViewState("details");
    } else if (viewState === "consultation") {
      setViewState("waiting-room");
    }
  };

  const handleClose = () => {
    setViewState("details");
    onOpenChange(false);
  };

  const renderContent = () => {
    switch (viewState) {
      case "details":
        return (
          <>
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="shrink-0">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden">
                  {doctor.image ? (
                    <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-10 h-10 text-purple-700" />
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold">{doctor.name}</h3>
                <p className="text-gray-600">{doctor.specialty}</p>
                
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarDays className="h-4 w-4 text-purple-600" />
                    <span>{doctor.date} • {doctor.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    {doctor.appointmentType === "virtual" ? (
                      <>
                        <Video className="h-4 w-4 text-purple-600" />
                        <span>Virtual Appointment</span>
                      </>
                    ) : (
                      <>
                        <MapPin className="h-4 w-4 text-purple-600" />
                        <span>{doctor.location || "Office Visit"}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {doctor.bio && (
              <div className="mb-6">
                <h4 className="font-semibold mb-2">About</h4>
                <p className="text-sm text-gray-600">{doctor.bio}</p>
              </div>
            )}
            
            {doctor.patientCase && (
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Your Case</h4>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-start gap-2">
                    <Clipboard className="w-5 h-5 text-purple-600 mt-0.5" />
                    <p className="text-sm text-gray-600">{doctor.patientCase}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex flex-col space-y-3 mt-6">
              {doctor.appointmentType === "virtual" ? (
                <Button 
                  className="w-full bg-[#301A4B] hover:bg-[#301A4B]/90"
                  onClick={joinWaitingRoom}
                >
                  Join Virtual Waiting Room
                </Button>
              ) : (
                <Button 
                  className="w-full bg-[#301A4B] hover:bg-[#301A4B]/90"
                >
                  Get Directions
                </Button>
              )}
              
              <Button 
                variant="outline" 
                className="w-full border-[#301A4B] text-[#301A4B]"
              >
                <Phone className="mr-2 h-4 w-4" />
                Contact Office
              </Button>
            </div>
          </>
        );
        
      case "waiting-room":
        return (
          <>
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-10 h-10 text-green-600" />
              </div>
              
              <h3 className="text-xl font-bold">Virtual Waiting Room</h3>
              <p className="text-gray-600 mt-2">
                You're in the virtual waiting room for your appointment with {doctor.name}. 
                The doctor will start the consultation shortly.
              </p>
              
              <div className="w-full bg-gray-100 rounded-lg p-4 mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Appointment starts in:</span>
                  <span className="text-sm font-medium text-purple-700">~5 mins</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full w-3/4"></div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button 
                className="w-full bg-[#301A4B] hover:bg-[#301A4B]/90"
                onClick={startConsultation}
              >
                Start Consultation Now
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={goBack}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Details
              </Button>
            </div>
          </>
        );
        
      case "consultation":
        return (
          <>
            <div className="flex flex-col items-center">
              <div className="w-full aspect-video bg-gray-900 rounded-lg mb-4 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <VideoIcon className="w-16 h-16 text-white opacity-50" />
                </div>
                <div className="absolute bottom-4 right-4 w-1/4 aspect-video bg-gray-700 rounded-md overflow-hidden border-2 border-white"></div>
              </div>
              
              <h3 className="text-lg font-bold mb-2">Consulting with {doctor.name}</h3>
              
              <div className="grid grid-cols-4 gap-3 w-full mt-4">
                <Button 
                  variant="outline" 
                  className="p-3 aspect-square flex flex-col items-center justify-center"
                >
                  <VideoIcon className="w-5 h-5 mb-1" />
                  <span className="text-xs">Camera</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="p-3 aspect-square flex flex-col items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" x2="12" y1="19" y2="22"></line>
                  </svg>
                  <span className="text-xs">Mute</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="p-3 aspect-square flex flex-col items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1">
                    <rect width="14" height="14" x="5" y="5" rx="2" ry="2"></rect>
                    <line x1="12" x2="12" y1="2" y2="5"></line>
                    <line x1="12" x2="12" y1="19" y2="22"></line>
                    <line x1="5" x2="2" y1="12" y2="12"></line>
                    <line x1="22" x2="19" y1="12" y2="12"></line>
                  </svg>
                  <span className="text-xs">Share</span>
                </Button>
                
                <Button 
                  className="p-3 aspect-square flex flex-col items-center justify-center bg-red-500 hover:bg-red-600"
                  onClick={goBack}
                >
                  <Phone className="w-5 h-5 mb-1 rotate-135" />
                  <span className="text-xs">End</span>
                </Button>
              </div>
            </div>
          </>
        );
        
      default:
        return null;
    }
  };

  const MobileContent = () => (
    <Drawer open={open} onOpenChange={handleClose}>
      <DrawerContent className="px-4 pb-6">
        <DrawerHeader>
          <DrawerTitle>
            {viewState === "details" ? "Appointment Details" : 
             viewState === "waiting-room" ? "Virtual Waiting Room" : 
             "Video Consultation"}
          </DrawerTitle>
          {viewState !== "details" && (
            <button 
              className="absolute left-4 top-4 p-2 rounded-md hover:bg-gray-100"
              onClick={goBack}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
        </DrawerHeader>
        
        <div className="px-1 mt-2">
          {renderContent()}
        </div>
      </DrawerContent>
    </Drawer>
  );

  const DesktopContent = () => (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {viewState === "details" ? "Appointment Details" : 
             viewState === "waiting-room" ? "Virtual Waiting Room" : 
             "Video Consultation"}
          </SheetTitle>
          {viewState !== "details" && (
            <button 
              className="absolute left-4 top-4 p-2 rounded-md hover:bg-gray-100"
              onClick={goBack}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
        </SheetHeader>
        
        <div className="py-6">
          {renderContent()}
        </div>
      </SheetContent>
    </Sheet>
  );

  return isMobile ? <MobileContent /> : <DesktopContent />;
};

export default DoctorDetail;
