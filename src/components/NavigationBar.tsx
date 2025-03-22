
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NavigationBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "py-3 bg-white/80 backdrop-blur-md shadow-sm"
          : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="#" className="flex items-center">
            <img
              src="/lovable-uploads/dec92981-1a88-45bc-8229-830a75e1da92.png"
              alt="Lydia Logo"
              className="h-10 w-auto object-contain"
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#how-it-works" className="animated-link text-lydia-navy font-medium">
            How It Works
          </a>
          <a href="#benefits" className="animated-link text-lydia-navy font-medium">
            Benefits
          </a>
          <a href="#partnerships" className="animated-link text-lydia-navy font-medium">
            Partnerships
          </a>
          <a href="#waiting-list" className="btn-primary">
            Join Waiting List
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-lydia-navy focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 transform transition-transform duration-300 ease-in-out md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col space-y-6">
          <a
            href="#how-it-works"
            className="text-xl font-medium text-lydia-navy py-2 border-b border-gray-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            How It Works
          </a>
          <a
            href="#benefits"
            className="text-xl font-medium text-lydia-navy py-2 border-b border-gray-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Benefits
          </a>
          <a
            href="#partnerships"
            className="text-xl font-medium text-lydia-navy py-2 border-b border-gray-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Partnerships
          </a>
          <a
            href="#waiting-list"
            className="btn-primary text-center mt-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Join Waiting List
          </a>
        </nav>
      </div>
    </header>
  );
};

export default NavigationBar;
