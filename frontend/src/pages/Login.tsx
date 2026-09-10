import { useState } from "react";

function Login() {
    const [email, setEmail] = useState<string | null>("");
    const [password, setPassword] = useState<string | null>("");
    const [error, setError] = useState<string | null>();

    function onSubmit() {
        if (email == "" || password == "") {
            setError("All fields must be entered");
            return;
        }

        // api call here

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