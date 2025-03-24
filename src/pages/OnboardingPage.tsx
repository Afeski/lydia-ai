
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  CheckCircle2, 
  User, 
  Calendar, 
  Pill, 
  Activity 
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

// Define the preferences type to avoid TypeScript errors
type UserPreferences = {
  reminderFrequency: string;
  preferredDoctorType: string[];
  healthGoals: string[];
  chronicConditions: string[];
};

const OnboardingPage = ({ onComplete = () => {} }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<UserPreferences>({
    reminderFrequency: "daily",
    preferredDoctorType: [],
    healthGoals: [],
    chronicConditions: []
  });

  const totalSteps = 4;

  const handleNext = async () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      try {
        if (user) {
          // Use type assertion to safely use the Supabase client with our table
          const { error } = await supabase
            .from('user_preferences')
            .upsert({
              user_id: user.id,
              preferences: preferences
            } as any);
            
          if (error) throw error;
        }
        
        localStorage.setItem("userPreferences", JSON.stringify(preferences));
        
        localStorage.setItem("isOnboarded", "true");
        
        toast({
          title: "Setup complete!",
          description: "Your preferences have been saved.",
        });
        
        onComplete();
        navigate("/dashboard");
      } catch (error) {
        console.error("Error saving preferences:", error);
        
        localStorage.setItem("isOnboarded", "true");
        
        toast({
          title: "Warning",
          description: "Your preferences were saved locally, but we couldn't save them to your profile.",
          variant: "destructive",
        });
        
        onComplete();
        navigate("/dashboard");
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const togglePreference = (category, item) => {
    setPreferences(prev => {
      const current = [...prev[category]];
      const index = current.indexOf(item);
      
      if (index === -1) {
        current.push(item);
      } else {
        current.splice(index, 1);
      }
      
      return {
        ...prev,
        [category]: current
      };
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-lydia-lavender/30 to-white">
      <div className="max-w-3xl mx-auto py-12 px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#301A4B] mb-2">Welcome to Lydia</h1>
          <p className="text-gray-600">Let's personalize your experience</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Progress bar */}
          <div className="w-full bg-gray-100 h-2">
            <div 
              className="bg-[#301A4B] h-2 transition-all duration-500 ease-out"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>

          <div className="p-8">
            {/* Step 1 - Health Goals */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-[#301A4B] mb-4">What are your health goals?</h2>
                <p className="text-gray-600 mb-6">Select all that apply to you</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {["Manage chronic condition", "Improve fitness", "Better sleep", "Mental wellbeing", "Weight management", "Medication adherence"].map((goal, index) => (
                    <button
                      key={index}
                      className={`p-4 border rounded-lg text-left flex items-center transition-all ${
                        preferences.healthGoals.includes(goal)
                          ? "border-[#301A4B] bg-[#301A4B]/10"
                          : "border-gray-200 hover:border-[#301A4B]/50"
                      }`}
                      onClick={() => togglePreference("healthGoals", goal)}
                    >
                      {preferences.healthGoals.includes(goal) ? (
                        <CheckCircle2 className="w-5 h-5 text-[#301A4B] mr-3 flex-shrink-0" />
                      ) : (
                        <div className="w-5 h-5 border border-gray-300 rounded-full mr-3 flex-shrink-0"></div>
                      )}
                      {goal}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2 - Doctor Preferences */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-[#301A4B] mb-4">What type of doctors do you consult?</h2>
                <p className="text-gray-600 mb-6">This helps us connect you with relevant specialists</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {["Primary Care Physician", "Cardiologist", "Dermatologist", "Neurologist", "Psychiatrist", "Endocrinologist", "Gynecologist", "Orthopedist"].map((doctor, index) => (
                    <button
                      key={index}
                      className={`p-4 border rounded-lg text-left flex items-center transition-all ${
                        preferences.preferredDoctorType.includes(doctor)
                          ? "border-[#301A4B] bg-[#301A4B]/10"
                          : "border-gray-200 hover:border-[#301A4B]/50"
                      }`}
                      onClick={() => togglePreference("preferredDoctorType", doctor)}
                    >
                      {preferences.preferredDoctorType.includes(doctor) ? (
                        <CheckCircle2 className="w-5 h-5 text-[#301A4B] mr-3 flex-shrink-0" />
                      ) : (
                        <div className="w-5 h-5 border border-gray-300 rounded-full mr-3 flex-shrink-0"></div>
                      )}
                      {doctor}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3 - Reminder Preferences */}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-[#301A4B] mb-4">How often would you like medication reminders?</h2>
                <p className="text-gray-600 mb-6">We'll set up notifications based on your preference</p>
                
                <div className="space-y-3 mb-8">
                  {["daily", "twice-daily", "custom"].map((frequency) => (
                    <button
                      key={frequency}
                      className={`w-full p-4 border rounded-lg text-left flex items-center transition-all ${
                        preferences.reminderFrequency === frequency
                          ? "border-[#301A4B] bg-[#301A4B]/10"
                          : "border-gray-200 hover:border-[#301A4B]/50"
                      }`}
                      onClick={() => setPreferences({...preferences, reminderFrequency: frequency})}
                    >
                      {preferences.reminderFrequency === frequency ? (
                        <CheckCircle2 className="w-5 h-5 text-[#301A4B] mr-3 flex-shrink-0" />
                      ) : (
                        <div className="w-5 h-5 border border-gray-300 rounded-full mr-3 flex-shrink-0"></div>
                      )}
                      {frequency === "daily" && "Once daily"}
                      {frequency === "twice-daily" && "Twice daily (morning and evening)"}
                      {frequency === "custom" && "Custom schedule"}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4 - Chronic Conditions */}
            {step === 4 && (
              <div>
                <h2 className="text-2xl font-bold text-[#301A4B] mb-4">Do you have any chronic conditions?</h2>
                <p className="text-gray-600 mb-6">This helps us personalize your experience</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {["Diabetes", "Hypertension", "Asthma", "Heart disease", "Arthritis", "Thyroid disorder", "None"].map((condition, index) => (
                    <button
                      key={index}
                      className={`p-4 border rounded-lg text-left flex items-center transition-all ${
                        preferences.chronicConditions.includes(condition)
                          ? "border-[#301A4B] bg-[#301A4B]/10"
                          : "border-gray-200 hover:border-[#301A4B]/50"
                      }`}
                      onClick={() => togglePreference("chronicConditions", condition)}
                    >
                      {preferences.chronicConditions.includes(condition) ? (
                        <CheckCircle2 className="w-5 h-5 text-[#301A4B] mr-3 flex-shrink-0" />
                      ) : (
                        <div className="w-5 h-5 border border-gray-300 rounded-full mr-3 flex-shrink-0"></div>
                      )}
                      {condition}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
                className="text-[#301A4B]"
              >
                Back
              </Button>
              
              <Button 
                onClick={handleNext}
                className="bg-[#301A4B] hover:bg-[#301A4B]/90 text-white flex items-center gap-2"
              >
                {step === totalSteps ? "Complete Setup" : "Continue"}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Step {step} of {totalSteps}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
