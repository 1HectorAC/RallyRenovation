const API_URL = import.meta.env.VITE_API_URL = "/api/auth";

export const AuthService = {
    login: async (email: string, password: string) => {
        const res = await fetch(API_URL + "/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        })
        if (!res.ok)
            throw Error("Failed Api call.");
        
        return res;
    },
    register: async (userName: string, email: string, password: string) => {
        const res = await fetch(API_URL + "/register", {
            method: "POST",
            body: JSON.stringify({ userName, email, password }),
            headers: { 'Content-Type': 'application/json' }
        })
        if (!res.ok)
            throw Error("Failed Api call.");
        return res;
    }
}