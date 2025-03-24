
import React, { useState } from "react";
import { Building, Handshake, HeartPulse, BarChart3, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const PartnershipSection = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    partnershipType: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log("Partnership form submitted:", formData);
    toast({
      title: "Partnership request submitted",
      description: "We'll be in touch with you shortly!",
    });
    setShowForm(false);
    setFormData({
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      partnershipType: "",
      message: ""
    });
  };

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
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              setShowForm(true);
              setFormData(prev => ({...prev, partnershipType: "Healthcare Provider"}));
            }} 
            className="mt-auto text-lydia-skyblue font-medium hover:text-[#CB48B7] transition-colors animated-link"
          >
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
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              setShowForm(true);
              setFormData(prev => ({...prev, partnershipType: "Insurance Company"}));
            }} 
            className="mt-auto text-lydia-skyblue font-medium hover:text-[#CB48B7] transition-colors animated-link"
          >
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
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              setShowForm(true);
              setFormData(prev => ({...prev, partnershipType: "Health Tech Company"}));
            }} 
            className="mt-auto text-lydia-skyblue font-medium hover:text-[#CB48B7] transition-colors animated-link"
          >
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
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              setShowForm(true);
              setFormData(prev => ({...prev, partnershipType: "Research Institution"}));
            }} 
            className="mt-auto text-lydia-skyblue font-medium hover:text-[#CB48B7] transition-colors animated-link"
          >
            Learn More
          </a>
        </div>
      </div>

      <div className="text-center animate-fade-in">
        <Button 
          onClick={() => setShowForm(true)} 
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-lydia-skyblue text-lydia-navy font-semibold rounded-lg hover:bg-lydia-skyblue/90 transition-all duration-300"
        >
          Become a Partner
        </Button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white text-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-2xl font-bold text-[#301A4B]">Partnership Inquiry</h3>
              <button 
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <Input 
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                  <Input 
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    className="w-full"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <Input 
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="partnershipType" className="block text-sm font-medium text-gray-700 mb-1">Partnership Type</label>
                  <select
                    id="partnershipType"
                    name="partnershipType"
                    value={formData.partnershipType}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#CB48B7] focus:border-transparent"
                    required
                  >
                    <option value="" disabled>Select partnership type</option>
                    <option value="Healthcare Provider">Healthcare Provider</option>
                    <option value="Insurance Company">Insurance Company</option>
                    <option value="Health Tech Company">Health Tech Company</option>
                    <option value="Research Institution">Research Institution</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Tell us more about your interest</label>
                  <Textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full h-32"
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-[#301A4B] hover:bg-[#301A4B]/90 text-white"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default PartnershipSection;
