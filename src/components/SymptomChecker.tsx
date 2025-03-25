
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThermometerSnowflake, Loader2 } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SymptomCheckerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SymptomChecker: React.FC<SymptomCheckerProps> = ({ open, onOpenChange }) => {
  const [symptoms, setSymptoms] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    setResponse("");

    try {
      console.log("Sending symptoms to symptom-check function:", symptoms.substring(0, 50) + "...");
      
      const { data, error } = await supabase.functions.invoke("symptom-check", {
        body: { symptoms: symptoms.trim() }
      });

      if (error) {
        console.error("Error checking symptoms:", error);
        throw error;
      }

      if (!data || !data.response) {
        throw new Error("No response received from symptom checker");
      }

      setResponse(data.response);
    } catch (error) {
      console.error("Error checking symptoms:", error);
      toast({
        title: "Error",
        description: "Failed to analyze symptoms. Please try again.",
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
            Describe your symptoms and get personalized advice. Remember, this is not a substitute for professional medical care.
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
              disabled={isLoading || !symptoms.trim()}
            >
              {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <ThermometerSnowflake className="h-4 w-4 mr-2" />}
              {isLoading ? "Analyzing your symptoms..." : "Check My Symptoms"}
            </Button>
          </form>
          
          {response && (
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="font-medium mb-2">Lydia's Response:</h3>
              <div className="text-gray-700 whitespace-pre-line">
                {response}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SymptomChecker;
