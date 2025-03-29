
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThermometerSnowflake } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SymptomCheckerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SymptomChecker: React.FC<SymptomCheckerProps> = ({ open, onOpenChange }) => {
  const [symptoms, setSymptoms] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

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

    setIsLoading(true);
    setFeedback(null);
    
    try {
      const { data, error } = await supabase.functions.invoke("symptom-check", {
        body: { symptoms: symptoms.trim() }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (data?.response) {
        setFeedback(data.response);
        toast({
          title: "Symptom analysis complete",
          description: "Lydia has analyzed your symptoms and provided feedback.",
        });
      }
    } catch (error) {
      console.error("Error checking symptoms:", error);
      toast({
        title: "Service unavailable",
        description: "We're having trouble analyzing your symptoms right now. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
            Describe your symptoms and get assistance from Lydia. Remember, this is not a substitute for professional medical care.
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Please describe your symptoms in detail. For example: 'I've had a headache for 3 days, along with a fever of 100°F and a sore throat.'"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="min-h-[150px]"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              className="w-full bg-[#301A4B] hover:bg-[#301A4B]/90"
              disabled={!symptoms.trim() || isLoading}
            >
              <ThermometerSnowflake className={`h-4 w-4 mr-2 ${isLoading ? 'animate-pulse' : ''}`} />
              {isLoading ? "Analyzing Symptoms..." : "Submit Symptoms"}
            </Button>
          </form>
          
          {feedback && (
            <div className="bg-[#E6E6FA]/50 p-4 rounded-lg border border-[#301A4B]/20 mt-4">
              <h3 className="font-medium mb-2 text-[#301A4B]">Lydia's Feedback:</h3>
              <div className="text-gray-700 whitespace-pre-line">
                {feedback}
              </div>
            </div>
          )}
          
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
