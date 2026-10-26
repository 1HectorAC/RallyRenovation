import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/AuthService";
import { useAuth } from "../hooks/useAuth";
import type { AuthUser } from "../context/AuthContext";

function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    async function onSubmit(e: React.ChangeEvent) {
        e.preventDefault();
        if (email == "" || password == "") {
            setError("All fields must be entered");
            return;
        }
        setIsLoading(true);
        // TODO: add more validation
        try {
            const data: AuthUser = await AuthService.login(email, password);
            login(data);
            navigate("/Dashboard")
        } catch (err) {
            if (err instanceof Error)
                setError(err.message);
            setIsLoading(false);
        }

    };

    return (
        <div className="centerContainer">
            <div className="card1">
                <h1>Login Page</h1>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input className="form-control" name="email" type="text" onChange={i => setEmail(i.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input className="form-control" name="password" type="text" onChange={i => setPassword(i.target.value)} />
                    </div>

                    {error && <span className="error">{error}</span>}
                    {isLoading && <span>Loading...</span>}
                    <div>
                        <br/>
                        <button type="submit" className="buttonStyle1">Enter</button>
                    </div>
                </form>
            </div>


        </div>
    )
}
export default Login;