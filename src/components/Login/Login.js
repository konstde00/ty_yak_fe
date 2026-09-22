import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Login.css";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();

  const navigate = useNavigate();

  const handleLoginSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({ email, password });
    setToken(token);
    navigate("/");
  }

  return (
    <div className="ty-auth">
      <div className="ty-auth-card">
        <h1>{t("auth.login")}</h1>
        <form onSubmit={handleLoginSubmit}>
          <label>
            <p>{t("auth.email")}</p>
            <input type="email" placeholder={t("auth.emailPlaceholder")} autoComplete="email"
                   onChange={e => setEmail(e.target.value)}/>
          </label>
          <label>
            <p>{t("auth.password")}</p>
            <input type="password" placeholder={t("auth.passwordPlaceholder")} autoComplete="current-password"
                   onChange={e => setPassword(e.target.value)}/>
          </label>
          <Link className="ty-link-center" to="/code/generate">{t("auth.forgot")}</Link>
          <button type="submit">{t("auth.login")}</button>
        </form>
        <div className="ty-auth-links">
          {t("auth.noAccount")} <Link className="ty-caps" to="/registration">{t("auth.registration")}</Link>
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};
