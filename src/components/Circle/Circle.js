import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../NavBar/NavBar";
import { ANSWERS, readLastAnswer } from "../CheckIn/CheckIn";
import { updateGroup } from "../../api/groups";
import "../CheckIn/CheckIn.css";
import "./Circle.css";

export default function Circle() {
  const last = readLastAnswer();
  const mine = last && ANSWERS.find((a) => a.status === last.status);

  const [form, setForm] = useState({ id: "", newName: "", userToAdd: "", userToRemove: "" });
  const [busy, setBusy] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.id) return;
    setBusy(true);
    try {
      await updateGroup(form);
      setForm({ ...form, newName: "", userToAdd: "", userToRemove: "" });
    } catch (err) {
      // fetchRequest has already shown the toast
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <NavBar />
      <main className="ty-page">
        <ToastContainer />
        <h1>Your circle</h1>
        <p className="ty-lead">
          The people who are told when you answer, and who you are told about.
        </p>

        <div className="ty-circle-grid">
          <section className="ty-card">
            <h2>Your last answer</h2>
            {mine ? (
              <div className="ty-me">
                <div className={`ty-sent-badge ty-${mine.tone}`} style={{ marginBottom: 0 }}>
                  <span className={`ty-dot ty-dot-${mine.tone}`} />
                  {mine.label}
                </div>
                <span className="ty-muted">
                  {new Date(last.at).toLocaleString([], {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ) : (
              <p className="ty-muted">You have not answered yet.</p>
            )}
            <p style={{ marginTop: 16 }}>
              <Link className="ty-btn-secondary" to="/check-in"
                    style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "auto", padding: "0 18px", height: 40 }}>
                {mine ? "Answer again" : "Answer now"}
              </Link>
            </p>
          </section>

          <section className="ty-card">
            <h2>What an answer means</h2>
            {ANSWERS.map((a) => (
              <div className="ty-status-row" key={a.status}>
                <span className={`ty-dot ty-dot-${a.tone}`} />
                <strong>{a.label}</strong>
                <span>{a.hint}</span>
              </div>
            ))}
          </section>

          <section className="ty-card">
            <h2>Manage a group</h2>
            <p className="ty-form-note">
              Rename a group, or add and remove members by their user id. Leave a field empty
              to skip it.
            </p>
            <form onSubmit={submit}>
              <label>
                <p>Group id</p>
                <input type="number" name="id" required value={form.id} onChange={onChange}
                       placeholder="e.g. 1" />
              </label>
              <label>
                <p>New name</p>
                <input type="text" name="newName" value={form.newName} onChange={onChange}
                       placeholder="Family" />
              </label>
              <label>
                <p>Add member (user id)</p>
                <input type="number" name="userToAdd" value={form.userToAdd} onChange={onChange}
                       placeholder="42" />
              </label>
              <label>
                <p>Remove member (user id)</p>
                <input type="number" name="userToRemove" value={form.userToRemove} onChange={onChange}
                       placeholder="17" />
              </label>
              <button type="submit" disabled={busy}>{busy ? "Saving..." : "Save"}</button>
            </form>
          </section>
        </div>
      </main>
    </>
  );
}
