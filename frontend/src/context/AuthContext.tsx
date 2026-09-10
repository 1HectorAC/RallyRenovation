import { createContext, useState, type ReactNode } from "react";

interface AuthContextType {
    token: string | null;
    login: (jwt: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children } : {children: ReactNode}) => {
    const [token, setToken] = useState<string | null>(() => {return localStorage.getItem("token");});

    const login = (jwt: string) => {
        localStorage.setItem("token", jwt);
        setToken(jwt);
    };
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    const isAuthenticated = !!token;

    return(
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}