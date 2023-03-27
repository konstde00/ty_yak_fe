import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Registration.css';
import {createRoot} from "react-dom";

async function registrateUser(credentials) {
    return fetch('http://localhost:8080/api/users/v1/registration/email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => {
            if (data.status === 409) {
                throw new Error("User already exists")
            } else {
                return data.json()
            }
        })
}

export default function Registration({ setToken }) {

    const app = document.getElementById("root");
    const root = createRoot(app);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(Error());

    const handleSubmit = async e => {

        try {
            e.preventDefault();
            const token = await registrateUser({
                email,
                password
            });
            setToken(token);
            root.render(
                <h2>Home</h2>
            )
        } catch (ex) {
            root.render(
                <div className="login-wrapper">
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <p>Email</p>
                            <input type="email" onChange={e => setEmail(e.target.value)} />
                        </label>
                        <label>
                            <p>Password</p>
                            <input type="password" onChange={e => setPassword(e.target.value)} />
                        </label>
                        <div>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                    <div>
                        <h3>{error.message}</h3>
                    </div>
                </div>
            )
        }
    }

    return(
        <div className="registration-wrapper">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Email</p>
                    <input type="email" onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

Registration.propTypes = {
    setToken: PropTypes.func.isRequired
};