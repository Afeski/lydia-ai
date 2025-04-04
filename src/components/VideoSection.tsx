import React, { useState } from "react";
import { Play, Calendar, ArrowRight } from "lucide-react";
const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlayVideo = () => {
    setIsPlaying(true);
  };
  return <section id="how-it-works" className="section-container bg-lydia-cream/50">
      <div className="text-center mb-16">
        <h2 className="section-title">How Lydia Works</h2>
        <p className="section-subtitle">
          See how Lydia simplifies healthcare management in just a few steps
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <img alt="Thermometer" className="w-8 h-8 object-contain" src="/lovable-uploads/5cf72dfe-bea1-49c2-99d7-c25133847b07.jpg" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-lydia-navy mb-2">Symptom Assessment</h3>
              <p className="text-gray-600">
                Describe your symptoms to Lydia, and our AI will analyze them to provide preliminary insights and next steps.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <img src="/lovable-uploads/c3040a8f-783d-4f0b-a818-b5ee8f6c39d7.png" alt="Calendar" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-lydia-navy mb-2">Schedule Consultations</h3>
              <p className="text-gray-600">
                Easily book appointments with healthcare providers through the platform, with smart scheduling that fits your availability.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <img alt="Pill" className="w-8 h-8 object-contain" src="/lovable-uploads/6a9fb43b-c9f3-4ec2-b559-3a1b69e44d80.jpg" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-lydia-navy mb-2">Medication Reminders</h3>
              <p className="text-gray-600">
                Never miss a dose with personalized medication reminders and easy tracking of your treatment plan.
              </p>
            </div>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          {isPlaying ? <iframe width="100%" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" title="Lydia Health Assistant Demo" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="aspect-video rounded-2xl"></iframe> : <div className="relative group cursor-pointer" onClick={handlePlayVideo}>
              <div className="absolute inset-0 bg-lydia-navy/20 group-hover:bg-lydia-navy/30 transition-all duration-300 flex items-center justify-center rounded-2xl">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
                  <Play className="w-8 h-8 text-lydia-navy fill-current ml-1" />
                </div>
              </div>
              <img src="/lovable-uploads/0939a336-cfed-44d2-8108-b7c0d3b9810d.png" alt="Lydia Demo Video Thumbnail" className="w-full aspect-video object-cover rounded-2xl" />
              <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg">
                <p className="font-semibold text-lydia-navy">Watch Demo (2:15)</p>
              </div>
            </div>}
        </div>
      </div>

      <div className="mt-16 text-center">
        <a href="/signup" className="btn-primary inline-flex items-center gap-2 group">
          Get Started
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>;
};
export default VideoSection;