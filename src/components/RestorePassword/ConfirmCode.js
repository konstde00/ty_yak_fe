import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

async function confirmCode(email, code) {
  return fetch('http://localhost:8080/api/users/v1/email-code/confirm', {
    method: "POST",
    body: JSON.stringify({
      email: email,
      code: code
    }),
    headers: {'Content-Type': 'application/json'}
  })
    .then(data => {
      if(!data.ok) {
        return data.text().then(text => { throw new Error(JSON.stringify(text)) })
      } else {
        console.log("RES = " + data.toString())
        toast.success("Recovery code is correct", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return data.json();
      }
    }).catch(err => {
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
      throw new Error(err.message);
    });
}

export default function ConfirmCode() {
  const [code, setCode] = useState(0);
  const [isLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {

    event.preventDefault();

    const email = localStorage.getItem("_email");

    try {

      const token = await confirmCode(email, code);

      console.log("Token = " + JSON.stringify(token));

      localStorage.setItem("token", JSON.stringify(token));

      navigate("/password/change")

    } catch (err) {

      console.log("Error occured = " + err)
    }
  };

  return (
    <>
      <ToastContainer/>
      <div style={{ margin: "auto", textAlign: "center" }}>
        <h1>Reset password with email</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Confirmation code:
            <input
              style={{marginLeft: "15px", marginBottom: "20px"}}
              placeholder="Your code"
              type="number"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </label>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Confirm email code'}
          </button>
        </form>
      </div>
    </>
  );
};
