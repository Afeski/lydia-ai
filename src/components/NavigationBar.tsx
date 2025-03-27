
import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.mobile-menu') && !target.closest('.menu-button')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "py-3 bg-[#301A4B]/90 backdrop-blur-md shadow-sm"
          : "py-5 bg-[#301A4B]"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="#" className="flex items-center">
            <h1 className="text-2xl font-bold text-white">Lydia</h1>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#how-it-works" className="animated-link text-white font-medium">
            How It Works
          </a>
          <a href="#benefits" className="animated-link text-white font-medium">
            Benefits
          </a>
          <a href="#partnerships" className="animated-link text-white font-medium">
            Partnerships
          </a>
          <a href="/login" className="text-white font-medium mr-2 hover:underline" onClick={(e) => { e.preventDefault(); handleLoginClick(); }}>
            Log In
          </a>
          <button 
            onClick={handleSignUpClick}
            className="flex items-center gap-2 bg-white text-[#301A4B] px-6 py-3 rounded-md font-medium hover:bg-white/90 transition-all duration-300"
          >
            Sign Up <ArrowRight size={16} />
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none menu-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-[#301A4B] z-40 flex flex-col pt-24 px-6 transform transition-transform duration-300 ease-in-out md:hidden mobile-menu",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <button 
          className="absolute right-6 top-6 text-white p-2"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
        
        <nav className="flex flex-col space-y-6">
          <a
            href="#how-it-works"
            className="text-xl font-medium text-white py-2 border-b border-white/10"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            How It Works
          </a>
          <a
            href="#benefits"
            className="text-xl font-medium text-white py-2 border-b border-white/10"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Benefits
          </a>
          <a
            href="#partnerships"
            className="text-xl font-medium text-white py-2 border-b border-white/10"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Partnerships
          </a>
          <a
            href="/login"
            className="text-xl font-medium text-white py-2 border-b border-white/10"
            onClick={(e) => { e.preventDefault(); handleLoginClick(); setIsMobileMenuOpen(false); }}
          >
            Log In
          </a>
          <button
            onClick={() => { handleSignUpClick(); setIsMobileMenuOpen(false); }}
            className="flex items-center justify-center gap-2 bg-white text-[#301A4B] px-6 py-3 rounded-md font-medium hover:bg-white/90 transition-all mt-4"
          >
            Sign Up <ArrowRight size={16} />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default NavigationBar;
