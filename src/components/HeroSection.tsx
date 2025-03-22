
import React from "react";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-32 bg-gradient-to-b from-lydia-lavender/30 to-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(231,229,250,0.8),transparent_70%)]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2 stagger-animation">
            <div className="hero-chip mb-4">AI-Powered Health Assistant</div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-lydia-navy mb-6 leading-tight">
              Lydia: Your AI Health Assistant
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg">
              Lydia is your AI Health companion. It gauges your symptoms, schedules appointments with doctors, and checks in with reminders for you to take your medication.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#" className="btn-primary flex items-center justify-center gap-2 group">
                Get Started
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#how-it-works" className="btn-secondary flex items-center justify-center">
                Watch How It Works
              </a>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform transition-all hover:scale-[1.01] duration-500 ease-in-out">
              <div className="absolute inset-0 bg-gradient-to-tr from-lydia-navy/30 to-transparent z-10 rounded-2xl"></div>
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
