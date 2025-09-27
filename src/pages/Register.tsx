import { AuthForm, AuthFormData } from "@/components/auth/auth-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user selected a path from landing page
    const selectedPath = localStorage.getItem('selectedPath');
    if (selectedPath && selectedPath !== 'assessment') {
      // You could pre-fill the category based on selected path
      console.log('Selected path from landing:', selectedPath);
    }
  }, []);

  const handleRegister = async (data: AuthFormData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call - replace with actual backend integration
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          category: data.category,
          userType: data.userType,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Registration failed');
      }

      const result = await response.json();
      
      // Store token and user data
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));

      toast({
        title: "Welcome to StartupLearn!",
        description: "Your account has been created successfully. Let's get started!",
      });

      // Check if user needs to take assessment
      const selectedPath = localStorage.getItem('selectedPath');
      if (selectedPath === 'assessment' || data.category === 'unknown') {
        navigate('/assessment');
      } else {
        navigate('/dashboard');
      }

    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <AuthForm 
        mode="register" 
        onSubmit={handleRegister} 
        isLoading={isLoading}
      />
    </div>
  );
}