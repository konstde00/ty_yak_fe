import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Registration.css';
import { fetchRequest } from "../../api/utils/request";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

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
        const token = await registrateUser({
            email,
            password
        });
        if (token) {
            setToken(token);
        }
    }

    return(
        <div className="registration-wrapper" style={{ margin: "auto", textAlign: "center" }}>
            <ToastContainer />
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
            <div className="my_content_container">
                <a href="http://localhost:3000/login">Go to login</a>
            </div>
        </div>
    )
}

Registration.propTypes = {
    setToken: PropTypes.func.isRequired
};