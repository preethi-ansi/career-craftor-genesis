
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Smartphone } from 'lucide-react';

interface EmailRegisterValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

interface PhoneRegisterValues {
  name: string;
  phoneNumber: string;
  otp: string;
  role: string;
}

const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);

  const emailForm = useForm<EmailRegisterValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'student',
    },
  });

  const phoneForm = useForm<PhoneRegisterValues>({
    defaultValues: {
      name: '',
      phoneNumber: '',
      otp: '',
      role: 'student',
    },
  });

  const onEmailSubmit = async (data: EmailRegisterValues) => {
    if (data.password !== data.confirmPassword) {
      emailForm.setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords do not match',
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await registerUser(
        {
          name: data.name,
          email: data.email,
          role: data.role as any,
        },
        data.password
      );
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const requestOtp = () => {
    const phoneNumber = phoneForm.getValues('phoneNumber');
    if (!phoneNumber || phoneNumber.length < 10) {
      phoneForm.setError('phoneNumber', {
        type: 'manual',
        message: 'Please enter a valid phone number',
      });
      return;
    }
    setShowOtpInput(true);
  };

  const onPhoneSubmit = async (data: PhoneRegisterValues) => {
    try {
      setIsSubmitting(true);
      await registerUser(
        {
          name: data.name,
          phoneNumber: data.phoneNumber,
          role: data.role as any,
        },
        data.otp
      );
      navigate('/dashboard');
    } catch (error) {
      console.error('Phone registration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
            <CardDescription className="text-center">
              Choose your preferred registration method
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
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        {...emailForm.register('name', { required: true })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        placeholder="john@example.com"
                        type="email"
                        {...emailForm.register('email', { required: true })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        {...emailForm.register('password', {
                          required: true,
                          minLength: 8,
                        })}
                      />
                      {emailForm.formState.errors.password && (
                        <p className="text-sm text-red-500">
                          Password must be at least 8 characters
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        {...emailForm.register('confirmPassword', { required: true })}
                      />
                      {emailForm.formState.errors.confirmPassword && (
                        <p className="text-sm text-red-500">
                          {emailForm.formState.errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">I am a</Label>
                      <Select
                        defaultValue="student"
                        onValueChange={(value) => emailForm.setValue('role', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="graduate">Graduate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? 'Creating account...' : 'Create Account'}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="phone">
                <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name-phone">Full Name</Label>
                      <Input
                        id="name-phone"
                        placeholder="John Doe"
                        {...phoneForm.register('name', { required: true })}
                      />
                    </div>
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
                      {phoneForm.formState.errors.phoneNumber && (
                        <p className="text-sm text-red-500">
                          {phoneForm.formState.errors.phoneNumber.message}
                        </p>
                      )}
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
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="role-phone">I am a</Label>
                      <Select
                        defaultValue="student"
                        onValueChange={(value) => phoneForm.setValue('role', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="graduate">Graduate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {showOtpInput && (
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating account...' : 'Create Account'}
                      </Button>
                    )}
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
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

export default Register;
