import { useState } from "react";
import { GoogleOAuth, Authenticate } from "../services/ApiHelper"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    // how am i so bad at this
    // i guess cause im in a rush but fuck this is ugly
    async function Authenticate(email: string, password: string) {
        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': email,
                'password': password
            })
        });
        if (!response.ok) {
            console.log("response not ok");
            throw new Error('response was not ok');
        }
        const response_data = await response.json();
        const data = response_data.data[0];

        if (data.role == null) {
            setError("incorrect login details bitchass")
        } else {
            localStorage['name'] = data.given_name + " " + data.family_name;
            localStorage['picture'] = data.picture;
            localStorage['role'] = data.role;
            localStorage['id'] = data.id;
            localStorage['token'] = response_data.token;

            window.location.href = "/";
        }
    }

    return <>
        <div className="login-form">
            <label>Email</label>
            <input type="text" id="name" value={email} onChange={ev => setEmail(ev.target.value)} className="form-control"></input>
            <label>Password</label>
            <input type="text" id="password" value={password} onChange={ev => setPassword(ev.target.value)} className="form-control"></input>
            <button onClick={() => Authenticate(email, password)} className="btn btn-primary">Sign in</button>
        </div>
        
        {error} <br/>
        <center>Don't have an account? <a href="/register">Register here</a>
        <br/> <br/>
        <button onClick={GoogleOAuth} className="btn btn-outline-primary google-button">Sign in with Google  <img src="https://cdn.iconscout.com/icon/free/png-256/free-google-160-189824.png?f=webp&w=256" width={40}/>
            </button></center>
    </>
}