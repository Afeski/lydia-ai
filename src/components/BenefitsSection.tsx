
import React from "react";
import { Clock, Heart, ShieldCheck, Brain } from "lucide-react";

const benefits = [
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Save Time",
    description:
      "Skip the waiting room. Get initial assessments, schedule appointments, and manage your health from anywhere, anytime.",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Better Health Outcomes",
    description:
      "Stay on top of your medication schedule and treatment plans with smart reminders that help ensure you never miss a dose.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Secure & Private",
    description:
      "Your health data is encrypted and protected. We maintain the highest standards of security and privacy compliance.",
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "AI-Powered Insights",
    description:
      "Our advanced AI analyzes your symptoms and health data to provide personalized insights and recommendations.",
  },
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="section-container bg-white">
      <div className="text-center mb-16">
        <h2 className="section-title">Benefits of Using Lydia</h2>
        <p className="section-subtitle">
          Discover how Lydia can transform your healthcare experience with these
          key benefits
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 rounded-xl bg-lydia-lavender/30 border border-lydia-lavender shadow-sm card-hover"
            style={{ animationDelay: `${0.1 * index}s` }}
          >
            <div className="w-16 h-16 rounded-full bg-lydia-peach/40 flex items-center justify-center mb-4 text-lydia-navy">
              {benefit.icon}
            </div>
            <h3 className="text-xl font-bold text-lydia-navy mb-3">
              {benefit.title}
            </h3>
            <p className="text-gray-600">{benefit.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center animate-fade-in">
        <a href="#waiting-list" className="btn-primary inline-flex">
          Experience the Benefits
        </a>
      </div>
    </section>
  );
};

export default BenefitsSection;
