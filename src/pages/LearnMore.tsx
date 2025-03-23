
import React from "react";
import NavigationBar from "@/components/NavigationBar";
import CompanyForm from "@/components/CompanyForm";
import FooterSection from "@/components/FooterSection";

const LearnMore = () => {
  return (
    <div className="min-h-screen flex flex-col font-outfit">
      <NavigationBar />
      <main className="flex-grow">
        <div className="section-container py-20 bg-lydia-cream/50">
          <CompanyForm />
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default LearnMore;
