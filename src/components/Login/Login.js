import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './Login.css';
import Preferences from "../Preferences/Preferences";
import {reportExport} from "../../api/files";

async function loginUser(credentials) {
    return fetch('http://localhost:8080/api/v1/login/email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => {
            if (data.status === 404) {
                throw new Error("Invalid credentials")
            } else {
                return data.json()
            }
        })
}

export default function Login({setToken}) {

    const root = document.getElementById("root");

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleLoginSubmit = async e => {

        try {
            e.preventDefault();
            const token = await loginUser({
                email,
                password
            });
            setToken(token);
            ReactDOM.render(
                <div className="login-wrapper">
                    <h2>Home</h2>
                    <button onClick={reportExport('MOST_ACTIVE_USERS', 'XLSX')}>
                        Report export xslx
                    </button>
                    <button onClick={reportExport('MOST_ACTIVE_USERS', 'DOCX')}>
                        Report export docx
                    </button>
                </div>,
                root
            )
        } catch (ex) {
            ReactDOM.render(
                <div className="login-wrapper">
                    <h1>Please Log In</h1>
                    <form onSubmit={handleLoginSubmit}>
                        <label>
                            <p>Email</p>
                            <input type="email" onChange={e => setEmail(e.target.value)}/>
                        </label>
                        <label>
                            <p>Password</p>
                            <input type="password" onChange={e => setPassword(e.target.value)}/>
                        </label>
                        <div>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                    <div>
                        <h3>Wrong credentials provided</h3>
                    </div>
                    <div className="my_content_container">
                        <a href="http://localhost:3000/registration">Create account</a>
                    </div>
                </div>,
                root
            )
        }
    }

    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleLoginSubmit}>
                <label>
                    <p>Email</p>
                    <input type="email" onChange={e => setEmail(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <div className="my_content_container">
                <a href="http://localhost:3000/registration">Create account</a>
            </div>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};