
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pill, Calendar, Clock, Plus, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
  nextDose: string;
  remaining: number;
  refillDate: string;
}

interface MedicationsPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  medications: Medication[];
}

const MedicationsPanel: React.FC<MedicationsPanelProps> = ({
  open,
  onOpenChange,
  medications,
}) => {
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const handleMarkAsTaken = (id: number) => {
    toast({
      title: "Medication Taken",
      description: "Your medication has been marked as taken.",
    });
  };

  const handleRefillRequest = (id: number) => {
    toast({
      title: "Refill Requested",
      description: "Your medication refill request has been sent to your pharmacy.",
    });
  };

  const renderMedicationCard = (medication: Medication) => {
    const isLowStock = medication.remaining <= 7;

    return (
      <Card key={medication.id} className="mb-4 border border-gray-200 shadow-sm">
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full ${isLowStock ? 'bg-red-100' : 'bg-blue-100'} flex items-center justify-center mr-3`}>
                <Pill className={`h-5 w-5 ${isLowStock ? 'text-red-500' : 'text-blue-500'}`} />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{medication.name}</h4>
                <p className="text-sm text-gray-500">{medication.dosage} · {medication.frequency}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-gray-400 mr-1" />
                <span className="text-sm text-gray-600">{medication.time}</span>
              </div>
              {isLowStock && (
                <div className="flex items-center mt-1 text-red-500">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span className="text-xs">Low stock: {medication.remaining} left</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
            <div>
              <p className="text-xs text-gray-500">Refill by: {medication.refillDate}</p>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleMarkAsTaken(medication.id)}
                className="text-xs h-8"
              >
                Mark as Taken
              </Button>
              {isLowStock && (
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={() => handleRefillRequest(medication.id)}
                  className="text-xs h-8 bg-[#301A4B]"
                >
                  Request Refill
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center">
            <Pill className="mr-2 h-5 w-5 text-[#301A4B]" />
            My Medications
          </DialogTitle>
          <DialogDescription>
            View and manage your medications and dosage schedule
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-between mb-4">
          <div className="flex space-x-2">
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-[#301A4B]" : ""}
            >
              List View
            </Button>
            <Button
              variant={viewMode === "calendar" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("calendar")}
              className={viewMode === "calendar" ? "bg-[#301A4B]" : ""}
            >
              Calendar View
            </Button>
          </div>
          <Button size="sm" variant="outline" className="text-[#301A4B] border-[#CB48B7]/30">
            <Plus className="h-4 w-4 mr-1" /> Add Medication
          </Button>
        </div>

        {viewMode === "list" ? (
          <div className="space-y-1">
            {medications.length > 0 ? (
              medications.map(renderMedicationCard)
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">No medications added yet.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="calendar-view bg-gray-50 p-4 rounded-lg">
            <div className="text-center mb-4">
              <h3 className="font-medium">June 2023</h3>
              <p className="text-sm text-gray-500">Calendar view coming soon</p>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                <div key={day} className="text-xs font-medium p-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className={`text-xs p-2 rounded-full cursor-pointer ${
                    i + 1 === 15 ? 'bg-[#301A4B] text-white' : 'hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedDay(`June ${i + 1}, 2023`)}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MedicationsPanel;
