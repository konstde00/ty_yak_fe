import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Login.css";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

async function loginUser(credentials) {
  return fetch('http://localhost:8080/api/v1/login/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function Login({ setToken }) {

  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();

  const navigate = useNavigate();

  const handleLoginSubmit = async e => {

    e.preventDefault();
    const token = await loginUser({
      email,
      password
    });
    setToken(token);
    navigate("/charts");
  }

    return (
        <div className="login-wrapper" style={{ margin: "auto", textAlign: "center" }}>
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
            <div className="my_content_container" style={{fontSize: "15px", marginTop: "15px" }}>
                <a href="http://localhost:3000/registration">Create account</a>
            </div>
            <div className="my_content_container" style={{fontSize: "15px", marginTop: "15px" }}>
              <a href="http://localhost:3000/code/generate">Recover password</a>
            </div>
        </div>
    )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};