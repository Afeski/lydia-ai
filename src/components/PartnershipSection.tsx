
import React from "react";
import { Building, Handshake, HeartPulse, BarChart3 } from "lucide-react";

const PartnershipSection = () => {
  return (
    <section id="partnerships" className="section-container bg-lydia-navy text-white">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Looking for Partnerships</h2>
        <p className="text-lg text-lydia-skyblue/90 mb-10 max-w-3xl mx-auto">
          Join us in revolutionizing healthcare through AI and telemedicine. Partner with Lydia to expand your reach and enhance patient care.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 flex flex-col items-start card-hover">
          <div className="w-12 h-12 rounded-full bg-lydia-skyblue/20 flex items-center justify-center mb-6">
            <Building className="w-6 h-6 text-lydia-skyblue" />
          </div>
          <h3 className="text-xl font-bold mb-4">Healthcare Providers</h3>
          <p className="text-gray-300 mb-6">
            Integrate Lydia into your practice to streamline patient communication, appointment scheduling, and follow-ups. Expand your telehealth capabilities with our AI-powered platform.
          </p>
          <a href="#contact" className="mt-auto text-lydia-skyblue font-medium hover:text-white animated-link">
            Learn More
          </a>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 flex flex-col items-start card-hover">
          <div className="w-12 h-12 rounded-full bg-lydia-skyblue/20 flex items-center justify-center mb-6">
            <HeartPulse className="w-6 h-6 text-lydia-skyblue" />
          </div>
          <h3 className="text-xl font-bold mb-4">Insurance Companies</h3>
          <p className="text-gray-300 mb-6">
            Partner with Lydia to promote preventative care, improve medication adherence, and reduce healthcare costs for your members. Our platform can help drive better health outcomes.
          </p>
          <a href="#contact" className="mt-auto text-lydia-skyblue font-medium hover:text-white animated-link">
            Learn More
          </a>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 flex flex-col items-start card-hover">
          <div className="w-12 h-12 rounded-full bg-lydia-skyblue/20 flex items-center justify-center mb-6">
            <BarChart3 className="w-6 h-6 text-lydia-skyblue" />
          </div>
          <h3 className="text-xl font-bold mb-4">Health Tech Companies</h3>
          <p className="text-gray-300 mb-6">
            Integrate your health technology with Lydia to create a more comprehensive healthcare ecosystem. From wearables to health monitoring devices, we're open to innovative collaborations.
          </p>
          <a href="#contact" className="mt-auto text-lydia-skyblue font-medium hover:text-white animated-link">
            Learn More
          </a>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 flex flex-col items-start card-hover">
          <div className="w-12 h-12 rounded-full bg-lydia-skyblue/20 flex items-center justify-center mb-6">
            <Handshake className="w-6 h-6 text-lydia-skyblue" />
          </div>
          <h3 className="text-xl font-bold mb-4">Research Institutions</h3>
          <p className="text-gray-300 mb-6">
            Collaborate with us on research initiatives to advance AI in healthcare, improve telehealth outcomes, and develop better symptom assessment algorithms for diverse populations.
          </p>
          <a href="#contact" className="mt-auto text-lydia-skyblue font-medium hover:text-white animated-link">
            Learn More
          </a>
        </div>
      </div>

      <div className="text-center animate-fade-in">
        <a href="mailto:partnerships@lydiahealth.com" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-lydia-skyblue text-lydia-navy font-semibold rounded-lg hover:bg-lydia-skyblue/90 transition-all duration-300">
          Become a Partner
        </a>
      </div>
    </section>
  );
};

export default PartnershipSection;
