
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
import { AuthProvider, useAuth } from "./contexts/AuthContext";

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ 
  children, 
  requiresAuth = true, 
  requiresOnboarding = false,
  redirectTo = "/login"
}) => {
  const { user, loading } = useAuth();
  const isAuthenticated = !!user;
  const isOnboarded = localStorage.getItem("isOnboarded") === "true";
  
  // Show loading state while checking auth
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  // If auth is required but user is not authenticated
  if (requiresAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} />;
  }
  
  // If user is authenticated but not onboarded and onboarding is required for new users
  if (requiresAuth && isAuthenticated && requiresOnboarding && !isOnboarded) {
    const email = user?.email;
    const userMetadata = user?.user_metadata;
    
    // Check if this is a new user who needs onboarding
    // We consider a user new if they don't have the isOnboarded flag in localStorage
    // and they don't have any user metadata that would indicate they've been here before
    const isNewUser = !isOnboarded && (!userMetadata || Object.keys(userMetadata).length === 0);
    
    if (isNewUser) {
      return <Navigate to="/onboarding" />;
    }
    
    // If not a new user but not onboarded yet, just mark them as onboarded and continue
    localStorage.setItem("isOnboarded", "true");
  }
  
  // If user is already authenticated and trying to access login/signup
  if (!requiresAuth && isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route 
        path="/login" 
        element={
          <ProtectedRoute requiresAuth={false} redirectTo="/dashboard">
            <Login />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/signup" 
        element={
          <ProtectedRoute requiresAuth={false} redirectTo="/dashboard">
            <SignUp />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/onboarding" 
        element={
          <ProtectedRoute requiresAuth={true} redirectTo="/login">
            <OnboardingPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute requiresAuth={true} requiresOnboarding={true} redirectTo="/login">
            <Dashboard />
          </ProtectedRoute>
        }
      />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  // These methods are still useful for demo purposes
  useEffect(() => {
    window.loginUser = () => {
      localStorage.setItem("isAuthenticated", "true");
    };

    window.logoutUser = () => {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("isOnboarded");
    };

    window.completeOnboarding = () => {
      localStorage.setItem("isOnboarded", "true");
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
