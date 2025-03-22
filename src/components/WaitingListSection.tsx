
import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const WaitingListSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        reason: "",
      });
      
      toast({
        title: "Success!",
        description: "You've been added to our waiting list. We'll be in touch soon!",
        duration: 5000,
      });
    }, 1500);
  };

  return (
    <section id="waiting-list" className="section-container bg-gradient-to-b from-white to-lydia-lavender/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in">
            <div className="mb-8">
              <h2 className="section-title">Join Our Waiting List</h2>
              <p className="text-lg text-gray-600 mb-6">
                Be among the first to experience Lydia when we launch. Join our waiting list today.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-lydia-skyblue/30 flex items-center justify-center mt-1">
                  <Check className="w-4 h-4 text-lydia-navy" />
                </div>
                <p className="text-gray-700">
                  <span className="font-semibold">Early Access:</span> Be first in line to try Lydia when we launch
                </p>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-lydia-skyblue/30 flex items-center justify-center mt-1">
                  <Check className="w-4 h-4 text-lydia-navy" />
                </div>
                <p className="text-gray-700">
                  <span className="font-semibold">Exclusive Updates:</span> Receive progress updates and inside information
                </p>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-lydia-skyblue/30 flex items-center justify-center mt-1">
                  <Check className="w-4 h-4 text-lydia-navy" />
                </div>
                <p className="text-gray-700">
                  <span className="font-semibold">Special Offers:</span> Get access to launch promotions and discounts
                </p>
              </div>
            </div>
          </div>

          <div className="glassmorphism rounded-2xl p-8 animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-lydia-navy mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-lydia-navy mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Enter your email address"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-lydia-navy mb-1">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-lydia-navy mb-1">
                  Why are you interested in Lydia? (Optional)
                </label>
                <textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  rows={3}
                  className="input-field resize-none"
                  placeholder="Tell us why you're interested in using Lydia"
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center gap-2 group"
              >
                {isSubmitting ? (
                  "Processing..."
                ) : (
                  <>
                    Join Waiting List
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitingListSection;
