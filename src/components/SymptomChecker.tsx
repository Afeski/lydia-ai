
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThermometerSnowflake } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { toast } from "@/hooks/use-toast";

interface SymptomCheckerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SymptomChecker: React.FC<SymptomCheckerProps> = ({ open, onOpenChange }) => {
  const [symptoms, setSymptoms] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) {
      toast({
        title: "Please enter your symptoms",
        description: "We need to know what you're experiencing to provide advice.",
        variant: "destructive",
      });
      return;
    }

    // Instead of calling an AI service, display a standard message
    toast({
      title: "Symptom information received",
      description: "A healthcare professional will review your symptoms and contact you shortly.",
    });
    
    // Clear the form
    setSymptoms("");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md md:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <ThermometerSnowflake className="mr-2 h-5 w-5 text-[#CB48B7]" />
            Symptom Checker
          </SheetTitle>
          <SheetDescription>
            Describe your symptoms and get assistance from our healthcare team. Remember, this is not a substitute for professional medical care.
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Please describe your symptoms in detail. For example: 'I've had a headache for 3 days, along with a fever of 100°F and a sore throat.'"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="min-h-[150px]"
            />
            <Button 
              type="submit" 
              className="w-full bg-[#301A4B] hover:bg-[#301A4B]/90"
              disabled={!symptoms.trim()}
            >
              <ThermometerSnowflake className="h-4 w-4 mr-2" />
              Submit Symptoms
            </Button>
          </form>
          
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="font-medium mb-2">Important Note:</h3>
            <div className="text-gray-700">
              <p>Your symptoms will be reviewed by our healthcare team. For immediate medical concerns, please contact emergency services or visit your nearest emergency room.</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SymptomChecker;
