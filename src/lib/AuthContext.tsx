import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  targetRole?: string;
  onboarded?: boolean;
}

interface AuthContextType {
  user: any | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for prototype
const MOCK_USER = {
  uid: 'prototype-user-123',
  email: 'prototype@example.com',
  displayName: 'Prototype User',
  emailVerified: true,
};

const MOCK_PROFILE: UserProfile = {
  uid: 'prototype-user-123',
  email: 'prototype@example.com',
  displayName: 'Prototype User',
  onboarded: true,
  targetRole: 'Senior Software Engineer',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for simulated session
    const savedUser = localStorage.getItem('proto_user');
    const savedProfile = localStorage.getItem('proto_profile');

    if (savedUser && savedProfile) {
      setUser(JSON.parse(savedUser));
      setProfile(JSON.parse(savedProfile));
    }
    setLoading(false);
  }, []);

  const signIn = async () => {
    // Simulate sign in
    setUser(MOCK_USER);
    setProfile(MOCK_PROFILE);
    localStorage.setItem('proto_user', JSON.stringify(MOCK_USER));
    localStorage.setItem('proto_profile', JSON.stringify(MOCK_PROFILE));
  };

  const logout = async () => {
    // Simulate logout
    setUser(null);
    setProfile(null);
    localStorage.removeItem('proto_user');
    localStorage.removeItem('proto_profile');
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!profile) return;
    const newProfile = { ...profile, ...data };
    setProfile(newProfile);
    localStorage.setItem('proto_profile', JSON.stringify(newProfile));
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
