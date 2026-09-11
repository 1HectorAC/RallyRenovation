import { createContext, useState, type ReactNode } from "react";

export interface AuthUser {
    token: string;
    email: string;
}

interface AuthContextType {
    user: AuthUser | null;
    login: (user: AuthUser) => void;
    logout: () => void;
    isAuthenticated: boolean;
}
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children } : {children: ReactNode}) => {
    const [user, setUser] = useState<AuthUser | null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) as AuthUser : null;
    });


    const login = (user: AuthUser) => {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
    };
    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    const isAuthenticated = !!user;

    return(
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}