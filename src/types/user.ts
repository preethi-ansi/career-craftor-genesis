
export type UserRole = 'student' | 'graduate' | 'admin';

export interface User {
  id: string;
  name: string;
  email?: string;
  phoneNumber?: string;
  role: UserRole;
  profileImage?: string;
  interests: string[];
  skills: {
    name: string;
    level: number; // 1-5
  }[];
  education: {
    level: string;
    institution?: string;
    field?: string;
    graduationYear?: number;
  };
  savedCareers: string[];
  savedQuestions: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
