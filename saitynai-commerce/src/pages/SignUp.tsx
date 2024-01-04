import { useState } from "react";
import { GoogleOAuth, Authenticate } from "../services/ApiHelper"

export default function SignUp() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [givenName, setGivenName] = useState("")
    const [familyName, setFamilyName] = useState("")
    const [error, setError] = useState("")

    // how am i so bad at this
    // i guess cause im in a rush but fuck this is ugly
    async function Register(email: string, password: string, given_name: string, family_name: string) {
        const response = await fetch('http://localhost:8080/api/auth/register', {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': email,
                'password': password,
                'given_name': givenName,
                'family_name': familyName
            })
        });
        if (!response.ok) {
            console.log("response not ok");
            throw new Error('response was not ok');
        }
        if (response.status == 409) {
            setError("Email already in use. Please use a different email.");
        }
        if (response.status == 200) {
            setError("It worked. You can sign in now playa");
        }
        if (response.status == 500) {
            setError("idk what happened try again playa.");
        }
    }

    return <>
        <div className="login-form">
            <label>Email</label>
            <input type="text" id="name" value={email} onChange={ev => setEmail(ev.target.value)}></input>
            <label>Password</label>
            <input type="text" id="password" value={password} onChange={ev => setPassword(ev.target.value)}></input>
            <label>Name</label>
            <input type="text" id="given_name" value={givenName} onChange={ev => setGivenName(ev.target.value)}></input>
            <label>Last name</label>
            <input type="text" id="family_name" value={familyName} onChange={ev => setFamilyName(ev.target.value)}></input>
            <button onClick={() => Register(email, password, givenName, familyName)} className="btn btn-primary">Log in</button>
        </div>        
        {error} <br/>
        Already have an account? <a href="/login">Sign in here</a>
        <br/>
        <button onClick={GoogleOAuth} className="btn btn-primary">Sign in with Google</button>
    </>
}