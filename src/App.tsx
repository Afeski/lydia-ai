
// Extend the Window interface to include our custom methods
declare global {
  interface Window {
    loginUser: () => void;
    logoutUser: () => void;
    completeOnboarding: () => void;
  }
}

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import OnboardingPage from "./pages/OnboardingPage";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  // Mock authentication state - in a real app, this would come from your auth provider
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);

  // Check localStorage for auth status on app load
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
    
    const onboardStatus = localStorage.getItem("isOnboarded");
    if (onboardStatus === "true") {
      setIsOnboarded(true);
    }
  }, []);

  // For demo purposes - to simulate login/logout
  window.loginUser = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  window.logoutUser = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isOnboarded");
    setIsAuthenticated(false);
    setIsOnboarded(false);
  };

  window.completeOnboarding = () => {
    localStorage.setItem("isOnboarded", "true");
    setIsOnboarded(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route 
              path="/login" 
              element={
                isAuthenticated ? (
                  <Navigate to={isOnboarded ? "/dashboard" : "/onboarding"} />
                ) : (
                  <Login onLoginSuccess={() => window.loginUser()} />
                )
              } 
            />
            <Route 
              path="/signup" 
              element={
                isAuthenticated ? (
                  <Navigate to={isOnboarded ? "/dashboard" : "/onboarding"} />
                ) : (
                  <SignUp onSignUpSuccess={() => window.loginUser()} />
                )
              } 
            />
            <Route 
              path="/onboarding" 
              element={
                !isAuthenticated ? (
                  <Navigate to="/login" />
                ) : isOnboarded ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <OnboardingPage onComplete={() => window.completeOnboarding()} />
                )
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                !isAuthenticated ? (
                  <Navigate to="/login" />
                ) : !isOnboarded ? (
                  <Navigate to="/onboarding" />
                ) : (
                  <Dashboard />
                )
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
