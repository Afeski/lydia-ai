import React from "react";
import { Star, Tag, CreditCard } from "lucide-react";

// Update the benefits to just three
const benefits = [{
  icon: <Star className="w-6 h-6" />,
  title: "Easy access to top-tier care",
  description: "Discover trusted health and wellness centers, from hospitals and pharmacies to spas and gyms, for all your needs."
}, {
  icon: <Tag className="w-6 h-6" />,
  title: "Exclusive discounts",
  description: "Get up to 30% off health and wellness products and services from our partners."
}, {
  icon: <CreditCard className="w-6 h-6" />,
  title: "Quick, easy payment",
  description: "Use your Health Savings Account (HSA) to pay for services and products at your favorite health and wellness providers."
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
          {benefits.map((benefit, index) => <div key={index} className="flex items-start gap-4 p-6 rounded-xl animate-fade-in" style={{
          animationDelay: `${0.1 * index}s`
        }}>
              <div className="w-14 h-14 rounded-full bg-[#E6E6FA] flex items-center justify-center shrink-0 text-[#301A4B] animate-bounce-subtle" style={{
            animationDelay: `${0.2 * index}s`
          }}>
                {benefit.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-lydia-navy mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </div>)}
          
          <div className="mt-8">
            <a href="#" className="btn-primary inline-flex">Experience the Benefits</a>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
          <img src="/public/lovable-uploads/c7ad94b7-a2cc-42bf-9fca-15f90206bb6b.png" alt="Virtual healthcare consultation" className="w-full h-auto rounded-xl shadow-lg" />
        </div>
      </div>
    </section>;
};
export default BenefitsSection;