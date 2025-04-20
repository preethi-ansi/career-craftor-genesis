
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '@/types/user';
import { useToast } from '@/components/ui/use-toast';

// Mock initial users (in real app, this would come from backend)
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'student' as const,
    profileImage: '/assets/profile-1.jpg',
    interests: ['Software Development', 'Data Science'],
    skills: [
      { name: 'JavaScript', level: 4 },
      { name: 'Python', level: 3 },
      { name: 'UI/UX Design', level: 2 }
    ],
    education: {
      level: 'Bachelor',
      institution: 'Tech University',
      field: 'Computer Science',
      graduationYear: 2024
    },
    savedCareers: ['software-engineer', 'data-scientist'],
    savedQuestions: ['1', '3']
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'graduate' as const,
    profileImage: '/assets/profile-2.jpg',
    interests: ['Marketing', 'Business Analysis'],
    skills: [
      { name: 'Digital Marketing', level: 4 },
      { name: 'Data Analysis', level: 3 },
      { name: 'Content Creation', level: 5 }
    ],
    education: {
      level: 'Master',
      institution: 'Business School',
      field: 'Marketing',
      graduationYear: 2023
    },
    savedCareers: ['marketing-specialist', 'business-analyst'],
    savedQuestions: ['2', '4']
  }
];

// Define the shape of the context
interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  loginWithPhone: (phone: string, otp: string) => Promise<void>;
  register: (userData: Partial<User>, password: string) => Promise<void>;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });
  const { toast } = useToast();

  // Check if user is already logged in (from localStorage in this mock)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false
        });
      } catch (e) {
        localStorage.removeItem('user');
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false
        });
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user (in a real app, this would be a backend API call)
    const user = mockUsers.find(u => u.email === email);
    
    if (user && password === '123456') { // Mock password check
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
      localStorage.setItem('user', JSON.stringify(user));
      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.name}!`,
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive"
      });
      throw new Error('Invalid credentials');
    }
  };

  // Login with phone
  const loginWithPhone = async (phone: string, otp: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock OTP verification (always succeeds with 123456)
    if (otp === '123456') {
      // Find or create user
      const user = {
        id: 'phone-user-1',
        name: 'Phone User',
        phoneNumber: phone,
        role: 'student' as const,
        interests: [],
        skills: [],
        education: { level: 'Not specified' },
        savedCareers: [],
        savedQuestions: []
      };
      
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
      localStorage.setItem('user', JSON.stringify(user));
      toast({
        title: "Login Successful",
        description: "You're now signed in!",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid OTP",
        variant: "destructive"
      });
      throw new Error('Invalid OTP');
    }
  };

  // Register function
  const register = async (userData: Partial<User>, password: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, this would be a backend API call
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: userData.name || 'New User',
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      role: userData.role || 'student',
      interests: userData.interests || [],
      skills: userData.skills || [],
      education: userData.education || { level: 'Not specified' },
      savedCareers: [],
      savedQuestions: []
    };
    
    // Set the new user as current
    setAuthState({
      user: newUser,
      isAuthenticated: true,
      isLoading: false
    });
    localStorage.setItem('user', JSON.stringify(newUser));
    toast({
      title: "Registration Successful",
      description: "Your account has been created",
    });
  };

  // Logout function
  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
    localStorage.removeItem('user');
    toast({
      title: "Logged Out",
      description: "You've been successfully logged out",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        loginWithPhone,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
