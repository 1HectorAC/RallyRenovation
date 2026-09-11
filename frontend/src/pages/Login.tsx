import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/AuthService";
import { useAuth } from "../hooks/useAuth";
import type { AuthUser } from "../context/AuthContext";

function Login(){
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>();
    const navigate = useNavigate();
    const { login } = useAuth();

    async function onSubmit() {
        if (email == "" || password == "") {
            setError("All fields must be entered");
            return;
        }
        // TODO: add more validation
        try{
            const data: AuthUser  = await AuthService.login(email, password);
            login(data);
            navigate("/Dashboard")
        } catch(err){
            if(err instanceof Error)
                setError(err.message);
        }

    };

    return (
        <div>
            <h1>Login Page</h1>
            <label htmlFor="email">Email</label>
            <input name="email" type="text" onChange={i => setEmail(i.target.value)} />
            <label htmlFor="password">Password</label>
            <input name="password" type="text" onChange={i => setPassword(i.target.value)} />
            {error && <span className="error">{error}</span>}
            <button onClick={onSubmit}>Enter</button>
        </div>
    )
}
export default Login;