
import React from "react";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-32 bg-gradient-to-b from-lydia-lavender/30 to-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(231,229,250,0.8),transparent_70%)]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#301A4B] mb-6 leading-tight">
              Lydia: Your AI Health Assistant
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg">
              Lydia is your AI Health companion. It gauges your symptoms, schedules appointments with doctors, and checks in with reminders for you to take your medication.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/signup" className="bg-[#301A4B] text-white px-6 py-3 rounded-md font-medium transition-all duration-300 hover:bg-[#301A4B]/90 hover:shadow-md flex items-center justify-center gap-2 group">
                Get Started
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="/learn-more" className="bg-[#CB48B7] text-white px-6 py-3 rounded-md font-medium transition-all duration-300 hover:bg-[#CB48B7]/80 hover:shadow-md flex items-center justify-center">
                Learn More
              </a>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#301A4B]/30 to-transparent z-10 rounded-2xl"></div>
              <img
                src="/lovable-uploads/0939a336-cfed-44d2-8108-b7c0d3b9810d.png"
                alt="A woman having a telemedicine consultation with a doctor"
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default HeroSection;
