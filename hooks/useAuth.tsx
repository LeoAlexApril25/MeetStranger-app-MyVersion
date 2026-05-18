import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import { User} from '../constants/types'
import {apiService} from '../services/api'
import { wsService} from '../services/websocket'

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    Login: (email: string, password: string) => Promise<boolean>;
    Register: (username: string, email: string, password: string) => Promise<boolean>;
    Logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children:ReactNode}){
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setLoading] = useState(true);
    useEffect(() =>{
        checkAuthStatus();
    },[])

    const checkAuthStatus = async () => {
        try {
            const response = await apiService.getProfile();
            setUser(response.user)
            await wsService.connect();
        } catch (error) {
            console.log('Not authenticated')
        } finally {
            setLoading(false);
        }
    }
    const Login = async (email: string, password: string): Promise<boolean> => {
        try{
            const response = await apiService.Login(email,password);
            setUser(response.user);
            await    wsService.connect();
            return true;
        } catch(error){
            console.log(error);
            return false;

        }
    }
    const Register = async (username: string,email: string, password: string): Promise<boolean> => {
        try{
            const response = await apiService.Register(username,email,password);
            setUser(response.user);
            await  wsService.connect();
            return true;
        } catch(error){
            console.log(error);
            return false;

        }
    }
    const Logout = async () => {
        try {
            await apiService.logout()
            await wsService.disconnect()
            setUser(null);
        } catch (error) {
            console.log(error)
        }
    }
    const value = {
        user,
        isAuthenticated : !!user,
        isLoading,
        Login,
        Register,
        Logout
    };
    return (
        <AuthContext.Provider value ={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext)
    if ( context === undefined){
        throw new Error('useAuth must be used within an AuthProvider')

    }
    return context;
}