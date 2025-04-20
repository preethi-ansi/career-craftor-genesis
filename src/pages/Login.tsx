
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Mail, Smartphone } from 'lucide-react';

interface EmailFormValues {
  email: string;
  password: string;
}

interface PhoneFormValues {
  phoneNumber: string;
  otp: string;
}

const Login = () => {
  const { login, loginWithPhone } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  
  const emailForm = useForm<EmailFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const phoneForm = useForm<PhoneFormValues>({
    defaultValues: {
      phoneNumber: '',
      otp: '',
    },
  });

  const onEmailSubmit = async (data: EmailFormValues) => {
    try {
      setIsSubmitting(true);
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      // Toast is handled in the auth context
    } finally {
      setIsSubmitting(false);
    }
  };

  const requestOtp = () => {
    const phoneNumber = phoneForm.getValues('phoneNumber');
    if (!phoneNumber) {
      toast({
        title: "Phone number required",
        description: "Please enter your phone number",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate OTP sending
    toast({
      title: "OTP Sent",
      description: "A 6-digit code has been sent to your phone",
    });
    setShowOtpInput(true);
  };

  const onPhoneSubmit = async (data: PhoneFormValues) => {
    try {
      setIsSubmitting(true);
      await loginWithPhone(data.phoneNumber, data.otp);
      navigate('/dashboard');
    } catch (error) {
      console.error('Phone login failed:', error);
      // Toast is handled in the auth context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Choose your preferred login method
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="email" className="flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="phone" className="flex items-center justify-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  Phone
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="email">
                <form onSubmit={emailForm.handleSubmit(onEmailSubmit)}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        placeholder="john@example.com"
                        type="email"
                        autoComplete="email"
                        {...emailForm.register('email', { required: true })}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        {...emailForm.register('password', { required: true })}
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? 'Signing in...' : 'Sign in with Email'}
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="phone">
                <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="phoneNumber"
                          placeholder="+1 (555) 123-4567"
                          {...phoneForm.register('phoneNumber', { required: true })}
                        />
                        {!showOtpInput && (
                          <Button type="button" onClick={requestOtp} variant="outline">
                            Get OTP
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {showOtpInput && (
                      <div className="space-y-2">
                        <Label htmlFor="otp">One-Time Password</Label>
                        <Input
                          id="otp"
                          placeholder="Enter 6-digit code"
                          {...phoneForm.register('otp', { required: true })}
                        />
                        <div className="text-sm text-right">
                          <Button variant="link" onClick={requestOtp} className="h-auto p-0">
                            Resend OTP
                          </Button>
                        </div>
                        <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
                          {isSubmitting ? 'Verifying...' : 'Verify & Login'}
                        </Button>
                      </div>
                    )}
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-gray-500">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
            <div className="text-xs text-center text-gray-400">
              By continuing, you agree to our{' '}
              <a href="#" className="underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="underline">
                Privacy Policy
              </a>
              .
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
