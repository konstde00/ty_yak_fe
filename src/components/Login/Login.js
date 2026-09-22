import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Login.css";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";

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
    const token = await loginUser({ email, password });
    setToken(token);
    navigate("/check-in");
  }

  return (
    <div className="ty-auth">
      <div className="ty-auth-card">
        <h1>Log in</h1>
        <form onSubmit={handleLoginSubmit}>
          <label>
            <p>E-mail</p>
            <input type="email" placeholder="Enter your e-mail" autoComplete="email"
                   onChange={e => setEmail(e.target.value)}/>
          </label>
          <label>
            <p>Password</p>
            <input type="password" placeholder="Enter your password" autoComplete="current-password"
                   onChange={e => setPassword(e.target.value)}/>
          </label>
          <Link className="ty-link-center" to="/code/generate">Forgot your password?</Link>
          <button type="submit">Log in</button>
        </form>
        <div className="ty-auth-links">
          No account yet? <Link className="ty-caps" to="/registration">Registration</Link>
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};
