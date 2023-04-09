import React, { useState } from 'react';
import { fetchRequest } from "../../api/utils/request";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function GenerateConfirmationCode() {
  const [email, setEmail] = useState('');
  const [isLoading] = useState(false);
  const [setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {

    event.preventDefault();

    try {

      await fetchRequest({
        url: "http://localhost:8080/api/users/v1/password/recovery",
        method: "PUT",
        body: {
          email: email
        },
        toastifySuccess: true,
        completeMessage: "Recovery code has been sent successfully",
        toastifyError: true,
        throwError: true
      });

      localStorage.setItem("_email", email);

      navigate("/code/confirm")

    } catch (err) {
      setError(true);
    }
  };

  return (
    <>
      <ToastContainer/>
      <div style={{ margin: "auto", textAlign: "center" }}>
        <h1>Reset password with email</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              style={{marginLeft: "15px", marginBottom: "20px"}}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Request email code'}
          </button>
        </form>
      </div>
    </>
  );
};
