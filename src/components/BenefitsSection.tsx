
import React from "react";
import { Clock, Heart } from "lucide-react";
import { Button } from "./ui/button";

const benefits = [{
  icon: <Clock className="w-6 h-6" />,
  title: "Save Time",
  description: "Skip the waiting room. Get initial assessments, schedule appointments, and manage your health from anywhere, anytime."
}, {
  icon: <Heart className="w-6 h-6" />,
  title: "Better Health Outcomes",
  description: "Stay on top of your medication schedule and treatment plans with smart reminders that help ensure you never miss a dose."
}, {
  icon: <img src="/lovable-uploads/770ddcc8-9941-462b-8969-a3a83e9fee1f.png" className="w-6 h-6" alt="Health Report" />,
  title: "AI-Powered Insights",
  description: "Our advanced AI analyzes your symptoms and health data to provide personalized insights and recommendations."
}];

const BenefitsSection = () => {
  return <section id="benefits" className="section-container bg-white">
      <div className="text-center mb-16">
        <h2 className="section-title">Healthcare that feels like Self-care</h2>
        <p className="section-subtitle">
          Discover how Lydia can transform your healthcare experience with these
          key benefits
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-center">
        <div className="w-full lg:w-1/2 space-y-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-4 p-6 rounded-xl">
              <div className="w-14 h-14 rounded-full bg-[#E6E6FA] flex items-center justify-center shrink-0 text-[#301A4B]">
                {benefit.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-lydia-navy mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
          
          <div className="mt-8">
            <Button 
              variant="default" 
              className="px-6 py-3 rounded-md bg-[#301A4B] text-white font-medium
                      transition-all duration-300 hover:bg-[#301A4B]/90 hover:shadow-md
                      focus:outline-none focus:ring-2 focus:ring-[#E6E6FA] focus:ring-offset-2"
            >
              Get Started
            </Button>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
          <img 
            src="/public/lovable-uploads/c7ad94b7-a2cc-42bf-9fca-15f90206bb6b.png" 
            alt="Virtual healthcare consultation" 
            className="w-full h-auto rounded-xl" 
          />
        </div>
      </div>
    </section>;
};

export default BenefitsSection;
