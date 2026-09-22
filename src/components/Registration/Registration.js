import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Registration.css';
import { fetchRequest } from "../../api/utils/request";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
    const { t } = useTranslation();

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
                <h1>{t("auth.register")}</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>{t("auth.email")}</p>
                        <input type="email" placeholder={t("auth.emailPlaceholder")} autoComplete="email"
                               onChange={e => setEmail(e.target.value)} />
                    </label>
                    <label>
                        <p>{t("auth.password")}</p>
                        <input type="password" placeholder={t("auth.passwordPlaceholder")} autoComplete="new-password"
                               onChange={e => setPassword(e.target.value)} />
                    </label>
                    <button type="submit">{t("auth.register")}</button>
                </form>
                <div className="ty-auth-links">
                    {t("auth.haveAccount")} <Link className="ty-caps" to="/login">{t("auth.signIn")}</Link>
                </div>
            </div>
        </div>
    )
}

Registration.propTypes = {
    setToken: PropTypes.func.isRequired
};
