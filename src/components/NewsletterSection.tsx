
import React, { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail("");
      setName("");
      
      toast({
        title: "Subscribed!",
        description: "You've been subscribed to our newsletter. Thank you!",
        duration: 5000,
      });
    }, 1000);
  };

  return (
    <section className="section-container py-16 bg-lydia-peach/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-lydia-navy mb-4">
            Stay Updated with Lydia
          </h2>
          <p className="text-gray-600">
            Subscribe to our newsletter to receive updates, health tips, and exclusive offers
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-0 md:flex md:gap-4">
            <div className="flex-1">
              <label htmlFor="newsletter-name" className="sr-only">
                Your Name
              </label>
              <input
                type="text"
                id="newsletter-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="input-field"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="newsletter-email" className="sr-only">
                Email Address
              </label>
              <input
                type="email"
                id="newsletter-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email Address"
                required
                className="input-field"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto whitespace-nowrap btn-primary flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                "Subscribing..."
              ) : (
                <>
                  Subscribe <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-4 text-center">
            We respect your privacy. You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
