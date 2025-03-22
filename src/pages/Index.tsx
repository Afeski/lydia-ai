
import React, { useEffect } from "react";

import NavigationBar from "@/components/NavigationBar";
import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import BenefitsSection from "@/components/BenefitsSection";
import WaitingListSection from "@/components/WaitingListSection";
import PartnershipSection from "@/components/PartnershipSection";
import NewsletterSection from "@/components/NewsletterSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  // Smooth scroll to anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      
      if (link?.hash && link.hash.startsWith("#") && link.hash.length > 1) {
        e.preventDefault();
        const id = link.hash.substring(1);
        const element = document.getElementById(id);
        
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          
          // Update URL without reload
          history.pushState(null, "", link.hash);
        }
      }
    };

    document.body.addEventListener("click", handleAnchorClick);
    
    return () => {
      document.body.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  // Add a class to animate elements when they enter the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((element) => {
      observer.observe(element);
    });

    return () => {
      document.querySelectorAll(".animate-on-scroll").forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-lato">
      <NavigationBar />
      <main>
        <HeroSection />
        <VideoSection />
        <BenefitsSection />
        <WaitingListSection />
        <PartnershipSection />
        <NewsletterSection />
      </main>
      <FooterSection />
    </div>
  );
};

export default Index;
