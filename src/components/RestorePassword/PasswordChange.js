import React, { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

async function changePassword(email, newPassword, token) {

  return fetch("http://localhost:8080/api/users/v1/password/change", {
    method: "PUT",
    body: JSON.stringify({
      email: email,
      newPassword: newPassword
    }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })
    .then(res => {
      if(!res.ok) {
        console.log("Error occured")
        return res.text().then(text => { throw new Error(JSON.stringify(text)) })
      }
      else {
        toast.success("Password changed successfully", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }
    }).catch(err => {
      try {
        toast.error(JSON.parse(JSON.parse(err.message)).message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (err) {
        console.log("Error occured = " + err)
      }
      throw new Error(err.message);
    });
}

export default function PasswordChange() {

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {

      toast.error("Passwords are different", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return;
    }

    const email = localStorage.getItem("_email");
    const token = JSON.parse(localStorage.getItem("token")).accessToken;

    try {

      await changePassword(email, newPassword, token);

      navigate("/charts");

    } catch (err) {

      console.log("Error occured = " + err)
    }
  };

  return (
    <>
      <ToastContainer/>
      <div style={{ margin: "auto", textAlign: "center" }}>
        <h1>Setup new password</h1>
        <form onSubmit={handleSubmit} className="password-change-form">
          <label>
            New Password:
            <input
              style={{marginLeft: "15px", marginBottom: "20px"}}
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </label>
          <label>
            Confirm New Password:
            <input
              style={{marginLeft: "15px", marginBottom: "20px"}}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">
            {'Change Password'}
          </button>
        </form>
      </div>
    </>
  );
};
