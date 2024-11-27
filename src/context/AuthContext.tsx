"use client";

import React, { 
    createContext, 
    useState, 
    useContext, 
    ReactNode, 
    useEffect 
} from 'react';
import { User } from '@/lib/types';
import { login, signup, logout } from '@/lib/api';

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (username: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    // Check for existing authentication on initial load
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
    }, []);

    const handleLogin = async (email: string, password: string) => {
        try {
            const response = await login({ email, password });
            
            // Store user and token in local storage
            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('token', response.token);

            // Update state
            setUser(response.user);
            setToken(response.token);
        } catch (error) {
            // Clear any existing auth data
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            setUser(null);
            setToken(null);
            throw error;
        }
    };

    const handleSignup = async (username: string, email: string, password: string) => {
        try {
            const response = await signup({ username, email, password });
            
            // Store user and token in local storage
            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('token', response.token);

            // Update state
            setUser(response.user);
            setToken(response.token);
        } catch (error) {
            // Clear any existing auth data
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            setUser(null);
            setToken(null);
            throw error;
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            
            // Clear local storage and state
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            setUser(null);
            setToken(null);
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <AuthContext.Provider 
            value={{
                user,
                token,
                isAuthenticated: !!user,
                login: handleLogin,
                signup: handleSignup,
                logout: handleLogout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};