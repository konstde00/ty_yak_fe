import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Registration.css';
import { fetchRequest } from "../../api/utils/request";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

async function registrateUser(credentials) {
    return fetchRequest({
        url: 'http://localhost:8080/api/users/v1/registration/email',
        method: "POST",
        body: credentials,
        toastifyError: true
    })
}

export default function Registration({ setToken }) {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await registrateUser({ email, password });
        if (token) {
            setToken(token);
        }
    }

    return (
        <div className="ty-auth">
            <div className="ty-auth-card">
                <ToastContainer />
                <h1>Sign up</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>E-mail</p>
                        <input type="email" placeholder="Enter your e-mail" autoComplete="email"
                               onChange={e => setEmail(e.target.value)} />
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" placeholder="Enter your password" autoComplete="new-password"
                               onChange={e => setPassword(e.target.value)} />
                    </label>
                    <button type="submit">Sign up</button>
                </form>
                <div className="ty-auth-links">
                    Already have an account? <Link className="ty-caps" to="/login">Log in</Link>
                </div>
            </div>
        </div>
    )
}

Registration.propTypes = {
    setToken: PropTypes.func.isRequired
};
