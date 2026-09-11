import type { AuthUser } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL + "/api/auth";

export const AuthService = {
    login: async (email: string, password: string): Promise<AuthUser> => {
        console.log("AuthService login called");
        const res = await fetch(API_URL + "/login", {
            method: "POST",
            body: JSON.stringify({ email:email, password:password }),
            headers: { 'Content-Type': 'application/json' }
        })
        if (!res.ok)
            throw Error("Failed Api call.");
        
        const data: AuthUser = await res.json();
        return data;
    },
    register: async (userName: string, email: string, password: string, confirmPassword:string): Promise<AuthUser> => {
        if(password != confirmPassword)
            throw Error("Password did not match confirmPassword.")

        const res = await fetch(API_URL + "/register", {
            method: "POST",
            body: JSON.stringify({ userName, email, password, confirmPassword }),
            headers: { 'Content-Type': 'application/json' }
        })
        if (!res.ok)
            throw Error("Failed Api call.");

        const data: AuthUser = await res.json();
        return data;
    }
}