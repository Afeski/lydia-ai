
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowRight, 
  ArrowLeft, 
  Mail, 
  Phone, 
  User, 
  Lock, 
  Check
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const signUpSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." }),
  terms: z.boolean().refine(value => value === true, {
    message: "You must agree to the terms and conditions.",
  }),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

const SignUp = ({ onSignUpSuccess = () => {} }) => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      terms: false,
    },
  });

  async function onSubmit(data: SignUpFormValues) {
    try {
      const { error } = await signUp(data.email, data.password);
      
      if (error) {
        console.error("Signup error:", error);
        toast({
          title: "Signup failed",
          description: error.message || "There was a problem creating your account",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Account created!",
        description: "Your account has been successfully created.",
      });
      
      // Call the signup success callback
      onSignUpSuccess();
      
      // Redirect to onboarding
      setTimeout(() => navigate("/onboarding"), 1500);
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Something went wrong",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  }

  const handleGoogleSignUp = () => {
    // Logic for Google sign up would go here
    toast({
      title: "Google Sign Up",
      description: "Google authentication feature coming soon!",
    });
    
    // For demo purposes, simulate successful signup
    onSignUpSuccess();
    setTimeout(() => navigate("/onboarding"), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-lydia-lavender/30 to-white">
      <header className="py-6 px-4 sm:px-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-[#301A4B]">Lydia</h1>
          </Link>
        </div>
      </header>
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#301A4B] mb-2">Create your account</h1>
            <p className="text-gray-600">Join Lydia and start your healthcare journey</p>
          </div>
          
          <div className="mb-6">
            <button 
              onClick={handleGoogleSignUp}
              className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-3 px-4 text-gray-700 hover:bg-gray-50 transition-colors duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
                <path fill="none" d="M1 1h22v22H1z" />
              </svg>
              Sign up with Google
            </button>
          </div>
          
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                          <Input 
                            placeholder="John" 
                            className="pl-10" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                          <Input 
                            placeholder="Doe" 
                            className="pl-10" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                        <Input 
                          placeholder="john.doe@example.com" 
                          type="email" 
                          className="pl-10" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                        <Input 
                          placeholder="(123) 456-7890" 
                          className="pl-10" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                        <Input 
                          placeholder="********" 
                          type="password" 
                          className="pl-10" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal">
                        I agree to the{" "}
                        <a href="#" className="text-[#301A4B] underline">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-[#301A4B] underline">
                          Privacy Policy
                        </a>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-[#301A4B] hover:bg-[#301A4B]/90 text-white flex items-center justify-center gap-2"
              >
                Create Account <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </Form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-[#301A4B] font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      <footer className="py-6 px-4 sm:px-6">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} Lydia Health. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-[#301A4B] text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-[#301A4B] text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignUp;
