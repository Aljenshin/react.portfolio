import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  admin: AdminUser | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

interface AdminUser {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin user - in a real app, this would come from a secure backend
// Password is stored as a simple hash simulation for demo purposes
const MOCK_ADMIN: AdminUser = {
  id: '1',
  username: 'mondarte.aljen31@gmail.com',
  email: 'mondarte.aljen31@gmail.com',
  password: 'windbreaker1392', // In production, this would be properly hashed
  createdAt: new Date('2024-01-01')
};

// Simple hash function for demo purposes (not secure for production)
const simpleHash = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString();
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedAuth = localStorage.getItem('admin_auth');
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth);
        const loginTime = new Date(authData.loginTime);
        const now = new Date();
        const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        
        // Check if session is still valid (24 hours)
        if (authData.isAuthenticated && authData.admin && (now.getTime() - loginTime.getTime()) < sessionDuration) {
          setIsAuthenticated(true);
          setAdmin(authData.admin);
        } else {
          // Session expired, clear auth data
          localStorage.removeItem('admin_auth');
        }
      } catch (error) {
        console.error('Error parsing saved auth data:', error);
        localStorage.removeItem('admin_auth');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check credentials - both email and username are accepted
    const isValidUser = (username === MOCK_ADMIN.username || username === MOCK_ADMIN.email);
    const isValidPassword = password === MOCK_ADMIN.password;
    
    if (isValidUser && isValidPassword) {
      // Create a sanitized admin object without password for storage
      const sanitizedAdmin = {
        id: MOCK_ADMIN.id,
        username: MOCK_ADMIN.username,
        email: MOCK_ADMIN.email,
        createdAt: MOCK_ADMIN.createdAt
      };
      
      const authData = {
        isAuthenticated: true,
        admin: sanitizedAdmin,
        loginTime: new Date().toISOString()
      };
      
      localStorage.setItem('admin_auth', JSON.stringify(authData));
      setIsAuthenticated(true);
      setAdmin(sanitizedAdmin as AdminUser);
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const logout = () => {
    localStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
    setAdmin(null);
  };

  const value: AuthContextType = {
    isAuthenticated,
    admin,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
